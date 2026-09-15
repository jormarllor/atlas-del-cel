import type { Metadata } from "next";
import Link from "next/link";
import SourceNotes, { type SourceReference } from "../../../components/SourceNotes";
import TonightSkyCard from "../../../components/TonightSkyCard";
import UrsaMajorArt from "../../../components/UrsaMajorArt";
import UrsaMajorMap from "../../../components/UrsaMajorMap";
import UrsaMajorRouteExplorer from "../../../components/UrsaMajorRouteExplorer";
import { ALIOTH, CARRO_LINES, URSA_MAJOR_STARS, projectUrsaMajor } from "../../../components/ursaMajorData";

export const metadata: Metadata = {
  title: "Óssa Major · Atlas del Cel",
  description: "Distingeix el Carro de l’Óssa Major, troba Polaris amb Dubhe i Merak i descobreix Mizar–Alcor i les galàxies M81 i M82.",
};

const objects = [
  {
    name: "Dubhe i Merak", kind: "Les estrelles indicadores", visibility: "Ull nu",
    text: "Formen un costat del bol del Carro. De Merak a Dubhe, prolonga la direcció unes cinc vegades més enllà de Dubhe per arribar a la zona de Polaris. Les dues indicadores són de l’Óssa Major; Polaris és de l’Óssa Menor.",
  },
  {
    name: "Mizar i Alcor", kind: "Una parella aparent, molts components", visibility: "Ull nu · prismàtics",
    text: "Pots veure dues estrelles on a primer cop d’ull sembla haver-n’hi una: estan separades uns 12 minuts d’arc. Mizar és un sistema quàdruple i Alcor és binària. Comparteixen el context del grup mòbil de l’Óssa Major, però la literatura no és unànime sobre si el conjunt està lligat gravitacionalment.",
  },
  {
    name: "M81 i M82", kind: "Dues galàxies", visibility: "Cel fosc · telescopi petit",
    text: "Poden compartir un mateix camp a baixos augments: M81 mostra una taca més ovalada, mentre que M82 és més estreta i allargada. No són dos detalls d’una mateixa galàxia. Sota un bon cel, busca sobretot els nuclis difusos i el contrast de formes, no les estructures de les fotografies.",
  },
  {
    name: "M101", kind: "Galàxia espiral · repte avançat", visibility: "Cel molt fosc · telescopi",
    text: "La seva llum s’estén sobre una superfície molt gran i es perd fàcilment en un fons de cel il·luminat. És molt més exigent que M81 i M82: no esperis una espiral detallada amb un telescopi petit. És una invitació per continuar, no un requisit per reconèixer el Carro.",
  },
];

// Evening season checked with the existing astronomy.ts functions at 41.4 N,
// 1.5 E: 20:00–23:00 Europe/Madrid, Sun <= -12 degrees, 15-minute samples.
// Mid-month 2026 Alioth peaks Mar–Jul: 56,64,75,67,53 degrees (Feb 40; Aug 43).
// All seven Carro stars stay above 38 degrees at these selected evening peaks.
// This editorial comfort window is not TonightSkyCard's visibility threshold.

