import Link from "next/link";
import AndromedaArt from "../../../components/AndromedaArt";
import AndromedaMap from "../../../components/AndromedaMap";
import AndromedaRouteExplorer from "../../../components/AndromedaRouteExplorer";
import SourceNotes, { type SourceReference } from "../../../components/SourceNotes";
import TonightSkyCard from "../../../components/TonightSkyCard";

const objects = [
  {
    name: "M31 · Galàxia d’Andròmeda",
    kind: "Galàxia espiral",
    visibility: "Ull nu en cel fosc · prismàtics",
    text: "La taca feble que arriba als teus ulls és la llum combinada d’una altra gran galàxia després d’un viatge d’uns 2,5 milions d’anys. A ull nu o amb prismàtics en veuràs sobretot la regió central difusa, no els braços espirals detallats de les fotografies.",
  },
  {
    name: "Mirach",
    kind: "Gegant vermella",
    visibility: "Ull nu",
    text: "És el punt càlid i central de la cadena d’Andròmeda. A més de donar estructura a la constel·lació, és la millor fita per iniciar el salt curt cap a μ, ν Andromedae i M31.",
  },
  {
    name: "Almach",
    kind: "Sistema estel·lar múltiple",
    visibility: "Ull nu · telescopi petit",
    text: "Tanca l’extrem oriental de la cadena. Amb telescopi petit, el punt únic es resol en dues llums pròximes amb un contrast de tonalitats sovint percebut com daurat i blavós; la component més feble forma part d’un sistema encara més estret.",
  },
  {
    name: "M32",
    kind: "Galàxia satèl·lit compacta",
    visibility: "Telescopi petit",
    text: "Apareix molt a prop del nucli de M31 com una boirina petita i concentrada. És una bona quarta aturada perquè obliga a distingir una galàxia compacta del resplendor molt més extens i tènue de la seva gran veïna.",
  },
];

const sources: SourceReference[] = [
  {
    title: "IAU · The Constellations",
    detail: "Nom oficial Andromeda i marc de les constel·lacions com a regions delimitades del cel",
    href: "https://iauarchive.eso.org/public/themes/constellations/",
    consultationDate: "2026-09-03",
  },
  {
    title: "SIMBAD · CDS",
    detail: "Coordenades ICRS i classificacions d’Alpheratz, Mirach, Almach, μ i ν Andromedae, M31 i M32",
    href: "https://simbad.cds.unistra.fr/simbad/",
    consultationDate: "2026-09-03",
  },
  {
    title: "NASA Science · Messier 31",
    detail: "Distància, magnitud aparent, extensió angular i diferència entre l’observació visual i les imatges de la galàxia d’Andròmeda",
    href: "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/",
    consultationDate: "2026-09-03",
  },
  {
    title: "ESA/Hubble · Sharpest ever view of the Andromeda Galaxy",
    detail: "Escala i complexitat de la galàxia revelades per la fotografia d’alta resolució, en contrast amb la taca visible al cel",
    href: "https://esahubble.org/images/heic1502a/",
    consultationDate: "2026-09-03",
  },
  {
    title: "Biblioteca atribuïda a Apol·lodor, 2.4.3",
    detail: "Cassiopea davant les Nereides, càstig de Posidó, exposició d’Andròmeda i arribada de Perseu",
    href: "https://www.theoi.com/Text/Apollodorus2.html",
    consultationDate: "2026-09-03",
  },
  {
    title: "Higí · Fabulae, 64",
    detail: "Variant que situa la comparació amb les Nereides en la bellesa d’Andròmeda",
    href: "https://topostext.org/work/206",
    consultationDate: "2026-09-03",
  },
  {
    title: "Higí · Astronomica, 2.11",
    detail: "Relat del catasterisme d’Andròmeda després de l’alliberament",
    href: "https://topostext.org/work/207",
    consultationDate: "2026-09-03",
  },
  {
    title: "Ovidi · Metamorfosis, 4.663–739",
    detail: "Andròmeda encadenada i combat de Perseu contra el monstre amb l’espasa",
    href: "https://www.theoi.com/Text/OvidMetamorphoses4.html",
    consultationDate: "2026-09-03",
  },
  {
    title: "Arat · Fenòmens, 198–204",
    detail: "Descripció celeste de la figura d’Andròmeda i la seva relació espacial amb Pegàs i Perseu",
    href: "https://topostext.org/work/551",
    consultationDate: "2026-09-03",
  },
];

