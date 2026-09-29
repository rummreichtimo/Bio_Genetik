import { useEffect, useState } from 'react';
import {
  CURRICULUM_ITEMS,
  EXAM_TASKS,
  chapterOf,
  experimentsOf,
  getLesson,
  getSubtopic,
  isTaskPart,
  issuesOf,
  questionsOf,
  termsOf,
  CHAPTERS,
} from '../content';
import type { Level } from '../content/types';
import { subProgress } from '../learning/mastery';
import { pct } from '../learning/stats';
import { useProgress } from '../progress/store';
import { Link } from '../app/router';
import { IconArrowRight, IconBook, IconCards, IconFlask, IconPen, IconQuiz } from '../ui/icons';
import { LEVEL_META, ProgressRing, StatusChip } from '../ui/primitives';
import { ExternalRef, ProvNote, SourceTag } from '../ui/Provenance';
import { Markdown } from '../ui/Markdown';
import { pagesLong, SELF_META, SelfRatingControl } from '../ui/topic';
import { CURRICULUM_STATUS } from './Curriculum';

const TERM_PREVIEW = 8;

export function Topic({ id }: { id: string }) {
  const sub = getSubtopic(id);
  const { state, setSelf, visit } = useProgress();
  const [allTerms, setAllTerms] = useState(false);

  // Beim Öffnen eines Themas zählt es als „zuletzt besucht“ (für „Weiterlernen“).
  useEffect(() => {
    if (sub) visit(sub.id);
  }, [sub?.id]);

  if (!sub) {
    return (
      <div className="page page-narrow">
        <header className="page-head">
          <h1>Thema nicht gefunden</h1>
          <p className="lead">Dieses Thema gibt es in deiner Lernapp nicht.</p>
        </header>
        <div>
          <Link to="/themen" className="btn btn-primary">
            Zur Themenübersicht
          </Link>
        </div>
      </div>
    );
  }

  const chapter = chapterOf(sub.id)!;
  const chapterNo = CHAPTERS.findIndex((c) => c.id === chapter.id) + 1;
  const p = subProgress(state, sub.id);
  const lesson = getLesson(sub.id);
  const terms = termsOf(sub.id);
  const questions = questionsOf(sub.id).filter((q) => !isTaskPart(q.id));
  const experiments = experimentsOf(sub.id);
  const tasks = EXAM_TASKS.filter((t) => t.subs.includes(sub.id));
  const issues = issuesOf(sub.id);
  const curriculum = CURRICULUM_ITEMS.filter((c) => c.subs.includes(sub.id));
  const levels = ([1, 2, 3, 4, 5] as Level[]).map((l) => ({ level: l, n: questions.filter((q) => q.level === l).length }));
  const shownTerms = allTerms ? terms : terms.slice(0, TERM_PREVIEW);
  const selfEntry = state.self[sub.id];

  return (
    <div className="page">
      <nav className="crumbs" aria-label="Pfad">
        <Link to="/themen">Themen</Link>
        <span aria-hidden="true">›</span>
        <span>
          Kapitel {chapterNo} · {chapter.title}
        </span>
      </nav>

      <header className="page-head">
        <span className="eyebrow">{sub.bookNo ? `Buchkapitel ${sub.bookNo}` : chapter.bookRef}</span>
        <h1>{sub.title}</h1>
        <p className="lead">{sub.summary}</p>
        <span className="src-tag topic-src">
          <span aria-hidden="true">📘</span>
          <span className="sr-only">Aus deiner Quelle: </span>
          {pagesLong(sub.pages)}
        </span>
      </header>

      <section className="card topic-overview" aria-label="Dein Stand in diesem Thema">
        <ProgressRing value={p.progress} size={120} stroke={11} sub="Fortschritt" />
        <div className="topic-overview-main">
          <div className="row" style={{ gap: 8 }}>
            <StatusChip status={p.status} />
            {p.accuracy !== null && <span className="chip chip-outline">Trefferquote {pct(p.accuracy)}</span>}
          </div>
          <dl className="topic-facts">
            <div>
              <dt>Lernabschnitte</dt>
              <dd className="num">
                {Math.round(p.lesson * p.counts.sections)}/{p.counts.sections}
              </dd>
            </div>
            <div>
              <dt>Aufgaben bearbeitet</dt>
              <dd className="num">
                {p.counts.answered}/{questionsOf(sub.id).length}
              </dd>
            </div>
            <div>
              <dt>Karten gesehen</dt>
              <dd className="num">
                {p.counts.cardsSeen}/{p.counts.cards}
              </dd>
            </div>
          </dl>
          <div className="stack-s" style={{ gap: 6 }}>
            <span className="field-label" id="self-label">
              Wie sicher fühlst du dich in diesem Thema?
            </span>
            <SelfRatingControl value={selfEntry?.r} onChange={(r) => setSelf(sub.id, r)} label="Selbsteinschätzung" />
            <span className="faint" style={{ fontSize: 'var(--fs-xs)' }}>
              {selfEntry
                ? `Zuletzt: ${SELF_META[selfEntry.r].icon} ${SELF_META[selfEntry.r].label}. Bei „noch nicht“ schlägt dir die App das Thema öfter vor.`
                : 'Deine Einschätzung fließt in die Lernvorschläge ein.'}
            </span>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="actions-title">
        <h2 id="actions-title" className="sr-only">
          Lernen und üben
        </h2>
        <div className="action-grid">
          <Link to={`/lernen/${sub.id}`} className="card card-link action-card action-primary">
            <IconBook aria-hidden="true" />
            <span className="card-title">Lernmodus</span>
            <span className="muted">{lesson ? `${lesson.sections.length} kurze Abschnitte mit Verständnisfragen` : 'Erklärungen'}</span>
            <span className="plan-cta">
              {p.lesson > 0 && p.lesson < 1 ? 'Weiterlernen' : p.lesson >= 1 ? 'Wiederholen' : 'Starten'} <IconArrowRight width={18} height={18} />
            </span>
          </Link>
          <Link to={`/karten/lernen/sub-${sub.id}`} className="card card-link action-card">
            <IconCards aria-hidden="true" />
            <span className="card-title">Karteikarten</span>
            <span className="muted">{p.counts.cards} Karten</span>
          </Link>
          <Link to={`/quiz?sub=${sub.id}`} className="card card-link action-card">
            <IconQuiz aria-hidden="true" />
            <span className="card-title">Quiz</span>
            <span className="muted">{questions.length} Fragen</span>
          </Link>
          {tasks.length > 0 && (
            <Link to={tasks.length === 1 ? `/klausur/${tasks[0].id}` : `/klausur?sub=${sub.id}`} className="card card-link action-card">
              <IconPen aria-hidden="true" />
              <span className="card-title">Klausurtraining</span>
              <span className="muted">
                {tasks.length} {tasks.length === 1 ? 'Material' : 'Materialien'} aus deiner PDF
              </span>
            </Link>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="levels-title">
        <div className="section-head">
          <h2 id="levels-title">Fragen nach Schwierigkeit</h2>
        </div>
        <div className="level-grid">
          {levels.map(({ level, n }) =>
            n > 0 ? (
              <Link key={level} to={`/quiz?sub=${sub.id}&stufe=${level}`} className={`level-tile lvl-${level}`}>
                <span aria-hidden="true">{LEVEL_META[level].icon}</span>
                <span className="level-tile-label">{LEVEL_META[level].label}</span>
                <span className="num level-tile-n">{n}</span>
              </Link>
            ) : (
              <span key={level} className={`level-tile lvl-${level} level-tile-empty`}>
                <span aria-hidden="true">{LEVEL_META[level].icon}</span>
                <span className="level-tile-label">{LEVEL_META[level].label}</span>
                <span className="num level-tile-n">0</span>
              </span>
            ),
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="terms-title">
        <div className="section-head">
          <h2 id="terms-title">Fachbegriffe</h2>
          <Link to={`/glossar?sub=${sub.id}`} className="btn btn-ghost btn-small">
            Im Glossar <IconArrowRight />
          </Link>
        </div>
        <dl className="term-list">
          {shownTerms.map((t) => (
            <div key={t.id} className="term-item">
              <dt>
                <span className="term-name">{t.term}</span>
                <SourceTag src={t.src} prov={t.prov ?? 'pdf'} />
              </dt>
              <dd>
                <Markdown text={t.def} />
                {t.simple && (
                  <p className="term-simple">
                    <span className="term-simple-label">Einfach erklärt:</span> {t.simple}
                  </p>
                )}
                {t.prov === 'ext' && t.ext && (
                  <p className="faint" style={{ fontSize: 'var(--fs-xs)' }}>
                    🌐 Nicht aus deiner Quelle. <ExternalRef ext={t.ext} />
                  </p>
                )}
              </dd>
            </div>
          ))}
        </dl>
        {terms.length > TERM_PREVIEW && (
          <button type="button" className="btn btn-soft" onClick={() => setAllTerms((v) => !v)} aria-expanded={allTerms}>
            {allTerms ? 'Weniger anzeigen' : `Alle ${terms.length} Begriffe anzeigen`}
          </button>
        )}
      </section>

      {(experiments.length > 0 || tasks.length > 0) && (
        <section className="section" aria-labelledby="exp-title">
          <div className="section-head">
            <h2 id="exp-title">Experimente & Materialien</h2>
          </div>
          <div className="list">
            {experiments.map((e) => (
              <Link key={e.id} to={`/experiment/${e.id}`} className="list-item">
                <IconFlask aria-hidden="true" />
                <span className="list-item-main">
                  <span className="list-item-title">{e.title}</span>
                  <span className="list-item-meta">
                    Experiment{e.who ? ` · ${e.who}` : ''}
                    {e.year ? ` · ${e.year}` : ''} · {e.steps.length} Schritte
                  </span>
                </span>
                <IconArrowRight aria-hidden="true" />
              </Link>
            ))}
            {tasks.map((t) => (
              <Link key={t.id} to={`/klausur/${t.id}`} className="list-item">
                <IconPen aria-hidden="true" />
                <span className="list-item-main">
                  <span className="list-item-title">{t.title}</span>
                  <span className="list-item-meta">
                    Klausurtraining · {t.parts.length} Teilaufgaben · {t.basedOn}
                  </span>
                </span>
                <IconArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {issues.length > 0 && (
        <section className="section" aria-labelledby="issues-title">
          <div className="section-head">
            <h2 id="issues-title">Hinweise zur Quelle</h2>
            <Link to="/quellen" className="btn btn-ghost btn-small">
              Alle Hinweise <IconArrowRight />
            </Link>
          </div>
          <div className="stack">
            {issues.map((i) => (
              <ProvNote key={i.id} prov="warn" title={i.title} src={i.src}>
                <Markdown text={i.text} />
              </ProvNote>
            ))}
          </div>
        </section>
      )}

      {curriculum.length > 0 && (
        <section className="section" aria-labelledby="curr-title">
          <div className="section-head">
            <h2 id="curr-title">Lehrplan</h2>
            <Link to="/lehrplan" className="btn btn-ghost btn-small">
              Lehrplan-Check <IconArrowRight />
            </Link>
          </div>
          <div className="list">
            {curriculum.map((c) => (
              <div key={c.id} className="list-item">
                <span className="list-item-main">
                  <span className="row" style={{ gap: 8 }}>
                    <span className="list-item-meta">Lehrplan {c.area.slice(0, 3)}</span>
                    <span className={`chip ${CURRICULUM_STATUS[c.status].cls}`}>
                      <span aria-hidden="true">{CURRICULUM_STATUS[c.status].icon}</span> {CURRICULUM_STATUS[c.status].label}
                    </span>
                  </span>
                  <span>Die Lernenden {c.text}.</span>
                  {c.note && <span className="faint" style={{ fontSize: 'var(--fs-sm)' }}>{c.note}</span>}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
