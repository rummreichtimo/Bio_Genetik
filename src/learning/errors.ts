/** Fehlerarten und Fehlermuster für Fehleranalyse, Tagesplan und Prüfungsauswertung. */
import type { ErrorTag } from '../content/types';
import type { ProgressState } from '../progress/types';

export const ERROR_META: Record<ErrorTag, { label: string; tip: string }> = {
  enzyme: { label: 'Enzyme verwechselt', tip: 'Lege dir zu jedem Enzym eine Karte an: Name → Aufgabe → wo im Ablauf.' },
  sequence: { label: 'Reihenfolge unsicher', tip: 'Zeichne den Ablauf als Fließdiagramm und sprich jeden Schritt laut mit.' },
  direction: { label: '5′→3′ und Leserichtung', tip: 'Markiere bei jeder Sequenz zuerst die Enden (5′/3′), dann lies.' },
  terms: { label: 'Fachbegriffe verwechselt', tip: 'Wiederhole die Begriffskarten des Themas und vergleiche ähnliche Begriffe direkt.' },
  facts: { label: 'Zahlen und Fakten', tip: 'Kurze Lückentexte und Karten mit den Zahlen aus der PDF helfen.' },
  experiment: { label: 'Versuchsauswertung', tip: 'Trenne Beobachtung und Deutung: erst beschreiben, dann erklären.' },
  code: { label: 'Code-Sonne / Basenpaarung', tip: 'Übersetze Schritt für Schritt: DNA → mRNA (komplementär) → Codons → Aminosäuren.' },
  inheritance: { label: 'Erbgänge und Genotypen', tip: 'Gehe nach den drei Schritten der Stammbaumanalyse vor und notiere Genotypen.' },
  mechanism: { label: 'Zusammenhang nicht erklärt', tip: 'Verbinde Ursache und Wirkung mit „weil“ und „dadurch“ – jeder Schritt einzeln.' },
  comparison: { label: 'Unterschiede unklar', tip: 'Vergleiche immer anhand gleicher Kriterien (Tabelle mit Spalten).' },
  evaluation: { label: 'Bewertung / Argumentation', tip: 'Trenne Fakten (deskriptiv) von Wertungen (normativ) und bilde ein begründetes Urteil.' },
};

export interface ErrorPattern {
  sub: string;
  tag: ErrorTag;
  count: number;
  last: number;
  /** davon noch nicht korrigiert (letzte Antwort nicht richtig) */
  open: number;
}

const WINDOW_MS = 60 * 86_400_000;

/** Häufige Fehlermuster „Thema → Fehlerart“, zuletzt aufgetretene zuerst gewichtet. */
export function errorPatterns(state: ProgressState, now = Date.now()): ErrorPattern[] {
  const map = new Map<string, ErrorPattern>();
  for (const e of state.errors) {
    if (now - e.at > WINDOW_MS) continue;
    const key = `${e.sub}|${e.tag}`;
    const p = map.get(key) ?? { sub: e.sub, tag: e.tag, count: 0, last: 0, open: 0 };
    p.count += e.r === 'wrong' ? 1 : 0.5;
    p.last = Math.max(p.last, e.at);
    map.set(key, p);
  }
  for (const p of map.values()) {
    const qs = new Set(state.errors.filter((e) => e.sub === p.sub && e.tag === p.tag).map((e) => e.q));
    p.open = [...qs].filter((q) => state.q[q]?.last !== 'correct').length;
  }
  return [...map.values()].sort((a, b) => b.open - a.open || b.count - a.count || b.last - a.last);
}
