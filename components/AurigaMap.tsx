"use client";

import { useMemo, useState } from "react";

export type AurigaPoint = {
  id: string;
  name: string;
  raHours: number;
  decDeg: number;
  magnitude: number;
  kind?: "warm" | "cool" | "neighbor";
};

// ICRS positions at epoch J2000.0, verified with SIMBAD/CDS.
export const AURIGA_STARS: AurigaPoint[] = [
  { id: "capella", name: "Capella", raHours: 5 + 16 / 60 + 41.35871 / 3600, decDeg: 45 + 59 / 60 + 52.7693 / 3600, magnitude: 0.08, kind: "warm" },
  { id: "menkalinan", name: "Menkalinan", raHours: 5 + 59 / 60 + 31.7229284 / 3600, decDeg: 44 + 56 / 60 + 50.757259 / 3600, magnitude: 1.9, kind: "cool" },
  { id: "mahasim", name: "Mahasim", raHours: 5 + 59 / 60 + 43.27012 / 3600, decDeg: 37 + 12 / 60 + 45.3047 / 3600, magnitude: 2.62, kind: "cool" },
  { id: "almaaz", name: "Almaaz", raHours: 5 + 1 / 60 + 58.134368676 / 3600, decDeg: 43 + 49 / 60 + 23.917115316 / 3600, magnitude: 3.03 },
  { id: "hassaleh", name: "Hassaleh", raHours: 4 + 56 / 60 + 59.6200224533 / 3600, decDeg: 33 + 9 / 60 + 57.937579478 / 3600, magnitude: 2.69, kind: "warm" },
  { id: "elnath", name: "Elnath · Taure", raHours: 5 + 26 / 60 + 17.51312 / 3600, decDeg: 28 + 36 / 60 + 26.8262 / 3600, magnitude: 1.65, kind: "neighbor" },
];

export const AURIGA_LINES = [
  ["capella", "menkalinan"],
  ["menkalinan", "mahasim"],
  ["mahasim", "elnath"],
  ["elnath", "hassaleh"],
  ["hassaleh", "capella"],
] as const;

export const AURIGA_CLUSTERS = [
  { id: "m38", name: "M38", raHours: 5 + 28 / 60 + 40.1 / 3600, decDeg: 35 + 49 / 60 + 26 / 3600 },
  { id: "m36", name: "M36", raHours: 5 + 36 / 60 + 20.2 / 3600, decDeg: 34 + 8 / 60 + 6 / 3600 },
  { id: "m37", name: "M37", raHours: 5 + 52 / 60 + 17.8 / 3600, decDeg: 32 + 32 / 60 + 42 / 3600 },
];

const CENTER_RA_DEG = 5.45 * 15;
const CENTER_DEC_DEG = 38;
const SPAN_X_DEG = 24;
const SPAN_Y_DEG = 22;

export function projectAuriga(point: Pick<AurigaPoint, "raHours" | "decDeg">) {
  const deltaRa = (point.raHours * 15 - CENTER_RA_DEG) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return {
    x: 50 - deltaRa / SPAN_X_DEG * 100,
    y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100,
  };
}

function diameter(magnitude: number) {
  return Math.max(4, 14 - magnitude * 2.2);
}

