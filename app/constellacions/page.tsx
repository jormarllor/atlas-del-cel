import Link from "next/link";

const winterConstellations = [
  {
    name: "Orió",
    pattern: "Tres estrelles del cinturó",
    href: "/constellacions/orio",
    number: "01",
  },
  {
    name: "Taure",
    pattern: "V de les Híades",
    href: "/constellacions/taure",
    number: "02",
  },
  {
    name: "Ca Major",
    pattern: "Sirius i el traç principal del gos",
    href: "/constellacions/ca-major",
    number: "03",
  },
  {
    name: "Bessons",
    pattern: "Dos caps brillants i dos traços paral·lels",
    href: "/constellacions/bessons",
    number: "04",
  },
  {
    name: "Auriga",
    pattern: "Capella i un gran pentàgon aparent",
    href: "/constellacions/auriga",
    number: "05",
  },
];

const autumnConstellations = [
  {
    name: "Andròmeda",
    pattern: "Una cadena d’Alpheratz a Almach",
    href: "/constellacions/andromeda",
    number: "06",
  },
  {
    name: "Pegàs",
    pattern: "Gran Quadrat i prolongació cap a Enif",
    href: "/constellacions/pegas",
    number: "07",
  },
];

export default function ConstellationsPage() {
  return (
    <main>
      <section className="page-hero wrap constellations-index-hero">
        <p className="eyebrow">ATLAS DEL CEL</p>
        <h1>Constel·lacions</h1>
        <p className="lead">Aprèn a reconèixer-les, descobreix què hi ha realment en aquella regió del cel i segueix les històries que les han acompanyat durant segles.</p>
      </section>

      <section className="wrap section constellation-season">
        <div className="constellation-season-heading">
          <div><p className="section-kicker">ESTACIÓ 01</p><h2>Hivern</h2></div>
          <p>Cinc patrons fàcils per començar i unes rutes celestes que els connecten.</p>
        </div>

        <div className="constellation-index-list">
          {winterConstellations.map((constellation) => (
            <Link className="constellation-index-entry" href={constellation.href} key={constellation.name}>
              <span className="constellation-index-number">{constellation.number}</span>
              <div><h3>{constellation.name}</h3><p>Patró · {constellation.pattern}</p></div>
              <span className="constellation-index-level">Nivell fàcil</span>
              <span className="constellation-index-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>

      </section>

      <section className="wrap section constellation-season autumn-constellation-season" id="tardor">
        <div className="constellation-season-heading">
          <div><p className="section-kicker">ESTACIÓ 02</p><h2>Tardor</h2></div>
          <p>Dos grans patrons connectats per Alpheratz: una cadena cap a M31 i el Gran Quadrat.</p>
        </div>

        <div className="constellation-index-list">
          {autumnConstellations.map((constellation) => (
            <Link className="constellation-index-entry" href={constellation.href} key={constellation.name}>
              <span className="constellation-index-number">{constellation.number}</span>
              <div><h3>{constellation.name}</h3><p>Patró · {constellation.pattern}</p></div>
              <span className="constellation-index-level">Nivell fàcil</span>
              <span className="constellation-index-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>

        <div className="constellations-coming autumn-coming">
          <span>Properament</span>
          <p>Cassiopea · Perseu</p>
        </div>
      </section>

      <section className="wrap index-future-seasons" aria-label="Futurs blocs de l’Atlas">
        <span>Primavera</span><span>Estiu</span><span>Circumpolars</span>
      </section>
    </main>
  );
}
