import type { CardRating, CardStat } from '../progress/types';
import { DAY_MS, startOfDay } from '../lib/date';

/**
 * Leitner-Wiederholungssystem mit 6 Fächern.
 * Fach 0 = sofort wieder (nicht gewusst), danach 1, 2, 4, 8, 16 Tage.
 */
export const BOX_INTERVAL_DAYS = [0, 1, 2, 4, 8, 16] as const;
export const MAX_BOX = BOX_INTERVAL_DAYS.length - 1;

export function nextCardStat(prev: CardStat | undefined, rating: CardRating, now: number = Date.now()): CardStat {
  const box0 = prev?.box ?? 0;
  let box: number;
  if (rating === 'known') {
    box = Math.min(MAX_BOX, box0 + 1);
  } else if (rating === 'unsure') {
    box = box0 <= 1 ? 1 : box0 - 1;
  } else {
    box = 0;
  }
  const days = BOX_INTERVAL_DAYS[box];
  const due = days === 0 ? now : startOfDay(now) + days * DAY_MS;
  return {
    box,
    due,
    n: (prev?.n ?? 0) + 1,
    lapses: (prev?.lapses ?? 0) + (rating === 'unknown' && prev ? 1 : 0),
    last: rating,
    at: now,
  };
}

export function isDue(stat: CardStat | undefined, now: number = Date.now()): boolean {
  return !!stat && stat.due <= now;
}

/** Beherrschung einer Karte (0..1) für die Fortschrittsberechnung. */
export function cardMastery(stat: CardStat | undefined): number {
  return stat ? stat.box / MAX_BOX : 0;
}
