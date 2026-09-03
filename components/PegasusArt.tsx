"use client";

import { PEGASUS_LINES, PEGASUS_STARS, projectPegasus } from "./PegasusMap";

// One global similarity transform: rotation + uniform scale + translation.
const ART_TRANSFORM = { a: -0.504, b: 0.341, x: 86.5, y: 68.3 };
const ART_STARS = PEGASUS_STARS;
const ART_LINES = PEGASUS_LINES;

function placeOnArtwork(point: { raHours: number; decDeg: number }) {
  const projected = projectPegasus(point);
  return {
    x: ART_TRANSFORM.a * projected.x - ART_TRANSFORM.b * projected.y + ART_TRANSFORM.x,
    y: ART_TRANSFORM.b * projected.x + ART_TRANSFORM.a * projected.y + ART_TRANSFORM.y,
  };
}

export default function PegasusArt() {
  const projected = ART_STARS.map(point => ({ ...point, ...placeOnArtwork(point) }));
  const byId = Object.fromEntries(projected.map(point => [point.id, point]));

  return (
    <figure className="art-card pegasus-art-card">
      <img
        src="/images/pegas-mitologic.webp"
        alt="Pegàs imaginat com un cavall alat celeste i translúcid que emergeix entre les estrelles"
      />
      <svg className="pegasus-art-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {ART_LINES.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />
        ))}
      </svg>
      <div className="pegasus-art-points" aria-hidden="true">
        {projected.map(point => (
          <span
            key={point.id}
            className={`pegasus-art-star ${point.id === "markab" ? "markab" : ""} ${point.id === "alpheratz" ? "neighbor" : ""}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          />
        ))}
      </div>
    </figure>
  );
}
