import { useEffect, useRef, useState } from 'react';
import { CHAPTERS, chapterOf, getSubtopic } from '../content';
import type { ErrorTag, Question } from '../content/types';
import { pickMixed } from '../learning/select';
import { RESULT_META } from '../learning/grading';
import { uid } from '../progress/logic';
import type { ExamRecord, Result } from '../progress/types';
import { useProgress } from '../progress/store';
import { Link } from '../app/router';
import { QuestionView } from '../quiz/QuestionView';
import { IconArrowLeft, IconArrowRight, IconClock } from '../ui/icons';
import { Bar, Dialog, LEVEL_META } from '../ui/primitives';
import { ExplanationList } from '../ui/Provenance';
import { Inline, Markdown } from '../ui/Markdown';
import { ERROR_META } from './Mistakes';

interface Answer {
  result: Result;
  score: number;
}

export function Exam() {
  const { state, updateSettings } = useProgress();
  const s = state.settings;
  const [run, setRun] = useState<{ qs: Question[]; started: number } | null>(null);
  if (run) return <ExamRun key={run.started} questions={run.qs} started={run.started} limitMin={s.examTimed ? s.examMinutes : null} onExit={() => setRun(null)} />;
  const last = state.exams[state.exams.length - 1];
  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Prüfungsmodus</span>
        <h1>Wie in der Klausur</h1>
        <p className="lead">Gemischte Fragen aus allen Themen, ab Stufe 🟡 Verständnis. Keine Hinweise, keine Lösungen zwischendurch – die Auswertung kommt erst am Ende.</p>
      </header>
      <div className="card stack">
        <fieldset className="chip-field">
          <legend className="field-label">Anzahl der Aufgaben</legend>
          <div className="row" style={{ gap: 6 }}>
            {[10, 20, 30].map((n) => (
              <button key={n} type="button" className="chip" aria-pressed={s.examCount === n} onClick={() => updateSettings({ examCount: n })}>{n}</button>
            ))}
          </div>
        </fieldset>
        <label className="row" style={{ gap: 10 }}>
          <input type="checkbox" className="checkbox" checked={s.examTimed} onChange={(e) => updateSettings({ examTimed: e.target.checked })} />
          <span>Mit Zeitlimit</span>
        </label>
        {s.examTimed && (
          <fieldset className="chip-field">
            <legend className="field-label">Zeit</legend>
            <div className="row" style={{ gap: 6 }}>
              {[15, 30, 45, 60, 90].map((m) => (
                <button key={m} type="button" className="chip" aria-pressed={s.examMinutes === m} onClick={() => updateSettings({ examMinutes: m })}>{m} min</button>
              ))}
            </div>
          </fieldset>
        )}
        <button type="button" className="btn btn-primary btn-large" onClick={() => setRun({ qs: pickMixed(state, s.examCount), started: Date.now() })}>
          Prüfung starten <IconArrowRight />
        </button>
        {last && <p className="faint" style={{ margin: 0, fontSize: 'var(--fs-sm)' }}>Letzte Prüfung: {Math.round(last.score * 100)} % ({state.exams.length} insgesamt)</p>}
      </div>
    </div>
  );
}

