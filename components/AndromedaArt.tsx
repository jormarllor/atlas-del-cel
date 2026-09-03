"use client";

import { ANDROMEDA_LINES, ANDROMEDA_STARS, projectAndromeda } from "./AndromedaMap";

// One global similarity transform: rotation + uniform scale + translation.
const ART_TRANSFORM = { a: -0.47, b: -0.265, x: 58, y: 87 };
const ART_STARS = ANDROMEDA_STARS.filter(point => ["alpheratz", "mirach", "almach"].includes(point.id));
const ART_LINES = ANDROMEDA_LINES.filter(([a, b]) => [a, b].every(id => ["alpheratz", "mirach", "almach"].includes(id)));

function placeOnArtwork(point: { raHours: number; decDeg: number }) {
  const projected = projectAndromeda(point);
  return {
    x: ART_TRANSFORM.a * projected.x - ART_TRANSFORM.b * projected.y + ART_TRANSFORM.x,
    y: ART_TRANSFORM.b * projected.x + ART_TRANSFORM.a * projected.y + ART_TRANSFORM.y,
  };
}

export default function AndromedaArt() {
  const projected = ART_STARS.map(point => ({ ...point, ...placeOnArtwork(point) }));
  const byId = Object.fromEntries(projected.map(point => [point.id, point]));

  return (
    <figure className="art-card andromeda-art-card">
      <img
        src="/images/andromeda-mitologica.webp"
        alt="Andròmeda imaginada com una figura femenina celeste i translúcida que apareix entre les estrelles"
      />
      <svg className="andromeda-art-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {ART_LINES.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />
        ))}
      </svg>
      <div className="andromeda-art-points" aria-hidden="true">
        {projected.map(point => (
          <span
            key={point.id}
            className={`andromeda-art-star ${point.id === "mirach" ? "mirach" : ""}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          />
        ))}
      </div>
    </figure>
  );
}
