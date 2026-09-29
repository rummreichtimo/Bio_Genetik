import type { Chapter, ChapterId, Subtopic } from './types';

/** Themenstruktur, abgeleitet aus den Kapiteln deiner PDF. */
export const CHAPTERS: Chapter[] = [
  {
    id: 'grundlagen',
    title: 'Molekulare Grundlagen',
    short: 'DNA & Replikation',
    icon: 'helix',
    bookRef: 'Kapitel 1 · Molekulare Grundlagen der Genetik',
    subtopics: ['dna-traeger', 'dna-aufbau', 'replikation'],
  },
  {
    id: 'methoden',
    title: 'Arbeitstechniken',
    short: 'PCR, Gel & Sequenzierung',
    icon: 'tube',
    bookRef: 'Kapitel 2 · Arbeitstechniken der molekularen Genetik',
    subtopics: ['pcr', 'gelelektrophorese', 'sequenzierung'],
  },
  {
    id: 'genprodukt',
    title: 'Vom Gen zum Genprodukt',
    short: 'Code, Transkription, Translation',
    icon: 'ribosome',
    bookRef: 'Kapitel 3 · Vom Gen zum Genprodukt',
    subtopics: ['genfunktion', 'code', 'transkription', 'translation', 'eukaryoten', 'mutationen'],
  },
  {
    id: 'regulation',
    title: 'Genregulation & Epigenetik',
    short: 'Steuerung der Genexpression',
    icon: 'switch',
    bookRef: 'Kapitel 4 · Genregulation',
    subtopics: ['genregulation', 'epigenetik'],
  },
  {
    id: 'gentechnik',
    title: 'Gentechnik: CRISPR/Cas',
    short: 'Genschere & Anwendungen',
    icon: 'scissors',
    bookRef: 'Kapitel 5.3 · CRISPR/Cas-System',
    subtopics: ['crispr-grundlagen', 'crispr-anwendung'],
  },
  {
    id: 'humangenetik',
    title: 'Humangenetik',
    short: 'Erbgänge, Beratung, Diagnostik',
    icon: 'pedigree',
    bookRef: 'Kapitel 6 · Humangenetik',
    subtopics: ['erbgaenge', 'beratung'],
  },
];

