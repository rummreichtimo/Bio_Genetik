/**
 * Prüft die Lerninhalte auf formale Fehler, die man beim Lesen leicht übersieht:
 * doppelte IDs, ungültige Seitenzahlen, falsche Antwortindizes, fehlende Quellen
 * für externe Informationen – und ob jede Musterantwort ihr eigenes Bewertungsraster erfüllt.
 */
import { describe, expect, it } from 'vitest';
import {
  CARDS,
  CHAPTERS,
  CURRICULUM_ITEMS,
  EXAM_TASKS,
  EXPERIMENTS,
  ISSUES,
  LESSONS,
  QUESTIONS,
  SUBTOPICS,
  SUB_IDS,
  TERMS,
  getQuestion,
  isValidPdfPage,
} from '../src/content';
import type { Block, Explanation, Question, QFree, Src } from '../src/content/types';
import { CASE_PREFIX, matchesAny, prepareText, rx } from '../src/learning/text';

const subSet = new Set(SUB_IDS);

function dupes(ids: string[]): string[] {
  const seen = new Set<string>();
  const d = new Set<string>();
  for (const id of ids) (seen.has(id) ? d : seen).add(id);
  return [...d];
}

/** Sammelt alle Quellenangaben aus beliebig verschachtelten Inhalten. */
function collectSrc(value: unknown, out: Src[] = []): Src[] {
  if (Array.isArray(value)) value.forEach((v) => collectSrc(v, out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if (k === 'src' && Array.isArray(v)) out.push(...(v as Src[]));
      else collectSrc(v, out);
    }
  }
  return out;
}

/** Alle Texte (für Markdown- und Platzhalter-Prüfungen). */
function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

function allPatterns(q: QFree): string[] {
  return [...q.rubric.flatMap((r) => r.any.flat()), ...(q.misconceptions ?? []).flatMap((m) => m.any.flat())];
}

/** Teilt ein Muster an „|“ auf oberster Ebene (nicht in Klammern). */
function topLevelAlternatives(pattern: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    if (c === '\\') {
      cur += c + (pattern[i + 1] ?? '');
      i++;
      continue;
    }
    if (c === '(' || c === '[') depth++;
    if (c === ')' || c === ']') depth--;
    if (c === '|' && depth === 0) {
      parts.push(cur);
      cur = '';
    } else cur += c;
  }
  parts.push(cur);
  return parts;
}

function scoreModel(q: QFree) {
  const text = prepareText(q.model);
  const total = q.rubric.reduce((s, r) => s + (r.weight ?? 1), 0);
  const hit = q.rubric.filter((r) => matchesAny(text, r.any));
  const score = hit.reduce((s, r) => s + (r.weight ?? 1), 0) / total;
  const missed = q.rubric.filter((r) => !hit.includes(r)).map((r) => r.id);
  const misconceptions = (q.misconceptions ?? []).filter((m) => matchesAny(text, m.any)).map((m) => m.id);
  return { score, missed, misconceptions };
}

