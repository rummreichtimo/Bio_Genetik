import type { Block, Experiment, Flashcard, Lesson, LessonSection, Question } from './types';

/**
 * Verknüpft Inhalte miteinander:
 *  - Experimente werden als eigene Abschnitte in die passende Lerneinheit eingefügt,
 *    damit alles, was abgefragt wird, auch im Lernmodus vorkommt.
 *  - Jede Frage und jede Karteikarte bekommt „ihren“ Lernabschnitt (zum Nachlesen und
 *    um nur Gelerntes abzufragen).
 */

// ---------------------------------------------------------------------------
// Text & Stichwörter
// ---------------------------------------------------------------------------

export function blockText(b: Block): string {
  switch (b.kind) {
    case 'text':
      return b.md;
    case 'bullets':
      return `${b.title ?? ''} ${b.items.join(' ')}`;
    case 'term':
      return `${b.term} ${b.term} ${b.def} ${b.simple ?? ''}`;
    case 'steps':
      return `${b.title ?? ''} ${b.steps.map((s) => `${s.title} ${s.text}`).join(' ')}`;
    case 'compare':
      return `${b.title ?? ''} ${b.columns.join(' ')} ${b.rows.map((r) => `${r.label} ${r.cells.join(' ')}`).join(' ')}`;
    case 'note':
      return `${b.title} ${b.md}`;
    case 'widget':
      return b.caption ?? '';
    case 'experiment':
    case 'check':
      return '';
  }
}

export function experimentText(e: Experiment): string {
  return `${e.title} ${e.who ?? ''} ${e.steps.map((s) => s.text).join(' ')}`;
}

const STOP = new Set(
  'diese dieser dieses einer eines einem einen werden wurde wurden durch nicht keine immer zwischen sowie wobei damit dabei deshalb ihrer ihren seine seiner beide beiden jeweils andere anderen weitere weiteren entsteht entstehen welche welcher welches bestimmte bestimmten richtig falsch aussage antwort beispiel haben koennen muss mehr nach unter ueber auch noch schon sehr viele wenn dann oder beim ohne gleich sich sind wird kann kommt ihnen einem ihrem ihres somit zwei drei eine erste ersten zweite zweiten jede jeder jedes beim eigene eigenen'.split(
    ' ',
  ),
);

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[¹²³⁴⁵⁶⁷⁸⁹⁰]/g, (d) => String('⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(d)));
}

/** Stichwörter (mind. 5 Zeichen, ohne Füllwörter), auf einen Wortstamm gekürzt. */
export function keywords(s: string): string[] {
  return norm(s)
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 5 && !STOP.has(w))
    .map((w) => (w.length > 8 ? w.slice(0, w.length - 2) : w));
}

function questionText(q: Question): string {
  const why = q.why.map((w) => w.text).join(' ');
  switch (q.type) {
    case 'single':
      return `${q.prompt} ${q.options[q.answer]} ${why}`;
    case 'multi':
      return `${q.prompt} ${q.answers.map((i) => q.options[i]).join(' ')} ${why}`;
    case 'tf':
      return `${q.prompt} ${q.correction ?? ''} ${why}`;
    case 'cloze':
      return `${q.prompt} ${q.text} ${q.gaps.map((g) => g.accept[0]).join(' ')} ${why}`;
    case 'order':
      return `${q.prompt} ${q.items.join(' ')} ${why}`;
    case 'match':
      return `${q.prompt} ${q.pairs.map((p) => `${p.left} ${p.right}`).join(' ')} ${why}`;
    case 'label':
      return `${q.prompt} ${q.labels.map((l) => l.answer).join(' ')} ${why}`;
    case 'input':
      return `${q.prompt} ${q.solution} ${why}`;
    case 'free':
      return `${q.prompt} ${q.model} ${why}`;
  }
}

// ---------------------------------------------------------------------------
// Ähnlichkeit Text ↔ Abschnitt
// ---------------------------------------------------------------------------

