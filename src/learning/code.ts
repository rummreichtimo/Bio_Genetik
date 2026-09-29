/**
 * Genetischer Code (Codesonne, PDF S. 10, Abb. 5): mRNA-Codons in 5'→3'-Richtung → Aminosäure (Dreibuchstabencode).
 * „Stopp“ markiert die drei Stoppcodons; AUG (Met) ist zugleich Startcodon.
 */
const BASES = 'UCAG';
const AA_ROWS =
  // erste Base U, C, A, G; innerhalb: zweite Base U, C, A, G; dritte Base U, C, A, G
  'Phe Phe Leu Leu Ser Ser Ser Ser Tyr Tyr Stopp Stopp Cys Cys Stopp Trp ' +
  'Leu Leu Leu Leu Pro Pro Pro Pro His His Gln Gln Arg Arg Arg Arg ' +
  'Ile Ile Ile Met Thr Thr Thr Thr Asn Asn Lys Lys Ser Ser Arg Arg ' +
  'Val Val Val Val Ala Ala Ala Ala Asp Asp Glu Glu Gly Gly Gly Gly';

export const CODE: Record<string, string> = {};
{
  const aas = AA_ROWS.trim().split(/\s+/);
  let i = 0;
  for (const a of BASES) for (const b of BASES) for (const c of BASES) CODE[a + b + c] = aas[i++];
}

export const AA_NAMES: Record<string, string> = {
  Ala: 'Alanin', Arg: 'Arginin', Asn: 'Asparagin', Asp: 'Asparaginsäure', Cys: 'Cystein', Gln: 'Glutamin', Glu: 'Glutaminsäure',
  Gly: 'Glycin', His: 'Histidin', Ile: 'Isoleucin', Leu: 'Leucin', Lys: 'Lysin', Met: 'Methionin', Phe: 'Phenylalanin',
  Pro: 'Prolin', Ser: 'Serin', Thr: 'Threonin', Trp: 'Tryptophan', Tyr: 'Tyrosin', Val: 'Valin', Stopp: 'Stoppcodon',
};

const PAIR_DNA: Record<string, string> = { A: 'T', T: 'A', G: 'C', C: 'G' };
const DNA_TO_RNA: Record<string, string> = { A: 'U', T: 'A', G: 'C', C: 'G' };

/** Nur Basenbuchstaben (Großschreibung). */
export const clean = (s: string) => s.toUpperCase().replace(/[^ACGTU]/g, '');

/** Komplementärer DNA-Strang (gleiche Leserichtung der Positionen). */
export const complementDna = (dna: string) => Array.from(clean(dna)).map((b) => PAIR_DNA[b] ?? b).join('');

/** Codogener Strang (3'→5' notiert) → mRNA (5'→3'). */
export const transcribe = (codogenic3to5: string) => Array.from(clean(codogenic3to5)).map((b) => DNA_TO_RNA[b] ?? b).join('');

export function codons(mrna: string): string[] {
  const s = clean(mrna).replace(/T/g, 'U');
  const out: string[] = [];
  for (let i = 0; i + 3 <= s.length; i += 3) out.push(s.slice(i, i + 3));
  return out;
}

export const translateCodon = (codon: string) => CODE[codon.replace(/T/g, 'U')] ?? '?';

/** Übersetzt ab dem ersten Codon (ohne Startsuche) bis zum ersten Stoppcodon. */
export function translate(mrna: string): { codon: string; aa: string }[] {
  const out: { codon: string; aa: string }[] = [];
  for (const c of codons(mrna)) {
    const aa = translateCodon(c);
    out.push({ codon: c, aa });
    if (aa === 'Stopp') break;
  }
  return out;
}

export type MutationKind = 'stumm' | 'missense' | 'nonsense';

/** Einordnung einer Substitution anhand der Aminosäure vorher/nachher (Codon hat sich geändert). */
export function classifyPoint(before: string, after: string): MutationKind {
  if (before === after) return 'stumm';
  if (after === 'Stopp') return 'nonsense';
  return 'missense';
}
