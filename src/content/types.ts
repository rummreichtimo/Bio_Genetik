/**
 * Inhaltsmodell der Lernapp.
 *
 * Jeder Inhalt trägt eine Herkunft:
 *  - 'pdf'  📘 steht so in der PDF
 *  - 'inf'  💡 Erklärung / Schlussfolgerung aus PDF-Inhalten (z. B. Lösung einer Materialaufgabe)
 *  - 'ext'  🌐 externe Zusatzinformation (steht nicht in der PDF, mit Quellenangabe)
 * und – wo möglich – eine Quellenangabe als PDF-Seite.
 */

export type Provenance = 'pdf' | 'inf' | 'ext';

/** Quellenangabe: Seite in deiner PDF (1–29). Buchseiten werden daraus abgeleitet. */
export interface Src {
  pdf: number;
  /** optionaler Hinweis, z. B. "Material A" oder "Abb. 3" */
  note?: string;
}

export interface ExternalSource {
  label: string;
  url?: string;
}

/** Ein Erklärungsbaustein mit eigener Herkunft (für „Warum?“ und Feedback). */
export interface Explanation {
  text: string;
  prov: Provenance;
  src?: Src[];
  ext?: ExternalSource;
}

export type ChapterId = 'grundlagen' | 'methoden' | 'genprodukt' | 'regulation' | 'gentechnik' | 'humangenetik';

export type ChapterIcon = 'helix' | 'tube' | 'ribosome' | 'switch' | 'scissors' | 'pedigree';

export interface Chapter {
  id: ChapterId;
  title: string;
  short: string;
  icon: ChapterIcon;
  /** Buchkapitel-Bezeichnung aus der PDF */
  bookRef: string;
  subtopics: string[];
}

export interface Subtopic {
  id: string;
  chapter: ChapterId;
  title: string;
  /** Kapitelnummer im Buch, z. B. "1.2" */
  bookNo?: string;
  summary: string;
  pages: number[];
  /** Kompetenzerwartung(en) aus dem Lehrplan (PDF S. 1/29), z. B. "2.1" */
  curriculum: string[];
}

// ---------------------------------------------------------------------------
// Lernmodus
// ---------------------------------------------------------------------------

export type WidgetId =
  | 'meselson'
  | 'pcr'
  | 'codon-table'
  | 'translator'
  | 'mutation-lab'
  | 'gel-fvl'
  | 'gel-huntington'
  | 'gel-duchenne'
  | 'sanger'
  | 'beadle-tatum'
  | 'pedigree-method'
  | 'twins-curve'
  | 'chromatin'
  | 'replication-fork'
  | 'ribosome'
  | 'taylor'
  | 'griffith';

export type Block =
  | { kind: 'text'; md: string; prov?: Provenance; src?: Src[] }
  | { kind: 'bullets'; title?: string; items: string[]; prov?: Provenance; src?: Src[] }
  | { kind: 'term'; term: string; def: string; simple?: string; src: Src[] }
  | { kind: 'steps'; title?: string; steps: { title: string; text: string }[]; src: Src[]; prov?: Provenance }
  | {
      kind: 'compare';
      title?: string;
      columns: string[];
      rows: { label: string; cells: string[] }[];
      src: Src[];
      prov?: Provenance;
    }
  | {
      kind: 'note';
      tone: 'pdf' | 'inf' | 'ext' | 'warn';
      title: string;
      md: string;
      src?: Src[];
      ext?: ExternalSource;
    }
  | { kind: 'widget'; widget: WidgetId; caption?: string; src?: Src[] }
  | { kind: 'check'; questionIds: string[] };

export interface LessonSection {
  id: string;
  title: string;
  blocks: Block[];
}

export interface Lesson {
  sub: string;
  intro?: string;
  sections: LessonSection[];
}

// ---------------------------------------------------------------------------
// Begriffe & Karteikarten
// ---------------------------------------------------------------------------

export interface Term {
  id: string;
  sub: string;
  term: string;
  def: string;
  /** "Einfach erklärt" */
  simple?: string;
  src: Src[];
  prov?: Provenance;
  /** Quelle, wenn prov = 'ext' */
  ext?: ExternalSource;
}

export type CardKind = 'begriff' | 'frage' | 'prozess' | 'ursache' | 'vergleich' | 'experiment' | 'abbildung';

export interface Flashcard {
  id: string;
  sub: string;
  kind: CardKind;
  front: string;
  back: string;
  src: Src[];
  prov: Provenance;
  /** Quelle, wenn prov = 'ext' */
  ext?: ExternalSource;
  /** optional: Widget/Abbildung auf der Vorderseite (Abbildung → Erklärung) */
  figure?: FigureRef;
}

export interface FigureRef {
  widget: WidgetId;
  /** Markierung, die hervorgehoben wird (z. B. "P-Stelle") */
  highlight?: string;
}

// ---------------------------------------------------------------------------
// Fragen
// ---------------------------------------------------------------------------

/** 1 Grundlagen · 2 Verständnis · 3 Anwendung · 4 Klausurniveau · 5 Prüfungsmodus */
export type Level = 1 | 2 | 3 | 4 | 5;

export type ErrorTag =
  | 'enzyme'
  | 'sequence'
  | 'direction'
  | 'terms'
  | 'facts'
  | 'experiment'
  | 'code'
  | 'inheritance'
  | 'mechanism'
  | 'comparison'
  | 'evaluation';

