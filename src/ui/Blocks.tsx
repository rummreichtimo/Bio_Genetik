import type { Block } from '../content/types';
import { WidgetView } from '../widgets';
import { Inline, Markdown } from './Markdown';
import { ProvNote, SourceTag } from './Provenance';
import { ExperimentBlock } from './ExperimentBlock';

/** Darstellung eines Lernbausteins (außer Verständnis-Checks, die die Lektion selbst rendert). */
export function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'text':
      return (
        <div className={`block block-text ${block.prov === 'inf' ? 'block-inf' : ''}`}>
          <Markdown text={block.md} />
          {(block.src || block.prov === 'inf') && <SourceTag src={block.src} prov={block.prov ?? 'pdf'} />}
        </div>
      );
    case 'bullets':
      return (
        <div className="block block-bullets">
          {block.title && <h3 className="block-title">{block.title}</h3>}
          <ul className="prose-list">
            {block.items.map((it, i) => (
              <li key={i}><Inline text={it} /></li>
            ))}
          </ul>
          {(block.src || block.prov === 'inf') && <SourceTag src={block.src} prov={block.prov ?? 'pdf'} />}
        </div>
      );
    case 'term':
      return (
        <div className="block block-term">
          <span className="eyebrow">Fachbegriff</span>
          <strong className="block-term-name">{block.term}</strong>
          <Markdown text={block.def} />
          {block.simple && (
            <p className="term-simple">
              <span className="term-simple-label">Einfach erklärt:</span> {block.simple}
            </p>
          )}
          <SourceTag src={block.src} />
        </div>
      );
    case 'steps':
      return (
        <div className="block block-steps">
          {block.title && <h3 className="block-title">{block.title}</h3>}
          <ol className="steps">
            {block.steps.map((s, i) => (
              <li key={i} className="step">
                <span className="step-n num" aria-hidden="true">{i + 1}</span>
                <div className="step-body">
                  <strong className="step-title">{s.title}</strong>
                  <span><Inline text={s.text} /></span>
                </div>
              </li>
            ))}
          </ol>
          <SourceTag src={block.src} prov={block.prov ?? 'pdf'} />
        </div>
      );
    case 'compare':
      return (
        <div className="block block-compare">
          {block.title && <h3 className="block-title">{block.title}</h3>}
          <div className="scroll-x" tabIndex={0}>
            <table className="data-table compare-table">
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">Merkmal</span></th>
                  {block.columns.map((c) => <th key={c} scope="col">{c}</th>)}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row"><Inline text={r.label} /></th>
                    {r.cells.map((c, i) => <td key={i}><Inline text={c} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SourceTag src={block.src} prov={block.prov ?? 'pdf'} />
        </div>
      );
    case 'note':
      return (
        <ProvNote prov={block.tone} title={block.title} src={block.src} ext={block.ext}>
          <Markdown text={block.md} />
        </ProvNote>
      );
    case 'widget':
      return <WidgetView id={block.widget} caption={block.caption} />;
    case 'experiment':
      return <ExperimentBlock id={block.id} noWidget={block.noWidget} />;
    case 'check':
      return null;
  }
}
