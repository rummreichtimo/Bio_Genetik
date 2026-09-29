import type { ContentPack } from '../index';
import { p } from '../helpers';

/**
 * Kapitel 1 · Molekulare Grundlagen der Genetik (PDF S. 2–5, Buch S. 232–239)
 */
export const grundlagen: ContentPack = {
  // =========================================================================
  // LERNMODUS
  // =========================================================================
  lessons: [
    {
      sub: 'dna-traeger',
      intro: 'Wie wurde nachgewiesen, dass die DNA – und nicht Proteine – die Erbinformation trägt?',
      sections: [
        {
          id: 'entdeckung',
          title: 'Entdeckung der Nucleinsäuren',
          blocks: [
            {
              kind: 'text',
              md: 'Menschliche Zwei-Chromatiden-Chromosomen zeigen im Rasterelektronenmikroskop zwei **Chromatiden** und das **Centromer**. Jedes Chromatid enthält neben Proteinen die Erbinformation in Form von DNA.\n\n1869 entdeckte der Schweizer Mediziner **Friedrich Miescher** in Zellkernen eine unbekannte Gruppe von Makromolekülen, die man später **Nucleinsäuren** nannte. Ihr bekanntester Vertreter ist die **Desoxyribonucleinsäure (DNA)**.',
              src: [p(2)],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Warum man lange auf Proteine tippte',
              md: 'Im Zellkern sind stets auch Proteine enthalten. Wegen ihrer **Vielfalt und Spezifität** galten Proteine lange als Träger der Erbinformation. Den entscheidenden Gegenbeweis lieferten erst Versuche mit Bakterien.',
              src: [p(2)],
            },
          ],
        },
        {
          id: 'griffith',
          title: 'Griffiths Transformationsversuche (1928)',
          blocks: [
            {
              kind: 'text',
              md: 'Fred Griffith arbeitete an Impfstoffen gegen Bakterien, die Lungenentzündung verursachen. Er infizierte Mäuse mit zwei Bakterienstämmen:\n\n- **S-Stamm**: besitzt eine äußere Kapsel, die ihn vor der Immunabwehr der Maus schützt.\n- **R-Stamm**: ohne Kapsel, wird vom Immunsystem unschädlich gemacht.',
              src: [p(2)],
            },
            { kind: 'widget', widget: 'griffith', caption: 'Sage für jeden Ansatz voraus, ob die Maus überlebt – dann aufdecken.', src: [p(2, 'Abb. 2')] },
            {
              kind: 'text',
              md: 'Im vierten Ansatz waren R-Bakterien durch einen Stoff aus den toten S-Bakterien zu kapselbildenden Bakterien umgewandelt worden. Die Fähigkeit zur Kapselbildung trat auch in den **Folgegenerationen** auf. Griffith nannte diese Übertragung genetischer Information **Transformation** – den verantwortlichen Stoff kannte er nicht.',
              src: [p(2)],
            },
            { kind: 'check', questionIds: ['dt-q3', 'dt-q4', 'dt-q10'] },
          ],
        },
        {
          id: 'avery',
          title: 'Averys Nachweis: DNA transformiert (1944)',
          blocks: [
            {
              kind: 'steps',
              title: 'Averys Vorgehen',
              steps: [
                { title: 'Isolieren', text: 'Aus hitzegetöteten S-Bakterien werden Proteine und DNA getrennt isoliert.' },
                { title: 'Ansatz mit Proteinen', text: 'Die isolierten Proteine werden zu einer Kultur von R-Bakterien gegeben – die Bakterien verändern sich nicht.' },
                { title: 'Ansatz mit DNA', text: 'Die isolierte DNA wird zu R-Bakterien gegeben – nach einiger Zeit finden sich in der Kultur R- und S-Bakterien.' },
                { title: 'Schlussfolgerung', text: 'Die DNA ist der für die Transformation verantwortliche Stoff. Sie enthält die Information für die Kapselbildung und ist folglich Träger der Erbinformation.' },
              ],
              src: [p(2)],
            },
            { kind: 'check', questionIds: ['dt-q7', 'dt-q8'] },
          ],
        },
      ],
    },
    {
      sub: 'dna-aufbau',
      intro: 'Aus welchen Bausteinen besteht die DNA, wie sind sie verknüpft – und wie passt ein meterlanger Faden in den Zellkern?',
      sections: [
        {
          id: 'bausteine',
          title: 'Bausteine: Zucker, Phosphat, Basen',
          blocks: [
            {
              kind: 'text',
              md: 'Am Bau der DNA sind der Zucker **Desoxyribose**, **Phosphorsäure** und organische **Basen** beteiligt. Die Basen bilden zwei Gruppen:',
              src: [p(3)],
            },
            {
              kind: 'compare',
              columns: ['Pyrimidin-Basen', 'Purin-Basen'],
              rows: [
                { label: 'Bau', cells: ['einfacher Sechserring', 'größeres Doppelringsystem'] },
                { label: 'Basen', cells: ['Cytosin (C), Thymin (T)', 'Adenin (A), Guanin (G)'] },
              ],
              src: [p(3)],
            },
            {
              kind: 'term',
              term: 'Nucleotid',
              def: 'Baustein der DNA aus je einem Molekül Desoxyribose, einer Phosphatgruppe und einer der vier Basen. Die Base ist an das 1\'-C-Atom, die Phosphatgruppe an das 5\'-C-Atom des Zuckers gebunden.',
              simple: 'Ein „Legostein“ der DNA: Zucker + Phosphat + Base.',
              src: [p(3)],
            },
          ],
        },
        {
          id: 'strang',
          title: 'Vom Nucleotid zum Strang',
          blocks: [
            {
              kind: 'text',
              md: 'Die DNA ist eine Kette aus vielen Nucleotiden, ein **Polynucleotid**. Die Phosphatgruppe am 5\'-C-Atom eines Nucleotids ist mit dem 3\'-C-Atom des folgenden Nucleotids verknüpft. So entsteht ein **Zucker-Phosphat-Band**.\n\nDie Enden werden nach den freien Gruppen der Desoxyribose benannt: Am **3\'-Ende** liegt eine freie OH-Gruppe, am **5\'-Ende** eine freie Phosphatgruppe.',
              src: [p(3)],
            },
            { kind: 'check', questionIds: ['da-q4', 'da-q5'] },
          ],
        },
        {
          id: 'doppelhelix',
          title: 'Die Doppelhelix und die Basenpaarung',
          blocks: [
            {
              kind: 'text',
              md: '**James Watson** und **Francis Crick** entwickelten 1953 auf der Basis experimenteller Befunde anderer Forschergruppen ein räumliches Modell der DNA: zwei Polynucleotid-Stränge, die sich **antiparallel** gegenüberliegen. Der Bau gleicht einer gedrehten Strickleiter – die Zucker-Phosphat-Bänder sind die Seile, jeweils zwei Basen die Sprossen. Man spricht von der **DNA-Doppelhelix**.',
              src: [p(3)],
            },
            {
              kind: 'bullets',
              title: 'Komplementäre Basenpaarung',
              items: [
                'Gegenüberliegende Basen sind durch **Wasserstoffbrücken** verbunden.',
                'Nach dem Schlüssel-Schloss-Prinzip stehen nur **Adenin–Thymin** und **Guanin–Cytosin** einander gegenüber.',
                'A–T: **zwei** Wasserstoffbrücken · G–C: **drei** Wasserstoffbrücken.',
                'Ein Strang verläuft von 3\' nach 5\', der komplementäre von 5\' nach 3\' – die Stränge sind **gegenläufig (antiparallel)**.',
              ],
              src: [p(3)],
            },
            { kind: 'check', questionIds: ['da-q3', 'da-q6'] },
          ],
        },
        {
          id: 'chargaff',
          title: 'Die Chargaff-Regel',
          blocks: [
            {
              kind: 'text',
              md: 'Erwin **Chargaff** analysierte die Nucleotidzusammensetzung verschiedener Organismen. Jeder Organismus hat eine typische prozentuale Verteilung der vier Nucleotide. Außerdem gilt: Die Zahl der Adenin-Nucleotide entspricht der der Thymin-Nucleotide, die der Guanin- der der Cytosin-Nucleotide. Damit entspricht die Gesamtzahl der Purin-Basen (A + G) der der Pyrimidin-Basen (T + C).',
              src: [p(3, 'Material A')],
            },
            {
              kind: 'note',
              tone: 'inf',
              title: 'Warum das ein Hinweis auf die Struktur war',
              md: 'Wenn A immer so häufig ist wie T und G so häufig wie C, liegt nahe, dass diese Basen **paarweise** zusammengehören. Genau das beschreibt die komplementäre Basenpaarung im Doppelhelix-Modell.',
              src: [p(3)],
            },
            { kind: 'check', questionIds: ['da-q10'] },
          ],
        },
        {
          id: 'verpackung',
          title: 'Verpackung der DNA',
          blocks: [
            {
              kind: 'steps',
              title: 'Von der Doppelhelix zum Metaphase-Chromosom',
              steps: [
                { title: 'DNA-Doppelstrang', text: 'Die eukaryotische DNA ist an besondere Proteine, die **Histone**, gebunden.' },
                { title: 'Nucleosomen (11 nm)', text: 'Der Doppelstrang windet sich jeweils zweimal um einen Komplex aus mehreren Histonen (**Nucleosom**). Die perlschnurartige Kette ist 11 nm dick – die DNA ist um den Faktor 7 verkürzt.' },
                { title: 'Chromatinfaser (30 nm)', text: 'Wechselwirkungen zwischen Nucleosomen verdrillen die Kette zur **Chromatinfaser** (Faktor 14). So liegt das Chromatin in der **Interphase** vor.' },
                { title: 'Metaphase-Chromosom', text: 'In Pro- und Metaphase wird die Faser durch weitere Auffaltungen auf **1/8000** ihrer ursprünglichen Länge verkürzt und verdickt.' },
              ],
              src: [p(3)],
            },
            { kind: 'widget', widget: 'chromatin', caption: 'Verpackungsstufen mit den Maßen aus der Abbildung deiner PDF', src: [p(3, 'Abb. 5')] },
            { kind: 'check', questionIds: ['da-q8'] },
          ],
        },
      ],
    },
    {
      sub: 'replikation',
      intro: 'Bevor sich eine Zelle teilt, verdoppelt sie ihre DNA. Wie läuft das ab – und wie wurde das Prinzip bewiesen?',
      sections: [
        {
          id: 'prinzip',
          title: 'Grundprinzip: semikonservativ',
          blocks: [
            {
              kind: 'text',
              md: 'Vor jeder Mitose werden in der Interphase aus Ein-Chromatid- Zwei-Chromatiden-Chromosomen gebildet. Dabei wird die DNA identisch verdoppelt: die **Replikation**.\n\nDie Doppelhelix wird abschnittsweise wie ein Reißverschluss getrennt; es entsteht eine Y-förmige **Replikationsgabel**. Jeder Einzelstrang dient als Vorlage: An die freien Basen lagern sich nach der Basenpaarungsregel komplementäre Nucleotide an. Es entstehen zwei identische Doppelstränge aus je einem alten und einem neuen Strang – die Replikation ist **semikonservativ**.',
              src: [p(4)],
            },
            {
              kind: 'compare',
              title: 'Drei diskutierte Modelle',
              columns: ['semikonservativ', 'konservativ', 'dispersiv'],
              rows: [
                {
                  label: 'Neue Doppelstränge',
                  cells: ['je ein alter und ein neuer Einzelstrang', 'alter Doppelstrang bleibt komplett erhalten, der andere ist ganz neu', 'stückweise aus alter und neuer DNA'],
                },
              ],
              src: [p(4, 'Material A')],
            },
          ],
        },
        {
          id: 'meselson',
          title: 'Der Beweis: Meselson und Stahl (1958)',
          blocks: [
            {
              kind: 'text',
              md: 'Bakterien wuchsen über mehrere Teilungen in Medium mit dem schweren Stickstoff-Isotop **¹⁵N**, das sie zum Bau der Basen nutzen. Dann kamen sie für die Dauer **einer** Replikation in Medium mit leichtem **¹⁴N**, anschließend für eine weitere. Nach jedem Schritt wurde die DNA isoliert und einer **Dichtezentrifugation** unterzogen.',
              src: [p(4, 'Material A')],
            },
            { kind: 'widget', widget: 'meselson', caption: 'Wähle Modell und Replikation – vergleiche mit der Beobachtung.', src: [p(4, 'Material A')] },
            {
              kind: 'bullets',
              title: 'Beobachtung',
              items: ['Ausgangs-DNA im ¹⁵N-Medium: eine **schwere** Bande.', 'Nach einer Replikation in ¹⁴N: eine **mittelschwere** Bande (¹⁵N/¹⁴N).', 'Nach einer weiteren Replikation: **leichte** und **mittelschwere** DNA.'],
              src: [p(4, 'Material A')],
            },
            { kind: 'check', questionIds: ['rep-q10', 'rep-q11'] },
          ],
        },
        {
          id: 'ablauf',
          title: 'Ablauf an der Replikationsgabel',
          blocks: [
            {
              kind: 'steps',
              steps: [
                { title: 'Start', text: 'Die Replikation beginnt an einer bestimmten Sequenz, dem **Replikationsursprung**. Dort wird die DNA entwunden.' },
                { title: 'Helicase', text: 'Die **Helicase** trennt die beiden Einzelstränge – die Replikationsgabel entsteht.' },
                { title: 'Primase', text: 'Die **Primase** bildet komplementär zu einem kurzen Abschnitt des alten Strangs ein Startermolekül, den **Primer**.' },
                { title: 'DNA-Polymerase', text: 'Die **DNA-Polymerase** bindet am 3\'-Ende des Primers komplementär freie Nucleotide. Sie kann Nucleotide **nur an ein 3\'-Ende** anhängen.' },
                { title: 'Leitstrang', text: 'Weil die Stränge antiparallel sind, ist eine kontinuierliche Synthese in Richtung der Gabel nur an einem Strang möglich: dem **Leitstrang**.' },
                { title: 'Folgestrang', text: 'Am anderen Strang wird von der Gabel weg synthetisiert. Immer wieder entstehen neue Primer und dazwischen DNA-Stücke, die **Okazaki-Fragmente** – die Synthese ist diskontinuierlich.' },
                { title: 'Abschluss', text: 'Ein weiteres Enzym baut die Primer ab, die Lücken werden gefüllt. Die **DNA-Ligase** verknüpft die Okazaki-Fragmente zu einem durchgehenden Strang.' },
              ],
              src: [p(5)],
            },
            { kind: 'widget', widget: 'replication-fork', caption: 'Replikationsgabel – tippe auf die Nummern, um die Beteiligten zu sehen.', src: [p(5, 'Abb. 3')] },
            { kind: 'check', questionIds: ['rep-q3', 'rep-q8'] },
          ],
        },
        {
          id: 'fehler',
          title: 'Fehlerkorrektur',
          blocks: [
            {
              kind: 'compare',
              columns: ['Korrekturlesen', 'Fehlpaarungsreparatur'],
              rows: [
                { label: 'Wer?', cells: ['die DNA-Polymerase selbst', 'andere Enzyme (Reparaturenzyme)'] },
                { label: 'Wann?', cells: ['direkt nach dem Einbau eines Nucleotids', 'im Anschluss an die Replikation'] },
                {
                  label: 'Wie?',
                  cells: [
                    'erkennt eine fehlerhafte Paarung, entfernt das falsche Nucleotid, ersetzt es und fährt fort',
                    'entfernen im neuen Strang das fehlgepaarte Nucleotid mit einigen Nachbarn; eine Polymerase füllt die Lücke',
                  ],
                },
              ],
              src: [p(5)],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Woran der Originalstrang erkannt wird',
              md: 'Zunächst ist nur der **Originalstrang** chemisch modifiziert: An bestimmte Basen sind **Methylgruppen (–CH₃)** geknüpft. Der neu synthetisierte Strang wird erst später methyliert.',
              src: [p(5)],
            },
            { kind: 'check', questionIds: ['rep-q17'] },
          ],
        },
        {
          id: 'taylor',
          title: 'Das Taylor-Experiment',
          blocks: [
            {
              kind: 'text',
              md: 'James H. Taylor zog Wurzelspitzen der Saubohne in normalem Medium an, gab für die Dauer **eines** Zellzyklus radioaktiv markiertes **³H-Thymidin** hinzu und ließ sie einen weiteren Zyklus in normalem Thymidin wachsen. Die Metaphase-Chromosomen wurden durch **Autoradiografie** sichtbar gemacht: Markierte Chromatiden schwärzen eine lichtempfindliche Schicht.',
              src: [p(5, 'Material B')],
            },
            { kind: 'widget', widget: 'taylor', caption: 'Schritt für Schritt: Welche Chromatiden sind markiert?', src: [p(5, 'Material B')] },
            { kind: 'check', questionIds: ['rep-q16'] },
          ],
        },
      ],
    },
  ],

  // =========================================================================
  // FACHBEGRIFFE
  // =========================================================================
  terms: [
    { id: 'dt-nucleinsaeure', sub: 'dna-traeger', term: 'Nucleinsäuren', def: 'Gruppe von Makromolekülen, die Friedrich Miescher 1869 in Zellkernen entdeckte. Bekanntester Vertreter ist die DNA.', simple: 'Die Stoffklasse, zu der die DNA gehört.', src: [p(2)] },
    { id: 'dt-sstamm', sub: 'dna-traeger', term: 'S-Stamm', def: 'Bakterienstamm mit äußerer Kapsel, die ihn vor der Immunabwehr der Maus schützt; lebende S-Bakterien verursachen eine tödliche Lungenentzündung.', simple: 'Die „gefährlichen“ Bakterien mit Schutzhülle.', src: [p(2)] },
    { id: 'dt-rstamm', sub: 'dna-traeger', term: 'R-Stamm', def: 'Bakterienstamm ohne Kapsel; wird vom Immunsystem der Maus unschädlich gemacht.', simple: 'Die harmlosen Bakterien ohne Schutzhülle.', src: [p(2)] },
    { id: 'dt-transformation', sub: 'dna-traeger', term: 'Transformation', def: 'Übertragung von genetischer Information bei Bakterien (Begriff von Griffith). Avery zeigte, dass DNA der transformierende Stoff ist.', simple: 'Bakterien nehmen fremde Erbinformation auf und bekommen dadurch neue Eigenschaften.', src: [p(2)] },
    { id: 'da-desoxyribose', sub: 'dna-aufbau', term: 'Desoxyribose', def: 'Zucker der DNA; seine C-Atome werden von 1\' bis 5\' durchnummeriert.', simple: 'Der Zucker im „Rückgrat“ der DNA.', src: [p(3)] },
    { id: 'da-pyrimidin', sub: 'dna-aufbau', term: 'Pyrimidin-Basen', def: 'Basen mit einfachem Sechserring: Cytosin (C) und Thymin (T).', simple: 'Die „kleinen“ Basen C und T.', src: [p(3)] },
    { id: 'da-purin', sub: 'dna-aufbau', term: 'Purin-Basen', def: 'Basen mit größerem Doppelringsystem: Adenin (A) und Guanin (G).', simple: 'Die „großen“ Basen A und G.', src: [p(3)] },
    { id: 'da-nucleotid', sub: 'dna-aufbau', term: 'Nucleotid', def: 'Baustein aus Desoxyribose, Phosphatgruppe und einer Base; Base am 1\'-C-Atom, Phosphat am 5\'-C-Atom.', simple: 'Zucker + Phosphat + Base = ein Baustein.', src: [p(3)] },
    { id: 'da-polynucleotid', sub: 'dna-aufbau', term: 'Polynucleotid', def: 'Kette aus vielen Nucleotiden, die über Phosphatgruppen verbunden sind (5\'-Phosphat mit dem 3\'-C-Atom des nächsten Nucleotids).', simple: 'Ein DNA-Strang.', src: [p(3)] },
    { id: 'da-zpband', sub: 'dna-aufbau', term: 'Zucker-Phosphat-Band', def: 'Durch die Verknüpfung der Nucleotide entstehendes „Rückgrat“ eines Strangs; bildet in der Strickleiter die Seile.', simple: 'Das Geländer der DNA-Leiter.', src: [p(3)] },
    { id: 'da-enden', sub: 'dna-aufbau', term: '3\'-Ende / 5\'-Ende', def: 'Enden eines DNA-Strangs: am 3\'-Ende eine freie OH-Gruppe, am 5\'-Ende eine freie Phosphatgruppe.', simple: 'Die DNA hat eine Richtung – wie ein Pfeil mit Anfang und Spitze.', src: [p(3)] },
    { id: 'da-doppelhelix', sub: 'dna-aufbau', term: 'Doppelhelix', def: 'Räumliches DNA-Modell von Watson und Crick (1953): zwei antiparallele Polynucleotid-Stränge wie eine gedrehte Strickleiter.', simple: 'Eine verdrehte Leiter.', src: [p(3)] },
    { id: 'da-komplementaer', sub: 'dna-aufbau', term: 'Komplementäre Basenpaarung', def: 'Nur Adenin–Thymin (2 Wasserstoffbrücken) und Guanin–Cytosin (3 Wasserstoffbrücken) stehen einander gegenüber (Schlüssel-Schloss-Prinzip).', simple: 'Jede Base hat genau einen passenden Partner.', src: [p(3)] },
    { id: 'da-antiparallel', sub: 'dna-aufbau', term: 'antiparallel', def: 'Die beiden Stränge verlaufen gegenläufig: einer von 3\' nach 5\', der komplementäre von 5\' nach 3\'.', simple: 'Die Stränge zeigen in entgegengesetzte Richtungen.', src: [p(3)] },
    { id: 'da-histone', sub: 'dna-aufbau', term: 'Histone', def: 'Besondere Proteine, an die die eukaryotische DNA gebunden ist; mehrere Histone bilden einen kugeligen Komplex.', simple: 'Die „Spulen“, um die die DNA gewickelt ist.', src: [p(3)] },
    { id: 'da-nucleosom', sub: 'dna-aufbau', term: 'Nucleosom', def: 'Struktur aus einem Histon-Komplex, um den sich der DNA-Doppelstrang zweimal windet; Nucleosomen reihen sich zu einer 11 nm dicken Kette.', simple: 'DNA, zweimal um eine Proteinspule gewickelt.', src: [p(3)] },
    { id: 'da-chromatinfaser', sub: 'dna-aufbau', term: 'Chromatinfaser', def: 'Verdrillte, 30 nm dicke Faser aus Nucleosomen (Verkürzung um Faktor 14); so liegt das Chromatin in der Interphase vor.', simple: 'Die aufgewickelte Perlenkette.', src: [p(3)] },
    { id: 'da-chargaff', sub: 'dna-aufbau', term: 'Chargaff-Regel', def: 'Die Anzahl der Adenin-Nucleotide entspricht der der Thymin-Nucleotide, die der Guanin- der der Cytosin-Nucleotide; Purine = Pyrimidine.', simple: 'A = T und G = C – in jeder DNA.', src: [p(3, 'Material A')] },
    { id: 'rep-replikation', sub: 'replikation', term: 'Replikation', def: 'Identische Verdopplung der DNA vor der Zellteilung (in der Interphase).', simple: 'Die DNA wird kopiert.', src: [p(4)] },
    { id: 'rep-gabel', sub: 'replikation', term: 'Replikationsgabel', def: 'Y-förmige Struktur, die entsteht, wenn die Doppelhelix wie ein Reißverschluss in zwei Einzelstränge getrennt wird.', simple: 'Die Stelle, an der der Reißverschluss offen ist.', src: [p(4)] },
    { id: 'rep-semikonservativ', sub: 'replikation', term: 'semikonservative Replikation', def: 'Jeder neue Doppelstrang besteht aus einem alten (Vorlage) und einem neu synthetisierten Einzelstrang.', simple: 'Halb alt, halb neu.', src: [p(4)] },
    { id: 'rep-konservativ', sub: 'replikation', term: 'konservative Replikation', def: 'Diskutiertes Modell: Der alte Doppelstrang bleibt komplett erhalten, die beiden neuen Einzelstränge lagern sich zusammen.', simple: 'Original bleibt ganz, Kopie ist ganz neu.', src: [p(4, 'Material A')] },
    { id: 'rep-dispersiv', sub: 'replikation', term: 'dispersive Replikation', def: 'Diskutiertes Modell: Die neuen Doppelstränge bestehen stückweise aus alter und neu synthetisierter DNA.', simple: 'Alt und neu bunt gemischt.', src: [p(4, 'Material A')] },
    { id: 'rep-ursprung', sub: 'replikation', term: 'Replikationsursprung', def: 'Bestimmte DNA-Sequenz, an der die Replikation beginnt; dort wird die DNA entwunden.', simple: 'Der Startpunkt der Kopie.', src: [p(5)] },
    { id: 'rep-helicase', sub: 'replikation', term: 'Helicase', def: 'Enzym, das die beiden Einzelstränge voneinander trennt, sodass die Replikationsgabel entsteht.', simple: 'Der Reißverschluss-Öffner.', src: [p(5)] },
    { id: 'rep-polymerase', sub: 'replikation', term: 'DNA-Polymerase', def: 'Enzym, das DNA-Stränge verlängert, indem es komplementäre Nucleotide anbindet – nur an ein 3\'-Ende und nur mit Primer. Kontrolliert außerdem den Einbau (Korrekturlesen).', simple: 'Die Kopiermaschine, die Baustein für Baustein anhängt.', src: [p(5)] },
    { id: 'rep-primer', sub: 'replikation', term: 'Primer', def: 'Kurzes Startermolekül, das die DNA-Polymerase braucht; wird von der Primase komplementär zum alten Strang gebildet (in der Abbildung als RNA-Primer bezeichnet).', simple: 'Der Startblock, an den die Polymerase andockt.', src: [p(5)] },
    { id: 'rep-primase', sub: 'replikation', term: 'Primase', def: 'Enzym, das die Primer komplementär zu einer kurzen Nucleotidsequenz der alten Einzelstränge bildet.', simple: 'Legt die Startblöcke.', src: [p(5)] },
    { id: 'rep-leitstrang', sub: 'replikation', term: 'Leitstrang', def: 'Neuer Einzelstrang, der kontinuierlich in Richtung der Replikationsgabel synthetisiert wird.', simple: 'Der Strang, der am Stück kopiert wird.', src: [p(5)] },
    { id: 'rep-folgestrang', sub: 'replikation', term: 'Folgestrang', def: 'Neuer Einzelstrang, der von der Gabel weg in Stücken (Okazaki-Fragmente) diskontinuierlich synthetisiert wird.', simple: 'Der Strang, der in Stücken kopiert wird.', src: [p(5)] },
    { id: 'rep-okazaki', sub: 'replikation', term: 'Okazaki-Fragmente', def: 'DNA-Stücke des Folgestrangs, die zwischen den Primern entstehen; nach ihrem Entdecker benannt.', simple: 'Die Teilstücke des Folgestrangs.', src: [p(5)] },
    { id: 'rep-ligase', sub: 'replikation', term: 'DNA-Ligase', def: 'Enzym, das die Okazaki-Fragmente zu einem durchgehenden DNA-Einzelstrang verknüpft.', simple: 'Der Kleber für die Teilstücke.', src: [p(5)] },
    { id: 'rep-korrektur', sub: 'replikation', term: 'Korrekturlesen', def: 'Die DNA-Polymerase prüft direkt nach dem Einbau eines Nucleotids die Paarung und ersetzt ein falsch eingebautes Nucleotid.', simple: 'Die Polymerase kontrolliert ihre eigene Arbeit.', src: [p(5)] },
    { id: 'rep-fehlpaarung', sub: 'replikation', term: 'Fehlpaarungsreparatur', def: 'Enzyme erkennen übersehene Fehlpaarungen, identifizieren den (methylierten) Originalstrang und entfernen im neuen Strang das falsche Nucleotid samt Nachbarn; eine Polymerase füllt die Lücke.', simple: 'Die Nachkontrolle nach der Kopie.', src: [p(5)] },
    { id: 'rep-autoradiografie', sub: 'replikation', term: 'Autoradiografie', def: 'Nachweis radioaktiv markierter Strukturen: Sie schwärzen eine lichtempfindliche Schicht (Fotoplatte).', simple: 'Radioaktive Stellen „fotografieren“ sich selbst.', src: [p(5, 'Material B'), p(8)] },
  ],

  // =========================================================================
  // KARTEIKARTEN (zusätzlich zu den Begriffskarten)
  // =========================================================================
  cards: [
    { id: 'dt-c1', sub: 'dna-traeger', kind: 'experiment', front: 'Griffith: Mäuse erhalten hitzegetötete S-Bakterien **und** lebende R-Bakterien. Ergebnis?', back: 'Die Mäuse sterben an Lungenentzündung; in ihrem Blut finden sich lebende Bakterien mit Kapsel. R-Bakterien wurden durch einen Stoff aus dem S-Stamm umgewandelt (Transformation).', src: [p(2)], prov: 'pdf' },
    { id: 'dt-c2', sub: 'dna-traeger', kind: 'experiment', front: 'Avery 1944: Was geschah, als isolierte DNA aus S-Bakterien zu R-Bakterien gegeben wurde?', back: 'Nach einiger Zeit enthielt die Kultur R- und S-Bakterien. Mit Proteinen passierte nichts. → DNA ist der transformierende Stoff und Träger der Erbinformation.', src: [p(2)], prov: 'pdf' },
    { id: 'dt-c3', sub: 'dna-traeger', kind: 'ursache', front: 'Ursache: Die S-Bakterien besitzen eine Kapsel. → Wirkung?', back: 'Die Kapsel schützt vor der Immunabwehr der Maus. Die Bakterien vermehren sich in der Lunge, die Maus stirbt an Lungenentzündung.', src: [p(2)], prov: 'pdf' },
    { id: 'dt-c4', sub: 'dna-traeger', kind: 'frage', front: 'Warum galten Proteine lange als Träger der Erbinformation?', back: 'Wegen ihrer Vielfalt und Spezifität – außerdem sind im Zellkern stets auch Proteine enthalten.', src: [p(2)], prov: 'pdf' },
    { id: 'da-c1', sub: 'dna-aufbau', kind: 'frage', front: 'Wie viele Wasserstoffbrücken bilden A–T und G–C?', back: 'A–T: zwei · G–C: drei.', src: [p(3)], prov: 'pdf' },
    { id: 'da-c2', sub: 'dna-aufbau', kind: 'vergleich', front: 'Purin-Basen vs. Pyrimidin-Basen', back: 'Purine (A, G): größeres Doppelringsystem.\nPyrimidine (C, T): einfacher Sechserring.', src: [p(3)], prov: 'pdf' },
    { id: 'da-c3', sub: 'dna-aufbau', kind: 'prozess', front: 'Wie entsteht das Zucker-Phosphat-Band?', back: 'Die Phosphatgruppe am 5\'-C-Atom eines Nucleotids wird mit dem 3\'-C-Atom des folgenden Nucleotids verknüpft.', src: [p(3)], prov: 'pdf' },
    { id: 'da-c4', sub: 'dna-aufbau', kind: 'prozess', front: 'Verpackungsstufen der DNA (mit Maßen)', back: 'DNA-Doppelstrang (2 nm) → Nucleosomen-Kette (11 nm, Faktor 7) → Chromatinfaser (30 nm, Faktor 14, Interphase) → Metaphase-Chromosom (auf 1/8000 verkürzt).', src: [p(3)], prov: 'pdf' },
    { id: 'da-c5', sub: 'dna-aufbau', kind: 'experiment', front: 'Chargaff: Was zeigte die Analyse der Nucleotidzusammensetzung?', back: 'Jeder Organismus hat eine typische Verteilung. Außerdem: A = T, G = C, also Purine = Pyrimidine.', src: [p(3, 'Material A')], prov: 'pdf' },
    { id: 'da-c6', sub: 'dna-aufbau', kind: 'frage', front: 'Was sind die „Seile“ und die „Sprossen“ der DNA-Strickleiter?', back: 'Seile: die Zucker-Phosphat-Bänder. Sprossen: jeweils zwei gepaarte Basen.', src: [p(3)], prov: 'pdf' },
    { id: 'rep-c1', sub: 'replikation', kind: 'vergleich', front: 'Leitstrang vs. Folgestrang', back: 'Leitstrang: kontinuierlich, in Richtung der Gabel.\nFolgestrang: diskontinuierlich, von der Gabel weg, in Okazaki-Fragmenten mit immer neuen Primern; DNA-Ligase verknüpft.', src: [p(5)], prov: 'pdf' },
    { id: 'rep-c2', sub: 'replikation', kind: 'frage', front: 'Warum braucht die DNA-Polymerase einen Primer?', back: 'Sie ist auf ein Startermolekül angewiesen: Sie kann Nucleotide nur an das 3\'-Ende eines vorhandenen Strangs anhängen.', src: [p(5)], prov: 'pdf' },
    { id: 'rep-c3', sub: 'replikation', kind: 'experiment', front: 'Meselson-Stahl: Bande nach **einer** Replikation im ¹⁴N-Medium?', back: 'Nur eine mittelschwere Bande (¹⁵N/¹⁴N). Das schließt das konservative Modell aus.', src: [p(4, 'Material A')], prov: 'pdf' },
    { id: 'rep-c4', sub: 'replikation', kind: 'experiment', front: 'Meselson-Stahl: Banden nach **zwei** Replikationen im ¹⁴N-Medium?', back: 'Leichte und mittelschwere DNA – passend zur semikonservativen Replikation.', src: [p(4, 'Material A')], prov: 'pdf' },
    { id: 'rep-c5', sub: 'replikation', kind: 'experiment', front: 'Taylor: Welche Chromatiden sind nach dem weiteren Zyklus in normalem Thymidin markiert?', back: 'Jeweils nur eines der beiden Chromatiden jedes Chromosoms (nach dem markierten Zyklus waren beide markiert).', src: [p(5, 'Material B')], prov: 'pdf' },
    { id: 'rep-c6', sub: 'replikation', kind: 'ursache', front: 'Ursache: Die DNA-Stränge verlaufen antiparallel und die Polymerase verlängert nur am 3\'-Ende. → Wirkung?', back: 'Nur ein Strang kann kontinuierlich zur Gabel hin kopiert werden (Leitstrang); der andere wird in Stücken von der Gabel weg synthetisiert (Folgestrang, Okazaki-Fragmente).', src: [p(5)], prov: 'pdf' },
    { id: 'rep-c7', sub: 'replikation', kind: 'frage', front: 'Woran erkennen Reparaturenzyme den Originalstrang?', back: 'Nur der Originalstrang trägt zunächst Methylgruppen an bestimmten Basen; der neue Strang wird erst später methyliert.', src: [p(5)], prov: 'pdf' },
    { id: 'rep-c8', sub: 'replikation', kind: 'abbildung', front: 'Welches Enzym ist in der Replikationsgabel mit Nummer 6 markiert?', back: 'Die DNA-Ligase – sie verknüpft die Okazaki-Fragmente des Folgestrangs.', src: [p(5, 'Abb. 3')], prov: 'pdf', figure: { widget: 'replication-fork', highlight: '6' } },
  ],

  // =========================================================================
  // FRAGEN
  // =========================================================================
  questions: [
    // ---------------- dna-traeger ----------------
    {
      id: 'dt-q1', sub: 'dna-traeger', type: 'single', level: 1, err: 'facts', prov: 'pdf', src: [p(2)],
      prompt: 'Wer entdeckte 1869 in Zellkernen die Stoffgruppe, die später Nucleinsäuren genannt wurde?',
      options: ['Friedrich Miescher', 'Fred Griffith', 'Oswald Avery', 'Erwin Chargaff'],
      answer: 0,
      why: [{ text: 'Der Schweizer Mediziner Friedrich Miescher entdeckte 1869 eine unbekannte Gruppe von Makromolekülen in Zellkernen – die Nucleinsäuren.', prov: 'pdf', src: [p(2)] }],
    },
    {
      id: 'dt-q2', sub: 'dna-traeger', type: 'tf', level: 1, err: 'terms', prov: 'pdf', src: [p(2)],
      prompt: 'Bakterien des R-Stammes besitzen eine Kapsel, die sie vor der Immunabwehr der Maus schützt.',
      answer: false,
      correction: 'Der S-Stamm besitzt die schützende Kapsel. Dem R-Stamm fehlt sie – er wird vom Immunsystem unschädlich gemacht.',
      why: [{ text: 'S-Stamm: Kapsel → Schutz vor Immunabwehr → Mäuse sterben. R-Stamm: keine Kapsel → Mäuse überleben.', prov: 'pdf', src: [p(2)] }],
    },
    {
      id: 'dt-q3', sub: 'dna-traeger', type: 'match', level: 2, err: 'experiment', prov: 'pdf', src: [p(2, 'Abb. 2')],
      prompt: 'Ordne jedem Ansatz von Griffith das Ergebnis zu.',
      pairs: [
        { left: 'lebende S-Bakterien', right: 'Maus stirbt' },
        { left: 'lebende R-Bakterien', right: 'Maus überlebt' },
        { left: 'hitzegetötete S-Bakterien', right: 'Maus überlebt' },
        { left: 'hitzegetötete S- + lebende R-Bakterien', right: 'Maus stirbt, lebende S-Bakterien im Blut' },
      ],
      why: [{ text: 'Nur der Ansatz mit toten S- und lebenden R-Bakterien führt zum überraschenden Ergebnis: Die harmlosen R-Bakterien wurden umgewandelt.', prov: 'pdf', src: [p(2)] }],
    },
    {
      id: 'dt-q4', sub: 'dna-traeger', type: 'single', level: 2, err: 'experiment', prov: 'pdf', src: [p(2)],
      prompt: 'Warum starben die Mäuse, die hitzegetötete S-Bakterien und lebende R-Bakterien erhielten?',
      options: [
        'R-Bakterien wurden durch einen Stoff aus den toten S-Bakterien zu kapselbildenden Bakterien umgewandelt.',
        'Die Hitze hatte die S-Bakterien nicht vollständig abgetötet.',
        'R-Bakterien sind in großer Menge ebenfalls tödlich.',
        'Die toten S-Bakterien schwächten das Immunsystem der Mäuse.',
      ],
      answer: 0,
      feedback: { 1: 'Der Kontrollansatz mit nur hitzegetöteten S-Bakterien zeigt: Diese Mäuse überleben. Die S-Bakterien waren also wirklich tot.', 2: 'Im Ansatz mit nur lebenden R-Bakterien überlebten die Mäuse.' },
      why: [
        { text: 'Im Blut der toten Mäuse fanden sich lebende Bakterien mit Kapsel. Die Fähigkeit zur Kapselbildung trat auch in den Folgegenerationen auf – Griffith nannte das Transformation.', prov: 'pdf', src: [p(2)] },
        { text: 'Die übrigen Ansätze sind Kontrollen: Sie schließen aus, dass tote S-Bakterien oder lebende R-Bakterien allein die Mäuse töten.', prov: 'inf' },
      ],
    },
    {
      id: 'dt-q5', sub: 'dna-traeger', type: 'single', level: 2, err: 'experiment', prov: 'pdf', src: [p(2)],
      prompt: 'Welche Beobachtung zeigte, dass die Umwandlung der R-Bakterien erblich war?',
      options: [
        'Die Fähigkeit zur Kapselbildung trat auch in den Folgegenerationen auf.',
        'Die Mäuse starben an einer Lungenentzündung.',
        'Die S-Bakterien waren durch Hitze abgetötet.',
        'Die R-Bakterien wurden vom Immunsystem erkannt.',
      ],
      answer: 0,
      why: [{ text: 'Eine erbliche Veränderung wird an die Nachkommen weitergegeben – die Kapselbildung trat auch in den Folgegenerationen auf.', prov: 'pdf', src: [p(2)] }],
    },
    {
      id: 'dt-q6', sub: 'dna-traeger', type: 'cloze', level: 1, err: 'terms', prov: 'pdf', src: [p(2)],
      prompt: 'Ergänze die Lücken.',
      text: 'Griffith bezeichnete die Übertragung genetischer Information bei Bakterien als {{0}}. {{1}} zeigte 1944, dass {{2}} der dafür verantwortliche Stoff ist.',
      gaps: [
        { accept: ['Transformation'], options: ['Transformation', 'Replikation', 'Mutation', 'Transkription'] },
        { accept: ['Avery', 'Oswald Avery'], options: ['Avery', 'Miescher', 'Chargaff', 'Watson'] },
        { accept: ['DNA', 'die DNA'], options: ['DNA', 'Protein', 'die Kapsel', 'Zucker'] },
      ],
      why: [{ text: 'Griffith (1928) prägte den Begriff Transformation, konnte sie aber auf keinen Stoff zurückführen. Avery (1944) zeigte mit isolierter DNA und isolierten Proteinen: Die DNA transformiert.', prov: 'pdf', src: [p(2)] }],
    },
    {
      id: 'dt-q7', sub: 'dna-traeger', type: 'single', level: 2, err: 'experiment', prov: 'pdf', src: [p(2)],
      prompt: 'Avery gab isolierte **Proteine** aus S-Bakterien zu einer Kultur von R-Bakterien. Was beobachtete er?',
      options: ['Die R-Bakterien veränderten sich nicht.', 'Es entstanden S-Bakterien.', 'Die R-Bakterien starben ab.', 'Die R-Bakterien bildeten eine doppelte Kapsel.'],
      answer: 0,
      why: [{ text: 'Mit Proteinen blieb die Kultur unverändert. Nur mit DNA fanden sich nach einiger Zeit auch S-Bakterien.', prov: 'pdf', src: [p(2)] }],
    },
    {
      id: 'dt-q8', sub: 'dna-traeger', type: 'free', level: 2, err: 'experiment', prov: 'pdf', src: [p(2)], operator: 'Erklären',
      prompt: 'Erkläre, warum man lange Proteine für die Träger der Erbinformation hielt – und wie Avery zeigte, dass es die DNA ist.',
      rubric: [
        { id: 'vielfalt', label: 'Proteine galten wegen ihrer Vielfalt und Spezifität (und weil sie im Zellkern vorkommen) als Erbträger', any: [['protein', 'vielf|spezifi|verschieden']], weight: 1 },
        { id: 'isoliert', label: 'Avery isolierte Proteine und DNA aus hitzegetöteten S-Bakterien', any: [['isolier|getrennt|trennt', 'dna'], ['avery', 'dna', 'protein']], weight: 1 },
        { id: 'dna-wirkt', label: 'Nur mit DNA wurden R-Bakterien zu S-Bakterien umgewandelt (Proteine ohne Wirkung)', any: [['dna', 's bakterien|s stamm|kapsel|umgewandelt|transformier'], ['protein', 'keine|nicht|unveraendert']], weight: 1.5 },
        { id: 'schluss', label: 'Schluss: DNA enthält die Information (für die Kapselbildung) und ist Träger der Erbinformation', any: [['dna', 'traeger|erbinformation|erbgut|information|transformierend']], weight: 1 },
      ],
      model: 'Proteine sind sehr vielfältig und spezifisch und kommen im Zellkern stets vor – deshalb hielt man sie lange für die Träger der Erbinformation. Avery isolierte 1944 aus hitzegetöteten S-Bakterien getrennt die Proteine und die DNA und gab sie jeweils zu R-Bakterien. Mit den Proteinen veränderten sich die R-Bakterien nicht, mit der DNA traten nach einiger Zeit auch S-Bakterien auf. Die DNA ist also der transformierende Stoff: Sie enthält die Information für die Kapselbildung und ist Träger der Erbinformation.',
      why: [{ text: 'Averys Versuch trennt die möglichen Kandidaten (Protein oder DNA) und testet jeden einzeln – so lässt sich die Wirkung eindeutig einem Stoff zuordnen.', prov: 'inf', src: [p(2)] }],
    },
    {
      id: 'dt-q9', sub: 'dna-traeger', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(2)], operator: 'Begründen',
      prompt: 'Ein Forscher behandelt den Extrakt aus hitzegetöteten S-Bakterien vor der Zugabe zu R-Bakterien mit einem Enzym, das **nur DNA** abbaut. Welches Ergebnis erwartest du? Begründe mit Averys Befunden.',
      rubric: [
        { id: 'keine', label: 'Es entstehen keine S-Bakterien / keine Transformation (nur R-Bakterien)', any: [['kein|nicht|nur r', 'transform|s bakterien|s stamm|kapsel|umwandl|umgewandelt|r bakterien']], weight: 1.5 },
        { id: 'dna-abgebaut', label: 'Die DNA – der transformierende Stoff – ist abgebaut', any: [['dna', 'abgebaut|zerstoert|abbau|fehlt|nicht mehr']], weight: 1 },
        { id: 'avery', label: 'Begründung: Avery zeigte, dass die DNA (nicht Protein) die Information für die Kapselbildung trägt', any: [['dna', 'traeger|information|verantwortlich|transformierend|kapselbildung']], weight: 1 },
      ],
      model: 'Es entstehen keine S-Bakterien, die Kultur enthält nur R-Bakterien. Averys Versuch zeigte, dass die DNA der für die Transformation verantwortliche Stoff ist und die Information für die Kapselbildung enthält. Baut das Enzym die DNA ab, fehlt dieser Stoff – die Proteine allein bewirken keine Umwandlung.',
      why: [
        { text: 'Das Szenario ist eine Transferaufgabe (nicht in deiner PDF). Die Lösung folgt aus Averys Ergebnis: Proteine allein verändern R-Bakterien nicht, DNA schon.', prov: 'inf', src: [p(2)] },
      ],
    },
    {
      id: 'dt-q10', sub: 'dna-traeger', type: 'single', level: 3, err: 'experiment', prov: 'inf', src: [p(2, 'Abb. 2')],
      prompt: 'Angenommen, Griffith hätte Mäusen hitzegetötete S-Bakterien zusammen mit hitzegetöteten R-Bakterien gespritzt. Was wäre zu erwarten?',
      options: [
        'Die Mäuse überleben – es gibt keine lebenden Bakterien, die umgewandelt werden und sich vermehren könnten.',
        'Die Mäuse sterben, weil die toten R-Bakterien in S-Bakterien umgewandelt werden.',
        'Die Mäuse sterben, weil sich die toten S-Bakterien wieder vermehren.',
        'Die Mäuse sterben, weil tote Bakterien in größerer Menge immer tödlich sind.',
      ],
      answer: 0,
      feedback: { 1: 'Umgewandelt wurden in Griffiths Versuch lebende R-Bakterien – tote Bakterien können sich nicht mehr vermehren.' },
      why: [
        { text: 'Hitzegetötete S-Bakterien allein waren für die Mäuse ungefährlich. Tödlich war erst die Kombination mit lebenden R-Bakterien, die zu kapselbildenden Bakterien umgewandelt wurden.', prov: 'pdf', src: [p(2)] },
        { text: 'Der Ansatz ist ausgedacht (nicht in deiner PDF): Ohne lebende Bakterien kann keine Transformation mit anschließender Vermehrung stattfinden.', prov: 'inf' },
      ],
    },
    // ---------------- dna-aufbau ----------------
    {
      id: 'da-q1', sub: 'dna-aufbau', type: 'multi', level: 1, err: 'facts', prov: 'pdf', src: [p(3)],
      prompt: 'Welche Bestandteile sind am Bau der DNA beteiligt?',
      options: ['Desoxyribose', 'Phosphorsäure', 'organische Basen', 'Ribose', 'Aminosäuren'],
      answers: [0, 1, 2],
      why: [{ text: 'DNA besteht aus dem Zucker Desoxyribose, Phosphorsäure und organischen Basen. Ribose ist der Zucker der RNA (PDF S. 10).', prov: 'pdf', src: [p(3), p(10)] }],
    },
    {
      id: 'da-q2', sub: 'dna-aufbau', type: 'match', level: 1, err: 'terms', prov: 'pdf', src: [p(3)],
      prompt: 'Ordne jede Base ihrer Gruppe zu.',
      pairs: [
        { left: 'Adenin', right: 'Purin-Base (Doppelring)' },
        { left: 'Guanin', right: 'Purin-Base (Doppelring)' },
        { left: 'Cytosin', right: 'Pyrimidin-Base (Sechserring)' },
        { left: 'Thymin', right: 'Pyrimidin-Base (Sechserring)' },
      ],
      why: [{ text: 'Pyrimidine: C und T (einfacher Sechserring). Purine: A und G (Doppelringsystem).', prov: 'pdf', src: [p(3)] }],
    },
    {
      id: 'da-q3', sub: 'dna-aufbau', type: 'tf', level: 1, err: 'facts', prov: 'pdf', src: [p(3)],
      prompt: 'Zwischen Guanin und Cytosin werden zwei Wasserstoffbrücken ausgebildet.',
      answer: false,
      correction: 'Zwischen G und C bilden sich drei, zwischen A und T zwei Wasserstoffbrücken.',
      why: [{ text: 'A–T: zwei Wasserstoffbrücken, G–C: drei.', prov: 'pdf', src: [p(3)] }],
    },
    {
      id: 'da-q4', sub: 'dna-aufbau', type: 'cloze', level: 1, err: 'direction', prov: 'pdf', src: [p(3)],
      prompt: 'Ergänze die Lücken zum Bau eines Nucleotids.',
      text: 'Die Base ist an das {{0}}-Kohlenstoff-Atom und die Phosphatgruppe an das {{1}}-Kohlenstoff-Atom der Desoxyribose gebunden.',
      gaps: [
        { accept: ["1'", '1'], options: ["1'", "2'", "3'", "5'"] },
        { accept: ["5'", '5'], options: ["1'", "2'", "3'", "5'"] },
      ],
      why: [{ text: 'Base am 1\'-C-Atom, Phosphat am 5\'-C-Atom. Die Verknüpfung zum nächsten Nucleotid erfolgt über dessen 3\'-C-Atom.', prov: 'pdf', src: [p(3)] }],
    },
    {
      id: 'da-q5', sub: 'dna-aufbau', type: 'single', level: 1, err: 'direction', prov: 'pdf', src: [p(3)],
      prompt: 'Was befindet sich am 3\'-Ende eines DNA-Strangs?',
      options: ['eine freie OH-Gruppe', 'eine freie Phosphatgruppe', 'eine freie Base', 'ein Histon'],
      answer: 0,
      feedback: { 1: 'Die freie Phosphatgruppe liegt am 5\'-Ende.' },
      why: [{ text: 'Die Enden sind nach den freien Gruppen der Desoxyribose benannt: 3\'-Ende = freie OH-Gruppe, 5\'-Ende = freie Phosphatgruppe.', prov: 'pdf', src: [p(3)] }],
    },
    {
      id: 'da-q6', sub: 'dna-aufbau', type: 'input', level: 3, err: 'code', prov: 'inf', src: [p(3)], mode: 'seq',
      prompt: 'Ein DNA-Strang lautet `5\'-ATGCCTTA-3\'`. Gib den komplementären Strang an – direkt darunter geschrieben, also in 3\'→5\'-Richtung.',
      accept: ['TACGGAAT'],
      placeholder: "3'-…-5'",
      solution: "3'-TACGGAAT-5'",
      why: [
        { text: 'Komplementär paaren A–T und G–C. Der Gegenstrang verläuft antiparallel, also von 3\' nach 5\'.', prov: 'pdf', src: [p(3)] },
        { text: 'Base für Base: A→T, T→A, G→C, C→G, C→G, T→A, T→A, A→T ergibt TACGGAAT.', prov: 'inf' },
      ],
    },
    {
      id: 'da-q7', sub: 'dna-aufbau', type: 'single', level: 2, err: 'direction', prov: 'pdf', src: [p(3)],
      prompt: 'Warum bezeichnet man die beiden DNA-Stränge als antiparallel?',
      options: [
        'Sie verlaufen gegenläufig: Ein Strang läuft von 3\' nach 5\', der komplementäre von 5\' nach 3\'.',
        'Sie bestehen aus verschiedenen Zuckern.',
        'Sie sind nicht durch Wasserstoffbrücken verbunden.',
        'Ein Strang enthält nur Purine, der andere nur Pyrimidine.',
      ],
      answer: 0,
      why: [{ text: 'In der Doppelhelix verläuft ein Polynucleotid-Strang vom 3\'- zum 5\'-Ende, der komplementäre vom 5\'- zum 3\'-Ende.', prov: 'pdf', src: [p(3)] }],
    },
    {
      id: 'da-q8', sub: 'dna-aufbau', type: 'order', level: 2, err: 'sequence', prov: 'pdf', src: [p(3)],
      prompt: 'Bringe die Verpackungsstufen der DNA in die richtige Reihenfolge (vom dünnsten zum dicksten Zustand).',
      items: ['DNA-Doppelstrang (2 nm)', 'Kette von Nucleosomen (11 nm)', 'Chromatinfaser (30 nm)', 'Metaphase-Chromosom'],
      why: [{ text: 'DNA windet sich um Histone (Nucleosomen) → Nucleosomen verdrillen sich zur Chromatinfaser → in Pro-/Metaphase weitere Auffaltungen bis zum Metaphase-Chromosom.', prov: 'pdf', src: [p(3)] }],
    },
    {
      id: 'da-q9', sub: 'dna-aufbau', type: 'cloze', level: 2, err: 'facts', prov: 'pdf', src: [p(3)],
      prompt: 'Ergänze die Zahlen zur Verpackung der DNA.',
      text: 'Durch die Nucleosomen wird der DNA-Doppelstrang um den Faktor {{0}} verkürzt, in der Chromatinfaser um den Faktor {{1}}. Im Metaphase-Chromosom beträgt die Länge nur noch {{2}} der ursprünglichen Länge.',
      gaps: [
        { accept: ['7', 'sieben'], options: ['2', '7', '14', '30'] },
        { accept: ['14', 'vierzehn'], options: ['7', '11', '14', '30'] },
        { accept: ['1/8000', '1:8000'], options: ['1/14', '1/800', '1/8000', '1/80000'] },
      ],
      why: [{ text: 'Nucleosomen-Kette: Faktor 7 · Chromatinfaser (Interphase): Faktor 14 · Metaphase: 1/8000.', prov: 'pdf', src: [p(3)] }],
    },
    {
      id: 'da-q10', sub: 'dna-aufbau', type: 'input', level: 3, err: 'experiment', prov: 'inf', src: [p(3, 'Material A')], mode: 'number', tol: 0.15, unit: '%',
      prompt: 'Laut Chargaff-Tabelle enthält menschliche DNA 30,4 % Adenin und 30,1 % Thymin. Wie groß ist der Anteil von **Guanin und Cytosin zusammen**?',
      accept: ['39.5'],
      solution: '100 % − 30,4 % − 30,1 % = 39,5 %',
      why: [
        { text: 'Tabelle aus deiner PDF: Mensch – Adenin 30,4 %, Thymin 30,1 %.', prov: 'pdf', src: [p(3, 'Material A')] },
        { text: 'Die vier Anteile ergeben zusammen 100 %. Also G + C = 100 − 30,4 − 30,1 = 39,5 %. Nach der Chargaff-Regel entfallen davon je etwa 19,8 % auf G und auf C.', prov: 'inf' },
      ],
    },
    {
      id: 'da-q11', sub: 'dna-aufbau', type: 'free', level: 2, err: 'mechanism', prov: 'pdf', src: [p(3)], operator: 'Erläutern',
      prompt: 'Erläutere die komplementäre Basenpaarung in der DNA-Doppelhelix.',
      rubric: [
        { id: 'at', label: 'Adenin paart mit Thymin', any: [['adenin|\\ba\\b', 'thymin|\\bt\\b']], weight: 1 },
        { id: 'gc', label: 'Guanin paart mit Cytosin', any: [['guanin|\\bg\\b', 'cytosin|\\bc\\b']], weight: 1 },
        { id: 'hbr', label: 'Die Basen sind durch Wasserstoffbrücken verbunden', any: [['wasserstoff|h ?bruecke|h ?bindung']], weight: 1 },
        { id: 'anzahl', label: 'A–T: zwei, G–C: drei Wasserstoffbrücken', any: [['(zwei|2)', '(drei|3)']], weight: 1 },
        { id: 'passend', label: 'Nur passende (komplementäre) Basen stehen sich gegenüber – Schlüssel-Schloss-Prinzip', any: [['schluessel|schloss|nur|passend|komplementaer']], weight: 0.5 },
      ],
      misconceptions: [
        { id: 'ag', any: [['adenin (paart|bindet|verbindet) (sich )?(mit |an )?guanin'], ['guanin (paart|bindet|verbindet) (sich )?(mit |an )?adenin']], feedback: 'Adenin paart nicht mit Guanin – beide sind Purine. A paart mit T, G mit C.' },
      ],
      model: 'In der Doppelhelix stehen sich die Basen der beiden Stränge paarweise gegenüber und sind durch Wasserstoffbrücken verbunden. Nach dem Schlüssel-Schloss-Prinzip passen nur Adenin und Thymin sowie Guanin und Cytosin zueinander (komplementäre Basen). Zwischen A und T bilden sich zwei, zwischen G und C drei Wasserstoffbrücken.',
      why: [{ text: 'Die Paarungsregel ist die Grundlage für Replikation, Transkription und PCR: Jeder Strang legt die Basenfolge des Gegenstrangs fest.', prov: 'inf', src: [p(3)] }],
    },
    {
      id: 'da-q12', sub: 'dna-aufbau', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(3, 'Material A')], operator: 'Begründen',
      prompt: 'Begründe, warum die Chargaff-Regel ein wichtiger Hinweis auf den Aufbau der DNA war.',
      rubric: [
        { id: 'regel', label: 'A-Anteil = T-Anteil und G-Anteil = C-Anteil', any: [['adenin|\\ba\\b', 'thymin|\\bt\\b', 'gleich|entspricht|=|genauso'], ['a ?= ?t'], ['g ?= ?c']], weight: 1 },
        { id: 'paare', label: 'Das spricht dafür, dass jeweils A mit T und G mit C gepaart sind (Basenpaare)', any: [['paar|gegenueber|zusammen|komplementaer']], weight: 1.5 },
        { id: 'purin', label: 'Purine = Pyrimidine: je ein Purin liegt einem Pyrimidin gegenüber', any: [['purin', 'pyrimidin']], weight: 0.5 },
        { id: 'modell', label: 'Watson und Crick nutzten solche Befunde für ihr Doppelhelix-Modell', any: [['watson|crick|modell|doppelhelix']], weight: 0.5 },
      ],
      model: 'Chargaff fand in der DNA aller untersuchten Organismen gleich viele Adenin- wie Thymin-Nucleotide und gleich viele Guanin- wie Cytosin-Nucleotide; damit entspricht die Summe der Purine der der Pyrimidine. Diese Mengengleichheit ist genau dann zu erwarten, wenn sich A und T sowie G und C paarweise gegenüberstehen. Die Regel stützte damit die komplementäre Basenpaarung, die Watson und Crick in ihrem Doppelhelix-Modell auf Grundlage solcher Befunde beschrieben.',
      why: [
        { text: 'Die Regel selbst steht in Material A deiner PDF; die Begründung ist die Aufgabe dazu (Aufgabe 2).', prov: 'pdf', src: [p(3, 'Material A')] },
        { text: 'Mengengleichheit von A und T bzw. G und C ist eine direkte Folge davon, dass immer genau diese Basen einander gegenüberstehen.', prov: 'inf' },
      ],
    },
    // ---------------- replikation ----------------
    {
      id: 'rep-q1', sub: 'replikation', type: 'single', level: 1, err: 'enzyme', prov: 'pdf', src: [p(5)],
      prompt: 'Welches Enzym trennt die beiden Einzelstränge der DNA voneinander, sodass die Replikationsgabel entsteht?',
      options: ['Helicase', 'Primase', 'DNA-Polymerase', 'DNA-Ligase'],
      answer: 0,
      why: [{ text: 'Am Replikationsursprung wird die DNA entwunden; die Helicase lagert sich an und trennt die Einzelstränge.', prov: 'pdf', src: [p(5)] }],
    },
    {
      id: 'rep-q2', sub: 'replikation', type: 'single', level: 1, err: 'enzyme', prov: 'pdf', src: [p(5)],
      prompt: 'Welches Enzym bildet den Primer?',
      options: ['Primase', 'Helicase', 'DNA-Ligase', 'RNA-Polymerase'],
      answer: 0,
      why: [{ text: 'Die Primase bildet den Primer komplementär zu einer kurzen Nucleotidsequenz des alten Einzelstrangs.', prov: 'pdf', src: [p(5)] }],
    },
    {
      id: 'rep-q3', sub: 'replikation', type: 'single', level: 1, err: 'enzyme', prov: 'pdf', src: [p(5)],
      prompt: 'Welches Enzym verknüpft die Okazaki-Fragmente zu einem durchgehenden Strang?',
      options: ['DNA-Ligase', 'Primase', 'DNA-Polymerase', 'Helicase'],
      answer: 0,
      feedback: { 1: 'Die Primase bildet die Primer – sie verknüpft keine Fragmente.', 2: 'Die DNA-Polymerase verlängert Stränge und füllt Lücken, verknüpft aber nicht die Fragmente.' },
      why: [{ text: 'Zuletzt werden die Okazaki-Fragmente durch das Enzym DNA-Ligase zu einem durchgehenden DNA-Einzelstrang verknüpft.', prov: 'pdf', src: [p(5)] }],
    },
    {
      id: 'rep-q4', sub: 'replikation', type: 'tf', level: 1, err: 'direction', prov: 'pdf', src: [p(5)],
      prompt: 'Die DNA-Polymerase kann freie Nucleotide nur an das 3\'-Ende eines Polynucleotids binden.',
      answer: true,
      why: [{ text: 'Genau deshalb kann an einem der beiden antiparallelen Stränge nur diskontinuierlich synthetisiert werden.', prov: 'pdf', src: [p(5)] }],
    },
    {
      id: 'rep-q5', sub: 'replikation', type: 'order', level: 2, err: 'sequence', prov: 'pdf', src: [p(5)],
      prompt: 'Bringe die Schritte der DNA-Replikation in die richtige Reihenfolge.',
      items: [
        'DNA wird am Replikationsursprung entwunden',
        'Helicase trennt die Einzelstränge – Replikationsgabel entsteht',
        'Primase bildet einen Primer',
        'DNA-Polymerase hängt am 3\'-Ende komplementäre Nucleotide an',
        'Primer werden abgebaut und die Lücken gefüllt',
        'DNA-Ligase verknüpft die Okazaki-Fragmente',
      ],
      why: [{ text: 'Start am Replikationsursprung → Helicase → Primase → Polymerase → Primerabbau und Lückenfüllung → Ligase.', prov: 'pdf', src: [p(5)] }],
    },
    {
      id: 'rep-q6', sub: 'replikation', type: 'match', level: 2, err: 'enzyme', prov: 'pdf', src: [p(5)],
      prompt: 'Ordne jedem Enzym seine Aufgabe zu.',
      pairs: [
        { left: 'Helicase', right: 'trennt die beiden Einzelstränge' },
        { left: 'Primase', right: 'bildet das Startermolekül' },
        { left: 'DNA-Polymerase', right: 'hängt komplementäre Nucleotide an ein 3\'-Ende' },
        { left: 'DNA-Ligase', right: 'verknüpft Okazaki-Fragmente' },
      ],
      distractors: ['baut Aminosäuren ein'],
      why: [{ text: 'Jedes Enzym hat eine eigene Aufgabe in der Replikationsgabel.', prov: 'pdf', src: [p(5)] }],
    },
    {
      id: 'rep-q7', sub: 'replikation', type: 'label', level: 2, err: 'enzyme', prov: 'pdf', src: [p(5, 'Abb. 3')], widget: 'replication-fork',
      prompt: 'Beschrifte die Replikationsgabel.',
      labels: [
        { marker: '1', answer: 'Helicase' },
        { marker: '2', answer: 'Leitstrang' },
        { marker: '3', answer: 'Primase' },
        { marker: '4', answer: 'RNA-Primer' },
        { marker: '5', answer: 'Okazaki-Fragment' },
        { marker: '6', answer: 'DNA-Ligase' },
        { marker: '7', answer: 'Folgestrang' },
      ],
      why: [{ text: 'Die Helicase öffnet die Gabel; am Leitstrang arbeitet die Polymerase kontinuierlich, am Folgestrang entstehen zwischen Primern Okazaki-Fragmente, die die Ligase verbindet.', prov: 'pdf', src: [p(5)] }],
    },
    {
      id: 'rep-q8', sub: 'replikation', type: 'single', level: 2, err: 'direction', prov: 'pdf', src: [p(5)],
      prompt: 'Warum wird ein neuer Einzelstrang diskontinuierlich (in Okazaki-Fragmenten) synthetisiert?',
      options: [
        'Weil die Stränge antiparallel verlaufen und die Polymerase nur am 3\'-Ende verlängern kann – an diesem Strang also nur von der Gabel weg.',
        'Weil die Helicase den Strang in Stücke schneidet.',
        'Weil an diesem Strang zu wenige Nucleotide vorhanden sind.',
        'Weil die Primase nur am Leitstrang arbeiten kann.',
      ],
      answer: 0,
      why: [{ text: 'Kontinuierliche Synthese in Richtung der Gabel ist nur an einem Strang möglich (Leitstrang). Am Folgestrang entstehen mit fortschreitender Gabel immer neue Primer und Okazaki-Fragmente.', prov: 'pdf', src: [p(5)] }],
    },
    {
      id: 'rep-q9', sub: 'replikation', type: 'multi', level: 2, err: 'mechanism', prov: 'pdf', src: [p(4)],
      prompt: 'Welche Aussagen beschreiben die semikonservative Replikation?',
      options: [
        'Jeder neue Doppelstrang besteht aus einem alten und einem neu synthetisierten Einzelstrang.',
        'Beide alten Einzelstränge dienen als Vorlage.',
        'Der alte Doppelstrang bleibt komplett erhalten.',
        'Die neuen Doppelstränge bestehen stückweise aus alter und neuer DNA.',
      ],
      answers: [0, 1],
      why: [
        { text: 'Semikonservativ: je ein alter und ein neuer Strang. Jeder Einzelstrang ist Vorlage.', prov: 'pdf', src: [p(4)] },
        { text: '„Alter Doppelstrang bleibt erhalten“ beschreibt das konservative, „stückweise gemischt“ das dispersive Modell.', prov: 'pdf', src: [p(4, 'Material A')] },
      ],
    },
    {
      id: 'rep-q10', sub: 'replikation', type: 'single', level: 3, err: 'experiment', prov: 'inf', src: [p(4, 'Material A')],
      prompt: 'Nach **einer** Replikation im ¹⁴N-Medium fanden Meselson und Stahl nur mittelschwere DNA. Welches Modell ist damit widerlegt?',
      options: ['das konservative Modell', 'das semikonservative Modell', 'das dispersive Modell', 'keines der Modelle'],
      answer: 0,
      feedback: { 2: 'Auch das dispersive Modell sagt nach einer Replikation nur eine mittelschwere Bande voraus – es wird erst nach der zweiten Replikation widerlegt.' },
      why: [
        { text: 'Beobachtung laut PDF: nach einer Replikation mittelschwere DNA (¹⁵N/¹⁴N).', prov: 'pdf', src: [p(4, 'Material A')] },
        { text: 'Konservativ würde der alte Doppelstrang komplett schwer bleiben und ein komplett leichter neu entstehen → zwei Banden (schwer + leicht). Die fehlen.', prov: 'inf' },
      ],
    },
    {
      id: 'rep-q11', sub: 'replikation', type: 'single', level: 3, err: 'experiment', prov: 'pdf', src: [p(4, 'Material A')],
      prompt: 'Welches Bandenmuster zeigte die DNA nach der **zweiten** Replikation im ¹⁴N-Medium?',
      options: ['leichte und mittelschwere DNA', 'nur mittelschwere DNA', 'schwere und leichte DNA', 'nur schwere DNA'],
      answer: 0,
      why: [
        { text: 'Die Abbildung zeigt nach der weiteren Replikation leichte DNA (¹⁴N) und mittelschwere DNA (¹⁵N/¹⁴N).', prov: 'pdf', src: [p(4, 'Material A')] },
        { text: 'Semikonservativ: Die zwei mittelschweren Moleküle trennen sich; jeder alte ¹⁵N-Strang bekommt einen neuen ¹⁴N-Partner (mittelschwer), jeder ¹⁴N-Strang ebenfalls (leicht) → je 50 %.', prov: 'inf' },
      ],
    },
    {
      id: 'rep-q12', sub: 'replikation', type: 'single', level: 4, err: 'experiment', prov: 'inf', src: [p(4, 'Material A')],
      prompt: 'Welche Beobachtung nach der zweiten Replikation widerlegt das **dispersive** Modell?',
      options: [
        'Es tritt eine rein leichte Bande auf.',
        'Es tritt eine mittelschwere Bande auf.',
        'Es gibt keine schwere Bande mehr.',
        'Die DNA ist insgesamt leichter geworden.',
      ],
      answer: 0,
      why: [
        { text: 'Dispersiv enthielte jeder Doppelstrang stückweise alte und neue DNA. Nach zwei Replikationen wären alle Moleküle gleich (etwa ¼ schwer, ¾ leicht) → eine einzige Bande zwischen mittelschwer und leicht. Eine reine ¹⁴N-Bande ist so nicht möglich.', prov: 'inf' },
      ],
    },
    {
      id: 'rep-q13', sub: 'replikation', type: 'single', level: 4, err: 'experiment', prov: 'inf', src: [p(4, 'Material A')],
      prompt: 'Welches Bandenmuster erwartest du bei semikonservativer Replikation nach einer **dritten** Zellteilung im ¹⁴N-Medium?',
      options: ['¼ mittelschwer, ¾ leicht', '½ mittelschwer, ½ leicht', 'nur leicht', '¼ schwer, ¾ leicht'],
      answer: 0,
      why: [
        { text: 'Die beiden ursprünglichen ¹⁵N-Stränge bleiben erhalten und liegen nach jeder Runde in genau zwei Doppelsträngen vor. Nach drei Replikationen gibt es 8 Doppelstränge: 2 mittelschwer, 6 leicht.', prov: 'inf' },
        { text: 'Die Aufgabe stammt aus Material A deiner PDF (Aufgabe 4); die Lösung ist abgeleitet.', prov: 'pdf', src: [p(4, 'Material A')] },
      ],
    },
    {
      id: 'rep-q14', sub: 'replikation', type: 'free', level: 2, err: 'mechanism', prov: 'pdf', src: [p(5)], operator: 'Erklären',
      prompt: 'Erkläre, warum die DNA-Polymerase einen Primer benötigt und woher er kommt.',
      rubric: [
        { id: 'start', label: 'Die DNA-Polymerase ist auf ein Startermolekül angewiesen', any: [['start|primer|nicht (selbst|allein|neu)']], weight: 1 },
        { id: '3ende', label: 'Sie kann Nucleotide nur an ein vorhandenes 3\'-Ende anhängen', any: [["3'|3 ende|3 strich|drei strich"]], weight: 1.5 },
        { id: 'primase', label: 'Der Primer wird von der Primase gebildet', any: [['primase']], weight: 1 },
        { id: 'kompl', label: 'komplementär zu einem kurzen Abschnitt des alten Einzelstrangs', any: [['komplementaer|gegenueber|passend', 'strang|abschnitt|sequenz|vorlage']], weight: 0.5 },
      ],
      misconceptions: [
        { id: 'ligase-primer', any: [['ligase (bildet|synthetisiert|stellt|macht) (den |die |einen )?primer']], feedback: 'Den Primer bildet die Primase, nicht die Ligase. Die Ligase verknüpft die Okazaki-Fragmente.' },
      ],
      model: 'Die DNA-Polymerase kann Nucleotide nur an das 3\'-Ende eines bereits vorhandenen Strangs anhängen. Sie ist deshalb auf ein Startermolekül angewiesen, den Primer. Diesen bildet das Enzym Primase komplementär zu einer kurzen Nucleotidsequenz des alten Einzelstrangs. An das 3\'-Ende des Primers bindet die Polymerase dann freie Nucleotide.',
      why: [{ text: 'Am Folgestrang braucht die Polymerase deshalb immer wieder neue Primer.', prov: 'pdf', src: [p(5)] }],
    },
    {
      id: 'rep-q15', sub: 'replikation', type: 'free', level: 3, err: 'comparison', prov: 'pdf', src: [p(5)], operator: 'Vergleichen', compare: true,
      prompt: 'Vergleiche die Synthese von Leitstrang und Folgestrang hinsichtlich Richtung, Ablauf und beteiligter Enzyme. Nenne auch die Ursache für den Unterschied.',
      rubric: [
        { id: 'richtung', group: 'Richtung', label: 'Leitstrang in Richtung der Replikationsgabel, Folgestrang von der Gabel weg', any: [['richtung|zur gabel|hin', 'weg|entgegen']], weight: 1 },
        { id: 'kontinuierlich', group: 'Ablauf', label: 'Leitstrang kontinuierlich, Folgestrang diskontinuierlich', any: [['\\bkontinuierlich|am stueck|durchgehend', 'diskontinuierlich|stueck|fragment']], weight: 1.5 },
        { id: 'okazaki', group: 'Ablauf', label: 'Am Folgestrang entstehen Okazaki-Fragmente mit immer neuen Primern', any: [['okazaki'], ['fragment', 'primer']], weight: 1 },
        { id: 'ligase', group: 'Enzyme', label: 'Die DNA-Ligase verknüpft die Fragmente des Folgestrangs', any: [['ligase']], weight: 1 },
        { id: 'ursache', group: 'Ursache', label: 'Ursache: antiparallele Stränge und Polymerase verlängert nur am 3\'-Ende', any: [["antiparallel|gegenlaeufig|3'|3 ende"]], weight: 1.5 },
      ],
      model: 'Richtung: Der Leitstrang wird in Richtung der Replikationsgabel synthetisiert, der Folgestrang von der Gabel weg. Ablauf: Am Leitstrang arbeitet die DNA-Polymerase kontinuierlich; am Folgestrang werden mit fortschreitender Gabel immer wieder neue Primer gebildet, dazwischen entstehen Okazaki-Fragmente – die Synthese ist diskontinuierlich. Enzyme: An beiden Strängen arbeiten Primase und DNA-Polymerase; am Folgestrang werden zusätzlich die Primer abgebaut, die Lücken gefüllt und die Fragmente von der DNA-Ligase verknüpft. Ursache: Die Stränge verlaufen antiparallel, und die DNA-Polymerase kann Nucleotide nur an ein 3\'-Ende anhängen.',
      why: [{ text: 'Beide Unterschiede folgen aus einer Eigenschaft: der Polymerase-Richtung am 3\'-Ende in Kombination mit den gegenläufigen Strängen.', prov: 'inf' }],
    },
    {
      id: 'rep-q16', sub: 'replikation', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(5, 'Material B')], operator: 'Beschreiben und erklären',
      prompt: 'Beschreibe die Beobachtungen des Taylor-Experiments und erkläre sie mit dem Modell der semikonservativen Replikation.',
      material: [{ kind: 'widget', widget: 'taylor', caption: 'Schema nach Material B deiner PDF' }],
      rubric: [
        { id: 'beide', label: 'Nach dem Zyklus mit ³H-Thymidin sind beide Chromatiden markiert', any: [['beide|alle|zwei', 'markiert|radioaktiv|geschwaerzt|schwaerz']], weight: 1 },
        { id: 'eines', label: 'Nach dem weiteren Zyklus in normalem Thymidin ist je Chromosom nur ein Chromatid markiert', any: [['nur (noch )?(ein|eines|eine)\\b[^.]{0,30}chromatid'], ['jeweils (nur )?(ein|eines|eine)\\b[^.]{0,30}chromatid'], ['(ein|eines) (der|von) (beiden|zwei) chromatid'], ['chromatid\\w*[^.]{0,40}(nur|jeweils) (noch )?(ein|eines|eine)\\b'], ['haelfte der chromatiden']], weight: 1.5 },
        { id: 'doppelstrang', label: 'Jedes Chromatid enthält einen DNA-Doppelstrang aus einem alten und einem neuen Strang', any: [['alt', 'neu'], ['vorlage', 'strang']], weight: 1 },
        { id: 'zyklus1', label: 'Zyklus 1: Jeder Doppelstrang erhält einen markierten neuen Strang', any: [['markiert|radioaktiv', 'neu|eingebaut|eingebaut']], weight: 1 },
        { id: 'zyklus2', label: 'Zyklus 2: Die markierten Stränge dienen als Vorlage – nur ein Tochter-Doppelstrang enthält einen markierten Strang', any: [['vorlage|matrize', 'markiert|radioaktiv'], ['unmarkiert|nicht markiert|ohne markierung']], weight: 1 },
        { id: 'semi', label: 'Das bestätigt die semikonservative Replikation', any: [['semikonservativ']], weight: 0.5 },
      ],
      model: 'Beobachtung: Nach dem Zellzyklus in ³H-Thymidin sind in den Metaphase-Chromosomen beide Chromatiden radioaktiv markiert. Nach einem weiteren Zyklus in normalem Thymidin ist in jedem Chromosom nur noch eines der beiden Chromatiden markiert. Erklärung: Jedes Chromatid enthält einen DNA-Doppelstrang. Bei der Replikation im markierten Medium erhält jeder Doppelstrang einen neuen, markierten Strang neben dem alten, unmarkierten – beide Chromatiden sind markiert. Im nächsten Zyklus dienen der markierte und der unmarkierte Strang jeweils als Vorlage für einen neuen, unmarkierten Strang: Ein Tochter-Doppelstrang enthält den markierten Strang, der andere ist unmarkiert. Das entspricht der semikonservativen Replikation.',
      why: [
        { text: 'Versuchsaufbau und Beobachtung (Abbildung) stehen in Material B deiner PDF.', prov: 'pdf', src: [p(5, 'Material B')] },
        { text: 'Die Erklärung verbindet die Beobachtung mit dem Grundprinzip „je ein alter und ein neuer Strang“ (PDF S. 4).', prov: 'inf', src: [p(4)] },
      ],
    },
    {
      id: 'rep-q17', sub: 'replikation', type: 'free', level: 3, err: 'mechanism', prov: 'pdf', src: [p(5)], operator: 'Erklären',
      prompt: 'Erkläre, wie bei der Fehlpaarungsreparatur erkannt wird, welche Base falsch eingebaut wurde, und wie der Fehler behoben wird.',
      rubric: [
        { id: 'methyl', label: 'Der Originalstrang ist methyliert (Methylgruppen an bestimmten Basen)', any: [['methyl']], weight: 1.5 },
        { id: 'neu', label: 'Der neue Strang ist noch nicht methyliert → so wird der Originalstrang erkannt', any: [['neu|neusynthetisiert', 'nicht|noch nicht|erst spaeter|unmethyliert'], ['originalstrang|alter strang', 'erkenn']], weight: 1 },
        { id: 'entfernen', label: 'Im neuen Strang wird das fehlgepaarte Nucleotid (mit Nachbarn) entfernt', any: [['entfern|herausgeschnitten|ausgeschnitten|ausgebaut']], weight: 1 },
        { id: 'auffuellen', label: 'Eine Polymerase fügt das richtige Nucleotid ein und schließt die Lücke', any: [['polymerase|richtige|korrekte', 'ein|lueck|fuell|schliess']], weight: 1 },
      ],
      model: 'Zunächst ist nur der Originalstrang chemisch modifiziert: An bestimmte Basen sind Methylgruppen geknüpft, der neu synthetisierte Strang wird erst später methyliert. Daran erkennen die Enzyme der Fehlpaarungsreparatur den Originalstrang und damit, dass die falsche Base im neuen Strang sitzt. Sie entfernen im neuen Strang das fehlgepaarte Nucleotid zusammen mit einigen benachbarten Nucleotiden. Anschließend fügt eine Polymerase das richtige Nucleotid ein und schließt die Lücke.',
      why: [{ text: 'Beispiel aus deiner PDF: Adenin im Originalstrang wurde mit Cytosin gepaart – das C im neuen Strang wird entfernt und durch T ersetzt.', prov: 'pdf', src: [p(5)] }],
    },
    {
      id: 'rep-q18', sub: 'replikation', type: 'single', level: 1, err: 'terms', prov: 'pdf', src: [p(4)],
      prompt: 'Was ist die Replikationsgabel?',
      options: [
        'die Y-förmige Struktur, die entsteht, wenn die Doppelhelix wie ein Reißverschluss getrennt wird',
        'das Enzym, das die Stränge trennt',
        'der Startpunkt der Transkription',
        'die Stelle, an der zwei Chromatiden verbunden sind',
      ],
      answer: 0,
      why: [{ text: 'Die Doppelhelix wird abschnittsweise wie ein Reißverschluss getrennt – so entsteht die Y-förmige Replikationsgabel.', prov: 'pdf', src: [p(4)] }],
    },
    {
      id: 'rep-q19', sub: 'replikation', type: 'free', level: 5, err: 'mechanism', prov: 'inf', src: [p(5)], operator: 'Begründen',
      prompt: 'Bei einer Bakterienmutante ist die **DNA-Ligase** funktionslos. Beschreibe begründet, welche Folgen das für die Replikation hat – und warum Leit- und Folgestrang unterschiedlich betroffen sind.',
      rubric: [
        { id: 'fragmente', label: 'Die Okazaki-Fragmente werden nicht verknüpft', any: [['okazaki|fragment|stueck', 'nicht|keine|unverbunden|getrennt']], weight: 1.5 },
        { id: 'folge', label: 'Der Folgestrang bleibt unterbrochen / kein durchgehender Strang', any: [['folgestrang', 'unterbrochen|luecke|nicht durchgehend|stueck|bruchstueck|fragment']], weight: 1 },
        { id: 'leit', label: 'Der Leitstrang wird kontinuierlich synthetisiert und ist kaum betroffen', any: [['leitstrang', 'kontinuierlich|nicht betroffen|kaum|weniger|normal']], weight: 1 },
        { id: 'ergebnis', label: 'Es entstehen keine zwei vollständigen, intakten Doppelstränge', any: [['keine|nicht', 'vollstaendig|intakt|identisch|fertig|durchgehend']], weight: 0.5 },
      ],
      model: 'Ohne funktionsfähige DNA-Ligase werden die Okazaki-Fragmente des Folgestrangs nicht zu einem durchgehenden Strang verknüpft. Der neu synthetisierte Folgestrang bleibt deshalb in Stücken unterbrochen. Der Leitstrang ist kaum betroffen, weil er kontinuierlich in Richtung der Gabel synthetisiert wird und keine Fragmente verknüpft werden müssen. Die Replikation liefert so keine zwei vollständigen, intakten Doppelstränge.',
      why: [
        { text: 'Transferaufgabe: Das Szenario steht nicht in deiner PDF; die Folgerung ergibt sich aus der Aufgabe der Ligase (PDF S. 5).', prov: 'inf', src: [p(5)] },
      ],
    },
  ],

  // =========================================================================
  // EXPERIMENTE
  // =========================================================================
  experiments: [
    {
      id: 'exp-griffith', sub: 'dna-traeger', title: 'Transformationsversuche', who: 'Fred Griffith', year: '1928', src: [p(2)], widget: 'griffith',
      steps: [
        { key: 'frage', text: 'Griffith arbeitete an Impfstoffen gegen Bakterien, die Lungenentzündung verursachen. Er untersuchte, wie Mäuse auf verschiedene Bakterienstämme reagieren.', prov: 'pdf' },
        { key: 'material', text: 'Mäuse; S-Stamm (mit Kapsel); R-Stamm (ohne Kapsel); Hitze zum Abtöten der S-Bakterien.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'Vier Ansätze: A lebende S-Bakterien · B lebende R-Bakterien · C hitzegetötete S-Bakterien · D hitzegetötete S- plus lebende R-Bakterien.', prov: 'pdf' },
        { key: 'beobachtung', text: 'A: Maus stirbt, S-Bakterien im Blut · B: Maus überlebt · C: Maus überlebt · D: Maus stirbt, lebende S-Bakterien mit Kapsel im Blut.', prov: 'pdf', predict: 'Was passiert in Ansatz D, obwohl beide Komponenten allein harmlos sind?' },
        { key: 'ergebnis', text: 'R-Bakterien wurden durch einen Stoff aus dem S-Stamm zu kapselbildenden Bakterien umgewandelt; die Fähigkeit wurde vererbt.', prov: 'pdf' },
        { key: 'schluss', text: 'Griffith nannte die Übertragung genetischer Information Transformation, konnte sie aber keinem bestimmten Stoff zuordnen.', prov: 'pdf' },
        { key: 'methode', text: 'Die Ansätze B und C sind Kontrollen: Sie zeigen, dass weder lebende R-Bakterien noch tote S-Bakterien allein die Mäuse töten. Nur so lässt sich das Ergebnis von D als Umwandlung deuten.', prov: 'inf' },
      ],
      questionIds: ['dt-q3', 'dt-q4', 'dt-q5'],
    },
    {
      id: 'exp-avery', sub: 'dna-traeger', title: 'Transformation durch DNA', who: 'Oswald Avery', year: '1944', src: [p(2)],
      steps: [
        { key: 'frage', text: 'Welcher Stoff aus den S-Bakterien bewirkt die Transformation – Protein oder DNA?', prov: 'inf' },
        { key: 'hypothese', text: 'Wäre Protein der Träger der Erbinformation, müssten isolierte Proteine R-Bakterien umwandeln; wäre es DNA, müsste isolierte DNA das tun.', prov: 'inf' },
        { key: 'material', text: 'Hitzegetötete S-Bakterien, daraus mit neuen Methoden isolierte Proteine und DNA; Kulturen von R-Bakterien.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'Die isolierten Proteine bzw. die isolierte DNA wurden jeweils zu einer R-Kultur gegeben.', prov: 'pdf' },
        { key: 'beobachtung', text: 'Proteine: R-Bakterien verändern sich nicht. DNA: Nach einiger Zeit finden sich R- und S-Bakterien.', prov: 'pdf', predict: 'Welcher Ansatz führt zu S-Bakterien?' },
        { key: 'schluss', text: 'Die DNA ist der für die Transformation verantwortliche Stoff; sie enthält die Information für die Kapselbildung und ist Träger der Erbinformation.', prov: 'pdf' },
      ],
      questionIds: ['dt-q7', 'dt-q8', 'dt-q9'],
    },
    {
      id: 'exp-chargaff', sub: 'dna-aufbau', title: 'Die Chargaff-Regel', who: 'Erwin Chargaff', src: [p(3, 'Material A')],
      steps: [
        { key: 'frage', text: 'Wie sind die vier Nucleotide in der DNA verschiedener Organismen verteilt?', prov: 'inf' },
        { key: 'durchfuehrung', text: 'Chargaff und sein Team analysierten die Nucleotidzusammensetzung verschiedener Organismen (u. a. Lachs, Weizen, E. coli, Mensch, Rind).', prov: 'pdf' },
        { key: 'beobachtung', text: 'Jeder Organismus zeigt eine typische prozentuale Verteilung. Die Zahl der A-Nucleotide entspricht der der T-Nucleotide, die der G- der der C-Nucleotide.', prov: 'pdf', predict: 'Lachs hat 32,8 % Adenin. Wie viel Thymin erwartest du ungefähr?' },
        { key: 'ergebnis', text: 'Purine (A + G) = Pyrimidine (T + C).', prov: 'pdf' },
        { key: 'schluss', text: 'Die Mengengleichheit spricht dafür, dass sich A und T sowie G und C paarweise gegenüberstehen – ein wichtiger Hinweis für das Doppelhelix-Modell.', prov: 'inf' },
      ],
      questionIds: ['da-q10', 'da-q12'],
    },
    {
      id: 'exp-meselson', sub: 'replikation', title: 'Das Meselson-Stahl-Experiment', who: 'Matthew Meselson & Franklin Stahl', year: '1958', src: [p(4, 'Material A')], widget: 'meselson',
      steps: [
        { key: 'frage', text: 'Verläuft die Replikation semikonservativ, konservativ oder dispersiv?', prov: 'pdf' },
        { key: 'hypothese', text: 'Jedes Modell sagt andere Bandenmuster voraus, wenn DNA mit schwerem ¹⁵N in leichtem ¹⁴N-Medium repliziert wird.', prov: 'inf' },
        { key: 'material', text: 'E.-coli-Bakterien; Nährmedien mit schwerem ¹⁵N bzw. leichtem ¹⁴N (zum Bau der Basen genutzt); Dichtezentrifugation.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'Mehrere Teilungen in ¹⁵N-Medium → DNA isolieren und zentrifugieren. Dann eine Replikation in ¹⁴N → zentrifugieren. Dann eine weitere Replikation in ¹⁴N → zentrifugieren.', prov: 'pdf' },
        { key: 'beobachtung', text: 'Start: schwere DNA. Nach einer Replikation: mittelschwere DNA. Nach der zweiten: leichte und mittelschwere DNA.', prov: 'pdf', predict: 'Welches Muster erwartest du nach einer Replikation bei konservativer Replikation?' },
        { key: 'schluss', text: 'Nur das semikonservative Modell erklärt beide Beobachtungen: konservativ scheitert nach der ersten, dispersiv nach der zweiten Replikation.', prov: 'inf' },
        { key: 'methode', text: 'Die Dichtezentrifugation trennt DNA nach ihrer Dichte: DNA mit ¹⁵N ist schwerer als DNA mit ¹⁴N. So wird sichtbar, wie viel alte und neue DNA ein Molekül enthält.', prov: 'inf' },
      ],
      questionIds: ['rep-q10', 'rep-q11', 'rep-q12', 'rep-q13'],
    },
    {
      id: 'exp-taylor', sub: 'replikation', title: 'Das Taylor-Experiment', who: 'James H. Taylor', src: [p(5, 'Material B')], widget: 'taylor',
      steps: [
        { key: 'frage', text: 'Wie wird die DNA in Chromosomen verdoppelt – lässt sich die semikonservative Replikation an ganzen Chromosomen zeigen?', prov: 'inf' },
        { key: 'material', text: 'Wurzelspitzenzellen der Saubohne; normales und radioaktiv markiertes ³H-Thymidin; Autoradiografie.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'Anzucht in normalem Medium → ein Zellzyklus mit ³H-Thymidin → ein weiterer Zellzyklus mit normalem Thymidin; Metaphase-Chromosomen per Autoradiografie sichtbar gemacht.', prov: 'pdf' },
        { key: 'beobachtung', text: 'Nach dem markierten Zyklus: beide Chromatiden markiert. Nach dem weiteren Zyklus: in jedem Chromosom nur ein Chromatid markiert.', prov: 'pdf', predict: 'Wie viele Chromatiden sind nach dem zweiten, unmarkierten Zyklus markiert?' },
        { key: 'schluss', text: 'Jedes Chromatid enthält einen Doppelstrang aus einem alten und einem neuen Strang – das bestätigt die semikonservative Replikation.', prov: 'inf' },
      ],
      questionIds: ['rep-q16'],
    },
  ],

  // =========================================================================
  // KLAUSURTRAINING
  // =========================================================================
  examTasks: [
    {
      id: 'kt-chargaff',
      title: 'Chargaff-Tabelle auswerten',
      subs: ['dna-aufbau'],
      basedOn: 'Übung nach Material A „Die Chargaff-Regel“ aus deiner PDF (S. 3)',
      src: [p(3, 'Material A')],
      intro: 'Chargaff bestimmte die Nucleotidzusammensetzung der DNA verschiedener Organismen. Einige Werte fehlen in der Tabelle.',
      material: [
        {
          kind: 'table',
          head: ['', 'Adenin', 'Guanin', 'Cytosin', 'Thymin'],
          rows: [
            ['Lachs', '32,8 %', '17,7 %', '17,3 %', '32,2 %'],
            ['Weizen', '28,1 %', '21,8 %', '22,7 %', '?'],
            ['E. coli', '24,7 %', '26,0 %', '?', '?'],
            ['Mensch', '30,4 %', '?', '?', '30,1 %'],
            ['Rind', '29,0 %', '?', '?', '?'],
          ],
          caption: 'Werte aus der Tabelle deiner PDF (S. 3, Material A)',
        },
      ],
      parts: ['kt-ch-1', 'kt-ch-2', 'kt-ch-3', 'kt-ch-4'],
    },
    {
      id: 'kt-meselson',
      title: 'Replikationsmodelle prüfen',
      subs: ['replikation'],
      basedOn: 'Übung nach Material A „Das Meselson-Stahl-Experiment“ aus deiner PDF (S. 4)',
      src: [p(4, 'Material A')],
      intro: 'Meselson und Stahl ließen Bakterien zunächst in ¹⁵N-Medium wachsen und übertrugen sie dann für eine bzw. zwei Replikationen in ¹⁴N-Medium. Nach jedem Schritt wurde die DNA durch Dichtezentrifugation untersucht.',
      material: [{ kind: 'widget', widget: 'meselson', caption: 'Simulator: Modell und Generation wählen' }],
      parts: ['kt-ms-1', 'kt-ms-2', 'kt-ms-3'],
    },
  ],
};

/** Teilaufgaben der Klausurmaterialien (werden wie Fragen bewertet). */
grundlagen.questions.push(
  {
    id: 'kt-ch-1', sub: 'dna-aufbau', type: 'input', level: 4, err: 'experiment', prov: 'inf', src: [p(3, 'Material A')], mode: 'number', tol: 0.15, unit: '%',
    prompt: 'Berechne den fehlenden Thymin-Anteil für **Weizen**.',
    accept: ['27.4'],
    solution: '100 % − 28,1 % − 21,8 % − 22,7 % = 27,4 %',
    why: [
      { text: 'Bei Weizen sind drei Werte bekannt; der vierte ergibt sich aus der Summe 100 %.', prov: 'inf' },
      { text: 'Kontrolle mit der Chargaff-Regel: 27,4 % Thymin ≈ 28,1 % Adenin – passt ungefähr.', prov: 'inf' },
    ],
  },
  {
    id: 'kt-ch-2', sub: 'dna-aufbau', type: 'input', level: 4, err: 'experiment', prov: 'inf', src: [p(3, 'Material A')], mode: 'number', tol: 0.1, unit: '%',
    prompt: 'Berechne für den **Menschen** den Guanin-Anteil (Guanin und Cytosin sind nach Chargaff gleich häufig).',
    accept: ['19.75'],
    solution: '(100 % − 30,4 % − 30,1 %) : 2 = 39,5 % : 2 ≈ 19,75 % (gerundet 19,8 %)',
    why: [{ text: 'G + C = 100 − A − T = 39,5 %. Weil G = C gilt, entfallen auf jede Base etwa 19,75 %.', prov: 'inf' }],
  },
  {
    id: 'kt-ch-3', sub: 'dna-aufbau', type: 'input', level: 4, err: 'experiment', prov: 'inf', src: [p(3, 'Material A')], mode: 'number', tol: 0.1, unit: '%',
    prompt: 'Beim **Rind** ist nur der Adenin-Anteil (29,0 %) bekannt. Wie groß ist der Cytosin-Anteil?',
    accept: ['21'],
    solution: 'Thymin ≈ 29,0 % (= Adenin). G + C = 100 − 58,0 = 42,0 % → Cytosin ≈ 21,0 %',
    why: [{ text: 'Erst T = A nutzen, dann den Rest gleichmäßig auf G und C verteilen.', prov: 'inf' }],
  },
  {
    id: 'kt-ch-4', sub: 'dna-aufbau', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(3, 'Material A')], operator: 'Erklären',
    prompt: 'Erkläre dein Vorgehen beim Vervollständigen der Tabelle. Gehe auch auf E. coli ein, wo die Summe der ergänzten Werte nicht genau 100 % ergibt.',
    rubric: [
      { id: 'regel', label: 'Nutzung der Chargaff-Regel: A = T und G = C', any: [['a ?= ?t|adenin', 'g ?= ?c|guanin|thymin']], weight: 1.5 },
      { id: 'summe', label: 'Die vier Anteile ergeben zusammen 100 %', any: [['100']], weight: 1 },
      { id: 'ecoli', label: 'E. coli: T ≈ 24,7 %, C ≈ 26,0 % – Summe knapp über 100 %', any: [['coli|24|26']], weight: 0.5 },
      { id: 'messung', label: 'Abweichungen erklären sich durch Messungenauigkeit / Rundung (Regel gilt näherungsweise)', any: [['mess|rund|ungenau|naeherung|ungefaehr|schwank']], weight: 1 },
    ],
    model: 'Ich nutze zwei Zusammenhänge: Nach der Chargaff-Regel ist der Adenin- gleich dem Thymin-Anteil und der Guanin- gleich dem Cytosin-Anteil; außerdem ergeben alle vier Anteile zusammen 100 %. Bei Weizen fehlt nur ein Wert (T = 100 − Summe der anderen = 27,4 %). Beim Menschen ergibt sich G + C = 39,5 %, also je etwa 19,75 %. Beim Rind setze ich T = A = 29,0 % und verteile den Rest (42,0 %) gleich auf G und C (je 21,0 %). Bei E. coli ergibt T = A = 24,7 % und C = G = 26,0 % zusammen 101,4 % – die Regel gilt nur näherungsweise, weil die Werte gemessen und gerundet sind.',
    why: [{ text: 'Die Tabelle stammt aus deiner PDF, die Lösungswege sind abgeleitet. Deine PDF nennt keine Musterlösung.', prov: 'inf', src: [p(3, 'Material A')] }],
  },
  {
    id: 'kt-ms-1', sub: 'replikation', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(4, 'Material A')], operator: 'Beschreiben und erklären',
    prompt: 'Beschreibe die Beobachtungen in den drei Ansätzen und erkläre sie.',
    rubric: [
      { id: 'a', label: 'A: nach Wachstum in ¹⁵N nur schwere DNA (beide Stränge mit ¹⁵N)', any: [['schwer', '15|a\\b|ausgang|start']], weight: 1 },
      { id: 'b', label: 'B: nach einer Replikation in ¹⁴N nur mittelschwere DNA (je ein ¹⁵N- und ein ¹⁴N-Strang)', any: [['mittelschwer|mittel']], weight: 1.5 },
      { id: 'c', label: 'C: nach zwei Replikationen leichte und mittelschwere DNA', any: [['leicht', 'mittel']], weight: 1 },
      { id: 'erkl', label: 'Erklärung: Jeder alte Strang dient als Vorlage und erhält einen neuen Partnerstrang', any: [['vorlage|alt', 'neu']], weight: 1 },
    ],
    model: 'A: Nach mehreren Teilungen im ¹⁵N-Medium enthalten beide Stränge ¹⁵N – es gibt nur schwere DNA. B: Nach einer Replikation im ¹⁴N-Medium tritt nur mittelschwere DNA auf: Jeder Doppelstrang besteht aus einem alten ¹⁵N-Strang und einem neuen ¹⁴N-Strang. C: Nach einer weiteren Replikation dienen alle Einzelstränge wieder als Vorlage. Die alten ¹⁵N-Stränge bilden mit neuen ¹⁴N-Strängen mittelschwere DNA, die ¹⁴N-Stränge aus Runde 1 mit neuen ¹⁴N-Strängen leichte DNA – man findet leichte und mittelschwere Banden.',
    why: [{ text: 'Beobachtungen aus Material A deiner PDF; die Erklärung folgt dem Grundprinzip der semikonservativen Replikation.', prov: 'inf', src: [p(4)] }],
  },
  {
    id: 'kt-ms-2', sub: 'replikation', type: 'match', level: 4, err: 'experiment', prov: 'inf', src: [p(4, 'Material A')],
    prompt: 'Welche Banden sagt jedes Modell nach der **ersten** Replikation in ¹⁴N voraus?',
    pairs: [
      { left: 'semikonservativ', right: 'nur mittelschwer' },
      { left: 'konservativ', right: 'schwer und leicht' },
      { left: 'dispersiv', right: 'nur mittelschwer' },
    ],
    distractors: ['nur leicht', 'nur schwer'],
    why: [
      { text: 'Semikonservativ: jeder Doppelstrang halb ¹⁵N, halb ¹⁴N. Dispersiv: alt und neu gleichmäßig gemischt, ebenfalls mittelschwer. Konservativ: alter Doppelstrang bleibt schwer, neuer ist leicht.', prov: 'inf' },
    ],
  },
  {
    id: 'kt-ms-3', sub: 'replikation', type: 'free', level: 5, err: 'experiment', prov: 'inf', src: [p(4, 'Material A')], operator: 'Begründen',
    prompt: 'Begründe, warum nur das semikonservative Modell mit **beiden** Beobachtungen vereinbar ist.',
    rubric: [
      { id: 'kons', label: 'Konservativ ist nach der ersten Replikation widerlegt (keine schwere + leichte Bande, sondern mittelschwer)', any: [['konservativ', 'erst|1|eine|schwer']], weight: 1.5 },
      { id: 'disp', label: 'Dispersiv ist nach der zweiten Replikation widerlegt (es gibt eine rein leichte Bande statt einer Zwischenbande)', any: [['dispers', 'zweit|2|leicht']], weight: 1.5 },
      { id: 'semi', label: 'Semikonservativ sagt mittelschwer und dann mittelschwer + leicht korrekt voraus', any: [['semikonservativ', 'mittel|leicht|passt|stimmt|erklaert']], weight: 1 },
    ],
    model: 'Nach der ersten Replikation findet man nur mittelschwere DNA. Das konservative Modell sagt dagegen eine schwere (alter Doppelstrang) und eine leichte Bande (neuer Doppelstrang) voraus – es ist widerlegt. Das dispersive Modell sagt nach der ersten Replikation ebenfalls mittelschwere DNA voraus. Nach der zweiten Replikation müssten dispersiv aber alle Moleküle gleich sein (eine Bande zwischen mittelschwer und leicht). Beobachtet werden jedoch eine leichte und eine mittelschwere Bande – genau die Vorhersage des semikonservativen Modells.',
    why: [{ text: 'Die Aufgabe entspricht den Aufgaben 2 und 3 in Material A deiner PDF; die Lösung ist abgeleitet.', prov: 'inf', src: [p(4, 'Material A')] }],
  },
);
