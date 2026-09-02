"use client";

import { useMemo, useState } from "react";

export type GeminiPoint = {
  id: string;
  name: string;
  raHours: number;
  decDeg: number;
  magnitude: number;
  kind?: "warm" | "cool";
};

// ICRS positions at epoch J2000.0, verified with SIMBAD/CDS.
export const GEMINI_STARS: GeminiPoint[] = [
  { id: "pollux", name: "Pòl·lux", raHours: 7 + 45 / 60 + 18.94987 / 3600, decDeg: 28 + 1 / 60 + 34.316 / 3600, magnitude: 1.14, kind: "warm" },
  { id: "castor", name: "Càstor", raHours: 7 + 34 / 60 + 35.87319 / 3600, decDeg: 31 + 53 / 60 + 17.816 / 3600, magnitude: 1.58, kind: "cool" },
  { id: "alhena", name: "Alhena", raHours: 6 + 37 / 60 + 42.7105 / 3600, decDeg: 16 + 23 / 60 + 57.4095 / 3600, magnitude: 1.93, kind: "cool" },
  { id: "wasat", name: "Wasat", raHours: 7 + 20 / 60 + 7.3745658105 / 3600, decDeg: 21 + 58 / 60 + 56.294578663 / 3600, magnitude: 3.53 },
  { id: "mebsuta", name: "Mebsuta", raHours: 6 + 43 / 60 + 55.9271511904 / 3600, decDeg: 25 + 7 / 60 + 52.057892524 / 3600, magnitude: 3.06 },
  { id: "mekbuda", name: "Mekbuda", raHours: 7 + 4 / 60 + 6.531238469 / 3600, decDeg: 20 + 34 / 60 + 13.074474962 / 3600, magnitude: 4.0 },
  { id: "tejat", name: "Tejat", raHours: 6 + 22 / 60 + 57.62686 / 3600, decDeg: 22 + 30 / 60 + 48.8979 / 3600, magnitude: 2.87 },
  { id: "propus", name: "Propus", raHours: 6 + 14 / 60 + 52.6452865329 / 3600, decDeg: 22 + 30 / 60 + 24.434377815 / 3600, magnitude: 3.15 },
];

// Two separate chains keep the two figures readable instead of merging them.
export const GEMINI_LINES = [
  ["castor", "mebsuta"],
  ["mebsuta", "tejat"],
  ["tejat", "propus"],
  ["pollux", "wasat"],
  ["wasat", "mekbuda"],
  ["mekbuda", "alhena"],
] as const;

export const GEMINI_M35 = {
  id: "m35",
  name: "M35",
  raHours: 6 + 9 / 60 + 5.3 / 3600,
  decDeg: 24 + 20 / 60 + 10 / 3600,
};

const CENTER_RA_DEG = 7 * 15;
const CENTER_DEC_DEG = 24;
const SPAN_X_DEG = 30;
const SPAN_Y_DEG = 22;

export function projectGemini(point: Pick<GeminiPoint, "raHours" | "decDeg">) {
  const deltaRa = (point.raHours * 15 - CENTER_RA_DEG) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return {
    x: 50 - deltaRa / SPAN_X_DEG * 100,
    y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100,
  };
}

function diameter(magnitude: number) {
  return Math.max(4, 13 - magnitude * 2.05);
}

