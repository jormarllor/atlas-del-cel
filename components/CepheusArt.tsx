"use client";

import { CEPHEUS_LINES, CEPHEUS_STARS, projectCepheus } from "./CepheusMap";

// One global similarity transform: rotation + uniform scale + translation.
const ART_TRANSFORM = { a: 0.621, b: -0.429, x: -6, y: 42 };

function placeOnArtwork(point: { raHours: number; decDeg: number }) {
  const projected = projectCepheus(point);
  return {
    x: ART_TRANSFORM.a * projected.x - ART_TRANSFORM.b * projected.y + ART_TRANSFORM.x,
    y: ART_TRANSFORM.b * projected.x + ART_TRANSFORM.a * projected.y + ART_TRANSFORM.y,
  };
}

export default function CepheusArt() {
  const patternStars = CEPHEUS_STARS.filter(point => ["alderamin", "alfirk", "errai", "iota", "zeta"].includes(point.id));
  const projected = patternStars.map(point => ({ ...point, ...placeOnArtwork(point) }));
  const byId = Object.fromEntries(projected.map(point => [point.id, point]));

  return (
    <figure className="art-card cepheus-art-card">
      <img
        src="/images/cefeu-mitologic.webp"
        alt="Cefeu imaginat com un rei celeste blau i translúcid, dret entre les estrelles amb un ceptre molt subtil"
      />
      <svg className="cepheus-art-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {CEPHEUS_LINES.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
      </svg>
      <div className="cepheus-art-points" aria-hidden="true">
        {projected.map(point => (
          <span key={point.id} className={`cepheus-art-star ${point.id === "alderamin" ? "alderamin" : ""}`} style={{ left: `${point.x}%`, top: `${point.y}%` }} />
        ))}
      </div>
    </figure>
  );
}
