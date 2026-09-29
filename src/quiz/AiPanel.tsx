import { useRef, useState } from 'react';
import type { QFree } from '../content/types';
import { aiGrade } from '../ai/aiGrade';
import type { AiGrade } from '../ai/gradePrompt';
import { useAi } from '../ai/useAi';
import { RESULT_META } from '../learning/grading';
import { useProgress } from '../progress/store';
import { Link } from '../app/router';

/** Optionale KI-Zweitbewertung einer Freitextantwort (nur auf Knopfdruck). */
export function AiPanel({ q, answer, onGraded }: { q: QFree; answer: string; onGraded: (a: AiGrade) => void }) {
  const { state } = useProgress();
  const { status } = useAi();
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [res, setRes] = useState<AiGrade | null>(null);
  const [err, setErr] = useState('');
  const ctl = useRef<AbortController | null>(null);

  if (status !== 'claude' && status !== 'server') return null;
  if (!state.settings.ai) {
    return (
      <p className="faint" style={{ fontSize: 'var(--fs-xs)', margin: 0 }}>
        🤖 Eine KI-Zweitbewertung ist verfügbar – du kannst sie in den <Link to="/einstellungen">Einstellungen</Link> einschalten.
      </p>
    );
  }

  const run = async () => {
    ctl.current = new AbortController();
    setPhase('loading');
    setErr('');
    try {
      const a = await aiGrade(q, answer, ctl.current.signal);
      setRes(a);
      setPhase('done');
      onGraded(a);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'KI-Bewertung fehlgeschlagen.');
      setPhase('error');
    }
  };

  return (
    <div className="ai-panel" aria-live="polite">
      {phase === 'idle' && (
        <button type="button" className="btn btn-soft btn-small" onClick={run}>
          🤖 Genauer mit KI prüfen
        </button>
      )}
      {phase === 'loading' && (
        <div className="row">
          <span className="muted">🤖 Die KI bewertet deine Antwort …</span>
          <button type="button" className="btn btn-ghost btn-small" onClick={() => { ctl.current?.abort(); setPhase('idle'); }}>Abbrechen</button>
        </div>
      )}
      {phase === 'error' && (
        <div className="row">
          <span className="muted">⚠️ {err} Die Offline-Bewertung oben gilt weiter.</span>
          <button type="button" className="btn btn-ghost btn-small" onClick={run}>Erneut versuchen</button>
        </div>
      )}
      {phase === 'done' && res && (
        <div className="stack-s">
          <div className="ai-head">
            🤖 KI-Bewertung: <strong className={`tone-${RESULT_META[res.result].tone}`}>{RESULT_META[res.result].icon} {RESULT_META[res.result].label}</strong>
            <span className="num faint"> · {Math.round(res.score * 100)} %</span>
          </div>
          <ul className="rubric-list">
            {q.rubric.map((r) => (
              <li key={r.id}>
                {res.found.includes(r.id) ? '✅' : '❌'} {r.label}
                {res.notes[r.id] && <span className="faint"> – {res.notes[r.id]}</span>}
              </li>
            ))}
          </ul>
          {res.misconception && <p className="misconception"><strong>⚠️ Fachlicher Fehler:</strong> {res.misconception}</p>}
          <p style={{ margin: 0 }}>{res.feedback}</p>
          <p className="faint" style={{ fontSize: 'var(--fs-xs)', margin: 0 }}>
            Die KI bewertet nur anhand des Bewertungsrasters und der Musterantwort aus deiner PDF. Sie kann sich irren – im Zweifel gilt deine PDF.
          </p>
        </div>
      )}
    </div>
  );
}
