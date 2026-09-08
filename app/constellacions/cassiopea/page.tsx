import Link from "next/link";
import CassiopeiaArt from "../../../components/CassiopeiaArt";
import CassiopeiaMap from "../../../components/CassiopeiaMap";
import CassiopeiaRouteExplorer from "../../../components/CassiopeiaRouteExplorer";
import SourceNotes, { type SourceReference } from "../../../components/SourceNotes";
import TonightSkyCard from "../../../components/TonightSkyCard";

const objects = [
  {
    name: "Schedar",
    kind: "Gegant taronja",
    visibility: "Ull nu",
    text: "És una de les dues estrelles més brillants de la W i el seu color càlid contrasta amb γ Cassiopeiae. La posició de Schedar, al fons d’un dels angles del patró, la converteix en una referència fàcil i també en un bon indicador conservador de l’altura de tota la W.",
  },
  {
    name: "γ Cassiopeiae",
    kind: "Estrella blava calenta i variable",
    visibility: "Ull nu",
    text: "Ocupa el vèrtex central de la W. SIMBAD en registra un espectre B0.5IVpe: és una estrella calenta amb línies d’emissió i una brillantor variable. Visualment sembla només un punt; físicament representa un comportament estel·lar molt diferent del de Schedar.",
  },
  {
    name: "M52",
    kind: "Cúmul obert",
    visibility: "Prismàtics · telescopi petit",
    text: "Prolongant la branca Schedar–Caph s’arriba a un camp compacte i granulós. Amb prismàtics demana un cel fosc; un telescopi petit comença a separar la boirina en estrelles i mostra per què Cassiopea és una regió tan rica de la Via Làctia.",
  },
  {
    name: "NGC 457",
    kind: "Cúmul obert",
    visibility: "Prismàtics · telescopi petit",
    text: "Queda a poc més de 2° de Ruchbah i és especialment agraït amb un telescopi petit. Alguns observadors hi imaginen un mussol o el personatge E.T.; són sobrenoms visuals, no denominacions científiques del cúmul.",
  },
];

const sources: SourceReference[] = [
  {
    title: "IAU · The Constellations",
    detail: "Nom oficial Cassiopeia i marc de les constel·lacions com a regions delimitades del cel",
    href: "https://iauarchive.eso.org/public/themes/constellations/",
    consultationDate: "2026-09-03",
  },
  {
    title: "IAU · Naming Stars",
    detail: "Formes normalitzades Caph, Schedar, Ruchbah i Segin al catàleg de noms estel·lars",
    href: "https://iauarchive.eso.org/public/themes/naming_stars/",
    consultationDate: "2026-09-03",
  },
  {
    title: "SIMBAD · CDS",
    detail: "Coordenades ICRS, magnituds i classificacions de les cinc estrelles de la W, M52 i NGC 457",
    href: "https://simbad.cds.unistra.fr/simbad/",
    consultationDate: "2026-09-03",
  },
  {
    title: "NSF NOIRLab · Cassiopeia",
    detail: "Circumpolaritat a latituds boreals mitjanes, visibilitat estacional i riquesa de cúmuls oberts",
    href: "https://noirlab.edu/public/education/constellations/cassiopeia/",
    consultationDate: "2026-09-03",
  },
  {
    title: "Arat · Fenòmens, 188–196",
    detail: "Cassiopea gira a prop de Cefeu; les seves estrelles en marquen la figura i sembla afligida per la filla",
    href: "https://topostext.org/work/551",
    consultationDate: "2026-09-03",
  },
  {
    title: "Biblioteca atribuïda a Apol·lodor, 2.4.3",
    detail: "Cassiopea es compara amb les Nereides, la ira d’aquestes i el càstig de Posidó sobre el país i Andròmeda",
    href: "https://www.theoi.com/Text/Apollodorus2.html",
    consultationDate: "2026-09-03",
  },
  {
    title: "Higí · Fabulae, 64",
    detail: "Variant en què Cassiopea anteposa la bellesa d’Andròmeda a la de les Nereides",
    href: "https://topostext.org/work/206",
    consultationDate: "2026-09-03",
  },
  {
    title: "Higí · Astronomica, 2.10",
    detail: "Cassiopea asseguda en una cadira i el gir celeste, estirada d’esquena, interpretat com a càstig",
    href: "https://topostext.org/work/207",
    consultationDate: "2026-09-03",
  },
];

