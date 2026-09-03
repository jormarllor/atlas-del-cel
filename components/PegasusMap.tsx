"use client";

import { useMemo, useState } from "react";

export type PegasusPoint = {
  id: string;
  name: string;
  raHours: number;
  decDeg: number;
  magnitude: number;
  kind?: "warm" | "cool" | "neighbor";
};

// ICRS positions at epoch J2000.0, verified with SIMBAD/CDS.
export const PEGASUS_STARS: PegasusPoint[] = [
  { id: "markab", name: "Markab", raHours: 23 + 4 / 60 + 45.65345 / 3600, decDeg: 15 + 12 / 60 + 18.9617 / 3600, magnitude: 2.48, kind: "cool" },
  { id: "scheat", name: "Scheat", raHours: 23 + 3 / 60 + 46.45746 / 3600, decDeg: 28 + 4 / 60 + 58.0336 / 3600, magnitude: 2.42, kind: "warm" },
  { id: "algenib", name: "Algenib", raHours: 0 + 13 / 60 + 14.152349 / 3600, decDeg: 15 + 11 / 60 + 0.95435 / 3600, magnitude: 2.84, kind: "cool" },
  { id: "alpheratz", name: "Alpheratz · Andròmeda", raHours: 0 + 8 / 60 + 23.25988 / 3600, decDeg: 29 + 5 / 60 + 25.552 / 3600, magnitude: 2.06, kind: "neighbor" },
  { id: "homam", name: "Homam", raHours: 22 + 41 / 60 + 27.720718 / 3600, decDeg: 10 + 49 / 60 + 52.9079 / 3600, magnitude: 3.41, kind: "cool" },
  { id: "biham", name: "Biham", raHours: 22 + 10 / 60 + 11.988612 / 3600, decDeg: 6 + 11 / 60 + 52.5177 / 3600, magnitude: 3.52, kind: "cool" },
  { id: "enif", name: "Enif", raHours: 21 + 44 / 60 + 11.156139 / 3600, decDeg: 9 + 52 / 60 + 30.0312 / 3600, magnitude: 2.39, kind: "warm" },
];

export const PEGASUS_LINES = [
  ["markab", "scheat"],
  ["scheat", "alpheratz"],
  ["alpheratz", "algenib"],
  ["algenib", "markab"],
  ["markab", "homam"],
  ["homam", "biham"],
  ["biham", "enif"],
] as const;

export const M15 = {
  id: "m15",
  name: "M15",
  raHours: 21 + 29 / 60 + 58.33 / 3600,
  decDeg: 12 + 10 / 60 + 1.2 / 3600,
};

const CENTER_RA_HOURS = 22.9;
const CENTER_DEC_DEG = 17;
const SPAN_X_DEG = 45;
const SPAN_Y_DEG = 28;

function unwrapRaHours(raHours: number) {
  return raHours < 12 ? raHours + 24 : raHours;
}

export function projectPegasus(point: Pick<PegasusPoint, "raHours" | "decDeg">) {
  const deltaRa = (unwrapRaHours(point.raHours) * 15 - CENTER_RA_HOURS * 15) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return {
    x: 50 - deltaRa / SPAN_X_DEG * 100,
    y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100,
  };
}

function diameter(magnitude: number) {
  return Math.max(4, 13.5 - magnitude * 2.2);
}

