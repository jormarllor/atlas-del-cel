"use client";

import { AURIGA_LINES, AURIGA_STARS, projectAuriga } from "./AurigaMap";

// One global similarity transform: rotation + uniform scale + translation.
const ART_TRANSFORM = { a: 0.55, b: 0, x: 10, y: 15 };
const ART_LINES = AURIGA_LINES.filter(([a, b]) => a !== "elnath" && b !== "elnath");

function placeOnArtwork(point: { raHours: number; decDeg: number }) {
  const projected = projectAuriga(point);
  return {
    x: ART_TRANSFORM.a * projected.x - ART_TRANSFORM.b * projected.y + ART_TRANSFORM.x,
    y: ART_TRANSFORM.b * projected.x + ART_TRANSFORM.a * projected.y + ART_TRANSFORM.y,
  };
}

export default function AurigaArt() {
  const projected = AURIGA_STARS.map(point => ({ ...point, ...placeOnArtwork(point) }));
  const byId = Object.fromEntries(projected.map(point => [point.id, point]));

  return (
    <figure className="art-card auriga-art-card">
      <img
        src="/images/auriga-mitologic.webp"
        alt="Auriga imaginat com una figura celeste i translúcida que sosté una cabra i dues cabretes entre les estrelles"
      />
      <svg className="auriga-art-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {ART_LINES.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />
        ))}
      </svg>
      <div className="auriga-art-points" aria-hidden="true">
        {projected.filter(point => point.id !== "almaaz" && point.id !== "elnath").map(point => (
          <span
            key={point.id}
            className={`auriga-art-star ${point.id === "capella" ? "capella" : ""}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          />
        ))}
      </div>
    </figure>
  );
}
