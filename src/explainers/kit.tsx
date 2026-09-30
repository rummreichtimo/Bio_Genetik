import { useEffect, useState, type ReactNode } from 'react';
import type { Provenance, Src } from '../content/types';

/**
 * Bausteine für „Anschaulich erklärt“: Bildgeschichten aus animierten Szenen.
 * Jede Szene zeichnet ihr Bild abhängig vom Animationsfortschritt t (0 … 1).
 */

export interface Scene {
  id: string;
  title: string;
  /** Erklärtext (Markdown) – inhaltlich aus der PDF */
  text: string;
  src: Src[];
  prov: Provenance;
  /** kurzer Merksatz */
  merke?: string;
  /** Beschreibung des Bildes für Screenreader */
  alt: string;
  /** Dauer der Animation in ms */
  duration?: number;
  draw: (t: number) => ReactNode;
}

export interface Explainer {
  sub: string;
  title: string;
  lead: string;
  scenes: Scene[];
}

export const W = 640;
export const H = 320;

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
/** Teilfortschritt in einem Zeitfenster [a, b] von t, geglättet */
export const seg = (t: number, a: number, b: number) => ease(clamp((t - a) / (b - a)));

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

/** Spielt einen Fortschritt von 0 bis 1 ab, sobald sich `key` ändert. */
export function useProgressAnim(key: string, duration = 2600): number {
  const [t, setT] = useState(() => (prefersReducedMotion() ? 1 : 0));
  useEffect(() => {
    if (prefersReducedMotion()) {
      setT(1);
      return;
    }
    let raf = 0;
    const start = performance.now();
    setT(0);
    const tick = (now: number) => {
      const x = clamp((now - start) / duration);
      setT(x);
      if (x < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [key, duration]);
  return t;
}

// ---------------------------------------------------------------------------
// Basen
// ---------------------------------------------------------------------------

export type Base = 'A' | 'T' | 'G' | 'C' | 'U';
export const COMP: Record<string, Base> = { A: 'T', T: 'A', G: 'C', C: 'G', U: 'A' };
export const baseCls = (b: string) => `xb-${b.toLowerCase()}`;

/** Eine Base als farbiges Kästchen mit Buchstabe */
export function BaseBox({ x, y, b, size = 26, opacity = 1, mark }: { x: number; y: number; b: string; size?: number; opacity?: number; mark?: 'bad' | 'good' }) {
  return (
    <g opacity={opacity} transform={`translate(${x},${y})`}>
      <rect x={-size / 2} y={-size / 2} width={size} height={size} rx={5} className={`xbox ${baseCls(b)} ${mark ? `xbox-${mark}` : ''}`} />
      <text y={1} textAnchor="middle" dominantBaseline="central" className="xbox-t">{b}</text>
    </g>
  );
}

/** Beschriftung mit dezenter Hinterlegung (bleibt auf Linien lesbar) */
export function Label({ x, y, children, anchor = 'start', tone, size }: { x: number; y: number; children: ReactNode; anchor?: 'start' | 'middle' | 'end'; tone?: 'muted' | 'new' | 'old' | 'primer' | 'bad' | 'good'; size?: 's' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={`xl ${tone ? `xl-${tone}` : ''} ${size === 's' ? 'xl-s' : ''}`}>
      {children}
    </text>
  );
}

/** Pfeil von (x1,y1) nach (x2,y2) */
export function Arrow({ x1, y1, x2, y2, cls = 'xa' }: { x1: number; y1: number; x2: number; y2: number; cls?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const s = 9;
  const p1 = [x2 - s * Math.cos(a - 0.45), y2 - s * Math.sin(a - 0.45)];
  const p2 = [x2 - s * Math.cos(a + 0.45), y2 - s * Math.sin(a + 0.45)];
  return (
    <g className={cls}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <path d={`M${x2},${y2} L${p1[0]},${p1[1]} L${p2[0]},${p2[1]} Z`} />
    </g>
  );
}

/** Enzym als abgerundete Form mit Namen */
export function Enzyme({ x, y, w = 92, h = 34, name, kind, opacity = 1 }: { x: number; y: number; w?: number; h?: number; name: string; kind: 'pol' | 'helicase' | 'primase' | 'ligase' | 'repair'; opacity?: number }) {
  return (
    <g opacity={opacity} transform={`translate(${x},${y})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} className={`xe xe-${kind}`} />
      <text textAnchor="middle" dominantBaseline="central" y={1} className="xe-t">{name}</text>
    </g>
  );
}
