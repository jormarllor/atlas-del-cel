"use client";

import { useMemo, useState } from "react";

type TaurusPoint = {
  id: string;
  name: string;
  raHours: number;
  decDeg: number;
  magnitude: number;
  kind?: "warm" | "cluster";
};

// ICRS/J2000 positions from SIMBAD and NASA's Messier catalogue.
const stars: TaurusPoint[] = [
  { id: "aldebaran", name: "Aldebaran", raHours: 4 + 35 / 60 + 55.24 / 3600, decDeg: 16 + 30 / 60 + 33.5 / 3600, magnitude: 0.87, kind: "warm" },
  { id: "gamma", name: "γ Tauri", raHours: 4 + 19 / 60 + 47.604 / 3600, decDeg: 15 + 37 / 60 + 39.51 / 3600, magnitude: 3.65 },
  { id: "delta", name: "δ¹ Tauri", raHours: 4 + 22 / 60 + 56.1 / 3600, decDeg: 17 + 32 / 60 + 33 / 3600, magnitude: 3.77 },
  { id: "theta", name: "θ² Tauri", raHours: 4 + 28 / 60 + 39.745 / 3600, decDeg: 15 + 52 / 60 + 15.12 / 3600, magnitude: 3.4 },
  { id: "epsilon", name: "ε Tauri · Ain", raHours: 4 + 28 / 60 + 37 / 3600, decDeg: 19 + 10 / 60 + 49.56 / 3600, magnitude: 3.53 },
  { id: "elnath", name: "Elnath", raHours: 5 + 26 / 60 + 17.513 / 3600, decDeg: 28 + 36 / 60 + 26.83 / 3600, magnitude: 1.65 },
  { id: "zeta", name: "Zeta Tauri", raHours: 5 + 37 / 60 + 38.68 / 3600, decDeg: 21 + 8 / 60 + 33 / 3600, magnitude: 3.01 },
];

const pleiades: TaurusPoint[] = [
  { id: "alcyone", name: "Plèiades · M45", raHours: 3 + 47 / 60 + 29.08 / 3600, decDeg: 24 + 6 / 60 + 18.5 / 3600, magnitude: 2.87, kind: "cluster" },
  { id: "atlas", name: "", raHours: 3 + 49 / 60 + 9.7 / 3600, decDeg: 24 + 3 / 60 + 12 / 3600, magnitude: 3.63, kind: "cluster" },
  { id: "electra", name: "", raHours: 3 + 44 / 60 + 52.5 / 3600, decDeg: 24 + 6 / 60 + 48 / 3600, magnitude: 3.7, kind: "cluster" },
  { id: "maia", name: "", raHours: 3 + 45 / 60 + 49.6 / 3600, decDeg: 24 + 22 / 60 + 4 / 3600, magnitude: 3.87, kind: "cluster" },
  { id: "merope", name: "", raHours: 3 + 46 / 60 + 19.6 / 3600, decDeg: 23 + 56 / 60 + 54 / 3600, magnitude: 4.18, kind: "cluster" },
  { id: "taygeta", name: "", raHours: 3 + 45 / 60 + 12.5 / 3600, decDeg: 24 + 28 / 60 + 2 / 3600, magnitude: 4.3, kind: "cluster" },
];

const lines = [
  ["gamma", "theta"], ["theta", "aldebaran"],
  ["gamma", "delta"], ["delta", "epsilon"],
  ["epsilon", "elnath"], ["gamma", "zeta"],
] as const;

const CENTER_RA_DEG = 4.67 * 15;
const CENTER_DEC_DEG = 21;
const SPAN_X_DEG = 32;
const SPAN_Y_DEG = 20;

function project(point: Pick<TaurusPoint, "raHours" | "decDeg">) {
  const deltaRa = (point.raHours * 15 - CENTER_RA_DEG) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return {
    x: 50 - deltaRa / SPAN_X_DEG * 100,
    y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100,
  };
}

