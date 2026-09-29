import { type ReactNode } from 'react';
import { ProgressProvider } from '../progress/store';
import { Dashboard } from '../pages/Dashboard';
import { Settings } from '../pages/Settings';
import { PracticeHub, ProgressHub } from '../pages/Hubs';
import { Topics } from '../pages/Topics';
import { Topic } from '../pages/Topic';
import { Glossary } from '../pages/Glossary';
import { Curriculum } from '../pages/Curriculum';
import { SourcesPage } from '../pages/SourcesPage';
import { ToastProvider } from '../ui/primitives';
import { Link, useRoute, type Route } from './router';
import { Shell } from './Shell';

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">In Arbeit</span>
        <h1>{title}</h1>
        <p className="lead">Dieser Bereich wird in einer der nächsten Entwicklungsphasen gebaut.</p>
      </header>
      <div>
        <Link to="/" className="btn btn-primary">
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="page page-narrow">
      <header className="page-head">
        <h1>Seite nicht gefunden</h1>
        <p className="lead">Diese Adresse gibt es in der Lernapp nicht.</p>
      </header>
      <div>
        <Link to="/" className="btn btn-primary">
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}

function resolve(route: Route): ReactNode {
  const [a, b] = route.parts;
  switch (a) {
    case undefined:
      return <Dashboard />;
    case 'themen':
      return <Topics />;
    case 'thema':
      return b ? <Topic key={b} id={b} /> : <Topics />;
    case 'lernen':
      return <ComingSoon title="Lernmodus" />;
    case 'glossar':
      return <Glossary key={route.query.sub ?? 'alle'} sub={route.query.sub} />;
    case 'karten':
      return <ComingSoon title="Karteikarten" />;
    case 'quiz':
      return <ComingSoon title="Quiz" />;
    case 'klausur':
      return <ComingSoon title="Klausurtraining" />;
    case 'pruefung':
      return <ComingSoon title="Prüfungsmodus" />;
    case 'schnell':
      return <ComingSoon title="5-Minuten-Modus" />;
    case 'fehler':
      return <ComingSoon title="Fehleranalyse" />;
    case 'statistik':
      return <ComingSoon title="Statistik" />;
    case 'experimente':
    case 'experiment':
      return <ComingSoon title="Experimente" />;
    case 'lehrplan':
      return <Curriculum />;
    case 'quellen':
      return <SourcesPage />;
    case 'ueben':
      return <PracticeHub />;
    case 'fortschritt':
      return <ProgressHub />;
    case 'einstellungen':
      return <Settings />;
    default:
      return <NotFound />;
  }
}

function Routes() {
  const route = useRoute();
  return <Shell>{resolve(route)}</Shell>;
}

export function App() {
  return (
    <ToastProvider>
      <ProgressProvider>
        <Routes />
      </ProgressProvider>
    </ToastProvider>
  );
}
