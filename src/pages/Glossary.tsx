import { useId, useMemo, useState } from 'react';
import { CHAPTERS, TERMS, chapterOf, getSubtopic } from '../content';
import type { Term } from '../content/types';
import { normalizeText } from '../learning/text';
import { Link, navigate } from '../app/router';
import { IconX } from '../ui/icons';
import { EmptyState } from '../ui/primitives';
import { ExternalRef, SourceTag } from '../ui/Provenance';
import { Markdown } from '../ui/Markdown';

const LETTER_MAP: Record<string, string> = { Ä: 'A', Ö: 'O', Ü: 'U' };

function letterOf(t: Term): string {
  const c = t.term.trim().charAt(0).toUpperCase();
  const l = LETTER_MAP[c] ?? c;
  return /[A-Z]/.test(l) ? l : '#';
}

/** Sortierschlüssel: griechische Buchstaben und Zeichen am Anfang ignorieren („β-Thalassämie“ → „Thalassämie“). */
function sortKey(t: Term): string {
  return t.term.replace(/^[^A-Za-zÄÖÜäöü0-9]+/, '').replace(/^[αβγ]-?/i, '');
}

export function Glossary({ sub }: { sub?: string }) {
  const [query, setQuery] = useState('');
  const [chapter, setChapter] = useState<string>('alle');
  const searchId = useId();
  const chapterId = useId();
  const onlySub = sub ? getSubtopic(sub) : undefined;

  const list = useMemo(() => {
    const q = normalizeText(query);
    return TERMS.filter((t) => {
      if (onlySub && t.sub !== onlySub.id) return false;
      if (!onlySub && chapter !== 'alle' && chapterOf(t.sub)?.id !== chapter) return false;
      if (!q) return true;
      return normalizeText(`${t.term} ${t.def} ${t.simple ?? ''}`).includes(q);
    }).sort((a, b) => sortKey(a).localeCompare(sortKey(b), 'de'));
  }, [query, chapter, onlySub]);

  const groups = useMemo(() => {
    const map = new Map<string, Term[]>();
    for (const t of list) {
      const l = letterOf({ ...t, term: sortKey(t) });
      map.set(l, [...(map.get(l) ?? []), t]);
    }
    return [...map.entries()];
  }, [list]);

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Glossar</span>
        <h1>Fachbegriffe</h1>
        <p className="lead">
          {TERMS.length} Begriffe aus deiner PDF – jeweils mit Definition, einfacher Erklärung und Seitenangabe. Aus jedem Begriff entsteht
          automatisch eine Karteikarte.
        </p>
      </header>

      <div className="glossary-tools">
        <div className="field">
          <label htmlFor={searchId} className="field-label">
            Begriff suchen
          </label>
          <input
            id={searchId}
            className="input"
            type="search"
            value={query}
            placeholder="z. B. Okazaki, Promotor, Konduktorin"
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
        {!onlySub && (
          <div className="field">
            <label htmlFor={chapterId} className="field-label">
              Kapitel
            </label>
            <select id={chapterId} className="select" value={chapter} onChange={(e) => setChapter(e.target.value)}>
              <option value="alle">Alle Kapitel</option>
              {CHAPTERS.map((c, i) => (
                <option key={c.id} value={c.id}>
                  {i + 1} · {c.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {onlySub && (
        <div className="row">
          <span className="chip chip-accent">Thema: {onlySub.title}</span>
          <button type="button" className="btn btn-ghost btn-small" onClick={() => navigate('/glossar', { replace: true })}>
            <IconX /> Alle Themen zeigen
          </button>
        </div>
      )}

      <p className="faint" role="status" style={{ fontSize: 'var(--fs-sm)' }}>
        {list.length === TERMS.length ? `${list.length} Begriffe` : `${list.length} von ${TERMS.length} Begriffen`}
      </p>

      {list.length === 0 && (
        <EmptyState title="Kein Begriff gefunden">Versuche es mit einem kürzeren Suchwort oder wähle „Alle Kapitel“.</EmptyState>
      )}

      {groups.length > 1 && (
        <nav className="letter-nav" aria-label="Nach Anfangsbuchstaben springen">
          {groups.map(([l]) => (
            <button
              key={l}
              type="button"
              className="letter-btn"
              aria-label={l === '#' ? 'Sonstige' : `Buchstabe ${l}`}
              onClick={() => {
                const el = document.getElementById(`glossar-${l}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                el?.focus({ preventScroll: true });
              }}
            >
              {l}
            </button>
          ))}
        </nav>
      )}

      {groups.map(([letter, terms]) => (
        <section key={letter} aria-labelledby={`glossar-${letter}`} className="stack-s">
          <h2 id={`glossar-${letter}`} className="letter-head" tabIndex={-1}>
            {letter}
          </h2>
          <dl className="term-list">
            {terms.map((t) => (
              <div key={t.id} className="term-item" id={`begriff-${t.id}`}>
                <dt>
                  <span className="term-name">{t.term}</span>
                  <SourceTag src={t.src} prov={t.prov ?? 'pdf'} />
                </dt>
                <dd>
                  <Markdown text={t.def} />
                  {t.simple && (
                    <p className="term-simple">
                      <span className="term-simple-label">Einfach erklärt:</span> {t.simple}
                    </p>
                  )}
                  {t.prov === 'ext' && t.ext && (
                    <p className="faint" style={{ fontSize: 'var(--fs-xs)' }}>
                      🌐 Nicht aus deiner Quelle. <ExternalRef ext={t.ext} />
                    </p>
                  )}
                  <p className="term-topic">
                    <Link to={`/thema/${t.sub}`}>{getSubtopic(t.sub)?.title}</Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
