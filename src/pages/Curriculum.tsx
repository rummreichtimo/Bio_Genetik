import { CURRICULUM_ITEMS, getSubtopic } from '../content';
import type { CurriculumItem } from '../content/types';
import { subProgress } from '../learning/mastery';
import { useProgress } from '../progress/store';
import { Link } from '../app/router';
import { Bar } from '../ui/primitives';
import { SourceTag } from '../ui/Provenance';

export const CURRICULUM_STATUS: Record<CurriculumItem['status'], { icon: string; label: string; cls: string }> = {
  covered: { icon: '✅', label: 'in deiner PDF', cls: 'chip-good' },
  partial: { icon: '🟡', label: 'teilweise', cls: 'chip-warn' },
  missing: { icon: '❌', label: 'fehlt in deiner PDF', cls: 'chip-bad' },
};

export function Curriculum() {
  const { state } = useProgress();
  const areas = Array.from(new Set(CURRICULUM_ITEMS.map((c) => c.area)));
  const n = (s: CurriculumItem['status']) => CURRICULUM_ITEMS.filter((c) => c.status === s).length;
  const total = CURRICULUM_ITEMS.length;

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Lehrplan-Check</span>
        <h1>Was deine PDF abdeckt</h1>
        <p className="lead">
          Deine PDF enthält auf S. 1 und S. 29 die Kompetenzerwartungen des Lehrplans (Inhaltsbereich QP 2). Hier siehst du, welche davon die
          Buchseiten deiner PDF behandeln – und wo sie Lücken haben. Die Lehrplantexte sind wörtlich übernommen; die Einstufung ist eine
          Einschätzung der App.
        </p>
      </header>

      <section className="card stack" aria-label="Zusammenfassung">
        <div className="curr-summary">
          {(['covered', 'partial', 'missing'] as const).map((s) => (
            <div key={s} className="curr-summary-item">
              <span className="num curr-summary-n">{n(s)}</span>
              <span className={`chip ${CURRICULUM_STATUS[s].cls}`}>
                <span aria-hidden="true">{CURRICULUM_STATUS[s].icon}</span> {CURRICULUM_STATUS[s].label}
              </span>
            </div>
          ))}
        </div>
        <div className="curr-bar" role="img" aria-label={`${n('covered')} von ${total} Kompetenzen abgedeckt, ${n('partial')} teilweise, ${n('missing')} fehlen`}>
          <span className="curr-bar-good" style={{ flexGrow: n('covered') }} />
          <span className="curr-bar-warn" style={{ flexGrow: n('partial') }} />
          <span className="curr-bar-bad" style={{ flexGrow: n('missing') }} />
        </div>
        <p className="muted" style={{ fontSize: 'var(--fs-sm)' }}>
          Für fehlende Kompetenzen erfindet die App keine Inhalte. Nutze dafür dein Schulbuch oder dein Unterrichtsmaterial – oder ergänze deine
          PDF.
        </p>
      </section>

      {areas.map((area) => (
        <section key={area} className="section" aria-labelledby={`area-${area.slice(0, 3)}`}>
          <h2 id={`area-${area.slice(0, 3)}`} className="curr-area">
            <span className="curr-area-no num">{area.slice(0, 3)}</span>
            <span>{area.slice(4)}</span>
          </h2>
          <div className="stack">
            {CURRICULUM_ITEMS.filter((c) => c.area === area).map((c) => (
              <article key={c.id} className={`card curr-item curr-${c.status}`}>
                <div>
                  <span className={`chip ${CURRICULUM_STATUS[c.status].cls}`}>
                    <span aria-hidden="true">{CURRICULUM_STATUS[c.status].icon}</span> {CURRICULUM_STATUS[c.status].label}
                  </span>
                </div>
                <p className="curr-text">Die Lernenden {c.text}.</p>
                {c.note && <p className="muted curr-note">{c.note}</p>}
                {c.subs.length > 0 && (
                  <div className="stack-s">
                    {c.subs.map((sid) => {
                      const sub = getSubtopic(sid)!;
                      const p = subProgress(state, sid);
                      return (
                        <Link key={sid} to={`/thema/${sid}`} className="curr-sub">
                          <span className="curr-sub-title">{sub.title}</span>
                          <span className="curr-sub-bar">
                            <Bar value={p.progress} thin label={`Fortschritt ${sub.title}`} />
                          </span>
                          <span className="num faint">{Math.round(p.progress * 100)} %</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
                <div>
                  <SourceTag src={c.src} />
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
