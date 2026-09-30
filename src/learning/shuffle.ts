/**
 * Reihenfolge der Antwortmöglichkeiten: bei jedem Anzeigen neu gemischt, damit die richtige
 * Antwort mal A, mal B, C oder D ist. Sammel-Antworten („beide“, „keine …“, „nicht bestimmbar“)
 * bleiben – wie in Klausuren üblich – am Ende.
 */
const TRAILING = /^(beide\b|an beiden\b|keine\b|keines\b|nicht bestimmbar|das lässt sich nicht|lässt sich nicht|alle\b)/i;

export function isTrailingOption(text: string): boolean {
  return TRAILING.test(text.trim());
}

/** Liefert die anzuzeigende Reihenfolge als Liste der Original-Indizes. */
export function optionOrder(options: string[], rnd: () => number = Math.random): number[] {
  const movable = options.map((_, i) => i).filter((i) => !isTrailingOption(options[i]));
  const fixed = options.map((_, i) => i).filter((i) => isTrailingOption(options[i]));
  for (let i = movable.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [movable[i], movable[j]] = [movable[j], movable[i]];
  }
  return [...movable, ...fixed];
}
