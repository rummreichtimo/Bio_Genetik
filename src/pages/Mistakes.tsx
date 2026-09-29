import { getQuestion, getSubtopic } from '../content';
import type { ErrorTag } from '../content/types';
import { formatDateTime } from '../lib/date';
import { useProgress } from '../progress/store';
import type { ErrorEntry, ProgressState } from '../progress/types';
import { Link } from '../app/router';
import { IconArrowRight } from '../ui/icons';
import { Bar, EmptyState } from '../ui/primitives';
import { Inline } from '../ui/Markdown';

export const ERROR_META: Record<ErrorTag, { label: string; tip: string }> = {
  enzyme: { label: 'Enzyme verwechselt', tip: 'Lege dir zu jedem Enzym eine Karte an: Name → Aufgabe → wo im Ablauf.' },
  sequence: { label: 'Reihenfolge unsicher', tip: 'Zeichne den Ablauf als Fließdiagramm und sprich jeden Schritt laut mit.' },
  direction: { label: '5′→3′ und Leserichtung', tip: 'Markiere bei jeder Sequenz zuerst die Enden (5′/3′), dann lies.' },
  terms: { label: 'Fachbegriffe verwechselt', tip: 'Wiederhole die Begriffskarten des Themas und vergleiche ähnliche Begriffe direkt.' },
  facts: { label: 'Zahlen und Fakten', tip: 'Kurze Lückentexte und Karten mit den Zahlen aus der PDF helfen.' },
  experiment: { label: 'Versuchsauswertung', tip: 'Trenne Beobachtung und Deutung: erst beschreiben, dann erklären.' },
  code: { label: 'Code-Sonne / Basenpaarung', tip: 'Übersetze Schritt für Schritt: DNA → mRNA (komplementär) → Codons → Aminosäuren.' },
  inheritance: { label: 'Erbgänge und Genotypen', tip: 'Gehe nach den drei Schritten der Stammbaumanalyse vor und notiere Genotypen.' },
  mechanism: { label: 'Zusammenhang nicht erklärt', tip: 'Verbinde Ursache und Wirkung mit „weil“ und „dadurch“ – jeder Schritt einzeln.' },
  comparison: { label: 'Unterschiede unklar', tip: 'Vergleiche immer anhand gleicher Kriterien (Tabelle mit Spalten).' },
  evaluation: { label: 'Bewertung / Argumentation', tip: 'Trenne Fakten (deskriptiv) von Wertungen (normativ) und bilde ein begründetes Urteil.' },
};

export interface ErrorPattern {
  sub: string;
  tag: ErrorTag;
  count: number;
  last: number;
  /** davon noch nicht korrigiert (letzte Antwort nicht richtig) */
  open: number;
}

const WINDOW_MS = 60 * 86_400_000;

/** Häufige Fehlermuster „Thema → Fehlerart“, zuletzt aufgetretene zuerst gewichtet. */
export function errorPatterns(state: ProgressState, now = Date.now()): ErrorPattern[] {
  const map = new Map<string, ErrorPattern>();
  for (const e of state.errors) {
    if (now - e.at > WINDOW_MS) continue;
    const key = `${e.sub}|${e.tag}`;
    const p = map.get(key) ?? { sub: e.sub, tag: e.tag, count: 0, last: 0, open: 0 };
    p.count += e.r === 'wrong' ? 1 : 0.5;
    p.last = Math.max(p.last, e.at);
    map.set(key, p);
  }
  for (const p of map.values()) {
    const qs = new Set(state.errors.filter((e) => e.sub === p.sub && e.tag === p.tag).map((e) => e.q));
    p.open = [...qs].filter((q) => state.q[q]?.last !== 'correct').length;
  }
  return [...map.values()].sort((a, b) => b.open - a.open || b.count - a.count || b.last - a.last);
}