export default function GeminiMap() {
  const [showStars, setShowStars] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [showMyth, setShowMyth] = useState(false);
  const projected = useMemo(() => GEMINI_STARS.map(point => ({ ...point, ...projectGemini(point) })), []);
  const byId = useMemo(() => Object.fromEntries(projected.map(point => [point.id, point])), [projected]);
  const m35 = projectGemini(GEMINI_M35);

  return (
    <div className="map-shell">
      <div className="map-toolbar" aria-label="Controls del mapa">
        <button className={showStars ? "active" : ""} aria-pressed={showStars} onClick={() => setShowStars(!showStars)}>Estrelles</button>
        <button className={showLines ? "active" : ""} aria-pressed={showLines} onClick={() => setShowLines(!showLines)}>Línies</button>
        <button className={showNames ? "active" : ""} aria-pressed={showNames} onClick={() => setShowNames(!showNames)}>Noms</button>
        <button className={showMyth ? "active" : ""} aria-pressed={showMyth} onClick={() => setShowMyth(!showMyth)}>Figura mitològica</button>
        <span className="map-coordinate-badge">ICRS · època J2000.0</span>
      </div>
      <div className="star-map accurate-map gemini-map" role="img" aria-label="Mapa de Bessons projectat a partir de coordenades equatorials ICRS referides a l’època J2000.0">
        <div className="star-dust" aria-hidden="true" />
        <div className="sky-orientation" aria-hidden="true"><span>E</span><b>mirant cap al sud</b><span>O</span></div>
        {showMyth && (
          <svg className="myth-overlay detailed gemini-myth" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <circle cx={byId.pollux.x} cy={byId.pollux.y} r="3.15" />
            <circle cx={byId.castor.x} cy={byId.castor.y} r="3.15" />
            <path d={`M ${byId.pollux.x} ${byId.pollux.y + 3.2} Q ${byId.wasat.x - 2} ${byId.wasat.y - 6} ${byId.wasat.x} ${byId.wasat.y} Q ${byId.mekbuda.x - 2} ${byId.mekbuda.y - 2} ${byId.mekbuda.x} ${byId.mekbuda.y}`} />
            <path d={`M ${byId.pollux.x - 1.4} ${byId.pollux.y + 3.2} Q ${byId.wasat.x - 7} ${byId.wasat.y - 1} ${byId.wasat.x - 5} ${byId.wasat.y + 7}`} />
            <path d={`M ${byId.wasat.x} ${byId.wasat.y} Q ${byId.wasat.x + 7} ${byId.wasat.y + 1} ${byId.mekbuda.x} ${byId.mekbuda.y}`} />
            <path d={`M ${byId.mekbuda.x} ${byId.mekbuda.y} Q ${byId.alhena.x - 2} ${byId.alhena.y - 4} ${byId.alhena.x} ${byId.alhena.y}`} />
            <path d={`M ${byId.mekbuda.x} ${byId.mekbuda.y} Q ${byId.mekbuda.x - 8} ${byId.mekbuda.y + 10} ${byId.mekbuda.x - 7} ${byId.mekbuda.y + 17}`} />

            <path d={`M ${byId.castor.x} ${byId.castor.y + 3.2} Q ${byId.mebsuta.x - 4} ${byId.mebsuta.y - 5} ${byId.mebsuta.x} ${byId.mebsuta.y} Q ${byId.tejat.x - 4} ${byId.tejat.y - 1} ${byId.tejat.x} ${byId.tejat.y}`} />
            <path d={`M ${byId.castor.x + 1.3} ${byId.castor.y + 3.2} Q ${byId.mebsuta.x + 5} ${byId.mebsuta.y - 4} ${byId.mebsuta.x + 8} ${byId.mebsuta.y + 4}`} />
            <path d={`M ${byId.mebsuta.x} ${byId.mebsuta.y} Q ${byId.mebsuta.x - 8} ${byId.mebsuta.y + 8} ${byId.tejat.x} ${byId.tejat.y}`} />
            <path d={`M ${byId.tejat.x} ${byId.tejat.y} Q ${byId.propus.x - 1} ${byId.propus.y + 6} ${byId.propus.x} ${byId.propus.y}`} />
            <path d={`M ${byId.tejat.x} ${byId.tejat.y} Q ${byId.tejat.x - 7} ${byId.tejat.y + 11} ${byId.tejat.x - 4} ${byId.tejat.y + 17}`} />
          </svg>
        )}
        {showLines && (
          <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {GEMINI_LINES.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
          </svg>
        )}
        {showStars && projected.map(point => {
          const d = diameter(point.magnitude);
          return (
            <div className={`map-star ${point.kind ?? ""}`} key={point.id} style={{ left: `${point.x}%`, top: `${point.y}%`, width: d, height: d }}>
              {showNames && <span className={`star-label label-${point.id}`}>{point.name}</span>}
            </div>
          );
        })}
        <div className="m42-marker m35-marker" style={{ left: `${m35.x}%`, top: `${m35.y}%` }}>
          <span>✦</span>{showNames && <b>M35 · cúmul obert</b>}
        </div>
      </div>
    </div>
  );
}
