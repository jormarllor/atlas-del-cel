"use client";

import { useMemo, useState } from "react";

export type AndromedaPoint = {
  id: string;
  name: string;
  raHours: number;
  decDeg: number;
  magnitude: number;
  kind?: "warm" | "cool";
};

// ICRS positions at epoch J2000.0, verified with SIMBAD/CDS.
export const ANDROMEDA_STARS: AndromedaPoint[] = [
  { id: "alpheratz", name: "Alpheratz", raHours: 0 + 8 / 60 + 23.25988 / 3600, decDeg: 29 + 5 / 60 + 25.552 / 3600, magnitude: 2.06, kind: "cool" },
  { id: "mirach", name: "Mirach", raHours: 1 + 9 / 60 + 43.92388 / 3600, decDeg: 35 + 37 / 60 + 14.0075 / 3600, magnitude: 2.05, kind: "warm" },
  { id: "almach", name: "Almach", raHours: 2 + 3 / 60 + 53.95229 / 3600, decDeg: 42 + 19 / 60 + 47.0223 / 3600, magnitude: 2.27, kind: "warm" },
  { id: "mu", name: "μ Andromedae", raHours: 0 + 56 / 60 + 45.211 / 3600, decDeg: 38 + 29 / 60 + 57.641 / 3600, magnitude: 3.86, kind: "cool" },
  { id: "nu", name: "ν Andromedae", raHours: 0 + 49 / 60 + 48.84 / 3600, decDeg: 41 + 4 / 60 + 44.1 / 3600, magnitude: 4.53, kind: "cool" },
];

export const ANDROMEDA_LINES = [
  ["alpheratz", "mirach"],
  ["mirach", "almach"],
  ["mirach", "mu"],
  ["mu", "nu"],
] as const;

export const M31 = {
  id: "m31",
  name: "M31 · Galàxia d’Andròmeda",
  raHours: 0 + 42 / 60 + 44.33 / 3600,
  decDeg: 41 + 16 / 60 + 7.5 / 3600,
};

const CENTER_RA_DEG = 1.05 * 15;
const CENTER_DEC_DEG = 36;
const SPAN_X_DEG = 29;
const SPAN_Y_DEG = 18;

export function projectAndromeda(point: Pick<AndromedaPoint, "raHours" | "decDeg">) {
  const deltaRa = (point.raHours * 15 - CENTER_RA_DEG) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return {
    x: 50 - deltaRa / SPAN_X_DEG * 100,
    y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100,
  };
}

function diameter(magnitude: number) {
  return Math.max(4, 13.5 - magnitude * 2.15);
}

export default function AndromedaMap() {
  const [showStars, setShowStars] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [showMyth, setShowMyth] = useState(false);
  const projected = useMemo(() => ANDROMEDA_STARS.map(point => ({ ...point, ...projectAndromeda(point) })), []);
  const byId = useMemo(() => Object.fromEntries(projected.map(point => [point.id, point])), [projected]);
  const m31 = useMemo(() => ({ ...M31, ...projectAndromeda(M31) }), []);

  return (
    <div className="map-shell">
      <div className="map-toolbar" aria-label="Controls del mapa">
        <button className={showStars ? "active" : ""} aria-pressed={showStars} onClick={() => setShowStars(!showStars)}>Estrelles</button>
        <button className={showLines ? "active" : ""} aria-pressed={showLines} onClick={() => setShowLines(!showLines)}>Línies</button>
        <button className={showNames ? "active" : ""} aria-pressed={showNames} onClick={() => setShowNames(!showNames)}>Noms</button>
        <button className={showMyth ? "active" : ""} aria-pressed={showMyth} onClick={() => setShowMyth(!showMyth)}>Figura mitològica</button>
        <span className="map-coordinate-badge">ICRS · època J2000.0</span>
      </div>
      <div className="star-map accurate-map andromeda-map" role="img" aria-label="Mapa d’Andròmeda projectat a partir de coordenades equatorials ICRS referides a l’època J2000.0">
        <div className="star-dust" aria-hidden="true" />
        <div className="sky-orientation" aria-hidden="true"><span>E</span><b>mirant cap al sud</b><span>O</span></div>

        {showMyth && (
          <svg className="myth-overlay detailed andromeda-myth" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="andromeda-head" d={`M ${byId.alpheratz.x - 2.5} ${byId.alpheratz.y + 1} Q ${byId.alpheratz.x - 4} ${byId.alpheratz.y - 4} ${byId.alpheratz.x} ${byId.alpheratz.y - 5.5} Q ${byId.alpheratz.x + 4} ${byId.alpheratz.y - 4} ${byId.alpheratz.x + 2.5} ${byId.alpheratz.y + 1}`} />
            <path className="andromeda-body" d={`M ${byId.alpheratz.x} ${byId.alpheratz.y + 2} Q ${byId.mirach.x + 5} ${byId.mirach.y - 10} ${byId.mirach.x} ${byId.mirach.y} Q ${byId.almach.x + 6} ${byId.almach.y - 8} ${byId.almach.x + 1} ${byId.almach.y + 2} M ${byId.mirach.x} ${byId.mirach.y} Q ${byId.almach.x - 2} ${byId.almach.y - 5} ${byId.almach.x - 4} ${byId.almach.y + 4}`} />
            <path className="andromeda-arms" d={`M ${byId.alpheratz.x - 1} ${byId.alpheratz.y + 5} Q ${byId.mu.x + 14} ${byId.mu.y + 12} ${byId.mu.x + 3} ${byId.mu.y + 1} M ${byId.alpheratz.x + 1} ${byId.alpheratz.y + 5} Q ${byId.alpheratz.x + 15} ${byId.alpheratz.y + 13} ${byId.alpheratz.x + 20} ${byId.alpheratz.y + 5}`} />
            <path className="andromeda-chain" d={`M ${byId.mu.x + 3} ${byId.mu.y + 1} q 2 -2 4 0 q 2 2 4 0 M ${byId.alpheratz.x + 20} ${byId.alpheratz.y + 5} q 2 -2 4 0 q 2 2 4 0`} />
          </svg>
        )}

        {showLines && (
          <svg className="constellation-lines andromeda-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {ANDROMEDA_LINES.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
          </svg>
        )}

        {showStars && projected.map(point => {
          const d = diameter(point.magnitude);
          return (
            <div className={`map-star ${point.kind ?? ""} andromeda-star-${point.id}`} key={point.id} style={{ left: `${point.x}%`, top: `${point.y}%`, width: d, height: d }}>
              {showNames && <span className={`star-label label-andromeda-${point.id}`}>{point.name}</span>}
            </div>
          );
        })}

        <div className="andromeda-galaxy-marker" style={{ left: `${m31.x}%`, top: `${m31.y}%` }}>
          <span aria-hidden="true" />
          {showNames && <b>{M31.name}</b>}
        </div>
      </div>
    </div>
  );
}
