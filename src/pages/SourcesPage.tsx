import { ISSUES, LESSONS, PDF_PAGES, SUBTOPICS, getSubtopic } from '../content';
import { externalUses } from '../content/audit';
import { Link } from '../app/router';
import { ExternalRef, PROV_META, ProvNote } from '../ui/Provenance';
import { Markdown } from '../ui/Markdown';

const PROV_EXPLAIN: Record<keyof typeof PROV_META, string> = {
  pdf: 'Steht so in deiner PDF. Die Seitenangabe zeigt, wo.',
  inf: 'Eine Erklärung oder Schlussfolgerung aus Inhalten deiner PDF – z. B. die Lösung einer Materialaufgabe oder eine vereinfachte Formulierung.',
  ext: 'Steht nicht in deiner PDF. Wird nur ergänzt, wenn es zum Verständnis oder für den Lehrplan nötig ist – immer mit Quellenangabe.',
  warn: 'Deine PDF widerspricht sich, enthält einen vermutlichen Druckfehler oder weicht von anderen Fachquellen ab. Die App löst das nicht stillschweigend auf.',
};

export function SourcesPage() {
  const ext = externalUses();
  const pages = Object.entries(PDF_PAGES).map(([n, info]) => {
    const pg = Number(n);
    return { pg, info, subs: SUBTOPICS.filter((s) => s.pages.includes(pg)) };
  });
  const lessonWarnings = LESSONS.flatMap((l) =>
    l.sections.flatMap((s) => s.blocks.filter((b) => b.kind === 'note' && b.tone === 'warn').map((b) => ({ sub: l.sub, section: s, block: b }))),
  );

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Transparenz</span>
        <h1>Hinweise zur Quelle</h1>
        <p className="lead">
          Deine PDF ist die Hauptquelle dieser App. Hier siehst du, wie Inhalte gekennzeichnet sind, wo deine PDF Unstimmigkeiten enthält und
          wo die App etwas ergänzt.
        </p>
      </header>

      <section className="section" aria-labelledby="legend-title">
        <h2 id="legend-title">So sind Inhalte gekennzeichnet</h2>
        <dl className="prov-legend-list">
          {(['pdf', 'inf', 'ext', 'warn'] as const).map((k) => (
            <div key={k} className={`prov prov-${PROV_META[k].cls}`}>
              <dt className="prov-head">
                <span aria-hidden="true">{PROV_META[k].icon}</span> {PROV_META[k].label}
              </dt>
              <dd className="prov-body">{PROV_EXPLAIN[k]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section" aria-labelledby="issues-title">
        <div className="section-head">
          <h2 id="issues-title">Unstimmigkeiten in deiner PDF</h2>
          <span className="faint num">{ISSUES.length}</span>
        </div>
        <p className="muted">Diese Stellen widersprechen sich innerhalb deiner PDF oder enthalten vermutlich einen Druckfehler. Prüfe sie im Original.</p>
        <div className="stack">
          {ISSUES.map((i) => (
            <ProvNote key={i.id} prov="warn" title={i.title} src={i.src}>
              <Markdown text={i.text} />
              <p className="issue-topics">
                Betrifft:{' '}
                {i.subs.map((s, n) => (
                  <span key={s}>
                    {n > 0 && ', '}
                    <Link to={`/thema/${s}`}>{getSubtopic(s)?.title}</Link>
                  </span>
                ))}
              </p>
            </ProvNote>
          ))}
        </div>
      </section>

      {lessonWarnings.length > 0 && (
        <section className="section" aria-labelledby="warn-title">
          <div className="section-head">
            <h2 id="warn-title">Weitere Hinweise im Lernmodus</h2>
            <span className="faint num">{lessonWarnings.length}</span>
          </div>
          <p className="muted">Stellen, an denen die App auf Besonderheiten aufmerksam macht – etwa Abweichungen von anderen Fachquellen oder Lücken zum Lehrplan.</p>
          <div className="list">
            {lessonWarnings.map(({ sub, section, block }) => (
              <Link key={`${sub}-${section.id}-${block.kind === 'note' ? block.title : ''}`} to={`/lernen/${sub}?abschnitt=${section.id}`} className="list-item">
                <span aria-hidden="true">⚠️</span>
                <span className="list-item-main">
                  <span className="list-item-title">{block.kind === 'note' ? block.title : section.title}</span>
                  <span className="list-item-meta">
                    {getSubtopic(sub)?.title} · {section.title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="ext-title">
        <div className="section-head">
          <h2 id="ext-title">Ergänzungen außerhalb deiner PDF</h2>
          <span className="faint num">{ext.length}</span>
        </div>
        <p className="muted">
          Alle Stellen mit 🌐. Sie sind in der App jeweils gekennzeichnet und mit Quelle versehen. Deine PDF hat bei Widersprüchen immer
          Vorrang.
        </p>
        <div className="list">
          {ext.map((e, i) => (
            <div key={i} className="list-item ext-item">
              <span aria-hidden="true">🌐</span>
              <span className="list-item-main">
                <span className="list-item-title">
                  <Link to={e.to}>{e.title.replace(/\*\*/g, '')}</Link>
                </span>
                <span className="list-item-meta">
                  {getSubtopic(e.sub)?.title} · {e.where}
                </span>
                <span style={{ fontSize: 'var(--fs-sm)' }}>
                  <ExternalRef ext={e.ext} />
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="pages-title">
        <h2 id="pages-title">Seiten deiner PDF</h2>
        <p className="muted">Deine PDF hat 29 Seiten: zwei Lehrplanseiten und 27 Doppelseiten aus dem Lehrbuch. So verteilen sie sich auf die Themen.</p>
        <div className="scroll-x">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">PDF-Seite</th>
                <th scope="col">Inhalt</th>
                <th scope="col">Thema in der App</th>
              </tr>
            </thead>
            <tbody>
              {pages.map(({ pg, info, subs }) => (
                <tr key={pg}>
                  <td className="num">
                    <strong>S. {pg}</strong>
                    <span className="faint data-table-sub">{info.label}</span>
                  </td>
                  <td>{info.topic}</td>
                  <td>
                    {subs.length ? (
                      subs.map((s, n) => (
                        <span key={s.id}>
                          {n > 0 && ', '}
                          <Link to={`/thema/${s.id}`}>{s.title}</Link>
                        </span>
                      ))
                    ) : pg === 1 || pg === 29 ? (
                      <Link to="/lehrplan">Lehrplan-Check</Link>
                    ) : pg === 17 ? (
                      <Link to="/klausur">Klausurtraining</Link>
                    ) : (
                      <span className="faint">–</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