const consulted = "2026-09-15";
const sources: SourceReference[] = [
  { title: "IAU · The Constellations", detail: "Ursa Major com a regió oficial, Ursa Minor i distinció entre constel·lació i patró visual", href: "https://iauarchive.eso.org/public/themes/constellations/", consultationDate: consulted },
  { title: "IAU · Naming Stars", detail: "Noms normalitzats de les set estrelles del Carro, Alcor i les estrelles secundàries", href: "https://iauarchive.eso.org/public/themes/naming_stars/", consultationDate: consulted },
  { title: "SIMBAD/CDS · Alioth i estrelles del Carro", detail: "Coordenades ICRS, referides a J2000.0, i magnituds; també s’han consultat les sis estrelles secundàries, Alcor i Polaris", href: "https://simbad.cds.unistra.fr/simbad/sim-id?Ident=Alioth", consultationDate: consulted },
  { title: "SIMBAD/CDS · M81, M82 i M101", detail: "Posicions dels centres galàctics; extensió angular catalogada de M101. Les separacions de les rutes es calculen a partir de les posicions", href: "https://simbad.cds.unistra.fr/simbad/sim-id?Ident=M%2081", consultationDate: consulted },
  { title: "Lunar and Planetary Institute · SkyTellers: Polaris", detail: "Ús de Merak i Dubhe com a indicadores cap a Polaris, fora de l’Óssa Major", href: "https://www.lpi.usra.edu/education/skytellers/polaris/", consultationDate: consulted },
  { title: "Mamajek et al. · Discovery of a Faint Companion to Alcor (2010)", detail: "Alcor binària i Mizar quàdruple; proposta, amb incerteses, d’un conjunt físicament associat", href: "https://arxiv.org/abs/0911.5028", consultationDate: consulted },
  { title: "Discovery of double stars by Giovanni Battista Hodierna in 1654 (2024)", detail: "Revisió acadèmica que descriu Mizar i Alcor com a membres del mateix grup mòbil, però no lligades entre elles; motiu de la formulació prudent", href: "https://arxiv.org/html/2408.10917v1", consultationDate: consulted },
  { title: "NASA Science · Messier 81", detail: "Galàxia espiral i observació com a taca difusa, en un camp pròxim a M82", href: "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-81/", consultationDate: consulted },
  { title: "NASA Science · Messier 82", detail: "Naturalesa galàctica i observació de M82 al costat de M81", href: "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-82/", consultationDate: consulted },
  { title: "NASA Science · Messier 101", detail: "Gran galàxia espiral; distinció entre la seva estructura física i una observació visual modesta", href: "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-101/", consultationDate: consulted },
  { title: "Homer · Ilíada, 18.483–489", detail: "L’Óssa, també anomenada Carro, en l’escut d’Aquil·les i la imatge dels banys d’Oceà", href: "https://classics.mit.edu/Homer/iliad.18.xviii.html", consultationDate: consulted },
  { title: "Arat · Fenòmens, 27–44", detail: "Les dues Ósses, les nodrisses de Zeus i els usos mariners d’Hèlice i Cinosura", href: "https://topostext.org/work/551", consultationDate: consulted },
  { title: "Higí · Astronomica, 2.1, 2.2 i 2.4", detail: "Variants de la transformació de Cal·listo, les dues Ósses i Arcas com a Arctofílax", href: "https://topostext.org/work/207", consultationDate: consulted },
  { title: "Ovidi · Metamorfosis, 2.401–530", detail: "Cal·listo, la transformació per Juno, la trobada amb Arcas i el catasterisme", href: "https://topostext.org/work/141", consultationDate: consulted },
];

function DipperMark() {
  const stars = URSA_MAJOR_STARS.filter(point => point.group === "carro").map(point => {
    const p = projectUrsaMajor(point);
    return { ...point, x: 85 + (p.x + 4) * 15, y: 180 + p.y * 15 };
  });
  const byId = Object.fromEntries(stars.map(point => [point.id, point]));
  return <div className="ursa-dipper-mark" aria-hidden="true"><svg viewBox="0 0 600 320">{CARRO_LINES.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}{stars.map(point => <circle key={point.id} cx={point.x} cy={point.y} r={point.id === "alioth" ? 5 : 3.5} />)}</svg><b>SET ESTRELLES · UN ASTERISME</b></div>;
}