export default function AndromedaPage() {
  return (
    <main>
      <section className="page-hero wrap constellation-hero andromeda-hero">
        <div>
          <Link href="/constellacions" className="back-link">← Constel·lacions</Link>
          <p className="eyebrow">TARDOR · NIVELL FÀCIL</p>
          <h1>Andròmeda</h1>
          <p className="lead">La princesa encadenada i una galàxia més enllà de la Via Làctia.</p>
        </div>
        <dl className="facts">
          <div><dt>Millor època al vespre</dt><dd>Setembre – febrer</dd></div>
          <div><dt>Patró</dt><dd>Una cadena d’Alpheratz a Almach</dd></div>
          <div><dt>Estrella de referència</dt><dd>Mirach</dd></div>
          <div><dt>Observació</dt><dd>Ull nu · prismàtics · telescopi petit</dd></div>
          <div><dt>Nom oficial IAU</dt><dd>Andromeda</dd></div>
        </dl>
      </section>

      <div className="wrap tonight-wrap">
        <TonightSkyCard
          name="Andròmeda"
          referenceName="Mirach"
          coordinate={{ raHours: 1 + 9 / 60 + 43.92388 / 3600, decDeg: 35 + 37 / 60 + 14.0075 / 3600 }}
          objectArticle="la"
          referenceDescription="La posició es calcula prenent Mirach, estrella central de la cadena i punt de partida cap a M31, com a referència de la constel·lació."
        />
      </div>

      <section className="wrap section andromeda-recognition">
        <div className="andromeda-chain-mark" aria-hidden="true">
          <span className="andromeda-mark-alpheratz" /><span className="andromeda-mark-mirach" /><span className="andromeda-mark-almach" />
          <span className="andromeda-mark-mu" /><span className="andromeda-mark-nu" /><i className="andromeda-mark-m31" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="83,77 51,51 17,22" /><polyline className="m31-branch" points="51,51 57,35 62,21" /></svg>
          <b>ALPHERATZ · MIRACH · ALMACH</b>
        </div>
        <div>
          <p className="section-kicker">COM TROBAR-LA</p>
          <h2>Una cadena que surt del Gran Quadrat.</h2>
          <p>Localitza el <strong>Gran Quadrat de Pegàs</strong> i pren <strong>Alpheratz</strong> com a vèrtex de sortida. Des d’allà, segueix una successió oberta fins a <strong>Mirach</strong> i continua en la mateixa direcció general cap a <strong>Almach</strong>. Andròmeda no és un contorn tancat: la seva personalitat és aquesta cadena llarga.</p>
          <p className="science-separation"><strong>Un vèrtex visual, una pertinença oficial:</strong> Alpheratz completa el Gran Quadrat de Pegàs, però és oficialment <strong>α Andromedae</strong>. El patró de reconeixement travessa la frontera entre dues constel·lacions; l’estrella no pertany alhora a totes dues regions IAU.</p>
        </div>
      </section>

      <section className="wrap constellation-layout dual-visual-layout">
        <div>
          <div className="section-heading compact-heading"><div><p className="section-kicker">MAPA DE RECONEIXEMENT</p><h2>Una cadena d’estrelles i una boirina remota</h2></div></div>
          <AndromedaMap />
          <p className="map-note stronger-note">Les estrelles i M31 es projecten a partir de <strong>coordenades equatorials en el sistema ICRS, referides a l’època J2000.0</strong>. Les línies són una ajuda visual que pot variar entre atles: la IAU defineix regions del cel, no aquests dibuixos. La figura mitològica és una capa interpretativa separada.</p>
        </div>
        <aside className="find-card">
          <p className="section-kicker">LLEGEIX EL PATRÓ</p>
          <h2>Cadena principal i branca cap a M31</h2>
          <ol>
            <li>Comença per <strong>Alpheratz</strong>, vèrtex visual del Gran Quadrat i estrella oficial d’Andròmeda.</li>
            <li>Segueix la cadena principal fins a <strong>Mirach</strong> i <strong>Almach</strong>.</li>
            <li>Des de Mirach, desvia’t per <strong>μ</strong> i <strong>ν Andromedae</strong>.</li>
            <li>Busca <strong>M31</strong> al costat de ν: primer una taca difusa, no una espiral fotogràfica.</li>
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

      <section className="wrap section artistic-panel andromeda-artistic-panel">
        <div className="section-heading compact-heading">
          <div><p className="section-kicker">ANDRÒMEDA IMAGINADA</p><h2>La princesa entre les estrelles</h2></div>
        </div>
        <AndromedaArt />
      </section>

      <section className="myth-section andromeda-myth-section">
        <div className="wrap andromeda-myth-layout">
          <div className="myth-figure andromeda-myth-figure" aria-hidden="true"><span>✦</span><p>ANDRÒMEDA</p></div>
          <div>
            <p className="section-kicker">UNA PRINCESA, DIVERSES VEUS ANTIGUES</p>
            <h2>Una mateixa figura celeste no produeix un relat únic</h2>
            <p><strong>Andròmeda</strong> és filla de <strong>Cefeu</strong> i <strong>Cassiopea</strong>. La seva exposició al monstre marí i el rescat de <strong>Perseu</strong> articulen el nucli compartit de la història, però les fonts discrepen en punts importants. L’Atlas les manté separades en lloc de convertir-les en una sola novel·la moderna.</p>

            <div className="myth-stories-grid andromeda-myth-stories">
              <article>
                <p className="section-kicker">QUI DESAFIA LES NEREIDES?</p>
                <h3>Cassiopea, o la bellesa de la filla</h3>
                <p>La <strong>Biblioteca atribuïda a Apol·lodor</strong> diu que Cassiopea es vanta de superar les Nereides en bellesa. A la <strong>Fabula 64 d’Higí</strong>, en canvi, la mare proclama que és <strong>Andròmeda</strong> qui les supera. La causa narrativa és semblant, però no és exactament la mateixa afirmació.</p>
              </article>
              <article>
                <p className="section-kicker">EL CÀSTIG MARÍ</p>
                <h3>Posidó, el monstre i l’oracle</h3>
                <p>En la versió de Pseudo-Apol·lodor, les Nereides reclamen reparació i <strong>Posidó</strong> envia una inundació i un monstre contra el regne de Cefeu. Un oracle exigeix exposar Andròmeda com a víctima. El relat no converteix la jove en culpable: és qui suporta les conseqüències d’un conflicte que no ha creat.</p>
              </article>
              <article>
                <p className="section-kicker">PERSEU I EL MONSTRE</p>
                <h3>El cap de Medusa no resol sempre el combat</h3>
                <p>Pseudo-Apol·lodor diu que Perseu mata el monstre i allibera Andròmeda; <strong>Ovidi</strong> desenvolupa el combat i el fa vèncer amb l’espasa. En aquests passatges, el cap de <strong>Medusa</strong> s’utilitza després contra adversaris humans, no com l’arma que derrota el monstre marí.</p>
              </article>
              <article>
                <p className="section-kicker">LA FIGURA AL CEL</p>
                <h3>Una història escrita també per la posició</h3>
                <p><strong>Higí</strong> atribueix a Minerva el catasterisme d’Andròmeda com a reconeixement del seu vincle amb Perseu. <strong>Arat</strong> no refà tota l’aventura: descriu la figura estesa al cel i la seva proximitat a Pegàs i Perseu. El mapa celeste conserva la xarxa familiar abans que una narració única.</p>
              </article>
            </div>

            <p className="myth-conclusion">La cadena d’estrelles permet trobar Andròmeda; els textos antics expliquen de maneres diferents per què aquella figura va quedar al cel. La futura xarxa de tardor continuarà aquest relat sense fingir que totes les versions encaixen perfectament.</p>
            <div className="myth-next-story" aria-label="Continuació mitològica prevista"><strong>La història continua a Cassiopea i Perseu</strong><span>Properament</span></div>
          </div>
        </div>
      </section>

      <section className="wrap section route-card interactive-route-card">
        <p className="section-kicker">STAR HOPPING</p>
        <h2>Del Gran Quadrat a la cadena, i de Mirach a una altra galàxia.</h2>
        <p className="muted route-intro">Una ruta reconstrueix Andròmeda; l’altra utilitza dues estrelles febles com a esglaons reals fins a M31.</p>
        <AndromedaRouteExplorer />
      </section>

      <SourceNotes references={sources} />

      <nav className="wrap constellation-pagination constellation-pagination-back" aria-label="Navegació entre constel·lacions">
        <Link href="/constellacions/auriga"><strong>← Auriga</strong><span>Torna al polígon de Capella</span></Link>
      </nav>
    </main>
  );
}
