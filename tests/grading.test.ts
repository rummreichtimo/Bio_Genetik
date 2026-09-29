import { describe, expect, it } from 'vitest';
import { QUESTIONS } from '../src/content';
import type { Question, QFree } from '../src/content/types';
import { CODE, transcribe, translate, classifyPoint } from '../src/learning/code';
import { grade, gradeFree, isComplete, normalizeAa, type Response } from '../src/learning/grading';

/** Die Musterlösung als Antwort – muss immer „vollständig richtig“ ergeben. */
function perfect(q: Question): Response {
  switch (q.type) {
    case 'single': return { type: 'single', value: q.answer };
    case 'multi': return { type: 'multi', value: q.answers };
    case 'tf': return { type: 'tf', value: q.answer };
    case 'cloze': return { type: 'cloze', value: q.gaps.map((g) => g.accept[0]) };
    case 'order': return { type: 'order', value: q.items };
    case 'match': return { type: 'match', value: Object.fromEntries(q.pairs.map((p) => [p.left, p.right])) };
    case 'label': return { type: 'label', value: Object.fromEntries(q.labels.map((l) => [l.marker, l.answer])) };
    case 'input': return { type: 'input', value: q.accept[0] };
    case 'free': return { type: 'free', value: q.model };
  }
}

describe('Genetischer Code', () => {
  it('hat 64 Codons mit 3 Stoppcodons und AUG = Met', () => {
    expect(Object.keys(CODE)).toHaveLength(64);
    expect(Object.values(CODE).filter((a) => a === 'Stopp')).toHaveLength(3);
    expect(CODE.AUG).toBe('Met');
    expect(CODE.UUU).toBe('Phe');
    expect(CODE.UGG).toBe('Trp');
  });

  it('übersetzt Material A (PDF S. 15) wie in der PDF', () => {
    const mrna = transcribe('TAC TGT ACC TCA ACG GTA CTA GCG CTC');
    expect(translate(mrna).map((x) => x.aa).join('-')).toBe('Met-Thr-Trp-Ser-Cys-His-Asp-Arg-Glu');
  });

  it('ordnet Punktmutationen ein', () => {
    expect(classifyPoint('Thr', 'Thr')).toBe('stumm');
    expect(classifyPoint('Ser', 'Arg')).toBe('missense');
    expect(classifyPoint('Trp', 'Stopp')).toBe('nonsense');
  });
});

describe('Bewertung', () => {
  it('jede Frage ist mit ihrer eigenen Lösung vollständig richtig', () => {
    const bad = QUESTIONS.filter((q) => grade(q, perfect(q)).result !== 'correct').map((q) => q.id);
    expect(bad).toEqual([]);
  });

  it('jede Lösung gilt als vollständig ausgefüllt', () => {
    expect(QUESTIONS.filter((q) => !isComplete(q, perfect(q))).map((q) => q.id)).toEqual([]);
  });

  it('Multiple Choice: falsche Kreuze ziehen Punkte ab', () => {
    const q = QUESTIONS.find((x) => x.type === 'multi' && x.answers.length >= 2)!;
    if (q.type !== 'multi') throw new Error();
    expect(grade(q, { type: 'multi', value: q.answers.slice(0, Math.ceil(q.answers.length / 2)) }).result).toBe('partial');
    const wrongs = q.options.map((_, i) => i).filter((i) => !q.answers.includes(i));
    expect(grade(q, { type: 'multi', value: wrongs }).result).toBe('wrong');
  });

  it('Lückentext ignoriert Groß-/Kleinschreibung und Satzzeichen', () => {
    const q = QUESTIONS.find((x) => x.type === 'cloze')!;
    if (q.type !== 'cloze') throw new Error();
    const g = grade(q, { type: 'cloze', value: q.gaps.map((x) => ` ${x.accept[0].toUpperCase()}.`) });
    expect(g.result).toBe('correct');
  });

  it('Aminosäuren: Schreibweise und Start/Stopp sind egal', () => {
    expect(normalizeAa('Met - ala-TRP Stopp')).toEqual(['met', 'ala', 'trp']);
  });

  it('Zahlen mit Toleranz und Komma', () => {
    const q = QUESTIONS.find((x) => x.type === 'input' && x.mode === 'number')!;
    if (q.type !== 'input') throw new Error();
    expect(grade(q, { type: 'input', value: `${q.accept[0].replace('.', ',')} %` }).result).toBe('correct');
    expect(grade(q, { type: 'input', value: '999999' }).result).toBe('wrong');
  });

  it('Freitext: leere/zu kurze Antworten sind falsch, Fehlvorstellung deckelt auf „teilweise“', () => {
    const q = QUESTIONS.find((x): x is QFree => x.type === 'free' && !!x.misconceptions?.length)!;
    expect(gradeFree(q, 'weiß nicht').result).toBe('wrong');
    const m = q.misconceptions![0];
    // Musterantwort + eine Formulierung, die die Fehlvorstellung auslöst
    const trigger = { 'dominant': 'Mukoviszidose ist dominant.' } as Record<string, string>;
    if (trigger[m.id]) {
      const g = gradeFree(q, `${q.model} ${trigger[m.id]}`);
      expect(g.free!.misconceptions.length).toBeGreaterThan(0);
      expect(g.result).toBe('partial');
    }
  });

  it('Freitext: Genotypen werden mit Groß-/Kleinschreibung erkannt', () => {
    const q = QUESTIONS.find((x) => x.id === 'eg-q8') as QFree;
    const hetero = q.rubric.find((r) => r.id === 'hetero')!;
    expect(gradeFree(q, 'Aa ist gesund, weil ein Allel reicht. aa ist krank wegen Ionenkanal.').free!.found).toContain(hetero);
  });
});
