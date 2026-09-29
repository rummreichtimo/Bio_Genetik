import { useState } from 'react';
import { CHAPTERS, getSubtopic } from '../content';
import { allSubProgress, weightedProgress, type SubStatus } from '../learning/mastery';
import { useProgress } from '../progress/store';
import { Link } from '../app/router';
import { ChapterGlyph, IconArrowRight } from '../ui/icons';
import { EmptyState } from '../ui/primitives';
import { pagesShort, SubtopicRow } from '../ui/topic';

type Filter = 'alle' | SubStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'alle', label: 'Alle' },
  { id: 'offen', label: 'Offen' },
  { id: 'in-arbeit', label: 'In Arbeit' },
  { id: 'schwach', label: 'Wiederholen' },
  { id: 'gelernt', label: 'Gelernt' },
];

export function Topics() {
  const { state } = useProgress();
  const progress = allSubProgress(state);
  const [filter, setFilter] = useState<Filter>('alle');
  const count = (f: Filter) => (f === 'alle' ? progress.length : progress.filter((p) => p.status === f).length);
  const visible = progress.filter((p) => filter === 'alle' || p.status === filter);

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Themen</span>
        <h1>Alle Themen</h1>
        <p className="lead">
          {CHAPTERS.length} Kapitel mit {progress.length} Unterthemen – gegliedert wie in deiner PDF. Jedes Thema hat eine Lerneinheit,
          Karteikarten und Übungsfragen.
        </p>
      </header>

      <div className="tabs" role="group" aria-label="Themen filtern">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" className="tab" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label} <span className="num faint">{count(f.id)}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 && (
        <EmptyState title="Keine Themen in dieser Auswahl">
          {filter === 'schwach' ? 'Sehr gut – im Moment ist kein Thema als „Wiederholen“ markiert.' : 'Wähle einen anderen Filter.'}
        </EmptyState>
      )}

      <div className="stack-l">
        {CHAPTERS.map((ch, i) => {
          const subs = visible.filter((p) => ch.subtopics.includes(p.sub));
          if (!subs.length) return null;
          const all = progress.filter((p) => ch.subtopics.includes(p.sub));
          const pages = Array.from(new Set(ch.subtopics.flatMap((s) => getSubtopic(s)?.pages ?? [])));
          return (
            <section key={ch.id} className="card chapter-card" aria-labelledby={`chapter-${ch.id}`}>
              <div className="chapter-card-head">
                <span className="chapter-icon" aria-hidden="true">
                  <ChapterGlyph icon={ch.icon} />
                </span>
                <div className="chapter-card-title">
                  <span className="eyebrow">Kapitel {i + 1}</span>
                  <h2 id={`chapter-${ch.id}`}>{ch.title}</h2>
                  <span className="faint chapter-card-ref">
                    {ch.bookRef.replace(/^Kapitel ([\d.]+) · /, 'Buchkapitel $1: ')} · {pagesShort(pages)}
                  </span>
                </div>
                <strong className="num chapter-card-pct">{Math.round(weightedProgress(all) * 100)} %</strong>
              </div>
              <div className="stack-s">
                {subs.map((p) => (
                  <SubtopicRow key={p.sub} p={p} detail />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="row" style={{ justifyContent: 'center' }}>
        <Link to="/glossar" className="btn btn-soft">
          Glossar: alle Fachbegriffe <IconArrowRight />
        </Link>
        <Link to="/lehrplan" className="btn btn-ghost">
          Lehrplan-Check <IconArrowRight />
        </Link>
      </div>
    </div>
  );
}
