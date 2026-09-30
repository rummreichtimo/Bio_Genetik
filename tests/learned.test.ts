import { describe, expect, it } from 'vitest';
import { CARDS, EXPERIMENTS, LESSONS, QUESTIONS, getSection, isTaskPart, sectionOfCard, sectionOfQuestion } from '../src/content';
import { isCardLearned, isQuestionLearned, nextLearnStep } from '../src/learning/learned';
import { filterQuestions } from '../src/learning/select';
import { cardQueueInfo } from '../src/learning/stats';
import { buildDeck } from '../src/pages/Cards';
import { markSection, visit } from '../src/progress/logic';
import { emptyState } from '../src/progress/types';

const NOW = Date.UTC(2026, 8, 30, 12);

describe('Lernabschnitte zu Fragen und Karten', () => {
  it('jede Frage und jede Karte hat einen Lernabschnitt im eigenen Thema', () => {
    const bad: string[] = [];
    for (const q of QUESTIONS) {
      const r = sectionOfQuestion(q.id);
      if (!r || r.sub !== q.sub || !getSection(r.sub, r.section)) bad.push(q.id);
    }
    for (const c of CARDS) {
      const r = sectionOfCard(c.id);
      if (!r || r.sub !== c.sub || !getSection(r.sub, r.section)) bad.push(c.id);
    }
    expect(bad).toEqual([]);
  });

  it('Fragen aus Verständnischecks gehören zu genau diesem Abschnitt', () => {
    for (const l of LESSONS)
      for (const s of l.sections)
        for (const b of s.blocks) if (b.kind === 'check') for (const id of b.questionIds) expect(sectionOfQuestion(id)?.section, id).toBe(s.id);
  });

  it('jedes Experiment kommt im Lernmodus vor', () => {
    const inLessons = new Set(LESSONS.flatMap((l) => l.sections.flatMap((s) => s.blocks.flatMap((b) => (b.kind === 'experiment' ? [b.id] : [])))));
    expect(EXPERIMENTS.filter((e) => !inLessons.has(e.id)).map((e) => e.id)).toEqual([]);
  });

  it('explizite Angabe „learn“ zeigt auf einen existierenden Abschnitt', () => {
    for (const q of QUESTIONS) if (q.learn) expect(getSection(q.sub, q.learn), q.id).toBeTruthy();
    for (const c of CARDS) if (c.learn) expect(getSection(c.sub, c.learn), c.id).toBeTruthy();
  });
});

describe('Nur Gelerntes abfragen', () => {
  it('ohne gelernte Abschnitte gibt es keine Quizfragen und keine neuen Karten', () => {
    const s = emptyState(NOW);
    expect(filterQuestions(s, { learnedOnly: true })).toEqual([]);
    expect(cardQueueInfo(s, NOW).fresh).toBe(0);
    expect(buildDeck('neu', s, NOW).ids).toEqual([]);
    expect(filterQuestions(s, {}).length).toBeGreaterThan(0);
  });

  it('ein gelernter Abschnitt schaltet genau seine Fragen und Karten frei', () => {
    const lesson = LESSONS.find((l) => l.sub === 'replikation')!;
    const sec = lesson.sections[0];
    const s = markSection(emptyState(NOW), 'replikation', sec.id, lesson.sections.length, NOW);
    const qs = filterQuestions(s, { learnedOnly: true });
    expect(qs.length).toBeGreaterThan(0);
    for (const q of qs) expect(sectionOfQuestion(q.id)?.section).toBe(sec.id);
    expect(QUESTIONS.filter((q) => !isTaskPart(q.id) && isQuestionLearned(s, q.id)).length).toBe(qs.length);
    const deck = buildDeck('neu', s, NOW).ids;
    expect(deck.length).toBeGreaterThan(0);
    for (const id of deck) expect(isCardLearned(s, id)).toBe(true);
  });

  it('der Lernpfad beginnt vorn und setzt beim zuletzt begonnenen Thema fort', () => {
    let s = emptyState(NOW);
    expect(nextLearnStep(s)).toMatchObject({ sub: 'dna-traeger', index: 0, started: false });
    const l = LESSONS.find((x) => x.sub === 'pcr')!;
    s = visit(markSection(s, 'pcr', l.sections[0].id, l.sections.length, NOW), 'pcr', NOW);
    expect(nextLearnStep(s)).toMatchObject({ sub: 'pcr', index: 1, started: true });
  });
});

describe('Fragen ohne fehlenden Kontext', () => {
  it('Fragen, die sich auf „Material X“ beziehen, zeigen das Material auch an', () => {
    const bad = QUESTIONS.filter((q) => !isTaskPart(q.id) && /Material [A-Z]\b/.test(q.prompt) && !q.material && !q.figure).map((q) => q.id);
    expect(bad).toEqual([]);
  });
});