export default function PegasusMap() {
  const [showStars, setShowStars] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [showMyth, setShowMyth] = useState(false);
  const projected = useMemo(() => PEGASUS_STARS.map(point => ({ ...point, ...projectPegasus(point) })), []);
  const byId = useMemo(() => Object.fromEntries(projected.map(point => [point.id, point])), [projected]);
  const m15 = useMemo(() => ({ ...M15, ...projectPegasus(M15) }), []);

  return (
    <div className="map-shell">
      <div className="map-toolbar" aria-label="Controls del mapa">
        <button className={showStars ? "active" : ""} aria-pressed={showStars} onClick={() => setShowStars(!showStars)}>Estrelles</button>
        <button className={showLines ? "active" : ""} aria-pressed={showLines} onClick={() => setShowLines(!showLines)}>Línies</button>
        <button className={showNames ? "active" : ""} aria-pressed={showNames} onClick={() => setShowNames(!showNames)}>Noms</button>
        <button className={showMyth ? "active" : ""} aria-pressed={showMyth} onClick={() => setShowMyth(!showMyth)}>Figura mitològica</button>
        <span className="map-coordinate-badge">ICRS · època J2000.0</span>
      </div>
      <div className="star-map accurate-map pegasus-map" role="img" aria-label="Mapa de Pegàs projectat a partir de coordenades equatorials ICRS referides a l’època J2000.0">
        <div className="star-dust" aria-hidden="true" />
        <div className="sky-orientation" aria-hidden="true"><span>E</span><b>mirant cap al sud</b><span>O</span></div>

        {showMyth && (
          <svg className="myth-overlay detailed pegasus-myth" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="pegasus-body" d={`M ${byId.algenib.x + 3} ${byId.algenib.y - 3} Q ${byId.markab.x + 9} ${byId.markab.y - 12} ${byId.scheat.x + 3} ${byId.scheat.y + 2} Q ${byId.alpheratz.x + 2} ${byId.alpheratz.y + 9} ${byId.algenib.x + 3} ${byId.algenib.y - 3}`} />
            <path className="pegasus-neck" d={`M ${byId.markab.x + 1} ${byId.markab.y} Q ${byId.homam.x - 1} ${byId.homam.y - 8} ${byId.biham.x} ${byId.biham.y - 2} Q ${byId.enif.x - 2} ${byId.enif.y - 4} ${byId.enif.x} ${byId.enif.y}`} />
            <path className="pegasus-muzzle" d={`M ${byId.enif.x} ${byId.enif.y} q 4 -3 7 1 q -2 5 -7 4 q -3 -1 0 -5`} />
            <path className="pegasus-wing" d={`M ${byId.scheat.x + 1} ${byId.scheat.y + 5} Q ${byId.scheat.x + 15} ${byId.scheat.y - 10} ${byId.scheat.x + 28} ${byId.scheat.y - 4} Q ${byId.scheat.x + 16} ${byId.scheat.y + 4} ${byId.markab.x + 5} ${byId.markab.y - 3} M ${byId.scheat.x - 1} ${byId.scheat.y + 7} Q ${byId.scheat.x + 8} ${byId.scheat.y - 4} ${byId.scheat.x + 21} ${byId.scheat.y + 3}`} />
            <path className="pegasus-legs" d={`M ${byId.algenib.x + 5} ${byId.algenib.y + 1} q -5 10 -9 15 M ${byId.alpheratz.x + 4} ${byId.alpheratz.y + 6} q -1 13 -6 19`} />
          </svg>
        )}

        {showLines && (
          <svg className="constellation-lines pegasus-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {PEGASUS_LINES.map(([a, b]) => (
              <line className={a === "alpheratz" || b === "alpheratz" ? "neighbor-segment" : ""} key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />
            ))}
          </svg>
        )}

        {showStars && projected.map(point => {
          const d = diameter(point.magnitude);
          return (
            <div className={`map-star ${point.kind ?? ""} pegasus-star-${point.id}`} key={point.id} style={{ left: `${point.x}%`, top: `${point.y}%`, width: d, height: d }}>
              {showNames && <span className={`star-label label-pegasus-${point.id}`}>{point.name}</span>}
            </div>
          );
        })}

        <div className="pegasus-cluster-marker" style={{ left: `${m15.x}%`, top: `${m15.y}%` }}>
          <span aria-hidden="true" />
          {showNames && <b>M15 · cúmul globular</b>}
        </div>
      </div>
    </div>
  );
}
