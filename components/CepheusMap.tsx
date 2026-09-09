"use client";

import { useMemo, useState } from "react";

export type CepheusPoint = {
  id: string;
  name: string;
  raHours: number;
  decDeg: number;
  magnitude: number;
  kind?: "warm" | "cool" | "feature";
};

// ICRS positions at epoch J2000.0, verified with SIMBAD/CDS.
export const CEPHEUS_STARS: CepheusPoint[] = [
  { id: "alderamin", name: "Alderamin", raHours: 21 + 18 / 60 + 34.7723 / 3600, decDeg: 62 + 35 / 60 + 8.069 / 3600, magnitude: 2.46, kind: "cool" },
  { id: "alfirk", name: "Alfirk", raHours: 21 + 28 / 60 + 39.5968513 / 3600, decDeg: 70 + 33 / 60 + 38.574681 / 3600, magnitude: 3.23, kind: "cool" },
  { id: "errai", name: "Errai", raHours: 23 + 39 / 60 + 20.849 / 3600, decDeg: 77 + 37 / 60 + 56.193 / 3600, magnitude: 3.21, kind: "warm" },
  { id: "iota", name: "ι Cephei", raHours: 22 + 49 / 60 + 40.8166 / 3600, decDeg: 66 + 12 / 60 + 1.468 / 3600, magnitude: 3.51, kind: "warm" },
  { id: "zeta", name: "ζ Cephei", raHours: 22 + 10 / 60 + 51.2766 / 3600, decDeg: 58 + 12 / 60 + 4.55 / 3600, magnitude: 3.35, kind: "warm" },
  { id: "delta", name: "δ Cephei", raHours: 22 + 29 / 60 + 10.2653 / 3600, decDeg: 58 + 24 / 60 + 54.713 / 3600, magnitude: 3.75, kind: "feature" },
  { id: "mu", name: "μ Cephei", raHours: 21 + 43 / 60 + 30.4595559 / 3600, decDeg: 58 + 46 / 60 + 48.165937 / 3600, magnitude: 4.08, kind: "feature" },
];

export const CEPHEUS_LINES = [
  ["alderamin", "alfirk"],
  ["alfirk", "errai"],
  ["errai", "iota"],
  ["iota", "zeta"],
  ["zeta", "alderamin"],
] as const;

export const CEPHEUS_DEEP_SKY = [
  { id: "ngc7380", name: "NGC 7380 · cúmul obert", raHours: 22 + 47 / 60 + 16 / 3600, decDeg: 58 + 7 / 60 + 30 / 3600 },
] as const;

const CENTER_RA_HOURS = 22.45;
const CENTER_DEC_DEG = 67;
const SPAN_X_DEG = 19;
const SPAN_Y_DEG = 28;

export function projectCepheus(point: Pick<CepheusPoint, "raHours" | "decDeg">) {
  const deltaRa = (point.raHours * 15 - CENTER_RA_HOURS * 15) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return {
    x: 50 + deltaRa / SPAN_X_DEG * 100,
    y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100,
  };
}

function diameter(magnitude: number) {
  return Math.max(4, 14 - magnitude * 2.2);
}

export default function CepheusMap() {
  const [showStars, setShowStars] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [showMyth, setShowMyth] = useState(false);
  const projected = useMemo(() => CEPHEUS_STARS.map(point => ({ ...point, ...projectCepheus(point) })), []);
  const byId = useMemo(() => Object.fromEntries(projected.map(point => [point.id, point])), [projected]);
  const deepSky = useMemo(() => CEPHEUS_DEEP_SKY.map(point => ({ ...point, ...projectCepheus(point) })), []);

  return (
    <div className="map-shell">
      <div className="map-toolbar" aria-label="Controls del mapa">
        <button className={showStars ? "active" : ""} aria-pressed={showStars} onClick={() => setShowStars(!showStars)}>Estrelles</button>
        <button className={showLines ? "active" : ""} aria-pressed={showLines} onClick={() => setShowLines(!showLines)}>Línies</button>
        <button className={showNames ? "active" : ""} aria-pressed={showNames} onClick={() => setShowNames(!showNames)}>Noms</button>
        <button className={showMyth ? "active" : ""} aria-pressed={showMyth} onClick={() => setShowMyth(!showMyth)}>Figura mitològica</button>
        <span className="map-coordinate-badge">ICRS · època J2000.0</span>
      </div>
      <div className="star-map accurate-map cepheus-map" role="img" aria-label="Mapa de Cefeu projectat a partir de coordenades equatorials ICRS referides a l’època J2000.0">
        <div className="star-dust" aria-hidden="true" />
        <div className="sky-orientation" aria-hidden="true"><span>O</span><b>mirant cap al nord</b><span>E</span></div>

        {showMyth && (
          <svg className="myth-overlay detailed cepheus-myth" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="cepheus-head" d={`M ${byId.errai.x - 2.8} ${byId.errai.y + 2} Q ${byId.errai.x - 3.5} ${byId.errai.y - 4} ${byId.errai.x} ${byId.errai.y - 5} Q ${byId.errai.x + 3.5} ${byId.errai.y - 4} ${byId.errai.x + 2.8} ${byId.errai.y + 2}`} />
            <path className="cepheus-shoulders" d={`M ${byId.alfirk.x} ${byId.alfirk.y} Q ${byId.errai.x - 4} ${byId.errai.y + 8} ${byId.iota.x} ${byId.iota.y}`} />
            <path className="cepheus-body" d={`M ${byId.errai.x - 1} ${byId.errai.y + 5} Q ${byId.alderamin.x + 14} ${byId.alderamin.y - 8} ${byId.alderamin.x} ${byId.alderamin.y} M ${byId.errai.x + 1} ${byId.errai.y + 5} Q ${byId.zeta.x + 10} ${byId.zeta.y - 12} ${byId.zeta.x} ${byId.zeta.y}`} />
            <path className="cepheus-arm" d={`M ${byId.iota.x} ${byId.iota.y} Q ${byId.iota.x + 8} ${byId.iota.y + 2} ${byId.iota.x + 13} ${byId.iota.y - 7}`} />
            <path className="cepheus-sceptre" d={`M ${byId.alfirk.x - 5} ${byId.alfirk.y - 7} L ${byId.alderamin.x - 8} ${byId.alderamin.y + 8} M ${byId.alfirk.x - 6.5} ${byId.alfirk.y - 8.5} l 3 0 m -1.5 -2 l 0 4`} />
          </svg>
        )}

        {showLines && (
          <svg className="constellation-lines cepheus-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {CEPHEUS_LINES.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
          </svg>
        )}

        {showStars && projected.map(point => {
          const d = diameter(point.magnitude);
          return (
            <div className={`map-star ${point.kind ?? ""} cepheus-star-${point.id}`} key={point.id} style={{ left: `${point.x}%`, top: `${point.y}%`, width: d, height: d }}>
              {showNames && <span className={`star-label label-cepheus-${point.id}`}>{point.name}</span>}
            </div>
          );
        })}

        {deepSky.map(object => (
          <div className="cepheus-cluster-marker" key={object.id} style={{ left: `${object.x}%`, top: `${object.y}%` }}>
            <span aria-hidden="true" />
            {showNames && <b>{object.name}</b>}
          </div>
        ))}
      </div>
    </div>
  );
}
