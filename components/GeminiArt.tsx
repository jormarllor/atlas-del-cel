"use client";

import { GEMINI_LINES, GEMINI_STARS, projectGemini } from "./GeminiMap";

// One global similarity transform: rotation + uniform scale + translation.
const ART_TRANSFORM = { a: 0.6113721, b: 0.56151814, x: 39.00686292, y: -12.80535226 };

function placeOnArtwork(point: { raHours: number; decDeg: number }) {
  const projected = projectGemini(point);
  return {
    x: ART_TRANSFORM.a * projected.x - ART_TRANSFORM.b * projected.y + ART_TRANSFORM.x,
    y: ART_TRANSFORM.b * projected.x + ART_TRANSFORM.a * projected.y + ART_TRANSFORM.y,
  };
}

export default function GeminiArt() {
  const projected = GEMINI_STARS.map(point => ({ ...point, ...placeOnArtwork(point) }));
  const byId = Object.fromEntries(projected.map(point => [point.id, point]));

  return (
    <figure className="art-card gemini-art-card">
      <img
        src="/images/bessons-mitologics.png"
        alt="Bessons imaginats com dos germans celestes que caminen junts; dos traços estel·lars subtils recorren les figures"
      />
      <svg className="gemini-art-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {GEMINI_LINES.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />
        ))}
      </svg>
      <div className="gemini-art-points" aria-hidden="true">
        {projected.map(point => (
          <span
            key={point.id}
            className={`gemini-art-star ${point.id === "pollux" || point.id === "castor" ? "head" : ""} ${point.id}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          />
        ))}
      </div>
    </figure>
  );
}
