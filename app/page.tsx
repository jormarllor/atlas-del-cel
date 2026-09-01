import Link from "next/link";

const seasons = [
  { name: "Hivern", hint: "Orió, Taure, Bessons", className: "winter" },
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
            <Link className="button ghost" href="/constellacions/orio">Explora Orió</Link>
          </div>
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
              <span className="coming">Properament</span>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section feature-callout">
        <div>
          <p className="section-kicker">PRIMERA CONSTEL·LACIÓ</p>
          <h2>Orió: el gran punt de partida del cel d’hivern</h2>
          <p>
            Tres estrelles alineades et porten al cinturó. Des d’allà pots trobar Sirius, Aldebaran i les Plèiades amb una ruta interactiva.
          </p>
          <Link className="text-link" href="/constellacions/orio">Obre la fitxa interactiva d’Orió →</Link>
        </div>
        <div className="mini-orion" aria-hidden="true">
          <span className="s s1" /><span className="s s2" /><span className="s s3" />
          <span className="s s4" /><span className="s s5" /><span className="s s6" />
          <span className="s s7" />
          <i className="l l1" /><i className="l l2" /><i className="l l3" /><i className="l l4" /><i className="l l5" />
        </div>
      </section>
    </main>
  );
}
