import Link from "next/link";
import OrionMap from "../../../components/OrionMap";
import OrionRouteExplorer from "../../../components/OrionRouteExplorer";
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

export default function OrionPage() {
  return (
    <main>
      <section className="page-hero wrap constellation-hero">
        <div>
          <Link href="/" className="back-link">← Constel·lacions</Link>
          <p className="eyebrow">HIVERN · NIVELL FÀCIL</p>
          <h1>Orió</h1>
          <p className="lead">
            El gran caçador és una de les millors portes d’entrada al cel d’hivern: molt recognoscible,
            ric en objectes interessants i ideal per començar a saltar cap a altres estrelles.
          </p>
        </div>
        <dl className="facts">
          <div><dt>Millor època</dt><dd>Desembre – març</dd></div>
          <div><dt>On mirar</dt><dd>Sud-est al vespre · sud més tard</dd></div>
          <div><dt>Referència</dt><dd>3 estrelles en línia</dd></div>
          <div><dt>Observació</dt><dd>Ull nu · prismàtics</dd></div>
        </dl>
      </section>

      <div className="wrap tonight-wrap">
        <TonightSkyCard />
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
            Les estrelles principals es projecten a partir de les seves <strong>coordenades equatorials ICRS/J2000</strong>; per tant, la forma i les proporcions del patró no es dibuixen a ull.
            La figura mitològica és només una capa interpretativa i no modifica la geometria astronòmica.
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

      <section className="wrap section artistic-panel">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-kicker">DUES MANERES DE VEURE ORIÓ</p>
            <h2>El cel real i la interpretació visual</h2>
          </div>
          <p className="muted">El mapa és per orientar-te. La imatge artística és per donar cos al mite.</p>
        </div>
        <div className="art-grid">
          <figure className="art-card">
            <img src="/images/orio-mitologic.png" alt="Interpretació artística d’Orió com un caçador transparent dibuixat entre les estrelles" />
            <figcaption>
              <strong>Imatge artística:</strong> una visualització de qualitat creada per reforçar la lectura mitològica. No substitueix el mapa de reconeixement.
            </figcaption>
          </figure>
          <div className="art-text-card">
            <h3>Com ho farem a la resta de l’atles</h3>
            <p>
              Cada constel·lació tindrà <strong>dues imatges complementàries</strong>: un mapa per reconèixer-la i una imatge
              artística que tradueixi la història en una escena visual potent.
            </p>
            <ul>
              <li><strong>Mapa:</strong> perquè quan miris amunt puguis identificar les estrelles correctes.</li>
              <li><strong>Imatge artística:</strong> perquè entenguis quina figura hi imaginaven els antics.</li>
              <li><strong>Text observacional:</strong> per explicar on mirar, què veus i com saltar a altres objectes.</li>
            </ul>
          </div>
        </div>
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

      <section className="myth-section">
        <div className="wrap myth-grid detailed-myth-grid">
          <div className="myth-figure" aria-hidden="true"><span>Ω</span><p>ORION</p></div>
          <div>
            <p className="section-kicker">LA HISTÒRIA DEL CEL</p>
            <h2>Un gegant, un caçador i diverses morts possibles</h2>
            <p>
              En la mitologia grega, Orió és un caçador gegantí, d’una força extraordinària. En moltes tradicions és fill de
              <strong> Posidó</strong> i rep del déu del mar un do singular: la capacitat de caminar sobre les aigües. Ja des del seu origen,
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
              la supèrbia del caçador, i la picada acaba amb la seva vida. Una altra tradició explica que és <strong>Apol·lo</strong> qui, gelós o desconfiat,
              enganya Àrtemis perquè dispara una fletxa contra una figura llunyana al mar; només després descobreix que aquella silueta era Orió.
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
            <div className="myth-note"><strong>Idea editorial clau:</strong> a la web presentarem la mitologia amb detall i amb variants, indicant clarament quan hi ha versions diferents d’un mateix relat.</div>
          </div>
        </div>
      </section>

      <section className="wrap section route-card interactive-route-card">
        <p className="section-kicker">STAR HOPPING</p>
        <h2>Des del cinturó d’Orió pots anar a Sirius, Aldebaran i les Plèiades. Ara sí: clicables.</h2>
        <p className="muted route-intro">
          Prem sobre cada objecte. T’explicarem <strong>com arribar-hi</strong> i <strong>què és</strong>. Això converteix la fitxa en una petita ruta d’observació.
        </p>
        <OrionRouteExplorer />
      </section>
    </main>
  );
}
