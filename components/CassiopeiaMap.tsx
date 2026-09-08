"use client";

import { useMemo, useState } from "react";

export type CassiopeiaPoint = {
  id: string;
  name: string;
  raHours: number;
  decDeg: number;
  magnitude: number;
  kind?: "warm" | "cool";
};

// ICRS positions at epoch J2000.0, verified with SIMBAD/CDS.
export const CASSIOPEIA_STARS: CassiopeiaPoint[] = [
  { id: "caph", name: "Caph", raHours: 0 + 9 / 60 + 10.68518 / 3600, decDeg: 59 + 8 / 60 + 59.212 / 3600, magnitude: 2.27, kind: "cool" },
  { id: "schedar", name: "Schedar", raHours: 0 + 40 / 60 + 30.4430418459 / 3600, decDeg: 56 + 32 / 60 + 14.385181354 / 3600, magnitude: 2.23, kind: "warm" },
  { id: "gamma", name: "γ Cassiopeiae", raHours: 0 + 56 / 60 + 42.5310945 / 3600, decDeg: 60 + 43 / 60 + 0.264089 / 3600, magnitude: 2.39, kind: "cool" },
  { id: "ruchbah", name: "Ruchbah", raHours: 1 + 25 / 60 + 48.9514709 / 3600, decDeg: 60 + 14 / 60 + 7.022507 / 3600, magnitude: 2.68, kind: "cool" },
  { id: "segin", name: "Segin", raHours: 1 + 54 / 60 + 23.734086168 / 3600, decDeg: 63 + 40 / 60 + 12.360239 / 3600, magnitude: 3.37, kind: "cool" },
];

export const CASSIOPEIA_LINES = [
  ["caph", "schedar"],
  ["schedar", "gamma"],
  ["gamma", "ruchbah"],
  ["ruchbah", "segin"],
] as const;

export const CASSIOPEIA_CLUSTERS = [
  { id: "m52", name: "M52 · cúmul obert", raHours: 23 + 24 / 60 + 46.8 / 3600, decDeg: 61 + 35 / 60 + 24 / 3600 },
  { id: "ngc457", name: "NGC 457 · cúmul obert", raHours: 1 + 19 / 60 + 32.9 / 3600, decDeg: 58 + 16 / 60 + 41 / 3600 },
] as const;

const CENTER_RA_HOURS = 24.75;
const CENTER_DEC_DEG = 60;
const SPAN_X_DEG = 24;
const SPAN_Y_DEG = 13;

function unwrapRaHours(raHours: number) {
  return raHours < 12 ? raHours + 24 : raHours;
}

export function projectCassiopeia(point: Pick<CassiopeiaPoint, "raHours" | "decDeg">) {
  const deltaRa = (unwrapRaHours(point.raHours) * 15 - CENTER_RA_HOURS * 15) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return {
    x: 50 + deltaRa / SPAN_X_DEG * 100,
    y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100,
  };
}

function diameter(magnitude: number) {
  return Math.max(4, 13.5 - magnitude * 2.2);
}