interface SectionIndex {
  section: LessonSection;
  words: Set<string>;
  pages: Set<number>;
}

function sectionWords(s: LessonSection, experiments: Map<string, Experiment>): Set<string> {
  const parts = s.blocks.map((b) => (b.kind === 'experiment' ? experimentText(experiments.get(b.id)!) : blockText(b)));
  return new Set(keywords(`${s.title} ${s.title} ${parts.join(' ')}`));
}

function sectionPages(s: LessonSection, experiments: Map<string, Experiment>): Set<number> {
  const pages = new Set<number>();
  for (const b of s.blocks) {
    if (b.kind === 'experiment') experiments.get(b.id)?.src.forEach((x) => pages.add(x.pdf));
    else if ('src' in b && b.src) b.src.forEach((x) => pages.add(x.pdf));
  }
  return pages;
}

function bestSection(index: SectionIndex[], text: string, pages: number[]): LessonSection | undefined {
  if (!index.length) return undefined;
  const df = new Map<string, number>();
  for (const s of index) for (const w of s.words) df.set(w, (df.get(w) ?? 0) + 1);
  const ws = [...new Set(keywords(text))];
  let best: SectionIndex | undefined;
  let bestScore = -1;
  for (const s of index) {
    let score = 0;
    for (const w of ws) if (s.words.has(w)) score += Math.log(1 + index.length / (df.get(w) ?? 1));
    if (pages.some((p) => s.pages.has(p))) score += 0.5;
    if (score > bestScore) {
      bestScore = score;
      best = s;
    }
  }
  return best?.section;
}

const GENERIC = new Set(keywords('Experiment Experimente Versuch Versuche Nachweis Beweis Methode Material Entdeckung Analyse'));

// ---------------------------------------------------------------------------
// Experimente in die Lerneinheiten einfügen
// ---------------------------------------------------------------------------

export function withExperiments(lessons: Lesson[], experiments: Experiment[], isTaskPart: (id: string) => boolean): Lesson[] {
  const expMap = new Map(experiments.map((e) => [e.id, e]));
  return lessons.map((lesson) => {
    const referenced = new Set(lesson.sections.flatMap((s) => s.blocks.flatMap((b) => (b.kind === 'experiment' ? [b.id] : []))));
    const checked = new Set(lesson.sections.flatMap((s) => s.blocks.flatMap((b) => (b.kind === 'check' ? b.questionIds : []))));
    const own = experiments.filter((e) => e.sub === lesson.sub && !referenced.has(e.id));
    if (!own.length) return lesson;
    const index: SectionIndex[] = lesson.sections.map((s) => ({ section: s, words: sectionWords(s, expMap), pages: sectionPages(s, expMap) }));
    const after = new Map<string, LessonSection[]>();
    const inside = new Map<string, Block[]>();
    for (const e of own) {
      const target = bestSection(index, experimentText(e), e.src.map((x) => x.pdf)) ?? lesson.sections[lesson.sections.length - 1];
      const checks = e.questionIds.filter((id) => !isTaskPart(id) && !checked.has(id)).slice(0, 2);
      checks.forEach((id) => checked.add(id));
      const blocks: Block[] = [{ kind: 'experiment', id: e.id }];
      if (checks.length) blocks.push({ kind: 'check', questionIds: checks });
      // Handelt der Abschnitt schon vom selben Versuch (z. B. „Meselson“ im Titel), kommt das Experiment dort hinein
      const titleWords = new Set(keywords(target.title).filter((w) => !GENERIC.has(w)));
      const same = keywords(e.title).some((w) => !GENERIC.has(w) && titleWords.has(w));
      if (same) inside.set(target.id, [...(inside.get(target.id) ?? []), ...blocks]);
      else after.set(target.id, [...(after.get(target.id) ?? []), { id: e.id, title: `Experiment: ${e.title}`, blocks }]);
    }
    return {
      ...lesson,
      sections: lesson.sections.flatMap((s) => {
        const extra = inside.get(s.id);
        if (!extra) return [s, ...(after.get(s.id) ?? [])];
        // vorhandene Checks ans Ende, damit erst gelesen und dann geprüft wird
        const own = s.blocks.filter((b) => b.kind !== 'check');
        const checks = s.blocks.filter((b) => b.kind === 'check');
        const exp = extra[0].kind === 'experiment' ? extra[0] : undefined;
        const widget = exp ? experiments.find((e) => e.id === exp.id)?.widget : undefined;
        const first: Block = exp && widget && own.some((b) => b.kind === 'widget' && b.widget === widget) ? { ...exp, noWidget: true } : extra[0];
        // Hat der Abschnitt schon einen Verständnischeck, genügt der – sonst den des Experiments nehmen
        const merged: Block[] = [...own, first, ...(checks.length ? checks : extra.slice(1))];
        return [{ ...s, blocks: merged }, ...(after.get(s.id) ?? [])];
      }),
    };
  });
}

