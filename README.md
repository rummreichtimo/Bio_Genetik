# Genetik-Lernlabor

Interaktive Lernapp für Biologie (Genetik, Oberstufe) – aufgebaut ausschließlich auf der PDF „Bio_Genetik“
(29 Seiten: Lehrplan QP 2 und Lehrbuchseiten 232–311). Die vollständige Inhaltsanalyse steht in
[`docs/ANALYSE.md`](docs/ANALYSE.md).

## Was die App kann

| Bereich | Inhalt |
|---|---|
| **Dashboard** | Gesamtfortschritt, Lernserie, Lernzeit, Trefferquote, fällige Karten, Prüfungsstand, Tagesplan („Heute für dich“), Themen-Gel |
| **Themen** | 6 Kapitel, 18 Unterthemen mit Fortschritt, Selbsteinschätzung 🟢/🟡/🔴, Fachbegriffe, Lehrplanbezug |
| **Lernmodus** | 88 kurze Abschnitte mit Prozessschritten, Vergleichstabellen, Fachbegriffen („Einfach erklärt“), 17 interaktiven Abbildungen und Verständnischecks |
| **Karteikarten** | 308 Karten in 7 Typen, Leitner-System (Gewusst / Unsicher / Nicht gewusst), schwierige Karten kommen öfter |
| **Quiz** | 328 Fragen, 9 Fragetypen, 5 Schwierigkeitsstufen, adaptive Auswahl, „Warum?“-Erklärungen |
| **Freitext** | Offline-Bewertung mit Raster (✅/🟡/❌), was richtig war, was fehlt, Fehlvorstellungen, Musterantwort; optional KI-Zweitbewertung |
| **Experimente** | 19 Versuche Schritt für Schritt (Fragestellung → Methode) mit eigenen Vermutungen |
| **Klausurtraining** | 13 Materialaufgaben nach den Aufgaben der PDF (keine neuen Originalaufgaben) |
| **Prüfungsmodus** | gemischte Themen, optionaler Timer, keine Hilfen, Auswertung erst am Ende |
| **Fehleranalyse** | Fehlermuster „Thema → Fehlerart“ (z. B. „Replikation → Enzyme verwechselt“) mit gezielten Wiederholungsfragen |
| **5 Minuten** | Begriffe, Karten und kurzes Abschlussquiz zum wichtigsten Thema |
| **Statistik** | Lernzeit und Trefferquote pro Tag (mit Tabellenansicht), stärkste/schwächste Themen, Kartenfächer, Prüfungen |
| **Transparenz** | Lehrplan-Check (was die PDF abdeckt und was fehlt) und „Hinweise zur Quelle“ |

### Umgang mit der Quelle

Jeder Inhalt ist gekennzeichnet:

- 📘 **Aus deiner Quelle** – mit Seitenangabe („PDF S. 5 · Buch S. 238–239“)
- 💡 **Erklärung/Schlussfolgerung** – z. B. Lösungen der Materialaufgaben
- 🌐 **Externe Zusatzinformation** – nur wo nötig, immer mit Quelle
- ⚠️ **Hinweis zur Quelle** – Widersprüche oder vermutliche Druckfehler in der PDF werden angezeigt, nicht stillschweigend aufgelöst (5 Stellen, siehe Seite „Hinweise zur Quelle“)

Automatische Tests prüfen alle Inhalte: gültige Seitenzahlen (1–29), eindeutige IDs, korrekte Lösungen, Quellen für externe
Angaben – und dass jede Musterantwort ihr eigenes Bewertungsraster erfüllt.

## Online-Version

Die fertige App ist als claude.ai-Artifact veröffentlicht: https://claude.ai/artifact/3J9U7LDuYWUymc67jkqgc4
(privat – nur für Personen sichtbar, mit denen das Artifact geteilt wird). Sie entsteht aus `npm run build:single`.

## Schnellstart

```bash
npm install
npm run dev        # Entwicklungsserver auf http://localhost:5173
npm test           # Unit-Tests (Vitest)
npm run test:e2e   # Klicktests (Playwright) auf Desktop-, Tablet- und Handybreite inkl. axe-Barrierecheck aller Seiten (hell/dunkel)
npm run build      # Produktions-Build nach dist/
```

## Tech-Stack und Begründung

