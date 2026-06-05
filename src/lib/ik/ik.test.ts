import { beforeEach, describe, expect, it } from "vitest";
import { bracketLabel, entitlement, monthlyAllowance } from "./bareme";
import {
  dashboardRows, monthSummary, monthSummaryFromCumul, monthTrips, workweekDays,
} from "./compute";
import { buildPayload, decodeReport, encodeReport } from "./report";
import { clearMonth, loadMonth, MonthData, saveMonth, YearSettings } from "./storage";

const settings6cv: YearSettings = {
  name: "Test Salarié",
  cv: 6,
  electric: false,
  depart: "38 bis avenue des châtaigniers, 94470 Boissy-Saint-Léger",
  destination: "19 bd des Italiens, 75009 Paris",
  distanceKm: 86,
};

/** MonthData avec n jours travaillés (jours 1..n), trajet habituel. */
const makeMonth = (n: number): MonthData => ({
  days: Object.fromEntries(Array.from({ length: n }, (_, i) => [i + 1, {}])),
});

describe("barème — entitlement", () => {
  it("applique la 1re tranche jusqu'à 5 000 km inclus", () => {
    expect(entitlement(5000, 6, false)).toBe(3325.0); // 5000 × 0,665
    expect(entitlement(1032, 6, false)).toBe(686.28);
  });

  it("applique la 2e tranche (× c2 + forfait) de 5 001 à 20 000 km", () => {
    expect(entitlement(5001, 6, false)).toBe(3327.37); // 5001 × 0,374 + 1457
    expect(entitlement(20000, 6, false)).toBe(8937.0);
  });

  it("applique la 3e tranche au-delà de 20 000 km", () => {
    expect(entitlement(20001, 6, false)).toBe(8940.45); // 20001 × 0,447
  });

  it("majore de 20 % les véhicules électriques", () => {
    expect(entitlement(1000, 5, true)).toBe(763.2); // 1000 × 0,636 × 1,2
  });

  it("couvre les 5 puissances fiscales en 1re tranche", () => {
    expect(entitlement(1000, 3, false)).toBe(529.0);
    expect(entitlement(1000, 4, false)).toBe(606.0);
    expect(entitlement(1000, 5, false)).toBe(636.0);
    expect(entitlement(1000, 6, false)).toBe(665.0);
    expect(entitlement(1000, 7, false)).toBe(697.0);
  });
});

describe("SANITY CHECK obligatoire — 6 CV, thermique, 86 km/jour", () => {
  // Jan 12 j, Fév 12, Mars 13, Avril 13, Mai 11 → cumul annuel 5 246 km
  const months: MonthData[] = [
    makeMonth(12), makeMonth(12), makeMonth(13), makeMonth(13), makeMonth(11),
    ...Array.from({ length: 7 }, () => ({ days: {} })),
  ];
  const rows = dashboardRows(settings6cv, months, 2026);

  it("janvier à avril : 686,28 / 686,28 / 743,47 / 743,47 €", () => {
    expect(rows[0].allowance).toBe(686.28);
    expect(rows[1].allowance).toBe(686.28);
    expect(rows[2].allowance).toBe(743.47);
    expect(rows[3].allowance).toBe(743.47);
  });

  it("mai : 559,50 € (le cumul franchit 5 000 km → 2e tranche)", () => {
    expect(rows[4].cumKm).toBe(5246);
    expect(rows[4].bracket).toBe("5 001 – 20 000 km");
    expect(rows[4].allowance).toBe(559.5);
  });

  it("la tranche reste ≤ 5 000 km jusqu'en avril (cumul, pas mensuel)", () => {
    for (let m = 0; m < 4; m++) expect(rows[m].bracket).toBe("≤ 5 000 km");
  });

  it("total annuel : 5 246 km → 3 419,00 €", () => {
    expect(rows[11].cumKm).toBe(5246);
    expect(rows[11].cumAllowance).toBe(3419.0);
    const sum = rows.reduce((s, r) => s + r.allowance, 0);
    expect(Math.round(sum * 100) / 100).toBe(3419.0);
  });
});

describe("monthlyAllowance — différence des droits cumulés", () => {
  it("télescopage : la somme des mois égale le droit annuel", () => {
    const kms = [400, 1200, 0, 2600, 900, 1500, 0, 0, 3100, 2800, 5000, 4500]; // cumul 22 000
    let cum = 0;
    let total = 0;
    for (const km of kms) {
      const prev = cum;
      cum += km;
      total += monthlyAllowance(cum, prev, 7, true);
    }
    expect(Math.round(total * 100) / 100).toBe(entitlement(22000, 7, true));
  });

  it("un mois sans trajet vaut 0", () => {
    expect(monthlyAllowance(3000, 3000, 4, false)).toBe(0);
  });
});

describe("bracketLabel", () => {
  it("borne les tranches sur le cumul", () => {
    expect(bracketLabel(5000)).toBe("≤ 5 000 km");
    expect(bracketLabel(5001)).toBe("5 001 – 20 000 km");
    expect(bracketLabel(20000)).toBe("5 001 – 20 000 km");
    expect(bracketLabel(20001)).toBe("> 20 000 km");
  });
});

