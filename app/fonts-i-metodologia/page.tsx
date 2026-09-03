import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fonts i metodologia · Atlas del Cel",
  description: "Com es construeixen els mapes, els càlculs d’observació i els relats mitològics de l’Atlas del Cel.",
};

const astronomySources = [
  {
    name: "Unió Astronòmica Internacional · IAU",
    href: "https://iauarchive.eso.org/public/themes/constellations/",
    detail: "Noms, límits i definició oficial de les 88 constel·lacions.",
  },
  {
    name: "SIMBAD Astronomical Database · CDS",
    href: "https://simbad.cds.unistra.fr/simbad/",
    detail: "Coordenades, identificadors i dades de referència dels objectes astronòmics.",
  },
  {
    name: "NASA Science · Messier 42",
    href: "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-42/",
    detail: "Context físic i observacional de la Nebulosa d’Orió.",
  },
  {
    name: "NASA Science · Messier 1",
    href: "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/",
    detail: "Context físic i observacional de la Nebulosa del Cranc.",
  },
  {
    name: "NASA Science · Sirius",
    href: "https://science.nasa.gov/asset/hubble/the-dog-star-sirius-and-its-tiny-companion/",
    detail: "Naturalesa binària de Sirius i identificació de Sirius B com a nana blanca.",
  },
  {
    name: "NASA Science · Gemini Constellation",
    href: "https://science.nasa.gov/solar-system/skywatching/night-sky-network/gemini-constellation/",
    detail: "Ruta des d’Orió, naturalesa de Càstor i Pòl·lux i observació del cúmul M35.",
  },
  {
    name: "Torres et al. · The Astrophysical Journal 807, 26",
    href: "https://arxiv.org/abs/1505.07461",
    detail: "Arquitectura física, òrbites i distància del sistema múltiple Capella.",
  },
  {
    name: "NASA Science · Messier 31",
    href: "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-31/",
    detail: "Distància, escala i observació visual de la galàxia d’Andròmeda.",
  },
  {
    name: "NASA Science · Messier 15",
    href: "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-15/",
    detail: "Naturalesa, antiguitat i observació del cúmul globular M15.",
  },
  {
    name: "U.S. Naval Observatory · ICRS",
    href: "https://aa.usno.navy.mil/faq/ICRS_doc",
    detail: "Definició del sistema ICRS i relació amb l’equador i l’equinocci de J2000.0.",
  },
];

const classicalSources = [
  {
    constellation: "Orió",
    sources: [
      { name: "Higí · Astronomica, 2.34", href: "https://topostext.org/work/207" },
      { name: "Biblioteca atribuïda a Apol·lodor, 1.4.3", href: "https://topostext.org/work/150" },
    ],
  },
  {
    constellation: "Taure",
    sources: [
      { name: "Higí · Astronomica, 2.21", href: "https://topostext.org/work/207" },
      { name: "Biblioteca atribuïda a Apol·lodor, 3.1", href: "https://topostext.org/work/150" },
      { name: "Ovidi · Metamorfosis, 2.833–875", href: "https://topostext.org/work/141" },
    ],
  },
  {
    constellation: "Ca Major",
    sources: [
      { name: "Arat · Fenòmens, 319–352", href: "https://topostext.org/work/551" },
      { name: "Higí · Astronomica, 2.35", href: "https://topostext.org/work/207" },
    ],
  },
  {
    constellation: "Bessons",
    sources: [
      { name: "Píndar · Nemea 10, 55–90", href: "https://topostext.org/work/20" },
      { name: "Higí · Astronomica, 2.22", href: "https://topostext.org/work/207" },
      { name: "Himne homèric als Dioscurs", href: "https://topostext.org/work/370" },
      { name: "Apol·loni de Rodes · Argonàutiques, 1.146–150", href: "https://topostext.org/work/126" },
    ],
  },
  {
    constellation: "Auriga",
    sources: [
      { name: "Arat · Fenòmens, 156–166 i 880–891", href: "https://topostext.org/work/551" },
      { name: "Higí · Astronomica, 2.13", href: "https://topostext.org/work/207" },
    ],
  },
  {
    constellation: "Andròmeda",
    sources: [
      { name: "Biblioteca atribuïda a Apol·lodor, 2.4.3", href: "https://www.theoi.com/Text/Apollodorus2.html" },
      { name: "Higí · Fabulae, 64", href: "https://topostext.org/work/206" },
      { name: "Higí · Astronomica, 2.11", href: "https://topostext.org/work/207" },
      { name: "Ovidi · Metamorfosis, 4.663–739", href: "https://www.theoi.com/Text/OvidMetamorphoses4.html" },
      { name: "Arat · Fenòmens, 198–204", href: "https://topostext.org/work/551" },
    ],
  },
  {
    constellation: "Pegàs",
    sources: [
      { name: "Hesíode · Teogonia, 270–286", href: "https://www.theoi.com/Text/HesiodTheogony.html" },
      { name: "Píndar · Olímpica 13, 63–95", href: "https://topostext.org/work/18" },
      { name: "Biblioteca atribuïda a Apol·lodor, 2.3.2", href: "https://topostext.org/work/150" },
      { name: "Higí · Astronomica, 2.18", href: "https://topostext.org/work/207" },
    ],
  },
];

