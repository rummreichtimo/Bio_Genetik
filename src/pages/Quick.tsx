import { useEffect, useState } from 'react';
import { CARDS, getCard, getSubtopic, SUBTOPICS, termsOf } from '../content';
import type { Question } from '../content/types';
import { allSubProgress } from '../learning/mastery';
import { filterQuestions, pickQuestions } from '../learning/select';
import { isDue } from '../learning/srs';
import type { CardRating, ProgressState, Result } from '../progress/types';
import { useProgress } from '../progress/store';
import { Link } from '../app/router';
import { QuestionView } from '../quiz/QuestionView';
import { IconArrowRight, IconClock } from '../ui/icons';
import { Bar } from '../ui/primitives';
import { SourceTag } from '../ui/Provenance';
import { Markdown } from '../ui/Markdown';

interface QuickPlan {
  sub: string;
  reason: string;
  terms: string[];
  cards: string[];
  questions: Question[];
}

/** Wählt das Thema mit dem größten Nutzen für eine kurze Einheit. */
export function buildQuick(state: ProgressState, now = Date.now()): QuickPlan {
  const progress = allSubProgress(state);
  const weak = progress.filter((p) => p.status === 'schwach').sort((a, b) => (a.recentMastery ?? 0) - (b.recentMastery ?? 0))[0];
  const recent = state.recent.find((r) => getSubtopic(r.sub));
  const inWork = progress.find((p) => p.status === 'in-arbeit');
  const open = progress.find((p) => p.status === 'offen');
  const sub = weak?.sub ?? recent?.sub ?? inWork?.sub ?? open?.sub ?? SUBTOPICS[0].id;
  const reason = weak ? 'Dein schwächstes Thema' : recent ? 'Zuletzt gelernt' : inWork ? 'Angefangenes Thema' : 'Nächstes neues Thema';
  // Begriffe: bevorzugt noch nicht sicher gewusste Begriffskarten
  const terms = termsOf(sub)
    .map((t) => t.id)
    .sort((a, b) => (state.cards[`t:${a}`]?.box ?? -1) - (state.cards[`t:${b}`]?.box ?? -1))
    .slice(0, 3);
  const subCards = CARDS.filter((c) => c.sub === sub && !c.id.startsWith('t:'));
  const cards = [...subCards.filter((c) => isDue(state.cards[c.id], now)), ...subCards.filter((c) => !state.cards[c.id])].slice(0, 4).map((c) => c.id);
  const questions = pickQuestions(filterQuestions(state, { subs: [sub], levels: [1, 2, 3], types: ['single', 'tf', 'multi', 'cloze', 'match'] }), state, 3, now);
  return { sub, reason, terms, cards, questions };
}

type Step = 'begriffe' | 'karten' | 'quiz' | 'fertig';

