import Link from "next/link";
import PerseusArt from "../../../components/PerseusArt";
import PerseusMap from "../../../components/PerseusMap";
import PerseusRouteExplorer from "../../../components/PerseusRouteExplorer";
import SourceNotes, { type SourceReference } from "../../../components/SourceNotes";
import TonightSkyCard from "../../../components/TonightSkyCard";

const objects = [
  {
    name: "Mirfak",
    kind: "Estrella groga molt lluminosa",
    visibility: "Ull nu",
    text: "És l’estrella més brillant de Perseu i una àncora excel·lent per llegir-ne les branques. SIMBAD en registra un espectre F5 Ib: el punt aparentment modest que veiem és una estrella evolucionada i molt lluminosa.",
  },
  {
    name: "Algol",
    kind: "Sistema estel·lar eclipsant",
    visibility: "Ull nu · seguiment durant hores",
    text: "Algol és un sistema triple. En la parella interior, els dos components estan alineats de manera que s’eclipsen vistos des de la Terra. Aproximadament cada 2,87 dies, el component més fred i feble passa davant del principal calent i la brillantor conjunta baixa prou perquè un observador atent ho pugui seguir a ull nu.",
  },
  {
    name: "Doble Cúmul · NGC 869 i NGC 884",
    kind: "Dos cúmuls oberts",
    visibility: "Cel fosc · prismàtics",
    text: "Són dos cúmuls diferents, separats només mig grau al cel, observats com una sola meravella i celebrats durant segles pels observadors. Des d’un lloc fosc poden insinuar-se com una boirina doble; els prismàtics converteixen cada taca en una concentració d’estrelles.",
  },
  {
    name: "M34",
    kind: "Cúmul obert",
    visibility: "Prismàtics · telescopi petit",
    text: "Queda a uns 5° d’Algol i ofereix una recompensa fàcil després d’haver trobat l’estrella variable. Amb prismàtics ja es presenta com un grup ampli i granular; un telescopi petit en separa millor els membres.",
  },
];

const sources: SourceReference[] = [
  {
    title: "IAU · The Constellations",
    detail: "Nom oficial Perseus i marc de les constel·lacions com a regions delimitades del cel",
    href: "https://iauarchive.eso.org/public/themes/constellations/",
    consultationDate: "2026-09-08",
  },
  {
    title: "IAU · Naming Stars",
    detail: "Formes normalitzades Mirfak, Algol, Menkib i Atik",
    href: "https://iauarchive.eso.org/public/themes/naming_stars/",
    consultationDate: "2026-09-08",
  },
  {
    title: "SIMBAD · CDS",
    detail: "Coordenades ICRS, magnituds i classificacions de les estrelles del traç, NGC 869, NGC 884 i M34",
    href: "https://simbad.cds.unistra.fr/simbad/",
    consultationDate: "2026-09-08",
  },
  {
    title: "AAVSO · Beta Persei (Algol)",
    detail: "Mecanisme dels eclipsis, variació de brillantor i període aproximat del sistema Algol",
    href: "https://www.aavso.org/vsots_betaper",
    consultationDate: "2026-09-08",
  },
  {
    title: "NSF NOIRLab · Perseus",
    detail: "Context observacional de Mirfak, Algol, M34 i el Doble Cúmul",
    href: "https://noirlab.edu/public/education/constellations/perseus/",
    consultationDate: "2026-09-08",
  },
  {
    title: "Biblioteca atribuïda a Apol·lodor, 2.4.1–4",
    detail: "Gesta de Medusa, trobada amb Andròmeda, retorn i continuació dinàstica de Perseu",
    href: "https://www.theoi.com/Text/Apollodorus2.html",
    consultationDate: "2026-09-08",
  },
  {
    title: "Ovidi · Metamorfosis, 4.604–803 i llibre 5",
    detail: "Versió literària del viatge de Perseu, rescat d’Andròmeda i ús posterior del cap de Medusa",
    href: "https://www.theoi.com/Text/OvidMetamorphoses4.html",
    consultationDate: "2026-09-08",
  },
  {
    title: "Higí · Astronomica, 2.12",
    detail: "Perseu, Medusa, els atributs de la figura celeste i el seu catasterisme",
    href: "https://topostext.org/work/207",
    consultationDate: "2026-09-08",
  },
  {
    title: "Star Tales · Perseus",
    detail: "Correspondència entre la descripció de Ptolemeu de l’estrella al cap de la Gorgona i el nom àrab medieval d’Algol",
    href: "https://www.ianridpath.com/startales/perseus.html",
    consultationDate: "2026-09-08",
  },
];

