"use client";

import { CASSIOPEIA_LINES, CASSIOPEIA_STARS, projectCassiopeia } from "./CassiopeiaMap";

// One global similarity transform: rotation + uniform scale + translation.
const ART_TRANSFORM = { a: -0.55, b: 0.18, x: 85, y: 75 };

function placeOnArtwork(point: { raHours: number; decDeg: number }) {
  const projected = projectCassiopeia(point);
  return {
    x: ART_TRANSFORM.a * projected.x - ART_TRANSFORM.b * projected.y + ART_TRANSFORM.x,
    y: ART_TRANSFORM.b * projected.x + ART_TRANSFORM.a * projected.y + ART_TRANSFORM.y,
  };
}

export default function CassiopeiaArt() {
  const projected = CASSIOPEIA_STARS.map(point => ({ ...point, ...placeOnArtwork(point) }));
  const byId = Object.fromEntries(projected.map(point => [point.id, point]));

  return (
    <figure className="art-card cassiopeia-art-card">
      <img
        src="/images/cassiopea-mitologica.webp"
        alt="Cassiopea imaginada com una reina celeste i translúcida, asseguda en un tron dissolt entre les estrelles"
      />
      <svg className="cassiopeia-art-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {CASSIOPEIA_LINES.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
      </svg>
      <div className="cassiopeia-art-points" aria-hidden="true">
        {projected.map(point => (
          <span key={point.id} className={`cassiopeia-art-star ${point.id === "schedar" ? "schedar" : ""}`} style={{ left: `${point.x}%`, top: `${point.y}%` }} />
        ))}
      </div>
    </figure>
  );
}
