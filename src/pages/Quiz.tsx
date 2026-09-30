import { useId, useMemo, useState } from 'react';
import { CHAPTERS, getSubtopic } from '../content';
import type { ErrorTag, Level, Question, QuestionType } from '../content/types';
import { filterQuestions, pickQuestions, type QuizFilter } from '../learning/select';
import { RESULT_META } from '../learning/grading';
import type { Result } from '../progress/types';
import { useProgress } from '../progress/store';
import { Link } from '../app/router';
import { QuestionView } from '../quiz/QuestionView';
import { IconArrowRight, IconRefresh } from '../ui/icons';
import { Bar, EmptyState, LEVEL_META } from '../ui/primitives';
import { Inline } from '../ui/Markdown';
import { ERROR_META } from './Mistakes';

export const TYPE_LABEL: Record<QuestionType, string> = {
  single: 'Single Choice',
  multi: 'Multiple Choice',
  tf: 'Wahr/Falsch',
  cloze: 'Lückentext',
  order: 'Reihenfolge',
  match: 'Zuordnen',
  label: 'Abbildung beschriften',
  input: 'Eingabe',
  free: 'Freitext',
};

interface Setup {
  scope: string; // 'alle' | sub-id | 'kapitel-<id>'
  levels: Level[];
  types: QuestionType[];
  count: number;
  mistakes: boolean;
  err?: ErrorTag;
  /** nur Fragen zu schon gelernten Abschnitten */
  learnedOnly: boolean;
}

function toFilter(s: Setup): QuizFilter {
  const subs = s.scope === 'alle' ? undefined : s.scope.startsWith('kapitel-') ? CHAPTERS.find((c) => c.id === s.scope.slice(8))?.subtopics : [s.scope];
  return { subs, levels: s.levels, types: s.types, mistakes: s.mistakes, err: s.err, learnedOnly: s.learnedOnly };
}

export function Quiz({ query }: { query: Record<string, string> }) {
  const { state } = useProgress();
  const initial: Setup = {
    scope: query.sub && getSubtopic(query.sub) ? query.sub : query.kapitel ? `kapitel-${query.kapitel}` : 'alle',
    levels: query.stufe ? (query.stufe.split(',').map(Number).filter((n) => n >= 1 && n <= 5) as Level[]) : [],
    types: [],
    count: 10,
    mistakes: query.fokus === 'fehler',
    err: (query.fehler as ErrorTag) || undefined,
    // Fehler-Wiederholungen betreffen ohnehin schon Beantwortetes
    learnedOnly: query.alle !== '1' && query.fokus !== 'fehler' && !query.fehler,
  };
  const [setup, setSetup] = useState<Setup>(initial);
  const autostart = !!(query.sub || query.fokus || query.fehler || query.stufe);
  const initialPool = filterQuestions(state, toFilter(initial));
  // Direkt zu einem Thema gesprungen, aber noch nichts davon gelernt → erst lernen anbieten
  const [learnFirst, setLearnFirst] = useState(autostart && initial.learnedOnly && !initialPool.length && !!query.sub);
  const [run, setRun] = useState<Question[] | null>(() => (autostart && initialPool.length ? pickQuestions(initialPool, state, initial.count) : null));
  const [runId, setRunId] = useState(0);
  const pool = useMemo(() => filterQuestions(state, toFilter(setup)), [state, setup]);
  const unlearned = useMemo(() => (setup.learnedOnly ? filterQuestions(state, { ...toFilter(setup), learnedOnly: false }).length - pool.length : 0), [state, setup, pool]);

  const start = (qs?: Question[]) => {
    setRun(qs ?? pickQuestions(pool, state, setup.count));
    setRunId((x) => x + 1);
  };

  if (learnFirst && query.sub) {
    return (
      <LearnFirst
        sub={query.sub}
        onAnyway={() => {
          const s = { ...setup, learnedOnly: false };
          setSetup(s);
          setLearnFirst(false);
          setRun(pickQuestions(filterQuestions(state, toFilter(s)), state, s.count));
          setRunId((x) => x + 1);
        }}
      />
    );
  }
  if (run) return <QuizRun key={runId} questions={run} setup={setup} onRestart={start} onSetup={() => setRun(null)} />;
  return <QuizSetup setup={setup} setSetup={setSetup} available={pool.length} unlearned={unlearned} onStart={() => start()} />;
}

