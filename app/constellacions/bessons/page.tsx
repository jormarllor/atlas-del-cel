import Link from "next/link";
import GeminiArt from "../../../components/GeminiArt";
import GeminiMap from "../../../components/GeminiMap";
import GeminiRouteExplorer from "../../../components/GeminiRouteExplorer";
import SourceNotes, { type SourceReference } from "../../../components/SourceNotes";
import TonightSkyCard from "../../../components/TonightSkyCard";

const objects = [
  {
    name: "Pòl·lux",
    kind: "Gegant ataronjada",
    visibility: "Ull nu",
    text: "És l’estrella més brillant de Bessons i mostra una tonalitat càlida subtil. La NASA confirma que l’orbita almenys un planeta, Pòl·lux b, amb una massa superior a dues vegades la de Júpiter.",
  },
  {
    name: "Càstor",
    kind: "Sistema estel·lar múltiple",
    visibility: "Ull nu · telescopi",
    text: "A ull nu sembla una sola estrella; físicament, és un sistema extraordinari de sis estrelles. Un telescopi permet començar a separar-ne els components més evidents, però la seva arquitectura completa va molt més enllà del que veu l’ull.",
  },
  {
    name: "M35",
    kind: "Cúmul obert",
    visibility: "Prismàtics · telescopi petit",
    text: "És el gran objecte Messier de Bessons, prop del peu marcat per Propus. En un cel fosc es pot insinuar a ull nu, però els prismàtics i els telescopis petits el converteixen en un camp ric d’estrelles.",
  },
  {
    name: "Alhena",
    kind: "Estrella blanca",
    visibility: "Ull nu",
    text: "Tanca el traç que baixa des de Pòl·lux i ajuda a llegir el cos sencer d’un dels germans. És una fita observacional útil perquè brilla prou per mantenir-se visible fins i tot des de cels moderadament il·luminats.",
  },
];

const sources: SourceReference[] = [
  {
    title: "IAU · The Constellations",
    detail: "Nom oficial Gemini, abreviatura i marc de les constel·lacions com a regions del cel",
    href: "https://iauarchive.eso.org/public/themes/constellations/",
    consultationDate: "2026-09-02",
  },
  {
    title: "SIMBAD · CDS",
    detail: "Coordenades ICRS de Pòl·lux, Càstor, Alhena, Wasat, Mebsuta, Mekbuda, Tejat, Propus i M35",
    href: "https://simbad.cds.unistra.fr/simbad/",
    consultationDate: "2026-09-02",
  },
  {
    title: "NASA Science · Find the Twins: Gemini Constellation",
    detail: "Ruta des d’Orió, distàncies de Càstor i Pòl·lux, sistema múltiple de Càstor, Pòl·lux b i observació de M35",
    href: "https://science.nasa.gov/solar-system/skywatching/night-sky-network/gemini-constellation/",
    consultationDate: "2026-09-02",
  },
  {
    title: "Píndar · Nemea 10, 55–90",
    detail: "Mort de Càstor i decisió de Polideuces de compartir el destí entre el món subterrani i l’Olimp",
    href: "https://topostext.org/work/20",
    consultationDate: "2026-09-02",
  },
  {
    title: "Higí · Astronomica, 2.22",
    detail: "Catasterisme, protecció dels navegants i identificacions alternatives de les estrelles dels Bessons",
    href: "https://topostext.org/work/207",
    consultationDate: "2026-09-02",
  },
  {
    title: "Himne homèric als Dioscurs",
    detail: "Càstor, Polideuces, Leda, la tradició dels Tindàrides i el vincle amb els cavalls",
    href: "https://topostext.org/work/370",
    consultationDate: "2026-09-02",
  },
  {
    title: "Apol·loni de Rodes · Argonàutiques, 1.146–150",
    detail: "Càstor i Polideuces entre els herois que parteixen amb l’Argo",
    href: "https://topostext.org/work/126",
    consultationDate: "2026-09-02",
  },
];