export function Mistakes() {
  const { state } = useProgress();
  const patterns = errorPatterns(state);
  const byTag = new Map<ErrorTag, number>();
  for (const p of patterns) byTag.set(p.tag, (byTag.get(p.tag) ?? 0) + p.count);
  const tags = [...byTag.entries()].sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...tags.map((t) => t[1]));
  const recent: ErrorEntry[] = [...state.errors].sort((a, b) => b.at - a.at).slice(0, 15);
  const openCount = Object.values(state.q).filter((s) => s.last !== 'correct').length;

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Fehleranalyse</span>
        <h1>Deine Fehlermuster</h1>
        <p className="lead">Jede falsche oder teilweise richtige Antwort wird einer Fehlerart zugeordnet. So siehst du, was genau du wiederholen solltest.</p>
      </header>

      {!state.errors.length ? (
        <EmptyState title="Noch keine Fehler protokolliert" action={<Link to="/quiz" className="btn btn-primary">Zum Quiz</Link>}>
          Beantworte ein paar Fragen im Quiz oder im Lernmodus – danach erscheint hier deine Auswertung.
        </EmptyState>
      ) : (
        <>
          <section className="card stack" aria-labelledby="open-title">
            <div className="row-between">
              <h2 id="open-title" style={{ fontSize: 'var(--fs-xl)' }}>Offene Fehler</h2>
              <strong className="num" style={{ fontSize: 'var(--fs-2xl)' }}>{openCount}</strong>
            </div>
            <p className="muted" style={{ margin: 0 }}>Fragen, die du zuletzt nicht vollständig richtig beantwortet hast.</p>
            {openCount > 0 && (
              <Link to="/quiz?fokus=fehler" className="btn btn-primary">Alle offenen Fehler wiederholen <IconArrowRight /></Link>
            )}
          </section>

          <section className="section" aria-labelledby="patterns-title">
            <h2 id="patterns-title">Häufigste Fehlermuster</h2>
            <div className="stack-s">
              {patterns.slice(0, 8).map((p) => (
                <div key={`${p.sub}|${p.tag}`} className="card pattern">
                  <div className="pattern-main">
                    <span className="pattern-title">
                      {getSubtopic(p.sub)?.title} <span aria-hidden="true">→</span> {ERROR_META[p.tag].label}
                    </span>
                    <span className="faint" style={{ fontSize: 'var(--fs-xs)' }}>
                      {p.count % 1 ? p.count.toFixed(1).replace('.', ',') : p.count}× in 60 Tagen · {p.open ? `${p.open} Frage${p.open === 1 ? '' : 'n'} noch offen` : 'alle inzwischen richtig'}
                    </span>
                    <span style={{ fontSize: 'var(--fs-sm)' }}>💡 {ERROR_META[p.tag].tip}</span>
                  </div>
                  <Link to={`/quiz?sub=${p.sub}&fehler=${p.tag}`} className="btn btn-soft btn-small">Gezielt üben</Link>
                </div>
              ))}
            </div>
          </section>

          <section className="section" aria-labelledby="tags-title">
            <h2 id="tags-title">Nach Fehlerart</h2>
            <div className="card stack-s">
              {tags.map(([t, n]) => (
                <div key={t} className="tag-row">
                  <span>{ERROR_META[t].label}</span>
                  <Bar value={n / max} thin tone="bad" label={ERROR_META[t].label} />
                  <span className="num faint">{Math.round(n * 10) / 10}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="section" aria-labelledby="recent-title">
            <h2 id="recent-title">Zuletzt</h2>
            <div className="list">
              {recent.map((e) => {
                const q = getQuestion(e.q);
                return (
                  <div key={e.id} className="list-item">
                    <span aria-hidden="true">{e.r === 'wrong' ? '❌' : '🟡'}</span>
                    <span className="list-item-main">
                      <span className="list-item-title" style={{ fontWeight: 600 }}>{q ? <Inline text={q.prompt} /> : e.q}</span>
                      <span className="list-item-meta">
                        {getSubtopic(e.sub)?.title} · {ERROR_META[e.tag].label} · {formatDateTime(e.at)}
                        {state.q[e.q]?.last === 'correct' ? ' · inzwischen richtig ✅' : ''}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
