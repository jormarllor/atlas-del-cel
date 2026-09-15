import { CARRO_LINES, URSA_MAJOR_STARS, projectUrsaMajor } from "./ursaMajorData";

// Similarity transform in the image's native pixel plane, not in stretched percentages.
// a = scale*cos(rotation), b = scale*sin(rotation); all stars use this one matrix.
const ART_TRANSFORM = { a: 18, b: -3.5, x: 930, y: 400 };
const placed = URSA_MAJOR_STARS.filter(point => point.group !== "companion").map(point => {
  const p = projectUrsaMajor(point);
  return { ...point, x: ART_TRANSFORM.a * p.x - ART_TRANSFORM.b * p.y + ART_TRANSFORM.x, y: ART_TRANSFORM.b * p.x + ART_TRANSFORM.a * p.y + ART_TRANSFORM.y };
});
const byId = Object.fromEntries(placed.map(point => [point.id, point]));

export default function UrsaMajorArt() {
  return (
    <figure className="art-card ursa-art-card">
      <img src="/images/ossa-major-mitologica.webp" width="1672" height="941" alt="Una gran óssa celeste blava i translúcida, amb les estrelles integrades al cos i una cua allargada suggerida al firmament" />
      <svg className="ursa-art-overlay" viewBox="0 0 1672 941" aria-hidden="true">
        <g className="ursa-art-carro">{CARRO_LINES.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}</g>
        {placed.map(point => <circle key={point.id} className={`ursa-art-star ${point.group} ${point.id}`} cx={point.x} cy={point.y} r={point.id === "alioth" ? 3 : point.group === "carro" ? 1.8 : 1} />)}
      </svg>
    </figure>
  );
}