// ---------------------------------------------------------------------------
// Frage/Karte → Lernabschnitt
// ---------------------------------------------------------------------------

export interface SectionRef {
  sub: string;
  section: string;
  title: string;
}

export function linkToSections(
  lessons: Lesson[],
  experiments: Experiment[],
  questions: Question[],
  cards: Flashcard[],
): { questions: Map<string, SectionRef>; cards: Map<string, SectionRef> } {
  const expMap = new Map(experiments.map((e) => [e.id, e]));
  const byLesson = new Map(
    lessons.map((l) => [l.sub, l.sections.map((s) => ({ section: s, words: sectionWords(s, expMap), pages: sectionPages(s, expMap) }))]),
  );
  const ref = (sub: string, s: LessonSection): SectionRef => ({ sub, section: s.id, title: s.title });
  const qOut = new Map<string, SectionRef>();
  const cOut = new Map<string, SectionRef>();

  // 1) explizit in Verständnischecks eingebaut
  for (const l of lessons) {
    for (const s of l.sections) {
      for (const b of s.blocks) if (b.kind === 'check') for (const id of b.questionIds) if (!qOut.has(id)) qOut.set(id, ref(l.sub, s));
    }
  }
  // 2) Experiment-Fragen → Experiment-Abschnitt
  for (const l of lessons) {
    for (const s of l.sections) {
      for (const b of s.blocks) if (b.kind === 'experiment') for (const id of expMap.get(b.id)?.questionIds ?? []) if (!qOut.has(id)) qOut.set(id, ref(l.sub, s));
    }
  }
  // 3) explizite Angabe oder Ähnlichkeit
  for (const q of questions) {
    const index = byLesson.get(q.sub);
    if (!index) continue;
    if (q.learn) {
      const s = index.find((x) => x.section.id === q.learn);
      if (s) {
        qOut.set(q.id, ref(q.sub, s.section));
        continue;
      }
    }
    if (qOut.has(q.id)) continue;
    const s = bestSection(index, questionText(q), q.src.map((x) => x.pdf));
    if (s) qOut.set(q.id, ref(q.sub, s));
  }

  for (const c of cards) {
    const index = byLesson.get(c.sub);
    if (!index) continue;
    const explicit = c.learn ? index.find((x) => x.section.id === c.learn) : undefined;
    const byTerm =
      c.kind === 'begriff'
        ? index.find((x) => x.section.blocks.some((b) => b.kind === 'term' && norm(b.term) === norm(c.front)))
        : undefined;
    const s = explicit?.section ?? byTerm?.section ?? bestSection(index, `${c.front} ${c.front} ${c.back}`, c.src.map((x) => x.pdf));
    if (s) cOut.set(c.id, ref(c.sub, s));
  }
  return { questions: qOut, cards: cOut };
}
