import Link from "next/link";
import OrionMap from "../../../components/OrionMap";
import OrionRouteExplorer from "../../../components/OrionRouteExplorer";
import SourceNotes, { type SourceReference } from "../../../components/SourceNotes";
import TonightSkyCard from "../../../components/TonightSkyCard";

const objects = [
  {
    name: "Betelgeuse",
    kind: "Supergegant vermella",
    visibility: "Ull nu",
    text: "Marca l’espatlla esquerra d’Orió. El seu to rogenc o ataronjat és un dels millors exercicis per aprendre a detectar color en una estrella.",
  },
  {
    name: "Rigel",
    kind: "Supergegant blava",
    visibility: "Ull nu",
    text: "Forma el peu dret del caçador. És molt brillant i, comparada amb Betelgeuse, tendeix a veure’s més blanca o blavosa.",
  },
  {
    name: "Cinturó d’Orió",
    kind: "Alnitak · Alnilam · Mintaka",
    visibility: "Ull nu",
    text: "Les tres estrelles del cinturó són el patró visual més útil de tota la constel·lació. Un cop les has identificat, la resta d’Orió emergeix ràpidament.",
  },
  {
    name: "M42",
    kind: "Nebulosa d’Orió",
    visibility: "Ull nu / prismàtics",
    text: "Es troba a l’espasa, sota el cinturó. En un cel fosc pot aparèixer com una petita boirina; amb prismàtics ja esdevé un objecte memorable.",
  },
];

const sources: SourceReference[] = [
  {
    title: "IAU · The Constellations",
    detail: "Definició i límits oficials de les constel·lacions",
    href: "https://iauarchive.eso.org/public/themes/constellations/",
    consultationDate: "2026-09-02",
  },
  {
    title: "SIMBAD · CDS",
    detail: "Coordenades i identificació de les estrelles de la figura",
    href: "https://simbad.cds.unistra.fr/simbad/",
    consultationDate: "2026-09-02",
  },
  {
    title: "NASA Science · Messier 42",
    detail: "Naturalesa i observació de la Nebulosa d’Orió",
    href: "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/",
    consultationDate: "2026-09-02",
  },
  {
    title: "Higí · Astronomica, 2.34",
    detail: "Variants antigues sobre Orió, Àrtemis, Apol·lo i l’escorpí",
    href: "https://topostext.org/work/207",
    consultationDate: "2026-09-02",
  },
  {
    title: "Biblioteca atribuïda a Apol·lodor, 1.4.3",
    detail: "Origen d’Orió, el do de Posidó i variants de la seva mort",
    href: "https://topostext.org/work/150",
    consultationDate: "2026-09-02",
  },
];

