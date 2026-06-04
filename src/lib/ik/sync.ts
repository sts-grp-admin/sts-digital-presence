import { MonthData } from "./storage";

// File de synchronisation du mode cloud (revue PR #1).
//
// Les clés sont RATTACHÉES À L'UTILISATEUR (`ik:v1:u:<uid>:…`) : sur un poste
// partagé, les brouillons de A ne peuvent jamais fuiter vers le compte de B.
// Un mois est marqué « dirty » AVANT la tentative d'upsert et n'est démarqué
// qu'au succès : une saisie hors-ligne ou interrompue est re-poussée au
// chargement suivant au lieu d'être silencieusement écrasée par le cloud.

const pad2 = (n: number) => String(n).padStart(2, "0");
const dirtyKey = (uid: string, year: number, month: number) =>
  `ik:v1:u:${uid}:dirty:${year}-${pad2(month)}`;
const dirtyPrefix = (uid: string, year: number) => `ik:v1:u:${uid}:dirty:${year}-`;

export function markDirty(uid: string, year: number, month: number, data: MonthData): void {
  localStorage.setItem(dirtyKey(uid, year, month), JSON.stringify(data));
}

export function clearDirty(uid: string, year: number, month: number): void {
  localStorage.removeItem(dirtyKey(uid, year, month));
}

export function listDirty(uid: string, year: number): { month: number; data: MonthData }[] {
  const result: { month: number; data: MonthData }[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(dirtyPrefix(uid, year))) continue;
    try {
      const month = Number(key.slice(-2));
      const data = JSON.parse(localStorage.getItem(key) ?? "") as MonthData;
      if (month >= 1 && month <= 12 && data?.days) result.push({ month, data });
    } catch {
      localStorage.removeItem(key);
    }
  }
  return result.sort((a, b) => a.month - b.month);
}
