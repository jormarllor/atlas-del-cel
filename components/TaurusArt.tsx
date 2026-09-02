"use client";

import {
  projectTaurus,
  TAURUS_PLEIADES,
  TAURUS_STARS,
} from "./TaurusMap";

const ART_TRANSFORM = {
  a: 0.9577454011,
  b: 0.0224927963,
  x: 3.499927049,
  y: -7.796547696,
};

function placeOnArtwork(point: { raHours: number; decDeg: number }) {
  const projected = projectTaurus(point);
  return {
    x: ART_TRANSFORM.a * projected.x - ART_TRANSFORM.b * projected.y + ART_TRANSFORM.x,
    y: ART_TRANSFORM.b * projected.x + ART_TRANSFORM.a * projected.y + ART_TRANSFORM.y,
  };
}

export default function TaurusArt() {
  const projected = [...TAURUS_STARS, ...TAURUS_PLEIADES].map((point) => ({
    ...point,
    ...placeOnArtwork(point),
  }));
  const byId = Object.fromEntries(projected.map((point) => [point.id, point]));
  const hyades = ["aldebaran", "theta", "gamma", "delta", "epsilon"];
  const anchors = ["aldebaran", "elnath", "zeta"];
  const hyadesHints = ["theta", "gamma", "delta", "epsilon"];
  const pleiades = TAURUS_PLEIADES.map((point) => point.id);

  const points = (ids: string[]) => ids.map((id) => `${byId[id].x},${byId[id].y}`).join(" ");

  return (
    <figure className="art-card taurus-art-card">
      <img
        src="/images/taure-mitologic.png"
        alt="Taure imaginat com un toro celeste; les estrelles principals segueixen la geometria real de la constel·lació"
      />
      <svg className="taurus-art-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <g className="taurus-art-lines">
          <polyline className="taurus-art-v" points={points(hyades)} />
          <line className="taurus-art-horn" x1={byId.epsilon.x} y1={byId.epsilon.y} x2={byId.elnath.x} y2={byId.elnath.y} />
          <line className="taurus-art-horn" x1={byId.gamma.x} y1={byId.gamma.y} x2={byId.zeta.x} y2={byId.zeta.y} />
        </g>
      </svg>
      <div className="taurus-art-points" aria-hidden="true">
        {anchors.map((id) => (
          <span
            key={id}
            className={`taurus-art-star anchor ${id}`}
            style={{ left: `${byId[id].x}%`, top: `${byId[id].y}%` }}
          />
        ))}
        {hyadesHints.map((id) => (
          <span
            key={id}
            className="taurus-art-star hyades-hint"
            style={{ left: `${byId[id].x}%`, top: `${byId[id].y}%` }}
          />
        ))}
        {pleiades.map((id) => (
          <span
            key={id}
            className="taurus-art-star pleiades-hint"
            style={{ left: `${byId[id].x}%`, top: `${byId[id].y}%` }}
          />
        ))}
      </div>
    </figure>
  );
}
