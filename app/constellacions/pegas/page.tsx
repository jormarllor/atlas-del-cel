import Link from "next/link";
import PegasusArt from "../../../components/PegasusArt";
import PegasusMap from "../../../components/PegasusMap";
import PegasusRouteExplorer from "../../../components/PegasusRouteExplorer";
import SourceNotes, { type SourceReference } from "../../../components/SourceNotes";
import TonightSkyCard from "../../../components/TonightSkyCard";

const objects = [
  {
    name: "M15",
    kind: "Cúmul globular",
    visibility: "Prismàtics · telescopi petit",
    text: "A poc més de 4° d’Enif, aquesta concentració antiga d’estrelles sembla una boirina compacta amb prismàtics. Un telescopi petit en reforça el nucli; les imatges de Hubble revelen una densitat estel·lar que l’observació visual només pot suggerir.",
  },
  {
    name: "Enif",
    kind: "Estrella taronja molt lluminosa",
    visibility: "Ull nu",
    text: "És l’estrella més brillant de Pegàs i marca l’extrem del musell en el dibuix tradicional. La seva tonalitat càlida contrasta amb les estrelles més blanques del Gran Quadrat i la converteix en la millor fita per saltar fins a M15.",
  },
  {
    name: "Scheat",
    kind: "Gegant vermellosa variable",
    visibility: "Ull nu",
    text: "Forma el vèrtex septentrional occidental del Gran Quadrat. SIMBAD la classifica com una variable de llarg període i situa el seu espectre entre gegant i gegant lluminosa: és un punt càlid, físicament molt diferent de Markab.",
  },
  {
    name: "Markab",
    kind: "Estrella blanc-blavosa",
    visibility: "Ull nu",
    text: "Ancora el vèrtex meridional occidental del Quadrat i l’inici de la prolongació cap a Enif. No és l’estrella més brillant de Pegàs, però la seva posició geomètrica la fa una referència especialment útil per reconstruir tota la constel·lació.",
  },
];

const sources: SourceReference[] = [
  {
    title: "IAU · The Constellations",
    detail: "Nom oficial Pegasus i marc de les constel·lacions com a regions delimitades del cel",
    href: "https://iauarchive.eso.org/public/themes/constellations/",
    consultationDate: "2026-09-03",
  },
  {
    title: "SIMBAD · CDS",
    detail: "Coordenades ICRS i classificacions de Markab, Scheat, Algenib, Alpheratz, Homam, Biham, Enif i M15",
    href: "https://simbad.cds.unistra.fr/simbad/",
    consultationDate: "2026-09-03",
  },
  {
    title: "NASA Science · Messier 15",
    detail: "Naturalesa globular de M15, antiguitat i context físic del cúmul dins de Pegàs",
    href: "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-15/",
    consultationDate: "2026-09-03",
  },
  {
    title: "ESA/Hubble · New Hubble image of star cluster Messier 15",
    detail: "Distància aproximada i concentració estel·lar observada per Hubble",
    href: "https://esahubble.org/images/heic1321a/",
    consultationDate: "2026-09-03",
  },
  {
    title: "Hesíode · Teogonia, 270–286",
    detail: "Naixement de Pegàs després de la mort de Medusa i arribada del cavall a la casa de Zeus",
    href: "https://www.theoi.com/Text/HesiodTheogony.html",
    consultationDate: "2026-09-03",
  },
  {
    title: "Píndar · Olímpica 13, 63–95",
    detail: "Bel·lerofont, el fre daurat d’Atena, la captura de Pegàs i el combat contra la Quimera",
    href: "https://topostext.org/work/18",
    consultationDate: "2026-09-03",
  },
  {
    title: "Biblioteca atribuïda a Apol·lodor, 2.3.2",
    detail: "Bel·lerofont combat la Quimera des del cavall alat, fill de Medusa i Posidó",
    href: "https://topostext.org/work/150",
    consultationDate: "2026-09-03",
  },
  {
    title: "Higí · Astronomica, 2.18",
    detail: "Pegàs, la font Hipocrene, el catasterisme i identificacions antigues alternatives de la figura del Cavall",
    href: "https://topostext.org/work/207",
    consultationDate: "2026-09-03",
  },
];