export function Quick() {
  const { state, rateCard } = useProgress();
  const [plan] = useState(() => buildQuick(state));
  const [step, setStep] = useState<Step>('begriffe');
  const [shown, setShown] = useState<Record<string, boolean>>({});
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [results, setResults] = useState<Record<string, Result>>({});
  const [started] = useState(Date.now());
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);
  const elapsed = Math.floor((now - started) / 1000);
  const sub = getSubtopic(plan.sub)!;
  const steps: Step[] = ['begriffe', 'karten', 'quiz', 'fertig'];
  const stepNo = steps.indexOf(step);
  const termCards = plan.terms.map((id) => getCard(`t:${id}`)!).filter(Boolean);

  const rate = (r: CardRating) => {
    rateCard(plan.cards[cardIdx], r);
    setFlipped(false);
    if (cardIdx + 1 < plan.cards.length) setCardIdx(cardIdx + 1);
    else setStep('quiz');
  };

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">5-Minuten-Einheit · {plan.reason}</span>
        <h1>{sub.title}</h1>
        <div className="row-between" style={{ fontSize: 'var(--fs-sm)' }}>
          <span className="muted">Schritt {Math.min(stepNo + 1, 3)} von 3: {step === 'begriffe' ? 'Begriffe' : step === 'karten' ? 'Karten' : step === 'quiz' ? 'Abschlussquiz' : 'Fertig'}</span>
          <span className="num faint"><IconClock width={14} height={14} /> {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, '0')} / 5:00</span>
        </div>
        <Bar value={Math.min(1, elapsed / 300)} thin tone={elapsed > 300 ? 'warn' : undefined} label="Zeit" />
      </header>

      {step === 'begriffe' && (
        <section className="stack" aria-label="Wichtige Begriffe">
          <p className="muted" style={{ margin: 0 }}>Versuche jeden Begriff zuerst selbst zu erklären, dann decke auf.</p>
          {termCards.map((c) => (
            <div key={c.id} className="card stack-s">
              <strong className="term-name">{c.front}</strong>
              {shown[c.id] ? (
                <>
                  <Markdown text={c.back.replace(/\n(?!\n)/g, '\n\n')} />
                  <SourceTag src={c.src} prov={c.prov} />
                </>
              ) : (
                <button type="button" className="btn btn-soft btn-small" onClick={() => setShown({ ...shown, [c.id]: true })}>Aufdecken</button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={() => setStep(plan.cards.length ? 'karten' : 'quiz')}>
            Weiter <IconArrowRight />
          </button>
        </section>
      )}

      {step === 'karten' && plan.cards[cardIdx] && (() => {
        const c = getCard(plan.cards[cardIdx])!;
        return (
          <section className="flashcard-wrap" aria-label="Karteikarten">
            <span className="muted" style={{ fontSize: 'var(--fs-sm)' }}>Karte {cardIdx + 1} von {plan.cards.length}</span>
            <div className="flashcard">
              <div className="flashcard-front"><Markdown text={c.front} /></div>
              {flipped && (
                <div className="flashcard-back">
                  <Markdown text={c.back.replace(/\n(?!\n)/g, '\n\n')} />
                  <SourceTag src={c.src} prov={c.prov} />
                </div>
              )}
            </div>
            {!flipped ? (
              <button type="button" className="btn btn-primary btn-block" onClick={() => setFlipped(true)}>Umdrehen</button>
            ) : (
              <div className="rate-row">
                <button type="button" className="rate-btn rate-good" onClick={() => rate('known')}><span aria-hidden="true">✅</span><span>Gewusst</span></button>
                <button type="button" className="rate-btn rate-warn" onClick={() => rate('unsure')}><span aria-hidden="true">🟡</span><span>Unsicher</span></button>
                <button type="button" className="rate-btn rate-bad" onClick={() => rate('unknown')}><span aria-hidden="true">❌</span><span>Nicht gewusst</span></button>
              </div>
            )}
          </section>
        );
      })()}

      {step === 'quiz' && plan.questions[qIdx] && (
        <QuestionView
          key={plan.questions[qIdx].id}
          q={plan.questions[qIdx]}
          mode="quick"
          headingLevel={2}
          onResult={(r) => setResults((x) => ({ ...x, [plan.questions[qIdx].id]: r }))}
          footer={
            results[plan.questions[qIdx].id] && (
              <div className="row" style={{ justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-primary" onClick={() => (qIdx + 1 < plan.questions.length ? setQIdx(qIdx + 1) : setStep('fertig'))}>
                  {qIdx + 1 < plan.questions.length ? 'Nächste Frage' : 'Fertig'} <IconArrowRight />
                </button>
              </div>
            )
          }
        />
      )}
      {step === 'quiz' && !plan.questions.length && (
        <button type="button" className="btn btn-primary" onClick={() => setStep('fertig')}>Fertig</button>
      )}

      {step === 'fertig' && (
        <div className="card stack">
          <h2>Gut gemacht!</h2>
          <p className="muted" style={{ margin: 0 }}>
            {Math.floor(elapsed / 60)} min {elapsed % 60} s · {plan.terms.length} Begriffe · {plan.cards.length} Karten ·{' '}
            {Object.values(results).filter((r) => r === 'correct').length} von {plan.questions.length} Fragen richtig
          </p>
          <div className="row">
            <Link to={`/lernen/${plan.sub}`} className="btn btn-primary">Thema vertiefen</Link>
            <Link to="/" className="btn btn-ghost">Zur Startseite</Link>
          </div>
        </div>
      )}
    </div>
  );
}
