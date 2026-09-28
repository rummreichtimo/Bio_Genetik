import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Level } from '../content/types';
import type { SubStatus } from '../learning/mastery';

export function ProgressRing({
  value,
  size = 120,
  stroke = 11,
  label,
  sub,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sub?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <svg className="ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${Math.round(v * 100)} Prozent`}>
      <circle className="ring-track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} fill="none" />
      <circle
        className="ring-value"
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - v)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text className="ring-label" x="50%" y={sub ? '47%' : '50%'} textAnchor="middle" dominantBaseline="middle" fontSize={size * 0.24}>
        {label ?? `${Math.round(v * 100)}%`}
      </text>
      {sub && (
        <text className="ring-sub" x="50%" y="66%" textAnchor="middle" dominantBaseline="middle" fontSize={size * 0.095}>
          {sub}
        </text>
      )}
    </svg>
  );
}

export function Bar({ value, tone, thin, label }: { value: number; tone?: 'good' | 'warn' | 'bad'; thin?: boolean; label?: string }) {
  const v = Math.max(0, Math.min(1, value));
  return (
    <div
      className={`bar ${tone ? `bar-${tone}` : ''} ${thin ? 'bar-thin' : ''}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
      aria-label={label}
    >
      <span style={{ width: `${v * 100}%` }} />
    </div>
  );
}

export const LEVEL_META: Record<Level, { icon: string; label: string; desc: string }> = {
  1: { icon: '🟢', label: 'Grundlagen', desc: 'Begriffe und grundlegende Fakten' },
  2: { icon: '🟡', label: 'Verständnis', desc: 'Zusammenhänge erklären' },
  3: { icon: '🟠', label: 'Anwendung', desc: 'Wissen auf neue Situationen anwenden' },
  4: { icon: '🔴', label: 'Klausurniveau', desc: 'Komplexe Aufgaben und Materialauswertung' },
  5: { icon: '⚫', label: 'Prüfungsmodus', desc: 'Anspruchsvolle Aufgaben ohne Hilfen' },
};

export function LevelBadge({ level }: { level: Level }) {
  const m = LEVEL_META[level];
  return (
    <span className="chip" title={m.desc}>
      <span aria-hidden="true">{m.icon}</span>
      {m.label}
    </span>
  );
}

const STATUS_CHIP: Record<SubStatus, { cls: string; label: string }> = {
  offen: { cls: '', label: 'Offen' },
  'in-arbeit': { cls: 'chip-accent', label: 'In Arbeit' },
  schwach: { cls: 'chip-bad', label: 'Wiederholen' },
  gelernt: { cls: 'chip-good', label: 'Gelernt' },
};

export function StatusChip({ status }: { status: SubStatus }) {
  const s = STATUS_CHIP[status];
  return <span className={`chip ${s.cls}`}>{s.label}</span>;
}

export function Stat({ value, label, note }: { value: ReactNode; label: string; note?: ReactNode }) {
  return (
    <div className="stat">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
      {note && <span className="stat-note">{note}</span>}
    </div>
  );
}

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="empty">
      <strong>{title}</strong>
      {children && <div className="muted">{children}</div>}
      {action}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dialog (Bestätigung ohne window.confirm – funktioniert auch in claude.ai)
// ---------------------------------------------------------------------------

export function Dialog({
  open,
  title,
  children,
  onClose,
  actions,
}: {
  open: boolean;
  title: string;
  children?: ReactNode;
  onClose: () => void;
  actions: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>('button, [href], input, select, textarea')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title" style={{ fontSize: 'var(--fs-xl)' }}>
          {title}
        </h2>
        {children}
        <div className="dialog-actions">{actions}</div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toasts
// ---------------------------------------------------------------------------

interface ToastApi {
  show(message: string): void;
}

const ToastContext = createContext<ToastApi>({ show: () => undefined });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<{ id: number; message: string }[]>([]);
  const show = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setItems((xs) => [...xs, { id, message }].slice(-3));
    window.setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), 3200);
  }, []);
  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="toast-wrap" aria-live="polite" role="status">
        {items.map((t) => (
          <div key={t.id} className="toast">
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

// ---------------------------------------------------------------------------
// Hilfsfunktionen
// ---------------------------------------------------------------------------

export function toneFor(value: number | null): 'good' | 'warn' | 'bad' | undefined {
  if (value === null) return undefined;
  if (value >= 0.75) return 'good';
  if (value >= 0.5) return 'warn';
  return 'bad';
}
