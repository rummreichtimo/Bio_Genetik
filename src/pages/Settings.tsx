import { useRef, useState } from 'react';
import { normalizeState } from '../progress/logic';
import { useProgress } from '../progress/store';
import type { ProgressState, ThemePref } from '../progress/types';
import { Link } from '../app/router';
import { useAi } from '../ai/useAi';
import { IconCopy, IconDownload, IconMoon, IconSun, IconTrash, IconUpload } from '../ui/icons';
import { Dialog, useToast } from '../ui/primitives';
import { ProvLegend } from '../ui/Provenance';

const THEMES: { id: ThemePref; label: string }[] = [
  { id: 'system', label: 'Wie Gerät' },
  { id: 'light', label: 'Hell' },
  { id: 'dark', label: 'Dunkel' },
];

export function Settings() {
  const { state, updateSettings, importState, reset, storage } = useProgress();
  const toast = useToast();
  const ai = useAi();
  const [exportText, setExportText] = useState<string | null>(null);
  const [importText, setImportText] = useState('');
  const [pendingImport, setPendingImport] = useState<ProgressState | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const s = state.settings;
  const inClaude = typeof window !== 'undefined' && !!window.claude;

  const doExport = () => setExportText(JSON.stringify(state, null, 1));

  const copyExport = async () => {
    if (!exportText) return;
    try {
      await navigator.clipboard.writeText(exportText);
      toast.show('Lernstand kopiert');
    } catch {
      const el = document.getElementById('export-text') as HTMLTextAreaElement | null;
      el?.select();
      toast.show('Text markiert – jetzt kopieren');
    }
  };

  const downloadExport = () => {
    if (!exportText) return;
    const blob = new Blob([exportText], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `genetik-lernstand-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  const parseImport = (text: string) => {
    setImportError(null);
    try {
      const parsed = normalizeState(JSON.parse(text));
      if (!parsed) throw new Error('format');
      setPendingImport(parsed);
    } catch {
      setImportError('Das ist kein gültiger Lernstand. Füge den Text aus „Exportieren“ vollständig ein.');
    }
  };

  const onFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => parseImport(String(reader.result ?? ''));
    reader.onerror = () => setImportError('Die Datei konnte nicht gelesen werden.');
    reader.readAsText(file);
  };

  return (
    <div className="page page-narrow">
      <header className="page-head">
        <span className="eyebrow">Einstellungen</span>
        <h1>Einstellungen</h1>
      </header>

      <section className="card" aria-labelledby="set-look">
        <h2 id="set-look" className="card-title">
          Darstellung
        </h2>
        <div className="tabs" role="radiogroup" aria-label="Farbschema">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              className="tab"
              role="radio"
              aria-checked={s.theme === t.id}
              aria-selected={s.theme === t.id}
              onClick={() => updateSettings({ theme: t.id })}
            >
              {t.id === 'light' && <IconSun width={16} height={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />}
              {t.id === 'dark' && <IconMoon width={16} height={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />}
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section className="card" aria-labelledby="set-goal">
        <h2 id="set-goal" className="card-title">
          Lernziel & Prüfung
        </h2>
        <div className="grid-2">
          <label className="field">
            <span className="field-label">Tägliches Lernziel (Minuten)</span>
            <input
              id="set-daily-goal"
              className="input"
              type="number"
              min={5}
              max={240}
              step={5}
              value={s.dailyGoalMin}
              onChange={(e) => updateSettings({ dailyGoalMin: Math.max(5, Math.min(240, Number(e.target.value) || 20)) })}
            />
          </label>
          <label className="field">
            <span className="field-label">Fragen pro Prüfung</span>
            <input
              id="set-exam-count"
              className="input"
              type="number"
              min={5}
              max={60}
              value={s.examCount}
              onChange={(e) => updateSettings({ examCount: Math.max(5, Math.min(60, Number(e.target.value) || 20)) })}
            />
          </label>
          <label className="field">
            <span className="field-label">Prüfungszeit (Minuten)</span>
            <input
              id="set-exam-minutes"
              className="input"
              type="number"
              min={5}
              max={180}
              step={5}
              value={s.examMinutes}
              onChange={(e) => updateSettings({ examMinutes: Math.max(5, Math.min(180, Number(e.target.value) || 30)) })}
            />
          </label>
          <label className="switch" style={{ alignSelf: 'end' }}>
            <input id="set-exam-timed" type="checkbox" checked={s.examTimed} onChange={(e) => updateSettings({ examTimed: e.target.checked })} />
            Prüfung mit Zeitlimit
          </label>
        </div>
      </section>

      <section className="card" aria-labelledby="set-ai">
        <h2 id="set-ai" className="card-title">
          KI-Bewertung von Freitexten
        </h2>
        <p className="muted">
          Standardmäßig bewertet die App deine Freitext-Antworten offline mit einem Bewertungsraster aus deiner PDF. Optional kann
          Claude eine Zweitbewertung abgeben – nur auf Knopfdruck und ausschließlich anhand des Bewertungsrasters und der Musterantwort aus
          deiner PDF. Die KI führt keine neuen Inhalte ein.
        </p>
        <label className="switch">
          <input
            id="set-ai-toggle"
            type="checkbox"
            checked={s.ai}
            disabled={ai.status === 'unavailable'}
            onChange={(e) => updateSettings({ ai: e.target.checked })}
          />
          KI-Bewertung verwenden, wenn verfügbar
        </label>
        <p className="faint" style={{ fontSize: 'var(--fs-sm)' }}>
          {ai.description}
        </p>
      </section>

      <section className="card" aria-labelledby="set-data">
        <h2 id="set-data" className="card-title">
          Lernstand sichern
        </h2>
        <p className="muted">
          {storage.kind === 'cloud'
            ? 'Dein Fortschritt wird privat in deinem claude.ai-Konto gespeichert und auf allen Geräten zusammengeführt.'
            : 'Dein Fortschritt wird im Browser dieses Geräts gespeichert (Local Storage). Mit Export und Import überträgst du ihn auf ein anderes Gerät.'}
        </p>
        <div className="row">
          <button type="button" className="btn btn-secondary" onClick={doExport}>
            <IconUpload /> Exportieren
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => fileRef.current?.click()}>
            <IconDownload /> Datei importieren
          </button>
          <input
            ref={fileRef}
            id="import-file"
            type="file"
            accept="application/json,.json,text/plain"
            hidden
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </div>
        {exportText && (
          <div className="stack-s">
            <label className="field-label" htmlFor="export-text">
              Dein Lernstand (JSON)
            </label>
            <textarea id="export-text" className="textarea mono" readOnly value={exportText} rows={6} style={{ fontSize: 'var(--fs-xs)' }} />
            <div className="row">
              <button type="button" className="btn btn-soft btn-small" onClick={copyExport}>
                <IconCopy /> Kopieren
              </button>
              {!inClaude && (
                <button type="button" className="btn btn-ghost btn-small" onClick={downloadExport}>
                  <IconDownload /> Als Datei speichern
                </button>
              )}
            </div>
          </div>
        )}
        <div className="field">
          <label className="field-label" htmlFor="import-text">
            Oder Lernstand einfügen
          </label>
          <textarea
            id="import-text"
            className="textarea mono"
            rows={3}
            value={importText}
            placeholder='{"v":1, …}'
            onChange={(e) => setImportText(e.target.value)}
            style={{ minHeight: 90, fontSize: 'var(--fs-xs)' }}
          />
          <div>
            <button type="button" className="btn btn-soft btn-small" disabled={!importText.trim()} onClick={() => parseImport(importText)}>
              Einfügen prüfen
            </button>
          </div>
          {importError && (
            <p role="alert" style={{ color: 'var(--bad)', fontWeight: 600 }}>
              {importError}
            </p>
          )}
        </div>
      </section>

      <section className="card" aria-labelledby="set-src">
        <h2 id="set-src" className="card-title">
          Quellen & Kennzeichnung
        </h2>
        <ProvLegend />
        <div className="row">
          <Link to="/lehrplan" className="btn btn-soft btn-small">
            Lehrplan-Check
          </Link>
          <Link to="/quellen" className="btn btn-ghost btn-small">
            Hinweise zur Quelle
          </Link>
        </div>
      </section>

      <section className="card" aria-labelledby="set-reset" style={{ borderColor: 'var(--bad)' }}>
        <h2 id="set-reset" className="card-title">
          Neu anfangen
        </h2>
        <p className="muted">Löscht Antworten, Karteikarten-Fortschritt, Fehler, Statistiken und Prüfungsergebnisse. Einstellungen bleiben erhalten.</p>
        <div>
          <button type="button" className="btn btn-secondary" style={{ color: 'var(--bad)' }} onClick={() => setConfirmReset(true)}>
            <IconTrash /> Lernstand zurücksetzen
          </button>
        </div>
      </section>

      <Dialog
        open={confirmReset}
        title="Lernstand wirklich zurücksetzen?"
        onClose={() => setConfirmReset(false)}
        actions={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setConfirmReset(false)}>
              Abbrechen
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                reset();
                setConfirmReset(false);
                toast.show('Lernstand zurückgesetzt');
              }}
            >
              Zurücksetzen
            </button>
          </>
        }
      >
        <p className="muted">Das kann nicht rückgängig gemacht werden. Exportiere deinen Lernstand vorher, wenn du ihn behalten möchtest.</p>
      </Dialog>

      <Dialog
        open={!!pendingImport}
        title="Lernstand importieren?"
        onClose={() => setPendingImport(null)}
        actions={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setPendingImport(null)}>
              Abbrechen
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (pendingImport) importState(pendingImport);
                setPendingImport(null);
                setImportText('');
                toast.show('Lernstand importiert');
              }}
            >
              Importieren
            </button>
          </>
        }
      >
        <p className="muted">
          Der importierte Lernstand ersetzt den aktuellen ({Object.keys(pendingImport?.q ?? {}).length} beantwortete Fragen,{' '}
          {Object.keys(pendingImport?.cards ?? {}).length} Karteikarten).
        </p>
      </Dialog>
    </div>
  );
}
