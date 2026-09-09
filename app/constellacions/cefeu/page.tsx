import Link from "next/link";
import CepheusArt from "../../../components/CepheusArt";
import CepheusMap from "../../../components/CepheusMap";
import CepheusRouteExplorer from "../../../components/CepheusRouteExplorer";
import SourceNotes, { type SourceReference } from "../../../components/SourceNotes";
import TonightSkyCard from "../../../components/TonightSkyCard";

const objects = [
  {
    name: "Alderamin",
    kind: "Estrella blanca",
    visibility: "Ull nu",
    text: "És l’estrella més brillant de Cefeu i una de les dues cantonades de la base de la casa. No és l’objecte físicament més estrany de la constel·lació, però sí la millor àncora per començar a reconstruir-ne el patró.",
  },
  {
    name: "δ Cephei",
    kind: "Variable cefeida clàssica",
    visibility: "Ull nu · seguiment durant dies",
    text: "És el prototip de les cefeides clàssiques: l’estrella s’expandeix i es contrau i la seva brillantor varia en un cicle d’uns 5,37 dies. La relació entre període i lluminositat d’aquesta família va obrir una via decisiva per mesurar distàncies còsmiques.",
  },
  {
    name: "μ Cephei",
    kind: "Supergegant vermella variable",
    visibility: "Ull nu · prismàtics",
    text: "El seu color vermellós és el gran reclam visual. William Herschel la va descriure com una «estrella granat»: el sobrenom històric Garnet Star no és una denominació oficial IAU, però continua explicant molt bé què convé buscar.",
  },
  {
    name: "NGC 7380",
    kind: "Cúmul obert",
    visibility: "Cel fosc · telescopi petit",
    text: "És un cúmul compacte immers en una regió de formació estel·lar. Amb equip modest cal buscar les estrelles del cúmul: la nebulositat extensa que domina les fotografies de llarga exposició és molt més difícil visualment.",
  },
];

const sources: SourceReference[] = [
  {
    title: "IAU · The Constellations",
    detail: "Nom oficial Cepheus i marc de les constel·lacions com a regions delimitades del cel",
    href: "https://iauarchive.eso.org/public/themes/constellations/",
    consultationDate: "2026-09-09",
  },
  {
    title: "IAU · Naming Stars",
    detail: "Formes normalitzades Alderamin, Alfirk i Errai al catàleg de noms estel·lars",
    href: "https://iauarchive.eso.org/public/themes/naming_stars/",
    consultationDate: "2026-09-09",
  },
  {
    title: "SIMBAD · CDS",
    detail: "Coordenades ICRS, magnituds i classificacions de les estrelles del patró, δ Cephei, μ Cephei i NGC 7380",
    href: "https://simbad.cds.unistra.fr/simbad/",
    consultationDate: "2026-09-09",
  },
  {
    title: "AAVSO · Delta Cephei",
    detail: "Prototip de les cefeides clàssiques, pulsació i període aproximat de 5,366 dies",
    href: "https://www.aavso.org/vsots_delcep",
    consultationDate: "2026-09-09",
  },
  {
    title: "NASA Science · Universe glossary",
    detail: "Pulsació de les cefeides i relació entre el període i la lluminositat intrínseca",
    href: "https://science.nasa.gov/universe/glossary-3/a-g/",
    consultationDate: "2026-09-09",
  },
  {
    title: "Leavitt i Pickering · Harvard College Observatory Circular 173 (1912)",
    detail: "Relació observada entre període i brillantor de variables als Núvols de Magalhães",
    href: "https://ui.adsabs.harvard.edu/abs/1912HarCi.173....1L/abstract",
    consultationDate: "2026-09-09",
  },
  {
    title: "Harvard Plate Stacks · Henrietta Swan Leavitt",
    detail: "Context històric de la relació període–lluminositat i la seva calibració posterior",
    href: "https://platestacks.cfa.harvard.edu/henrietta-swan-leavitt/variable-stars",
    consultationDate: "2026-09-09",
  },
  {
    title: "AAVSO · Mu Cephei",
    detail: "Naturalesa de supergegant vermella variable i tradició del sobrenom Garnet Star",
    href: "https://www.aavso.org/vsots_mucep",
    consultationDate: "2026-09-09",
  },
  {
    title: "Biblioteca atribuïda a Apol·lodor, 2.4.3",
    detail: "Cefeu, l’oracle, la pressió dels etíops, l’exposició d’Andròmeda i l’acord amb Perseu",
    href: "https://www.theoi.com/Text/Apollodorus2.html",
    consultationDate: "2026-09-09",
  },
  {
    title: "Higí · Astronomica, 2.9",
    detail: "Cefeu com a rei, pare d’Andròmeda i membre de la família situada entre les constel·lacions",
    href: "https://topostext.org/work/207",
    consultationDate: "2026-09-09",
  },
  {
    title: "Arat · Fenòmens, 179–187",
    detail: "Posició i figura celeste de Cefeu prop de l’Ossa Menor i Cassiopea",
    href: "https://topostext.org/work/551",
    consultationDate: "2026-09-09",
  },
];

