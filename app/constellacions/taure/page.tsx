import Link from "next/link";
import TaurusArt from "../../../components/TaurusArt";
import TaurusMap from "../../../components/TaurusMap";
import TaurusRouteExplorer from "../../../components/TaurusRouteExplorer";
import SourceNotes, { type SourceReference } from "../../../components/SourceNotes";
import TonightSkyCard from "../../../components/TonightSkyCard";

const objects = [
  {
    name: "Aldebaran",
    kind: "Gegant taronja",
    visibility: "Ull nu",
    text: "Marca visualment l’ull del toro. Apareix dins de la V de les Híades, però és una estrella independent i molt més propera a nosaltres que el cúmul.",
  },
  {
    name: "Híades",
    kind: "Cúmul obert",
    visibility: "Ull nu · prismàtics",
    text: "És un dels cúmuls oberts més propers i les seves estrelles més brillants dibuixen la V que reconeixem com el cap de Taure.",
  },
  {
    name: "Plèiades · M45",
    kind: "Cúmul obert",
    visibility: "Ull nu · prismàtics",
    text: "Una agrupació compacta i espectacular a ull nu. Amb prismàtics apareixen moltes més estrelles i el cúmul guanya profunditat.",
  },
  {
    name: "Nebulosa del Cranc · M1",
    kind: "Romanent de supernova",
    visibility: "Telescopi",
    text: "És el romanent de l’explosió estel·lar observada l’any 1054. Es troba prop de Zeta Tauri, però és molt menys evident que les estrelles de la figura.",
  },
];

const sources: SourceReference[] = [
  {
    title: "IAU · The Constellations",
    detail: "Definició i límits oficials de Taure",
    href: "https://iauarchive.eso.org/public/themes/constellations/",
    consultationDate: "2026-09-02",
  },
  {
    title: "SIMBAD · CDS",
    detail: "Coordenades d’Aldebaran, les Híades, les banyes i les Plèiades",
    href: "https://simbad.cds.unistra.fr/simbad/",
    consultationDate: "2026-09-02",
  },
  {
    title: "NASA Science · Messier 1",
    detail: "Naturalesa i observació de la Nebulosa del Cranc",
    href: "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/",
    consultationDate: "2026-09-02",
  },
  {
    title: "Higí · Astronomica, 2.21",
    detail: "El toro d’Europa, les Híades i les Plèiades",
    href: "https://topostext.org/work/207",
    consultationDate: "2026-09-02",
  },
  {
    title: "Biblioteca atribuïda a Apol·lodor, 3.1",
    detail: "Europa, Zeus, Creta i la genealogia cretenca",
    href: "https://topostext.org/work/150",
    consultationDate: "2026-09-02",
  },
  {
    title: "Ovidi · Metamorfosis, 2.833–875",
    detail: "La trobada d’Europa amb el toro",
    href: "https://topostext.org/work/141",
    consultationDate: "2026-09-02",
  },
];