export default function CassiopeiaMap() {
  const [showStars, setShowStars] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [showMyth, setShowMyth] = useState(false);
  const projected = useMemo(() => CASSIOPEIA_STARS.map(point => ({ ...point, ...projectCassiopeia(point) })), []);
  const byId = useMemo(() => Object.fromEntries(projected.map(point => [point.id, point])), [projected]);
  const clusters = useMemo(() => CASSIOPEIA_CLUSTERS.map(point => ({ ...point, ...projectCassiopeia(point) })), []);

  return (
    <div className="map-shell">
      <div className="map-toolbar" aria-label="Controls del mapa">
        <button className={showStars ? "active" : ""} aria-pressed={showStars} onClick={() => setShowStars(!showStars)}>Estrelles</button>
        <button className={showLines ? "active" : ""} aria-pressed={showLines} onClick={() => setShowLines(!showLines)}>Línies</button>
        <button className={showNames ? "active" : ""} aria-pressed={showNames} onClick={() => setShowNames(!showNames)}>Noms</button>
        <button className={showMyth ? "active" : ""} aria-pressed={showMyth} onClick={() => setShowMyth(!showMyth)}>Figura mitològica</button>
        <span className="map-coordinate-badge">ICRS · època J2000.0</span>
      </div>
      <div className="star-map accurate-map cassiopeia-map" role="img" aria-label="Mapa de Cassiopea projectat a partir de coordenades equatorials ICRS referides a l’època J2000.0">
        <div className="star-dust" aria-hidden="true" />
        <div className="sky-orientation" aria-hidden="true"><span>O</span><b>mirant cap al nord</b><span>E</span></div>

        {showMyth && (
          <svg className="myth-overlay detailed cassiopeia-myth" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="cassiopeia-head" d={`M ${byId.gamma.x - 3} ${byId.gamma.y - 1} Q ${byId.gamma.x - 3.5} ${byId.gamma.y - 7} ${byId.gamma.x} ${byId.gamma.y - 8} Q ${byId.gamma.x + 3.5} ${byId.gamma.y - 7} ${byId.gamma.x + 3} ${byId.gamma.y - 1}`} />
            <path className="cassiopeia-shoulders" d={`M ${byId.caph.x - 1} ${byId.caph.y} Q ${byId.gamma.x} ${byId.gamma.y + 1} ${byId.ruchbah.x + 1} ${byId.ruchbah.y}`} />
            <path className="cassiopeia-body" d={`M ${byId.gamma.x} ${byId.gamma.y + 1} Q ${byId.gamma.x + 2} ${byId.schedar.y - 8} ${byId.schedar.x} ${byId.schedar.y - 1} Q ${byId.ruchbah.x + 7} ${byId.ruchbah.y + 16} ${byId.ruchbah.x - 1} ${byId.ruchbah.y + 22}`} />
            <path className="cassiopeia-arms" d={`M ${byId.gamma.x - 1} ${byId.gamma.y + 3} Q ${byId.caph.x - 8} ${byId.caph.y - 3} ${byId.caph.x} ${byId.caph.y} M ${byId.gamma.x + 1} ${byId.gamma.y + 3} Q ${byId.ruchbah.x + 6} ${byId.ruchbah.y - 4} ${byId.ruchbah.x} ${byId.ruchbah.y}`} />
            <path className="cassiopeia-throne" d={`M ${byId.caph.x + 4} ${byId.caph.y - 9} L ${byId.caph.x + 4} ${byId.schedar.y + 7} Q ${byId.schedar.x - 8} ${byId.schedar.y + 12} ${byId.ruchbah.x - 5} ${byId.ruchbah.y + 22} L ${byId.segin.x - 3} ${byId.segin.y + 3} M ${byId.caph.x + 4} ${byId.caph.y + 5} L ${byId.ruchbah.x - 3} ${byId.ruchbah.y + 10}`} />
          </svg>
        )}

        {showLines && (
          <svg className="constellation-lines cassiopeia-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {CASSIOPEIA_LINES.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
          </svg>
        )}

        {showStars && projected.map(point => {
          const d = diameter(point.magnitude);
          return (
            <div className={`map-star ${point.kind ?? ""} cassiopeia-star-${point.id}`} key={point.id} style={{ left: `${point.x}%`, top: `${point.y}%`, width: d, height: d }}>
              {showNames && <span className={`star-label label-cassiopeia-${point.id}`}>{point.name}</span>}
            </div>
          );
        })}

        {clusters.map(cluster => (
          <div className={`cassiopeia-cluster-marker cluster-${cluster.id}`} key={cluster.id} style={{ left: `${cluster.x}%`, top: `${cluster.y}%` }}>
            <span aria-hidden="true" />
            {showNames && <b>{cluster.name}</b>}
          </div>
        ))}
      </div>
    </div>
  );
}
