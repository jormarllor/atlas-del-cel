import Link from "next/link";
import AurigaArt from "../../../components/AurigaArt";
import AurigaMap from "../../../components/AurigaMap";
import AurigaRouteExplorer from "../../../components/AurigaRouteExplorer";
import SourceNotes, { type SourceReference } from "../../../components/SourceNotes";
import TonightSkyCard from "../../../components/TonightSkyCard";

const objects = [
  {
    name: "Capella",
    kind: "Sistema estel·lar múltiple",
    visibility: "Ull nu",
    text: "El punt daurat que domina Auriga és un sistema de quatre estrelles: dues gegants grogues formen la parella interior i, molt més lluny d’elles, dues nanes vermelles constitueixen una segona parella vinculada al mateix sistema. A simple vista, tota aquesta arquitectura es fon en una sola llum.",
  },
  {
    name: "M36",
    kind: "Cúmul obert",
    visibility: "Prismàtics · telescopi petit",
    text: "És el més compacte i aparentment jove dels tres cúmuls Messier d’Auriga. Amb pocs augments destaquen diverses estrelles brillants i una estructura oberta, més angulosa que la dels seus veïns.",
  },
  {
    name: "M37",
    kind: "Cúmul obert",
    visibility: "Prismàtics · telescopi petit",
    text: "És el més ric i dens del trio. Els prismàtics el mostren com una boirina granulada; un telescopi petit hi resol una multitud de punts fins i pot fer visible una estrella de tonalitat càlida prop del centre.",
  },
  {
    name: "M38",
    kind: "Cúmul obert",
    visibility: "Prismàtics · telescopi petit",
    text: "És més ample i irregular. Les seves estrelles dibuixen agrupacions i buits que alguns observadors descriuen com una creu o una forma de mar de fons: una textura clarament diferent de M36 i M37.",
  },
];

const sources: SourceReference[] = [
  {
    title: "IAU · The Constellations",
    detail: "Nom oficial Auriga i marc de les constel·lacions com a regions delimitades del cel",
    href: "https://iauarchive.eso.org/public/themes/constellations/",
    consultationDate: "2026-09-03",
  },
  {
    title: "SIMBAD · CDS",
    detail: "Coordenades ICRS de Capella, Menkalinan, Mahasim, Almaaz, Hassaleh, Elnath, M36, M37 i M38; classificacions dels objectes",
    href: "https://simbad.cds.unistra.fr/simbad/",
    consultationDate: "2026-09-03",
  },
  {
    title: "Torres et al. · The Astrophysical Journal 807, 26",
    detail: "Òrbites, components, distància i arquitectura física del sistema múltiple Capella",
    href: "https://arxiv.org/abs/1505.07461",
    consultationDate: "2026-09-03",
  },
  {
    title: "Jodrell Bank Centre for Astrophysics · Auriga",
    detail: "Ruta observacional i diferències visuals entre els cúmuls oberts M36, M37 i M38",
    href: "https://www.jb.man.ac.uk/astronomy/nightsky/AList/Auriga.html",
    consultationDate: "2026-09-03",
  },
  {
    title: "Arat · Fenòmens, 156–166 i 880–891",
    detail: "La Cabra a l’espatlla de l’Auriga, els Cabrits al canell i el seu valor com a senyal de temps tempestuós",
    href: "https://topostext.org/work/551",
    consultationDate: "2026-09-03",
  },
  {
    title: "Higí · Astronomica, 2.13",
    detail: "Erictoni i el carro; variants d’Orsíloco i Mírtil; tradicions divergents sobre Amaltea, la Cabra i els Cabrits",
    href: "https://topostext.org/work/207",
    consultationDate: "2026-09-03",
  },
];

