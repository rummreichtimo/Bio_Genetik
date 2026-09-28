import { useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

/**
 * Minimaler Router. Der aktuelle Pfad liegt im Speicher und wird – wenn möglich –
 * im URL-Hash gespiegelt (#/thema/pcr). So funktionieren Zurück-Taste und Lesezeichen,
 * und die App läuft trotzdem auch dort, wo der Hash nicht verändert werden darf.
 */
type Listener = () => void;

function readHash(): string {
  try {
    const h = window.location.hash.replace(/^#/, '');
    return h.startsWith('/') ? decodeURI(h) : '/';
  } catch {
    return '/';
  }
}

let current = typeof window !== 'undefined' ? readHash() : '/';
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    const next = readHash();
    if (next !== current) {
      current = next;
      emit();
      afterNavigate();
    }
  });
}

function afterNavigate() {
  window.requestAnimationFrame(() => {
    window.scrollTo({ top: 0 });
    const h1 = document.querySelector<HTMLElement>('main h1');
    if (h1) {
      h1.setAttribute('tabindex', '-1');
      h1.focus({ preventScroll: true });
    }
  });
}

export function navigate(path: string, opts: { replace?: boolean } = {}) {
  if (path === current) {
    afterNavigate();
    return;
  }
  current = path;
  try {
    const url = `#${encodeURI(path)}`;
    if (opts.replace) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
  } catch {
    /* Hash nicht änderbar – Navigation bleibt im Speicher */
  }
  emit();
  afterNavigate();
}

export interface Route {
  /** Pfad ohne Parameter, z. B. "/quiz" */
  path: string;
  parts: string[];
  query: Record<string, string>;
  /** vollständiger Pfad inkl. Parameter */
  full: string;
}

export function parseRoute(full: string): Route {
  const [path, qs = ''] = full.split('?');
  const query: Record<string, string> = {};
  for (const pair of qs.split('&')) {
    if (!pair) continue;
    const [k, v = ''] = pair.split('=');
    query[decodeURIComponent(k)] = decodeURIComponent(v);
  }
  return { path: path || '/', parts: (path || '/').split('/').filter(Boolean), query, full };
}

export function useRoute(): Route {
  const full = useSyncExternalStore(subscribe, () => current, () => '/');
  return parseRoute(full);
}

export function goBack(fallback = '/') {
  try {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
  } catch {
    /* ignorieren */
  }
  navigate(fallback);
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  children: ReactNode;
}

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={`#${to}`} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

export function isActive(path: string, prefix: string): boolean {
  if (prefix === '/') return path === '/';
  return path === prefix || path.startsWith(prefix + '/');
}
