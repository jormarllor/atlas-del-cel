import Link from "next/link";

const seasons = [
  { name: "Hivern", hint: "Orió, Taure, Bessons", className: "winter", availableHref: "/constellacions" },
  { name: "Primavera", hint: "Lleó, Verge, Bover", className: "spring" },
  { name: "Estiu", hint: "Cigne, Lira, Àguila", className: "summer" },
  { name: "Tardor", hint: "Pegàs, Andròmeda, Perseu", className: "autumn" },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-stars" aria-hidden="true" />
        <div className="hero-content wrap">
          <p className="eyebrow">GUIA D’OBSERVACIÓ · MEDITERRANI</p>
          <h1>Aprèn a mirar el cel.<br />Després, deixa que t’expliqui històries.</h1>
          <p className="hero-copy">
            Una guia visual per orientar-te sota les estrelles, reconèixer constel·lacions,
            descobrir què hi ha de debò allà dalt i entendre els mites que les han acompanyat durant segles.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/com-llegir-el-cel">1. Com llegir el cel</Link>
            <Link className="button ghost" href="/constellacions">Explora constel·lacions</Link>
          </div>
          <p className="hero-available-links"><span>Disponibles ara</span><Link href="/constellacions/orio">Orió</Link><i>·</i><Link href="/constellacions/taure">Taure</Link></p>
        </div>
      </section>

      <section className="wrap section intro-grid">
        <div>
          <p className="section-kicker">ABANS DE BUSCAR CONSTEL·LACIONS</p>
          <h2>Primer, aprèn quatre idees que canvien completament la manera de mirar amunt.</h2>
        </div>
        <div className="intro-points">
          <span>01 · Orienta’t</span>
          <span>02 · Entén el moviment del cel</span>
          <span>03 · Aprèn a llegir brillantors i distàncies</span>
          <span>04 · Troba patrons, direccions i salts entre estrelles</span>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">EL CEL DURANT L’ANY</p>
            <h2>Explora per estacions</h2>
          </div>
          <p className="muted">Una selecció pensada per a latituds de Catalunya i la Mediterrània occidental.</p>
        </div>
        <div className="season-grid">
          {seasons.map((season) => (
            <article className={`season-card ${season.className}`} key={season.name}>
              <div className="season-sky" aria-hidden="true">✦ · · ✧ · ✦ · · ✧</div>
              <h3>{season.name}</h3>
              <p>{season.hint}</p>
              {season.availableHref
                ? <Link className="coming season-link" href={season.availableHref}>2 fitxes disponibles →</Link>
                : <span className="coming">Properament</span>}
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section winter-available">
        <div className="section-heading winter-available-heading">
          <div><p className="section-kicker">JA POTS COMENÇAR</p><h2>Dues portes d’entrada al cel d’hivern</h2></div>
          <Link className="text-link" href="/constellacions">Índex de constel·lacions →</Link>
        </div>
        <div className="winter-available-list">
          <Link href="/constellacions/orio" className="winter-available-entry">
            <span>01</span><div><h3>Orió</h3><p>Tres estrelles alineades et porten al cinturó.</p></div><b>Explora Orió →</b>
          </Link>
          <Link href="/constellacions/taure" className="winter-available-entry">
            <span>02</span><div><h3>Taure</h3><p>Una V d’estrelles amb Aldebaran com a ull taronja.</p></div><b>Explora Taure →</b>
          </Link>
        </div>
      </section>
    </main>
  );
}
