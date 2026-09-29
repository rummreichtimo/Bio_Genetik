import type { CurriculumItem, SourceIssue } from './types';
import { p } from './helpers';

/** Unstimmigkeiten innerhalb der PDF – werden angezeigt, nicht stillschweigend aufgelöst. */
export const SOURCE_ISSUES: SourceIssue[] = [
  {
    id: 'insulin-peptid',
    title: 'Insulin-Mutation: gedrucktes Peptid passt nicht zur mRNA',
    text:
      'In Material B (Mutation des Insulin-Gens) lautet die mutierte mRNA nach „GAA“: GCA GUG CUG CUA CUC CAU UUG. ' +
      'Übersetzt mit der Codesonne ergibt das Ala‑Val‑Leu‑Leu‑Leu‑His‑Leu. Gedruckt ist als Peptid aber „Ala Val Leu His Ile His Leu“. ' +
      'Am Mutationstyp (Insertion → Rasterschub) ändert das nichts. Prüfe die Stelle im Original, falls die Abbildung dort anders aussieht.',
    src: [p(16, 'Material B')],
    subs: ['mutationen'],
  },
  {
    id: 'rps12-uracil',
    title: 'rps12-Sequenz: „U“ in einer DNA-Sequenz',
    text:
      'In der Tabelle zur Antibiotikaresistenz steht in der mutierten DNA-Sequenz „UCC“. DNA enthält aber Thymin statt Uracil ' +
      '(PDF S. 10). Gemeint ist vermutlich „TCC“ – also ein Austausch C → T.',
    src: [p(17, 'Material D'), p(10)],
    subs: ['mutationen', 'translation'],
  },
  {
    id: 'genzahl',
    title: 'Zahl der menschlichen Gene',
    text:
      'Auf PDF S. 14 steht „etwa 25 000 proteincodierende Gene“, auf PDF S. 19 „rund 20 000 Gene“. ' +
      'Beide Angaben stammen aus deiner Quelle; sie beschreiben dieselbe Kernaussage: Der Mensch hat vergleichsweise wenige Gene, aber viele verschiedene Proteine.',
    src: [p(14), p(19)],
    subs: ['eukaryoten', 'genregulation'],
  },
  {
    id: 'spleiss-anteil',
    title: 'Anteil alternativ gespleißter Gene',
    text:
      'PDF S. 14: „Beim Menschen wird mindestens die Hälfte aller Gene gespleißt.“ PDF S. 19: „Beim Menschen unterliegen bis zu 50 Prozent aller Gene einem alternativen Spleißen.“ ' +
      '„Mindestens“ und „bis zu“ widersprechen sich. Für Prüfungen reicht die gemeinsame Aussage: Ein großer Teil der Gene wird alternativ gespleißt.',
    src: [p(14), p(19)],
    subs: ['eukaryoten', 'genregulation'],
  },
  {
    id: 'stammbaum-allel',
    title: 'Stammbaumanalyse: Allelbezeichnung im Gegenbeweis',
    text:
      'Im Beispiel der Stammbaumanalyse ist a das mutierte und A das nicht mutierte Allel. Im Beweis heißt es: „Bei einem dominanten Erbgang hätte das Kind den Genotyp Aa oder AA, ' +
      'sodass mindestens ein Elternteil das defekte Allel a besitzen müsste, also nicht gesund wäre.“ Bei einem dominanten Erbgang wäre das defekte Allel aber das dominante Allel A ' +
      '(vgl. Abb. 3: A = Allel Betroffener). Die Aussage des Beweises bleibt gleich: Ein Elternteil mit dem dominanten Krankheitsallel wäre selbst krank.',
    src: [p(25), p(28, 'Abb. 3')],
    subs: ['erbgaenge'],
  },
];

/** Leitsätze der Inhaltsbereiche – wörtlich aus dem Lehrplan (PDF S. 1 und 29). */
const A21 = '2.1 Durch spezifische Basenabfolgen in der DNA werden Informationen für die Struktur von Proteinen gespeichert und über die Proteinbiosynthese exprimiert.';
const A22 = '2.2 Die Steuerung der Genexpression führt zur Bildung spezifischer Proteine.';
const A23 = '2.3 Mutationen in den Basensequenzen der DNA können zu hereditären Erkrankungen führen. Gentechnische Verfahren werden zur Diagnose und Behandlung genetisch bedingter Erkrankungen genutzt.';
const A24 = '2.4 Der fehlgesteuerte Zellzyklus kann zur Bildung von Krebszellen führen.';
const A25 = '2.5 Abgestufte Ähnlichkeiten von Organismen dienen als Belege für die Rekonstruktion der gemeinsamen Abstammung.';