function fmt(sec: number) {
  const m = Math.floor(Math.max(0, sec) / 60);
  const s = Math.max(0, sec) % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function ExamRun({ questions, started, limitMin, onExit }: { questions: Question[]; started: number; limitMin: number | null; onExit: () => void }) {
  const { saveExam } = useProgress();
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [finished, setFinished] = useState<ExamRecord | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [now, setNow] = useState(Date.now());
  const saved = useRef(false);

  const finish = () => {
    if (saved.current) return;
    saved.current = true;
    const items = questions.map((q) => ({ q: q.id, r: answers[q.id]?.result ?? ('wrong' as Result), score: answers[q.id]?.score ?? 0 }));
    const rec: ExamRecord = {
      id: uid(),
      at: Date.now(),
      durationSec: Math.round((Date.now() - started) / 1000),
      limitMin,
      items,
      score: items.reduce((a, x) => a + x.score, 0) / items.length,
    };
    saveExam(rec);
    setFinished(rec);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (finished) return;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [finished]);

  const remaining = limitMin ? limitMin * 60 - Math.floor((now - started) / 1000) : null;
  useEffect(() => {
    if (remaining !== null && remaining <= 0 && !finished) finish();
  });

  if (finished) return <ExamResult rec={finished} questions={questions} onExit={onExit} />;

  const q = questions[i];
  const answeredCount = Object.keys(answers).length;
  return (
    <div className="page page-narrow">
      <header className="page-head exam-head">
        <div className="row-between">
          <span className="eyebrow">Prüfung · Aufgabe {i + 1} von {questions.length}</span>
          {remaining !== null && (
            <span className={`exam-timer num ${remaining < 120 ? 'is-low' : ''}`} role="timer" aria-label={`Restzeit ${fmt(remaining)}`}>
              <IconClock width={16} height={16} /> {fmt(remaining)}
            </span>
          )}
        </div>
        <Bar value={answeredCount / questions.length} thin label="Beantwortete Aufgaben" />
      </header>
      <div className="exam-dots" role="group" aria-label="Aufgaben">
        {questions.map((x, k) => (
          <button key={x.id} type="button" className={`exam-dot ${k === i ? 'is-current' : ''} ${answers[x.id] ? 'is-done' : ''}`} onClick={() => setI(k)} aria-label={`Aufgabe ${k + 1}${answers[x.id] ? ', beantwortet' : ''}`} aria-current={k === i ? 'step' : undefined}>
            {k + 1}
          </button>
        ))}
      </div>
      {answers[q.id] ? (
        <div className="qcard">
          <h2 className="qcard-prompt"><Inline text={q.prompt} /></h2>
          <p className="muted" style={{ margin: 0 }}>✓ Beantwortet. Das Ergebnis siehst du nach dem Abgeben.</p>
        </div>
      ) : (
        <QuestionView key={q.id} q={q} mode="exam" exam headingLevel={2} onResult={(r, g) => setAnswers((a) => ({ ...a, [q.id]: { result: r, score: g.score } }))} />
      )}
      <div className="lesson-actions">
        <button type="button" className="btn btn-ghost" disabled={i === 0} onClick={() => setI(i - 1)}><IconArrowLeft /> Zurück</button>
        {i + 1 < questions.length ? (
          <button type="button" className="btn btn-soft" onClick={() => setI(i + 1)}>{answers[q.id] ? 'Weiter' : 'Überspringen'} <IconArrowRight /></button>
        ) : null}
        <button type="button" className="btn btn-primary" onClick={() => setConfirm(true)}>Abgeben</button>
      </div>
      <Dialog
        open={confirm}
        title="Prüfung abgeben?"
        onClose={() => setConfirm(false)}
        actions={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setConfirm(false)}>Weiter bearbeiten</button>
            <button type="button" className="btn btn-primary" onClick={() => { setConfirm(false); finish(); }}>Abgeben</button>
          </>
        }
      >
        <p>{answeredCount} von {questions.length} Aufgaben beantwortet.{answeredCount < questions.length ? ' Unbeantwortete Aufgaben zählen als falsch.' : ''}</p>
      </Dialog>
    </div>
  );
}

