import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

export interface Datum {
  key: string;
  label: string;
  value: number | null;
  /** Anzeige im Tooltip/Tabelle */
  display: string;
  detail?: string;
}

interface ChartProps {
  title: string;
  data: Datum[];
  /** Achsenmaximum (sonst aus den Daten) */
  max?: number;
  ticks: { value: number; label: string }[];
  kind: 'bar' | 'line';
  unitLabel: string;
  empty?: ReactNode;
}

const H = 220;
const PAD = { l: 44, r: 12, t: 12, b: 28 };

/**
 * Einfaches, barrierearmes Diagramm mit einer Datenreihe:
 * Tooltip bei Hover und Tastaturfokus, Tabellenansicht als Alternative.
 */
export function Chart({ title, data, max, ticks, kind, unitLabel, empty }: ChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const [table, setTable] = useState(false);
  const id = useId();
  const plotRef = useRef<HTMLDivElement>(null);
  // Zeichenbreite = tatsächliche Breite, damit Beschriftungen auf jedem Gerät gleich groß bleiben
  const [W, setW] = useState(640);
  useEffect(() => {
    const el = plotRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([e]) => {
      const w = Math.round(e.contentRect.width);
      if (w > 0) setW(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [table]);
  const top = max ?? Math.max(1, ...data.map((d) => d.value ?? 0));
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;
  const step = iw / data.length;
  const x = (i: number) => PAD.l + step * i + step / 2;
  const y = (v: number) => PAD.t + ih - (Math.min(v, top) / top) * ih;
  const hasData = data.some((d) => (d.value ?? 0) > 0 || (kind === 'line' && d.value !== null));
  const labelEvery = Math.ceil(data.length / Math.max(2, Math.floor(iw / 64)));
  const barW = Math.max(4, Math.min(28, step - 6));
  const linePts = data.map((d, i) => (d.value === null ? null : ([x(i), y(d.value)] as const)));
  const segments: (readonly [number, number])[][] = [];
  let cur: (readonly [number, number])[] = [];
  for (const p of linePts) {
    if (p) cur.push(p);
    else if (cur.length) {
      segments.push(cur);
      cur = [];
    }
  }
  if (cur.length) segments.push(cur);
  const h = hover !== null ? data[hover] : null;

  return (
    <figure className="chart" aria-labelledby={`${id}-t`}>
      <div className="chart-head">
        <figcaption id={`${id}-t`} className="chart-title">{title}</figcaption>
        <button type="button" className="btn btn-ghost btn-small" aria-pressed={table} onClick={() => setTable((t) => !t)}>
          {table ? 'Diagramm' : 'Tabelle'}
        </button>
      </div>
      {!hasData && empty ? (
        <div className="chart-empty">{empty}</div>
      ) : table ? (
        <div className="scroll-x" tabIndex={0}>
          <table className="data-table">
            <thead><tr><th scope="col">Zeitraum</th><th scope="col">{unitLabel}</th></tr></thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.key}><th scope="row">{d.label}</th><td className="num">{d.display}{d.detail ? ` · ${d.detail}` : ''}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="chart-plot" ref={plotRef} onPointerLeave={() => setHover(null)}>
          <svg viewBox={`0 0 ${W} ${H}`} className="wsvg" role="img" aria-label={`${title}. Werte in der Tabellenansicht.`}>
            {ticks.map((t) => (
              <g key={t.value}>
                <line x1={PAD.l} x2={W - PAD.r} y1={y(t.value)} y2={y(t.value)} className="c-grid" />
                <text x={PAD.l - 6} y={y(t.value) + 4} className="c-tick" textAnchor="end">{t.label}</text>
              </g>
            ))}
            {data.map((d, i) =>
              (data.length - 1 - i) % labelEvery === 0 ? (
                <text key={d.key} x={x(i)} y={H - 8} className="c-tick" textAnchor="middle">{d.label}</text>
              ) : null,
            )}
            <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + ih} y2={PAD.t + ih} className="c-axis" />
            {kind === 'bar' &&
              data.map((d, i) => {
                const v = d.value ?? 0;
                if (v <= 0) return null;
                const top0 = y(v);
                const hgt = PAD.t + ih - top0;
                const r = Math.min(4, hgt, barW / 2);
                const x0 = x(i) - barW / 2;
                return (
                  <path
                    key={d.key}
                    className={`c-bar ${hover === i ? 'is-hover' : ''}`}
                    d={`M${x0},${PAD.t + ih} V${top0 + r} Q${x0},${top0} ${x0 + r},${top0} H${x0 + barW - r} Q${x0 + barW},${top0} ${x0 + barW},${top0 + r} V${PAD.t + ih} Z`}
                  />
                );
              })}
            {kind === 'line' && (
              <>
                {segments.map((seg, k) => (
                  <path key={k} className="c-line" d={seg.map((p, j) => `${j ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ')} />
                ))}
                {linePts.map((p, i) => (p ? <circle key={i} cx={p[0]} cy={p[1]} r={hover === i ? 6 : 4} className="c-dot" /> : null))}
              </>
            )}
            {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={PAD.t} y2={PAD.t + ih} className="c-cross" />}
            {data.map((d, i) => (
              <rect
                key={d.key}
                x={PAD.l + step * i}
                y={PAD.t}
                width={step}
                height={ih}
                className="c-hit"
                tabIndex={0}
                role="img"
                aria-label={`${d.label}: ${d.display}${d.detail ? `, ${d.detail}` : ''}`}
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
              />
            ))}
          </svg>
          {h && hover !== null && (
            <div
              className="chart-tip"
              style={{ left: x(hover), transform: x(hover) < 90 ? 'translateX(-12px)' : x(hover) > W - 90 ? 'translateX(calc(-100% + 12px))' : undefined }}
              aria-hidden="true"
            >
              <strong>{h.display}</strong>
              <span>{h.label}</span>
              {h.detail && <span className="faint">{h.detail}</span>}
            </div>
          )}
        </div>
      )}
    </figure>
  );
}