export default function PegasusPage() {
  return (
    <main>
      <section className="page-hero wrap constellation-hero pegasus-hero">
        <div>
          <Link href="/constellacions" className="back-link">← Constel·lacions</Link>
          <p className="eyebrow">TARDOR · NIVELL FÀCIL</p>
          <h1>Pegàs</h1>
          <p className="lead">El Gran Quadrat i el cavall alat del cel de tardor.</p>
        </div>
        <dl className="facts">
          <div><dt>Millor època al vespre</dt><dd>Setembre – gener</dd></div>
          <div><dt>Patró</dt><dd>Gran Quadrat i prolongació cap a Enif</dd></div>
          <div><dt>Estrella de referència</dt><dd>Markab</dd></div>
          <div><dt>Observació</dt><dd>Ull nu · prismàtics · telescopi petit</dd></div>
          <div><dt>Nom oficial IAU</dt><dd>Pegasus</dd></div>
        </dl>
      </section>

      <div className="wrap tonight-wrap">
        <TonightSkyCard
          name="Pegàs"
          referenceName="Markab"
          coordinate={{ raHours: 23 + 4 / 60 + 45.65345 / 3600, decDeg: 15 + 12 / 60 + 18.9617 / 3600 }}
          objectArticle="el"
          referenceDescription="La posició es calcula prenent Markab, vèrtex del Gran Quadrat i inici de la branca cap a Enif, com a referència de la constel·lació."
        />
      </div>

      <section className="wrap section pegasus-recognition">
        <div className="pegasus-square-mark" aria-hidden="true">
          <span className="pegasus-mark-alpheratz" /><span className="pegasus-mark-scheat" /><span className="pegasus-mark-markab" /><span className="pegasus-mark-algenib" />
          <span className="pegasus-mark-homam" /><span className="pegasus-mark-biham" /><span className="pegasus-mark-enif" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="23,20 67,22 66,61 20,60 23,20" /><polyline className="enif-branch" points="66,61 73,70 81,78 91,71" /></svg>
          <b>EL GRAN QUADRAT · DESPRÉS, ENIF</b>
        </div>
        <div>
          <p className="section-kicker">COM TROBAR-LO</p>
          <h2>Primer el Quadrat. Després, el cavall.</h2>
          <p>Busca quatre estrelles brillants que dibuixen un quadrilàter enorme en una zona de cel relativament buida. <strong>Markab</strong>, <strong>Scheat</strong> i <strong>Algenib</strong> són de Pegàs; <strong>Alpheratz</strong> completa visualment el quart vèrtex. Des de Markab, una branca corba passa per <strong>Homam</strong> i <strong>Biham</strong> fins a arribar a <strong>Enif</strong>.</p>
          <p className="science-separation"><strong>El dibuix travessa una frontera:</strong> Alpheratz és oficialment <strong>α Andromedae</strong>, encara que completa el Gran Quadrat de Pegàs. El patró visual és útil per orientar-se, però no redefineix la pertinença oficial IAU de l’estrella.</p>
        </div>
      </section>

      <section className="wrap constellation-layout dual-visual-layout">
        <div>
          <div className="section-heading compact-heading"><div><p className="section-kicker">MAPA DE RECONEIXEMENT</p><h2>Un quadrat immens i una branca cap al musell</h2></div></div>
          <PegasusMap />
          <p className="map-note stronger-note">Les estrelles i M15 es projecten a partir de <strong>coordenades equatorials en el sistema ICRS, referides a l’època J2000.0</strong>. Les línies són una ajuda visual que pot variar entre atles: la IAU defineix regions del cel, no aquests dibuixos. La figura mitològica és una capa interpretativa separada.</p>
        </div>
        <aside className="find-card">
          <p className="section-kicker">LLEGEIX EL PATRÓ</p>
          <h2>Del Quadrat a Enif</h2>
          <ol>
            <li>Identifica <strong>Alpheratz, Scheat, Markab i Algenib</strong> com els quatre vèrtexs visuals.</li>
            <li>Recorda que <strong>Alpheratz és d’Andròmeda</strong>; els altres tres vèrtexs són de Pegàs.</li>
            <li>Des de Markab, segueix <strong>Homam → Biham → Enif</strong>.</li>
            <li>Amb Enif al centre dels prismàtics, busca <strong>M15</strong> poc més de 4° cap al nord-oest celeste.</li>
          </ol>
          <Link href="/constellacions/andromeda" className="constellation-continuation">Torna a explorar Andròmeda →</Link>
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

      <section className="wrap section artistic-panel pegasus-artistic-panel">
        <div className="section-heading compact-heading">
          <div><p className="section-kicker">PEGÀS IMAGINAT</p><h2>El cavall alat entre les estrelles</h2></div>
        </div>
        <PegasusArt />
      </section>

      <section className="myth-section pegasus-myth-section">
        <div className="wrap pegasus-myth-layout">
          <div className="myth-figure pegasus-myth-figure" aria-hidden="true"><span>✦</span><p>PEGÀS</p></div>
          <div>
            <p className="section-kicker">DEL NAIXEMENT AL CATASTERISME</p>
            <h2>Un cavall que uneix Medusa, Bel·lerofont i el cel de Zeus</h2>
            <p>La història de <strong>Pegàs</strong> toca el cicle de Perseu perquè el cavall neix després de la mort de <strong>Medusa</strong>, però les fonts antigues desenvolupen la seva aventura sobretot al costat de <strong>Bel·lerofont</strong>. Per això no és rigorós convertir Pegàs, sense matisos, en la muntura amb què Perseu rescata Andròmeda.</p>

            <div className="myth-stories-grid pegasus-myth-stories">
              <article>
                <p className="section-kicker">HESÍODE</p>
                <h3>De Medusa a la casa de Zeus</h3>
                <p>A la <strong>Teogonia</strong>, Pegàs i Crisaor sorgeixen quan Perseu talla el cap de Medusa; el pare és Posidó, anomenat allí «el de cabells foscos». Pegàs abandona després la terra, arriba entre els déus i porta a Zeus el tro i el llamp. El poema ja li dona una destinació celeste sense passar per tota la biografia de Bel·lerofont.</p>
              </article>
              <article>
                <p className="section-kicker">PÍNDAR</p>
                <h3>El fre daurat d’Atena</h3>
                <p>A l’<strong>Olímpica 13</strong>, Bel·lerofont no domina Pegàs només per força: <strong>Atena</strong> li ofereix en somnis un fre daurat, que li permet capturar el cavall a la font de Pirene. Muntat sobre Pegàs, combat les Amazones, els Sòlims i la <strong>Quimera</strong>; al final, el cavall troba refugi als estables de Zeus.</p>
              </article>
              <article>
                <p className="section-kicker">PSEUDO-APOL·LODOR</p>
                <h3>La Quimera vista des de l’aire</h3>
                <p>La <strong>Biblioteca</strong> és més concisa: Bel·lerofont munta Pegàs, fill de Medusa i Posidó, i ataca la Quimera volant per damunt seu. Aquesta versió confirma la parella heroica, però no inclou tots els detalls del fre d’Atena que desenvolupa Píndar.</p>
              </article>
              <article>
                <p className="section-kicker">HIGÍ I LES VARIANTS</p>
                <h3>Hipocrene, la caiguda i un altre Cavall</h3>
                <p><strong>Higí</strong> relaciona Pegàs amb la font Hipocrene, oberta d’un cop de peülla, i diu que Júpiter el situa entre les constel·lacions després de la caiguda de Bel·lerofont. Però conserva també una altra identificació: el Cavall podria representar <strong>Melanippe</strong>, transformada en euga. La figura antiga, doncs, no va tenir una lectura única.</p>
              </article>
            </div>

            <p className="myth-conclusion">El Gran Quadrat ajuda a trobar Pegàs; els relats expliquen per què un cavall —i no sempre exactament el mateix cavall— va quedar projectat en aquesta regió del cel.</p>
            <div className="myth-next-story" aria-label="Continuació mitològica"><Link href="/constellacions/andromeda"><strong>La història es creua amb Andròmeda →</strong></Link><span>Perseu · properament</span></div>
          </div>
        </div>
      </section>

      <section className="wrap section route-card interactive-route-card">
        <p className="section-kicker">STAR HOPPING</p>
        <h2>Reconstrueix el Gran Quadrat i salta d’Enif fins a M15.</h2>
        <p className="muted route-intro">Una ruta tanca el patró més gran de la tardor; l’altra segueix el cavall fins a una recompensa telescòpica compacta.</p>
        <PegasusRouteExplorer />
      </section>

      <SourceNotes references={sources} />

      <nav className="wrap constellation-pagination constellation-pagination-back" aria-label="Navegació entre constel·lacions">
        <Link href="/constellacions/andromeda"><strong>← Andròmeda</strong><span>Torna a la cadena i M31</span></Link>
      </nav>
    </main>
  );
}
