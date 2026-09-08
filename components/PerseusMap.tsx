"use client";

import { useMemo, useState } from "react";

export type PerseusPoint = {
  id: string;
  name: string;
  raHours: number;
  decDeg: number;
  magnitude: number;
  kind?: "warm" | "cool";
};

// ICRS positions at epoch J2000.0, verified with SIMBAD/CDS.
export const PERSEUS_STARS: PerseusPoint[] = [
  { id: "gamma", name: "γ Persei", raHours: 3 + 4 / 60 + 47.8201112829 / 3600, decDeg: 53 + 30 / 60 + 23.262605954 / 3600, magnitude: 2.93, kind: "warm" },
  { id: "mirfak", name: "Mirfak", raHours: 3 + 24 / 60 + 19.3700924 / 3600, decDeg: 49 + 51 / 60 + 40.245455 / 3600, magnitude: 1.79, kind: "warm" },
  { id: "delta", name: "δ Persei", raHours: 3 + 42 / 60 + 55.4928046977 / 3600, decDeg: 47 + 47 / 60 + 14.988257477 / 3600, magnitude: 3.01, kind: "cool" },
  { id: "epsilon", name: "ε Persei", raHours: 3 + 57 / 60 + 51.239381814 / 3600, decDeg: 40 + 36.719213615 / 3600, magnitude: 2.89, kind: "cool" },
  { id: "menkib", name: "Menkib", raHours: 3 + 58 / 60 + 57.9024302099 / 3600, decDeg: 35 + 47 / 60 + 27.709515737 / 3600, magnitude: 4.06, kind: "cool" },
  { id: "atik", name: "Atik", raHours: 3 + 44 / 60 + 19.1337687984 / 3600, decDeg: 32 + 17 / 60 + 17.68736796 / 3600, magnitude: 3.91, kind: "cool" },
  { id: "algol", name: "Algol", raHours: 3 + 8 / 60 + 10.1324535 / 3600, decDeg: 40 + 57 / 60 + 20.328013 / 3600, magnitude: 2.12, kind: "cool" },
];

export const PERSEUS_LINES = [
  ["gamma", "mirfak"],
  ["mirfak", "delta"],
  ["delta", "epsilon"],
  ["epsilon", "menkib"],
  ["menkib", "atik"],
  ["mirfak", "algol"],
] as const;

export const PERSEUS_CLUSTERS = [
  { id: "ngc869", name: "NGC 869", raHours: 2 + 18 / 60 + 57.8 / 3600, decDeg: 57 + 8 / 60 + 2 / 3600, group: "double" },
  { id: "ngc884", name: "NGC 884", raHours: 2 + 22 / 60 + 20.2 / 3600, decDeg: 57 + 8 / 60 + 56 / 3600, group: "double" },
  { id: "m34", name: "M34 · cúmul obert", raHours: 2 + 42 / 60 + 7.4 / 3600, decDeg: 42 + 43 / 60 + 19 / 3600, group: "single" },
] as const;

const CENTER_RA_HOURS = 3.2;
const CENTER_DEC_DEG = 44.5;
const SPAN_X_DEG = 30;
const SPAN_Y_DEG = 34;

export function projectPerseus(point: Pick<PerseusPoint, "raHours" | "decDeg">) {
  const deltaRa = (point.raHours * 15 - CENTER_RA_HOURS * 15) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return {
    x: 50 + deltaRa / SPAN_X_DEG * 100,
    y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100,
  };
}

function diameter(magnitude: number) {
  return Math.max(4, 14 - magnitude * 2.2);
}

