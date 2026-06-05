import { Cv } from "./bareme";

// Persistance 100 % locale (localStorage du navigateur de chaque salarié).
// Une clé PAR MOIS : éditer ou effacer un mois ne peut jamais toucher les autres.

export interface YearSettings {
  name: string;
  cv: Cv;
  electric: boolean;
  /** Adresse de départ habituelle */
  depart: string;
  /** Adresse de destination / client habituel */
  destination: string;
  /** Distance habituelle par jour travaillé (km) */
  distanceKm: number;
}

/** Présence d'un jour dans `days` = jour travaillé. km/dest = overrides ponctuels. */
export interface DayEntry {
  km?: number;
  dest?: string;
}

export interface MonthData {
  days: Record<number, DayEntry>;
}

const NS = "ik:v1";
const pad2 = (n: number) => String(n).padStart(2, "0");

const settingsKey = (year: number) => `${NS}:settings:${year}`;
const monthKey = (year: number, month: number) => `${NS}:month:${year}-${pad2(month)}`;

export function loadSettings(year: number): YearSettings | null {
  try {
    const raw = localStorage.getItem(settingsKey(year));
    return raw ? (JSON.parse(raw) as YearSettings) : null;
  } catch {
    return null;
  }
}

export function saveSettings(year: number, settings: YearSettings): void {
  localStorage.setItem(settingsKey(year), JSON.stringify(settings));
}

export function loadMonth(year: number, month: number): MonthData {
  try {
    const raw = localStorage.getItem(monthKey(year, month));
    return raw ? (JSON.parse(raw) as MonthData) : { days: {} };
  } catch {
    return { days: {} };
  }
}

export function saveMonth(year: number, month: number, data: MonthData): void {
  localStorage.setItem(monthKey(year, month), JSON.stringify(data));
}

/** Suppression EXPLICITE d'un seul mois (bouton "Effacer" avec confirmation). */
export function clearMonth(year: number, month: number): void {
  localStorage.removeItem(monthKey(year, month));
}

/** Suppression des réglages locaux d'une année (purge après import cloud). */
export function clearSettings(year: number): void {
  localStorage.removeItem(settingsKey(year));
}

export function loadYearMonths(year: number): MonthData[] {
  return Array.from({ length: 12 }, (_, i) => loadMonth(year, i + 1));
}

// --- Sauvegarde / restauration JSON (filet de sécurité si changement de poste) ---

/** Jamais dans une sauvegarde : le jeton de déverrouillage PIN voyagerait
 *  dans un fichier partageable et serait restauré par l'import (revue PR #1). */
const BACKUP_EXCLUDED = new Set([`${NS}:unlocked`]);

export function exportBackup(): string {
  const dump: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(`${NS}:`) && !BACKUP_EXCLUDED.has(key)) {
      dump[key] = JSON.parse(localStorage.getItem(key) ?? "null");
    }
  }
  return JSON.stringify({ app: "sts-ik", exportedAt: new Date().toISOString(), data: dump }, null, 2);
}

export function importBackup(json: string): number {
  const parsed = JSON.parse(json) as { app?: string; data?: Record<string, unknown> };
  if (parsed.app !== "sts-ik" || !parsed.data) {
    throw new Error("Fichier de sauvegarde invalide");
  }
  let count = 0;
  for (const [key, value] of Object.entries(parsed.data)) {
    if (key.startsWith(`${NS}:`) && !BACKUP_EXCLUDED.has(key)) {
      localStorage.setItem(key, JSON.stringify(value));
      count++;
    }
  }
  return count;
}
