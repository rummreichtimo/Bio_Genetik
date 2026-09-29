import type { ReactNode } from 'react';
import { formatSrc, formatSrcList } from '../content/sources';
import type { ExternalSource, Explanation, Provenance, Src } from '../content/types';
import { Markdown } from './Markdown';

export const PROV_META: Record<Provenance | 'warn', { icon: string; label: string; cls: string }> = {
  pdf: { icon: '📘', label: 'Aus deiner Quelle', cls: 'pdf' },
  inf: { icon: '💡', label: 'Erklärung / Schlussfolgerung', cls: 'inf' },
  ext: { icon: '🌐', label: 'Externe Zusatzinformation', cls: 'ext' },
  warn: { icon: '⚠️', label: 'Hinweis zur Quelle', cls: 'warn' },
};

/** Kleines Etikett „📘 PDF S. 5 · Buch S. 238–239“ */
export function SourceTag({ src, prov = 'pdf' }: { src?: Src[]; prov?: Provenance | 'warn' }) {
  const meta = PROV_META[prov];
  const text = src && src.length ? (src.length === 1 ? formatSrc(src[0]) : formatSrcList(src)) : meta.label;
  return (
    <span className={`src-tag ${prov === 'pdf' ? '' : meta.cls}`} title={meta.label}>
      <span aria-hidden="true">{meta.icon}</span>
      <span className="sr-only">{meta.label}: </span>
      {text}
    </span>
  );
}

export function ExternalRef({ ext }: { ext: ExternalSource }) {
  return (
    <span className="faint">
      Quelle:{' '}
      {ext.url ? (
        <a href={ext.url} target="_blank" rel="noreferrer">
          {ext.label}
        </a>
      ) : (
        ext.label
      )}
    </span>
  );
}

interface ProvNoteProps {
  prov: Provenance | 'warn';
  title?: string;
  src?: Src[];
  ext?: ExternalSource;
  children: ReactNode;
}

/** Hinweisbox mit Herkunftskennzeichnung. */
export function ProvNote({ prov, title, src, ext, children }: ProvNoteProps) {
  const meta = PROV_META[prov];
  return (
    <div className={`prov prov-${meta.cls}`} role="note">
      <div className="prov-head">
        <span aria-hidden="true">{meta.icon}</span>
        <span>{title ?? meta.label}</span>
        {src && src.length > 0 && <span className="faint">· {src.length === 1 ? formatSrc(src[0]) : formatSrcList(src)}</span>}
      </div>
      <div className="prov-body">{children}</div>
      {prov === 'ext' && (
        <div className="faint" style={{ fontSize: 'var(--fs-xs)' }}>
          Diese Information stammt nicht aus deiner bereitgestellten Quelle.{ext ? ' ' : ''}
          {ext && <ExternalRef ext={ext} />}
        </div>
      )}
      {prov !== 'ext' && ext && (
        <div className="faint" style={{ fontSize: 'var(--fs-xs)' }}>
          🌐 Enthält eine Angabe, die nicht aus deiner Quelle stammt. <ExternalRef ext={ext} />
        </div>
      )}
    </div>
  );
}

/** Eine Liste von Erklärungsbausteinen (z. B. „Warum?“), jeweils mit eigener Herkunft. */
export function ExplanationList({ items }: { items: Explanation[] }) {
  return (
    <div className="stack">
      {items.map((e, i) => (
        <ProvNote key={i} prov={e.prov} src={e.src} ext={e.ext}>
          <Markdown text={e.text} />
        </ProvNote>
      ))}
    </div>
  );
}

export function ProvLegend() {
  return (
    <div className="row" style={{ gap: '8px 16px', fontSize: 'var(--fs-sm)' }}>
      {(['pdf', 'inf', 'ext', 'warn'] as const).map((k) => (
        <span key={k} className="row" style={{ gap: 6 }}>
          <span aria-hidden="true">{PROV_META[k].icon}</span>
          <span className="muted">{PROV_META[k].label}</span>
        </span>
      ))}
    </div>
  );
}
