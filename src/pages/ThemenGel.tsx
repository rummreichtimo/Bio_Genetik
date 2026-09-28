import { CHAPTERS, getSubtopic } from '../content';
import type { SubProgress } from '../learning/mastery';

/**
 * „Themen-Gel“: Jede Spur ist ein Kapitel, jede Bande ein Unterthema.
 * Die Leuchtkraft der Bande zeigt, wie sicher du das Unterthema beherrschst.
 * Die linke Spur ist der „Standard“ (= 100 %), wie ein Molekülmassenstandard im Gel.
 */
export function ThemenGel({ progress }: { progress: SubProgress[] }) {
  const byId = new Map(progress.map((p) => [p.sub, p]));
  const lanes = CHAPTERS.length + 1;
  const laneW = 34;
  const gap = 14;
  const padX = 14;
  const top = 26;
  const height = 176;
  const width = padX * 2 + lanes * laneW + (lanes - 1) * gap;
  const maxBands = Math.max(...CHAPTERS.map((c) => c.subtopics.length));
  const bandY = (i: number, n: number) => top + 16 + ((height - top - 40) * (i + 0.5)) / Math.max(n, maxBands);

  const summary = CHAPTERS.map((c) => {
    const vals = c.subtopics.map((s) => byId.get(s)?.progress ?? 0);
    const avg = vals.reduce((a, b) => a + b, 0) / (vals.length || 1);
    return `${c.title} ${Math.round(avg * 100)} %`;
  }).join(', ');

  return (
    <svg
      viewBox={`0 0 ${width} ${height + 22}`}
      width="100%"
      style={{ maxWidth: width * 1.6, display: 'block' }}
      role="img"
      aria-label={`Themen-Gel: ${summary}`}
    >
      <rect x="0" y="0" width={width} height={height} rx="12" fill="var(--gel-bg)" />
      {Array.from({ length: lanes }).map((_, li) => {
        const x = padX + li * (laneW + gap);
        const isStd = li === 0;
        const ch = isStd ? null : CHAPTERS[li - 1];
        const subs = ch ? ch.subtopics : Array.from({ length: maxBands }, (_, i) => `std-${i}`);
        return (
          <g key={li}>
            <rect x={x} y={10} width={laneW} height={10} rx="2" fill="var(--gel-lane)" />
            <rect x={x} y={20} width={laneW} height={height - 30} rx="3" fill="var(--gel-lane)" opacity="0.45" />
            {subs.map((sid, bi) => {
              const p = isStd ? 1 : byId.get(sid)?.progress ?? 0;
              const st = isStd ? undefined : byId.get(sid)?.status;
              const y = bandY(bi, subs.length);
              const weak = st === 'schwach';
              return (
                <g key={sid}>
                  <rect
                    x={x + 3}
                    y={y - 3.5}
                    width={laneW - 6}
                    height={7}
                    rx="3"
                    fill={weak ? 'var(--bad)' : 'var(--band)'}
                    opacity={isStd ? 0.9 : 0.1 + 0.9 * p}
                  />
                  {!isStd && (
                    <title>
                      {getSubtopic(sid)?.title ?? sid}: {Math.round(p * 100)} %
                    </title>
                  )}
                </g>
              );
            })}
            <text
              x={x + laneW / 2}
              y={height + 16}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--ink-3)"
              fontFamily="var(--font-body)"
            >
              {isStd ? 'Ziel' : li}
            </text>
          </g>
        );
      })}
      <text x={width - padX} y={height - 8} textAnchor="end" fontSize="9" fill="var(--ink-3)" fontFamily="var(--font-body)">
        ↓ Laufrichtung
      </text>
    </svg>
  );
}
