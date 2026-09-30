import { useEffect, useRef, useState } from 'react';
import { CARDS, CHAPTERS, getCard, getSubtopic } from '../content';
import type { CardKind, Flashcard } from '../content/types';
import { isDue, MAX_BOX, BOX_INTERVAL_DAYS } from '../learning/srs';
import { cardQueueInfo } from '../learning/stats';
import type { CardRating, ProgressState } from '../progress/types';
import { useProgress } from '../progress/store';
import { Link, navigate } from '../app/router';
import { IconArrowRight, IconFlip } from '../ui/icons';
import { Bar, EmptyState } from '../ui/primitives';
import { ExternalRef, SourceTag } from '../ui/Provenance';
import { Markdown } from '../ui/Markdown';
import { WidgetView } from '../widgets';
import { isCardLearned } from '../learning/learned';
import { sectionOfCard } from '../content';
import { ReadUp } from '../quiz/ReadUp';

export const KIND_META: Record<CardKind, { label: string; icon: string }> = {
  begriff: { label: 'Begriff → Definition', icon: '📖' },
  frage: { label: 'Frage → Antwort', icon: '❓' },
  prozess: { label: 'Prozess → Erklärung', icon: '🔁' },
  ursache: { label: 'Ursache → Wirkung', icon: '➡️' },
  vergleich: { label: 'Vergleich', icon: '⚖️' },
  experiment: { label: 'Experiment → Ergebnis', icon: '🧪' },
  abbildung: { label: 'Abbildung → Beschriftung', icon: '🖼️' },
};

const RATING_META: Record<CardRating, { icon: string; label: string; key: string; cls: string }> = {
  known: { icon: '✅', label: 'Gewusst', key: '1', cls: 'rate-good' },
  unsure: { icon: '🟡', label: 'Unsicher', key: '2', cls: 'rate-warn' },
  unknown: { icon: '❌', label: 'Nicht gewusst', key: '3', cls: 'rate-bad' },
};

const SESSION_MAX = 25;

/** Karten für eine Lernrunde: fällige zuerst (niedrige Fächer zuerst), danach neue. */
export function buildDeck(scope: string, state: ProgressState, now = Date.now()): { title: string; ids: string[] } {
  let pool: Flashcard[] = CARDS;
  let title = 'Alle Karten';
  let onlyDue = false;
  let onlyNew = false;
  if (scope === 'faellig') {
    title = 'Fällige Karten';
    onlyDue = true;
  } else if (scope === 'neu') {
    title = 'Neue Karten';
    onlyNew = true;
  } else if (scope.startsWith('sub-')) {
    const sub = scope.slice(4);
    pool = CARDS.filter((c) => c.sub === sub);
    title = getSubtopic(sub)?.title ?? 'Thema';
  } else if (scope.startsWith('kapitel-')) {
    const ch = CHAPTERS.find((c) => c.id === scope.slice(8));
    pool = CARDS.filter((c) => ch?.subtopics.includes(c.sub));
    title = ch?.title ?? 'Kapitel';
  } else if (scope.startsWith('typ-')) {
    const kind = scope.slice(4) as CardKind;
    pool = CARDS.filter((c) => c.kind === kind);
    title = KIND_META[kind]?.label ?? 'Kartentyp';
  }
  const due = pool.filter((c) => isDue(state.cards[c.id], now)).sort((a, b) => state.cards[a.id].box - state.cards[b.id].box || state.cards[a.id].due - state.cards[b.id].due);
  // Neue Karten nur zu Abschnitten, die im Lernmodus schon dran waren
  const fresh = pool.filter((c) => !state.cards[c.id] && isCardLearned(state, c.id));
  const later = pool.filter((c) => state.cards[c.id] && !isDue(state.cards[c.id], now)).sort((a, b) => state.cards[a.id].box - state.cards[b.id].box);
  let list: Flashcard[];
  if (onlyDue) list = due;
  else if (onlyNew) list = fresh;
  else list = [...due, ...fresh, ...(scope === 'alle' ? [] : later)];
  return { title, ids: list.slice(0, scope.startsWith('sub-') ? 60 : SESSION_MAX).map((c) => c.id) };
}

// ---------------------------------------------------------------------------
// Übersicht
// ---------------------------------------------------------------------------

