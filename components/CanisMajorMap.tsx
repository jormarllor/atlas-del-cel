"use client";

import { useMemo, useState } from "react";

export type CanisMajorPoint = {
  id: string;
  name: string;
  raHours: number;
  decDeg: number;
  magnitude: number;
  kind?: "sirius";
};

// ICRS positions at epoch J2000.0, verified with SIMBAD/CDS.
export const CANIS_MAJOR_STARS: CanisMajorPoint[] = [
  { id: "sirius", name: "Sirius", raHours: 6 + 45 / 60 + 8.91728 / 3600, decDeg: -(16 + 42 / 60 + 58.0171 / 3600), magnitude: -1.46, kind: "sirius" },
  { id: "mirzam", name: "Mirzam", raHours: 6 + 22 / 60 + 41.9853527 / 3600, decDeg: -(17 + 57 / 60 + 21.307352 / 3600), magnitude: 1.98 },
  { id: "wezen", name: "Wezen", raHours: 7 + 8 / 60 + 23.4840514 / 3600, decDeg: -(26 + 23 / 60 + 35.518484 / 3600), magnitude: 1.83 },
  { id: "adhara", name: "Adhara", raHours: 6 + 58 / 60 + 37.54876 / 3600, decDeg: -(28 + 58 / 60 + 19.5102 / 3600), magnitude: 1.5 },
  { id: "aludra", name: "Aludra", raHours: 7 + 24 / 60 + 5.70228 / 3600, decDeg: -(29 + 18 / 60 + 11.1798 / 3600), magnitude: 2.45 },
  { id: "furud", name: "Furud", raHours: 6 + 20 / 60 + 18.7920398 / 3600, decDeg: -(30 + 3 / 60 + 48.120242 / 3600), magnitude: 3.02 },
];

export const CANIS_MAJOR_LINES = [
  ["mirzam", "sirius"],
  ["sirius", "wezen"],
  ["wezen", "aludra"],
  ["wezen", "adhara"],
  ["adhara", "furud"],
] as const;

export const M41 = {
  id: "m41",
  name: "M41",
  raHours: 6 + 45 / 60 + 59.8 / 3600,
  decDeg: -(20 + 42 / 60 + 58 / 3600),
};

const CENTER_RA_DEG = 6.88 * 15;
const CENTER_DEC_DEG = -23;
const SPAN_X_DEG = 20;
const SPAN_Y_DEG = 18;

export function projectCanisMajor(point: Pick<CanisMajorPoint, "raHours" | "decDeg">) {
  const deltaRa = (point.raHours * 15 - CENTER_RA_DEG) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return {
    x: 50 - deltaRa / SPAN_X_DEG * 100,
    y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100,
  };
}

function diameter(magnitude: number) {
  return Math.max(4, 13 - magnitude * 2.1);
}

export default function CanisMajorMap() {
  const [showStars, setShowStars] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [showMyth, setShowMyth] = useState(false);
  const projected = useMemo(() => CANIS_MAJOR_STARS.map(point => ({ ...point, ...projectCanisMajor(point) })), []);
  const byId = useMemo(() => Object.fromEntries(projected.map(point => [point.id, point])), [projected]);
  const m41 = projectCanisMajor(M41);

  return (
    <div className="map-shell">
      <div className="map-toolbar" aria-label="Controls del mapa">
        <button className={showStars ? "active" : ""} aria-pressed={showStars} onClick={() => setShowStars(!showStars)}>Estrelles</button>
        <button className={showLines ? "active" : ""} aria-pressed={showLines} onClick={() => setShowLines(!showLines)}>Línies</button>
        <button className={showNames ? "active" : ""} aria-pressed={showNames} onClick={() => setShowNames(!showNames)}>Noms</button>
        <button className={showMyth ? "active" : ""} aria-pressed={showMyth} onClick={() => setShowMyth(!showMyth)}>Figura mitològica</button>
        <span className="map-coordinate-badge">ICRS · època J2000.0</span>
      </div>
      <div className="star-map accurate-map canis-major-map" role="img" aria-label="Mapa de Ca Major projectat a partir de coordenades equatorials ICRS referides a l’època J2000.0">
        <div className="star-dust" aria-hidden="true" />
        <div className="sky-orientation" aria-hidden="true"><span>E</span><b>mirant cap al sud</b><span>O</span></div>
        {showMyth && (
          <svg className="myth-overlay detailed canis-major-myth" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path
              className="canis-major-myth-outline"
              d={`M ${byId.sirius.x} ${byId.sirius.y}
                Q ${byId.sirius.x + 12} ${byId.sirius.y + 6} ${byId.mirzam.x} ${byId.mirzam.y}
                Q ${byId.mirzam.x - 2} ${byId.mirzam.y - 8} ${byId.sirius.x + 14} ${byId.sirius.y - 9}
                L ${byId.sirius.x + 7} ${byId.sirius.y - 9}
                L ${byId.sirius.x + 2} ${byId.sirius.y - 12}
                L ${byId.sirius.x - 2} ${byId.sirius.y - 6}
                Q ${byId.sirius.x - 5} ${byId.sirius.y + 20} ${byId.sirius.x - 7} ${byId.wezen.y - 20}
                Q ${byId.wezen.x + 10} ${byId.wezen.y - 14} ${byId.wezen.x} ${byId.wezen.y}
                Q ${byId.aludra.x + 10} ${byId.aludra.y - 18} ${byId.aludra.x} ${byId.aludra.y}`}
            />
            <path
              className="canis-major-myth-outline"
              d={`M ${byId.sirius.x} ${byId.sirius.y}
                Q ${byId.sirius.x + 7} ${byId.sirius.y + 20} ${byId.sirius.x + 6} ${byId.wezen.y - 19}
                Q ${byId.furud.x - 12} ${byId.wezen.y + 1} ${byId.furud.x} ${byId.furud.y}
                Q ${byId.furud.x - 6} ${byId.furud.y + 1} ${byId.furud.x - 12} ${byId.furud.y - 1}
                Q ${byId.wezen.x + 24} ${byId.wezen.y + 3} ${byId.wezen.x + 15} ${byId.wezen.y + 3}
                Q ${byId.adhara.x + 7} ${byId.adhara.y - 5} ${byId.adhara.x} ${byId.adhara.y}
                Q ${byId.adhara.x - 4} ${byId.adhara.y + 1} ${byId.adhara.x - 7} ${byId.adhara.y - 1}
                Q ${byId.wezen.x - 1} ${byId.wezen.y + 7} ${byId.wezen.x} ${byId.wezen.y}`}
            />
            <path
              className="canis-major-myth-detail"
              d={`M ${byId.sirius.x + 4} ${byId.sirius.y - 8}
                L ${byId.sirius.x + 13} ${byId.sirius.y - 4}
                L ${byId.sirius.x + 5} ${byId.sirius.y + 6}`}
            />
          </svg>
        )}
        {showLines && (
          <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {CANIS_MAJOR_LINES.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}
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
        <div className="m42-marker m41-marker" style={{ left: `${m41.x}%`, top: `${m41.y}%` }}>
          <span>✦</span>{showNames && <b>M41 · cúmul obert</b>}
        </div>
      </div>
    </div>
  );
}
