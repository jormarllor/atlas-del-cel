import Link from "next/link";

const lessons = [
  {
    n: "01",
    title: "Troba els punts cardinals",
    body: "El primer pas no és memoritzar constel·lacions: és saber on tens nord, sud, est i oest. El Sol surt aproximadament per l’est i es pon aproximadament per l’oest; de nit, l’Estrella Polar és la gran referència del nord.",
    tip: "Comença sempre mirant cap al nord i situa després la resta del cel al teu voltant.",
  },
  {
    n: "02",
    title: "El cel sembla girar",
    body: "La Terra gira d’oest a est i per això les estrelles semblen desplaçar-se en sentit contrari. Al llarg de la nit, el cel canvia; al llarg de l’any, també canvien les constel·lacions que tenim disponibles a primera hora.",
    tip: "Una constel·lació no ocupa exactament el mateix lloc a les 21 h que a mitjanit.",
  },
  {
    n: "03",
    title: "Brillant no vol dir proper",
    body: "La magnitud aparent descriu com de brillant veiem un astre des de la Terra. L’escala va al revés: una magnitud 1 és més brillant que una magnitud 3. La brillantor depèn tant de la lluminositat real com de la distància.",
    tip: "No interpretis el dibuix d’una constel·lació com si les seves estrelles fossin físicament veïnes.",
  },
  {
    n: "04",
    title: "Busca formes, no dibuixos perfectes",
    body: "Les constel·lacions funcionen millor si reconeixes patrons simples: una W, un triangle, un quadrat o tres punts en línia. Les il·lustracions mitològiques venen després.",
    tip: "Orió és ideal per començar perquè el seu cinturó és un patró molt distintiu.",
  },
  {
    n: "05",
    title: "Aprèn a fer star hopping",
    body: "Un cop trobes un patró fàcil, l’utilitzes com a trampolí cap a altres estrelles. El cinturó d’Orió apunta aproximadament cap a Sirius en una direcció i cap a Aldebaran en l’altra.",
    tip: "L’atles et donarà petites rutes per passar d’una estrella coneguda a una altra.",
  },
  {
    n: "06",
    title: "Deixa que els ulls s’adaptin",
    body: "La visió nocturna millora molt després d’uns minuts sense llum intensa. Una pantalla blanca pot fer-te perdre bona part d’aquesta adaptació.",
    tip: "Fes servir poca brillantor i, quan sigui possible, llum vermella suau.",
  },
  {
    n: "07",
    title: "Direcció i hora importen",
    body: "Dir ‘busca Orió’ no és suficient: cal dir també cap a on mirar i en quin moment. Una mateixa constel·lació pot aparèixer baixa cap al sud-est al començar la nit i més alta cap al sud unes hores després.",
    tip: "Quan l’atles et digui ‘mira cap al sud-est’, interpreta-ho sempre en relació amb l’hora d’observació.",
  },
];

export default function ReadSkyPage() {
  return (
    <main>
      <section className="page-hero wrap">
        <p className="eyebrow">CAPÍTOL 1</p>
        <h1>Com llegir el cel</h1>
        <p className="lead">
          No cal conèixer centenars d’estrelles. Amb orientació, patrons i unes poques referències,
          el cel deixa de semblar un conjunt de punts aleatoris.
        </p>
      </section>

      <section className="wrap lesson-list">
        {lessons.map((lesson) => (
          <article className="lesson" key={lesson.n}>
            <div className="lesson-number">{lesson.n}</div>
            <div>
              <h2>{lesson.title}</h2>
              <p>{lesson.body}</p>
              <p className="observation-tip"><strong>Quan siguis fora:</strong> {lesson.tip}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="wrap section compass-section">
        <div className="compass" aria-label="Esquema dels punts cardinals">
          <span className="north">N</span><span className="east">E</span><span className="south">S</span><span className="west">O</span>
          <div className="compass-ring" />
          <div className="compass-needle" />
        </div>
        <div>
          <p className="section-kicker">EXERCICI 01</p>
          <h2>La primera nit, no busquis cap constel·lació.</h2>
          <p>
            Situa el nord, observa per on es mou el cel durant una estona i identifica quines zones tenen més contaminació lumínica.
            La segona nit ja tindràs un mapa mental del teu horitzó.
          </p>
        </div>
      </section>

      <section className="wrap section next-chapter">
        <p className="section-kicker">ARA SÍ</p>
        <h2>Ja podem trobar la primera gran figura del cel.</h2>
        <Link className="button primary" href="/constellacions/orio">2. Troba Orió</Link>
      </section>
    </main>
  );
}