export default function CassiopeiaPage() {
  return (
    <main>
      <section className="page-hero wrap constellation-hero cassiopeia-hero">
        <div>
          <Link href="/constellacions" className="back-link">← Constel·lacions</Link>
          <p className="eyebrow">CIRCUMPOLAR · NIVELL FÀCIL</p>
          <h1>Cassiopea</h1>
          <p className="lead">La W del nord i la reina que gira al voltant del pol.</p>
        </div>
        <dl className="facts">
          <div><dt>Millor època al vespre</dt><dd>Octubre – febrer</dd></div>
          <div><dt>Patró</dt><dd>Cinc estrelles en W o M</dd></div>
          <div><dt>Visibilitat</dt><dd>W principal circumpolar des de Catalunya</dd></div>
          <div><dt>Estrella de referència</dt><dd>Schedar</dd></div>
          <div><dt>Observació</dt><dd>Ull nu · prismàtics · telescopi petit</dd></div>
          <div><dt>Nom oficial IAU</dt><dd>Cassiopeia</dd></div>
        </dl>
      </section>

      <div className="wrap tonight-wrap">
        <TonightSkyCard
          name="Cassiopea"
          referenceName="Schedar"
          coordinate={{ raHours: 0 + 40 / 60 + 30.4430418459 / 3600, decDeg: 56 + 32 / 60 + 14.385181354 / 3600 }}
          objectArticle="la"
          referenceDescription="La posició es calcula prenent Schedar, estrella càlida i prominent d’un dels angles de la W, com a referència de la constel·lació."
        />
      </div>

      <section className="wrap section cassiopeia-recognition">
        <div className="cassiopeia-w-mark" aria-hidden="true">
          <span className="cassiopeia-mark-caph" /><span className="cassiopeia-mark-schedar" /><span className="cassiopeia-mark-gamma" /><span className="cassiopeia-mark-ruchbah" /><span className="cassiopeia-mark-segin" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="15,31 31,67 49,26 68,56 86,22" /><path d="M 25 82 Q 50 96 77 80" /><path d="M 76 80 l -7 -1 m 7 1 l -3 6" /></svg>
          <b>LA MATEIXA W · ORIENTACIONS DIFERENTS</b>
        </div>
        <div>
          <p className="section-kicker">COM TROBAR-LA</p>
          <h2>Cinc llums que giren sense perdre el patró</h2>
          <p>Busca cinc estrelles brillants que alternen quatre trams curts: <strong>Caph → Schedar → γ Cassiopeiae → Ruchbah → Segin</strong>. Segons el moment de la nit i de l’any, la cadena pot semblar una W, una M, una figura inclinada o gairebé lateral. Les estrelles no han canviat de forma: ha canviat la seva orientació respecte del teu horitzó.</p>
          <p className="science-separation"><strong>Què vol dir circumpolar?</strong> La W principal de Cassiopea és circumpolar des de Catalunya: les cinc estrelles queden sempre per damunt de l’horitzó geomètric. Això no vol dir que siguin sempre altes; quan passen per sota del pol poden baixar molt sobre l’horitzó nord.</p>
        </div>
      </section>

      <section className="wrap constellation-layout dual-visual-layout">
        <div>
          <div className="section-heading compact-heading"><div><p className="section-kicker">MAPA DE RECONEIXEMENT</p><h2>Una W clara sobre la Via Làctia</h2></div></div>
          <CassiopeiaMap />
          <p className="map-note stronger-note">Les estrelles i els cúmuls es projecten a partir de <strong>coordenades equatorials en el sistema ICRS, referides a l’època J2000.0</strong>. Les línies són una ajuda visual que pot variar entre atles: la IAU defineix regions del cel, no aquests dibuixos. La figura mitològica és una capa interpretativa separada.</p>
        </div>
        <aside className="find-card">
          <p className="section-kicker">LLEGEIX EL PATRÓ</p>
          <h2>De la W als cúmuls</h2>
          <ol>
            <li>Recorre les cinc estrelles des de <strong>Caph</strong> fins a <strong>Segin</strong>.</li>
            <li>Accepta que la W pot aparèixer girada: identifica els <strong>quatre canvis de direcció</strong>, no una orientació fixa.</li>
            <li>Prolonga <strong>Schedar → Caph</strong> per arribar a <strong>M52</strong>.</li>
            <li>Des de <strong>Ruchbah</strong>, baixa uns 2,1° cap al sud celeste per trobar <strong>NGC 457</strong>.</li>
          </ol>
          <p className="milky-way-note">Cassiopea es projecta sobre una franja rica de la <strong>Via Làctia</strong>: amb prismàtics, el fons s’omple d’estrelles i cúmuls oberts.</p>
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

      <section className="wrap section artistic-panel cassiopeia-artistic-panel">
        <div className="section-heading compact-heading"><div><p className="section-kicker">CASSIOPEA IMAGINADA</p><h2>La reina entre les estrelles</h2></div></div>
        <CassiopeiaArt />
      </section>

      <section className="myth-section cassiopeia-myth-section">
        <div className="wrap cassiopeia-myth-layout">
          <div className="myth-figure cassiopeia-myth-figure" aria-hidden="true"><span>✦</span><p>CASSIOPEA</p></div>
          <div>
            <p className="section-kicker">LA REINA, LA CADIRA I EL GIR DEL CEL</p>
            <h2>Una supèrbia narrada de més d’una manera</h2>
            <p>Cassiopea és la reina d’Etiòpia, esposa de <strong>Cefeu</strong> i mare d’<strong>Andròmeda</strong>. El nucli del relat és una comparació ofensiva amb les <strong>Nereides</strong>, però les fonts no coincideixen en qui és presentada com a més bella. Aquesta diferència és petita en aparença i decisiva per no convertir variants antigues en una sola història moderna.</p>

            <div className="myth-stories-grid cassiopeia-myth-stories">
              <article>
                <p className="section-kicker">PSEUDO-APOL·LODOR</p>
                <h3>Cassiopea presumeix d’ella mateixa</h3>
                <p>A la <strong>Biblioteca</strong>, Cassiopea rivalitza amb les Nereides i afirma que les supera totes en bellesa. Elles s’enutgen i <strong>Posidó</strong> envia una inundació i un monstre marí contra el país. L’oracle exigeix exposar Andròmeda al monstre: la filla pateix les conseqüències de l’afirmació de la mare.</p>
              </article>
              <article>
                <p className="section-kicker">HIGÍ · FABULAE</p>
                <h3>La bellesa atribuïda a Andròmeda</h3>
                <p>La <strong>Faula 64</strong> conserva una variant diferent: Cassiopea no anteposa la seva pròpia bellesa, sinó la de la filla, <strong>Andròmeda</strong>, a la de les Nereides. Neptú exigeix igualment que la princesa sigui lliurada al monstre. Aquesta és la variant que no s’ha de barrejar silenciosament amb la de Pseudo-Apol·lodor.</p>
              </article>
              <article>
                <p className="section-kicker">ARAT</p>
                <h3>Poques estrelles i una mare afligida</h3>
                <p>Als <strong>Fenòmens</strong>, Cassiopea gira a prop de Cefeu i unes poques estrelles alternades en marquen la forma amb línies de llum. Arat allarga la imatge des de les espatlles i diu que sembla afligida per la seva filla. El poema descriu una figura celeste, no encara la W moderna com una lletra fixa sobre l’horitzó.</p>
              </article>
              <article>
                <p className="section-kicker">HIGÍ · ASTRONOMICA</p>
                <h3>La cadira que es capgira</h3>
                <p>En una tradició recollida per <strong>Higí</strong>, Cassiopea és situada entre les constel·lacions asseguda en una cadira. A causa de la seva impietat, el gir del cel fa que sembli transportada estirada d’esquena. El moviment aparent al voltant del pol es converteix així en una part visible del càstig mític.</p>
              </article>
            </div>

            <p className="myth-conclusion">La W és circumpolar per geometria celeste; que aquest gir sigui llegit com un càstig és una interpretació conservada en una tradició concreta, no una definició astronòmica ni una versió universal del mite.</p>
            <div className="myth-next-story" aria-label="Continuació mitològica"><Link href="/constellacions/andromeda"><strong>Continua la història a Andròmeda →</strong></Link><span>Perseu · properament</span></div>
          </div>
        </div>
      </section>

      <section className="wrap section route-card interactive-route-card">
        <p className="section-kicker">STAR HOPPING</p>
        <h2>Memoritza la W i entra als camps rics de la Via Làctia.</h2>
        <p className="muted route-intro">La primera ruta fixa el patró circumpolar; les altres dues utilitzen Caph i Ruchbah per arribar a dos cúmuls oberts reals.</p>
        <CassiopeiaRouteExplorer />
      </section>

      <SourceNotes references={sources} />

      <nav className="wrap constellation-pagination constellation-pagination-back" aria-label="Navegació entre constel·lacions">
        <Link href="/constellacions/pegas"><strong>← Pegàs</strong><span>Torna al Gran Quadrat</span></Link>
      </nav>
    </main>
  );
}