/** Lehrplan-Abgleich: Kompetenzerwartungen („Die Lernenden …“) aus PDF S. 1 und 29, wörtlich übernommen. */
export const CURRICULUM: CurriculumItem[] = [
  {
    id: '2.1-struktur',
    area: A21,
    text: 'beschreiben die molekulare Struktur der DNA und erläutern die komplementäre Basenpaarung durch Wasserstoffbrücken',
    status: 'covered',
    subs: ['dna-aufbau', 'dna-traeger'],
    src: [p(1)],
  },
  {
    id: '2.1-replikation',
    area: A21,
    text: 'leiten aus Daten die Vervielfältigung von genetisch gespeicherter Information durch semikonservative Replikation ab',
    status: 'covered',
    subs: ['replikation'],
    src: [p(1)],
  },
  {
    id: '2.1-proteinbiosynthese',
    area: A21,
    text: 'erläutern Transkription und Translation als Realisierung von genetisch gespeicherten Informationen',
    status: 'covered',
    subs: ['genfunktion', 'code', 'transkription', 'translation'],
    src: [p(1)],
  },
  {
    id: '2.1-spleissen',
    area: A21,
    text: 'erklären Proteinvielfalt durch alternatives Spleißen in der eukaryotischen Proteinbiosynthese funktional',
    status: 'covered',
    subs: ['eukaryoten', 'genregulation'],
    src: [p(1)],
  },
  {
    id: '2.2-hormone',
    area: A22,
    text: 'erläutern die Steuerung der Genexpression durch Hormone als Transkriptionsfaktoren',
    status: 'partial',
    subs: ['genregulation'],
    note: 'Deine PDF erwähnt intrazelluläre Hormonrezeptoren nur kurz als spezifische Transkriptionsfaktoren, die die Transkriptionsrate steigern (PDF S. 19). Ein ausführliches Beispiel fehlt.',
    src: [p(1), p(19)],
  },
  {
    id: '2.2-rnai',
    area: A22,
    text: 'erläutern RNA-Interferenz als Mechanismus zur Hemmung der Genexpression',
    status: 'covered',
    subs: ['genregulation'],
    src: [p(1)],
  },
  {
    id: '2.2-methylierung',
    area: A22,
    text: 'leiten aus umweltbedingten Methylierungsmustern der DNA ab, dass Genexpression über Methylierung gesteuert wird',
    status: 'covered',
    subs: ['epigenetik'],
    src: [p(1)],
  },
  {
    id: '2.2-histone',
    area: A22,
    text: 'erklären Genexpression durch Histonmodifikation proximat',
    status: 'covered',
    subs: ['genregulation', 'epigenetik'],
    src: [p(1)],
  },
  {
    id: '2.3-mutationen',
    area: A23,
    text: 'erläutern Genmutationen und ihre Auswirkungen auf Zell-, Organ- und Organismus-Ebene',
    status: 'partial',
    subs: ['mutationen'],
    note: 'Deine PDF erklärt Mutationstypen und ihre Folgen für das Protein mit Krankheitsbeispielen (z. B. familiäre Kardiomyopathie). Eine ausdrückliche Gliederung nach Zell-, Organ- und Organismus-Ebene enthält sie nicht.',
    src: [p(29)],
  },
  {
    id: '2.3-gentherapie',
    area: A23,
    text: 'beschreiben ein gentherapeutisches Verfahren zum Austausch von DNA-Sequenzen',
    status: 'covered',
    subs: ['crispr-grundlagen', 'crispr-anwendung'],
    src: [p(29)],
  },
  {
    id: '2.3-stammbaum',
    area: A23,
    text: 'leiten aus Familienstammbäumen die Wahrscheinlichkeit des Auftretens hereditärer Erkrankungen ab',
    status: 'covered',
    subs: ['erbgaenge', 'beratung'],
    src: [p(29)],
  },
  {
    id: '2.3-bioethik',
    area: A23,
    text: 'bewerten bioethische Aspekte eines Gentests in der genetischen Beratung auch unter Unterscheidung deskriptiver und normativer Aussagen, bilden sich kriteriengeleitet Meinungen, treffen Entscheidungen und reflektieren Entscheidungen',
    status: 'partial',
    subs: ['beratung'],
    note: 'Gentests, Recht auf Nichtwissen und ethische Fragen stehen in deiner PDF (S. 26–27). Die Unterscheidung „deskriptiv/normativ“ wird dort nicht erklärt – die App ergänzt sie als gekennzeichnete externe Information.',
    src: [p(29), p(26), p(27)],
  },
  {
    id: '2.4-krebs',
    area: A24,
    text: 'beschreiben die Entstehung von Krebs als unkontrollierte Teilungen und Wachstum von Zellen',
    status: 'missing',
    subs: [],
    note: 'Dazu enthält der Lehrbuchteil deiner PDF keine Inhalte.',
    src: [p(29)],
  },
  {
    id: '2.4-onkogene',
    area: A24,
    text: 'werten Forschungsbefunde zur Beeinflussung des Zellzyklus durch mutierte oder epigenetisch modifizierte Onkogene und Anti-Onkogene beziehungsweise ihrer Genprodukte aus',
    status: 'missing',
    subs: [],
    note: 'Dazu enthält der Lehrbuchteil deiner PDF keine Inhalte.',
    src: [p(29)],
  },
  {
    id: '2.4-personalisiert',
    area: A24,
    text: 'recherchieren zu einem Verfahren der personalisierten Krebsmedizin und wählen passende Quellen aus',
    status: 'partial',
    subs: ['beratung'],
    note: 'Deine PDF nennt personalisierte Medizin mit dem Beispiel Herceptin bei Brustkrebs (S. 27).',
    src: [p(29), p(27)],
  },
  {
    id: '2.5-pcr',
    area: A25,
    text: 'erläutern die molekularen Vorgänge bei PCR und Gelelektrophorese',
    status: 'covered',
    subs: ['pcr', 'gelelektrophorese'],
    src: [p(29)],
  },
  {
    id: '2.5-homologien',
    area: A25,
    text: 'deuten Aminosäure- und DNA-Sequenzen als molekularbiologische Homologien für phylogenetische Verwandtschaft',
    status: 'missing',
    subs: [],
    note: 'Dazu enthält der Lehrbuchteil deiner PDF keine Inhalte.',
    src: [p(29)],
  },
  {
    id: '2.5-stammbaeume',
    area: A25,
    text: 'erstellen und interpretieren Stammbäume auf der Grundlage von ursprünglichen und abgeleiteten Merkmalen zur Darstellung von phylogenetischer Verwandtschaft',
    status: 'missing',
    subs: [],
    note: 'Gemeint sind phylogenetische Stammbäume (Verwandtschaft von Arten). Deine PDF enthält nur Familienstammbäume (Humangenetik).',
    src: [p(29)],
  },
];
