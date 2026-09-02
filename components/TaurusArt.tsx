"use client";

import {
  projectTaurus,
  TAURUS_LINES,
  TAURUS_PLEIADES,
  TAURUS_STARS,
} from "./TaurusMap";

export default function TaurusArt() {
  const projected = [...TAURUS_STARS, ...TAURUS_PLEIADES].map((point) => ({
    ...point,
    ...projectTaurus(point),
  }));
  const byId = Object.fromEntries(projected.map((point) => [point.id, point]));

  return (
    <figure className="art-card taurus-art-card">
      <img
        src="/images/taure-mitologic.png"
        alt="Taure imaginat com un toro celeste; les estrelles principals segueixen la geometria real de la constel·lació"
      />
      <svg className="taurus-art-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="taurus-art-glow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g className="taurus-art-lines">
          {TAURUS_LINES.map(([a, b]) => (
            <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />
          ))}
        </g>
        <g className="taurus-art-points" filter="url(#taurus-art-glow)">
          {projected.map((point) => {
            const radius = Math.max(0.32, 0.9 - point.magnitude * 0.11);
            return <circle key={point.id} className={point.kind ?? ""} cx={point.x} cy={point.y} r={radius} />;
          })}
        </g>
      </svg>
    </figure>
  );
}