function ExamResult({ rec, questions, onExit }: { rec: ExamRecord; questions: Question[]; onExit: () => void }) {
  const [open, setOpen] = useState<string | null>(null);
  const byChapter = CHAPTERS.map((c) => {
    const items = rec.items.filter((it) => chapterOf(questions.find((q) => q.id === it.q)!.sub)?.id === c.id);
    return { c, n: items.length, score: items.length ? items.reduce((a, x) => a + x.score, 0) / items.length : null };
  }).filter((x) => x.n > 0);
  const strong = byChapter.filter((x) => (x.score ?? 0) >= 0.75);
  const weak = byChapter.filter((x) => (x.score ?? 0) < 0.5).sort((a, b) => (a.score ?? 0) - (b.score ?? 0));
  const tagCount = new Map<ErrorTag, number>();
  rec.items.forEach((it) => {
    if (it.r === 'correct') return;
    const q = questions.find((x) => x.id === it.q)!;
    tagCount.set(q.err, (tagCount.get(q.err) ?? 0) + (it.r === 'wrong' ? 1 : 0.5));
  });
  const tags = [...tagCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
  const weakSubs = Array.from(new Set(rec.items.filter((it) => it.r !== 'correct').map((it) => questions.find((q) => q.id === it.q)!.sub))).slice(0, 4);
  const n = (r: Result) => rec.items.filter((x) => x.r === r).length;

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Prüfung · Auswertung</span>
        <h1>{Math.round(rec.score * 100)} %</h1>
        <p className="lead">✅ {n('correct')} richtig · 🟡 {n('partial')} teilweise · ❌ {n('wrong')} falsch oder offen · Zeit {fmt(rec.durationSec)}{rec.limitMin ? ` von ${rec.limitMin}:00` : ''}</p>
        <Bar value={rec.score} tone={rec.score >= 0.75 ? 'good' : rec.score >= 0.5 ? 'warn' : 'bad'} label="Ergebnis" />
      </header>

      <div className="grid-2">
        <section className="card stack-s" aria-labelledby="ex-strong">
          <h2 id="ex-strong" className="card-title">💪 Stärken</h2>
          {strong.length ? strong.map((x) => <span key={x.c.id}>{x.c.title} <span className="faint num">({Math.round((x.score ?? 0) * 100)} %)</span></span>) : <span className="muted">Noch kein Kapitel mit mindestens 75 %.</span>}
        </section>
        <section className="card stack-s" aria-labelledby="ex-weak">
          <h2 id="ex-weak" className="card-title">🧩 Problemstellen</h2>
          {weak.length ? weak.map((x) => <span key={x.c.id}>{x.c.title} <span className="faint num">({Math.round((x.score ?? 0) * 100)} %)</span></span>) : <span className="muted">Kein Kapitel unter 50 %.</span>}
        </section>
      </div>

      {tags.length > 0 && (
        <section className="card stack-s" aria-labelledby="ex-tags">
          <h2 id="ex-tags" className="card-title">Häufige Fehler</h2>
          {tags.map(([t, c]) => (
            <p key={t} style={{ margin: 0 }}><strong>{ERROR_META[t].label}</strong> <span className="faint">({c}×)</span> – {ERROR_META[t].tip}</p>
          ))}
        </section>
      )}

      {weakSubs.length > 0 && (
        <section className="card stack-s" aria-labelledby="ex-rec">
          <h2 id="ex-rec" className="card-title">Empfehlungen</h2>
          {weakSubs.map((s) => (
            <div key={s} className="row-between">
              <span>{getSubtopic(s)?.title}</span>
              <span className="row" style={{ gap: 6 }}>
                <Link to={`/lernen/${s}`} className="btn btn-ghost btn-small">Wiederholen</Link>
                <Link to={`/quiz?sub=${s}&fokus=fehler`} className="btn btn-soft btn-small">Fehler üben</Link>
              </span>
            </div>
          ))}
        </section>
      )}

      <section className="section" aria-labelledby="ex-list">
        <h2 id="ex-list">Alle Aufgaben mit Lösung</h2>
        <div className="list">
          {questions.map((q, k) => {
            const it = rec.items.find((x) => x.q === q.id)!;
            const isOpen = open === q.id;
            return (
              <div key={q.id} className="exam-review">
                <button type="button" className="list-item" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : q.id)}>
                  <span aria-hidden="true">{RESULT_META[it.r].icon}</span>
                  <span className="list-item-main">
                    <span style={{ fontWeight: 600 }}>{k + 1}. <Inline text={q.prompt} /></span>
                    <span className="list-item-meta">{LEVEL_META[q.level].icon} {getSubtopic(q.sub)?.title}</span>
                  </span>
                </button>
                {isOpen && (
                  <div className="exam-solution stack-s">
                    <SolutionText q={q} />
                    <ExplanationList items={q.why} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="row">
        <button type="button" className="btn btn-primary" onClick={onExit}>Neue Prüfung</button>
        <Link to="/statistik" className="btn btn-ghost">Zur Statistik</Link>
      </div>
    </div>
  );
}

function SolutionText({ q }: { q: Question }) {
  let text = '';
  switch (q.type) {
    case 'single': text = q.options[q.answer]; break;
    case 'multi': text = q.answers.map((a) => q.options[a]).join(' · '); break;
    case 'tf': text = q.answer ? 'Wahr' : `Falsch – ${q.correction ?? ''}`; break;
    case 'cloze': text = q.gaps.map((g, i) => `(${i + 1}) ${g.accept[0]}`).join(' · '); break;
    case 'order': text = q.items.map((x, i) => `${i + 1}. ${x}`).join('\n'); break;
    case 'match': text = q.pairs.map((p) => `- ${p.left} → ${p.right}`).join('\n'); break;
    case 'label': text = q.labels.map((l) => `- ${l.marker}: ${l.answer}`).join('\n'); break;
    case 'input': text = q.solution; break;
    case 'free': text = q.model; break;
  }
  return (
    <div>
      <strong>Lösung:</strong>
      <Markdown text={text} />
    </div>
  );
}
