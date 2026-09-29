import { useEffect, useRef, useState } from 'react';
import { EXAM_TASKS, SUBTOPICS, chapterOf, experimentsOf, getLesson, getQuestion, getSubtopic } from '../content';
import { subProgress } from '../learning/mastery';
import { useProgress } from '../progress/store';
import { Link, navigate } from '../app/router';
import { QuestionView } from '../quiz/QuestionView';
import { BlockView } from '../ui/Blocks';
import { IconArrowLeft, IconArrowRight, IconCheck } from '../ui/icons';
import { Bar } from '../ui/primitives';
import { pagesLong, SelfRatingControl } from '../ui/topic';

export function Lesson({ sub: subId, start }: { sub: string; start?: string }) {
  const sub = getSubtopic(subId);
  const lesson = getLesson(subId);
  const { state, markSection, setSelf, visit } = useProgress();
  const done = state.lessons[subId]?.done ?? [];
  const sections = lesson?.sections ?? [];
  const firstOpen = sections.findIndex((s) => !done.includes(s.id));
  const [idx, setIdx] = useState(() => {
    const fromQuery = start ? sections.findIndex((s) => s.id === start) : -1;
    return fromQuery >= 0 ? fromQuery : firstOpen >= 0 ? firstOpen : 0;
  });
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sub) visit(sub.id);
  }, [sub?.id]);

  // Beim Wechsel des Abschnitts (nicht beim ersten Öffnen) an den Anfang springen
  const mounted = useRef(false);
  useEffect(() => {
    document.querySelector('.lesson-step.is-current')?.scrollIntoView({ block: 'nearest', inline: 'center' });
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    topRef.current?.focus({ preventScroll: true });
    topRef.current?.scrollIntoView({ block: 'start' });
  }, [idx]);

  if (!sub || !lesson) {
    return (
      <div className="page page-narrow">
        <header className="page-head">
          <h1>Lerneinheit nicht gefunden</h1>
        </header>
        <Link to="/themen" className="btn btn-primary">Zur Themenübersicht</Link>
      </div>
    );
  }

  const finished = idx >= sections.length;
  const section = sections[Math.min(idx, sections.length - 1)];
  const chapter = chapterOf(sub.id)!;
  const doneCount = sections.filter((s) => done.includes(s.id)).length;

  const complete = () => {
    markSection(sub.id, section.id, sections.length);
    setIdx(idx + 1);
  };

  return (
    <div className="page lesson">
      <nav className="crumbs" aria-label="Pfad">
        <Link to="/themen">Themen</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/thema/${sub.id}`}>{sub.title}</Link>
        <span aria-hidden="true">›</span>
        <span>Lernmodus</span>
      </nav>

      <header className="page-head">
        <span className="eyebrow">Lernmodus · {chapter.title}</span>
        <h1>{sub.title}</h1>
        {lesson.intro && idx === 0 && <p className="lead">{lesson.intro}</p>}
        <span className="src-tag topic-src"><span aria-hidden="true">📘</span> {pagesLong(sub.pages)}</span>
      </header>

      <div className="lesson-layout">
        <aside className="lesson-nav" aria-label="Abschnitte">
          <div className="row-between" style={{ fontSize: 'var(--fs-sm)' }}>
            <span className="muted">{doneCount} von {sections.length} erledigt</span>
          </div>
          <Bar value={doneCount / sections.length} thin label="Fortschritt der Lerneinheit" />
          <ol className="lesson-steps">
            {sections.map((s, i) => (
              <li key={s.id}>
                <button type="button" className={`lesson-step ${i === idx ? 'is-current' : ''} ${done.includes(s.id) ? 'is-done' : ''}`} aria-current={i === idx ? 'step' : undefined} onClick={() => setIdx(i)}>
                  <span className="lesson-step-n num" aria-hidden="true">{done.includes(s.id) ? <IconCheck width={14} height={14} /> : i + 1}</span>
                  <span>{s.title}</span>
                  {done.includes(s.id) && <span className="sr-only">(erledigt)</span>}
                </button>
              </li>
            ))}
            <li>
              <button type="button" className={`lesson-step ${finished ? 'is-current' : ''}`} onClick={() => setIdx(sections.length)}>
                <span className="lesson-step-n" aria-hidden="true">★</span>
                <span>Abschluss</span>
              </button>
            </li>
          </ol>
        </aside>

        <div className="lesson-main" ref={topRef} tabIndex={-1}>
          {!finished ? (
            <section key={section.id} className="stack-l" aria-labelledby={`sec-${section.id}`}>
              <div className="stack-s" style={{ gap: 4 }}>
                <span className="eyebrow">Abschnitt {idx + 1} von {sections.length}</span>
                <h2 id={`sec-${section.id}`}>{section.title}</h2>
              </div>
              {section.blocks.map((b, i) =>
                b.kind === 'check' ? (
                  <div key={i} className="check-block">
                    <div className="check-head">
                      <span aria-hidden="true">🧠</span> Verständnischeck
                    </div>
                    {b.questionIds.map((qid) => {
                      const q = getQuestion(qid);
                      return q ? <QuestionView key={qid} q={q} mode="lesson" hideFigure={!!q.figure && section.blocks.some((x) => x.kind === 'widget' && x.widget === q.figure!.widget)} /> : null;
                    })}
                  </div>
                ) : (
                  <BlockView key={i} block={b} />
                ),
              )}
              <div className="lesson-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}>
                  <IconArrowLeft /> Zurück
                </button>
                <button type="button" className="btn btn-primary" onClick={complete}>
                  {done.includes(section.id) ? 'Weiter' : 'Verstanden – weiter'} <IconArrowRight />
                </button>
              </div>
            </section>
          ) : (
            <LessonEnd subId={sub.id} onSelf={(r) => setSelf(sub.id, r)} self={state.self[sub.id]?.r} />
          )}
        </div>
      </div>
    </div>
  );
}

function LessonEnd({ subId, onSelf, self }: { subId: string; onSelf: (r: 'sicher' | 'unsicher' | 'nicht') => void; self?: 'sicher' | 'unsicher' | 'nicht' }) {
  const { state } = useProgress();
  const p = subProgress(state, subId);
  const exps = experimentsOf(subId);
  const tasks = EXAM_TASKS.filter((t) => t.subs.includes(subId));
  const i = SUBTOPICS.findIndex((s) => s.id === subId);
  const next = SUBTOPICS[i + 1];
  return (
    <section className="stack-l" aria-labelledby="end-title">
      <div className="card stack">
        <span className="eyebrow">Abschluss</span>
        <h2 id="end-title">{p.lesson >= 1 ? 'Lerneinheit geschafft!' : 'Fast geschafft'}</h2>
        <p className="muted">
          {p.lesson >= 1
            ? 'Festige das Thema jetzt mit Karteikarten und dem Quiz – so bleibt es hängen.'
            : `Du hast ${Math.round(p.lesson * p.counts.sections)} von ${p.counts.sections} Abschnitten abgeschlossen.`}
        </p>
        <div className="stack-s">
          <span className="field-label">Wie sicher fühlst du dich jetzt?</span>
          <SelfRatingControl value={self} onChange={onSelf} label="Selbsteinschätzung" />
        </div>
      </div>
      <div className="action-grid">
        <Link to={`/karten/lernen/sub-${subId}`} className="card card-link action-card action-primary">
          <span className="card-title">Karteikarten</span>
          <span className="muted">{p.counts.cards} Karten zu diesem Thema</span>
        </Link>
        <Link to={`/quiz?sub=${subId}`} className="card card-link action-card">
          <span className="card-title">Quiz</span>
          <span className="muted">{p.counts.questions} Fragen</span>
        </Link>
        {exps.map((e) => (
          <Link key={e.id} to={`/experiment/${e.id}`} className="card card-link action-card">
            <span className="card-title">{e.title}</span>
            <span className="muted">Experiment Schritt für Schritt</span>
          </Link>
        ))}
        {tasks.map((t) => (
          <Link key={t.id} to={`/klausur/${t.id}`} className="card card-link action-card">
            <span className="card-title">{t.title}</span>
            <span className="muted">Klausurtraining</span>
          </Link>
        ))}
      </div>
      {next && (
        <button type="button" className="btn btn-soft" onClick={() => navigate(`/lernen/${next.id}`)}>
          Nächstes Thema: {next.title} <IconArrowRight />
        </button>
      )}
    </section>
  );
}