export interface QBase {
  id: string;
  sub: string;
  level: Level;
  prompt: string;
  src: Src[];
  /** Herkunft der richtigen Antwort */
  prov: Provenance;
  /** „Warum?“-Erklärung, Bausteine jeweils mit Herkunft */
  why: Explanation[];
  /** Fehlerkategorie, wenn diese Frage falsch beantwortet wird */
  err: ErrorTag;
  /** optionales Material, das mit der Frage angezeigt wird */
  material?: MaterialBlock[];
  /** optionales Widget zur Frage */
  figure?: FigureRef;
}

export type MaterialBlock =
  | { kind: 'text'; md: string }
  | { kind: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { kind: 'seq'; label?: string; value: string; caption?: string }
  | { kind: 'widget'; widget: WidgetId; caption?: string };

export interface QSingle extends QBase {
  type: 'single';
  options: string[];
  answer: number;
  /** optionale Rückmeldung zu einzelnen falschen Optionen */
  feedback?: Record<number, string>;
}

export interface QMulti extends QBase {
  type: 'multi';
  options: string[];
  answers: number[];
}

export interface QTrueFalse extends QBase {
  type: 'tf';
  answer: boolean;
  /** richtige Fassung einer falschen Aussage */
  correction?: string;
}

export interface ClozeGap {
  /** akzeptierte Antworten (Groß-/Kleinschreibung egal) */
  accept: string[];
  /** wenn gesetzt: Auswahlliste statt Eingabe */
  options?: string[];
}

export interface QCloze extends QBase {
  type: 'cloze';
  /** Text mit Lücken {{0}}, {{1}}, … */
  text: string;
  gaps: ClozeGap[];
}

export interface QOrder extends QBase {
  type: 'order';
  /** in richtiger Reihenfolge */
  items: string[];
}

export interface QMatch extends QBase {
  type: 'match';
  pairs: { left: string; right: string }[];
  /** zusätzliche falsche rechte Optionen (Ablenker) */
  distractors?: string[];
}

export interface QLabel extends QBase {
  type: 'label';
  widget: WidgetId;
  /** Marker-Nummer → richtige Beschriftung */
  labels: { marker: string; answer: string }[];
  distractors?: string[];
}

export interface QInput extends QBase {
  type: 'input';
  /**
   * akzeptierte Antworten
   *  - 'seq': nur Basenbuchstaben zählen (Leerzeichen, 5'/3', Bindestriche egal)
   *  - 'aa': Aminosäuren im Dreibuchstabencode, z. B. "Met-Ala-Trp" (Stopp/Start werden ignoriert)
   *  - 'number': Zahl mit Toleranz tol
   */
  accept: string[];
  mode: 'text' | 'seq' | 'number' | 'aa';
  /** bei mode 'number': erlaubte Abweichung */
  tol?: number;
  /** Einheit, die hinter dem Eingabefeld angezeigt wird */
  unit?: string;
  placeholder?: string;
  /** Musterlösung (anzeigen) */
  solution: string;
}

/** Ein Punkt im Bewertungsraster einer Freitextfrage. */
export interface RubricPoint {
  id: string;
  /** was genannt werden sollte (wird als „richtig“/„fehlt“ angezeigt) */
  label: string;
  /**
   * Erkennungsmuster: Liste von Alternativen; jede Alternative ist eine Liste von
   * regulären Ausdrücken, die ALLE im (normalisierten) Text vorkommen müssen.
   */
  any: string[][];
  weight?: number;
  /** Vergleichskriterium (bei Vergleichsfragen), z. B. "Funktion" */
  group?: string;
}

export interface Misconception {
  id: string;
  /** Muster wie bei RubricPoint.any */
  any: string[][];
  /** Rückmeldung, warum das nicht stimmt */
  feedback: string;
}

export interface QFree extends QBase {
  type: 'free';
  rubric: RubricPoint[];
  misconceptions?: Misconception[];
  model: string;
  /** Vergleichsfrage: Kriterien werden gruppiert angezeigt */
  compare?: boolean;
  /** Operator, z. B. „Erklären“ */
  operator?: string;
  minWords?: number;
}

export type Question = QSingle | QMulti | QTrueFalse | QCloze | QOrder | QMatch | QLabel | QInput | QFree;

export type QuestionType = Question['type'];

// ---------------------------------------------------------------------------
// Experimente & Materialien
// ---------------------------------------------------------------------------

export type ExperimentStepKey =
  | 'frage'
  | 'hypothese'
  | 'material'
  | 'durchfuehrung'
  | 'beobachtung'
  | 'ergebnis'
  | 'schluss'
  | 'methode';

export interface ExperimentStep {
  key: ExperimentStepKey;
  text: string;
  prov: Provenance;
  /** Vorhersage-Impuls, bevor der Schritt aufgedeckt wird */
  predict?: string;
}

export interface Experiment {
  id: string;
  sub: string;
  title: string;
  who?: string;
  year?: string;
  src: Src[];
  steps: ExperimentStep[];
  widget?: WidgetId;
  questionIds: string[];
}

// ---------------------------------------------------------------------------
// Klausurtraining
// ---------------------------------------------------------------------------

export interface ExamTask {
  id: string;
  title: string;
  subs: string[];
  /** Hinweis, auf welchem Material aus der PDF die Übung beruht */
  basedOn: string;
  src: Src[];
  intro: string;
  material: MaterialBlock[];
  /** Teilaufgaben als Fragen-IDs (werden wie Quizfragen bewertet) */
  parts: string[];
}

// ---------------------------------------------------------------------------
// Hinweise zur Quelle & Lehrplan
// ---------------------------------------------------------------------------

export interface SourceIssue {
  id: string;
  title: string;
  text: string;
  src: Src[];
  subs: string[];
}

export interface CurriculumItem {
  id: string;
  area: string;
  text: string;
  status: 'covered' | 'partial' | 'missing';
  subs: string[];
  note?: string;
  src: Src[];
}
