import type { ReactNode } from 'react';

/** Nummernmarke in Abbildungen (für Beschriftungsaufgaben). */
export function Marker({ x, y, n, active, label, labelMode, dx = 16, anchor = 'start' }: {
  x: number;
  y: number;
  n: string;
  active?: boolean;
  label?: string;
  labelMode?: boolean;
  dx?: number;
  anchor?: 'start' | 'end' | 'middle';
}) {
  return (
    <g className={`mk ${active ? 'mk-active' : ''}`}>
      <circle cx={x} cy={y} r={11} className="mk-dot" />
      <text x={x} y={y + 0.5} className="mk-n" textAnchor="middle" dominantBaseline="central">
        {n}
      </text>
      {!labelMode && label && (
        <text x={x + (anchor === 'end' ? -dx : anchor === 'middle' ? 0 : dx)} y={anchor === 'middle' ? y + 24 : y + 0.5} className="mk-label" textAnchor={anchor} dominantBaseline="central">
          {label}
        </text>
      )}
    </g>
  );
}

/** Segmentierte Auswahl (z. B. Zyklus 0/1/2). */
export function Segmented<T extends string | number>({ label, value, options, onChange }: {
  label: string;
  value: T;
  options: { value: T; label: ReactNode }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="seg" role="radiogroup" aria-label={label}>
      <span className="seg-label">{label}</span>
      <span className="seg-opts">
        {options.map((o) => (
          <button key={String(o.value)} type="button" role="radio" aria-checked={o.value === value} className="seg-btn" onClick={() => onChange(o.value)}>
            {o.label}
          </button>
        ))}
      </span>
    </div>
  );
}

/** Kurzer Erklärtext unter einer Abbildung mit Herkunft. */
export function WidgetNote({ prov = 'pdf', children }: { prov?: 'pdf' | 'inf'; children: ReactNode }) {
  return (
    <p className={`widget-note widget-note-${prov}`}>
      <span aria-hidden="true">{prov === 'pdf' ? '📘' : '💡'}</span>
      <span className="sr-only">{prov === 'pdf' ? 'Aus deiner Quelle:' : 'Erklärung:'}</span> {children}
    </p>
  );
}
