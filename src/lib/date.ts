export const DAY_MS = 86_400_000;

/** Lokales Datum als Schlüssel „YYYY-MM-DD“. */
export function dayKey(ts: number = Date.now()): string {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function startOfDay(ts: number = Date.now()): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/** Schlüssel der letzten n Tage (ältester zuerst), inklusive heute. */
export function lastDays(n: number, now: number = Date.now()): string[] {
  const out: string[] = [];
  const base = startOfDay(now);
  for (let i = n - 1; i >= 0; i--) {
    // 12 Uhr mittags vermeidet Probleme bei Zeitumstellungen
    out.push(dayKey(base - i * DAY_MS + DAY_MS / 2));
  }
  return out;
}

export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  if (s < 60) return `${s} s`;
  const min = Math.round(s / 60);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const rest = min % 60;
  return rest ? `${h} h ${rest} min` : `${h} h`;
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatDateTime(ts: number): string {
  return new Date(ts).toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function shortWeekday(key: string): string {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d, 12).toLocaleDateString('de-DE', { weekday: 'short' }).replace('.', '');
}
