import type { MaterialBlock } from '../content/types';
import { WidgetView } from '../widgets';
import { Markdown, Seq } from './Markdown';

/** Material zu Fragen und Klausuraufgaben: Text, Tabelle, Sequenz oder interaktive Abbildung. */
export function MaterialView({ blocks }: { blocks: MaterialBlock[] }) {
  return (
    <div className="material stack">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case 'text':
            return <Markdown key={i} text={b.md} />;
          case 'seq':
            return (
              <figure key={i} className="material-seq">
                {b.label && <figcaption className="field-label">{b.label}</figcaption>}
                <div className="scroll-x" tabIndex={0}>
                  <Seq value={b.value} className="seq-lg" />
                </div>
                {b.caption && <figcaption className="faint">{b.caption}</figcaption>}
              </figure>
            );
          case 'table':
            return (
              <figure key={i} className="material-table">
                <div className="scroll-x" tabIndex={0}>
                  <table className="data-table">
                    <thead>
                      <tr>{b.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {b.rows.map((r, ri) => (
                        <tr key={ri}>{r.map((c, ci) => (ci === 0 ? <th key={ci} scope="row">{c}</th> : <td key={ci} className="num">{c}</td>))}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {b.caption && <figcaption className="faint">{b.caption}</figcaption>}
              </figure>
            );
          case 'widget':
            return <WidgetView key={i} id={b.widget} caption={b.caption} />;
        }
      })}
    </div>
  );
}
