/**
 * Normalisierung von Freitext für die Offline-Bewertung.
 * Alle Muster in den Bewertungsrastern sind für diese Form geschrieben:
 *  - Kleinbuchstaben
 *  - ä→ae, ö→oe, ü→ue, ß→ss
 *  - Bindestriche/Gedankenstriche → Leerzeichen („DNA-Polymerase“ → „dna polymerase“)
 *  - hochgestellte Allel-Buchstaben → normale Buchstaben („Xᵃ“ → „xa“), ^ und _ entfallen („X^a“ → „xa“)
 *  - typografische Apostrophe → '
 *  - mehrfache Leerzeichen → eines
 *
 * Muster mit dem Präfix „cs:“ werden dagegen mit Groß-/Kleinschreibung gegen
 * {@link normalizeCase} geprüft – nötig für Genotypen wie „Aa“, „aa“ oder „XᴬXᵃ“.
 */
export function normalizeText(s: string): string {
  return unifyAlleles(s)
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[’´`‘]/g, "'")
    .replace(/[-–—‐‑]/g, ' ')
    .replace(/[„“"»«]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Wie {@link normalizeText}, aber Groß-/Kleinschreibung bleibt erhalten; Klammern um Allele entfallen („X(A)“ → „XA“). */
export function normalizeCase(s: string): string {
  return unifyAlleles(s)
    .replace(/[(){}[\]]/g, '')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/Ä/g, 'Ae')
    .replace(/Ö/g, 'Oe')
    .replace(/Ü/g, 'Ue')
    .replace(/ß/g, 'ss')
    .replace(/[-–—‐‑]/g, ' ')
    .replace(/[„“"»«]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const SUPERSCRIPTS: Record<string, string> = { 'ᴬ': 'A', 'ᵃ': 'a', 'ₐ': 'a', 'ᴮ': 'B', 'ᵇ': 'b' };

function unifyAlleles(s: string): string {
  return s.replace(/[ᴬᵃₐᴮᵇ]/g, (c) => SUPERSCRIPTS[c] ?? c).replace(/[\^_]/g, '');
}

/** Beide Formen eines Freitexts – so muss er nur einmal normalisiert werden. */
export interface PreparedText {
  norm: string;
  cs: string;
}

export function prepareText(raw: string): PreparedText {
  return { norm: normalizeText(raw), cs: normalizeCase(raw) };
}

/** Für Sequenz-Eingaben: nur Basenbuchstaben behalten. */
export function normalizeSeq(s: string): string {
  return s.toUpperCase().replace(/[^ACGTU]/g, '');
}

/** Für Zahlen-Eingaben: „19,75 %“ → 19.75 */
export function parseNumber(s: string): number | null {
  const m = s.replace(',', '.').match(/-?\d+(\.\d+)?/);
  return m ? Number(m[0]) : null;
}

export const CASE_PREFIX = 'cs:';

const cache = new Map<string, RegExp>();
/** Kompiliert ein Muster (mit Cache). „cs:…“ → mit Groß-/Kleinschreibung, sonst ohne. */
export function rx(source: string): RegExp {
  let r = cache.get(source);
  if (!r) {
    r = source.startsWith(CASE_PREFIX) ? new RegExp(source.slice(CASE_PREFIX.length)) : new RegExp(source, 'i');
    cache.set(source, r);
  }
  return r;
}

/** Prüft eine Mustergruppe: mindestens eine Alternative, deren Muster alle vorkommen. */
export function matchesAny(text: PreparedText | string, any: string[][]): boolean {
  const t = typeof text === 'string' ? { norm: text, cs: text } : text;
  return any.some((all) => all.every((src) => rx(src).test(src.startsWith(CASE_PREFIX) ? t.cs : t.norm)));
}

export function wordCount(s: string): number {
  return s.trim() ? s.trim().split(/\s+/).length : 0;
}
