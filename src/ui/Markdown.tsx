import { Fragment, type ReactNode } from 'react';

/**
 * Sehr kleiner Text-Renderer für Lerninhalte:
 *  **fett** (Fachbegriffe werden hervorgehoben), *kursiv*, `Code` (Sequenzen farbig),
 *  Absätze (Leerzeile), Aufzählungen ("- " am Zeilenanfang), nummerierte Listen ("1. ").
 */

const SEQ_RE = /^[ACGTU\s'’\-–35·…./|]+$/;

export function Seq({ value, className }: { value: string; className?: string }) {
  return (
    <span className={`seq ${className ?? ''}`}>
      {Array.from(value).map((ch, i) =>
        'ACGTU'.includes(ch) ? (
          <span key={i} className={`b-${ch}`}>
            {ch}
          </span>
        ) : (
          <Fragment key={i}>{ch}</Fragment>
        ),
      )}
    </span>
  );
}

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\s][^*]*\*|_[^_\s][^_]*_)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const tok = m[0];
    const key = `${keyBase}-${i++}`;
    if (tok.startsWith('**')) {
      out.push(
        <strong key={key} className="term-hl">
          {tok.slice(2, -2)}
        </strong>,
      );
    } else if (tok.startsWith('`')) {
      const inner = tok.slice(1, -1);
      out.push(SEQ_RE.test(inner) ? <Seq key={key} value={inner} /> : <code key={key} className="mono">{inner}</code>);
    } else {
      out.push(<em key={key}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Inline({ text }: { text: string }) {
  return <>{inline(text, 'i')}</>;
}

export function Markdown({ text, className }: { text: string; className?: string }) {
  const blocks = text.trim().split(/\n\s*\n/);
  return (
    <div className={`prose ${className ?? ''}`}>
      {blocks.map((block, bi) => {
        const lines = block.split('\n');
        if (lines.every((l) => /^\s*-\s+/.test(l))) {
          return (
            <ul key={bi}>
              {lines.map((l, li) => (
                <li key={li}>{inline(l.replace(/^\s*-\s+/, ''), `${bi}-${li}`)}</li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => /^\s*\d+\.\s+/.test(l))) {
          return (
            <ol key={bi}>
              {lines.map((l, li) => (
                <li key={li}>{inline(l.replace(/^\s*\d+\.\s+/, ''), `${bi}-${li}`)}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={bi}>
            {lines.map((l, li) => (
              <Fragment key={li}>
                {li > 0 && <br />}
                {inline(l, `${bi}-${li}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
