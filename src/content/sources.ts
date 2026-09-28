import type { Src } from './types';

/** PDF-Seite → Buchseiten (Doppelseite) bzw. Lehrplanseite. Geprüft anhand der Scans. */
export const PDF_PAGES: Record<number, { label: string; book?: [number, number]; topic: string }> = {
  1: { label: 'Lehrplan S. 20', topic: 'Kompetenzerwartungen 2.1 und 2.2' },
  2: { label: 'Buch S. 232–233', book: [232, 233], topic: 'DNA – Trägerin der Erbinformation' },
  3: { label: 'Buch S. 234–235', book: [234, 235], topic: 'Aufbau und Verpackung der DNA, Chargaff-Regel' },
  4: { label: 'Buch S. 236–237', book: [236, 237], topic: 'Replikation: Grundprinzip, Meselson-Stahl' },
  5: { label: 'Buch S. 238–239', book: [238, 239], topic: 'Ablauf der Replikation, Fehlerkorrektur, Taylor' },
  6: { label: 'Buch S. 240–241', book: [240, 241], topic: 'PCR' },
  7: { label: 'Buch S. 242–243', book: [242, 243], topic: 'Gelelektrophorese, Faktor-V-Leiden' },
  8: { label: 'Buch S. 244–245', book: [244, 245], topic: 'DNA-Sequenzierung' },
  9: { label: 'Buch S. 246–247', book: [246, 247], topic: 'Funktion von Genen (Beadle & Tatum)' },
  10: { label: 'Buch S. 248–249', book: [248, 249], topic: 'Genetischer Code, Codesonne' },
  11: { label: 'Buch S. 250–251', book: [250, 251], topic: 'Transkription bei Prokaryoten' },
  12: { label: 'Buch S. 252–253', book: [252, 253], topic: 'Translation: tRNA, Ribosomen' },
  13: { label: 'Buch S. 254–255', book: [254, 255], topic: 'Ablauf der Translation, Antibiotikum-Versuch' },
  14: { label: 'Buch S. 256–257', book: [256, 257], topic: 'Genexpression bei Eukaryoten, Insulinsynthese' },
  15: { label: 'Buch S. 258–259', book: [258, 259], topic: 'Mutationen: Substitutionen' },
  16: { label: 'Buch S. 260–261', book: [260, 261], topic: 'Insertion/Deletion, Modifikationen' },
  17: { label: 'Buch S. 262–263', book: [262, 263], topic: 'Klausuraufgaben: Proteinbiosynthese und Antibiotika' },
  18: { label: 'Buch S. 264–265', book: [264, 265], topic: 'Genregulation: Chromatin- und Transkriptionsebene' },
  19: { label: 'Buch S. 266–267', book: [266, 267], topic: 'Spleißen, RNA-Interferenz, Proteasom' },
  20: { label: 'Buch S. 268–269', book: [268, 269], topic: 'Epigenetik, Zwillinge' },
  21: { label: 'Buch S. 270–271', book: [270, 271], topic: 'Bienen, Agouti-Mäuse, X-Inaktivierung' },
  22: { label: 'Buch S. 280–281', book: [280, 281], topic: 'CRISPR/Cas: Aufbau und Virusabwehr' },
  23: { label: 'Buch S. 282–283', book: [282, 283], topic: 'CRISPR/Cas: Reparatur, Pflanzen- und Tierzucht' },
  24: { label: 'Buch S. 284–285', book: [284, 285], topic: 'CRISPR/Cas beim Menschen, Gene Drive' },
  25: { label: 'Buch S. 296–297', book: [296, 297], topic: 'X-chromosomale Erbgänge, Stammbaumanalyse' },
  26: { label: 'Buch S. 308–309', book: [308, 309], topic: 'Genetische Beratung, Chorea Huntington' },
  27: { label: 'Buch S. 310–311', book: [310, 311], topic: 'Pränataldiagnostik, PID, Zypern' },
  28: { label: 'Buch S. 294–295', book: [294, 295], topic: 'Erbgänge des Menschen' },
  29: { label: 'Lehrplan S. 21', topic: 'Kompetenzerwartungen 2.3 bis 2.5' },
};

export const PDF_PAGE_COUNT = 29;

export function isValidPdfPage(p: number): boolean {
  return Number.isInteger(p) && p >= 1 && p <= PDF_PAGE_COUNT;
}

/** Kurzform: „PDF S. 5 · Buch S. 238–239“ */
export function formatSrc(src: Src): string {
  const page = PDF_PAGES[src.pdf];
  const base = page ? `PDF S. ${src.pdf} · ${page.label}` : `PDF S. ${src.pdf}`;
  return src.note ? `${base} · ${src.note}` : base;
}

export function formatSrcList(srcs: Src[] | undefined): string {
  if (!srcs || srcs.length === 0) return '';
  const pages = Array.from(new Set(srcs.map((s) => s.pdf))).sort((a, b) => a - b);
  if (pages.length === 1) return formatSrc(srcs[0]);
  return `PDF S. ${pages.join(', ')}`;
}
