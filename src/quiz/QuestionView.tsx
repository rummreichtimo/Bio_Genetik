import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Question, QMatch, QOrder, QLabel, QCloze } from '../content/types';
import { grade, isComplete, RESULT_META, type Grade, type Response } from '../learning/grading';
import type { Mode, Result } from '../progress/types';
import { useProgress } from '../progress/store';
import { IconArrowDown, IconArrowUp } from '../ui/icons';
import { LevelBadge } from '../ui/primitives';
import { ExplanationList, PROV_META, SourceTag } from '../ui/Provenance';
import { Inline, Markdown } from '../ui/Markdown';
import { MaterialView } from '../ui/Material';
import { WidgetView } from '../widgets';
import { AiPanel } from './AiPanel';
import { ReadUp } from './ReadUp';
import { sectionOfQuestion } from '../content';
import type { AiGrade } from '../ai/gradePrompt';

function shuffled<T>(arr: T[], avoidIdentity = true): T[] {
  const a = [...arr];
  for (let n = 0; n < 6; n++) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    if (!avoidIdentity || a.length < 2 || a.some((x, i) => x !== arr[i])) break;
  }
  return a;
}

export interface QuestionViewProps {
  q: Question;
  mode: Mode;
  /** nach dem Prüfen (und bei Freitext nach der Übernahme) */
  onResult?: (result: Result, g: Grade) => void;
  /** Prüfungsmodus: keine Lösung, kein „Warum?“ */
  exam?: boolean;
  /** Überschrift-Ebene für die Frage */
  headingLevel?: 2 | 3;
  /** Material/Abbildung nicht anzeigen (z. B. wenn die Klausuraufgabe es schon zeigt) */
  hideMaterial?: boolean;
  /** Abbildung nicht erneut zeigen (steht schon direkt darüber) */
  hideFigure?: boolean;
  footer?: ReactNode;
}

export function QuestionView({ q, mode, onResult, exam, headingLevel = 3, hideMaterial, hideFigure, footer }: QuestionViewProps) {
  const { answer } = useProgress();
  const [resp, setResp] = useState<Response | null>(() => initialResponse(q));
  const [g, setG] = useState<Grade | null>(null);
  const [override, setOverride] = useState(false);
  const [ai, setAi] = useState<AiGrade | null>(null);
  const pending = useRef<{ result: Result; score: number } | null>(null);
  const titleId = useId();

  const flush = () => {
    if (!pending.current) return;
    answer({ qid: q.id, sub: q.sub, result: pending.current.result, score: pending.current.score, err: q.err, mode });
    pending.current = null;
  };
  // Freitext wird erst beim Verlassen übernommen – so kann man sich noch selbst korrigieren.
  const flushRef = useRef(flush);
  flushRef.current = flush;
  useEffect(() => () => flushRef.current(), []);

  const check = () => {
    if (!resp || !isComplete(q, resp)) return;
    const res = grade(q, resp);
    setG(res);
    if (q.type === 'free' && !exam) pending.current = { result: res.result, score: res.score };
    else answer({ qid: q.id, sub: q.sub, result: res.result, score: res.score, err: q.err, mode });
    onResult?.(res.result, res);
  };

  const selfCorrect = () => {
    setOverride(true);
    pending.current = { result: 'correct', score: 1 };
    flush();
    if (g) onResult?.('correct', { ...g, result: 'correct', score: 1 });
  };

  const done = g !== null;
  // Im Lernmodus steht die Erklärung direkt darüber, in der Prüfung gibt es keine Hilfen
  const readRef = mode !== 'lesson' && !exam ? sectionOfQuestion(q.id) : undefined;
  const shownResult: Result | null = g ? (override ? 'correct' : ai ? ai.result : g.result) : null;
  const H = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <article className={`qcard ${done && !exam ? `qcard-${RESULT_META[shownResult!].tone}` : ''}`} aria-labelledby={titleId}>
      <div className="qcard-meta">
        <LevelBadge level={q.level} />
        {!exam && <SourceTag src={q.src} prov={q.prov} />}
      </div>
      {!hideMaterial && q.material && <MaterialView blocks={q.material} />}
      {!hideMaterial && !hideFigure && q.figure && q.type !== 'label' && <WidgetView id={q.figure.widget} highlight={q.figure.highlight} compact />}
      <H id={titleId} className="qcard-prompt">
        <Inline text={q.prompt} />
      </H>

      <QuestionInput q={q} resp={resp} setResp={setResp} disabled={done} grade={exam ? null : g} />

      {!done && (
        <div className="qcard-actions">
          <button type="button" className="btn btn-primary" onClick={check} disabled={!resp || !isComplete(q, resp)}>
            {exam ? 'Antwort speichern' : 'Prüfen'}
          </button>
          {q.type === 'free' && resp?.type === 'free' && (
            <span className="faint" style={{ fontSize: 'var(--fs-xs)' }}>
              {resp.value.trim() ? resp.value.trim().split(/\s+/).length : 0} Wörter
            </span>
          )}
        </div>
      )}

      {done && exam && <p className="muted">Antwort gespeichert.</p>}

      {done && !exam && g && (
        <Feedback q={q} g={g} resp={resp} result={shownResult!} overridden={override} onSelfCorrect={q.type === 'free' && g.result !== 'correct' && !override ? selfCorrect : undefined} />
      )}
      {readRef && (
        <ReadUp
          key={done ? 'after' : 'before'}
          refTo={readRef}
          hint={
            done
              ? shownResult === 'correct'
                ? undefined
                : 'Hier wird das erklärt:'
              : 'Unsicher? Lies zuerst nach – das ist kein Schummeln, sondern Lernen.'
          }
        />
      )}
      {done && !exam && g && q.type === 'free' && resp?.type === 'free' && !g.free?.tooShort && (
        <AiPanel
          q={q}
          answer={resp.value}
          onGraded={(a) => {
            setAi(a);
            if (!override) {
              pending.current = { result: a.result, score: a.score };
              onResult?.(a.result, { ...g, result: a.result, score: a.score });
            }
          }}
        />
      )}
      {footer}
    </article>
  );
}