export default function OrionPage() {
  return (
    <main>
      <section className="page-hero wrap constellation-hero">
        <div>
          <Link href="/constellacions" className="back-link">← Constel·lacions</Link>
          <p className="eyebrow">HIVERN · NIVELL FÀCIL</p>
          <h1>Orió</h1>
          <p className="lead">
            El gran caçador és una de les millors portes d’entrada al cel d’hivern: molt reconeixible,
            ric en objectes interessants i ideal per començar a saltar cap a altres estrelles.
          </p>
        </div>
        <dl className="facts">
          <div><dt>Millor època al vespre</dt><dd>Desembre – març</dd></div>
          <div><dt>On mirar</dt><dd>Sud-est al vespre · sud més tard</dd></div>
          <div><dt>Referència</dt><dd>3 estrelles en línia</dd></div>
          <div><dt>Observació</dt><dd>Ull nu · prismàtics</dd></div>
          <div><dt>Nom oficial IAU</dt><dd>Orion</dd></div>
        </dl>
      </section>

      <div className="wrap tonight-wrap">
        <TonightSkyCard
          name="Orió"
          referenceName="Alnilam"
          coordinate={{ raHours: 5 + 36 / 60 + 12.81335 / 3600, decDeg: -(1 + 12 / 60 + 6.9089 / 3600) }}
          objectArticle="el"
          referenceDescription="La posició es calcula prenent Alnilam, al centre del cinturó, com a referència d’Orió."
        />
      </div>

      <section className="wrap section orientation-strip">
        <div className="orientation-copy">
          <p className="section-kicker">ABANS DE BUSCAR EL CINTURÓ</p>
          <h2>Cap a on has de mirar?</h2>
          <p>
            <strong>A les nits d’hivern,</strong> Orió surt per l’<strong>est-sud-est</strong> i domina el cel del
            <strong> sud</strong> més tard. Si observes a primera hora del vespre, busca’l cap al sud-est; si observes més
            tard, ja el trobaràs més alt i desplaçat cap al sud.
          </p>
          <p className="orientation-note">
            El patró que has de buscar és el mateix: <strong>tres estrelles brillants gairebé alineades</strong>. Aquestes tres
            estrelles són Alnitak, Alnilam i Mintaka, el cinturó d’Orió.
          </p>
        </div>
      </section>

      <section className="wrap constellation-layout dual-visual-layout">
        <div>
          <div className="section-heading compact-heading">
            <div>
              <p className="section-kicker">MAPA DE RECONEIXEMENT</p>
              <h2>El mapa que t’ha d’ajudar a reconèixer Orió al cel</h2>
            </div>
          </div>
          <OrionMap />
          <p className="map-note stronger-note">
            Les estrelles principals es projecten a partir de <strong>coordenades equatorials en el sistema ICRS, referides a l’època J2000.0</strong>; per tant, la forma i les proporcions del patró no es dibuixen a ull.
            Les línies són una ajuda visual i poden variar entre atles: la IAU defineix les constel·lacions com a regions del cel, no com aquests dibuixos. La figura mitològica és una capa interpretativa separada.
          </p>
        </div>
        <aside className="find-card">
          <p className="section-kicker">COM TROBAR-LA</p>
          <h2>Comença pel cinturó</h2>
          <ol>
            <li>Mira cap al <strong>sud-est</strong> si és a primera hora del vespre d’hivern; més tard, gira’t cap al <strong>sud</strong>.</li>
            <li>Busca <strong>tres estrelles brillants gairebé alineades</strong>: Alnitak, Alnilam i Mintaka.</li>
            <li>Per sobre del cinturó veuràs dues estrelles destacades: <strong>Betelgeuse</strong> a l’esquerra i <strong>Bellatrix</strong> a la dreta.</li>
            <li>Per sota hi ha els peus d’Orió: <strong>Saiph</strong> i <strong>Rigel</strong>.</li>
            <li>Sota el cinturó penja l’<strong>espasa</strong>: allà hi tens <strong>M42</strong>, la Nebulosa d’Orió.</li>
          </ol>
        </aside>
      </section>

      <section className="wrap section">
        <div className="section-heading"><div><p className="section-kicker">QUÈ ESTÀS VEIENT?</p><h2>Quatre coses que val la pena observar</h2></div></div>
        <div className="object-grid">
          {objects.map((object) => (
            <article className="object-card" key={object.name}>
              <div className="object-meta"><span>{object.kind}</span><span>{object.visibility}</span></div>
              <h3>{object.name}</h3>
              <p>{object.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section artistic-panel">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-kicker">ORIÓ IMAGINAT</p>
            <h2>Orió imaginat · El caçador entre les estrelles</h2>
          </div>
        </div>
        <figure className="art-card">
          <img src="/images/orio-mitologic.png" alt="Orió imaginat com un caçador entre les estrelles" />
        </figure>
      </section>

      <section className="myth-section">
        <div className="wrap myth-grid detailed-myth-grid">
          <div className="myth-figure" aria-hidden="true"><span>Ω</span><p>ORIÓ</p></div>
          <div>
            <p className="section-kicker">LA HISTÒRIA DEL CEL</p>
            <h2>Un gegant, un caçador i diverses morts possibles</h2>
            <p>
              En la mitologia grega, Orió és un caçador gegantí, d’una força extraordinària. En una de les tradicions antigues és fill de
              <strong> Posidó</strong> i Euríale, i rep del déu del mar un do singular: la capacitat de caminar sobre les aigües. Ja des del seu origen,
              Orió no és un humà qualsevol sinó una figura situada entre el món dels homes i el dels herois.
            </p>
            <p>
              Les fonts antigues, però, no expliquen una sola història. En algunes versions, Orió és un gran caçador que recorre boscos i illes
              perseguint feres. En altres, queda vinculat a <strong>Àrtemis</strong>, deessa de la caça, amb qui comparteix aquest univers salvatge.
              També hi ha una tradició en què el seu orgull el condemna: Orió presumeix que podrà matar totes les bèsties de la Terra,
              i aquest desafiament provoca la resposta de <strong>Gea</strong>, la deessa Terra.
            </p>
            <p>
              És aquí on entra en escena l’<strong>escorpí</strong>. Segons una de les versions més conegudes, Gea envia un escorpí gegant per castigar
              la supèrbia del caçador, i la picada acaba amb la seva vida. Una altra tradició explica que <strong>Apol·lo</strong>, contrari a la possible unió
              d’Àrtemis i Orió, enganya la deessa perquè dispara una fletxa contra una figura llunyana al mar; només després descobreix que aquella silueta era Orió.
              El mite, per tant, no és una narració única sinó un conjunt de relats emparentats.
            </p>
            <p>
              El cel conserva aquestes històries transformades en geografia nocturna. Orió i <strong>Escorpí</strong> no solen dominar la nit al mateix temps:
              quan Escorpí puja, Orió s’amaga; quan Orió és el gran protagonista de l’hivern, Escorpí queda lluny de l’escena. Els antics van llegir
              en aquest relleu celeste una persecució eterna, una manera poètica d’explicar el moviment de les constel·lacions al llarg de l’any.
            </p>
            <p>
              Encara hi ha una altra connexió important: en algunes tradicions, Orió persegueix les <strong>Plèiades</strong>, les set germanes. Això fa molt bella la ruta
              observacional del cel d’hivern: des del cinturó d’Orió pots saltar cap a <strong>Aldebaran</strong> i després cap a les <strong>Plèiades</strong>, de manera que la narració
              mítica i el recorregut visual del cel queden units.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap section route-card interactive-route-card">
        <p className="section-kicker">STAR HOPPING</p>
        <h2>Des del cinturó d’Orió pots anar a Sirius, Aldebaran i les Plèiades.</h2>
        <p className="muted route-intro">
          Prem sobre cada objecte. T’explicarem <strong>com arribar-hi</strong> i <strong>què és</strong>. Això converteix la fitxa en una petita ruta d’observació.
        </p>
        <OrionRouteExplorer />
      </section>

      <SourceNotes references={sources} />

      <nav className="wrap constellation-pagination" aria-label="Navegació entre constel·lacions">
        <Link href="/constellacions/taure"><span>Següent constel·lació</span><strong>Taure →</strong></Link>
      </nav>
    </main>
  );
}