export function CardsHome() {
  const { state } = useProgress();
  const info = cardQueueInfo(state);
  const boxes = Array.from({ length: MAX_BOX + 1 }, (_, b) => CARDS.filter((c) => state.cards[c.id]?.box === b).length);
  const kinds = Object.keys(KIND_META) as CardKind[];
  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Karteikarten</span>
        <h1>Wiederholen mit System</h1>
        <p className="lead">
          Karten festigen, was du im Lernmodus gelernt hast. Neue Karten kommen erst dazu, wenn du den passenden Abschnitt gelernt hast. Was du
          gewusst hast, kommt später wieder; was unsicher war, bald; was du nicht wusstest, noch in derselben Runde.
        </p>
      </header>

      <section className="card cards-hero" aria-label="Stand der Karteikarten">
        <div className="cards-hero-stats">
          <div className="stat"><span className="stat-value num">{info.due}</span><span className="stat-label">fällig</span></div>
          <div className="stat"><span className="stat-value num">{info.fresh}</span><span className="stat-label">neu</span></div>
          <div className="stat"><span className="stat-value num">{info.learned}</span><span className="stat-label">später wieder</span></div>
        </div>
        <div className="row">
          {info.due > 0 ? (
            <Link to="/karten/lernen/faellig" className="btn btn-primary btn-large">{info.due} fällige Karten lernen <IconArrowRight /></Link>
          ) : info.fresh > 0 ? (
            <Link to="/karten/lernen/neu" className="btn btn-primary btn-large">Neue Karten lernen <IconArrowRight /></Link>
          ) : (
            <Link to="/lernpfad" className="btn btn-primary btn-large">Erst lernen: zum Lernpfad <IconArrowRight /></Link>
          )}
          {info.due > 0 && info.fresh > 0 && <Link to="/karten/lernen/neu" className="btn btn-soft">Neue Karten</Link>}
        </div>
        {info.locked > 0 && (
          <p className="faint" style={{ fontSize: 'var(--fs-sm)', margin: 0 }}>
            {info.locked} weitere Karten werden freigeschaltet, sobald du die passenden Abschnitte im Lernmodus gelernt hast.
          </p>
        )}
        <div className="boxes" aria-label="Karten je Fach">
          {boxes.map((n, b) => (
            <div key={b} className="box">
              <span className="box-bar" style={{ height: `${Math.max(4, (n / Math.max(1, ...boxes)) * 60)}px` }} />
              <span className="num box-n">{n}</span>
              <span className="box-label">Fach {b}</span>
              <span className="faint box-sub">{b === 0 ? 'sofort' : `${BOX_INTERVAL_DAYS[b]} ${BOX_INTERVAL_DAYS[b] === 1 ? 'Tag' : 'Tage'}`}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="by-topic">
        <h2 id="by-topic">Nach Thema</h2>
        {CHAPTERS.map((ch) => (
          <div key={ch.id} className="stack-s">
            <h3 className="card-title">{ch.title}</h3>
            <div className="deck-grid">
              {ch.subtopics.map((sid) => {
                const cards = CARDS.filter((c) => c.sub === sid);
                const q = cardQueueInfo(state, Date.now(), (s) => s === sid);
                const mastery = cards.reduce((a, c) => a + (state.cards[c.id]?.box ?? 0), 0) / (cards.length * MAX_BOX);
                return (
                  <Link key={sid} to={`/karten/lernen/sub-${sid}`} className="card card-link deck">
                    <span className="deck-title">{getSubtopic(sid)?.title}</span>
                    <span className="faint deck-meta">{cards.length} Karten · {q.due} fällig · {q.fresh} neu{q.locked ? ` · ${q.locked} noch nicht gelernt` : ''}</span>
                    <Bar value={mastery} thin label={`Kartenstand ${getSubtopic(sid)?.title}`} />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="section" aria-labelledby="by-kind">
        <h2 id="by-kind">Nach Kartentyp</h2>
        <div className="deck-grid">
          {kinds.map((k) => {
            const n = CARDS.filter((c) => c.kind === k).length;
            return (
              <Link key={k} to={`/karten/lernen/typ-${k}`} className="card card-link deck">
                <span className="deck-title"><span aria-hidden="true">{KIND_META[k].icon}</span> {KIND_META[k].label}</span>
                <span className="faint deck-meta">{n} Karten</span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lernrunde
// ---------------------------------------------------------------------------

function backText(s: string): string {
  return s.replace(/\n(?!\n)/g, '\n\n');
}

export function CardSession({ scope }: { scope: string }) {
  const { state, rateCard } = useProgress();
  // Stapel wird beim Start festgelegt (sonst würde er sich bei jeder Bewertung ändern)
  const [deck] = useState(() => buildDeck(scope, state));
  const [queue, setQueue] = useState<string[]>(deck.ids);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<Record<CardRating, number>>({ known: 0, unsure: 0, unknown: 0 });
  const repeats = useRef<Record<string, number>>({});
  const cardRef = useRef<HTMLDivElement>(null);

  const id = queue[pos];
  const card = id ? getCard(id) : undefined;
  const finished = pos >= queue.length;

  const rate = (r: CardRating) => {
    if (!card || !flipped) return;
    rateCard(card.id, r);
    setResults((x) => ({ ...x, [r]: x[r] + 1 }));
    const n = repeats.current[card.id] ?? 0;
    if ((r === 'unknown' && n < 2) || (r === 'unsure' && n < 1)) {
      repeats.current[card.id] = n + 1;
      const q = [...queue];
      const at = r === 'unknown' ? Math.min(q.length, pos + 4) : q.length;
      q.splice(at, 0, card.id);
      setQueue(q);
    }
    setFlipped(false);
    setPos(pos + 1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
      if (finished) return;
      if ((e.key === ' ' || e.key === 'Enter') && !flipped && t.tagName !== 'BUTTON') {
        e.preventDefault();
        setFlipped(true);
      } else if (flipped && ['1', '2', '3'].includes(e.key)) {
        rate((['known', 'unsure', 'unknown'] as CardRating[])[Number(e.key) - 1]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    cardRef.current?.focus({ preventScroll: true });
  }, [pos, flipped]);

  const total = queue.length;
  const reviewed = results.known + results.unsure + results.unknown;

  if (!deck.ids.length) {
    return (
      <div className="page page-narrow">
        <header className="page-head">
          <span className="eyebrow">Karteikarten</span>
          <h1>{deck.title}</h1>
        </header>
        <EmptyState
          title={scope === 'faellig' ? 'Gerade ist keine Karte fällig' : 'Noch keine Karten freigeschaltet'}
          action={
            scope.startsWith('sub-') ? (
              <Link to={`/lernen/${scope.slice(4)}`} className="btn btn-primary">Thema jetzt lernen</Link>
            ) : (
              <Link to={scope === 'faellig' ? '/karten' : '/lernpfad'} className="btn btn-primary">{scope === 'faellig' ? 'Zur Übersicht' : 'Zum Lernpfad'}</Link>
            )
          }
        >
          {scope === 'faellig'
            ? 'Sehr gut! Lerne neue Karten oder übe mit dem Quiz.'
            : 'Karten kommen zu dir, sobald du die passenden Abschnitte im Lernmodus gelernt hast – dann weißt du auch, worum es geht.'}
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="page page-narrow">
      <nav className="crumbs" aria-label="Pfad">
        <Link to="/karten">Karteikarten</Link>
        <span aria-hidden="true">›</span>
        <span>{deck.title}</span>
      </nav>
      <header className="page-head">
        <h1>{deck.title}</h1>
        <div className="row-between" style={{ fontSize: 'var(--fs-sm)' }}>
          <span className="muted num">{finished ? 'Runde beendet' : `Karte ${pos + 1} von ${total}`}</span>
          <span className="faint num">✅ {results.known} · 🟡 {results.unsure} · ❌ {results.unknown}</span>
        </div>
        <Bar value={total ? pos / total : 1} thin label="Fortschritt der Runde" />
      </header>

      {!finished && card ? (
        <div className="flashcard-wrap">
          <div ref={cardRef} tabIndex={-1} className={`flashcard ${flipped ? 'is-flipped' : ''}`} aria-live="polite">
            <div className="flashcard-meta">
              <span className="chip"><span aria-hidden="true">{KIND_META[card.kind].icon}</span> {KIND_META[card.kind].label}</span>
              <span className="faint" style={{ fontSize: 'var(--fs-xs)' }}>{getSubtopic(card.sub)?.title}</span>
            </div>
            {card.figure && <WidgetView id={card.figure.widget} highlight={card.figure.highlight} labelMode={!flipped} compact />}
            <div className="flashcard-front">
              <span className="sr-only">Vorderseite: </span>
              <Markdown text={card.front} />
            </div>
            {flipped && (
              <div className="flashcard-back">
                <span className="sr-only">Rückseite: </span>
                <Markdown text={backText(card.back)} />
                <div className="row" style={{ gap: 8 }}>
                  <SourceTag src={card.src} prov={card.prov} />
                  {card.prov === 'ext' && card.ext && <span style={{ fontSize: 'var(--fs-xs)' }}><ExternalRef ext={card.ext} /></span>}
                </div>
                {sectionOfCard(card.id) && <ReadUp key={card.id} refTo={sectionOfCard(card.id)!} hint="Zusammenhang vergessen?" />}
              </div>
            )}
          </div>
          {!flipped ? (
            <button type="button" className="btn btn-primary btn-large btn-block" onClick={() => setFlipped(true)}>
              <IconFlip /> Umdrehen <kbd>Leertaste</kbd>
            </button>
          ) : (
            <div className="rate-row" role="group" aria-label="Wie gut wusstest du es?">
              {(['known', 'unsure', 'unknown'] as CardRating[]).map((r) => (
                <button key={r} type="button" className={`rate-btn ${RATING_META[r].cls}`} onClick={() => rate(r)}>
                  <span aria-hidden="true">{RATING_META[r].icon}</span>
                  <span>{RATING_META[r].label}</span>
                  <kbd>{RATING_META[r].key}</kbd>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="card stack">
          <h2>Runde geschafft</h2>
          <p className="muted">{reviewed} Bewertungen: ✅ {results.known} gewusst · 🟡 {results.unsure} unsicher · ❌ {results.unknown} nicht gewusst.</p>
          <p className="faint" style={{ fontSize: 'var(--fs-sm)' }}>
            Gewusste Karten rücken ein Fach weiter und kommen später wieder (bis 16 Tage). Nicht gewusste Karten starten wieder in Fach 0.
          </p>
          <div className="row">
            <button type="button" className="btn btn-primary" onClick={() => navigate('/karten')}>Zur Übersicht</button>
            {scope.startsWith('sub-') && <Link to={`/quiz?sub=${scope.slice(4)}`} className="btn btn-soft">Thema im Quiz üben</Link>}
          </div>
        </div>
      )}
    </div>
  );
}