function initialResponse(q: Question): Response | null {
  switch (q.type) {
    case 'order':
      return { type: 'order', value: shuffled(q.items) };
    case 'cloze':
      return { type: 'cloze', value: q.gaps.map(() => '') };
    case 'match':
      return { type: 'match', value: {} };
    case 'label':
      return { type: 'label', value: {} };
    case 'multi':
      return { type: 'multi', value: [] };
    case 'input':
      return { type: 'input', value: '' };
    case 'free':
      return { type: 'free', value: '' };
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Eingaben je Fragetyp
// ---------------------------------------------------------------------------

interface InputProps {
  q: Question;
  resp: Response | null;
  setResp: (r: Response) => void;
  disabled: boolean;
  grade: Grade | null;
}

function mark(g: Grade | null, i: number): string {
  if (!g?.parts) return '';
  return g.parts[i] ? 'is-right' : 'is-wrong';
}

function QuestionInput({ q, resp, setResp, disabled, grade: g }: InputProps) {
  switch (q.type) {
    case 'single':
      return (
        <div className="options" role="radiogroup" aria-label="Antwortmöglichkeiten">
          {q.options.map((o, i) => {
            const chosen = resp?.type === 'single' && resp.value === i;
            const state = g ? (i === q.answer ? 'is-right' : chosen ? 'is-wrong' : '') : '';
            return (
              <button key={i} type="button" role="radio" aria-checked={chosen} disabled={disabled} className={`option ${chosen ? 'is-chosen' : ''} ${state}`} onClick={() => setResp({ type: 'single', value: i })}>
                <span className="option-key" aria-hidden="true">{String.fromCharCode(65 + i)}</span>
                <span className="option-text"><Inline text={o} /></span>
              </button>
            );
          })}
        </div>
      );
    case 'multi': {
      const sel = resp?.type === 'multi' ? resp.value : [];
      return (
        <div className="options" role="group" aria-label="Mehrere Antworten möglich">
          <p className="faint" style={{ fontSize: 'var(--fs-xs)', margin: 0 }}>Mehrere Antworten können richtig sein.</p>
          {q.options.map((o, i) => {
            const chosen = sel.includes(i);
            const state = g ? (q.answers.includes(i) ? 'is-right' : chosen ? 'is-wrong' : '') : '';
            return (
              <button key={i} type="button" role="checkbox" aria-checked={chosen} disabled={disabled} className={`option option-check ${chosen ? 'is-chosen' : ''} ${state}`}
                onClick={() => setResp({ type: 'multi', value: chosen ? sel.filter((x) => x !== i) : [...sel, i] })}>
                <span className="option-box" aria-hidden="true">{chosen ? '✓' : ''}</span>
                <span className="option-text"><Inline text={o} /></span>
              </button>
            );
          })}
        </div>
      );
    }
    case 'tf':
      return (
        <div className="options options-row" role="radiogroup" aria-label="Wahr oder falsch">
          {[true, false].map((v) => {
            const chosen = resp?.type === 'tf' && resp.value === v;
            const state = g ? (v === q.answer ? 'is-right' : chosen ? 'is-wrong' : '') : '';
            return (
              <button key={String(v)} type="button" role="radio" aria-checked={chosen} disabled={disabled} className={`option ${chosen ? 'is-chosen' : ''} ${state}`} onClick={() => setResp({ type: 'tf', value: v })}>
                <span className="option-text">{v ? 'Wahr' : 'Falsch'}</span>
              </button>
            );
          })}
        </div>
      );
    case 'cloze':
      return <ClozeInput q={q} resp={resp} setResp={setResp} disabled={disabled} grade={g} />;
    case 'order':
      return <OrderInput q={q} resp={resp} setResp={setResp} disabled={disabled} grade={g} />;
    case 'match':
      return <MatchInput q={q} resp={resp} setResp={setResp} disabled={disabled} grade={g} />;
    case 'label':
      return <LabelInput q={q} resp={resp} setResp={setResp} disabled={disabled} grade={g} />;
    case 'input': {
      const v = resp?.type === 'input' ? resp.value : '';
      const ok = g ? g.result === 'correct' : null;
      return (
        <div className="input-row">
          <label className="sr-only" htmlFor={`in-${q.id}`}>Antwort</label>
          <input id={`in-${q.id}`} className={`input ${q.mode === 'seq' ? 'mono' : ''} ${ok === null ? '' : ok ? 'is-right' : 'is-wrong'}`} value={v} disabled={disabled}
            placeholder={q.placeholder ?? (q.mode === 'number' ? 'Zahl' : q.mode === 'aa' ? 'z. B. Met-Ala-Gly' : q.mode === 'seq' ? 'Basenfolge' : 'Antwort')}
            inputMode={q.mode === 'number' ? 'decimal' : 'text'} autoComplete="off" spellCheck={false}
            onChange={(e) => setResp({ type: 'input', value: e.target.value })} />
          {q.unit && <span className="input-unit">{q.unit}</span>}
        </div>
      );
    }
    case 'free': {
      const v = resp?.type === 'free' ? resp.value : '';
      return (
        <div className="field">
          <label className="field-label" htmlFor={`free-${q.id}`}>
            {q.operator ? `Operator: ${q.operator}` : 'Deine Antwort'}
          </label>
          <textarea id={`free-${q.id}`} className="textarea" rows={6} value={v} disabled={disabled} placeholder="Antworte in ganzen Sätzen und mit Fachbegriffen."
            onChange={(e) => setResp({ type: 'free', value: e.target.value })} />
        </div>
      );
    }
  }
}

function ClozeInput({ q, resp, setResp, disabled, grade: g }: InputProps & { q: QCloze }) {
  const vals = resp?.type === 'cloze' ? resp.value : q.gaps.map(() => '');
  const opts = useMemo(() => q.gaps.map((gap) => (gap.options ? shuffled(gap.options, false) : null)), [q]);
  const parts = q.text.split(/(\{\{\d+\}\})/);
  const set = (i: number, v: string) => setResp({ type: 'cloze', value: vals.map((x, j) => (j === i ? v : x)) });
  return (
    <p className="cloze">
      {parts.map((part, k) => {
        const m = part.match(/^\{\{(\d+)\}\}$/);
        if (!m) return <Inline key={k} text={part} />;
        const i = Number(m[1]);
        const cls = `cloze-gap ${mark(g, i)}`;
        const label = `Lücke ${i + 1}`;
        return (
          <span key={k} className="cloze-slot">
            {opts[i] ? (
              <select aria-label={label} className={`select ${cls}`} value={vals[i]} disabled={disabled} onChange={(e) => set(i, e.target.value)}>
                <option value="">…</option>
                {opts[i]!.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input aria-label={label} className={`input ${cls}`} value={vals[i]} disabled={disabled} size={Math.max(6, (q.gaps[i].accept[0] ?? '').length + 2)} onChange={(e) => set(i, e.target.value)} autoComplete="off" />
            )}
            {g?.parts && !g.parts[i] && <span className="cloze-fix">{q.gaps[i].accept[0]}</span>}
          </span>
        );
      })}
    </p>
  );
}

function OrderInput({ q, resp, setResp, disabled, grade: g }: InputProps & { q: QOrder }) {
  const vals = resp?.type === 'order' ? resp.value : q.items;
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= vals.length) return;
    const next = [...vals];
    [next[i], next[j]] = [next[j], next[i]];
    setResp({ type: 'order', value: next });
  };
  return (
    <ol className="order-list" aria-label="Reihenfolge – mit den Pfeilen verschieben">
      {vals.map((it, i) => (
        <li key={it} className={`order-item ${mark(g, i)}`}>
          <span className="order-n num" aria-hidden="true">{i + 1}</span>
          <span className="order-text"><Inline text={it} />{g?.parts && !g.parts[i] && <span className="order-fix">richtig an dieser Stelle: {q.items[i]}</span>}</span>
          {!disabled && (
            <span className="order-btns">
              <button type="button" className="icon-btn" aria-label={`„${it}“ nach oben`} disabled={i === 0} onClick={() => move(i, -1)}><IconArrowUp /></button>
              <button type="button" className="icon-btn" aria-label={`„${it}“ nach unten`} disabled={i === vals.length - 1} onClick={() => move(i, 1)}><IconArrowDown /></button>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

function MatchInput({ q, resp, setResp, disabled, grade: g }: InputProps & { q: QMatch }) {
  const vals = resp?.type === 'match' ? resp.value : {};
  const rights = useMemo(() => shuffled(Array.from(new Set([...q.pairs.map((p) => p.right), ...(q.distractors ?? [])])), false), [q]);
  return (
    <div className="match-list">
      {q.pairs.map((p, i) => (
        <div key={p.left} className={`match-row ${mark(g, i)}`}>
          <span className="match-left"><Inline text={p.left} /></span>
          <span className="match-right">
            <select aria-label={`Zuordnung für: ${p.left}`} className="select" value={vals[p.left] ?? ''} disabled={disabled}
              onChange={(e) => setResp({ type: 'match', value: { ...vals, [p.left]: e.target.value } })}>
              <option value="">Bitte wählen …</option>
              {rights.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            {g?.parts && !g.parts[i] && <span className="match-fix">richtig: {p.right}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

function LabelInput({ q, resp, setResp, disabled, grade: g }: InputProps & { q: QLabel }) {
  const vals = resp?.type === 'label' ? resp.value : {};
  const answers = useMemo(() => shuffled(Array.from(new Set([...q.labels.map((l) => l.answer), ...(q.distractors ?? [])])), false), [q]);
  return (
    <div className="stack">
      <WidgetView id={q.widget} labelMode />
      <div className="match-list">
        {q.labels.map((l, i) => (
          <div key={l.marker} className={`match-row ${mark(g, i)}`}>
            <span className="match-left"><span className="marker-dot">{l.marker}</span></span>
            <span className="match-right">
              <select aria-label={`Beschriftung für Markierung ${l.marker}`} className="select" value={vals[l.marker] ?? ''} disabled={disabled}
                onChange={(e) => setResp({ type: 'label', value: { ...vals, [l.marker]: e.target.value } })}>
                <option value="">Bitte wählen …</option>
                {answers.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              {g?.parts && !g.parts[i] && <span className="match-fix">richtig: {l.answer}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Rückmeldung
// ---------------------------------------------------------------------------

function correctAnswerText(q: Question): string | null {
  switch (q.type) {
    case 'single': return q.options[q.answer];
    case 'multi': return q.answers.map((i) => q.options[i]).join(' · ');
    case 'tf': return q.answer ? 'Wahr' : `Falsch${q.correction ? ` – richtig ist: ${q.correction}` : ''}`;
    case 'input': return q.solution;
    default: return null;
  }
}

function Feedback({ q, g, resp, result, overridden, onSelfCorrect }: { q: Question; g: Grade; resp: Response | null; result: Result; overridden: boolean; onSelfCorrect?: () => void }) {
  const meta = RESULT_META[result];
  const [why, setWhy] = useState(result !== 'correct');
  const answerText = correctAnswerText(q);
  const optionHint = q.type === 'single' && resp?.type === 'single' ? q.feedback?.[resp.value] : undefined;
  return (
    <div className="feedback" role="status" aria-live="polite">
      <div className={`feedback-head tone-${meta.tone}`}>
        <span aria-hidden="true">{meta.icon}</span> {meta.label}
        {q.type !== 'single' && q.type !== 'tf' && q.type !== 'input' && <span className="num faint"> · {Math.round((overridden ? 1 : g.score) * 100)} %</span>}
        {overridden && <span className="faint"> · selbst korrigiert</span>}
      </div>

      {optionHint && <p className="misconception"><strong>Hinweis:</strong> <Inline text={optionHint} /></p>}

      {answerText && result !== 'correct' && (
        <p className="feedback-answer"><strong>Richtige Antwort:</strong> <Inline text={answerText} /></p>
      )}
      {q.type === 'tf' && result === 'correct' && !q.answer && q.correction && (
        <p className="feedback-answer"><strong>Richtig wäre:</strong> <Inline text={q.correction} /></p>
      )}

      {q.type === 'free' && g.free && (
        <div className="stack-s">
          {g.free.tooShort && <p className="muted">Deine Antwort ist zu kurz, um sie zu bewerten. Antworte in ganzen Sätzen.</p>}
          {g.free.found.length > 0 && (
            <div>
              <strong>✅ Das hast du richtig:</strong>
              <ul className="rubric-list">{g.free.found.map((r) => <li key={r.id}>{r.group ? <span className="faint">{r.group}: </span> : null}{r.label}</li>)}</ul>
            </div>
          )}
          {g.free.missing.length > 0 && (
            <div>
              <strong>{g.free.found.length ? '🟡 Das fehlt noch:' : '❌ Das fehlt:'}</strong>
              <ul className="rubric-list">{g.free.missing.map((r) => <li key={r.id}>{r.group ? <span className="faint">{r.group}: </span> : null}{r.label}</li>)}</ul>
            </div>
          )}
          {g.free.misconceptions.map((m) => (
            <p key={m.id} className="misconception"><strong>⚠️ Achtung:</strong> {m.feedback}</p>
          ))}
          <div className={`prov prov-${PROV_META[q.prov].cls}`}>
            <div className="prov-head"><span aria-hidden="true">{PROV_META[q.prov].icon}</span> Musterantwort · {PROV_META[q.prov].label}</div>
            <div className="prov-body"><Markdown text={q.model} /></div>
          </div>
          {onSelfCorrect && (
            <div className="row">
              <button type="button" className="btn btn-soft btn-small" onClick={onSelfCorrect}>Ich hatte es sinngemäß richtig</button>
              <span className="faint" style={{ fontSize: 'var(--fs-xs)' }}>Die automatische Bewertung sucht nach Fachbegriffen und kann andere Formulierungen übersehen.</span>
            </div>
          )}
        </div>
      )}

      <button type="button" className="btn btn-ghost btn-small why-toggle" aria-expanded={why} onClick={() => setWhy((w) => !w)}>
        {why ? 'Erklärung ausblenden' : 'Warum?'}
      </button>
      {why && <ExplanationList items={q.why} />}
    </div>
  );
}