- **React 19 + TypeScript + Vite** – komponentenbasiert, typsicher (Inhalte sind vollständig typisiert, Fehler fallen beim Bauen auf), schneller Build.
- **Eigenes CSS mit Design-Tokens** (`src/styles/tokens.css`) – helles und dunkles Farbschema, Farben der Basen A/T/G/C/U wie in den PDF-Abbildungen,
  geprüfte Kontraste (WCAG ≥ 4,5:1). Keine UI-Bibliothek nötig.
- **Keine Datenbank nötig**: Der Lernstand liegt im **Local Storage** des Browsers (Export/Import als JSON in den Einstellungen).
  Als claude.ai-Artifact wird er zusätzlich privat im eigenen Claude-Konto gespeichert und geräteübergreifend zusammengeführt.
- **Vitest + Playwright** für Logik- und Klicktests.

## Projektstruktur

```
src/
  content/        Lerninhalte je Kapitel (chapters/*.ts), Struktur, Quellen, Lehrplan, Hinweise zur Quelle
  learning/       Logik: Bewertung, Wiederholungssystem, Fortschritt, Fragenauswahl, Fehlermuster, genetischer Code
  progress/       Lernstand: Datenmodell, Übergänge, Speicherung (Local Storage / claude.ai)
  quiz/           Fragekomponente für alle Fragetypen, KI-Zweitbewertung
  widgets/        17 interaktive Abbildungen (Replikationsgabel, PCR, Gele, Stammbäume, …)
  pages/          Seiten (Dashboard, Themen, Lernmodus, Karten, Quiz, Prüfung, Statistik, …)
  ui/             gemeinsame Bausteine (Herkunftskennzeichnung, Markdown, Diagramme, …)
  ai/             optionale KI-Bewertung (Prompt, Browser-Anbindung)
server/index.ts   optionales Backend für die KI-Bewertung
tests/, e2e/      Unit- und Klicktests
```

## Optionale KI-Bewertung von Freitexten

Die App funktioniert vollständig **ohne KI** (Offline-Bewertung mit Bewertungsraster). Eine KI-Zweitbewertung kann auf Knopfdruck
zugeschaltet werden (Einstellungen → „KI-Bewertung verwenden“). Die KI bewertet nur anhand des Rasters und der Musterantwort aus der PDF.

**Sicherheit:** Es steht **kein API-Schlüssel im Frontend-Code**. Zwei Wege:

1. **Eigenes Backend** (lokal oder auf einem Server):
   ```bash
   cp .env.example .env          # ANTHROPIC_API_KEY=… eintragen (.env ist in .gitignore)
   npm run build && npm run build:server
   npm start                     # http://localhost:8787 – liefert App und /api/grade aus
   ```
   Der Schlüssel wird nur aus der Umgebungsvariable gelesen. Der Browser schickt nur Frage-ID und Antwort; den Prompt baut der Server
   aus den gebündelten Inhalten. Mit Ratenbegrenzung (20 Bewertungen/Minute pro IP) und Längenlimit.
   Für die Entwicklung: `npm start` in einem Terminal, `npm run dev` im zweiten (Vite leitet `/api` an Port 8787 weiter).
2. **Als claude.ai-Artifact**: Die Bewertung läuft über das eigene Claude-Konto der lernenden Person (claude.ai fragt vorher nach Erlaubnis) –
   ganz ohne Schlüssel.

## Barrierearmut

Automatisch geprüft mit axe-core (WCAG 2.1 AA) auf allen Seiten, in hellem und dunklem Schema, auf drei Bildschirmbreiten.
Tastaturbedienung überall (Karten: Leertaste = umdrehen, 1/2/3 = bewerten), sichtbare Fokusrahmen, Sprunglink zum Inhalt,
Beschriftungen für Screenreader, Diagramme mit Tabellenansicht, Farben nie allein als Informationsträger, reduzierte Bewegung
wird respektiert, Layout für Handy, Tablet (iPad) und Desktop ohne horizontales Scrollen.

## Grenzen

- Kompetenzen des Lehrplans, die die PDF nicht behandelt (Zellzyklus und Krebs, phylogenetische Stammbäume, Homologien), werden nicht
  mit eigenen Inhalten gefüllt – der Lehrplan-Check weist darauf hin.
- Die Offline-Bewertung von Freitexten erkennt Fachbegriffe und Formulierungen, versteht aber keine Sprache wie ein Mensch. Deshalb gibt es
  „Ich hatte es sinngemäß richtig“ und die optionale KI-Zweitbewertung.