export default function PerseusMap() {
  const [showStars, setShowStars] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [showMyth, setShowMyth] = useState(false);
  const projected = useMemo(() => PERSEUS_STARS.map(point => ({ ...point, ...projectPerseus(point) })), []);
  const byId = useMemo(() => Object.fromEntries(projected.map(point => [point.id, point])), [projected]);
  const clusters = useMemo(() => PERSEUS_CLUSTERS.map(point => ({ ...point, ...projectPerseus(point) })), []);

  return (
    <div className="map-shell">
      <div className="map-toolbar" aria-label="Controls del mapa">
        <button className={showStars ? "active" : ""} aria-pressed={showStars} onClick={() => setShowStars(!showStars)}>Estrelles</button>
        <button className={showLines ? "active" : ""} aria-pressed={showLines} onClick={() => setShowLines(!showLines)}>Línies</button>
        <button className={showNames ? "active" : ""} aria-pressed={showNames} onClick={() => setShowNames(!showNames)}>Noms</button>
        <button className={showMyth ? "active" : ""} aria-pressed={showMyth} onClick={() => setShowMyth(!showMyth)}>Figura mitològica</button>
        <span className="map-coordinate-badge">ICRS · època J2000.0</span>
      </div>
      <div className="star-map accurate-map perseus-map" role="img" aria-label="Mapa de Perseu projectat a partir de coordenades equatorials ICRS referides a l’època J2000.0">
        <div className="star-dust" aria-hidden="true" />
        <div className="sky-orientation" aria-hidden="true"><span>O</span><b>mirant cap al nord-est</b><span>E</span></div>

        {showMyth && (
          <svg className="myth-overlay detailed perseus-myth" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="perseus-head" d={`M ${byId.gamma.x - 3} ${byId.gamma.y + 1} Q ${byId.gamma.x - 3.5} ${byId.gamma.y - 6} ${byId.gamma.x} ${byId.gamma.y - 7} Q ${byId.gamma.x + 3.5} ${byId.gamma.y - 6} ${byId.gamma.x + 3} ${byId.gamma.y + 1}`} />
            <path className="perseus-torso" d={`M ${byId.gamma.x} ${byId.gamma.y + 2} Q ${byId.mirfak.x - 2} ${byId.mirfak.y - 2} ${byId.delta.x} ${byId.delta.y} Q ${byId.epsilon.x - 5} ${byId.epsilon.y - 4} ${byId.epsilon.x} ${byId.epsilon.y}`} />
            <path className="perseus-medusa-arm" d={`M ${byId.mirfak.x - 1} ${byId.mirfak.y + 2} Q ${byId.algol.x + 5} ${byId.algol.y - 6} ${byId.algol.x} ${byId.algol.y}`} />
            <path className="perseus-gorgon" d={`M ${byId.algol.x - 2.5} ${byId.algol.y + 1} Q ${byId.algol.x - 3.5} ${byId.algol.y - 3.5} ${byId.algol.x} ${byId.algol.y - 4.5} Q ${byId.algol.x + 3.5} ${byId.algol.y - 3.5} ${byId.algol.x + 2.5} ${byId.algol.y + 1}`} />
            <path className="perseus-sword-arm" d={`M ${byId.delta.x - 1} ${byId.delta.y + 1} Q ${byId.delta.x + 10} ${byId.delta.y + 1} ${byId.delta.x + 14} ${byId.delta.y - 8} M ${byId.delta.x + 14} ${byId.delta.y - 8} l 3 -7`} />
            <path className="perseus-legs" d={`M ${byId.epsilon.x} ${byId.epsilon.y} Q ${byId.menkib.x - 6} ${byId.menkib.y + 2} ${byId.atik.x} ${byId.atik.y} M ${byId.epsilon.x} ${byId.epsilon.y} Q ${byId.epsilon.x + 8} ${byId.menkib.y + 4} ${byId.menkib.x + 11} ${byId.menkib.y + 14}`} />
          </svg>
        )}

        {showLines && (
          <svg className="constellation-lines perseus-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {PERSEUS_LINES.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
          </svg>
        )}

        {showStars && projected.map(point => {
          const d = diameter(point.magnitude);
          return (
            <div className={`map-star ${point.kind ?? ""} perseus-star-${point.id}`} key={point.id} style={{ left: `${point.x}%`, top: `${point.y}%`, width: d, height: d }}>
              {showNames && <span className={`star-label label-perseus-${point.id}`}>{point.name}</span>}
            </div>
          );
        })}

        {clusters.map(cluster => (
          <div className={`perseus-cluster-marker cluster-${cluster.id}`} key={cluster.id} style={{ left: `${cluster.x}%`, top: `${cluster.y}%` }}>
            <span aria-hidden="true" />
            {showNames && <b>{cluster.name}</b>}
          </div>
        ))}
        {showNames && <span className="perseus-double-cluster-label">Doble Cúmul</span>}
      </div>
    </div>
  );
}