export default function CepheusPage() {
  return (
    <main>
      <section className="page-hero wrap constellation-hero cepheus-hero">
        <div>
          <Link href="/constellacions" className="back-link">← Constel·lacions</Link>
          <p className="eyebrow">CIRCUMPOLAR · NIVELL INTERMEDI</p>
          <h1>Cefeu</h1>
          <p className="lead">El rei del nord, una casa d’estrelles i una clau per mesurar l’Univers.</p>
        </div>
        <dl className="facts">
          <div><dt>Millor època al vespre</dt><dd>Agost – gener</dd></div>
          <div><dt>Patró</dt><dd>Casa o pentàgon irregular</dd></div>
          <div><dt>Visibilitat</dt><dd>Patró principal circumpolar des de Catalunya</dd></div>
          <div><dt>Estrella de referència</dt><dd>Alderamin</dd></div>
          <div><dt>Observació</dt><dd>Ull nu · prismàtics · telescopi petit</dd></div>
          <div><dt>Nom oficial IAU</dt><dd>Cepheus</dd></div>
        </dl>
      </section>

      <div className="wrap tonight-wrap">
        <TonightSkyCard
          name="Cefeu"
          referenceName="Alderamin"
          coordinate={{ raHours: 21 + 18 / 60 + 34.7723 / 3600, decDeg: 62 + 35 / 60 + 8.069 / 3600 }}
          objectArticle="el"
          referenceDescription="La posició es calcula prenent Alderamin, l’estrella més brillant i una cantonada principal de la casa de Cefeu, com a referència de la constel·lació."
        />
      </div>

      <section className="wrap section cepheus-recognition">
        <div className="cepheus-house-mark" aria-hidden="true">
          <span className="cepheus-mark-alderamin" /><span className="cepheus-mark-alfirk" /><span className="cepheus-mark-errai" /><span className="cepheus-mark-iota" /><span className="cepheus-mark-zeta" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="22,67 25,31 72,14 66,55 43,81" /><path d="M 13 88 Q 49 100 84 85" /><path d="M 84 85 l -7 0 m 7 0 l -4 6" /></svg>
          <b>UNA CASA IRREGULAR · SEMPRE AL NORD</b>
        </div>
        <div>
          <p className="section-kicker">COM TROBAR-LO</p>
          <h2>Una casa discreta al costat de Cassiopea</h2>
          <p>Des d’un extrem de la <strong>W de Cassiopea</strong>, busca <strong>Alderamin</strong> i <strong>Alfirk</strong>. Després tanca una figura de cinc costats amb <strong>Errai</strong>, <strong>ι Cephei</strong> i <strong>ζ Cephei</strong>. No esperis una casa simètrica: és una memòria visual per ordenar un pentàgon allargat i una mica tort.</p>
          <p className="science-separation"><strong>El patró principal de Cefeu és circumpolar des de Catalunya:</strong> les cinc estrelles de la casa queden sempre sobre l’horitzó geomètric a uns 41° N. Això no vol dir que siguin sempre altes; ζ Cephei pot passar a només uns 9° sobre l’horitzó nord.</p>
        </div>
      </section>

      <section className="wrap constellation-layout dual-visual-layout">
        <div>
          <div className="section-heading compact-heading"><div><p className="section-kicker">MAPA DE RECONEIXEMENT</p><h2>La casa, dues variables i un cúmul discret</h2></div></div>
          <CepheusMap />
          <p className="map-note stronger-note">Les estrelles i el cúmul es projecten a partir de <strong>coordenades equatorials en el sistema ICRS, referides a l’època J2000.0</strong>. Les línies són una ajuda visual que pot variar entre atles: la IAU defineix regions del cel, no aquests dibuixos. La figura mitològica és una capa interpretativa separada.</p>
        </div>
        <aside className="find-card">
          <p className="section-kicker">LLEGEIX EL PATRÓ</p>
          <h2>Cinc punts i tres sorpreses</h2>
          <ol>
            <li>Fixa <strong>Alderamin</strong> i puja cap a <strong>Alfirk</strong>.</li>
            <li>Continua fins a <strong>Errai</strong>, el vèrtex més septentrional de la casa.</li>
            <li>Tanca el pentàgon amb <strong>ι Cephei</strong> i <strong>ζ Cephei</strong>.</li>
            <li>Fora del traç principal, separa <strong>δ Cephei</strong>, <strong>μ Cephei</strong> i el cúmul <strong>NGC 7380</strong>.</li>
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
        <div className="variable-contrast-note">
          <p className="section-kicker">NO TOTES LES VARIABLES CANVIEN IGUAL</p>
          <p><strong>Algol</strong>, a Perseu, baixa de brillantor quan els components s’eclipsen vistos des de la Terra. <strong>δ Cephei</strong> varia perquè l’estrella pulsa físicament: el seu radi i la seva temperatura canvien al llarg del cicle.</p>
        </div>
      </section>

      <section className="wrap section artistic-panel cepheus-artistic-panel">
        <div className="section-heading compact-heading"><div><p className="section-kicker">CEFEU IMAGINAT</p><h2>El rei entre les estrelles</h2></div></div>
        <CepheusArt />
      </section>

      <section className="myth-section cepheus-myth-section">
        <div className="wrap cepheus-myth-layout">
          <div className="myth-figure cepheus-myth-figure" aria-hidden="true"><span>✦</span><p>CEFEU</p></div>
          <div>
            <p className="section-kicker">EL REI, L’ORACLE I UNA FAMÍLIA AL CEL</p>
            <h2>Un mateix personatge, responsabilitats narrades amb matisos</h2>
            <p><strong>Cefeu</strong> és, en el relat grec, rei de l’<strong>Etiòpia mítica</strong>, espòs de <strong>Cassiopea</strong> i pare d’<strong>Andròmeda</strong>. Aquest espai mític no s’ha de confondre automàticament amb l’estat modern d’Etiòpia. Les fonts situen Cefeu al centre d’una crisi familiar i política, però no descriuen totes de la mateixa manera fins a quin punt decideix o és forçat a actuar.</p>

            <div className="myth-stories-grid cepheus-myth-stories">
              <article>
                <p className="section-kicker">PSEUDO-APOL·LODOR</p>
                <h3>Un oracle i la pressió del regne</h3>
                <p>Després de la disputa provocada per Cassiopea, <strong>Posidó</strong> envia una inundació i un monstre. L’oracle d’Ammon anuncia que el desastre cessarà si Andròmeda és oferta al monstre. El text precisa que els etíops obliguen Cefeu a fer-ho: no presenta la decisió simplement com un gest individual i voluntari del rei.</p>
              </article>
              <article>
                <p className="section-kicker">PERSEU</p>
                <h3>Una promesa abans del rescat</h3>
                <p>Quan <strong>Perseu</strong> veu Andròmeda exposada, demana a Cefeu que li prometi la jove en matrimoni si aconsegueix salvar-la. El rei accepta i l’heroi venç el monstre. El relat continua amb un conflicte matrimonial que pertany sobretot a les històries de Perseu i Andròmeda.</p>
              </article>
              <article>
                <p className="section-kicker">HIGÍ · ASTRONOMICA</p>
                <h3>La família commemorada</h3>
                <p><strong>Higí</strong> identifica Cefeu com a rei i pare d’Andròmeda, i explica que els déus situen la família entre les constel·lacions perquè el seu record perduri. És una formulació de catasterisme més general que les gestes detallades reservades a altres figures del mateix conjunt.</p>
              </article>
              <article>
                <p className="section-kicker">ARAT</p>
                <h3>Un rei ja dibuixat al nord</h3>
                <p>Als <strong>Fenòmens</strong>, Cefeu apareix darrere de l’Ossa Menor, amb les dues mans esteses, i Cassiopea gira a l’est de la seva figura. Arat descriu aquesta disposició celeste; no desenvolupa aquí una nova causa narrativa per explicar-ne l’ascens al cel.</p>
              </article>
            </div>

            <p className="myth-conclusion">La constel·lació moderna conserva el nom de Cefeu; els relats antics en conserven rols diferents. Quan una font parla de pressió col·lectiva i una altra resumeix el rei que obeeix un oracle, l’Atlas manté el matís en lloc de fabricar un únic judici sobre el personatge.</p>
            <div className="myth-next-story" aria-label="Connexions mitològiques"><Link href="/constellacions/cassiopea"><strong>Continua a Cassiopea →</strong></Link><Link href="/constellacions/andromeda">Continua a Andròmeda →</Link><Link href="/constellacions/perseu">Continua a Perseu →</Link></div>
          </div>
        </div>
      </section>

      <section className="wrap section route-card interactive-route-card">
        <p className="section-kicker">STAR HOPPING</p>
        <h2>De la W a la casa, i de la casa a dues estrelles variables.</h2>
        <p className="muted route-intro">La primera ruta entra des de Cassiopea, la segona fixa els cinc costats del patró i la tercera compara dues variables físicament molt diferents.</p>
        <CepheusRouteExplorer />
      </section>

      <SourceNotes references={sources} />

      <nav className="wrap constellation-pagination constellation-pagination-back" aria-label="Navegació entre constel·lacions">
        <Link href="/constellacions/perseu"><strong>← Perseu</strong><span>Torna a Mirfak, Algol i el Doble Cúmul</span></Link>
      </nav>
    </main>
  );
}
