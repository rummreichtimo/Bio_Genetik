import type { ReactNode } from 'react';
import { cardQueueInfo } from '../learning/stats';
import { useProgress } from '../progress/store';
import {
  BrandMark,
  IconAlert,
  IconBolt,
  IconBook,
  IconCards,
  IconChart,
  IconExam,
  IconFlask,
  IconHome,
  IconList,
  IconPen,
  IconPractice,
  IconProgress,
  IconQuiz,
  IconSettings,
} from '../ui/icons';
import { Link, isActive, useRoute } from './router';

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
  count?: number;
  also?: string[];
}

function NavLink({ item, path }: { item: NavItem; path: string }) {
  const active = isActive(path, item.to) || (item.also ?? []).some((a) => isActive(path, a));
  return (
    <Link to={item.to} className="nav-link" aria-current={active ? 'page' : undefined}>
      {item.icon}
      <span>{item.label}</span>
      {item.count ? (
        <span className="nav-count" aria-label={`${item.count} fällig`}>
          {item.count}
        </span>
      ) : null}
    </Link>
  );
}

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Genetik-Lernlabor, Startseite">
      <BrandMark />
      <span className="brand-name">
        Genetik-Lernlabor
        <span className="brand-sub">nach deiner PDF</span>
      </span>
    </Link>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const { path } = useRoute();
  const { state, storage } = useProgress();
  const due = cardQueueInfo(state).due;

  const learn: NavItem[] = [
    { to: '/', label: 'Start', icon: <IconHome /> },
    { to: '/lernpfad', label: 'Lernpfad', icon: <IconBook />, also: ['/lernen'] },
    { to: '/themen', label: 'Themen', icon: <IconList />, also: ['/thema', '/glossar'] },
    { to: '/karten', label: 'Karteikarten', icon: <IconCards />, count: due },
    { to: '/experimente', label: 'Experimente', icon: <IconFlask />, also: ['/experiment'] },
  ];
  const practice: NavItem[] = [
    { to: '/quiz', label: 'Quiz', icon: <IconQuiz /> },
    { to: '/klausur', label: 'Klausurtraining', icon: <IconPen /> },
    { to: '/pruefung', label: 'Prüfung', icon: <IconExam /> },
    { to: '/schnell', label: '5 Minuten', icon: <IconBolt /> },
  ];
  const review: NavItem[] = [
    { to: '/fehler', label: 'Fehler', icon: <IconAlert /> },
    { to: '/statistik', label: 'Statistik', icon: <IconChart /> },
  ];

  const bottom: NavItem[] = [
    { to: '/', label: 'Start', icon: <IconHome /> },
    { to: '/lernpfad', label: 'Lernen', icon: <IconBook />, also: ['/themen', '/thema', '/lernen', '/glossar', '/experimente', '/experiment'] },
    { to: '/karten', label: 'Karten', icon: <IconCards />, count: due },
    { to: '/ueben', label: 'Üben', icon: <IconPractice />, also: ['/quiz', '/klausur', '/pruefung', '/schnell'] },
    { to: '/fortschritt', label: 'Fortschritt', icon: <IconProgress />, also: ['/fehler', '/statistik', '/lehrplan'] },
  ];

  return (
    <div className="app">
      <a className="skip-link" href="#main" onClick={(e) => {
        e.preventDefault();
        document.getElementById('main')?.focus();
      }}>
        Zum Inhalt springen
      </a>
      <aside className="sidebar" aria-label="Hauptnavigation">
        <Brand />
        <nav className="nav-group" aria-label="Lernen">
          <span className="nav-group-label">Lernen</span>
          {learn.map((i) => (
            <NavLink key={i.to} item={i} path={path} />
          ))}
        </nav>
        <nav className="nav-group" aria-label="Üben">
          <span className="nav-group-label">Üben</span>
          {practice.map((i) => (
            <NavLink key={i.to} item={i} path={path} />
          ))}
        </nav>
        <nav className="nav-group" aria-label="Auswerten">
          <span className="nav-group-label">Auswerten</span>
          {review.map((i) => (
            <NavLink key={i.to} item={i} path={path} />
          ))}
          <NavLink item={{ to: '/einstellungen', label: 'Einstellungen', icon: <IconSettings /> }} path={path} />
        </nav>
        <div className="sidebar-foot">
          <span>
            {storage.kind === 'cloud'
              ? 'Fortschritt wird in deinem claude.ai-Konto gespeichert.'
              : storage.localOk
                ? 'Fortschritt wird auf diesem Gerät gespeichert.'
                : 'Speichern nicht möglich (privates Fenster?). Nutze Export in den Einstellungen.'}
          </span>
        </div>
      </aside>

      <div className="app-body" style={{ minWidth: 0 }}>
        <header className="topbar">
          <Brand />
          <div className="topbar-actions">
            <Link to="/einstellungen" className="icon-btn" aria-label="Einstellungen">
              <IconSettings />
            </Link>
          </div>
        </header>
        <main id="main" className="main" tabIndex={-1}>
          {children}
        </main>
      </div>

      <nav className="bottomnav" aria-label="Hauptnavigation">
        {bottom.map((i) => {
          const active = isActive(path, i.to) || (i.also ?? []).some((a) => isActive(path, a));
          return (
            <Link key={i.to} to={i.to} aria-current={active ? 'page' : undefined}>
              {i.icon}
              <span>{i.label}</span>
              {i.count ? <span className="dot">{i.count > 99 ? '99+' : i.count}</span> : null}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
