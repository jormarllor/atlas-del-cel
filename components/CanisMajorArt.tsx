"use client";

import { CANIS_MAJOR_LINES, CANIS_MAJOR_STARS, projectCanisMajor } from "./CanisMajorMap";

// One global similarity transform: rotation + uniform scale + translation.
const ART_TRANSFORM = { a: 0.693, b: 0.0975, x: 26.12, y: -0.49 };

function placeOnArtwork(point: { raHours: number; decDeg: number }) {
  const projected = projectCanisMajor(point);
  return {
    x: ART_TRANSFORM.a * projected.x - ART_TRANSFORM.b * projected.y + ART_TRANSFORM.x,
    y: ART_TRANSFORM.b * projected.x + ART_TRANSFORM.a * projected.y + ART_TRANSFORM.y,
  };
}

export default function CanisMajorArt() {
  const projected = CANIS_MAJOR_STARS.map(point => ({ ...point, ...placeOnArtwork(point) }));
  const byId = Object.fromEntries(projected.map(point => [point.id, point]));

  return (
    <figure className="art-card canis-major-art-card">
      <img
        src="/images/ca-major-mitologic.png"
        alt="Ca Major imaginat com un gran gos celeste sota un cel estrellat, amb un traç subtil de les estrelles principals"
      />
      <svg className="canis-major-art-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {CANIS_MAJOR_LINES.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />
        ))}
      </svg>
      <div className="canis-major-art-points" aria-hidden="true">
        {projected.map(point => (
          <span
            key={point.id}
            className={`canis-major-art-star ${point.id === "sirius" ? "sirius" : ""}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          />
        ))}
      </div>
    </figure>
  );
}
