import type { SVGProps } from 'react';
import type { ChapterIcon } from '../content/types';

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...props,
});

export const IconHome = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V20h14V9.5" />
    <path d="M10 20v-6h4v6" />
  </svg>
);

export const IconSearch = (p: P) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
);

export const IconBook = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
    <path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20" />
    <path d="M8 7h8M8 10.5h6" />
  </svg>
);

export const IconCards = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="6" width="13" height="15" rx="2" />
    <path d="M8 3h11a2 2 0 0 1 2 2v12" />
  </svg>
);

export const IconQuiz = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="m8 12 2.5 2.5L16 9" />
  </svg>
);

export const IconPractice = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const IconExam = (p: P) => (
  <svg {...base(p)}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 3.5V5h6V3.5" />
    <path d="M8.5 10h7M8.5 13.5h7M8.5 17h4" />
  </svg>
);

export const IconPen = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z" />
    <path d="m13.5 6.5 4 4" />
  </svg>
);

export const IconTimer = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2.5M9.5 2h5" />
  </svg>
);

export const IconAlert = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 2.5 20h19z" />
    <path d="M12 10v4.5M12 17.5v.01" />
  </svg>
);

export const IconChart = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 20V4M4 20h16" />
    <path d="M8 16v-5M12 16V8M16 16v-3M20 16V6" />
  </svg>
);

export const IconProgress = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 17 9 11l4 4 8-8" />
    <path d="M15 7h6v6" />
  </svg>
);

export const IconSettings = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </svg>
);

export const IconBolt = (p: P) => (
  <svg {...base(p)}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
  </svg>
);

export const IconFlask = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" />
    <path d="M7 15h10" />
  </svg>
);

export const IconArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconArrowLeft = (p: P) => (
  <svg {...base(p)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const IconChevronRight = (p: P) => (
  <svg {...base(p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IconX = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconFlame = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 22c4 0 7-2.7 7-6.8 0-3.2-1.8-5.2-3.6-7.2-.5 2-1.5 3-2.9 3.5C13 7.5 11.5 4.8 9 2c.2 3.4-1.8 5.6-3.3 7.6C4.6 11 4 12.8 4 15c0 4.1 3.4 7 8 7z" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconRefresh = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4" />
    <path d="M4 13a8 8 0 0 0 14.3 4.9L20 16m0 4v-4h-4" />
  </svg>
);

export const IconTrash = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
);

export const IconCopy = (p: P) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </svg>
);

export const IconUpload = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
  </svg>
);

export const IconDownload = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4v12M7 11l5 5 5-5M4 20h16" />
  </svg>
);

export const IconSun = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const IconMoon = (p: P) => (
  <svg {...base(p)}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export const IconPlay = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 4.5v15l12-7.5z" />
  </svg>
);

export const IconSparkle = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />
  </svg>
);

export const IconTarget = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const IconEye = (p: P) => (
  <svg {...base(p)}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconShuffle = (p: P) => (
  <svg {...base(p)}>
    <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
  </svg>
);

export const IconList = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 6h11M9 12h11M9 18h11" />
    <circle cx="4.5" cy="6" r="1" fill="currentColor" />
    <circle cx="4.5" cy="12" r="1" fill="currentColor" />
    <circle cx="4.5" cy="18" r="1" fill="currentColor" />
  </svg>
);

export const IconInfo = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5M12 7.5v.01" />
  </svg>
);

export const IconGrip = (p: P) => (
  <svg {...base(p)}>
    <circle cx="9" cy="6" r="1" fill="currentColor" />
    <circle cx="15" cy="6" r="1" fill="currentColor" />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
    <circle cx="9" cy="18" r="1" fill="currentColor" />
    <circle cx="15" cy="18" r="1" fill="currentColor" />
  </svg>
);

export const IconArrowUp = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const IconArrowDown = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const IconFlip = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 9a8 8 0 0 1 14-3l2 2M20 4v4h-4" />
    <path d="M20 15a8 8 0 0 1-14 3l-2-2M4 20v-4h4" />
  </svg>
);

// ---------------------------------------------------------------------------
// Kapitel-Symbole
// ---------------------------------------------------------------------------

export const IconHelix = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 2c0 5 10 5 10 10S7 17 7 22" />
    <path d="M17 2c0 5-10 5-10 10s10 5 10 10" />
    <path d="M8.5 5h7M9 19h6M8.2 12h7.6" />
  </svg>
);

export const IconTube = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 2.5h6M10 2.5v15a2 2 0 0 0 4 0v-15" />
    <path d="M10 12h4" />
    <path d="M4 21h16" />
  </svg>
);

export const IconRibosome = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 11a7 5 0 0 1 14 0z" />
    <path d="M6.5 13.5h11a3 2.5 0 0 1-3 2.5h-5a3 2.5 0 0 1-3-2.5z" />
    <path d="M2 19h20" />
    <path d="M6 19v1.5M10 19v1.5M14 19v1.5M18 19v1.5" />
  </svg>
);

export const IconSwitch = (p: P) => (
  <svg {...base(p)}>
    <rect x="2.5" y="7" width="19" height="10" rx="5" />
    <circle cx="16.5" cy="12" r="3" fill="currentColor" />
  </svg>
);

export const IconScissors = (p: P) => (
  <svg {...base(p)}>
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M8.1 8.1 20 20M8.1 15.9 20 4M13 12h.01" />
  </svg>
);

export const IconPedigree = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <circle cx="18" cy="6" r="3" />
    <path d="M9 6h6M12 6v6M6 12h12M6 12v3M18 12v3" />
    <circle cx="6" cy="18" r="3" />
    <rect x="15" y="15" width="6" height="6" rx="1" />
  </svg>
);

export function ChapterGlyph({ icon, ...p }: { icon: ChapterIcon } & P) {
  switch (icon) {
    case 'helix':
      return <IconHelix {...p} />;
    case 'tube':
      return <IconTube {...p} />;
    case 'ribosome':
      return <IconRibosome {...p} />;
    case 'switch':
      return <IconSwitch {...p} />;
    case 'scissors':
      return <IconScissors {...p} />;
    case 'pedigree':
      return <IconPedigree {...p} />;
  }
}

/** Markenzeichen: vier Basenpaare als Sprossen einer Leiter (Farben wie in deiner PDF). */
export function BrandMark(p: P) {
  return (
    <svg viewBox="0 0 40 40" className="brand-mark" aria-hidden="true" focusable="false" {...p}>
      <rect x="1" y="1" width="38" height="38" rx="11" fill="var(--ink)" />
      <path d="M13 7c0 9 14 9 14 13s-14 4-14 13" stroke="var(--surface)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M27 7c0 9-14 9-14 13s14 4 14 13" stroke="var(--surface)" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.55" />
      <path d="M15.5 11.5h9" stroke="var(--base-a)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M17 16.5h6" stroke="var(--base-t)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M17 23.5h6" stroke="var(--base-g)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M15.5 28.5h9" stroke="var(--base-c)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