export default function AurigaPage() {
  return (
    <main>
      <section className="page-hero wrap constellation-hero auriga-hero">
        <div>
          <Link href="/constellacions" className="back-link">← Constel·lacions</Link>
          <p className="eyebrow">HIVERN I INICI DE PRIMAVERA · NIVELL FÀCIL</p>
          <h1>Auriga</h1>
          <p className="lead">Capella i el gran polígon del cel d’hivern.</p>
        </div>
        <dl className="facts">
          <div><dt>Millor època al vespre</dt><dd>Novembre – abril</dd></div>
          <div><dt>Patró</dt><dd>Un pentàgon aparent amb Capella al nord</dd></div>
          <div><dt>Estrella de referència</dt><dd>Capella</dd></div>
          <div><dt>Observació</dt><dd>Ull nu · prismàtics · telescopi petit</dd></div>
          <div><dt>Nom oficial IAU</dt><dd>Auriga</dd></div>
        </dl>
      </section>

      <div className="wrap tonight-wrap">
        <TonightSkyCard
          name="Auriga"
          referenceName="Capella"
          coordinate={{ raHours: 5 + 16 / 60 + 41.35871 / 3600, decDeg: 45 + 59 / 60 + 52.7693 / 3600 }}
          objectArticle="la"
          referenceDescription="La posició es calcula prenent Capella, l’estrella més brillant d’Auriga, com a referència de la constel·lació."
        />
      </div>

      <section className="wrap section auriga-recognition">
        <div className="auriga-polygon-mark" aria-hidden="true">
          <span className="auriga-mark-capella" /><span className="auriga-mark-menkalinan" /><span className="auriga-mark-mahasim" /><span className="auriga-mark-elnath" /><span className="auriga-mark-hassaleh" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="48,15 20,23 22,60 52,85 78,64 48,15" /></svg>
          <b>CAPELLA · POLÍGON · CÚMULS</b>
        </div>
        <div>
          <p className="section-kicker">COM TROBAR-LA</p>
          <h2>De la banya de Taure al gran pentàgon.</h2>
          <p>Si ja reconeixes Taure, segueix-ne la banya fins a <strong>Elnath</strong>. Des d’aquest punt pots començar a tancar un gran polígon amb <strong>Hassaleh, Capella, Menkalinan i Mahasim</strong>. Capella, molt brillant i de tonalitat càlida, és la fita que confirma que has arribat a Auriga.</p>
          <p className="science-separation"><strong>Un patró que travessa una frontera:</strong> Elnath pertany oficialment a <strong>Taure</strong>, no a Auriga. Completa visualment el pentàgon pedagògic, però els límits moderns de la IAU i els dibuixos que fem per orientar-nos no són la mateixa cosa.</p>
        </div>
      </section>

      <section className="wrap constellation-layout dual-visual-layout">
        <div>
          <div className="section-heading compact-heading"><div><p className="section-kicker">MAPA DE RECONEIXEMENT</p><h2>Capella, el polígon i tres illes d’estrelles</h2></div></div>
          <AurigaMap />
          <p className="map-note stronger-note">Les estrelles i els cúmuls es projecten a partir de <strong>coordenades equatorials ICRS referides a J2000.0</strong>. Elnath es mostra com a estrella veïna de Taure perquè participa en el patró visual. Les línies són una ajuda que pot variar entre atles: la IAU defineix regions del cel, no aquests dibuixos. La figura mitològica és una capa interpretativa separada.</p>
        </div>
        <aside className="find-card">
          <p className="section-kicker">LLEGEIX EL PATRÓ</p>
          <h2>Un contorn i una franja interior</h2>
          <ol>
            <li>Comença per <strong>Capella</strong>, el punt més brillant i septentrional.</li>
            <li>Tanca el contorn per <strong>Menkalinan, Mahasim, Elnath i Hassaleh</strong>.</li>
            <li>Recorda que <strong>Elnath és de Taure</strong>: aquí actua només com a pont visual.</li>
            <li>Amb prismàtics, recorre l’interior del polígon per trobar <strong>M38, M36 i M37</strong>.</li>
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

      <section className="wrap section artistic-panel auriga-artistic-panel">
        <div className="section-heading compact-heading">
          <div><p className="section-kicker">AURIGA IMAGINAT</p><h2>El cotxer i la cabra celeste</h2></div>
        </div>
        <AurigaArt />
      </section>

      <section className="myth-section auriga-myth-section">
        <div className="wrap auriga-myth-layout">
          <div className="myth-figure auriga-myth-figure" aria-hidden="true"><span>✦</span><p>AURIGA</p></div>
          <div>
            <p className="section-kicker">UN NOM, DIVERSES TRADICIONS</p>
            <h2>El conductor, la Cabra i els Cabrits no formen un únic relat</h2>
            <p>El nom llatí <strong>Auriga</strong> significa conductor de carro; en català, la figura també s’ha anomenat tradicionalment <strong>el Cotxer</strong>. Però les fonts antigues no ofereixen una identitat única per a l’home ni una sola genealogia per a la cabra. El que avui és una regió oficial del cel conserva històries que es van acostar sobre les mateixes estrelles sense néixer necessàriament com un conte únic.</p>

            <div className="myth-stories-grid auriga-myth-stories">
              <article>
                <p className="section-kicker">ERICTONI I EL CARRO</p>
                <h3>La versió que destaca Higí</h3>
                <p><strong>Higí</strong>, remetent a Eratòstenes, identifica l’Auriga amb <strong>Erictoni</strong>, heroi atenès nascut de la terra i criat sota la protecció d’<strong>Atena</strong>. En aquesta versió, Erictoni és el primer a junyir quatre cavalls a un carro i impressiona Zeus per la seva habilitat; el catasterisme premia aquesta invenció i el seu vincle amb la deessa. És una tradició important, no una equivalència universal.</p>
              </article>
              <article>
                <p className="section-kicker">CAPELLA I LA CRIANÇA DE ZEUS</p>
                <h3>La cabra no sempre es diu Amaltea</h3>
                <p><strong>Arat</strong> situa una Cabra sagrada a l’espatlla esquerra de l’Auriga i diu que va alletar Zeus, però no l’anomena Amaltea. Higí conserva dues lectures diferents: en una, <strong>Amaltea és la cabra</strong>; en una altra atribuïda a Museu, <strong>Amaltea és una nimfa</strong> que posseeix la cabra que alimenta el déu. L’Atlas manté separades aquestes dues versions.</p>
              </article>
              <article>
                <p className="section-kicker">HAEDI · ELS CABRITS</p>
                <h3>Dues llums petites amb fama de tempesta</h3>
                <p>Arat col·loca els <strong>Cabrits</strong> al canell de l’Auriga, prop de la Cabra, i els associa a senyals de mar i de temps tempestuós. Higí recull una tradició en què són les cries bessones de la cabra d’Amaltea i comparteixen el catasterisme. La proximitat al cel va afavorir el conjunt iconogràfic, però la transmissió textual no és uniforme.</p>
              </article>
              <article>
                <p className="section-kicker">ALTRES AURIGUES</p>
                <h3>Orsíloco i Mírtil</h3>
                <p>El mateix Higí registra identificacions alternatives. Una atribueix la figura a <strong>Orsíloco</strong>, un altre inventor del carro de quatre cavalls; una altra la relaciona amb <strong>Mírtil</strong>, auriga d’Enòmau, situat al cel pel seu pare Mercuri. Aquestes variants mostren que la silueta del conductor podia acollir memòries diferents.</p>
              </article>
            </div>
            <p className="myth-conclusion">El polígon ajuda a reconèixer Auriga; la figura humana, la Cabra i els Cabrits expliquen com aquell tros de cel va ser llegit. La geometria és compartida, però les històries no s’han de fondre en una falsa biografia única.</p>
          </div>
        </div>
      </section>

      <section className="wrap section route-card interactive-route-card">
        <p className="section-kicker">STAR HOPPING</p>
        <h2>De Taure fins a Capella, i de Capella als tres cúmuls.</h2>
        <p className="muted route-intro">La primera ruta aprofita Elnath com a pont visual; la segona recorre tres cúmuls oberts que val la pena comparar.</p>
        <AurigaRouteExplorer />
      </section>

      <SourceNotes references={sources} />

      <nav className="wrap constellation-pagination constellation-pagination-back" aria-label="Navegació entre constel·lacions">
        <Link href="/constellacions/bessons"><strong>← Bessons</strong><span>Torna als dos germans</span></Link>
      </nav>
    </main>
  );
}
