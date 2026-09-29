import { useState } from 'react';
import { CHAPTERS, EXAM_TASKS, getExamTask, getQuestion, getSubtopic } from '../content';
import type { Result } from '../progress/types';
import { RESULT_META } from '../learning/grading';
import { useProgress } from '../progress/store';
import { Link } from '../app/router';
import { QuestionView } from '../quiz/QuestionView';
import { IconArrowRight, IconPen } from '../ui/icons';
import { Bar } from '../ui/primitives';
import { SourceTag } from '../ui/Provenance';
import { MaterialView } from '../ui/Material';
import { Markdown } from '../ui/Markdown';

export function KlausurList({ sub }: { sub?: string }) {
  const { state } = useProgress();
  const list = sub ? EXAM_TASKS.filter((t) => t.subs.includes(sub)) : EXAM_TASKS;
  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Klausurtraining</span>
        <h1>Materialaufgaben</h1>
        <p className="lead">
          Übungen nach den Materialien und Aufgaben deiner PDF – mit Tabellen, Diagrammen, Stammbäumen und Versuchen. Es sind keine neuen Originalaufgaben,
          sondern Aufbereitungen der Aufgaben aus deinem Buch, mit Teilaufgaben in Klausurform.
        </p>
      </header>
      {sub && (
        <div className="row">
          <span className="chip chip-accent">Thema: {getSubtopic(sub)?.title}</span>
          <Link to="/klausur" className="btn btn-ghost btn-small">Alle zeigen</Link>
        </div>
      )}
      {CHAPTERS.map((c) => {
        const tasks = list.filter((t) => c.subtopics.includes(t.subs[0]));
        if (!tasks.length) return null;
        return (
          <section key={c.id} className="section" aria-labelledby={`kl-${c.id}`}>
            <h2 id={`kl-${c.id}`} style={{ fontSize: 'var(--fs-xl)' }}>{c.title}</h2>
            <div className="list">
              {tasks.map((t) => {
                const done = t.parts.filter((p) => state.q[p]).length;
                return (
                  <Link key={t.id} to={`/klausur/${t.id}`} className="list-item">
                    <IconPen aria-hidden="true" />
                    <span className="list-item-main">
                      <span className="list-item-title">{t.title}</span>
                      <span className="list-item-meta">{t.parts.length} Teilaufgaben · {done ? `${done} bearbeitet` : 'noch nicht bearbeitet'} · {t.basedOn}</span>
                    </span>
                    <IconArrowRight aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function KlausurTask({ id }: { id: string }) {
  const t = getExamTask(id);
  const [results, setResults] = useState<Record<string, Result>>({});
  const [step, setStep] = useState(0);
  if (!t) {
    return (
      <div className="page page-narrow">
        <header className="page-head"><h1>Aufgabe nicht gefunden</h1></header>
        <Link to="/klausur" className="btn btn-primary">Zum Klausurtraining</Link>
      </div>
    );
  }
  const parts = t.parts.map((p) => getQuestion(p)!).filter(Boolean);
  const answered = Object.keys(results).length;
  const done = step >= parts.length;
  return (
    <div className="page page-narrow">
      <nav className="crumbs" aria-label="Pfad">
        <Link to="/klausur">Klausurtraining</Link>
        <span aria-hidden="true">›</span>
        <span>{t.subs.map((s) => getSubtopic(s)?.title).join(', ')}</span>
      </nav>
      <header className="page-head">
        <span className="eyebrow">Materialaufgabe</span>
        <h1>{t.title}</h1>
        <p className="faint" style={{ margin: 0, fontSize: 'var(--fs-sm)' }}>{t.basedOn}</p>
        <SourceTag src={t.src} />
      </header>

      <section className="card stack klausur-material" aria-label="Material">
        <span className="eyebrow">Material</span>
        <Markdown text={t.intro} />
        <MaterialView blocks={t.material} />
      </section>

      <div className="stack-s">
        <div className="row-between" style={{ fontSize: 'var(--fs-sm)' }}>
          <span className="muted">Teilaufgabe {Math.min(step + 1, parts.length)} von {parts.length}</span>
          <span className="faint num">{answered} bearbeitet</span>
        </div>
        <Bar value={answered / parts.length} thin label="Bearbeitete Teilaufgaben" />
      </div>

      {parts.slice(0, Math.min(step + 1, parts.length)).map((q, k) => (
        <QuestionView
          key={q.id}
          q={q}
          mode="klausur"
          headingLevel={2}
          onResult={(r) => setResults((x) => ({ ...x, [q.id]: r }))}
          footer={
            results[q.id] && k === step ? (
              <div className="row" style={{ justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-primary" onClick={() => setStep(step + 1)}>
                  {k + 1 < parts.length ? 'Nächste Teilaufgabe' : 'Abschließen'} <IconArrowRight />
                </button>
              </div>
            ) : undefined
          }
        />
      ))}

      {done && (
        <div className="card stack-s">
          <h2 className="card-title">Aufgabe bearbeitet</h2>
          {parts.map((q, k) => (
            <span key={q.id}>{results[q.id] ? RESULT_META[results[q.id]].icon : '–'} Teilaufgabe {k + 1}</span>
          ))}
          <div className="row">
            <Link to="/klausur" className="btn btn-primary">Weitere Materialaufgaben</Link>
            <Link to={`/thema/${t.subs[0]}`} className="btn btn-ghost">Zum Thema</Link>
          </div>
        </div>
      )}
    </div>
  );
}