describe("monthTrips — overrides ponctuels", () => {
  it("utilise le trajet habituel par défaut et l'override quand présent", () => {
    const data: MonthData = {
      days: { 3: {}, 10: { km: 120, dest: "Client B, 92100 Boulogne" }, 17: { km: 42 } },
    };
    const trips = monthTrips(settings6cv, data, 2026, 5);
    expect(trips).toHaveLength(3);
    expect(trips[0]).toMatchObject({ day: 3, km: 86, destination: settings6cv.destination });
    expect(trips[1]).toMatchObject({ day: 10, km: 120, destination: "Client B, 92100 Boulogne" });
    expect(trips[2]).toMatchObject({ day: 17, km: 42, destination: settings6cv.destination });
    expect(trips.every((t) => t.depart === settings6cv.depart)).toBe(true);
  });
});

describe("workweekDays — remplissage en un clic", () => {
  it("liste les jours ouvrés de janvier 2026 (22 jours, sans week-ends)", () => {
    const days = workweekDays(2026, 1);
    expect(days).toHaveLength(22);
    expect(days).not.toContain(3); // samedi
    expect(days).not.toContain(4); // dimanche
    expect(days).toContain(1); // jeudi
  });
});

describe("monthSummaryFromCumul — reconstruction côté destinataire", () => {
  it("reproduit exactement le calcul local à partir du cumul antérieur", () => {
    const months = [makeMonth(12), makeMonth(12), makeMonth(13), makeMonth(13), makeMonth(11),
      ...Array.from({ length: 7 }, () => ({ days: {} }))];
    const local = monthSummary(settings6cv, months, 2026, 5);
    const remote = monthSummaryFromCumul(settings6cv, months[4], 2026, 5, local.cumKmBefore);
    expect(remote.allowance).toBe(local.allowance);
    expect(remote.cumKm).toBe(local.cumKm);
    expect(remote.bracket).toBe(local.bracket);
  });
});

describe("lien magique — encode/décode", () => {
  it("roundtrip sans perte", () => {
    const data: MonthData = { days: { 4: {}, 5: { km: 120, dest: "Autre client" } } };
    const payload = buildPayload(settings6cv, data, 2026, 5, 4300);
    const decoded = decodeReport(encodeReport(payload));
    expect(decoded).toEqual(payload);
  });

  it("rejette un contenu invalide", () => {
    expect(decodeReport("nimporte-quoi")).toBeNull();
    expect(decodeReport("")).toBeNull();
  });

  it("rejette un payload structurellement faux (lien altéré)", () => {
    const base = buildPayload(settings6cv, { days: { 4: {} } }, 2026, 5, 4300);
    const mutate = (patch: object) =>
      decodeReport(encodeReport({ ...base, ...patch } as never));
    expect(mutate({ settings: { ...settings6cv, cv: 9 } })).toBeNull();
    expect(mutate({ month: 13 })).toBeNull();
    expect(mutate({ month: 0 })).toBeNull();
    expect(mutate({ cumKmBefore: Number.NaN })).toBeNull();
    expect(mutate({ cumKmBefore: -1 })).toBeNull();
    expect(mutate({ settings: { ...settings6cv, distanceKm: Infinity } })).toBeNull();
    expect(mutate({ days: { 99: {} } })).toBeNull();
    expect(mutate({ days: { 4: { km: -5 } } })).toBeNull();
    expect(mutate({ days: { 4: { km: 1e308 } } })).toBeNull();
  });
});

describe("garde-fous des distances aberrantes", () => {
  it("un km hors bornes retombe sur la distance habituelle", () => {
    const data: MonthData = {
      days: { 3: { km: Infinity }, 4: { km: -10 }, 5: { km: 1e308 }, 6: { km: 120 } },
    };
    const trips = monthTrips(settings6cv, data, 2026, 5);
    expect(trips.map((t) => t.km)).toEqual([86, 86, 86, 120]);
  });
});

describe("sauvegarde JSON — jamais le jeton de déverrouillage", () => {
  beforeEach(() => localStorage.clear());

  it("exclut ik:v1:unlocked de l'export ET de l'import", async () => {
    const { exportBackup, importBackup } = await import("./storage");
    localStorage.setItem("ik:v1:unlocked", "1");
    saveMonth(2026, 1, makeMonth(3));
    const backup = exportBackup();
    expect(backup).not.toContain("unlocked");

    localStorage.clear();
    const tampered = JSON.parse(backup);
    tampered.data["ik:v1:unlocked"] = "1"; // sauvegarde trafiquée
    importBackup(JSON.stringify(tampered));
    expect(localStorage.getItem("ik:v1:unlocked")).toBeNull();
    expect(Object.keys(loadMonth(2026, 1).days)).toHaveLength(3);
  });
});

describe("persistance — indépendance des mois", () => {
  beforeEach(() => localStorage.clear());

  it("éditer ou effacer un mois ne touche jamais les autres", () => {
    saveMonth(2026, 1, makeMonth(12));
    saveMonth(2026, 2, makeMonth(12));
    saveMonth(2026, 2, makeMonth(5)); // ré-édition de février
    clearMonth(2026, 1); // effacement explicite de janvier

    expect(Object.keys(loadMonth(2026, 1).days)).toHaveLength(0);
    expect(Object.keys(loadMonth(2026, 2).days)).toHaveLength(5);
  });

  it("les années sont également indépendantes", () => {
    saveMonth(2026, 3, makeMonth(10));
    saveMonth(2027, 3, makeMonth(7));
    expect(Object.keys(loadMonth(2026, 3).days)).toHaveLength(10);
    expect(Object.keys(loadMonth(2027, 3).days)).toHaveLength(7);
  });
});