export const SUBTOPICS: Subtopic[] = [
  {
    id: 'dna-traeger',
    chapter: 'grundlagen',
    bookNo: '1.1',
    title: 'DNA – Trägerin der Erbinformation',
    summary: 'Wie Griffith und Avery nachwiesen, dass DNA und nicht Protein die Erbinformation trägt.',
    pages: [2],
    curriculum: ['2.1-struktur'],
  },
  {
    id: 'dna-aufbau',
    chapter: 'grundlagen',
    bookNo: '1.1',
    title: 'Aufbau und Verpackung der DNA',
    summary: 'Nucleotide, Basenpaarung, Doppelhelix, Chargaff-Regel und die Verpackung in Chromosomen.',
    pages: [3],
    curriculum: ['2.1-struktur'],
  },
  {
    id: 'replikation',
    chapter: 'grundlagen',
    bookNo: '1.2',
    title: 'Replikation der DNA',
    summary: 'Semikonservative Verdopplung, beteiligte Enzyme, Leit- und Folgestrang, Fehlerkorrektur.',
    pages: [4, 5],
    curriculum: ['2.1-replikation'],
  },
  {
    id: 'pcr',
    chapter: 'methoden',
    bookNo: '2.1',
    title: 'Polymerase-Kettenreaktion (PCR)',
    summary: 'DNA im Labor vervielfältigen: Komponenten, drei Schritte, Real-Time-PCR und Anwendungen.',
    pages: [6],
    curriculum: ['2.5-pcr'],
  },
  {
    id: 'gelelektrophorese',
    chapter: 'methoden',
    bookNo: '2.1',
    title: 'Gelelektrophorese',
    summary: 'DNA-Fragmente und Proteine nach Größe trennen und Bandenmuster auswerten.',
    pages: [7],
    curriculum: ['2.5-pcr'],
  },
  {
    id: 'sequenzierung',
    chapter: 'methoden',
    bookNo: '2.2',
    title: 'DNA-Sequenzierung',
    summary: 'Basenfolgen ermitteln mit der Kettenabbruchmethode nach Sanger und der Fluoreszenzsequenzierung.',
    pages: [8],
    curriculum: [],
  },
  {
    id: 'genfunktion',
    chapter: 'genprodukt',
    bookNo: '3.1',
    title: 'Die Funktion von Genen',
    summary: 'Mangelmutanten von Beadle und Tatum und der Weg zur Ein-Gen-ein-Polypeptid-Hypothese.',
    pages: [9],
    curriculum: ['2.1-proteinbiosynthese'],
  },
  {
    id: 'code',
    chapter: 'genprodukt',
    bookNo: '3.1',
    title: 'Genetischer Code',
    summary: 'Fluss der genetischen Information, Codons, Codesonne und die Eigenschaften des Codes.',
    pages: [10],
    curriculum: ['2.1-proteinbiosynthese'],
  },
  {
    id: 'transkription',
    chapter: 'genprodukt',
    bookNo: '3.2',
    title: 'Transkription bei Prokaryoten',
    summary: 'Wie die RNA-Polymerase am codogenen Strang eine mRNA bildet – vom Promotor bis zum Terminator.',
    pages: [11],
    curriculum: ['2.1-proteinbiosynthese'],
  },
  {
    id: 'translation',
    chapter: 'genprodukt',
    bookNo: '3.3',
    title: 'Translation bei Prokaryoten',
    summary: 'tRNA, Ribosomen und der Ablauf der Übersetzung der mRNA in ein Polypeptid.',
    pages: [12, 13],
    curriculum: ['2.1-proteinbiosynthese'],
  },
  {
    id: 'eukaryoten',
    chapter: 'genprodukt',
    bookNo: '3.4',
    title: 'Genexpression bei Eukaryoten',
    summary: 'Mosaikgene, RNA-Prozessierung, alternatives Spleißen und posttranslationale Modifikation.',
    pages: [14],
    curriculum: ['2.1-spleissen'],
  },
  {
    id: 'mutationen',
    chapter: 'genprodukt',
    bookNo: '3.5',
    title: 'Mutationen und Modifikationen',
    summary: 'Mutationstypen, ihre Folgen für das Protein und umweltbedingte Modifikationen.',
    pages: [15, 16],
    curriculum: ['2.3-mutationen'],
  },
  {
    id: 'genregulation',
    chapter: 'regulation',
    bookNo: '4.1',
    title: 'Genregulation bei Eukaryoten',
    summary: 'Regulation auf Chromatin-, Transkriptions-, RNA-, Translations- und Proteinebene.',
    pages: [18, 19],
    curriculum: ['2.2-hormone', '2.2-rnai', '2.1-spleissen', '2.2-histone'],
  },
  {
    id: 'epigenetik',
    chapter: 'regulation',
    bookNo: '4.2',
    title: 'Epigenetische Modifikationen',
    summary: 'DNA-Methylierung und Histonmodifikation: wie Umwelt und Ernährung Gene steuern.',
    pages: [20, 21],
    curriculum: ['2.2-methylierung', '2.2-histone'],
  },
  {
    id: 'crispr-grundlagen',
    chapter: 'gentechnik',
    bookNo: '5.3',
    title: 'CRISPR/Cas: Aufbau und Virusabwehr',
    summary: 'Das natürliche Abwehrsystem der Bakterien gegen Phagen: Spacer, crRNA, Cas-Enzym und PAM.',
    pages: [22],
    curriculum: ['2.3-gentherapie'],
  },
  {
    id: 'crispr-anwendung',
    chapter: 'gentechnik',
    bookNo: '5.3',
    title: 'Genomeditierung mit CRISPR/Cas',
    summary: 'Guide-RNA, DNA-Reparatur, Anwendungen in Pflanzen- und Tierzucht und beim Menschen – mit Risiken.',
    pages: [22, 23, 24],
    curriculum: ['2.3-gentherapie'],
  },
  {
    id: 'erbgaenge',
    chapter: 'humangenetik',
    bookNo: '6.2',
    title: 'Erbgänge und Stammbaumanalyse',
    summary: 'Autosomal-dominant, autosomal-rezessiv und X-chromosomal – Erbgänge aus Stammbäumen ableiten.',
    pages: [28, 25],
    curriculum: ['2.3-stammbaum'],
  },
  {
    id: 'beratung',
    chapter: 'humangenetik',
    bookNo: '6.5',
    title: 'Genetische Beratung und Diagnostik',
    summary: 'Gentests, Pränataldiagnostik, Präimplantationsdiagnostik und personalisierte Medizin – mit ethischen Fragen.',
    pages: [26, 27],
    curriculum: ['2.3-bioethik', '2.3-stammbaum', '2.4-personalisiert'],
  },
];

const SUB_MAP = new Map(SUBTOPICS.map((s) => [s.id, s]));
const CHAPTER_MAP = new Map(CHAPTERS.map((c) => [c.id, c]));

export function getSubtopic(id: string): Subtopic | undefined {
  return SUB_MAP.get(id);
}

export function getChapter(id: ChapterId): Chapter | undefined {
  return CHAPTER_MAP.get(id);
}

export function chapterOf(subId: string): Chapter | undefined {
  const sub = SUB_MAP.get(subId);
  return sub ? CHAPTER_MAP.get(sub.chapter) : undefined;
}

export function subtopicsOf(chapterId: ChapterId): Subtopic[] {
  const ch = CHAPTER_MAP.get(chapterId);
  return ch ? ch.subtopics.map((id) => SUB_MAP.get(id)!).filter(Boolean) : [];
}