export default function UrsaMajorPage() {
  return (
    <main>
      <section className="page-hero wrap constellation-hero ursa-major-hero">
        <div>
          <Link href="/constellacions" className="back-link">← Constel·lacions</Link>
          <p className="eyebrow">PRIMAVERA · NIVELL FÀCIL</p>
          <h1>Óssa Major</h1>
          <p className="lead">El Carro, el camí cap al nord i una gran óssa que és molt més que set estrelles.</p>
          <p className="ursa-hero-distinction"><strong>El Carro no és tota l’Óssa Major.</strong> És un asterisme de set estrelles dins de la constel·lació.</p>
        </div>
        <dl className="facts">
          <div><dt>Millor època al vespre</dt><dd>Març – juliol</dd></div>
          <div><dt>Patró</dt><dd>El Carro: bol i mànec</dd></div>
          <div><dt>Visibilitat</dt><dd>Carro circumpolar o gairebé circumpolar; no tota l’Óssa</dd></div>
          <div><dt>Estrella de referència</dt><dd>Alioth</dd></div>
          <div><dt>Observació</dt><dd>Ull nu · prismàtics · telescopi petit</dd></div>
          <div><dt>Nom oficial IAU</dt><dd>Ursa Major</dd></div>
        </dl>
      </section>

      <div className="wrap tonight-wrap"><TonightSkyCard name="Óssa Major" referenceName="Alioth" coordinate={{ raHours: ALIOTH.raHours, decDeg: ALIOTH.decDeg }} objectArticle="la" referenceDescription="La posició es calcula prenent Alioth, una de les estrelles més brillants i una àncora central del mànec del Carro, com a referència de l’Óssa Major." /></div>

      <section className="wrap section ursa-recognition">
        <DipperMark />
        <div>
          <p className="section-kicker">COM TROBAR-LA</p>
          <h2>Primer reconeix el Carro. Després, amplia la mirada.</h2>
          <p>Busca quatre llums que formen un bol irregular: <strong>Dubhe, Merak, Phecda i Megrez</strong>. Des de Megrez surt el mànec corbat, amb <strong>Alioth, Mizar i Alkaid</strong>. La figura pot estar inclinada o capgirada: és el mateix patró mentre gira al voltant del nord celeste.</p>
          <p>Un <strong>asterisme</strong> és un patró recognoscible que no equival necessàriament a una constel·lació oficial. El Carro és la porta d’entrada; l’<strong>Óssa Major</strong> és una regió molt més extensa, amb altres estrelles que permeten imaginar-ne el cap i les potes.</p>
          <p className="science-separation"><strong>El Carro és circumpolar o gairebé circumpolar a gran part de Catalunya.</strong> Alkaid passa fregant l’horitzó nord i pot arribar a pondre’s geomètricament a les latituds més meridionals. <strong>L’Óssa Major completa no és circumpolar des de Catalunya.</strong> El relleu i l’extinció atmosfèrica poden amagar estrelles encara situades sobre l’horitzó geomètric.</p>
        </div>
      </section>

      <section className="wrap constellation-layout dual-visual-layout">
        <div>
          <div className="section-heading compact-heading"><div><p className="section-kicker">MAPA DE RECONEIXEMENT</p><h2>El Carro és només una part de l’Óssa</h2></div></div>
          <UrsaMajorMap />
          <p className="map-note stronger-note">Posicions projectades a partir de <strong>coordenades equatorials en el sistema ICRS, referides a l’època J2000.0</strong>. El Carro té el traç principal; el cap i les potes, un traç secundari. Les línies són una ajuda visual, no una figura oficial IAU: la IAU defineix regions del cel. Mizar i Alcor gairebé se superposen a aquesta escala; les galàxies es marquen separadament, sense formar part del traç.</p>
        </div>
        <aside className="find-card">
          <p className="section-kicker">EL QUE T’EMPORTES</p>
          <h2>Un patró, el nord i un primer salt</h2>
          <ol>
            <li><strong>Carro ≠ Óssa Major.</strong> Set estrelles són l’asterisme; la constel·lació oficial és molt més gran.</li>
            <li><strong>Merak → Dubhe → Polaris.</strong> Continua unes cinc vegades més enllà de Dubhe fins a la zona de l’Óssa Menor.</li>
            <li><strong>Mizar → Alcor.</strong> Mira amb atenció: una llum aparent pot convertir-se en dues.</li>
            <li><strong>Phecda → Dubhe → M81/M82.</strong> La diagonal prepara una ruta cap a dues galàxies.</li>
          </ol>
        </aside>
      </section>

      <section className="wrap section">
        <div className="section-heading"><div><p className="section-kicker">QUÈ ESTÀS VEIENT?</p><h2>Quatre coses que val la pena observar</h2></div></div>
        <div className="object-grid">{objects.map(object => <article className="object-card" key={object.name}><div className="object-meta"><span>{object.kind}</span><span>{object.visibility}</span></div><h3>{object.name}</h3><p>{object.text}</p></article>)}</div>
        <p className="ursa-north-note"><strong>Polaris indica la zona del nord celeste, no el pol exacte.</strong> Pertany a l’Óssa Menor i queda molt a prop del punt al voltant del qual sembla girar aquest cel. La futura fitxa de l’Óssa Menor aprofundirà en aquesta orientació.</p>
      </section>

      <section className="wrap section artistic-panel ursa-artistic-panel">
        <div className="section-heading compact-heading"><div><p className="section-kicker">ÓSSA MAJOR IMAGINADA</p><h2>La gran óssa entre les estrelles</h2></div></div>
        <UrsaMajorArt />
      </section>

      <section className="myth-section ursa-myth-section">
        <div className="wrap ursa-myth-layout">
          <div className="myth-figure ursa-myth-figure" aria-hidden="true"><span>✦</span><p>HÈLICE</p></div>
          <div>
            <p className="section-kicker">UNA ÓSSA, MÉS D’UNA TRADICIÓ</p>
            <h2>Cal·listo no és l’única història del nord</h2>
            <p>Els relats antics no donen una sola identitat a les dues Ósses. Algunes fonts hi veuen <strong>Cal·listo</strong>; d’altres, les figures que van criar <strong>Zeus</strong>. Els noms, els motius de la transformació i el lloc d’<strong>Arcas</strong> canvien segons l’autor. El cel les reuneix visualment, però no obliga a fondre-les en un sol conte.</p>
            <div className="myth-stories-grid ursa-myth-stories">
              <article><p className="section-kicker">ARAT · FENÒMENS</p><h3>Hèlice i Cinosura, nodrisses de Zeus</h3><p>Arat recull, amb una fórmula prudent, la tradició segons la qual les dues Ósses van alimentar Zeus infant a Creta mentre els Curetes distreien Cronos. Les anomena <strong>Hèlice</strong> i <strong>Cinosura</strong>. També contraposa la gran figura que guia els aqueus amb la més petita que prefereixen els fenicis per navegar: aquí el relat és inseparable d’una observació pràctica del cel.</p></article>
              <article><p className="section-kicker">OVIDI · METAMORFOSIS</p><h3>Cal·listo i el fill que no la reconeix</h3><p>En la versió d’Ovidi, Cal·listo és una companya de <strong>Diana</strong>, víctima de <strong>Júpiter</strong>. Després del naixement d’Arcas, <strong>Juno</strong> la transforma en óssa. Anys més tard, Arcas troba l’animal sense reconèixer la seva mare i es prepara per atacar-lo. Júpiter evita el desenllaç i eleva tots dos al cel. Aquesta seqüència pertany a Ovidi: no és la mateixa transformació que expliquen totes les altres fonts.</p></article>
              <article><p className="section-kicker">HIGÍ · VARIANTS SEPARADES</p><h3>Qui transforma Cal·listo?</h3><p>Higí conserva relats diferents: en un, és <strong>Diana</strong> qui la transforma; en un altre, <strong>Juno</strong> la converteix en óssa i Diana la mata; una tercera versió fa que <strong>Júpiter</strong> la transformi per ocultar el que ha passat. No són tres moments d’una mateixa història. En el relat que acaba al santuari de Zeus Liceu, Higí situa Arcas com a <strong>Arctofílax</strong>, el Guardià de l’Óssa, associat al <strong>Bover</strong>: no el converteix automàticament en l’Óssa Menor.</p></article>
              <article><p className="section-kicker">HOMER · ILÍADA, 18.483–489</p><h3>L’Óssa que no es banya a Oceà</h3><p>En descriure l’escut d’Aquil·les, Homer esmenta l’Óssa, també anomenada Carro, que gira al seu lloc i no participa en els banys d’Oceà. La imatge reflecteix l’observació antiga d’una figura septentrional que no es ponia com moltes altres estrelles. És poesia vinculada al cel observat, no una formulació moderna de declinació ni una regla universal per a totes les latituds.</p></article>
            </div>
            <p className="myth-conclusion">Higí i Ovidi també recullen l’explicació mítica que les aigües d’Oceà no reben l’Óssa a petició de Juno o per fidelitat a ella. El relat dona una causa divina al moviment observat; l’astronomia l’explica amb la latitud i la declinació. Són lectures diferents, no dues versions del mateix càlcul.</p>
            <div className="myth-next-story"><strong>La història de les dues Ósses continua</strong><span>Óssa Menor · properament</span></div>
          </div>
        </div>
      </section>

      <section className="wrap section route-card interactive-route-card">
        <p className="section-kicker">STAR HOPPING</p>
        <h2>Set estrelles. Una ruta cap al nord. Dues galàxies.</h2>
        <p className="muted route-intro">Reconstrueix el Carro, utilitza les indicadores o amplia la diagonal del bol. Els salts són guies de cerca, no alineacions perfectes.</p>
        <UrsaMajorRouteExplorer />
      </section>
      <SourceNotes references={sources} />
      <nav className="wrap constellation-pagination ursa-pagination" aria-label="Navegació de l’Atlas">
        <Link href="/constellacions#primavera"><strong>← Cel de primavera</strong><span>Un nou sector de l’Atlas</span></Link>
        <div><strong>Següent sector → Óssa Menor</strong><span>Properament · Polaris i el nord celeste</span></div>
      </nav>
    </main>
  );
}
