import { CHAPTERS, getLesson, getSubtopic, LESSONS, SUBTOPICS } from '../content';
import { nextLearnStep, lessonShare, type LearnStep } from '../learning/learned';
import { useProgress } from '../progress/store';
import { Link } from '../app/router';
import { ChapterGlyph, IconArrowRight, IconCheck } from '../ui/icons';
import { Bar } from '../ui/primitives';
import type { ProgressState } from '../progress/types';

/** Gesamtstand im Lernpfad (abgeschlossene Abschnitte über alle Themen) */
export function pathTotals(state: ProgressState): { done: number; total: number } {
  let done = 0;
  let total = 0;
  for (const l of LESSONS) {
    const d = state.lessons[l.sub]?.done ?? [];
    total += l.sections.length;
    done += l.sections.filter((s) => d.includes(s.id)).length;
  }
  return { done, total };
}

export const stepLink = (step: LearnStep) => `/lernen/${step.sub}?abschnitt=${step.section}`;

/** Großer „Weiterlernen“-Kasten (Startseite und Lernpfad) */
export function ContinueCard({ compact }: { compact?: boolean }) {
  const { state } = useProgress();
  const step = nextLearnStep(state);
  const { done, total } = pathTotals(state);
  if (!step) {
    return (
      <section className="card continue-card" aria-labelledby="continue-title">
        <span className="eyebrow">Lernpfad</span>
        <h2 id="continue-title" className="continue-title">Alle Themen durchgearbeitet 🎉</h2>
        <p className="muted">Jetzt ist Festigen dran: Karteikarten, Quiz und eine Probeprüfung.</p>
        <div className="row">
          <Link to="/ueben" className="btn btn-primary btn-large">Üben <IconArrowRight /></Link>
        </div>
      </section>
    );
  }
  const sub = getSubtopic(step.sub)!;
  const fresh = done === 0;
  return (
    <section className="card continue-card" aria-labelledby="continue-title">
      <span className="eyebrow">{fresh ? 'Hier beginnt dein Lernweg' : 'Weiterlernen'}</span>
      <h2 id="continue-title" className="continue-title">{sub.title}</h2>
      <p className="continue-step">
        Abschnitt {step.index + 1} von {step.total}: <strong>{step.sectionTitle}</strong>
      </p>
      {fresh && !compact && (
        <ol className="how-list">
          <li><strong>Lesen & verstehen</strong> – kurze Abschnitte mit Abbildungen, Fachbegriffen und Experimenten aus deiner PDF.</li>
          <li><strong>Kurz prüfen</strong> – am Ende eines Abschnitts ein, zwei Verständnisfragen.</li>
          <li><strong>Festigen</strong> – Karteikarten und Quiz fragen nur ab, was du schon gelernt hast. Zu jeder Frage kannst du nachlesen.</li>
        </ol>
      )}
      <div className="row">
        <Link to={stepLink(step)} className="btn btn-primary btn-large">
          {fresh ? 'Mit dem ersten Thema beginnen' : 'Weiterlernen'} <IconArrowRight />
        </Link>
        {!compact && <Link to="/lernpfad" className="btn btn-ghost">Ganzer Lernpfad</Link>}
      </div>
      <div className="stack-s" style={{ gap: 4 }}>
        <div className="row-between" style={{ fontSize: 'var(--fs-sm)' }}>
          <span className="muted">Lernpfad</span>
          <span className="muted num">{done} von {total} Abschnitten</span>
        </div>
        <Bar value={total ? done / total : 0} thin label="Fortschritt im Lernpfad" />
      </div>
    </section>
  );
}

export function LearningPath() {
  const { state } = useProgress();
  const next = nextLearnStep(state);
  let n = 0;
  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Lernen</span>
        <h1>Dein Lernpfad</h1>
        <p className="lead">
          Alle Themen in der Reihenfolge deiner PDF. Arbeite sie nacheinander durch – danach schalten sich die passenden Karteikarten und
          Quizfragen frei.
        </p>
      </header>

      <ContinueCard compact />

      {CHAPTERS.map((ch) => (
        <section key={ch.id} className="section" aria-labelledby={`lp-${ch.id}`}>
          <h2 id={`lp-${ch.id}`} className="row" style={{ gap: 10, fontSize: 'var(--fs-xl)' }}>
            <span className="chapter-icon" aria-hidden="true"><ChapterGlyph icon={ch.icon} /></span>
            {ch.title}
          </h2>
          <ol className="path-list">
            {ch.subtopics.map((sid) => {
              n += 1;
              const sub = getSubtopic(sid)!;
              const lesson = getLesson(sid);
              const share = lessonShare(state, sid);
              const doneCount = Math.round(share * (lesson?.sections.length ?? 0));
              const status = share >= 1 ? 'done' : share > 0 ? 'active' : 'open';
              const isNext = next?.sub === sid;
              return (
                <li key={sid} className={`path-item path-${status} ${isNext ? 'is-next' : ''}`}>
                  <span className="path-n num" aria-hidden="true">{status === 'done' ? <IconCheck width={16} height={16} /> : n}</span>
                  <div className="path-body">
                    <div className="path-head">
                      <Link to={`/thema/${sid}`} className="path-title">{sub.title}</Link>
                      <span className={`chip ${status === 'done' ? 'chip-good' : status === 'active' ? 'chip-warn' : ''}`}>
                        {status === 'done' ? 'Gelernt' : status === 'active' ? 'In Arbeit' : 'Noch nicht begonnen'}
                      </span>
                    </div>
                    <span className="muted" style={{ fontSize: 'var(--fs-sm)' }}>{sub.summary}</span>
                    <div className="path-progress">
                      <Bar value={share} thin label={`Lernfortschritt ${sub.title}`} />
                      <span className="faint num" style={{ fontSize: 'var(--fs-xs)' }}>{doneCount}/{lesson?.sections.length ?? 0} Abschnitte</span>
                    </div>
                    <div className="row" style={{ gap: 8 }}>
                      <Link
                        to={isNext && next ? stepLink(next) : `/lernen/${sid}`}
                        className={`btn btn-small ${isNext || status === 'active' ? 'btn-primary' : 'btn-soft'}`}
                      >
                        {status === 'done' ? 'Nochmal lesen' : status === 'active' ? 'Weiterlernen' : 'Lernen'}
                      </Link>
                      {status !== 'open' && (
                        <>
                          <Link to={`/karten/lernen/sub-${sid}`} className="btn btn-ghost btn-small">Karten</Link>
                          <Link to={`/quiz?sub=${sid}`} className="btn btn-ghost btn-small">Quiz</Link>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
      <p className="faint" style={{ fontSize: 'var(--fs-sm)' }}>
        {SUBTOPICS.length} Themen · {LESSONS.reduce((a, l) => a + l.sections.length, 0)} Abschnitte
      </p>
    </div>
  );
}