export default function SourcesAndMethodologyPage() {
  return (
    <main>
      <header className="page-hero wrap methodology-hero">
        <p className="eyebrow">COM ES CONSTRUEIX L’ATLAS</p>
        <h1>Fonts i metodologia</h1>
        <p className="lead">
          L’Atlas combina tres lectures diferents del cel: posicions astronòmiques, ajudes visuals per reconèixer patrons i relats culturals. Aquí expliquem d’on surt cada capa, com fem els càlculs i fins on arriben.
        </p>
      </header>

      <section className="wrap methodology-list" aria-label="Criteris de l’Atlas">
        <article className="methodology-entry">
          <span className="methodology-number">01</span>
          <div>
            <p className="section-kicker">COORDENADES CELESTES</p>
            <h2>Una posició real abans que un dibuix</h2>
            <p>
              Els mapes parteixen de l’<strong>ascensió recta</strong> i la <strong>declinació</strong>, dues coordenades que permeten situar un objecte sobre l’esfera celeste d’una manera semblant a com la longitud i la latitud situen un punt a la Terra. La projecció transforma aquestes coordenades en posicions dins del mapa; no movem les estrelles perquè una figura quedi més bonica.
            </p>
            <p>
              <strong>ICRS</strong> és el sistema internacional de referència celeste que orienta els eixos. <strong>J2000.0</strong> és una època de referència temporal. Són conceptes relacionats, però no idèntics: quan l’Atlas indica «ICRS · època J2000.0», descriu el sistema de coordenades i l’època a la qual es refereixen les posicions emprades.
            </p>
            <p>
              Les dades es contrasten principalment amb <strong>SIMBAD/CDS</strong>, la <strong>IAU</strong> i la <strong>NASA</strong>. L’estructura està preparada per incorporar, quan calgui, catàlegs i nomenclatures com Gaia, Hipparcos, Messier o NGC sense barrejar-ne la funció.
            </p>
          </div>
        </article>

        <article className="methodology-entry">
          <span className="methodology-number">02</span>
          <div>
            <p className="section-kicker">TRES CAPES, TRES FUNCIONS</p>
            <h2>Regió oficial, traç pedagògic i figura imaginada</h2>
            <p>
              La IAU reconeix <strong>88 constel·lacions</strong> que cobreixen tot el cel i en defineix oficialment els límits. En astronomia, dir que un objecte és «a Orió», «a Taure», «a Ca Major», «a Bessons», «a Auriga», «a Andròmeda» o «a Pegàs» significa que queda dins d’una d’aquestes regions, no que pertanyi a un dibuix d’estrelles.
            </p>
            <p>
              Les línies que uneixen estrelles als mapes són una <strong>ajuda visual</strong>. No hi ha una figura de línies oficial de la IAU i el traç pot variar entre atles. Les il·lustracions «imaginades» constitueixen encara una tercera capa: són interpretacions artístiques i mitològiques, separades del mapa científic.
            </p>
            <p>
              Un patró pedagògic pot travessar una frontera oficial. El pentàgon aparent que ajuda a reconèixer <strong>Auriga</strong>, per exemple, sovint es completa amb <strong>Elnath</strong>; l’estrella és una fita visual útil, però pertany oficialment a <strong>Taure</strong>. L’Atlas ho indica en lloc de convertir el dibuix orientatiu en una adscripció astronòmica falsa.
            </p>
            <p>
              El cas d’<strong>Alpheratz</strong> mostra la situació complementària: és <strong>α Andromedae</strong>, però completa visualment un vèrtex del Gran Quadrat de Pegàs. El patró pot connectar dues regions; la pertinença oficial de l’estrella continua sent inequívoca.
            </p>
          </div>
        </article>

        <article className="methodology-entry">
          <span className="methodology-number">03</span>
          <div>
            <p className="section-kicker">AQUESTA NIT</p>
            <h2>De les coordenades celestes al teu horitzó</h2>
            <p>
              La targeta d’observació combina la <strong>data i l’hora</strong>, la <strong>latitud i la longitud</strong> desades al navegador i una estrella de referència de cada constel·lació. Amb el temps sideral local converteix l’ascensió recta i la declinació en <strong>altura</strong> sobre l’horitzó i <strong>azimut</strong>, és a dir, la direcció cap on cal mirar.
            </p>
            <div className="methodology-pair">
              <p><strong>Orió</strong><span>Alnilam, al centre del cinturó</span></p>
              <p><strong>Taure</strong><span>Aldebaran, l’ull visual del toro</span></p>
              <p><strong>Ca Major</strong><span>Sirius, l’estrella més brillant del cel nocturn</span></p>
              <p><strong>Bessons</strong><span>Pòl·lux, l’estrella més brillant de la constel·lació</span></p>
              <p><strong>Auriga</strong><span>Capella, l’estrella més brillant de la constel·lació</span></p>
              <p><strong>Andròmeda</strong><span>Mirach, al centre de la cadena i al camí de M31</span></p>
              <p><strong>Pegàs</strong><span>Markab, vèrtex del Gran Quadrat i inici de la branca cap a Enif</span></p>
            </div>
            <p>
              Per proposar una bona oportunitat, l’Atlas demana que la referència superi aproximadament els <strong>12° d’altura</strong> i que el Sol sigui a <strong>−12° o menys</strong>, el límit aproximat del final del crepuscle nàutic. La cerca avança en passos de trenta minuts i pot arribar fins a uns 180 dies, de manera que també cobreix constel·lacions fora de temporada.
            </p>
          </div>
        </article>

        <article className="methodology-entry">
          <span className="methodology-number">04</span>
          <div>
            <p className="section-kicker">LÍMITS DEL CÀLCUL</p>
            <h2>Una orientació visual, no una efemèride de precisió</h2>
            <p>
              El resultat indica si la regió es troba prou alta i amb el Sol prou baix per començar a observar. No incorpora núvols, transparència atmosfèrica, contaminació lumínica, fase i posició de la Lluna, relleu, edificis ni arbres. Una «bona oportunitat» és, per tant, una finestra geomètrica aproximada, no una previsió meteorològica ni una garantia de visibilitat.
            </p>
            <p>
              Els algoritmes i les coordenades tenen prou precisió per al <strong>reconeixement visual</strong> i l’orientació a ull nu. No substitueixen programari d’astrometria de precisió, efemèrides professionals ni instruments de navegació.
            </p>
          </div>
        </article>

        <article className="methodology-entry">
          <span className="methodology-number">05</span>
          <div>
            <p className="section-kicker">PROFUNDITAT I PERSPECTIVA</p>
            <h2>Compartir cel no vol dir compartir espai</h2>
            <p>
              Una constel·lació és una projecció vista des de la Terra, no necessàriament una família física d’estrelles. Objectes que semblen veïns poden trobar-se a distàncies molt diferents. <strong>Aldebaran</strong>, per exemple, apareix visualment dins de la V de les <strong>Híades</strong>, però no pertany al cúmul: és molt més propera i només coincideix amb ell en la nostra línia de visió.
            </p>
            <p>
              El mateix passa amb <strong>Càstor i Pòl·lux</strong>: semblen una parella al cel i donen nom als Bessons, però són a distàncies diferents i no formen cap sistema físic entre ells. La semblança del dibuix bidimensional no descriu automàticament el cel en tres dimensions.
            </p>
          </div>
        </article>

        <article className="methodology-entry">
          <span className="methodology-number">06</span>
          <div>
            <p className="section-kicker">MITOLOGIA</p>
            <h2>Relats transmesos, no un cànon únic</h2>
            <p>
              Els mites antics arriben en versions diferents, de moments i autors diferents. L’Atlas no intenta reconstruir una narració moderna única: identifica les variants, evita presentar-ne una com a universal i separa els relats que només comparteixen una regió del cel.
            </p>
            <p>
              Per a les tradicions grecollatines prioritzem els testimonis antics que tracten directament les figures celestes —com els <em>Fenòmens</em> d’Arat, els <em>Catasterismes</em> atribuïts a Eratòstenes i l’<em>Astronomica</em> d’Higí— i hi afegim Homer, Hesíode, la <em>Biblioteca</em> atribuïda a Apol·lodor o Ovidi només quan són realment pertinents. Les edicions acadèmiques i repositoris de textos com Perseus orienten la lectura; agregadors com Theoi serveixen com a localitzadors, no com a autoritat única.
            </p>
          </div>
        </article>
      </section>

      <section className="methodology-current-sources">
        <div className="wrap">
          <div className="section-heading methodology-source-heading">
            <div>
              <p className="section-kicker">REFERÈNCIES VIVES</p>
              <h2>Fonts utilitzades actualment</h2>
            </div>
            <p className="muted">Aquesta llista creixerà amb l’Atlas i distingirà sempre entre dades astronòmiques i tradicions textuals.</p>
          </div>

          <div className="methodology-source-group">
            <h3>Astronomia</h3>
            <ul className="methodology-source-list">
              {astronomySources.map((source) => (
                <li key={source.name}>
                  <a href={source.href} target="_blank" rel="noreferrer"><strong>{source.name}</strong><span>{source.detail}</span></a>
                </li>
              ))}
            </ul>
          </div>

          <div className="methodology-source-group">
            <h3>Fonts clàssiques per fitxa</h3>
            <div className="classical-source-columns">
              {classicalSources.map((group) => (
                <div key={group.constellation}>
                  <h4>{group.constellation}</h4>
                  <ul>
                    {group.sources.map((source) => (
                      <li key={source.name}><a href={source.href} target="_blank" rel="noreferrer">{source.name} ↗</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