function diameter(magnitude: number) {
  return Math.max(4, 14 - magnitude * 2.15);
}

export default function TaurusMap() {
  const [showStars, setShowStars] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [showMyth, setShowMyth] = useState(false);
  const projected = useMemo(() => [...stars, ...pleiades].map(point => ({ ...point, ...project(point) })), []);
  const byId = useMemo(() => Object.fromEntries(projected.map(point => [point.id, point])), [projected]);
  const m1 = project({ raHours: 5 + 34 / 60 + 31.94 / 3600, decDeg: 22 + 52.2 / 3600 });
  const headCentre = {
    x: (byId.gamma.x + byId.theta.x + byId.epsilon.x) / 3,
    y: (byId.gamma.y + byId.theta.y + byId.epsilon.y) / 3,
  };

  return (
    <div className="map-shell">
      <div className="map-toolbar" aria-label="Controls del mapa">
        <button className={showStars ? "active" : ""} aria-pressed={showStars} onClick={() => setShowStars(!showStars)}>Estrelles</button>
        <button className={showLines ? "active" : ""} aria-pressed={showLines} onClick={() => setShowLines(!showLines)}>Línies</button>
        <button className={showNames ? "active" : ""} aria-pressed={showNames} onClick={() => setShowNames(!showNames)}>Noms</button>
        <button className={showMyth ? "active" : ""} aria-pressed={showMyth} onClick={() => setShowMyth(!showMyth)}>Figura mitològica</button>
        <span className="map-coordinate-badge">ICRS · J2000</span>
      </div>
      <div className="star-map accurate-map taurus-map" role="img" aria-label="Mapa de Taure projectat a partir de coordenades equatorials ICRS J2000">
        <div className="star-dust" aria-hidden="true" />
        <div className="sky-orientation" aria-hidden="true"><span>E</span><b>mirant cap al sud</b><span>O</span></div>
        {showMyth && (
          <svg className="myth-overlay detailed taurus-myth" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path
              className="taurus-myth-head"
              d={`M ${byId.epsilon.x} ${byId.epsilon.y}
                Q ${byId.delta.x} ${byId.delta.y} ${byId.gamma.x} ${byId.gamma.y}
                Q ${byId.theta.x} ${byId.theta.y} ${byId.aldebaran.x} ${byId.aldebaran.y}
                Q ${headCentre.x + 1} ${headCentre.y + 8} ${byId.epsilon.x} ${byId.epsilon.y}`}
            />
            <path
              className="taurus-myth-horn"
              d={`M ${byId.epsilon.x} ${byId.epsilon.y}
                Q ${(byId.epsilon.x + byId.elnath.x) / 2 - 4} ${(byId.epsilon.y + byId.elnath.y) / 2 + 2}
                ${byId.elnath.x} ${byId.elnath.y}`}
            />
            <path
              className="taurus-myth-horn"
              d={`M ${byId.gamma.x} ${byId.gamma.y}
                Q ${(byId.gamma.x + byId.zeta.x) / 2 - 2} ${(byId.gamma.y + byId.zeta.y) / 2 - 7}
                ${byId.zeta.x} ${byId.zeta.y}`}
            />
            <circle className="taurus-myth-eye" cx={byId.aldebaran.x} cy={byId.aldebaran.y} r="2.15" />
          </svg>
        )}
        {showLines && (
          <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {lines.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
          </svg>
        )}
        {showStars && projected.map(point => {
          const d = diameter(point.magnitude);
          return (
            <div className={`map-star ${point.kind ?? ""}`} key={point.id} style={{ left: `${point.x}%`, top: `${point.y}%`, width: d, height: d }}>
              {showNames && point.name && <span className={`star-label label-${point.id}`}>{point.name}</span>}
            </div>
          );
        })}
        <div className="m42-marker m1-marker" style={{ left: `${m1.x}%`, top: `${m1.y}%` }}>
          <span>✧</span>{showNames && <b>M1 · Nebulosa del Cranc</b>}
        </div>
      </div>
    </div>
  );
}