export default function GeminiPage() {
  return (
    <main>
      <section className="page-hero wrap constellation-hero gemini-hero">
        <div>
          <Link href="/constellacions" className="back-link">← Constel·lacions</Link>
          <p className="eyebrow">HIVERN I INICI DE PRIMAVERA · NIVELL FÀCIL</p>
          <h1>Bessons</h1>
          <p className="lead">Els dos germans que caminen junts pel cel d’hivern.</p>
        </div>
        <dl className="facts">
          <div><dt>Millor època al vespre</dt><dd>Desembre – abril</dd></div>
          <div><dt>Patró</dt><dd>Dos caps brillants i dos traços paral·lels</dd></div>
          <div><dt>Estrella de referència</dt><dd>Pòl·lux</dd></div>
          <div><dt>Observació</dt><dd>Ull nu · prismàtics · telescopi petit</dd></div>
          <div><dt>Nom oficial IAU</dt><dd>Gemini</dd></div>
        </dl>
      </section>

      <div className="wrap tonight-wrap">
        <TonightSkyCard
          name="Bessons"
          referenceName="Pòl·lux"
          coordinate={{ raHours: 7 + 45 / 60 + 18.94987 / 3600, decDeg: 28 + 1 / 60 + 34.316 / 3600 }}
          objectArticle="els"
          isPlural
          referenceDescription="La posició es calcula prenent Pòl·lux, l’estrella més brillant de Bessons, com a referència de la constel·lació."
        />
      </div>

      <section className="wrap section gemini-recognition">
        <div className="gemini-heads-mark" aria-hidden="true">
          <span className="castor-head" /><span className="pollux-head" /><i /><b>CÀSTOR · PÒL·LUX</b>
        </div>
        <div>
          <p className="section-kicker">COM TROBAR-LA</p>
          <h2>Travessa Orió i continua fins als dos caps.</h2>
          <p>Comença a <strong>Rigel</strong>, passa pel <strong>cinturó d’Orió</strong> i continua per <strong>Betelgeuse</strong>. Si prolongues aquesta direcció general sobre el cel, arribaràs a dues estrelles brillants i pròximes en aparença: <strong>Càstor i Pòl·lux</strong>. La ruta, descrita també per la NASA, funciona com una alineació; no depèn d’una dreta o esquerra que pugui canviar amb l’hora o l’orientació.</p>
          <p className="science-separation"><strong>Una parella només en perspectiva:</strong> Pòl·lux és a uns 34 anys llum i Càstor a uns 51. No formen un sistema físic entre ells: comparteixen el dibuix que veiem des de la Terra, no el mateix veïnat tridimensional.</p>
        </div>
      </section>

      <section className="wrap constellation-layout dual-visual-layout">
        <div>
          <div className="section-heading compact-heading"><div><p className="section-kicker">MAPA DE RECONEIXEMENT</p><h2>Dos caps, dos cossos i un cúmul als peus</h2></div></div>
          <GeminiMap />
          <p className="map-note stronger-note">Les estrelles i M35 es projecten a partir de <strong>coordenades equatorials en el sistema ICRS, referides a l’època J2000.0</strong>. Les línies són una ajuda visual i poden variar entre atles: la IAU defineix les constel·lacions com a regions del cel, no com aquests dibuixos. La figura mitològica és una capa interpretativa separada.</p>
        </div>
        <aside className="find-card">
          <p className="section-kicker">LLEGEIX EL PATRÓ</p>
          <h2>De la parella als dos traços</h2>
          <ol>
            <li>Identifica <strong>Càstor i Pòl·lux</strong> com els dos caps brillants.</li>
            <li>Des de Càstor, segueix <strong>Mebsuta, Tejat i Propus</strong>.</li>
            <li>Des de Pòl·lux, baixa per <strong>Wasat i Mekbuda fins a Alhena</strong>.</li>
            <li>Amb prismàtics, busca <strong>M35</strong> a prop de Propus, al peu del traç de Càstor.</li>
          </ol>
        </aside>
      </section>

      <section className="wrap section">
        <div className="section-heading"><div><p className="section-kicker">QUÈ ESTÀS VEIENT?</p><h2>Quatre coses que val la pena observar</h2></div></div>
        <div className="object-grid">
          {objects.map(object => (
            <article className="object-card" key={object.name}>
              <div className="object-meta"><span>{object.kind}</span><span>{object.visibility}</span></div>
              <h3>{object.name}</h3><p>{object.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section artistic-panel gemini-artistic-panel">
        <div className="section-heading compact-heading">
          <div><p className="section-kicker">BESSONS IMAGINATS</p><h2>Els germans entre les estrelles</h2></div>
        </div>
        <GeminiArt />
      </section>

      <section className="myth-section gemini-myth-section">
        <div className="wrap gemini-myth-layout">
          <div className="myth-figure gemini-myth-figure" aria-hidden="true"><span>Ⅱ</span><p>DIOSCURS</p></div>
          <div>
            <p className="section-kicker">CÀSTOR I POLIDEUCES</p>
            <h2>Dos germans units fins i tot davant la mort</h2>
            <p>Els grecs els coneixien com els <strong>Dioscurs</strong>. El nom grec del segon germà és <strong>Polideuces</strong>; <em>Pollux</em>, d’on prové el català <strong>Pòl·lux</strong> emprat per a l’estrella, és la forma llatinitzada. <strong>Leda</strong> i <strong>Tindàreu</strong> ocupen el centre de la tradició espartana, però les fonts no transmeten una genealogia única. L’<em>Himne homèric als Dioscurs</em> els presenta tots dos com a fills de Zeus nascuts de Leda i, alhora, els anomena Tindàrides. En canvi, la <em>Nemea 10</em> de <strong>Píndar</strong> distingeix Polideuces, fill de Zeus i immortal, de Càstor, fill mortal de Tindàreu.</p>
            <p>En el relat de Píndar, una disputa pel bestiar desemboca en el combat amb <strong>Idas i Linceu</strong>. Càstor és ferit mortalment; Polideuces el troba encara agonitzant i demana a Zeus no continuar sense ell. Zeus li ofereix conservar tota la seva immortalitat o compartir el destí del germà. Polideuces tria la segona opció: tots dos passen alternativament una part del temps sota terra i una altra a les llars de l’Olimp. No és només una història de bessons, sinó una narració sobre la lleialtat que accepta fins i tot la mort compartida.</p>

            <div className="myth-stories-grid">
              <article>
                <p className="section-kicker">HEROIS I NAVEGANTS</p>
                <h3>De l’Argo al mar nocturn</h3>
                <p><strong>Apol·loni de Rodes</strong> inclou Càstor i Polideuces entre els herois de l’Argo i destaca l’habilitat eqüestre de Càstor. <strong>Higí</strong> associa els germans als cavalls concedits per Neptú i al poder d’ajudar els nàufrags. Així, la parella reuneix equitació, viatge heroic i protecció dels navegants sense que totes les fonts expliquin aquests vincles de la mateixa manera.</p>
              </article>
              <article>
                <p className="section-kicker">DEL RELAT AL CEL</p>
                <h3>Un catasterisme i altres lectures</h3>
                <p>Higí explica que Júpiter els va situar entre les estrelles com a recompensa pel seu vincle fraternal. Però conserva també variants: alguns identificaven aquestes estrelles amb <strong>Hèracles i Apol·lo</strong>, i d’altres amb <strong>Triptòlem i Iasió</strong>. La figura dels germans és la lectura dominant, no l’única que va existir.</p>
              </article>
            </div>
            <p className="myth-conclusion">El mapa mostra dues cadenes d’estrelles que semblen caminar juntes; les fonts antigues hi van veure germans, herois, genets i protectors del mar. El mateix patró celeste va admetre més d’una memòria.</p>
          </div>
        </div>
      </section>

      <section className="wrap section route-card interactive-route-card">
        <p className="section-kicker">STAR HOPPING</p>
        <h2>D’Orió als dos caps, i dels dos cossos fins a M35.</h2>
        <p className="muted route-intro">La ruta exterior és una alineació; la ruta interior es divideix per respectar la forma real dels dos Bessons.</p>
        <GeminiRouteExplorer />
      </section>

      <SourceNotes references={sources} />

      <nav className="wrap constellation-pagination constellation-pagination-back" aria-label="Navegació entre constel·lacions">
        <Link href="/constellacions/ca-major"><strong>← Ca Major</strong><span>Torna al gran gos</span></Link>
      </nav>
    </main>
  );
}