function LearnFirst({ sub, onAnyway }: { sub: string; onAnyway: () => void }) {
  const title = getSubtopic(sub)?.title;
  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Quiz · {title}</span>
        <h1>Erst lernen, dann üben</h1>
        <p className="lead">
          Zu „{title}“ hast du im Lernmodus noch keinen Abschnitt abgeschlossen. Die Fragen bauen auf den Erklärungen dort auf – lies sie zuerst,
          dann kannst du sie auch beantworten.
        </p>
      </header>
      <div className="row">
        <Link to={`/lernen/${sub}`} className="btn btn-primary btn-large">
          Thema jetzt lernen <IconArrowRight />
        </Link>
        <button type="button" className="btn btn-ghost" onClick={onAnyway}>
          Trotzdem Fragen stellen
        </button>
      </div>
    </div>
  );
}

function QuizSetup({ setup, setSetup, available, unlearned, onStart }: { setup: Setup; setSetup: (s: Setup) => void; available: number; unlearned: number; onStart: () => void }) {
  const scopeId = useId();
  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Quiz</span>
        <h1>Fragen üben</h1>
        <p className="lead">Übe, was du im Lernmodus gelernt hast. Fragen, die dir schwerfallen, kommen bevorzugt dran – und zu jeder Frage kannst du die Erklärung nachlesen.</p>
      </header>

      <div className="card stack">
        <div className="field">
          <label className="field-label" htmlFor={scopeId}>Thema</label>
          <select id={scopeId} className="select" value={setup.scope} onChange={(e) => setSetup({ ...setup, scope: e.target.value })}>
            <option value="alle">Alle Themen</option>
            {CHAPTERS.map((c, i) => (
              <optgroup key={c.id} label={`${i + 1} · ${c.title}`}>
                <option value={`kapitel-${c.id}`}>Ganzes Kapitel: {c.title}</option>
                {c.subtopics.map((s) => <option key={s} value={s}>{getSubtopic(s)?.title}</option>)}
              </optgroup>
            ))}
          </select>
        </div>

        <fieldset className="chip-field">
          <legend className="field-label">Schwierigkeit <span className="faint">(keine Auswahl = alle)</span></legend>
          <div className="row" style={{ gap: 6 }}>
            {([1, 2, 3, 4, 5] as Level[]).map((l) => (
              <button key={l} type="button" className="chip" aria-pressed={setup.levels.includes(l)} onClick={() => setSetup({ ...setup, levels: toggle(setup.levels, l) })}>
                <span aria-hidden="true">{LEVEL_META[l].icon}</span> {LEVEL_META[l].label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="chip-field">
          <legend className="field-label">Fragetypen <span className="faint">(keine Auswahl = alle)</span></legend>
          <div className="row" style={{ gap: 6 }}>
            {(Object.keys(TYPE_LABEL) as QuestionType[]).map((t) => (
              <button key={t} type="button" className="chip" aria-pressed={setup.types.includes(t)} onClick={() => setSetup({ ...setup, types: toggle(setup.types, t) })}>
                {TYPE_LABEL[t]}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="chip-field">
          <legend className="field-label">Anzahl</legend>
          <div className="row" style={{ gap: 6 }}>
            {[5, 10, 20].map((n) => (
              <button key={n} type="button" className="chip" aria-pressed={setup.count === n} onClick={() => setSetup({ ...setup, count: n })}>{n} Fragen</button>
            ))}
          </div>
        </fieldset>

        <label className="row" style={{ gap: 10 }}>
          <input type="checkbox" className="checkbox" checked={setup.learnedOnly} onChange={(e) => setSetup({ ...setup, learnedOnly: e.target.checked })} />
          <span>Nur Fragen zu Abschnitten, die ich im Lernmodus schon gelernt habe <span className="faint">(empfohlen)</span></span>
        </label>
        <label className="row" style={{ gap: 10 }}>
          <input type="checkbox" className="checkbox" checked={setup.mistakes} onChange={(e) => setSetup({ ...setup, mistakes: e.target.checked })} />
          <span>Nur Fragen, die ich zuletzt nicht (ganz) richtig hatte</span>
        </label>
        {setup.err && (
          <div className="row">
            <span className="chip chip-warn">Fehlerschwerpunkt: {ERROR_META[setup.err].label}</span>
            <button type="button" className="btn btn-ghost btn-small" onClick={() => setSetup({ ...setup, err: undefined })}>entfernen</button>
          </div>
        )}

        {setup.learnedOnly && available === 0 && (
          <p className="notice">
            Du hast in dieser Auswahl noch keinen Abschnitt gelernt. <Link to="/lernpfad">Zum Lernpfad</Link> – oder nimm das Häkchen bei
            „Nur Gelerntes“ heraus.
          </p>
        )}
        <div className="row-between">
          <span className="muted num">
            {available} passende Fragen
            {unlearned > 0 && <span className="faint"> · {unlearned} weitere nach dem Lernen</span>}
          </span>
          <button type="button" className="btn btn-primary btn-large" disabled={!available} onClick={onStart}>
            Quiz starten <IconArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

function QuizRun({ questions, setup, onRestart, onSetup }: { questions: Question[]; setup: Setup; onRestart: (qs?: Question[]) => void; onSetup: () => void }) {
  const [i, setI] = useState(0);
  const [results, setResults] = useState<Record<string, Result>>({});
  if (!questions.length) {
    return (
      <div className="page page-narrow">
        <header className="page-head"><span className="eyebrow">Quiz</span><h1>Keine passenden Fragen</h1></header>
        <EmptyState title={setup.mistakes ? 'Keine offenen Fehler in dieser Auswahl' : 'Keine Fragen gefunden'} action={<button type="button" className="btn btn-primary" onClick={onSetup}>Auswahl ändern</button>}>
          {setup.mistakes ? 'Sehr gut – alles zuletzt richtig beantwortet.' : 'Ändere die Filter.'}
        </EmptyState>
      </div>
    );
  }
  const q = questions[i];
  const done = i >= questions.length;
  const answered = q ? results[q.id] : undefined;
  const title = setup.scope === 'alle' ? 'Alle Themen' : setup.scope.startsWith('kapitel-') ? CHAPTERS.find((c) => `kapitel-${c.id}` === setup.scope)?.title : getSubtopic(setup.scope)?.title;

  if (done) {
    const vals = Object.values(results);
    const n = (r: Result) => vals.filter((v) => v === r).length;
    const wrong = questions.filter((x) => results[x.id] && results[x.id] !== 'correct');
    const score = vals.length ? (n('correct') + 0.5 * n('partial')) / vals.length : 0;
    return (
      <div className="page page-narrow">
        <header className="page-head">
          <span className="eyebrow">Quiz · {title}</span>
          <h1>Auswertung</h1>
        </header>
        <div className="card stack">
          <div className="quiz-score">
            <strong className="num">{Math.round(score * 100)} %</strong>
            <span className="muted">✅ {n('correct')} richtig · 🟡 {n('partial')} teilweise · ❌ {n('wrong')} falsch</span>
          </div>
          <Bar value={score} tone={score >= 0.75 ? 'good' : score >= 0.5 ? 'warn' : 'bad'} label="Ergebnis" />
          <ol className="result-list">
            {questions.map((x) => {
              const r = results[x.id];
              return (
                <li key={x.id} className="result-item">
                  <span aria-hidden="true">{r ? RESULT_META[r].icon : '–'}</span>
                  <span><Inline text={x.prompt} /> <span className="faint">· {getSubtopic(x.sub)?.title}</span></span>
                </li>
              );
            })}
          </ol>
          <div className="row">
            {wrong.length > 0 && <button type="button" className="btn btn-primary" onClick={() => onRestart(wrong)}>Fehler wiederholen ({wrong.length})</button>}
            <button type="button" className="btn btn-soft" onClick={() => onRestart()}><IconRefresh /> Neue Runde</button>
            <button type="button" className="btn btn-ghost" onClick={onSetup}>Auswahl ändern</button>
            <Link to="/fehler" className="btn btn-ghost">Fehleranalyse</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Quiz · {title}</span>
        <div className="row-between" style={{ fontSize: 'var(--fs-sm)' }}>
          <h1 style={{ fontSize: 'var(--fs-2xl)' }}>Frage {i + 1} von {questions.length}</h1>
          <button type="button" className="btn btn-ghost btn-small" onClick={() => setI(questions.length)}>Beenden</button>
        </div>
        <Bar value={i / questions.length} thin label="Fortschritt im Quiz" />
      </header>
      <QuestionView
        key={q.id}
        q={q}
        mode="quiz"
        headingLevel={2}
        onResult={(r) => setResults((x) => ({ ...x, [q.id]: r }))}
        footer={
          answered && (
            <div className="row" style={{ justifyContent: 'flex-end' }}>
              <button type="button" className="btn btn-primary" onClick={() => setI(i + 1)} autoFocus>
                {i + 1 < questions.length ? 'Nächste Frage' : 'Zur Auswertung'} <IconArrowRight />
              </button>
            </div>
          )
        }
      />
      <p className="faint" style={{ fontSize: 'var(--fs-xs)' }}>
        Thema: <Link to={`/thema/${q.sub}`}>{getSubtopic(q.sub)?.title}</Link>
      </p>
    </div>
  );
}