describe('Struktur', () => {
  it('jedes Kapitel verweist nur auf existierende Unterthemen – und jedes Unterthema gehört zu genau einem Kapitel', () => {
    const fromChapters = CHAPTERS.flatMap((c) => c.subtopics);
    expect(dupes(fromChapters)).toEqual([]);
    expect([...fromChapters].sort()).toEqual([...SUB_IDS].sort());
    for (const s of SUBTOPICS) {
      expect(CHAPTERS.find((c) => c.id === s.chapter)?.subtopics).toContain(s.id);
      s.pages.forEach((pg) => expect(isValidPdfPage(pg), `${s.id}: Seite ${pg}`).toBe(true));
    }
  });

  it('jedes Unterthema hat eine Lektion, Begriffe, Karten und genug Fragen', () => {
    for (const sub of SUB_IDS) {
      expect(LESSONS.filter((l) => l.sub === sub), `Lektion ${sub}`).toHaveLength(1);
      expect(TERMS.filter((t) => t.sub === sub).length, `Begriffe ${sub}`).toBeGreaterThanOrEqual(3);
      expect(CARDS.filter((c) => c.sub === sub).length, `Karten ${sub}`).toBeGreaterThanOrEqual(5);
      expect(QUESTIONS.filter((q) => q.sub === sub).length, `Fragen ${sub}`).toBeGreaterThanOrEqual(10);
    }
  });

  it('jedes Unterthema hat Fragen auf den Niveaus 1 bis 3', () => {
    for (const sub of SUB_IDS) {
      const levels = new Set(QUESTIONS.filter((q) => q.sub === sub).map((q) => q.level));
      for (const l of [1, 2, 3] as const) expect(levels.has(l), `${sub}: Niveau ${l}`).toBe(true);
    }
  });

  it('Lehrplan und Unterthemen verweisen gegenseitig aufeinander', () => {
    const ids = new Set(CURRICULUM_ITEMS.map((c) => c.id));
    for (const item of CURRICULUM_ITEMS) {
      for (const sub of item.subs) {
        expect(subSet.has(sub), `${item.id} → ${sub}`).toBe(true);
        expect(SUBTOPICS.find((s) => s.id === sub)?.curriculum, `${sub} sollte ${item.id} nennen`).toContain(item.id);
      }
      if (item.status !== 'missing') expect(item.subs.length, item.id).toBeGreaterThan(0);
      if (item.status !== 'covered') expect(item.note, `${item.id} braucht eine Erklärung`).toBeTruthy();
    }
    for (const s of SUBTOPICS) {
      for (const c of s.curriculum) {
        expect(ids.has(c), `${s.id}: unbekannter Lehrplanpunkt ${c}`).toBe(true);
        expect(CURRICULUM_ITEMS.find((i) => i.id === c)?.subs, `${c} sollte ${s.id} nennen`).toContain(s.id);
      }
    }
  });
});

describe('IDs und Verweise', () => {
  it('IDs sind eindeutig', () => {
    expect(dupes(QUESTIONS.map((q) => q.id))).toEqual([]);
    expect(dupes(CARDS.map((c) => c.id))).toEqual([]);
    expect(dupes(TERMS.map((t) => t.id))).toEqual([]);
    expect(dupes(EXPERIMENTS.map((e) => e.id))).toEqual([]);
    expect(dupes(EXAM_TASKS.map((t) => t.id))).toEqual([]);
    expect(dupes(ISSUES.map((i) => i.id))).toEqual([]);
    for (const l of LESSONS) expect(dupes(l.sections.map((s) => s.id)), l.sub).toEqual([]);
  });

  it('alle Unterthemen-Verweise existieren', () => {
    const refs = [
      ...LESSONS.map((x) => x.sub),
      ...TERMS.map((x) => x.sub),
      ...CARDS.map((x) => x.sub),
      ...QUESTIONS.map((x) => x.sub),
      ...EXPERIMENTS.map((x) => x.sub),
      ...EXAM_TASKS.flatMap((x) => x.subs),
      ...ISSUES.flatMap((x) => x.subs),
    ];
    expect(refs.filter((s) => !subSet.has(s))).toEqual([]);
  });

  it('Lektions-Checks, Experimente und Klausuraufgaben verweisen auf existierende Fragen', () => {
    const missing: string[] = [];
    for (const l of LESSONS)
      for (const s of l.sections)
        for (const b of s.blocks)
          if (b.kind === 'check') b.questionIds.forEach((id) => getQuestion(id) || missing.push(`${l.sub}/${s.id}: ${id}`));
    for (const e of EXPERIMENTS) e.questionIds.forEach((id) => getQuestion(id) || missing.push(`${e.id}: ${id}`));
    for (const t of EXAM_TASKS) t.parts.forEach((id) => getQuestion(id) || missing.push(`${t.id}: ${id}`));
    expect(missing).toEqual([]);
  });

  it('Lektions-Checks enthalten nur Fragen des eigenen Unterthemas und keine Klausur-Teilaufgaben', () => {
    const parts = new Set(EXAM_TASKS.flatMap((t) => t.parts));
    for (const l of LESSONS)
      for (const s of l.sections)
        for (const b of s.blocks)
          if (b.kind === 'check')
            for (const id of b.questionIds) {
              expect(getQuestion(id)?.sub, `${l.sub}/${s.id}: ${id}`).toBe(l.sub);
              expect(parts.has(id), `${id} ist Klausur-Teilaufgabe`).toBe(false);
            }
  });

  it('jede Teilaufgabe gehört zu genau einer Klausuraufgabe und zu deren Unterthemen', () => {
    const parts = EXAM_TASKS.flatMap((t) => t.parts);
    expect(dupes(parts)).toEqual([]);
    for (const t of EXAM_TASKS) {
      expect(t.parts.length, t.id).toBeGreaterThanOrEqual(2);
      for (const id of t.parts) expect(t.subs, `${t.id}: ${id}`).toContain(getQuestion(id)!.sub);
    }
  });

  it('jede Frage wird irgendwo angeboten (Quiz-Pool, Lektion, Experiment oder Klausur)', () => {
    // Quiz-Pool = alle Fragen außer Klausur-Teilaufgaben → hier genügt: jede Frage hat ein gültiges Unterthema
    for (const q of QUESTIONS) expect(subSet.has(q.sub), q.id).toBe(true);
  });
});

