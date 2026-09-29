import { getSubtopic, PDF_PAGES } from '../content';
import type { SubProgress } from '../learning/mastery';
import type { SelfRating } from '../progress/types';
import { Link } from '../app/router';
import { Bar, StatusChip } from './primitives';

/** Zeile „Unterthema · Status · Fortschritt“ – verlinkt auf die Themenseite. */
export function SubtopicRow({ p, detail }: { p: SubProgress; detail?: boolean }) {
  const sub = getSubtopic(p.sub)!;
  return (
    <Link to={`/thema/${p.sub}`} className="sub-row">
      <span className="sub-row-title">
        {sub.title}
        {detail && (
          <span className="sub-row-detail faint">
            {sub.bookNo ? `${sub.bookNo} · ` : ''}
            {pagesShort(sub.pages)}
          </span>
        )}
      </span>
      <StatusChip status={p.status} />
      <span className="sub-row-bar">
        <Bar value={p.progress} thin label={`Fortschritt ${sub.title}`} />
      </span>
      <span className="num faint sub-row-pct">{Math.round(p.progress * 100)} %</span>
    </Link>
  );
}

/** „PDF S. 2–5“, „PDF S. 25, 28“ – aufeinanderfolgende Seiten werden zusammengefasst. */
export function pagesShort(pages: number[]): string {
  const sorted = Array.from(new Set(pages)).sort((a, b) => a - b);
  const parts: string[] = [];
  for (let i = 0; i < sorted.length; i++) {
    let j = i;
    while (j + 1 < sorted.length && sorted[j + 1] === sorted[j] + 1) j++;
    parts.push(j > i + 1 ? `${sorted[i]}–${sorted[j]}` : j === i + 1 ? `${sorted[i]}, ${sorted[j]}` : `${sorted[i]}`);
    i = j;
  }
  return `PDF S. ${parts.join(', ')}`;
}

/** „PDF S. 28 (Buch S. 294–295) · PDF S. 25 (Buch S. 296–297)“ – in der Reihenfolge der Lektion. */
export function pagesLong(pages: number[]): string {
  return pages.map((pg) => `PDF S. ${pg} (${PDF_PAGES[pg]?.label ?? '–'})`).join(' · ');
}

export const SELF_META: Record<SelfRating, { icon: string; label: string; desc: string }> = {
  sicher: { icon: '🟢', label: 'sicher', desc: 'Ich kann das Thema erklären.' },
  unsicher: { icon: '🟡', label: 'unsicher', desc: 'Ich kenne es, bin aber nicht sattelfest.' },
  nicht: { icon: '🔴', label: 'noch nicht', desc: 'Das muss ich noch lernen.' },
};

/** Selbsteinschätzung 🟢 🟡 🔴 als Umschaltknöpfe. */
export function SelfRatingControl({ value, onChange, label }: { value?: SelfRating; onChange: (r: SelfRating) => void; label: string }) {
  return (
    <div className="self-rating" role="group" aria-label={label}>
      {(Object.keys(SELF_META) as SelfRating[]).map((r) => (
        <button
          key={r}
          type="button"
          className={`self-btn self-${r}`}
          aria-pressed={value === r}
          title={SELF_META[r].desc}
          onClick={() => onChange(r)}
        >
          <span aria-hidden="true">{SELF_META[r].icon}</span>
          {SELF_META[r].label}
        </button>
      ))}
    </div>
  );
}