export default function TaurusPage() {
  return (
    <main>
      <section className="page-hero wrap constellation-hero taurus-hero">
        <div>
          <Link href="/constellacions" className="back-link">← Constel·lacions</Link>
          <p className="eyebrow">TARDOR I HIVERN · NIVELL FÀCIL</p>
          <h1>Taure</h1>
          <p className="lead">Una V d’estrelles, un ull taronja i un dels cúmuls més famosos del cel.</p>
        </div>
        <dl className="facts">
          <div><dt>Millor època</dt><dd>Tardor i hivern</dd></div>
          <div><dt>Patró</dt><dd>V de les Híades</dd></div>
          <div><dt>Estrella de referència</dt><dd>Aldebaran</dd></div>
          <div><dt>Observació</dt><dd>Ull nu · prismàtics · telescopi</dd></div>
          <div><dt>Nom oficial IAU</dt><dd>Taurus</dd></div>
        </dl>
      </section>

      <div className="wrap tonight-wrap">
        <TonightSkyCard
          name="Taure"
          referenceName="Aldebaran"
          coordinate={{ raHours: 4 + 35 / 60 + 55.24 / 3600, decDeg: 16 + 30 / 60 + 33.5 / 3600 }}
          objectArticle="el"
          referenceDescription="La posició es calcula prenent Aldebaran, l’ull del Taure, com a referència de la constel·lació."
        />
      </div>

      <section className="wrap section taurus-recognition">
        <div className="taurus-v-mark" aria-hidden="true"><span>V</span></div>
        <div>
          <p className="section-kicker">EL PATRÓ QUE HAS DE TROBAR</p>
          <h2>La V de les Híades dibuixa el cap del toro.</h2>
          <p>Busca una V ampla d’estrelles i fixa’t en el punt taronja que sembla formar-ne un dels braços: és Aldebaran, l’ull de Taure.</p>
          <p className="science-separation"><strong>Una coincidència de perspectiva:</strong> Aldebaran no forma part físicament de les Híades. Es troba en la mateixa línia de visió, però és molt més propera a la Terra que les estrelles del cúmul.</p>
        </div>
      </section>

      <section className="wrap constellation-layout dual-visual-layout">
        <div>
          <div className="section-heading compact-heading"><div><p className="section-kicker">MAPA DE RECONEIXEMENT</p><h2>Del cap del toro fins a les banyes i les Plèiades</h2></div></div>
          <TaurusMap />
          <p className="map-note stronger-note">Les estrelles, els cúmuls i M1 es projecten a partir de <strong>coordenades equatorials en el sistema ICRS, referides a l’època J2000.0</strong>. Les línies són una ajuda visual i poden variar entre atles: la IAU defineix les constel·lacions com a regions del cel, no com aquests dibuixos. La figura mitològica és una capa interpretativa separada.</p>
        </div>
        <aside className="find-card">
          <p className="section-kicker">COM TROBAR-LA</p>
          <h2>Comença per Aldebaran</h2>
          <ol>
            <li>Localitza el <strong>cinturó d’Orió</strong> i prolonga’n la línia en la direcció oposada a Sirius.</li>
            <li>Atura’t a la primera estrella molt brillant i taronja: <strong>Aldebaran</strong>.</li>
            <li>Observa les estrelles que l’envolten i reconstrueix la <strong>V de les Híades</strong>.</li>
            <li>Segueix cap a l’oest del mapa fins al grup compacte de les <strong>Plèiades</strong>.</li>
            <li>Per a un repte amb telescopi, busca <strong>Zeta Tauri</strong> i, molt a prop, <strong>M1</strong>.</li>
          </ol>
        </aside>
      </section>

      <section className="wrap section">
        <div className="section-heading"><div><p className="section-kicker">QUÈ ESTÀS VEIENT?</p><h2>Quatre objectes, quatre profunditats diferents</h2></div></div>
        <div className="object-grid">
          {objects.map(object => (
            <article className="object-card" key={object.name}>
              <div className="object-meta"><span>{object.kind}</span><span>{object.visibility}</span></div>
              <h3>{object.name}</h3><p>{object.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section artistic-panel taurus-artistic-panel">
        <div className="section-heading compact-heading">
          <div><p className="section-kicker">TAURE IMAGINAT</p><h2>El toro entre les estrelles</h2></div>
        </div>
        <TaurusArt />
      </section>

      <section className="myth-section taurus-myth-section">
        <div className="wrap taurus-myth-layout">
          <div className="myth-figure" aria-hidden="true"><span>♉</span><p>TAURE</p></div>
          <div>
            <p className="section-kicker">LA HISTÒRIA DEL TORO</p>
            <h2>Zeus, Europa i una figura més antiga que un sol relat</h2>
            <p>En una de les tradicions grecollatines més conegudes, <strong>Europa</strong> és una princesa fenícia —les fonts discrepen sobre si el seu pare és Agenor o Fènix— que es troba prop del mar amb altres joves. Zeus adopta la forma d’un toro blanc, bell i aparentment mansuet; Europa s’hi acosta, l’acarona i acaba pujant-li al llom. Aleshores el toro entra a l’aigua i la transporta fins a <strong>Creta</strong>. Ovidi situa la trobada entre els ramats de la costa i en destaca la confiança gradual d’Europa en l’animal.</p>
            <p>A l’illa, Europa queda vinculada a la genealogia dels reis cretencs. Una tradició la fa mare, amb Zeus, de <strong>Minos</strong>, <strong>Radamant</strong> i <strong>Sarpèdon</strong>; altres genealogies discrepen sobre alguns d’aquests parentius. Europa es casa després amb Asterió, rei de Creta, que acull els fills. La història va tenir moltes versions, i convé no convertir-ne cap en un relat únic i tancat.</p>
            <p>Higí recull la identificació de la constel·lació amb el toro que va portar Europa fins a Creta, però també n’esmenta una altra: Taure podria recordar <strong>Io</strong>, transformada en vedella. El mateix autor explica per què sovint només s’imagina la part anterior de l’animal: el toro queda ben definit al davant i es difumina al darrere; les <strong>Híades</strong> en dibuixen el rostre.</p>
            <p>Per tant, relacionar Taure amb Zeus i Europa és una tradició clàssica important, no una equivalència universal. La imatge del toro al cel és més antiga i més àmplia que aquest episodi grec, i altres cultures van llegir aquesta regió amb marcs simbòlics propis. Compartir una figura bovina no significa compartir necessàriament el mateix mite.</p>

            <div className="myth-stories-grid">
              <article>
                <p className="section-kicker">LES PLÈIADES</p>
                <h3>Les set germanes</h3>
                <p>En la genealogia més estesa són set filles d’<strong>Atlas</strong> i <strong>Pleione</strong>: Maia, Electra, Taígete, Alcíone, Celeno, Estèrope i Mèrope. Una tradició explica que <strong>Orió</strong> persegueix Pleione i les filles durant anys fins que Zeus les converteix en estrelles. El moviment aparent del cel manté la imatge: Orió sembla seguir el cúmul cap a l’oest.</p>
                <p>Una altra genealogia antiga les vincula amb les Híades i explica el seu destí celeste a partir del dol per les germanes. Fins i tot la «setena estrella» poc visible rep explicacions diferents: segons la versió, és Mèrope o Electra qui s’apaga per vergonya o per dol.</p>
              </article>
              <article>
                <p className="section-kicker">LES HÍADES</p>
                <h3>El dol per Hias</h3>
                <p>Les Híades també tenen genealogies, noms i nombres variables. Higí conserva una versió en què són filles d’Atlas i germanes d’<strong>Hias</strong>: després que ell mori en una cacera de lleons, les germanes s’entreguen a un dol tan intens que moren i queden associades a les estrelles.</p>
                <p>Una altra tradició les converteix en nimfes que van tenir cura de <strong>Dionís</strong> i que són recompensades amb un lloc entre les estrelles. No són el mateix grup mític que les Plèiades, encara que els dos cúmuls comparteixin la regió celeste de Taure.</p>
              </article>
            </div>
            <p className="myth-conclusion">El cel real connecta visualment el toro, les Híades i les Plèiades. Els seus mites, però, no formen un únic conte: són relats diferents que coincideixen en una mateixa regió del firmament.</p>
          </div>
        </div>
      </section>

      <section className="wrap section route-card interactive-route-card">
        <p className="section-kicker">STAR HOPPING</p>
        <h2>D’Orió a les Plèiades, i de la V fins a la Nebulosa del Cranc.</h2>
        <p className="muted route-intro">Comença amb la ruta visible a ull nu i, quan vulguis un repte més exigent, continua cap a M1.</p>
        <TaurusRouteExplorer />
      </section>

      <nav className="wrap constellation-pagination constellation-pagination-back" aria-label="Navegació entre constel·lacions">
        <Link href="/constellacions/orio"><strong>← Orió</strong><span>Constel·lació anterior</span></Link>
      </nav>

      <SourceNotes references={sources} />
    </main>
  );
}