describe('Quellenangaben und Herkunft', () => {
  it('alle PDF-Seitenangaben liegen zwischen 1 und 29', () => {
    const all = collectSrc([LESSONS, TERMS, CARDS, QUESTIONS, EXPERIMENTS, EXAM_TASKS, ISSUES, CURRICULUM_ITEMS]);
    expect(all.length).toBeGreaterThan(500);
    expect(all.filter((s) => !isValidPdfPage(s.pdf))).toEqual([]);
  });

  it('jede Frage, Karte und jeder Begriff hat mindestens eine PDF-Quelle', () => {
    for (const q of QUESTIONS) expect(q.src.length, q.id).toBeGreaterThan(0);
    for (const c of CARDS) expect(c.src.length, c.id).toBeGreaterThan(0);
    for (const t of TERMS) expect(t.src.length, t.id).toBeGreaterThan(0);
  });

  it('externe Informationen tragen immer eine externe Quellenangabe', () => {
    const bad: string[] = [];
    const checkExpl = (owner: string, e: Explanation) => {
      if (e.prov === 'ext' && !e.ext?.label) bad.push(`${owner}: why`);
    };
    for (const q of QUESTIONS) {
      q.why.forEach((e) => checkExpl(q.id, e));
      if (q.prov === 'ext' && !q.why.some((e) => e.prov === 'ext' && e.ext)) bad.push(`${q.id}: prov ext ohne ext-Erklärung`);
    }
    for (const t of TERMS) if (t.prov === 'ext' && !t.ext) bad.push(t.id);
    for (const c of CARDS) if (c.prov === 'ext' && !c.ext) bad.push(c.id);
    const blocks: [string, Block][] = LESSONS.flatMap((l) => l.sections.flatMap((s) => s.blocks.map((b) => [`${l.sub}/${s.id}`, b] as [string, Block])));
    for (const [where, b] of blocks) {
      if (b.kind === 'note' && b.tone === 'ext' && !b.ext) bad.push(`${where}: Notiz „${b.title}“`);
      if ((b.kind === 'text' || b.kind === 'bullets' || b.kind === 'steps' || b.kind === 'compare') && b.prov === 'ext')
        bad.push(`${where}: ${b.kind} mit prov ext – bitte als Notiz mit Quelle anlegen`);
    }
    expect(bad).toEqual([]);
  });

  it('jede Frage hat eine „Warum?“-Erklärung', () => {
    expect(QUESTIONS.filter((q) => q.why.length === 0).map((q) => q.id)).toEqual([]);
  });

  it('Hinweise zur Quelle haben eine Seitenangabe und ein Unterthema', () => {
    for (const i of ISSUES) {
      expect(i.src.length, i.id).toBeGreaterThan(0);
      expect(i.subs.length, i.id).toBeGreaterThan(0);
    }
  });
});

