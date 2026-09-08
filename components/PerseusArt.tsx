"use client";

import { PERSEUS_LINES, PERSEUS_STARS, projectPerseus } from "./PerseusMap";

// One global similarity transform: rotation + uniform scale + translation.
const ART_TRANSFORM = { a: 1.055, b: 0.408, x: 21.4, y: -33.4 };

function placeOnArtwork(point: { raHours: number; decDeg: number }) {
  const projected = projectPerseus(point);
  return {
    x: ART_TRANSFORM.a * projected.x - ART_TRANSFORM.b * projected.y + ART_TRANSFORM.x,
    y: ART_TRANSFORM.b * projected.x + ART_TRANSFORM.a * projected.y + ART_TRANSFORM.y,
  };
}

export default function PerseusArt() {
  const projected = PERSEUS_STARS.map(point => ({ ...point, ...placeOnArtwork(point) }));
  const byId = Object.fromEntries(projected.map(point => [point.id, point]));

  return (
    <figure className="art-card perseus-art-card">
      <img
        src="/images/perseu-mitologic.webp"
        alt="Perseu imaginat com un heroi celeste blau i translúcid, amb espasa i el cap de Medusa suggerit discretament entre les estrelles"
      />
      <svg className="perseus-art-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {PERSEUS_LINES.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
      </svg>
      <div className="perseus-art-points" aria-hidden="true">
        {projected.map(point => (
          <span key={point.id} className={`perseus-art-star ${point.id === "mirfak" ? "mirfak" : point.id === "algol" ? "algol" : ""}`} style={{ left: `${point.x}%`, top: `${point.y}%` }} />
        ))}
      </div>
    </figure>
  );
}
