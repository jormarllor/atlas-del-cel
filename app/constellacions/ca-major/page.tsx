import Link from "next/link";
import CanisMajorArt from "../../../components/CanisMajorArt";
import CanisMajorMap from "../../../components/CanisMajorMap";
import CanisMajorRouteExplorer from "../../../components/CanisMajorRouteExplorer";
import SourceNotes, { type SourceReference } from "../../../components/SourceNotes";
import TonightSkyCard from "../../../components/TonightSkyCard";

const objects = [
  {
    name: "Sirius",
    kind: "Sistema estel·lar binari",
    visibility: "Ull nu",
    text: "És l’estrella més brillant del cel nocturn. Destaca perquè Sirius A és intrínsecament lluminosa i, a escala còsmica, el sistema és relativament proper; la seva companya Sirius B és una nana blanca molt més difícil d’observar.",
  },
  {
    name: "M41",
    kind: "Cúmul obert",
    visibility: "Prismàtics",
    text: "Apareix uns quatre graus al sud de Sirius com una petita concentració de llum. Amb prismàtics es resol en una agrupació d’estrelles i es converteix en un primer objecte de cel profund molt agraït.",
  },
  {
    name: "Adhara",
    kind: "Estrella supergegant",
    visibility: "Ull nu",
    text: "Ajuda a llegir la part baixa del cos del gos. Al cel sembla molt menys dominant que Sirius, però és una estrella físicament molt lluminosa i molt més llunyana.",
  },
  {
    name: "NGC 2362 · Tau Canis Majoris",
    kind: "Cúmul obert",
    visibility: "Telescopi petit",
    text: "Un cúmul compacte al voltant visual de Tau Canis Majoris. És un bon pas següent després de M41 quan es disposa d’un telescopi petit i d’un horitzó sud net.",
  },
];

const sources: SourceReference[] = [
  {
    title: "IAU · The Constellations",
    detail: "Denominació, abreviatura i marc oficial de Canis Major",
    href: "https://iauarchive.eso.org/public/themes/constellations/",
    consultationDate: "2026-09-02",
  },
  {
    title: "SIMBAD · CDS",
    detail: "Coordenades ICRS de Sirius, Mirzam, Wezen, Adhara, Aludra, Furud, M41 i NGC 2362",
    href: "https://simbad.cds.unistra.fr/simbad/",
    consultationDate: "2026-09-02",
  },
  {
    title: "NASA Science · Skywatching FAQ",
    detail: "Lluentor aparent de Sirius i relació entre lluminositat i proximitat",
    href: "https://science.nasa.gov/skywatching/faq/",
    consultationDate: "2026-09-02",
  },
  {
    title: "NASA / Hubble · The Dog Star and its companion",
    detail: "Naturalesa binària de Sirius i identificació de Sirius B com a nana blanca",
    href: "https://science.nasa.gov/asset/hubble/the-dog-star-sirius-and-its-tiny-companion/",
    consultationDate: "2026-09-02",
  },
  {
    title: "Arat · Fenòmens, 319–352",
    detail: "El Gos sota Orió, Sirius i la persecució celeste de la Llebre",
    href: "https://topostext.org/work/551",
    consultationDate: "2026-09-02",
  },
  {
    title: "Higí · Astronomica, 2.35",
    detail: "Tradicions alternatives del Gos: Europa, Procris, Orió i Ícar",
    href: "https://topostext.org/work/207",
    consultationDate: "2026-09-02",
  },
];