describe('Fragen sind formal korrekt', () => {
  const byType = <T extends Question['type']>(t: T) => QUESTIONS.filter((q): q is Extract<Question, { type: T }> => q.type === t);

  it('Single Choice: Antwortindex gültig, Optionen eindeutig, Feedback nicht zur richtigen Antwort', () => {
    for (const q of byType('single')) {
      expect(q.answer, q.id).toBeGreaterThanOrEqual(0);
      expect(q.answer, q.id).toBeLessThan(q.options.length);
      expect(q.options.length, q.id).toBeGreaterThanOrEqual(3);
      expect(dupes(q.options), q.id).toEqual([]);
      for (const k of Object.keys(q.feedback ?? {})) {
        const i = Number(k);
        expect(i >= 0 && i < q.options.length && i !== q.answer, `${q.id}: feedback ${k}`).toBe(true);
      }
    }
  });

  it('Multiple Choice: Antworten gültig und eindeutig, mindestens eine falsche Option', () => {
    for (const q of byType('multi')) {
      expect(q.answers.length, q.id).toBeGreaterThan(0);
      expect(q.answers.length, q.id).toBeLessThan(q.options.length);
      expect(dupes(q.answers.map(String)), q.id).toEqual([]);
      q.answers.forEach((a) => expect(a >= 0 && a < q.options.length, `${q.id}: ${a}`).toBe(true));
      expect(dupes(q.options), q.id).toEqual([]);
    }
  });

  it('Wahr/Falsch: falsche Aussagen haben eine richtige Fassung', () => {
    for (const q of byType('tf')) if (!q.answer) expect(q.correction, q.id).toBeTruthy();
  });

  it('Lückentext: Platzhalter und Lücken passen zusammen', () => {
    for (const q of byType('cloze')) {
      const found = [...q.text.matchAll(/\{\{(\d+)\}\}/g)].map((m) => Number(m[1]));
      expect([...found].sort((a, b) => a - b), q.id).toEqual(q.gaps.map((_, i) => i));
      q.gaps.forEach((g, i) => {
        expect(g.accept.length, `${q.id}[${i}]`).toBeGreaterThan(0);
        if (g.options) {
          const opts = g.options.map((o) => o.toLowerCase());
          expect(g.accept.some((a) => opts.includes(a.toLowerCase())), `${q.id}[${i}]: richtige Antwort fehlt in den Optionen`).toBe(true);
          expect(dupes(g.options), `${q.id}[${i}]`).toEqual([]);
        }
      });
    }
  });

  it('Reihenfolge: mindestens drei eindeutige Schritte', () => {
    for (const q of byType('order')) {
      expect(q.items.length, q.id).toBeGreaterThanOrEqual(3);
      expect(dupes(q.items), q.id).toEqual([]);
    }
  });

  it('Zuordnung: linke Seite eindeutig, Ablenker kommen rechts nicht vor', () => {
    for (const q of byType('match')) {
      expect(q.pairs.length, q.id).toBeGreaterThanOrEqual(2);
      expect(dupes(q.pairs.map((p) => p.left)), q.id).toEqual([]);
      const rights = new Set(q.pairs.map((p) => p.right));
      (q.distractors ?? []).forEach((d) => expect(rights.has(d), `${q.id}: Ablenker „${d}“`).toBe(false));
    }
  });

  it('Beschriften: Marker eindeutig, Ablenker nicht gleich einer Lösung', () => {
    for (const q of byType('label')) {
      expect(q.labels.length, q.id).toBeGreaterThanOrEqual(3);
      expect(dupes(q.labels.map((l) => l.marker)), q.id).toEqual([]);
      const answers = new Set(q.labels.map((l) => l.answer));
      (q.distractors ?? []).forEach((d) => expect(answers.has(d), `${q.id}: ${d}`).toBe(false));
    }
  });

  it('Eingabe: Lösungen vorhanden, Zahlen sind Zahlen', () => {
    for (const q of byType('input')) {
      expect(q.accept.length, q.id).toBeGreaterThan(0);
      expect(q.solution, q.id).toBeTruthy();
      if (q.mode === 'number') q.accept.forEach((a) => expect(Number.isFinite(Number(a.replace(',', '.'))), `${q.id}: ${a}`).toBe(true));
      if (q.mode === 'seq') q.accept.forEach((a) => expect(a.replace(/[^ACGTU]/gi, '').length, q.id).toBeGreaterThan(0));
    }
  });
});