export default function AurigaMap() {
  const [showStars, setShowStars] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [showMyth, setShowMyth] = useState(false);
  const projected = useMemo(() => AURIGA_STARS.map(point => ({ ...point, ...projectAuriga(point) })), []);
  const byId = useMemo(() => Object.fromEntries(projected.map(point => [point.id, point])), [projected]);
  const clusters = useMemo(() => AURIGA_CLUSTERS.map(point => ({ ...point, ...projectAuriga(point) })), []);

  return (
    <div className="map-shell">
      <div className="map-toolbar" aria-label="Controls del mapa">
        <button className={showStars ? "active" : ""} aria-pressed={showStars} onClick={() => setShowStars(!showStars)}>Estrelles</button>
        <button className={showLines ? "active" : ""} aria-pressed={showLines} onClick={() => setShowLines(!showLines)}>Línies</button>
        <button className={showNames ? "active" : ""} aria-pressed={showNames} onClick={() => setShowNames(!showNames)}>Noms</button>
        <button className={showMyth ? "active" : ""} aria-pressed={showMyth} onClick={() => setShowMyth(!showMyth)}>Figura mitològica</button>
        <span className="map-coordinate-badge">ICRS · època J2000.0</span>
      </div>
      <div className="star-map accurate-map auriga-map" role="img" aria-label="Mapa d’Auriga projectat a partir de coordenades equatorials ICRS referides a l’època J2000.0">
        <div className="star-dust" aria-hidden="true" />
        <div className="sky-orientation" aria-hidden="true"><span>E</span><b>mirant cap al sud</b><span>O</span></div>
        {showMyth && (
          <svg className="myth-overlay detailed auriga-myth" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="auriga-human" d={`M ${byId.menkalinan.x + 2} ${byId.menkalinan.y + 6} Q ${byId.menkalinan.x + 5} ${byId.menkalinan.y + 1} ${byId.menkalinan.x + 2} ${byId.menkalinan.y - 2} Q ${byId.menkalinan.x - 2} ${byId.menkalinan.y - 4} ${byId.menkalinan.x - 3} ${byId.menkalinan.y + 1} Q ${byId.menkalinan.x - 2} ${byId.menkalinan.y + 5} ${byId.menkalinan.x + 2} ${byId.menkalinan.y + 6} M ${byId.menkalinan.x} ${byId.menkalinan.y + 6} Q ${byId.mahasim.x + 2} ${byId.mahasim.y - 7} ${byId.mahasim.x} ${byId.mahasim.y + 2} Q ${byId.elnath.x - 3} ${byId.elnath.y - 11} ${byId.elnath.x - 1} ${byId.elnath.y - 3} M ${byId.mahasim.x} ${byId.mahasim.y + 2} Q ${byId.m38?.x ?? byId.mahasim.x + 12} ${byId.mahasim.y + 10} ${byId.elnath.x - 10} ${byId.elnath.y + 2}`} />
            <path className="auriga-arm" d={`M ${byId.menkalinan.x - 1} ${byId.menkalinan.y + 8} Q ${byId.capella.x - 7} ${byId.capella.y + 5} ${byId.capella.x - 2} ${byId.capella.y + 1} M ${byId.menkalinan.x + 1} ${byId.menkalinan.y + 8} Q ${byId.mahasim.x + 9} ${byId.mahasim.y - 3} ${byId.mahasim.x + 3} ${byId.mahasim.y + 3}`} />
            <path className="auriga-goat" d={`M ${byId.capella.x - 8} ${byId.capella.y + 2} Q ${byId.capella.x - 5} ${byId.capella.y - 4} ${byId.capella.x + 1} ${byId.capella.y - 1} Q ${byId.capella.x + 7} ${byId.capella.y + 2} ${byId.capella.x + 4} ${byId.capella.y + 7} Q ${byId.almaaz.x - 2} ${byId.almaaz.y + 1} ${byId.almaaz.x + 2} ${byId.almaaz.y + 5} M ${byId.capella.x - 3} ${byId.capella.y - 1} l -3 -3 M ${byId.capella.x} ${byId.capella.y - 1} l 1 -4`} />
          </svg>
        )}
        {showLines && (
          <svg className="constellation-lines auriga-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {AURIGA_LINES.map(([a, b]) => <line className={a === "elnath" || b === "elnath" ? "neighbor-segment" : ""} key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
          </svg>
        )}
        {showStars && projected.map(point => {
          const d = diameter(point.magnitude);
          return (
            <div className={`map-star ${point.kind ?? ""} auriga-star-${point.id}`} key={point.id} style={{ left: `${point.x}%`, top: `${point.y}%`, width: d, height: d }}>
              {showNames && <span className={`star-label label-${point.id}`}>{point.name}</span>}
            </div>
          );
        })}
        {clusters.map(cluster => (
          <div className={`deep-sky-marker auriga-cluster-marker marker-${cluster.id}`} key={cluster.id} style={{ left: `${cluster.x}%`, top: `${cluster.y}%` }}>
            <span aria-hidden="true">✦</span>{showNames && <b>{cluster.name} · cúmul obert</b>}
          </div>
        ))}
      </div>
    </div>
  );
}
