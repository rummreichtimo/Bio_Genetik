import { CARDS } from '../content';
import { dayKey, lastDays, DAY_MS } from '../lib/date';
import type { ProgressState } from '../progress/types';
import { isDue } from './srs';

export function isActiveDay(d: { s: number; q: number; k: number } | undefined): boolean {
  return !!d && (d.q > 0 || d.k > 0 || d.s >= 60);
}

/** Lernserie: aufeinanderfolgende aktive Tage bis heute (heute darf noch offen sein). */
export function streak(state: ProgressState, now = Date.now()): number {
  let count = 0;
  const today = dayKey(now);
  let t = now;
  if (!isActiveDay(state.days[today])) t -= DAY_MS; // Serie läuft weiter, solange gestern gelernt wurde
  for (let i = 0; i < 3650; i++) {
    const key = dayKey(t);
    if (!isActiveDay(state.days[key])) break;
    count += 1;
    t -= DAY_MS;
  }
  return count;
}

export interface Totals {
  attempts: number;
  correct: number;
  partial: number;
  wrong: number;
  accuracy: number | null;
  secondsTotal: number;
  secondsToday: number;
  seconds7: number;
  cardReviews: number;
  activeDays: number;
}

export function totals(state: ProgressState, now = Date.now()): Totals {
  let correct = 0;
  let partial = 0;
  let wrong = 0;
  for (const st of Object.values(state.q)) {
    correct += st.c;
    partial += st.p;
    wrong += st.w;
  }
  const attempts = correct + partial + wrong;
  let secondsTotal = 0;
  let cardReviews = 0;
  let activeDays = 0;
  for (const d of Object.values(state.days)) {
    secondsTotal += d.s;
    cardReviews += d.k;
    if (isActiveDay(d)) activeDays += 1;
  }
  const today = state.days[dayKey(now)];
  const seconds7 = lastDays(7, now).reduce((a, k) => a + (state.days[k]?.s ?? 0), 0);
  return {
    attempts,
    correct,
    partial,
    wrong,
    accuracy: attempts ? (correct + 0.5 * partial) / attempts : null,
    secondsTotal,
    secondsToday: today?.s ?? 0,
    seconds7,
    cardReviews,
    activeDays,
  };
}

export interface CardQueueInfo {
  due: number;
  fresh: number;
  learned: number;
}

export function cardQueueInfo(state: ProgressState, now = Date.now(), filter?: (sub: string) => boolean): CardQueueInfo {
  let due = 0;
  let fresh = 0;
  let learned = 0;
  for (const c of CARDS) {
    if (filter && !filter(c.sub)) continue;
    const st = state.cards[c.id];
    if (!st) fresh += 1;
    else if (isDue(st, now)) due += 1;
    else learned += 1;
  }
  return { due, fresh, learned };
}

export function examSummary(state: ProgressState): { count: number; last: number | null; avg3: number | null; best: number | null } {
  const ex = state.exams;
  if (!ex.length) return { count: 0, last: null, avg3: null, best: null };
  const last3 = ex.slice(-3);
  return {
    count: ex.length,
    last: ex[ex.length - 1].score,
    avg3: last3.reduce((a, e) => a + e.score, 0) / last3.length,
    best: Math.max(...ex.map((e) => e.score)),
  };
}

export const pct = (x: number | null | undefined, digits = 0): string =>
  x === null || x === undefined ? '–' : `${(x * 100).toFixed(digits)} %`;