export default function CanisMajorPage() {
  return (
    <main>
      <section className="page-hero wrap constellation-hero canis-major-hero">
        <div>
          <Link href="/constellacions" className="back-link">← Constel·lacions</Link>
          <p className="eyebrow">HIVERN · NIVELL FÀCIL</p>
          <h1>Ca Major</h1>
          <p className="lead">La constel·lació de Sirius: el gran gos que brilla sota Orió.</p>
        </div>
        <dl className="facts">
          <div><dt>Millor època</dt><dd>Hivern</dd></div>
          <div><dt>Patró</dt><dd>Sirius i el traç principal del gos</dd></div>
          <div><dt>Estrella de referència</dt><dd>Sirius</dd></div>
          <div><dt>Observació</dt><dd>Ull nu · prismàtics · telescopi petit</dd></div>
          <div><dt>Nom oficial IAU</dt><dd>Canis Major</dd></div>
        </dl>
      </section>

      <div className="wrap tonight-wrap">
        <TonightSkyCard
          name="Ca Major"
          referenceName="Sirius"
          coordinate={{ raHours: 6 + 45 / 60 + 8.91728 / 3600, decDeg: -(16 + 42 / 60 + 58.0171 / 3600) }}
          objectArticle="el"
          referenceDescription="La posició es calcula prenent Sirius, l’estrella més brillant del cel nocturn, com a referència de la constel·lació."
        />
      </div>

      <section className="wrap section canis-major-recognition">
        <div className="sirius-beacon" aria-hidden="true"><span /><i /><b>SIRIUS</b></div>
        <div>
          <p className="section-kicker">EL PUNT D’ENTRADA</p>
          <h2>Sirius obre la porta; les altres estrelles dibuixen el gos.</h2>
          <p>La lluentor de Sirius atrau primer la mirada. Des d’allà, busca Mirzam a prop del cap i deixa que el patró s’obri cap a Wezen, Adhara i Aludra: la constel·lació és més gran i més baixa del que suggereix una sola estrella.</p>
          <p className="science-separation"><strong>No totes brillen igual:</strong> Sirius domina per la combinació de lluminositat i proximitat. Les altres estrelles principals poden ser físicament molt potents i, tanmateix, semblar més modestes perquè són molt més lluny.</p>
        </div>
      </section>

      <section className="wrap constellation-layout dual-visual-layout">
        <div>
          <div className="section-heading compact-heading"><div><p className="section-kicker">MAPA DE RECONEIXEMENT</p><h2>De Sirius al cos del gran gos</h2></div></div>
          <CanisMajorMap />
          <p className="map-note stronger-note">Les estrelles i M41 es projecten a partir de <strong>coordenades equatorials en el sistema ICRS, referides a l’època J2000.0</strong>. Les línies són una ajuda visual i poden variar entre atles: la IAU defineix les constel·lacions com a regions del cel, no com aquests dibuixos. La figura mitològica és una capa interpretativa separada.</p>
        </div>
        <aside className="find-card">
          <p className="section-kicker">COM TROBAR-LA</p>
          <h2>Del cinturó d’Orió a Sirius</h2>
          <ol>
            <li>Localitza les tres estrelles del <strong>cinturó d’Orió</strong>.</li>
            <li>Prolonga’n la línia <strong>cap avall i cap a l’esquerra</strong>, mirant cap al sud com als mapes de l’Atlas.</li>
            <li>Arribaràs a una estrella molt més brillant que les del voltant: <strong>Sirius</strong>.</li>
            <li>Des de Sirius, obre la mirada cap a <strong>Wezen, Adhara i Aludra</strong> per reconstruir el cos del gos.</li>
          </ol>
        </aside>
      </section>

      <section className="wrap section">
        <div className="section-heading"><div><p className="section-kicker">QUÈ ESTÀS VEIENT?</p><h2>Quatre portes d’entrada a Ca Major</h2></div></div>
        <div className="object-grid">
          {objects.map(object => (
            <article className="object-card" key={object.name}>
              <div className="object-meta"><span>{object.kind}</span><span>{object.visibility}</span></div>
              <h3>{object.name}</h3><p>{object.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section artistic-panel canis-major-artistic-panel">
        <div className="section-heading compact-heading">
          <div><p className="section-kicker">CA MAJOR IMAGINAT</p><h2>El gran gos sota el caçador</h2></div>
        </div>
        <CanisMajorArt />
      </section>

      <section className="myth-section canis-major-myth-section">
        <div className="wrap canis-major-myth-layout">
          <div className="myth-figure canis-major-myth-figure" aria-hidden="true"><span>✦</span><p>CA MAJOR</p></div>
          <div>
            <p className="section-kicker">EL GOS I SIRIUS</p>
            <h2>Una figura antiga, més d’una identitat</h2>
            <p>Dir que Ca Major és «el gos d’Orió» és una lectura útil, i no és només moderna: als <em>Fenòmens</em>, <strong>Arat</strong> situa el Gos sota Orió, descriu Sirius a l’extrem de la mandíbula i imagina la figura perseguint eternament la Llebre. El cel reforça la narració perquè Orió, la Llebre i el Gos avancen junts en el seu moviment aparent.</p>
            <p>Però les fonts antigues no conserven una única biografia per a aquest animal. <strong>Higí</strong> recull diverses propostes: el gos guardià d’Europa que passa a Minos, Procris i Cèfal; el gos veloç que s’enfronta a una guineu destinada a no ser atrapada; el gos d’Orió; i fins i tot el d’Ícar. El gos infal·lible del relat és sovint anomenat <strong>Lèlaps</strong> en la tradició mitogràfica, però el mateix passatge d’Higí no en fixa el nom. Per això l’Atlas no presenta cap d’aquestes identificacions com l’única correcta.</p>

            <div className="myth-stories-grid">
              <article>
                <p className="section-kicker">SIRIUS, L’ESTRELLA DEL GOS</p>
                <h3>La flama a la mandíbula</h3>
                <p>Arat destaca Sirius com el punt que crema amb més força, mentre la resta d’estrelles del gos són més febles. La descripció encaixa amb l’experiència visual: una estrella extraordinàriament brillant governa una figura que cal aprendre a reconstruir amb punts més discrets.</p>
              </article>
              <article>
                <p className="section-kicker">ELS DIES CANICULARS</p>
                <h3>Una aparició d’estiu</h3>
                <p>La relació entre Sirius i la calor prové de la seva <strong>sortida heliacal</strong>: la reaparició de l’estrella a l’alba, prop del Sol, en l’estiu mediterrani antic. Aquest és l’origen cultural dels dies caniculars. No s’ha de confondre amb la millor observació vespertina de Ca Major, que a les nostres latituds arriba durant les nits d’hivern.</p>
              </article>
            </div>
            <p className="myth-conclusion">La regió és astronòmicament una constel·lació oficial; el gos, les persecucions i els presagis estacionals són lectures culturals superposades a les mateixes estrelles.</p>
          </div>
        </div>
      </section>

      <section className="wrap section route-card interactive-route-card">
        <p className="section-kicker">STAR HOPPING</p>
        <h2>D’Orió a Sirius, i de Sirius fins a M41.</h2>
        <p className="muted route-intro">Comença amb una de les rutes més clares del cel d’hivern i, després, aprèn a llegir el cos del gos.</p>
        <CanisMajorRouteExplorer />
      </section>

      <nav className="wrap constellation-pagination constellation-pagination-back" aria-label="Navegació entre constel·lacions">
        <Link href="/constellacions/orio"><strong>← Orió</strong><span>Torna al caçador</span></Link>
      </nav>

      <SourceNotes references={sources} />
    </main>
  );
}