export default function PerseusPage() {
  return (
    <main>
      <section className="page-hero wrap constellation-hero perseus-hero">
        <div>
          <Link href="/constellacions" className="back-link">← Constel·lacions</Link>
          <p className="eyebrow">TARDOR I HIVERN · NIVELL FÀCIL</p>
          <h1>Perseu</h1>
          <p className="lead">L’heroi entre Cassiopea i Andròmeda, amb Algol i el Doble Cúmul com a grans sorpreses.</p>
        </div>
        <dl className="facts">
          <div><dt>Millor època al vespre</dt><dd>Novembre – març</dd></div>
          <div><dt>Patró</dt><dd>Figura allargada i ramificada des de Mirfak</dd></div>
          <div><dt>Estrella de referència</dt><dd>Mirfak</dd></div>
          <div><dt>Observació</dt><dd>Ull nu · prismàtics · telescopi petit</dd></div>
          <div><dt>Nom oficial IAU</dt><dd>Perseus</dd></div>
        </dl>
      </section>

      <div className="wrap tonight-wrap">
        <TonightSkyCard
          name="Perseu"
          referenceName="Mirfak"
          coordinate={{ raHours: 3 + 24 / 60 + 19.3700924 / 3600, decDeg: 49 + 51 / 60 + 40.245455 / 3600 }}
          objectArticle="el"
          referenceDescription="La posició es calcula prenent Mirfak, l’estrella més brillant i una àncora central del traç de Perseu, com a referència de la constel·lació."
        />
      </div>

      <section className="wrap section perseus-recognition">
        <div className="perseus-branch-mark" aria-hidden="true">
          <span className="perseus-mark-gamma" /><span className="perseus-mark-mirfak" /><span className="perseus-mark-delta" /><span className="perseus-mark-epsilon" /><span className="perseus-mark-atik" /><span className="perseus-mark-algol" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="24,18 45,31 61,43 68,62 65,83" /><line x1="45" y1="31" x2="32" y2="62" /><path d="M 10 24 Q 18 16 28 21" /><path d="M 72 77 Q 82 86 91 78" /></svg>
          <b>MIRFAK AL CENTRE · DUES BRANQUES</b>
        </div>
        <div>
          <p className="section-kicker">COM TROBAR-LO</p>
          <h2>De la W de Cassiopea a una figura que es ramifica</h2>
          <p>Des del tram central de la <strong>W de Cassiopea</strong>, prolonga la línia de γ Cassiopeiae cap a Ruchbah fins a trobar la boirina del <strong>Doble Cúmul</strong>. Més enllà, <strong>Mirfak</strong> és la llum que ordena Perseu: una branca continua cap a δ i ε Persei; l’altra baixa fins a <strong>Algol</strong>.</p>
          <p className="science-separation">Perseu no és un polígon tancat. És més útil memoritzar <strong>Mirfak com a centre</strong>, una cadena llarga cap a Atik i una branca lateral cap a Algol.</p>
        </div>
      </section>

      <section className="wrap constellation-layout dual-visual-layout">
        <div>
          <div className="section-heading compact-heading"><div><p className="section-kicker">MAPA DE RECONEIXEMENT</p><h2>Una figura llarga entre dos cúmuls</h2></div></div>
          <PerseusMap />
          <p className="map-note stronger-note">Les estrelles i els cúmuls es projecten a partir de <strong>coordenades equatorials en el sistema ICRS, referides a l’època J2000.0</strong>. Les línies són una ajuda visual que pot variar entre atles: la IAU defineix regions del cel, no aquests dibuixos. La figura mitològica és una capa interpretativa separada.</p>
        </div>
        <aside className="find-card">
          <p className="section-kicker">LLEGEIX EL PATRÓ</p>
          <h2>Mirfak, Algol i dues recompenses</h2>
          <ol>
            <li>Troba <strong>Mirfak</strong>, la llum més brillant i central del patró.</li>
            <li>Segueix la branca γ Persei → Mirfak → δ → ε → Menkib → <strong>Atik</strong>.</li>
            <li>Des de Mirfak, identifica la branca lateral que arriba a <strong>Algol</strong>.</li>
            <li>Separa del traç els objectes profunds: el <strong>Doble Cúmul</strong> al nord-oest celeste i <strong>M34</strong> a prop d’Algol.</li>
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

      <section className="wrap section artistic-panel perseus-artistic-panel">
        <div className="section-heading compact-heading"><div><p className="section-kicker">PERSEU IMAGINAT</p><h2>L’heroi entre les estrelles</h2></div></div>
        <PerseusArt />
      </section>

      <section className="myth-section perseus-myth-section">
        <div className="wrap perseus-myth-layout">
          <div className="myth-figure perseus-myth-figure" aria-hidden="true"><span>✦</span><p>PERSEU</p></div>
          <div>
            <p className="section-kicker">L’HEROI, LA GORGONA I UNA FAMÍLIA CELESTE</p>
            <h2>Una gesta compartida per relats diferents</h2>
            <p><strong>Perseu</strong> uneix diverses figures d’aquest sector del cel, però les fonts antigues no expliquen tots els episodis de la mateixa manera. La <strong>Biblioteca atribuïda a Apol·lodor</strong>, <strong>Ovidi</strong> i <strong>Higí</strong> comparteixen personatges i motius; l’ordre, els detalls i la funció dels objectes divins varien.</p>

            <div className="myth-stories-grid perseus-myth-stories">
              <article>
                <p className="section-kicker">PSEUDO-APOL·LODOR</p>
                <h3>Una missió imposada</h3>
                <p>El rei <strong>Polidectes</strong> envia Perseu a buscar el cap de <strong>Medusa</strong>. Amb ajuda divina i objectes rebuts de les nimfes, l’heroi s’acosta a l’única Gorgona mortal sense mirar-la directament. El relat subratlla l’enginy i l’assistència dels déus, no només la força.</p>
              </article>
              <article>
                <p className="section-kicker">ANDRÒMEDA</p>
                <h3>Una història que ja era al cel</h3>
                <p>De retorn, Perseu troba <strong>Andròmeda</strong> exposada al monstre marí i la rescata. Pseudo-Apol·lodor resumeix la victòria; <strong>Ovidi</strong> desplega el combat amb més detall i el fa vèncer amb l’espasa. El cap de Medusa intervé després contra adversaris humans, no com una arma universal en totes les versions.</p>
              </article>
              <article>
                <p className="section-kicker">RETORN I DESCENDÈNCIA</p>
                <h3>Més enllà de la gesta</h3>
                <p>La història continua després del rescat: Perseu torna amb Andròmeda, afronta Polidectes i acaba complint accidentalment l’oracle sobre el seu avi <strong>Acrisi</strong>. La tradició el converteix també en inici d’una nissaga heroica; la seva biografia no s’esgota al cap de Medusa.</p>
              </article>
              <article>
                <p className="section-kicker">HIGÍ · ASTRONOMICA</p>
                <h3>L’heroi convertit en figura celeste</h3>
                <p><strong>Higí</strong> conserva el catasterisme de Perseu i descriu els atributs amb què la figura és reconeguda al cel. La constel·lació fixa així un instant de la llegenda, mentre les altres fitxes —Andròmeda, Cassiopea i, més endavant, Cefeu— en conserven altres punts de vista.</p>
              </article>
            </div>

            <div className="algol-history-note">
              <p className="section-kicker">ALGOL I EL CAP DE MEDUSA</p>
              <h3>Una posició antiga, un nom medieval</h3>
              <p><strong>Ptolemeu</strong> ja catalogava l’estrella que avui identifiquem com β Persei a la zona del cap de la Gorgona. El nom <strong>Algol</strong>, però, procedeix de l’àrab medieval <em>raʾs al-ghūl</em>, «cap del ghul». L’associació figurativa és antiga; no hi ha base per deduir-ne que els grecs coneguessin el mecanisme dels seus eclipsis.</p>
            </div>

            <p className="myth-conclusion">El mapa mostra una regió astronòmica moderna; la figura de l’heroi i el cap de Medusa pertanyen a una història textual que ha canviat amb les llengües i els segles.</p>
            <div className="myth-next-story" aria-label="Connexions mitològiques"><Link href="/constellacions/andromeda"><strong>Continua a Andròmeda →</strong></Link><Link href="/constellacions/cassiopea">Torna a Cassiopea →</Link><span>Cefeu · properament</span></div>
          </div>
        </div>
      </section>

      <section className="wrap section route-card interactive-route-card">
        <p className="section-kicker">STAR HOPPING</p>
        <h2>De la W al Doble Cúmul, i de Mirfak fins a M34.</h2>
        <p className="muted route-intro">La primera ruta entra a Perseu des de Cassiopea; la segona recorre la branca d’Algol i acaba en un cúmul obert.</p>
        <PerseusRouteExplorer />
      </section>

      <SourceNotes references={sources} />

      <nav className="wrap constellation-pagination constellation-pagination-back" aria-label="Navegació entre constel·lacions">
        <Link href="/constellacions/cassiopea"><strong>← Cassiopea</strong><span>Torna a la W circumpolar</span></Link>
      </nav>
    </main>
  );
}
