import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { SUBTOPICS, getSubtopic } from '../content';
import { EXPLAINERS, hasExplainer } from '../explainers';
import { search, type HitKind, type SearchHit } from '../learning/search';
import { Link } from '../app/router';
import { IconArrowRight, IconBook, IconFlask, IconSearch, IconSparkle } from '../ui/icons';

const GROUPS: { kind: HitKind; title: string }[] = [
  { kind: 'explainer', title: 'Anschaulich erklärt' },
  { kind: 'topic', title: 'Themen' },
  { kind: 'section', title: 'Lernabschnitte' },
  { kind: 'term', title: 'Fachbegriffe' },
  { kind: 'experiment', title: 'Experimente' },
];

const SUGGEST = ['DNA-Replikation', 'Okazaki-Fragmente', 'PCR', 'Genetischer Code', 'Translation', 'CRISPR', 'Stammbaum', 'Epigenetik'];

export function Search({ q: initial = '' }: { q?: string }) {
  const [q, setQ] = useState(initial);
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => setQ(initial), [initial]);
  useEffect(() => {
    if (!initial) inputRef.current?.focus();
  }, []);
  const hits = useMemo(() => search(q), [q]);
  const best = hits[0] && (hits[0].kind === 'explainer' || hits[0].kind === 'topic') ? hits[0] : undefined;
  // Adresse mitführen, ohne neu zu navigieren (Zurück-Taste führt zur Suche mit Begriff)
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        window.history.replaceState(null, '', `#/suche${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`);
      } catch {
        /* ignorieren */
      }
    }, 400);
    return () => window.clearTimeout(id);
  }, [q]);

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Suche</span>
        <h1>Was möchtest du verstehen?</h1>
      </header>
      <form className="search-form" role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor={inputId} className="sr-only">Suchbegriff</label>
        <IconSearch aria-hidden="true" />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          className="search-input"
          placeholder="z. B. DNA-Replikation, Okazaki, Stammbaum …"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
      </form>

      {!q.trim() ? (
        <SearchStart onPick={setQ} />
      ) : hits.length === 0 ? (
        <div className="card stack-s">
          <strong>Nichts gefunden zu „{q}“</strong>
          <span className="muted">Probiere einen anderen Begriff oder ein Stichwort aus deiner PDF, z. B. „Primer“ oder „Codon“.</span>
        </div>
      ) : (
        <>
          <p className="muted" aria-live="polite" style={{ margin: 0 }}>{hits.length} Treffer</p>
          {best && <BestHit hit={best} />}
          {GROUPS.map((g) => {
            const list = hits.filter((h) => h.kind === g.kind && h !== best);
            if (!list.length) return null;
            return (
              <section key={g.kind} className="section" aria-labelledby={`sg-${g.kind}`}>
                <h2 id={`sg-${g.kind}`} className="search-group">{g.title} <span className="faint">({list.length})</span></h2>
                <div className="list">
                  {list.slice(0, g.kind === 'section' || g.kind === 'term' ? 8 : 6).map((h) => (
                    <HitRow key={h.id} hit={h} />
                  ))}
                </div>
              </section>
            );
          })}
        </>
      )}
    </div>
  );
}

function BestHit({ hit }: { hit: SearchHit }) {
  const sub = getSubtopic(hit.sub);
  const explainer = hit.kind === 'explainer' || hasExplainer(hit.sub);
  return (
    <section className="card best-hit" aria-label="Bestes Ergebnis">
      <span className="eyebrow">Bestes Ergebnis</span>
      <h2 className="best-hit-title">{sub?.title ?? hit.title}</h2>
      <p className="muted" style={{ margin: 0 }}>{sub?.summary}</p>
      <div className="row">
        {explainer && (
          <Link to={`/erklaert/${hit.sub}`} className="btn btn-primary btn-large">
            <IconSparkle /> Anschaulich erklärt – mit Animationen
          </Link>
        )}
        <Link to={`/lernen/${hit.sub}`} className={`btn ${explainer ? 'btn-soft' : 'btn-primary btn-large'}`}>
          <IconBook /> Im Lernmodus lernen
        </Link>
        <Link to={`/thema/${hit.sub}`} className="btn btn-ghost">Themenübersicht</Link>
      </div>
    </section>
  );
}

function HitRow({ hit }: { hit: SearchHit }) {
  return (
    <Link to={hit.to} className="list-item search-hit">
      {hit.kind === 'experiment' ? <IconFlask aria-hidden="true" /> : hit.kind === 'explainer' ? <IconSparkle aria-hidden="true" /> : <IconBook aria-hidden="true" />}
      <span className="list-item-main">
        <span className="list-item-title">{hit.title}</span>
        <span className="list-item-meta">{hit.context}</span>
        {hit.kind !== 'topic' && <span className="search-snippet">{hit.snippet}</span>}
      </span>
      <IconArrowRight aria-hidden="true" />
    </Link>
  );
}

function SearchStart({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div className="stack">
      <div className="stack-s">
        <span className="field-label">Beliebte Suchen</span>
        <div className="row" style={{ gap: 6 }}>
          {SUGGEST.map((s) => (
            <button key={s} type="button" className="chip" onClick={() => onPick(s)}>{s}</button>
          ))}
        </div>
      </div>
      {EXPLAINERS.length > 0 && (
        <section className="section" aria-labelledby="sx-title">
          <h2 id="sx-title" className="search-group">Anschaulich erklärt</h2>
          <div className="list">
            {EXPLAINERS.map((e) => (
              <Link key={e.sub} to={`/erklaert/${e.sub}`} className="list-item">
                <IconSparkle aria-hidden="true" />
                <span className="list-item-main">
                  <span className="list-item-title">{e.title}</span>
                  <span className="list-item-meta">{e.scenes.length} animierte Bilder</span>
                </span>
                <IconArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}
      <p className="faint" style={{ fontSize: 'var(--fs-sm)', margin: 0 }}>
        Durchsucht werden {SUBTOPICS.length} Themen, alle Lernabschnitte, Fachbegriffe und Experimente.
      </p>
    </div>
  );
}
