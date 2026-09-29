import { getQuestion, getSubtopic } from '../content';
export { ERROR_META } from '../learning/errors';
import type { ErrorTag } from '../content/types';
import { ERROR_META, errorPatterns } from '../learning/errors';
import { formatDateTime } from '../lib/date';
import { useProgress } from '../progress/store';
import type { ErrorEntry } from '../progress/types';
import { Link } from '../app/router';
import { IconArrowRight } from '../ui/icons';
import { Bar, EmptyState } from '../ui/primitives';
import { Inline } from '../ui/Markdown';

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