describe('Freitext-Bewertungsraster', () => {
  const free = QUESTIONS.filter((q): q is QFree => q.type === 'free');

  it('alle Muster lassen sich kompilieren', () => {
    const bad: string[] = [];
    for (const q of free)
      for (const src of allPatterns(q)) {
        try {
          rx(src);
        } catch {
          bad.push(`${q.id}: ${src}`);
        }
      }
    expect(bad).toEqual([]);
  });

  it('keine zu kurzen Alternativen ohne Wortgrenze (sie treffen sonst mitten in Wörtern)', () => {
    const bad: string[] = [];
    for (const q of free)
      for (const src of allPatterns(q)) {
        const body = src.startsWith(CASE_PREFIX) ? src.slice(CASE_PREFIX.length) : src;
        for (const alt of topLevelAlternatives(body)) if (/^[a-zäöüß]{1,2}$/i.test(alt.trim())) bad.push(`${q.id}: „${alt}“ in ${src}`);
      }
    expect(bad).toEqual([]);
  });

  it('Muster ohne „cs:“ sind in Normalform geschrieben (klein, ohne Umlaute)', () => {
    const bad: string[] = [];
    for (const q of free)
      for (const src of allPatterns(q))
        if (!src.startsWith(CASE_PREFIX) && /[A-ZÄÖÜäöüß]/.test(src.replace(/\\[A-Za-z]/g, ''))) bad.push(`${q.id}: ${src}`);
    expect(bad).toEqual([]);
  });

  it('Rasterpunkte haben eindeutige IDs und eine Beschriftung', () => {
    for (const q of free) {
      expect(q.rubric.length, q.id).toBeGreaterThanOrEqual(2);
      expect(dupes(q.rubric.map((r) => r.id)), q.id).toEqual([]);
      q.rubric.forEach((r) => expect(r.label, `${q.id}/${r.id}`).toBeTruthy());
      if (q.compare) q.rubric.forEach((r) => expect(r.group, `${q.id}/${r.id}: Vergleichskriterium fehlt`).toBeTruthy());
    }
  });

  it('jede Musterantwort erreicht in ihrem eigenen Raster „vollständig richtig“ (≥ 80 %) ohne Fehlvorstellung', () => {
    const report: string[] = [];
    for (const q of free) {
      const { score, missed, misconceptions } = scoreModel(q);
      if (score < 0.8 || misconceptions.length) report.push(`${q.id}: ${Math.round(score * 100)} % – fehlt: ${missed.join(', ')}${misconceptions.length ? ` – Fehlvorstellung: ${misconceptions.join(', ')}` : ''}`);
    }
    expect(report).toEqual([]);
  });

  it('eine leere oder themenfremde Antwort erreicht höchstens wenig', () => {
    const offTopic = prepareText('Ich weiß es leider nicht. Das Wetter ist heute schön und die Sonne scheint.');
    const report: string[] = [];
    for (const q of free) {
      const total = q.rubric.reduce((s, r) => s + (r.weight ?? 1), 0);
      const hit = q.rubric.filter((r) => matchesAny(offTopic, r.any)).reduce((s, r) => s + (r.weight ?? 1), 0);
      if (hit / total >= 0.4) report.push(`${q.id}: ${Math.round((hit / total) * 100)} %`);
    }
    expect(report).toEqual([]);
  });
});

describe('Texte', () => {
  const strings = collectStrings([LESSONS, TERMS, CARDS, QUESTIONS, EXPERIMENTS, EXAM_TASKS, ISSUES, CURRICULUM_ITEMS]);

  it('Fettdruck-Markierungen sind paarig', () => {
    expect(strings.filter((s) => (s.match(/\*\*/g) ?? []).length % 2 !== 0)).toEqual([]);
  });

  it('keine Platzhalter oder Entwurfsreste', () => {
    expect(strings.filter((s) => /\b(TODO|FIXME|lorem|ipsum)\b/i.test(s))).toEqual([]);
  });
});
