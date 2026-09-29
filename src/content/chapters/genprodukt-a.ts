import type { ContentPack } from '../index';
import { p } from '../helpers';

const RNAPOL_EXT = { label: 'Wikipedia: RNA-Polymerase', url: 'https://de.wikipedia.org/wiki/RNA-Polymerase' };

/**
 * Kapitel 3 (Teil 1) · Funktion von Genen, genetischer Code, Transkription (PDF S. 9–11)
 */
export const genproduktA: ContentPack = {
  lessons: [
    {
      sub: 'genfunktion',
      intro: 'Wie hängen Gene und Merkmale zusammen? Ein Brotschimmelpilz lieferte die Antwort.',
      sections: [
        {
          id: 'augenfarbe',
          title: 'Einstieg: Warum gibt es blaue Augen?',
          blocks: [
            {
              kind: 'text',
              md: 'Die Augenfarbe hängt von der Menge des Pigments **Melanin** in der Iris ab. Ursprünglich hatten alle Menschen braune Augen; vor etwa 10 000 Jahren traten erstmals blaue Augen auf. Ursache ist ein **Gendefekt** in einem Gen, das an der Bildung von Melanin beteiligt ist: Es gelangt weniger Melanin in die Iris, die Augen wirken blau.',
              src: [p(9)],
            },
          ],
        },
        {
          id: 'garrod',
          title: 'Garrod: Gene und Enzyme',
          blocks: [
            {
              kind: 'text',
              md: 'Anfang des 20. Jahrhunderts vermutete der Arzt **Archibald Garrod**, dass bestimmte Stoffwechselerkrankungen vererbt werden, weil Betroffene bestimmte **Enzyme nicht herstellen** können. Damit zeigte er erstmals einen Zusammenhang zwischen Genen und Enzymen auf.',
              src: [p(9)],
            },
          ],
        },
        {
          id: 'mangelmutanten',
          title: 'Beadle und Tatum: Mangelmutanten',
          blocks: [
            {
              kind: 'bullets',
              items: [
                'Versuchsobjekt: der Brotschimmelpilz ***Neurospora crassa*** – leicht zu züchten, bildet Sporen, häufiger Modellorganismus.',
                'Kulturen wurden mit **Röntgenstrahlen** behandelt → Gendefekte.',
                'Pilze sind **haploid**: Für ein Merkmal ist nur **ein Allel** verantwortlich – ein Defekt zeigt sich direkt.',
                'Der **Wildtyp** stellt alle benötigten Aminosäuren selbst her. **Mangelmutanten** wachsen nur, wenn eine bestimmte Aminosäure im Nährmedium vorhanden ist.',
              ],
              src: [p(9)],
            },
            {
              kind: 'text',
              md: 'Arginin entsteht beim Wildtyp in einer Reaktionskette: **Vorstufe → Ornithin → Citrullin → Arginin**. Beadle und Tatum gaben Ornithin oder Citrullin zum Minimalnährmedium und fanden drei Typen von Arginin-Mangelmutanten.',
              src: [p(9)],
            },
            { kind: 'widget', widget: 'beadle-tatum', caption: 'Wachstumstabelle: Welches Enzym ist bei welchem Typ defekt?', src: [p(9, 'Abb. 2')] },
            { kind: 'check', questionIds: ['gf-q6'] },
          ],
        },
        {
          id: 'hypothesen',
          title: 'Von „ein Enzym“ zu „ein Polypeptid“',
          blocks: [
            {
              kind: 'steps',
              steps: [
                { title: 'Ein-Gen-ein-Enzym', text: 'Bei jedem Mutantentyp ist ein anderes Enzym der Reaktionskette ausgefallen → jedes Enzym wird von einem Gen codiert. Wirken mehrere Gene für eine Wirkung zusammen, liegt eine **Genwirkkette** vor.' },
                { title: 'Ein-Gen-ein-Protein', text: 'Enzyme sind Proteine – es gibt aber auch Genprodukte, die Proteine, aber keine Enzyme sind, z. B. das **Keratin** der Haare.' },
                { title: 'Ein-Gen-ein-Polypeptid', text: 'Viele Proteine bestehen aus mehreren Polypeptidketten. **Hämoglobin** enthält zwei α- und zwei β-Ketten, die von unterschiedlichen Genen codiert werden → ein Gen enthält die Information für **ein Polypeptid**.' },
              ],
              src: [p(9)],
            },
            { kind: 'check', questionIds: ['gf-q8'] },
          ],
        },
      ],
    },
    {
      sub: 'code',
      intro: 'Wie wird die Basenfolge der DNA in eine Abfolge von Aminosäuren übersetzt?',
      sections: [
        {
          id: 'fluss',
          title: 'Fluss der genetischen Information',
          blocks: [
            {
              kind: 'text',
              md: 'Ein **Gen** ist ein DNA-Abschnitt, der die Information zur Bildung eines Merkmals codiert. Erbliche Merkmale sind das Ergebnis enzymkatalysierter Reaktionen; die Umsetzung zum Merkmal erfolgt über **Proteine**. In natürlichen Proteinen kommen **20 verschiedene Aminosäuren** vor – ihre Reihenfolge ist in der Basensequenz der DNA verschlüsselt.\n\nDie Aminosäuren werden im Cytoplasma an den **Ribosomen** verknüpft. Die DNA verlässt bei Eukaryoten den Zellkern aber nicht – die Information überbringt ein Botenmolekül, die **messenger-RNA (mRNA)**.',
              src: [p(10)],
            },
            {
              kind: 'steps',
              steps: [
                { title: 'DNA', text: 'Träger der Erbinformation' },
                { title: 'Transkription → mRNA', text: 'An einem bestimmten DNA-Abschnitt wird ein mRNA-Molekül gebildet.' },
                { title: 'Translation → Polypeptid', text: 'Die mRNA wird an den Ribosomen in eine Aminosäuresequenz übersetzt (z. B. ein Enzym).' },
                { title: 'Stoffwechselreaktion → Merkmal', text: 'Das Protein wirkt z. B. als Enzym und führt zum Merkmal.' },
              ],
              src: [p(10, 'Abb. 1')],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Proteinbiosynthese = Genexpression',
              md: 'Die Umsetzung der genetischen Information in ein Protein heißt **Proteinbiosynthese** oder **Genexpression** – mit den Teilschritten Transkription und Translation.',
              src: [p(10)],
            },
          ],
        },
        {
          id: 'rna',
          title: 'RNA im Vergleich zur DNA',
          blocks: [
            {
              kind: 'compare',
              columns: ['DNA', 'RNA'],
              rows: [
                { label: 'Zucker', cells: ['Desoxyribose', 'Ribose'] },
                { label: 'Basen', cells: ['A, G, C, T', 'A, G, C, U (Uracil statt Thymin)'] },
                { label: 'Stränge', cells: ['Doppelstrang', 'einzelsträngig'] },
              ],
              src: [p(10), p(3)],
            },
          ],
        },
        {
          id: 'triplett',
          title: 'Warum drei Basen pro Aminosäure?',
          blocks: [
            {
              kind: 'bullets',
              items: [
                '1 Base pro Aminosäure → nur **4** Möglichkeiten',
                '2 Basen → 4² = **16** Möglichkeiten – zu wenig für 20 Aminosäuren',
                '3 Basen (ein **Triplett**) → 4³ = **64** Möglichkeiten – ausreichend',
              ],
              src: [p(10)],
            },
            {
              kind: 'term',
              term: 'Codon',
              def: 'Ein mRNA-Basentriplett, das eine Aminosäure (oder ein Stopp-Signal) codiert.',
              simple: 'Ein Drei-Buchstaben-Wort der mRNA.',
              src: [p(10)],
            },
          ],
        },
        {
          id: 'entschluesselung',
          title: 'Entschlüsselung und Codesonne',
          blocks: [
            {
              kind: 'text',
              md: 'Entschlüsselt wurde der Code mit künstlicher mRNA in einem **zellfreien System** (Zellmembran zerstört, alle Bestandteile für die Proteinbiosynthese vorhanden). Eine mRNA nur aus Uracil-Nucleotiden ergab ein Polypeptid aus **Phenylalanin** → **UUU codiert Phenylalanin**. Weitere Versuche entschlüsselten den ganzen Code.\n\nDie **Codesonne** wird **von innen nach außen** gelesen und gibt die mRNA-Tripletts in **5\'→3\'-Richtung** an. 61 der 64 Codons codieren die 20 Aminosäuren. **AUG** steht für Methionin und ist zugleich **Startcodon** – alle neuen Polypeptide beginnen mit Methionin. **UAA, UAG und UGA** sind **Stoppcodons**.',
              src: [p(10)],
            },
            { kind: 'widget', widget: 'translator', caption: 'Codesonne als Tabelle mit Übersetzer: Gib eine mRNA- oder DNA-Sequenz ein.', src: [p(10, 'Abb. 5')] },
            { kind: 'check', questionIds: ['code-q7', 'code-q16'] },
          ],
        },
        {
          id: 'eigenschaften',
          title: 'Eigenschaften des Codes',
          blocks: [
            {
              kind: 'compare',
              columns: ['Bedeutung'],
              rows: [
                { label: 'Triplett-Code', cells: ['Jeweils drei Basen codieren eine Aminosäure.'] },
                { label: 'eindeutig', cells: ['Jedes Codon steht nur für eine Aminosäure.'] },
                { label: 'degeneriert', cells: ['Fast alle Aminosäuren werden durch mehrere Tripletts codiert.'] },
                { label: 'kommafrei', cells: ['Die Codons folgen lückenlos ohne Leerstellen aufeinander.'] },
                { label: 'nahezu universell', cells: ['Bis auf wenige Ausnahmen nutzen alle Lebewesen denselben Code.'] },
              ],
              src: [p(10)],
            },
            {
              kind: 'note',
              tone: 'pdf',
              title: 'Material: Versuche mit künstlicher mRNA',
              md: 'Die Sequenz `…UGUGUGUGU…` führte zum abwechselnden Einbau von **Cystein und Valin**. `…CUACUACUA…` ergab Polypeptide, die entweder nur aus **Leucin**, nur aus **Tyrosin** oder nur aus **Threonin** bestanden.',
              src: [p(10, 'Material A')],
            },
            { kind: 'check', questionIds: ['code-q11'] },
          ],
        },
      ],
    },
    {
      sub: 'transkription',
      intro: 'Im Elektronenmikroskop zweigen von einem DNA-Strang unterschiedlich lange Fäden ab. Was passiert dort?',
      sections: [
        {
          id: 'gen-promotor',
          title: 'Gen und Promotor',
          blocks: [
            {
              kind: 'text',
              md: 'Bei der Transkription wird nicht die gesamte DNA kopiert, sondern nur der Teil, der für die Synthese eines Peptids oder einer RNA verantwortlich ist – ein **Gen**. Am Anfang des Gens liegt eine kurze Basensequenz, der **Promotor**. Er legt den **Startpunkt** fest und bestimmt, **welcher der beiden Stränge** abgelesen wird.',
              src: [p(11)],
            },
          ],
        },
        {
          id: 'ablauf',
          title: 'Ablauf der Transkription',
          blocks: [
            {
              kind: 'steps',
              steps: [
                { title: 'Bindung', text: 'Die **RNA-Polymerase** bindet an den Promotor.' },
                { title: 'Entwinden', text: 'Sie bewegt sich entlang der Doppelhelix und entwindet sie mithilfe von **Transkriptionsfaktoren**: Auf etwa **20 Basenpaaren** lösen sich die Wasserstoffbrücken – eine blasenartige Öffnung entsteht.' },
                { title: 'Vorlage', text: 'Nur einer der Stränge dient als Kopiervorlage: der **codogene Strang** (Matrizenstrang).' },
                { title: 'Synthese', text: 'Freie RNA-Nucleotide lagern sich komplementär an das **3\'-Ende** des wachsenden Strangs; die RNA-Polymerase verbindet sie.' },
                { title: 'Ende', text: 'An einer bestimmten Basensequenz, dem **Terminator**, löst sich die RNA-Polymerase; die mRNA wird freigesetzt.' },
              ],
              src: [p(11)],
            },
            { kind: 'check', questionIds: ['tr-q3', 'tr-q5'] },
          ],
        },
        {
          id: 'mehrfach',
          title: 'Viele Polymerasen gleichzeitig',
          blocks: [
            {
              kind: 'text',
              md: 'Bei Prokaryoten wie *E. coli* kann ein Gen gleichzeitig von **mehreren aufeinanderfolgenden RNA-Polymerasen** transkribiert werden. Im Elektronenmikroskop sieht man die mRNA-Transkripte als Fäden – **je weiter vom Transkriptionsstart entfernt, desto länger**, weil die Transkription dort schon weiter fortgeschritten ist. So steigt die Proteinmenge pro Zeiteinheit.',
              src: [p(11)],
            },
            {
              kind: 'bullets',
              title: 'Weitere RNA-Typen (auch durch Gene codiert)',
              items: ['**tRNA** (transfer-RNA): transportiert Aminosäuren zu den Ribosomen.', '**rRNA** (ribosomale RNA): gibt den Ribosomen zusammen mit Proteinen Struktur und Funktion.'],
              src: [p(11)],
            },
          ],
        },
        {
          id: 'vergleich',
          title: 'Vergleich: Replikation – Transkription',
          blocks: [
            {
              kind: 'compare',
              columns: ['Replikation', 'Transkription'],
              rows: [
                { label: 'Umfang', cells: ['die gesamte DNA einer Zelle (📘)', 'nur ein Gen / DNA-Abschnitt (📘 S. 11)'] },
                { label: 'Vorlage', cells: ['beide Stränge der Doppelhelix (📘)', 'nur der codogene Strang (📘 S. 11)'] },
                { label: 'Enzym', cells: ['DNA-Polymerase, benötigt einen Primer (📘)', 'RNA-Polymerase, bindet am Promotor (📘 S. 11)'] },
                { label: 'Produkt', cells: ['DNA-Doppelstrang mit Desoxyribose und A, G, C, T (💡)', 'RNA mit Ribose und A, G, C, U (📘)'] },
                { label: 'Verbleib', cells: ['bleibt als Chromosom in der Zelle (💡)', 'mRNA verlässt bei Eukaryoten den Kern, bei Prokaryoten bleibt sie nahe der DNA (📘)'] },
              ],
              src: [p(11, 'Material A'), p(5), p(4)],
              prov: 'inf',
            },
            { kind: 'check', questionIds: ['tr-q10'] },
          ],
        },
      ],
    },
  ],

  terms: [
    { id: 'gf-mangelmutante', sub: 'genfunktion', term: 'Mangelmutante', def: 'Mutante, die eine bestimmte Aminosäure nicht mehr selbst herstellen kann und nur wächst, wenn diese im Nährmedium vorhanden ist.', simple: 'Ein Pilz mit „Baustelle“ im Stoffwechsel, der Nachhilfe von außen braucht.', src: [p(9)] },
    { id: 'gf-wildtyp', sub: 'genfunktion', term: 'Wildtyp', def: 'Ausgangsstamm ohne Gendefekt; kann alle benötigten Aminosäuren selbst herstellen.', simple: 'Die unveränderte Normalform.', src: [p(9)] },
    { id: 'gf-haploid', sub: 'genfunktion', term: 'haploid (bei Neurospora)', def: 'Pilze sind haploid: Für die Ausbildung eines Merkmals ist nur ein Allel verantwortlich – ist es defekt, fehlt das Merkmal.', simple: 'Jedes Gen nur einmal vorhanden – ein Fehler fällt sofort auf.', src: [p(9)] },
    { id: 'gf-1g1e', sub: 'genfunktion', term: 'Ein-Gen-ein-Enzym-Hypothese', def: 'Hypothese von Beadle und Tatum: Jedes Enzym wird von einem Gen codiert.', simple: 'Ein Gen = ein Enzym.', src: [p(9)] },
    { id: 'gf-1g1p', sub: 'genfunktion', term: 'Ein-Gen-ein-Protein-Hypothese', def: 'Erweiterung, weil auch Proteine, die keine Enzyme sind (z. B. Keratin), Genprodukte sind.', simple: 'Ein Gen = ein Protein.', src: [p(9)] },
    { id: 'gf-1g1pp', sub: 'genfunktion', term: 'Ein-Gen-ein-Polypeptid-Hypothese', def: 'Erweiterung, weil viele Proteine aus mehreren, von verschiedenen Genen codierten Polypeptidketten bestehen (z. B. Hämoglobin: 2 α- und 2 β-Ketten).', simple: 'Ein Gen = eine Polypeptidkette.', src: [p(9)] },
    { id: 'gf-genwirkkette', sub: 'genfunktion', term: 'Genwirkkette', def: 'Eine Wirkung entsteht erst durch das Zusammenspiel mehrerer Gene, deren Produkte (Enzyme) nacheinander die Schritte einer Reaktionskette katalysieren.', simple: 'Mehrere Gene arbeiten wie ein Fließband zusammen.', src: [p(9)] },
    { id: 'code-gen', sub: 'code', term: 'Gen', def: 'DNA-Abschnitt, der die Information zur Bildung eines Merkmals codiert (PDF S. 10) bzw. für die Synthese eines Peptids oder einer RNA verantwortlich ist (PDF S. 11).', simple: 'Ein Rezept-Abschnitt in der DNA.', src: [p(10), p(11)] },
    { id: 'code-mrna', sub: 'code', term: 'messenger-RNA (mRNA)', def: 'Botenmolekül, das die Information von der DNA zu den Ribosomen überbringt.', simple: 'Die Kopie des Rezepts, die in die „Küche“ gebracht wird.', src: [p(10)] },
    { id: 'code-ribose', sub: 'code', term: 'Ribose / Uracil', def: 'RNA enthält Ribose statt Desoxyribose und Uracil statt Thymin; sie ist einzelsträngig.', simple: 'Die kleinen Unterschiede zwischen RNA und DNA.', src: [p(10)] },
    { id: 'code-pbs', sub: 'code', term: 'Proteinbiosynthese (Genexpression)', def: 'Umsetzung der genetischen Information in ein Protein, gegliedert in Transkription und Translation.', simple: 'Vom Gen zum fertigen Protein.', src: [p(10)] },
    { id: 'code-transkription', sub: 'code', term: 'Transkription', def: 'Bildung eines mRNA-Moleküls an einem bestimmten DNA-Abschnitt.', simple: 'Abschreiben der DNA in RNA.', src: [p(10)] },
    { id: 'code-translation', sub: 'code', term: 'Translation', def: 'Übersetzung der mRNA an den Ribosomen in eine Aminosäuresequenz.', simple: 'Übersetzen der RNA-Sprache in die Protein-Sprache.', src: [p(10)] },
    { id: 'code-codon', sub: 'code', term: 'Codon', def: 'mRNA-Basentriplett, das eine Aminosäure (oder Stopp) codiert. Mit drei Basen gibt es 4³ = 64 Codons.', simple: 'Ein Drei-Buchstaben-Wort der mRNA.', src: [p(10)] },
    { id: 'code-code', sub: 'code', term: 'Genetischer Code', def: 'Regeln, nach denen die Basensequenz der mRNA in eine Abfolge von Aminosäuren übersetzt wird.', simple: 'Das Wörterbuch von RNA zu Aminosäuren.', src: [p(10)] },
    { id: 'code-codesonne', sub: 'code', term: 'Codesonne', def: 'Darstellung des genetischen Codes, die von innen nach außen gelesen wird und die mRNA-Tripletts in 5\'→3\'-Richtung angibt.', simple: 'Ein rundes Nachschlagewerk für Codons.', src: [p(10)] },
    { id: 'code-start', sub: 'code', term: 'Startcodon AUG', def: 'Codon mit Doppelfunktion: codiert Methionin und startet die Proteinbiosynthese – alle neu gebildeten Polypeptide beginnen mit Methionin.', simple: 'Das „Los geht’s“-Wort.', src: [p(10)] },
    { id: 'code-stopp', sub: 'code', term: 'Stoppcodons', def: 'UAA, UAG und UGA codieren keine Aminosäure; sie beenden die Proteinbiosynthese.', simple: 'Die „Punkt“-Wörter am Satzende.', src: [p(10)] },
    { id: 'code-degeneriert', sub: 'code', term: 'degeneriert (Code)', def: 'Fast alle Aminosäuren werden durch mehrere Tripletts codiert.', simple: 'Mehrere Wörter für dieselbe Aminosäure.', src: [p(10)] },
    { id: 'code-kommafrei', sub: 'code', term: 'kommafrei (Code)', def: 'Die Codons folgen lückenlos ohne Leerstellen aufeinander.', simple: 'Kein Leerzeichen zwischen den Wörtern.', src: [p(10)] },
    { id: 'code-zellfrei', sub: 'code', term: 'Zellfreies System', def: 'Gemisch aus zerstörten Zellen (Zellmembran aufgelöst), das alle Bestandteile für die Proteinbiosynthese enthält.', simple: 'Die Proteinfabrik ohne Zellhülle – im Reagenzglas.', src: [p(10)] },
    { id: 'tr-promotor', sub: 'transkription', term: 'Promotor', def: 'Kurze DNA-Basensequenz am Anfang eines Gens; legt den Startpunkt der Transkription fest und welcher Strang abgelesen wird. Hier bindet die RNA-Polymerase.', simple: 'Die Startlinie mit Richtungspfeil.', src: [p(11)] },
    { id: 'tr-rnapol', sub: 'transkription', term: 'RNA-Polymerase', def: 'Enzym, das an den Promotor bindet, die DNA entwindet und komplementäre RNA-Nucleotide zu einem mRNA-Strang verbindet.', simple: 'Die Abschreib-Maschine.', src: [p(11)] },
    { id: 'tr-tf', sub: 'transkription', term: 'Transkriptionsfaktoren', def: 'Proteine, mit deren Hilfe die RNA-Polymerase die DNA entwindet (bei Eukaryoten: siehe Genregulation).', simple: 'Helfer der RNA-Polymerase.', src: [p(11), p(18)] },
    { id: 'tr-codogen', sub: 'transkription', term: 'codogener Strang (Matrizenstrang)', def: 'Der DNA-Einzelstrang, der bei der Transkription als Kopiervorlage dient.', simple: 'Der Strang, von dem abgeschrieben wird.', src: [p(11)] },
    { id: 'tr-terminator', sub: 'transkription', term: 'Terminator', def: 'DNA-Basensequenz, an der sich die RNA-Polymerase von der DNA löst und die mRNA freigesetzt wird.', simple: 'Die Ziellinie.', src: [p(11)] },
    { id: 'tr-trna', sub: 'transkription', term: 'tRNA (transfer-RNA)', def: 'RNA, die Aminosäuren zu den Ribosomen transportiert; wird ebenfalls durch Gene codiert.', simple: 'Der Lieferwagen für Aminosäuren.', src: [p(11)] },
    { id: 'tr-rrna', sub: 'transkription', term: 'rRNA (ribosomale RNA)', def: 'RNA, die den Ribosomen zusammen mit Proteinen Struktur und Funktion gibt.', simple: 'Baumaterial der Ribosomen.', src: [p(11)] },
  ],

  cards: [
    { id: 'gf-c1', sub: 'genfunktion', kind: 'experiment', front: 'Beadle & Tatum: Typ-I-Mutanten wachsen mit Ornithin **oder** Citrullin. Welches Enzym ist defekt?', back: 'Enzym A (Vorstufe → Ornithin). Die Zwischenprodukte danach können noch zu Arginin umgesetzt werden.', src: [p(9, 'Abb. 2')], prov: 'pdf' },
    { id: 'gf-c2', sub: 'genfunktion', kind: 'experiment', front: 'Typ-II-Mutanten wachsen mit Citrullin, aber nicht mit Ornithin. Welches Enzym ist defekt?', back: 'Enzym B (Ornithin → Citrullin).', src: [p(9, 'Abb. 2')], prov: 'pdf' },
    { id: 'gf-c3', sub: 'genfunktion', kind: 'experiment', front: 'Typ-III-Mutanten nutzen weder Ornithin noch Citrullin. Welches Enzym ist defekt?', back: 'Enzym C (Citrullin → Arginin) – sie wachsen nur mit Arginin.', src: [p(9, 'Abb. 2')], prov: 'pdf' },
    { id: 'gf-c4', sub: 'genfunktion', kind: 'vergleich', front: 'Ein-Gen-ein-Enzym vs. -Protein vs. -Polypeptid: Welche Beispiele führten zur Erweiterung?', back: 'Enzym → Protein: Keratin (Protein, aber kein Enzym).\nProtein → Polypeptid: Hämoglobin (2 α-, 2 β-Ketten von verschiedenen Genen).', src: [p(9)], prov: 'pdf' },
    { id: 'gf-c5', sub: 'genfunktion', kind: 'ursache', front: 'Ursache: Neurospora ist haploid. → Wirkung für den Versuch?', back: 'Nur ein Allel pro Merkmal – ein Gendefekt ist direkt am fehlenden Merkmal erkennbar.', src: [p(9)], prov: 'pdf' },
    { id: 'code-c1', sub: 'code', kind: 'frage', front: 'Warum reichen zwei Basen pro Aminosäure nicht aus?', back: '4² = 16 Kombinationen < 20 Aminosäuren. Erst Tripletts liefern 4³ = 64.', src: [p(10)], prov: 'pdf' },
    { id: 'code-c2', sub: 'code', kind: 'frage', front: 'Welche Doppelfunktion hat AUG?', back: 'Es codiert Methionin und ist das Startcodon – alle neuen Polypeptide beginnen mit Methionin.', src: [p(10)], prov: 'pdf' },
    { id: 'code-c3', sub: 'code', kind: 'vergleich', front: '„eindeutig“ vs. „degeneriert“', back: 'eindeutig: Jedes Codon steht für nur eine Aminosäure.\ndegeneriert: Eine Aminosäure kann von mehreren Codons codiert werden.', src: [p(10)], prov: 'pdf' },
    { id: 'code-c4', sub: 'code', kind: 'experiment', front: 'Poly-U-mRNA im zellfreien System → Ergebnis?', back: 'Ein Polypeptid aus Phenylalanin → UUU codiert Phenylalanin.', src: [p(10)], prov: 'pdf' },
    { id: 'code-c5', sub: 'code', kind: 'experiment', front: '…CUACUACUA… ergab drei Sorten Polypeptide. Warum?', back: 'Je nach Startpunkt entstehen drei Leseraster: CUA (Leu), UAC (Tyr) oder ACU (Thr). Das zeigt den kommafreien Triplett-Code.', src: [p(10, 'Material A')], prov: 'inf' },
    { id: 'code-c6', sub: 'code', kind: 'prozess', front: 'Fluss der genetischen Information', back: 'DNA → (Transkription) → mRNA → (Translation) → Polypeptid (z. B. Enzym) → Stoffwechselreaktion → Merkmal', src: [p(10, 'Abb. 1')], prov: 'pdf' },
    { id: 'tr-c1', sub: 'transkription', kind: 'prozess', front: 'Ablauf der Transkription in 5 Schritten', back: 'RNA-Polymerase bindet an Promotor → entwindet ~20 bp → codogener Strang als Vorlage → RNA-Nucleotide ans 3\'-Ende, verknüpft → am Terminator Ablösen, mRNA frei.', src: [p(11)], prov: 'pdf' },
    { id: 'tr-c2', sub: 'transkription', kind: 'frage', front: 'Warum sind die mRNA-Fäden im EM-Bild unterschiedlich lang?', back: 'Mehrere RNA-Polymerasen transkribieren das Gen gleichzeitig; je weiter vom Start entfernt, desto weiter ist die Transkription fortgeschritten.', src: [p(11)], prov: 'pdf' },
    { id: 'tr-c3', sub: 'transkription', kind: 'vergleich', front: 'Replikation vs. Transkription: Umfang und Vorlage', back: 'Replikation: gesamte DNA, beide Stränge.\nTranskription: nur ein Gen, nur der codogene Strang.', src: [p(11), p(4)], prov: 'pdf' },
    { id: 'tr-c4', sub: 'transkription', kind: 'ursache', front: 'Ursache: Mehrere RNA-Polymerasen lesen ein Gen gleichzeitig. → Wirkung?', back: 'Mehr mRNA und damit mehr Protein pro Zeiteinheit.', src: [p(11)], prov: 'pdf' },
  ],

  questions: [
    // ---------------- genfunktion ----------------
    {
      id: 'gf-q1', sub: 'genfunktion', type: 'single', level: 1, err: 'facts', prov: 'pdf', src: [p(9)],
      prompt: 'Mit welchem Organismus experimentierten Beadle und Tatum?',
      options: ['dem Brotschimmelpilz Neurospora crassa', 'dem Bakterium E. coli', 'der Saubohne', 'der Fruchtfliege'],
      answer: 0,
      why: [{ text: 'Neurospora crassa ist leicht zu züchten, bildet Sporen und dient oft als Modellorganismus.', prov: 'pdf', src: [p(9)] }],
    },
    {
      id: 'gf-q2', sub: 'genfunktion', type: 'single', level: 2, err: 'experiment', prov: 'pdf', src: [p(9)],
      prompt: 'Warum ließ sich ein Gendefekt bei Neurospora crassa direkt erkennen?',
      options: [
        'Pilze sind haploid – für ein Merkmal ist nur ein Allel verantwortlich.',
        'Pilze haben keine DNA-Reparatur.',
        'Neurospora wächst nur auf Arginin.',
        'Röntgenstrahlen machen Gene sichtbar.',
      ],
      answer: 0,
      why: [{ text: 'Ist das eine Allel defekt, wird das Merkmal nicht ausgeprägt – kein zweites Allel kann den Defekt verdecken.', prov: 'pdf', src: [p(9)] }],
    },
    {
      id: 'gf-q3', sub: 'genfunktion', type: 'tf', level: 1, err: 'terms', prov: 'pdf', src: [p(9)],
      prompt: 'Mangelmutanten können alle Aminosäuren, die sie zum Wachsen brauchen, selbst herstellen.',
      answer: false,
      correction: 'Das kann der Wildtyp. Mangelmutanten wachsen nur, wenn bestimmte Aminosäuren im Nährmedium vorhanden sind.',
      why: [{ text: 'Wildtyp = alle Aminosäuren selbst; Mangelmutante = auf Zugabe angewiesen.', prov: 'pdf', src: [p(9)] }],
    },
    {
      id: 'gf-q4', sub: 'genfunktion', type: 'order', level: 1, err: 'sequence', prov: 'pdf', src: [p(9)],
      prompt: 'Bringe die Stoffe der Argininsynthese in die richtige Reihenfolge.',
      items: ['Vorstufe', 'Ornithin', 'Citrullin', 'Arginin'],
      why: [{ text: 'Enzym A: Vorstufe → Ornithin · Enzym B: Ornithin → Citrullin · Enzym C: Citrullin → Arginin.', prov: 'pdf', src: [p(9, 'Abb. 2')] }],
    },
    {
      id: 'gf-q5', sub: 'genfunktion', type: 'match', level: 3, err: 'experiment', prov: 'pdf', src: [p(9, 'Abb. 2')], figure: { widget: 'beadle-tatum' },
      prompt: 'Ordne jedem Mutantentyp das defekte Enzym zu.',
      pairs: [
        { left: 'Typ I (wächst mit Ornithin oder Citrullin)', right: 'Enzym A: Vorstufe → Ornithin' },
        { left: 'Typ II (wächst nur mit Citrullin, nicht mit Ornithin)', right: 'Enzym B: Ornithin → Citrullin' },
        { left: 'Typ III (wächst nur mit Arginin)', right: 'Enzym C: Citrullin → Arginin' },
      ],
      why: [{ text: 'Eine Mutante wächst, sobald ein Stoff zugegeben wird, der hinter dem defekten Schritt liegt.', prov: 'inf' }],
    },
    {
      id: 'gf-q6', sub: 'genfunktion', type: 'single', level: 3, err: 'experiment', prov: 'inf', src: [p(9)],
      prompt: 'Eine neue Mutante wächst auf Minimalnährmedium + Citrullin und + Arginin, aber nicht + Ornithin. Welcher Typ liegt vor?',
      options: ['Typ II', 'Typ I', 'Typ III', 'Wildtyp'],
      answer: 0,
      why: [
        { text: 'Typ II konnte laut PDF zwar aus Citrullin, nicht aber aus Ornithin Arginin bilden.', prov: 'pdf', src: [p(9)] },
        { text: 'Also ist der Schritt Ornithin → Citrullin (Enzym B) defekt.', prov: 'inf' },
      ],
    },
    {
      id: 'gf-q7', sub: 'genfunktion', type: 'single', level: 2, err: 'terms', prov: 'pdf', src: [p(9)],
      prompt: 'Welches Beispiel führte zur Erweiterung auf die Ein-Gen-ein-Protein-Hypothese?',
      options: ['das Keratin der Haare', 'das Hämoglobin', 'die Argininsynthese', 'das Melanin der Iris'],
      answer: 0,
      feedback: { 1: 'Hämoglobin führte zur nächsten Erweiterung: Ein-Gen-ein-Polypeptid.' },
      why: [{ text: 'Keratin ist ein Protein und Genprodukt, aber kein Enzym.', prov: 'pdf', src: [p(9)] }],
    },
    {
      id: 'gf-q8', sub: 'genfunktion', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(9)],
      prompt: 'Warum wurde die Hypothese zur „Ein-Gen-ein-Polypeptid-Hypothese“ erweitert?',
      options: [
        'Viele Proteine bestehen aus mehreren Polypeptidketten, die von unterschiedlichen Genen codiert werden (z. B. Hämoglobin).',
        'Manche Gene codieren gar nichts.',
        'Enzyme bestehen nicht aus Proteinen.',
        'Ein Gen codiert immer mehrere Proteine.',
      ],
      answer: 0,
      why: [{ text: 'Hämoglobin: zwei identische α- und zwei identische β-Ketten; α- und β-Ketten stammen von unterschiedlichen Genen.', prov: 'pdf', src: [p(9)] }],
    },
    {
      id: 'gf-q9', sub: 'genfunktion', type: 'order', level: 2, err: 'sequence', prov: 'pdf', src: [p(9)],
      prompt: 'Ordne die Hypothesen in der Reihenfolge ihrer Entstehung.',
      items: ['Ein-Gen-ein-Enzym-Hypothese', 'Ein-Gen-ein-Protein-Hypothese', 'Ein-Gen-ein-Polypeptid-Hypothese'],
      why: [{ text: 'Jede Erweiterung berücksichtigt neue Befunde: Proteine ohne Enzymfunktion, dann Proteine aus mehreren Ketten.', prov: 'pdf', src: [p(9)] }],
    },
    {
      id: 'gf-q10', sub: 'genfunktion', type: 'free', level: 4, err: 'experiment', prov: 'inf', src: [p(9)], operator: 'Erklären',
      prompt: 'Erkläre, wie Beadle und Tatum aus dem Wachstum der drei Mutantentypen ableiten konnten, an welcher Stelle der Argininsynthese jeweils ein Enzym ausgefallen ist.',
      material: [{ kind: 'widget', widget: 'beadle-tatum', caption: 'Beobachtungen nach Abb. 2 deiner PDF' }],
      rubric: [
        { id: 'prinzip', label: 'Prinzip: Eine Mutante wächst, wenn ein Stoff zugegeben wird, der nach dem defekten Schritt liegt', any: [['nach|hinter|danach|folgend', 'defekt|ausgefallen|fehlt|block']], weight: 1.5 },
        { id: 'typ1', label: 'Typ I wächst mit Ornithin und Citrullin → Enzym A (Vorstufe → Ornithin) defekt', any: [['typ i\\b|typ 1|typ eins', 'enzym a|vorstufe']], weight: 1 },
        { id: 'typ2', label: 'Typ II wächst nur mit Citrullin → Enzym B (Ornithin → Citrullin) defekt', any: [['typ ii\\b|typ 2|typ zwei', 'enzym b|ornithin']], weight: 1 },
        { id: 'typ3', label: 'Typ III wächst mit keinem Zwischenprodukt → Enzym C (Citrullin → Arginin) defekt', any: [['typ iii|typ 3|typ drei', 'enzym c|arginin']], weight: 1 },
        { id: 'hypothese', label: 'Folgerung: Jedes Enzym wird von einem Gen codiert (Ein-Gen-ein-Enzym)', any: [['ein gen ein enzym|jedes enzym|ein gen']], weight: 0.5 },
      ],
      model: 'Eine Mutante kann wachsen, wenn man ihr einen Stoff gibt, der in der Reaktionskette hinter dem defekten Schritt liegt – der blockierte Schritt wird so umgangen. Typ I wächst mit Ornithin und mit Citrullin: Der Defekt liegt vor Ornithin, also ist Enzym A (Vorstufe → Ornithin) ausgefallen. Typ II wächst nur mit Citrullin, nicht mit Ornithin: Ornithin kann nicht umgesetzt werden, Enzym B (Ornithin → Citrullin) ist defekt. Typ III wächst mit keinem der Zwischenprodukte, nur mit Arginin: Enzym C (Citrullin → Arginin) ist ausgefallen. Da bei jedem Typ ein anderes Enzym fehlt, folgerten Beadle und Tatum, dass jedes Enzym von einem Gen codiert wird.',
      why: [{ text: 'Beobachtungen und Deutung stehen in deiner PDF (Abb. 2 A und B); die Formulierung des Prinzips ist eine Erklärung.', prov: 'inf', src: [p(9, 'Abb. 2')] }],
    },
    {
      id: 'gf-q11', sub: 'genfunktion', type: 'free', level: 2, err: 'terms', prov: 'pdf', src: [p(9)], operator: 'Erklären',
      prompt: 'Erkläre den Begriff Genwirkkette am Beispiel der Argininsynthese.',
      rubric: [
        { id: 'mehrere', label: 'Eine Wirkung entsteht durch das Zusammenspiel mehrerer Gene', any: [['mehrere|verschiedene', 'gen']], weight: 1.5 },
        { id: 'enzyme', label: 'Jedes Gen codiert ein Enzym für einen Schritt der Reaktionskette', any: [['enzym', 'schritt|reaktion|kette']], weight: 1 },
        { id: 'beispiel', label: 'Beispiel: Vorstufe → Ornithin → Citrullin → Arginin mit Enzym A, B, C', any: [['ornithin|citrullin|arginin']], weight: 1 },
      ],
      model: 'Von einer Genwirkkette spricht man, wenn eine bestimmte Wirkung erst durch das Zusammenspiel mehrerer Gene entsteht. Bei der Argininsynthese katalysiert an jeder Reaktion ein anderes Enzym, das von einem eigenen Gen codiert wird: Gen A → Enzym A (Vorstufe → Ornithin), Gen B → Enzym B (Ornithin → Citrullin), Gen C → Enzym C (Citrullin → Arginin). Nur wenn alle drei Gene intakt sind, entsteht Arginin.',
      why: [{ text: 'Fällt ein Glied der Kette aus, fehlt das Endprodukt – wie bei den Mangelmutanten.', prov: 'inf' }],
    },
    {
      id: 'gf-q12', sub: 'genfunktion', type: 'free', level: 5, err: 'experiment', prov: 'inf', src: [p(9)], operator: 'Begründen',
      prompt: 'Eine Doppelmutante besitzt Defekte in **Enzym A und Enzym C**. Auf welchen Medien (Minimalnährmedium + Ornithin, + Citrullin, + Arginin) wächst sie? Begründe.',
      rubric: [
        { id: 'nur-arginin', label: 'Sie wächst nur mit Arginin', any: [['nur|ausschliesslich|lediglich', 'arginin']], weight: 1.5 },
        { id: 'c-block', label: 'Enzym C ist defekt → Citrullin kann nicht zu Arginin umgesetzt werden', any: [['enzym c|citrullin', 'nicht|kein|block']], weight: 1 },
        { id: 'ornithin', label: 'Auch Ornithin hilft nicht, weil der Weg über Citrullin zu Arginin blockiert ist', any: [['ornithin', 'nicht|hilft|kein']], weight: 1 },
      ],
      model: 'Die Doppelmutante wächst nur auf Minimalnährmedium mit Arginin. Wegen des Defekts in Enzym C kann Citrullin nicht mehr zu Arginin umgesetzt werden – weder zugegebenes Citrullin noch Ornithin (das über Citrullin zu Arginin führen müsste) helfen. Der Defekt in Enzym A spielt dann keine Rolle mehr, weil der letzte Schritt ohnehin blockiert ist.',
      why: [{ text: 'Transferaufgabe (nicht in deiner PDF) – sie folgt aus der Reaktionskette in Abb. 2.', prov: 'inf', src: [p(9, 'Abb. 2')] }],
    },
    {
      id: 'gf-q13', sub: 'genfunktion', type: 'cloze', level: 1, err: 'facts', prov: 'pdf', src: [p(9)],
      prompt: 'Ergänze die Lücken.',
      text: 'Beadle und Tatum erzeugten Gendefekte durch {{0}}. Pilze sind {{1}}; deshalb ist für die Ausbildung eines Merkmals nur ein {{2}} verantwortlich.',
      gaps: [
        { accept: ['Röntgenstrahlen', 'Röntgenstrahlung'], options: ['Röntgenstrahlen', 'UV-Licht', 'Hitze', 'Antibiotika'] },
        { accept: ['haploid'], options: ['haploid', 'diploid', 'polyploid'] },
        { accept: ['Allel'], options: ['Allel', 'Chromosom', 'Enzym', 'Protein'] },
      ],
      why: [{ text: 'Mit Röntgenstrahlen behandelte Kulturen lieferten Mangelmutanten; Haploidie macht Defekte direkt sichtbar.', prov: 'pdf', src: [p(9)] }],
    },
    // ---------------- code ----------------
    {
      id: 'code-q1', sub: 'code', type: 'single', level: 1, err: 'facts', prov: 'pdf', src: [p(10)],
      prompt: 'Wie viele Codons gibt es insgesamt?',
      options: ['64', '20', '61', '16'],
      answer: 0,
      feedback: { 2: '61 Codons codieren Aminosäuren – dazu kommen 3 Stoppcodons.' },
      why: [{ text: '4³ = 64 Kombinationsmöglichkeiten; 61 davon codieren die 20 Aminosäuren.', prov: 'pdf', src: [p(10)] }],
    },
    {
      id: 'code-q2', sub: 'code', type: 'single', level: 1, err: 'code', prov: 'pdf', src: [p(10)],
      prompt: 'Welches Codon ist das Startcodon?',
      options: ['AUG', 'UAA', 'UUU', 'GAU'],
      answer: 0,
      why: [{ text: 'AUG codiert Methionin und dient gleichzeitig als Startcodon.', prov: 'pdf', src: [p(10)] }],
    },
    {
      id: 'code-q3', sub: 'code', type: 'multi', level: 1, err: 'code', prov: 'pdf', src: [p(10)],
      prompt: 'Welche Codons sind Stoppcodons?',
      options: ['UAA', 'UAG', 'UGA', 'AUG', 'UUU'],
      answers: [0, 1, 2],
      why: [{ text: 'UAA, UAG und UGA codieren keine Aminosäure und beenden die Proteinbiosynthese.', prov: 'pdf', src: [p(10)] }],
    },
    {
      id: 'code-q4', sub: 'code', type: 'match', level: 1, err: 'terms', prov: 'pdf', src: [p(10)],
      prompt: 'Ordne jeder Eigenschaft des genetischen Codes ihre Bedeutung zu.',
      pairs: [
        { left: 'Triplett-Code', right: 'Drei Basen codieren eine Aminosäure.' },
        { left: 'eindeutig', right: 'Jedes Codon steht nur für eine Aminosäure.' },
        { left: 'degeneriert', right: 'Fast alle Aminosäuren haben mehrere Codons.' },
        { left: 'kommafrei', right: 'Die Codons folgen lückenlos aufeinander.' },
        { left: 'nahezu universell', right: 'Fast alle Lebewesen nutzen denselben Code.' },
      ],
      why: [{ text: 'Die fünf Eigenschaften stehen so in deiner PDF.', prov: 'pdf', src: [p(10)] }],
    },
    {
      id: 'code-q5', sub: 'code', type: 'tf', level: 2, err: 'terms', prov: 'pdf', src: [p(10)],
      prompt: 'Weil der genetische Code degeneriert ist, kann ein Codon für mehrere Aminosäuren stehen.',
      answer: false,
      correction: 'Degeneriert heißt: Eine Aminosäure kann von mehreren Codons codiert werden. Jedes Codon steht aber nur für eine Aminosäure (eindeutig).',
      why: [{ text: 'Verwechslungsgefahr: „degeneriert“ ↔ „eindeutig“.', prov: 'pdf', src: [p(10)] }],
    },
    {
      id: 'code-q6', sub: 'code', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(10)],
      prompt: 'Warum kann eine Aminosäure nicht durch nur zwei Basen codiert werden?',
      options: ['Mit zwei Basen gäbe es nur 4² = 16 Kombinationen – zu wenig für 20 Aminosäuren.', 'Weil RNA nur drei Basen besitzt.', 'Weil zwei Basen keine Wasserstoffbrücken bilden.', 'Weil Ribosomen immer drei Basen gleichzeitig lesen müssen.'],
      answer: 0,
      why: [{ text: '4¹ = 4, 4² = 16, 4³ = 64. Erst Tripletts reichen für 20 Aminosäuren aus.', prov: 'pdf', src: [p(10)] }],
    },
    {
      id: 'code-q7', sub: 'code', type: 'input', level: 2, err: 'code', prov: 'inf', src: [p(10)], mode: 'aa', figure: { widget: 'codon-table' },
      prompt: 'Übersetze die mRNA `5\'-AUG GCU UGG UAA-3\'` mithilfe der Codesonne (Dreibuchstabencode, z. B. Met-…).',
      accept: ['Met-Ala-Trp'],
      solution: 'Met-Ala-Trp (UAA = Stopp)',
      why: [
        { text: 'Die Codesonne wird von innen nach außen in 5\'→3\'-Richtung gelesen.', prov: 'pdf', src: [p(10)] },
        { text: 'AUG = Met, GCU = Ala, UGG = Trp, UAA = Stopp.', prov: 'inf' },
      ],
    },
    {
      id: 'code-q8', sub: 'code', type: 'input', level: 3, err: 'code', prov: 'inf', src: [p(10), p(11)], mode: 'aa', figure: { widget: 'codon-table' },
      prompt: 'Der codogene DNA-Strang lautet `3\'-TAC AAA CCG ATT-5\'`. Welche Aminosäuresequenz entsteht?',
      accept: ['Met-Phe-Gly'],
      solution: "mRNA 5'-AUG UUU GGC UAA-3' → Met-Phe-Gly (Stopp)",
      why: [
        { text: 'Die mRNA ist komplementär zum codogenen Strang, mit U statt T.', prov: 'pdf', src: [p(11), p(10)] },
        { text: 'TAC→AUG (Met), AAA→UUU (Phe), CCG→GGC (Gly), ATT→UAA (Stopp).', prov: 'inf' },
      ],
    },
    {
      id: 'code-q9', sub: 'code', type: 'multi', level: 1, err: 'comparison', prov: 'pdf', src: [p(10)],
      prompt: 'Welche Aussagen treffen auf RNA zu?',
      options: ['Sie enthält den Zucker Ribose.', 'Sie enthält Uracil statt Thymin.', 'Sie ist einzelsträngig.', 'Sie enthält Desoxyribose.', 'Sie bildet eine Doppelhelix.'],
      answers: [0, 1, 2],
      why: [{ text: 'RNA: Ribose, Uracil statt Thymin, einzelsträngig.', prov: 'pdf', src: [p(10)] }],
    },
    {
      id: 'code-q10', sub: 'code', type: 'single', level: 3, err: 'code', prov: 'inf', src: [p(10, 'Material A')],
      prompt: 'Die künstliche mRNA `…UGUGUGUGU…` führte zum abwechselnden Einbau von Cystein und Valin. Was zeigt das?',
      options: [
        'Je drei Basen bilden ein Codon: UGU (Cys) und GUG (Val) wechseln sich ab.',
        'Jede einzelne Base codiert eine Aminosäure.',
        'Der Code ist überlappend.',
        'Cystein und Valin werden vom selben Codon codiert.',
      ],
      answer: 0,
      why: [
        { text: 'Beobachtung aus Material A deiner PDF.', prov: 'pdf', src: [p(10, 'Material A')] },
        { text: 'Liest man UGU GUG UGU GUG …, entstehen abwechselnd die Codons UGU und GUG. Laut Codesonne: UGU = Cys, GUG = Val.', prov: 'inf' },
      ],
    },
    {
      id: 'code-q11', sub: 'code', type: 'single', level: 3, err: 'code', prov: 'inf', src: [p(10, 'Material A')],
      prompt: '`…CUACUACUA…` ergab Polypeptide nur aus Leucin, nur aus Tyrosin oder nur aus Threonin. Wie erklärt sich das?',
      options: [
        'Je nach Startpunkt wird in einem von drei Leserastern gelesen: CUA (Leu), UAC (Tyr) oder ACU (Thr).',
        'Das Ribosom wählt die Aminosäuren zufällig aus.',
        'Das Codon CUA codiert drei Aminosäuren gleichzeitig.',
        'Die mRNA wird rückwärts gelesen.',
      ],
      answer: 0,
      why: [
        { text: 'Innerhalb eines Leserasters wiederholt sich immer dasselbe Codon – deshalb bestehen die Ketten nur aus einer Aminosäure. Das zeigt: Die Codons werden lückenlos (kommafrei) hintereinander gelesen.', prov: 'inf' },
      ],
    },
    {
      id: 'code-q12', sub: 'code', type: 'free', level: 4, err: 'code', prov: 'inf', src: [p(10, 'Material A')], operator: 'Erklären',
      prompt: 'Erkläre an den Versuchen mit `…UGUGUG…` und `…CUACUACUA…`, dass der genetische Code ein kommafreier Triplett-Code ist.',
      rubric: [
        { id: 'triplett', label: 'Je drei Basen bilden ein Codon (Triplett)', any: [['drei|3|triplett']], weight: 1 },
        { id: 'ugug', label: 'UGUGUG: abwechselnd UGU und GUG → Cys und Val', any: [['ugu|gug', 'cys|val']], weight: 1 },
        { id: 'cua', label: 'CUACUA: je nach Startpunkt CUA, UAC oder ACU → Leu, Tyr oder Thr', any: [['cua|uac|acu', 'leu|tyr|thr|leseraster|startpunkt']], weight: 1 },
        { id: 'kommafrei', label: 'Kommafrei: Codons folgen lückenlos ohne Trennzeichen; der Startpunkt bestimmt das Leseraster', any: [['kommafrei|lueckenlos|ohne (luecke|trennzeichen|leerstelle|komma)|direkt hintereinander|startpunkt|leseraster']], weight: 1.5 },
      ],
      model: 'Bei UGUGUG… entstehen abwechselnd Cystein und Valin: Liest man in Dreiergruppen, folgen UGU (Cys) und GUG (Val) aufeinander – je drei Basen bilden also ein Codon. Bei CUACUA… entstehen Ketten nur aus Leucin, nur aus Tyrosin oder nur aus Threonin: Je nachdem, wo das Lesen beginnt, liegt das Leseraster auf CUA (Leu), UAC (Tyr) oder ACU (Thr). Da die Codons ohne Lücken und Trennzeichen hintereinander gelesen werden, legt allein der Startpunkt das Leseraster fest – der Code ist kommafrei.',
      why: [{ text: 'Aufgaben 1 und 2 aus Material A deiner PDF; Lösung abgeleitet mit der Codesonne.', prov: 'inf', src: [p(10, 'Material A')] }],
    },
    {
      id: 'code-q13', sub: 'code', type: 'free', level: 2, err: 'sequence', prov: 'pdf', src: [p(10)], operator: 'Beschreiben',
      prompt: 'Beschreibe den Fluss der genetischen Information von der DNA bis zum Merkmal.',
      rubric: [
        { id: 'transkription', label: 'Transkription: An einem DNA-Abschnitt wird eine mRNA gebildet', any: [['transkription|abgeschrieben|umgeschrieben', 'mrna|rna']], weight: 1 },
        { id: 'bote', label: 'Die mRNA bringt die Information zu den Ribosomen (DNA verlässt den Kern nicht)', any: [['ribosom|bote|kern|cytoplasma']], weight: 1 },
        { id: 'translation', label: 'Translation: Übersetzung in eine Aminosäuresequenz (Polypeptid/Protein)', any: [['translation|uebersetz', 'aminosaeure|polypeptid|protein']], weight: 1 },
        { id: 'merkmal', label: 'Das Protein (z. B. ein Enzym) bewirkt eine Stoffwechselreaktion → Merkmal', any: [['enzym|stoffwechsel|reaktion', 'merkmal']], weight: 1 },
      ],
      model: 'Die Information liegt in der Basensequenz der DNA. Bei der Transkription wird an einem bestimmten DNA-Abschnitt (Gen) ein mRNA-Molekül gebildet. Die mRNA überbringt die Information zu den Ribosomen im Cytoplasma – die DNA selbst verlässt bei Eukaryoten den Zellkern nicht. Bei der Translation wird die mRNA an den Ribosomen in eine Aminosäuresequenz übersetzt; es entsteht ein Polypeptid, z. B. ein Enzym. Dieses katalysiert eine Stoffwechselreaktion, die zum Merkmal führt.',
      why: [{ text: 'Schema „Fluss der genetischen Information“ (Abb. 1) deiner PDF.', prov: 'pdf', src: [p(10, 'Abb. 1')] }],
    },
    {
      id: 'code-q14', sub: 'code', type: 'cloze', level: 1, err: 'direction', prov: 'pdf', src: [p(10)],
      prompt: 'Ergänze die Lücken zur Codesonne.',
      text: 'Die Codesonne wird von {{0}} nach {{1}} gelesen und gibt die mRNA-Basentripletts in {{2}}-Richtung an.',
      gaps: [
        { accept: ['innen'], options: ['innen', 'außen'] },
        { accept: ['außen', 'aussen'], options: ['innen', 'außen'] },
        { accept: ["5'→3'", "5' → 3'", "5'-3'", '5→3'], options: ["5'→3'", "3'→5'"] },
      ],
      why: [{ text: 'Innen steht die erste Base des Codons, außen die dritte.', prov: 'inf', src: [p(10)] }],
    },
    {
      id: 'code-q15', sub: 'code', type: 'single', level: 1, err: 'experiment', prov: 'pdf', src: [p(10)],
      prompt: 'Wie wurde gezeigt, dass das Codon UUU für Phenylalanin steht?',
      options: [
        'Eine mRNA nur aus Uracil-Nucleotiden ergab im zellfreien System ein Polypeptid aus Phenylalanin.',
        'Durch Sequenzierung von Phenylalanin.',
        'Mit Mangelmutanten, die kein Phenylalanin bilden.',
        'Durch Gelelektrophorese von tRNA.',
      ],
      answer: 0,
      why: [{ text: 'Künstliche Poly-U-mRNA im zellfreien System → Polypeptid aus Phenylalanin.', prov: 'pdf', src: [p(10)] }],
    },
    {
      id: 'code-q16', sub: 'code', type: 'single', level: 2, err: 'code', prov: 'pdf', src: [p(10)],
      prompt: 'Warum beginnen alle neu gebildeten Polypeptide mit Methionin?',
      options: ['Weil das Startcodon AUG zugleich für Methionin codiert.', 'Weil Methionin die häufigste Aminosäure ist.', 'Weil Methionin kein Codon hat.', 'Weil die Stoppcodons Methionin einbauen.'],
      answer: 0,
      why: [{ text: 'AUG hat eine Doppelfunktion: Methionin und Start der Proteinbiosynthese.', prov: 'pdf', src: [p(10)] }],
    },
    {
      id: 'code-q17', sub: 'code', type: 'input', level: 4, err: 'code', prov: 'inf', src: [p(10), p(11)], mode: 'aa', figure: { widget: 'codon-table' },
      prompt: 'Codogener Strang: `3\'-TAC GGA CTT ATT CGA-5\'`. Gib die Aminosäuresequenz des gebildeten Polypeptids an.',
      accept: ['Met-Pro-Glu'],
      solution: "mRNA 5'-AUG CCU GAA UAA GCU-3' → Met-Pro-Glu, dann Stopp (UAA). GCU wird nicht mehr übersetzt.",
      why: [
        { text: 'Nach einem Stoppcodon bricht die Translation ab – folgende Codons werden nicht übersetzt.', prov: 'pdf', src: [p(10), p(13)] },
        { text: 'TAC→AUG (Met), GGA→CCU (Pro), CTT→GAA (Glu), ATT→UAA (Stopp).', prov: 'inf' },
      ],
    },
    // ---------------- transkription ----------------
    {
      id: 'tr-q1', sub: 'transkription', type: 'single', level: 1, err: 'terms', prov: 'pdf', src: [p(11)],
      prompt: 'An welche DNA-Sequenz bindet die RNA-Polymerase zu Beginn der Transkription?',
      options: ['an den Promotor', 'an den Terminator', 'an den Replikationsursprung', 'an das Startcodon'],
      answer: 0,
      feedback: { 3: 'Das Startcodon AUG liegt auf der mRNA und ist für die Translation wichtig.' },
      why: [{ text: 'Der Promotor legt den Startpunkt und den abzulesenden Strang fest.', prov: 'pdf', src: [p(11)] }],
    },
    {
      id: 'tr-q2', sub: 'transkription', type: 'single', level: 1, err: 'terms', prov: 'pdf', src: [p(11)],
      prompt: 'Wie heißt der DNA-Strang, der bei der Transkription als Kopiervorlage dient?',
      options: ['codogener Strang (Matrizenstrang)', 'Leitstrang', 'Folgestrang', 'Terminator'],
      answer: 0,
      feedback: { 1: 'Leit- und Folgestrang sind Begriffe der Replikation.' },
      why: [{ text: 'Nur einer der beiden freigelegten Einzelstränge dient als Vorlage: der codogene Strang.', prov: 'pdf', src: [p(11)] }],
    },
    {
      id: 'tr-q3', sub: 'transkription', type: 'order', level: 2, err: 'sequence', prov: 'pdf', src: [p(11)],
      prompt: 'Bringe die Schritte der Transkription in die richtige Reihenfolge.',
      items: [
        'RNA-Polymerase bindet an den Promotor',
        'DNA wird auf etwa 20 Basenpaaren entwunden',
        'Freie RNA-Nucleotide lagern sich komplementär an den codogenen Strang',
        'RNA-Polymerase verknüpft die Nucleotide am 3\'-Ende',
        'RNA-Polymerase erreicht den Terminator',
        'Die mRNA wird freigesetzt',
      ],
      why: [{ text: 'Bindung → Entwinden → Anlagern → Verknüpfen → Terminator → Freisetzen.', prov: 'pdf', src: [p(11)] }],
    },
    {
      id: 'tr-q4', sub: 'transkription', type: 'tf', level: 1, err: 'comparison', prov: 'pdf', src: [p(11)],
      prompt: 'Bei der Transkription wird die gesamte DNA einer Zelle kopiert.',
      answer: false,
      correction: 'Kopiert wird nur ein Gen – der Abschnitt, der für die Synthese eines Peptids oder einer RNA verantwortlich ist. Die gesamte DNA wird bei der Replikation kopiert.',
      why: [{ text: 'Genau das ist einer der Unterschiede zur Replikation.', prov: 'pdf', src: [p(11)] }],
    },
    {
      id: 'tr-q5', sub: 'transkription', type: 'input', level: 2, err: 'code', prov: 'inf', src: [p(11)], mode: 'seq',
      prompt: 'Der codogene Strang lautet `3\'-TACGGCATT-5\'`. Gib die gebildete mRNA in 5\'→3\'-Richtung an.',
      accept: ['AUGCCGUAA'],
      placeholder: "5'-…-3'",
      solution: "5'-AUGCCGUAA-3'",
      why: [
        { text: 'Die mRNA ist komplementär zum codogenen Strang; RNA enthält Uracil statt Thymin.', prov: 'pdf', src: [p(11), p(10)] },
        { text: 'T→A, A→U, C→G, G→C: TACGGCATT → AUGCCGUAA.', prov: 'inf' },
      ],
    },
    {
      id: 'tr-q6', sub: 'transkription', type: 'match', level: 1, err: 'terms', prov: 'pdf', src: [p(11), p(10)],
      prompt: 'Ordne jedem RNA-Typ seine Aufgabe zu.',
      pairs: [
        { left: 'mRNA', right: 'überbringt die Information von der DNA zu den Ribosomen' },
        { left: 'tRNA', right: 'transportiert Aminosäuren zu den Ribosomen' },
        { left: 'rRNA', right: 'gibt den Ribosomen mit Proteinen Struktur und Funktion' },
      ],
      why: [{ text: 'Alle drei RNA-Typen werden durch spezifische Gene codiert.', prov: 'pdf', src: [p(11)] }],
    },
    {
      id: 'tr-q7', sub: 'transkription', type: 'single', level: 2, err: 'mechanism', prov: 'pdf', src: [p(11)],
      prompt: 'Im EM-Bild zweigen unterschiedlich lange mRNA-Fäden von einem Gen ab. Warum?',
      options: [
        'Mehrere RNA-Polymerasen transkribieren das Gen gleichzeitig; weiter vom Start entfernt ist die Transkription schon weiter fortgeschritten.',
        'Die mRNA wird von Enzymen unterschiedlich stark abgebaut.',
        'Jede RNA-Polymerase liest ein anderes Gen.',
        'Die langen Fäden sind DNA, die kurzen RNA.',
      ],
      answer: 0,
      why: [{ text: 'Das erhöht die Menge an Protein, die pro Zeiteinheit gebildet werden kann.', prov: 'pdf', src: [p(11)] }],
    },
    {
      id: 'tr-q8', sub: 'transkription', type: 'single', level: 2, err: 'terms', prov: 'pdf', src: [p(11)],
      prompt: 'Welche Aufgabe hat der Promotor?',
      options: ['Er legt den Startpunkt fest und bestimmt, welcher DNA-Strang abgelesen wird.', 'Er beendet die Transkription.', 'Er codiert die erste Aminosäure.', 'Er verknüpft RNA-Nucleotide.'],
      answer: 0,
      why: [{ text: 'Durch den Promotor ist der Startpunkt der Transkription festgelegt und vorgegeben, welcher der beiden Stränge abgelesen wird.', prov: 'pdf', src: [p(11)] }],
    },
    {
      id: 'tr-q9', sub: 'transkription', type: 'free', level: 3, err: 'comparison', prov: 'inf', src: [p(11, 'Material A'), p(4), p(5)], operator: 'Vergleichen', compare: true,
      prompt: 'Vergleiche Replikation und Transkription hinsichtlich Funktion, Umfang, Vorlage, Enzym und Produkt.',
      rubric: [
        { id: 'funktion', group: 'Funktion', label: 'Replikation: DNA vor der Zellteilung verdoppeln; Transkription: Information eines Gens in mRNA umschreiben (für die Proteinbiosynthese)', any: [['verdopp|kopie|zellteilung', 'protein|mrna|genexpression|information']], weight: 1 },
        { id: 'umfang', group: 'Umfang', label: 'Replikation: gesamte DNA; Transkription: nur ein Gen', any: [['gesamt|ganze|komplett', 'gen|abschnitt']], weight: 1 },
        { id: 'vorlage', group: 'Vorlage', label: 'Replikation: beide Stränge; Transkription: nur der codogene Strang', any: [['beide', 'codogen|ein(en)? strang|nur ein|matrizen']], weight: 1 },
        { id: 'enzym', group: 'Enzym', label: 'DNA-Polymerase (mit Primer) vs. RNA-Polymerase (am Promotor)', any: [['dna ?polymerase', 'rna ?polymerase']], weight: 1 },
        { id: 'produkt', group: 'Produkt', label: 'DNA (Desoxyribose, T) vs. RNA (Ribose, Uracil, einzelsträngig)', any: [['ribose|uracil|einzelstr']], weight: 1 },
      ],
      model: 'Funktion: Die Replikation verdoppelt die DNA vor der Zellteilung; die Transkription schreibt die Information eines Gens in mRNA um – der erste Schritt der Proteinbiosynthese. Umfang: Bei der Replikation wird die gesamte DNA kopiert, bei der Transkription nur ein Gen. Vorlage: Bei der Replikation dienen beide Stränge als Vorlage, bei der Transkription nur der codogene Strang. Enzym: DNA-Polymerase (braucht einen Primer) bzw. RNA-Polymerase (bindet am Promotor). Produkt: DNA-Doppelstränge mit Desoxyribose und Thymin bzw. einzelsträngige RNA mit Ribose und Uracil. Gemeinsam ist beiden die komplementäre Basenpaarung an einem DNA-Einzelstrang.',
      why: [
        { text: 'Die Tabelle in Material A deiner PDF gibt einige Zeilen vor; die übrigen ergeben sich aus PDF S. 4, 5, 10 und 11.', prov: 'inf', src: [p(11, 'Material A')] },
        { text: 'Dass RNA-Polymerasen keinen Primer benötigen, steht nicht ausdrücklich in deiner PDF.', prov: 'ext', ext: RNAPOL_EXT },
      ],
    },
    {
      id: 'tr-q10', sub: 'transkription', type: 'free', level: 4, err: 'comparison', prov: 'inf', src: [p(11, 'Material A')], operator: 'Begründen',
      prompt: 'Begründe, warum Kopierfehler bei der Transkription geringere Folgen haben als Fehler bei der Replikation.',
      rubric: [
        { id: 'nur-mrna', label: 'Ein Transkriptionsfehler betrifft nur ein mRNA-Molekül (von vielen) und damit nur einzelne Proteine', any: [['mrna|rna|abschrift|kopie', 'eine|einzel|nur|wenige|viele']], weight: 1.5 },
        { id: 'dna-intakt', label: 'Die DNA bleibt unverändert – neue, fehlerfreie mRNA kann gebildet werden', any: [['dna', 'unveraendert|intakt|bleibt|korrekt|fehlerfrei|erneut|neu']], weight: 1 },
        { id: 'vererbt', label: 'Ein Replikationsfehler verändert die DNA dauerhaft (Mutation) und wird an Tochterzellen weitergegeben', any: [['tochterzell|vererb|weitergegeben|dauerhaft|mutation']], weight: 1.5 },
      ],
      model: 'Ein Fehler bei der Transkription betrifft nur ein einzelnes mRNA-Molekül. Von einem Gen werden viele mRNA-Moleküle gebildet (sogar gleichzeitig von mehreren RNA-Polymerasen), sodass nur ein kleiner Teil der Proteine fehlerhaft ist. Die DNA-Vorlage bleibt unverändert, und neue, fehlerfreie mRNA kann jederzeit gebildet werden. Ein Fehler bei der Replikation verändert dagegen die DNA selbst. Er bleibt als Mutation dauerhaft erhalten und wird an alle Tochterzellen weitergegeben.',
      why: [{ text: 'Aufgabe 3 aus Material A deiner PDF; die Begründung ist abgeleitet (keine Lösung in der PDF).', prov: 'inf', src: [p(11, 'Material A')] }],
    },
    {
      id: 'tr-q11', sub: 'transkription', type: 'cloze', level: 1, err: 'facts', prov: 'pdf', src: [p(11)],
      prompt: 'Ergänze die Lücken zur Transkription.',
      text: 'Die RNA-Polymerase löst die Wasserstoffbrücken auf einer Strecke von etwa {{0}} Basenpaaren. Freie RNA-Nucleotide lagern sich an das {{1}}-Ende des wachsenden Strangs an. An einer bestimmten Basensequenz, dem {{2}}, löst sich die Polymerase von der DNA.',
      gaps: [
        { accept: ['20', 'zwanzig'], options: ['3', '20', '200', '2000'] },
        { accept: ["3'", '3'], options: ["3'", "5'"] },
        { accept: ['Terminator'], options: ['Terminator', 'Promotor', 'Primer', 'Codon'] },
      ],
      why: [{ text: 'Alle drei Angaben stehen auf PDF S. 11.', prov: 'pdf', src: [p(11)] }],
    },
    {
      id: 'tr-q12', sub: 'transkription', type: 'free', level: 2, err: 'sequence', prov: 'pdf', src: [p(11)], operator: 'Beschreiben',
      prompt: 'Beschreibe den Ablauf der Transkription bei Prokaryoten.',
      rubric: [
        { id: 'promotor', label: 'RNA-Polymerase bindet an den Promotor', any: [['promotor']], weight: 1 },
        { id: 'entwinden', label: 'DNA wird entwunden/geöffnet (ca. 20 bp, mit Transkriptionsfaktoren)', any: [['entwind|oeffn|wasserstoff|20']], weight: 1 },
        { id: 'codogen', label: 'Der codogene Strang dient als Vorlage', any: [['codogen|matrize|vorlage']], weight: 1 },
        { id: 'komplementaer', label: 'Komplementäre RNA-Nucleotide werden verknüpft (U statt T)', any: [['komplementaer|nucleotid|nukleotid']], weight: 1 },
        { id: 'terminator', label: 'Am Terminator löst sich die Polymerase, die mRNA wird frei', any: [['terminator']], weight: 1 },
      ],
      model: 'Die RNA-Polymerase bindet an den Promotor am Anfang des Gens. Sie bewegt sich entlang der DNA und entwindet sie mithilfe von Transkriptionsfaktoren; auf etwa 20 Basenpaaren lösen sich die Wasserstoffbrücken. Einer der beiden Stränge, der codogene Strang, dient als Vorlage: Freie RNA-Nucleotide lagern sich komplementär an und werden von der RNA-Polymerase am 3\'-Ende des wachsenden Strangs verknüpft. Erreicht die Polymerase den Terminator, löst sie sich von der DNA und die mRNA wird freigesetzt.',
      why: [{ text: 'Schema „Teilschritte der Transkription“ (Abb. 1) deiner PDF.', prov: 'pdf', src: [p(11, 'Abb. 1')] }],
    },
  ],

  experiments: [
    {
      id: 'exp-beadle', sub: 'genfunktion', title: 'Mangelmutanten von Neurospora crassa', who: 'George Beadle & Edward Tatum', src: [p(9)], widget: 'beadle-tatum',
      steps: [
        { key: 'frage', text: 'Wie hängen Gene und Enzyme zusammen? An welcher Stelle der Argininsynthese sind die Mutanten gestört?', prov: 'pdf' },
        { key: 'material', text: 'Neurospora crassa (haploid); Röntgenstrahlen; Minimalnährmedium (MM) sowie MM + Ornithin, + Citrullin, + Arginin.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'Pilzkulturen bestrahlen → Mangelmutanten auswählen, die kein Arginin herstellen → auf den vier Medien wachsen lassen.', prov: 'pdf' },
        { key: 'beobachtung', text: 'Wildtyp wächst überall. Typ I wächst mit Ornithin, Citrullin oder Arginin. Typ II nur mit Citrullin oder Arginin. Typ III nur mit Arginin.', prov: 'pdf', predict: 'Auf welchen Medien wächst eine Mutante, deren Enzym B (Ornithin → Citrullin) defekt ist?' },
        { key: 'ergebnis', text: 'Bei jedem Typ ist ein anderes Enzym der Reaktionskette ausgefallen (A, B bzw. C).', prov: 'pdf' },
        { key: 'schluss', text: 'Jedes Enzym wird von einem Gen codiert: Ein-Gen-ein-Enzym-Hypothese; die Gene wirken als Genwirkkette zusammen.', prov: 'pdf' },
        { key: 'methode', text: 'Warum Zwischenprodukte zugeben? Eine Mutante wächst, sobald ein Stoff hinter dem blockierten Schritt angeboten wird – so lässt sich die Blockade lokalisieren.', prov: 'inf' },
      ],
      questionIds: ['gf-q5', 'gf-q6', 'gf-q10', 'gf-q12'],
    },
    {
      id: 'exp-code', sub: 'code', title: 'Entschlüsselung des genetischen Codes', src: [p(10)], widget: 'translator',
      steps: [
        { key: 'frage', text: 'Welche Basentripletts codieren welche Aminosäuren?', prov: 'inf' },
        { key: 'material', text: 'Zellfreies System aus zerstörten Zellen mit allen Bestandteilen der Proteinbiosynthese; künstlich hergestellte mRNA.', prov: 'pdf' },
        { key: 'durchfuehrung', text: 'Künstliche mRNA (z. B. nur aus Uracil, UGUG…, CUACUA…) ins zellfreie System geben und die gebildeten Polypeptide analysieren.', prov: 'pdf' },
        { key: 'beobachtung', text: 'Poly-U → nur Phenylalanin. UGUG… → abwechselnd Cys und Val. CUACUA… → nur Leu, nur Tyr oder nur Thr.', prov: 'pdf', predict: 'Welche Aminosäure erwartest du bei Poly-U?' },
        { key: 'schluss', text: 'UUU codiert Phenylalanin; der Code ist ein kommafreier Triplett-Code. Weitere Versuche entschlüsselten den vollständigen Code (Codesonne).', prov: 'pdf' },
        { key: 'methode', text: 'Warum zellfrei? Nur so kann man eine selbst gewählte mRNA einsetzen und das Produkt eindeutig dieser mRNA zuordnen.', prov: 'inf' },
      ],
      questionIds: ['code-q10', 'code-q11', 'code-q12', 'code-q15'],
    },
  ],

  examTasks: [],
};
