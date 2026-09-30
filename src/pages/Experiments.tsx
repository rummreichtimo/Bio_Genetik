import { useState } from 'react';
import { CHAPTERS, EXPERIMENTS, getExperiment, getQuestion, getSubtopic } from '../content';
import { Link } from '../app/router';
import { QuestionView } from '../quiz/QuestionView';
import { IconArrowRight, IconFlask } from '../ui/icons';
import { PROV_META, SourceTag } from '../ui/Provenance';
import { Markdown } from '../ui/Markdown';
import { WidgetView } from '../widgets';
import { STEP_LABEL } from '../ui/ExperimentBlock';

export { STEP_LABEL };

export function ExperimentList() {
  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Experimente & Materialien</span>
        <h1>Versuche verstehen</h1>
        <p className="lead">
          {EXPERIMENTS.length} Versuche aus deiner PDF – Schritt für Schritt von der Fragestellung bis zur Schlussfolgerung. Vor wichtigen Schritten
          kannst du zuerst selbst eine Vermutung aufschreiben.
        </p>
      </header>
      {CHAPTERS.map((ch) => {
        const list = EXPERIMENTS.filter((e) => ch.subtopics.includes(e.sub));
        if (!list.length) return null;
        return (
          <section key={ch.id} className="section" aria-labelledby={`exp-${ch.id}`}>
            <h2 id={`exp-${ch.id}`} style={{ fontSize: 'var(--fs-xl)' }}>{ch.title}</h2>
            <div className="list">
              {list.map((e) => (
                <Link key={e.id} to={`/experiment/${e.id}`} className="list-item">
                  <IconFlask aria-hidden="true" />
                  <span className="list-item-main">
                    <span className="list-item-title">{e.title}</span>
                    <span className="list-item-meta">
                      {getSubtopic(e.sub)?.title}
                      {e.who ? ` · ${e.who}` : ''}
                      {e.year ? ` · ${e.year}` : ''}
                    </span>
                  </span>
                  <IconArrowRight aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function ExperimentPage({ id }: { id: string }) {
  const e = getExperiment(id);
  const [open, setOpen] = useState(1);
  const [guesses, setGuesses] = useState<Record<number, string>>({});
  if (!e) {
    return (
      <div className="page page-narrow">
        <header className="page-head"><h1>Experiment nicht gefunden</h1></header>
        <Link to="/experimente" className="btn btn-primary">Zu den Experimenten</Link>
      </div>
    );
  }
  const sub = getSubtopic(e.sub)!;
  const allOpen = open >= e.steps.length;
  return (
    <div className="page page-narrow">
      <nav className="crumbs" aria-label="Pfad">
        <Link to="/experimente">Experimente</Link>
        <span aria-hidden="true">›</span>
        <Link to={`/thema/${sub.id}`}>{sub.title}</Link>
      </nav>
      <header className="page-head">
        <span className="eyebrow">Experiment{e.year ? ` · ${e.year}` : ''}</span>
        <h1>{e.title}</h1>
        {e.who && <p className="lead">{e.who}</p>}
        <SourceTag src={e.src} />
      </header>

      {e.widget && <WidgetView id={e.widget} />}

      <ol className="exp-steps">
        {e.steps.slice(0, open).map((s, i) => (
          <li key={i} className={`exp-step exp-${s.key}`}>
            <div className="exp-step-head">
              <span className="exp-step-label">{STEP_LABEL[s.key]}</span>
              <span className={`src-tag ${s.prov === 'pdf' ? '' : PROV_META[s.prov].cls}`}>
                <span aria-hidden="true">{PROV_META[s.prov].icon}</span> {PROV_META[s.prov].label}
              </span>
            </div>
            <Markdown text={s.text} />
          </li>
        ))}
      </ol>

      {!allOpen && (() => {
        const nextStep = e.steps[open];
        return (
          <div className="card stack-s exp-next">
            <span className="eyebrow">Als Nächstes: {STEP_LABEL[nextStep.key]}</span>
            {nextStep.predict && (
              <div className="field">
                <label className="field-label" htmlFor={`guess-${open}`}>Deine Vermutung: {nextStep.predict}</label>
                <textarea id={`guess-${open}`} className="textarea" rows={2} value={guesses[open] ?? ''} onChange={(ev) => setGuesses({ ...guesses, [open]: ev.target.value })} />
              </div>
            )}
            <div className="row">
              <button type="button" className="btn btn-primary" onClick={() => setOpen(open + 1)}>{STEP_LABEL[nextStep.key]} aufdecken</button>
              <button type="button" className="btn btn-ghost" onClick={() => setOpen(e.steps.length)}>Alles zeigen</button>
            </div>
          </div>
        );
      })()}

      {Object.keys(guesses).length > 0 && allOpen && (
        <div className="card stack-s">
          <span className="card-title">Deine Vermutungen</span>
          {Object.entries(guesses).filter(([, g]) => g.trim()).map(([k, g]) => (
            <p key={k} style={{ margin: 0 }}><span className="faint">{e.steps[Number(k)].predict} </span>{g}</p>
          ))}
          <span className="faint" style={{ fontSize: 'var(--fs-xs)' }}>Vergleiche selbst mit den aufgedeckten Schritten.</span>
        </div>
      )}

      {allOpen && e.questionIds.length > 0 && (
        <section className="section" aria-labelledby="exp-q">
          <h2 id="exp-q">Fragen zum Experiment</h2>
          {e.questionIds.map((qid) => {
            const q = getQuestion(qid);
            return q ? <QuestionView key={qid} q={q} mode="experiment" hideMaterial={q.figure?.widget === e.widget} /> : null;
          })}
        </section>
      )}
    </div>
  );
}
