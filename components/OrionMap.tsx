"use client";

import { useMemo, useState } from "react";

type Star = {
  id: string;
  name: string;
  raHours: number;
  decDeg: number;
  magnitude: number;
  tone?: "warm" | "cool";
};

const stars: Star[] = [
  { id: "meissa", name: "Meissa", raHours: 5 + 35 / 60 + 8.28 / 3600, decDeg: 9 + 56 / 60 + 2.9 / 3600, magnitude: 3.39, tone: "cool" },
  { id: "betelgeuse", name: "Betelgeuse", raHours: 5 + 55 / 60 + 10.30536 / 3600, decDeg: 7 + 24 / 60 + 25.4304 / 3600, magnitude: 0.5, tone: "warm" },
  { id: "bellatrix", name: "Bellatrix", raHours: 5 + 25 / 60 + 7.86325 / 3600, decDeg: 6 + 20 / 60 + 58.9318 / 3600, magnitude: 1.64, tone: "cool" },
  { id: "alnitak", name: "Alnitak", raHours: 5 + 40 / 60 + 45.52666 / 3600, decDeg: -(1 + 56 / 60 + 33.2649 / 3600), magnitude: 1.77, tone: "cool" },
  { id: "alnilam", name: "Alnilam", raHours: 5 + 36 / 60 + 12.81335 / 3600, decDeg: -(1 + 12 / 60 + 6.9089 / 3600), magnitude: 1.69, tone: "cool" },
  { id: "mintaka", name: "Mintaka", raHours: 5 + 32 / 60 + 0.40009 / 3600, decDeg: -(0 + 17 / 60 + 56.7424 / 3600), magnitude: 2.23, tone: "cool" },
  { id: "saiph", name: "Saiph", raHours: 5 + 47 / 60 + 45.39 / 3600, decDeg: -(9 + 40 / 60 + 10.6 / 3600), magnitude: 2.06, tone: "cool" },
  { id: "rigel", name: "Rigel", raHours: 5 + 14 / 60 + 32.2721 / 3600, decDeg: -(8 + 12 / 60 + 5.8981 / 3600), magnitude: 0.13, tone: "cool" },
  { id: "hatysa", name: "Hatysa", raHours: 5 + 35 / 60 + 25.98 / 3600, decDeg: -(5 + 54 / 60 + 35.6 / 3600), magnitude: 2.77, tone: "cool" },
];

const lines = [
  ["meissa", "betelgeuse"], ["meissa", "bellatrix"],
  ["betelgeuse", "alnitak"], ["bellatrix", "mintaka"],
  ["alnitak", "alnilam"], ["alnilam", "mintaka"],
  ["alnitak", "saiph"], ["mintaka", "rigel"],
  ["saiph", "rigel"], ["alnilam", "hatysa"],
] as const;

const CENTER_RA_DEG = (5 + 35 / 60) * 15;
const CENTER_DEC_DEG = 0;
const SPAN_X_DEG = 24;
const SPAN_Y_DEG = 20;

function project(star: Pick<Star, "raHours" | "decDeg">) {
  const raDeg = star.raHours * 15;
  const deltaRa = (raDeg - CENTER_RA_DEG) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  // When facing south, east is on the left: increasing RA goes left.
  return {
    x: 50 - (deltaRa / SPAN_X_DEG) * 100,
    y: 50 - ((star.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG) * 100,
  };
}

function starDiameter(magnitude: number) {
  return Math.max(5, 15 - magnitude * 2.4);
}

export default function OrionMap() {
  const [showStars, setShowStars] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [showMyth, setShowMyth] = useState(false);

  const projectedStars = useMemo(
    () => stars.map((star) => ({ ...star, ...project(star) })),
    [],
  );
  const starById = useMemo(
    () => Object.fromEntries(projectedStars.map((star) => [star.id, star])),
    [projectedStars],
  );

  const alnilam = starById.alnilam;
  const hatysa = starById.hatysa;
  const m42x = alnilam.x + (hatysa.x - alnilam.x) * 1.34;
  const m42y = alnilam.y + (hatysa.y - alnilam.y) * 1.34;

  return (
    <div className="map-shell">
      <div className="map-toolbar" aria-label="Controls del mapa">
        <button className={showStars ? "active" : ""} aria-pressed={showStars} onClick={() => setShowStars(!showStars)}>Estrelles</button>
        <button className={showLines ? "active" : ""} aria-pressed={showLines} onClick={() => setShowLines(!showLines)}>Línies</button>
        <button className={showNames ? "active" : ""} aria-pressed={showNames} onClick={() => setShowNames(!showNames)}>Noms</button>
        <button className={showMyth ? "active" : ""} aria-pressed={showMyth} onClick={() => setShowMyth(!showMyth)}>Figura mitològica</button>
        <span className="map-coordinate-badge">ICRS · època J2000.0</span>
      </div>

      <div className="star-map accurate-map" role="img" aria-label="Mapa d’Orió projectat a partir de coordenades equatorials ICRS referides a l’època J2000.0">
        <div className="star-dust" aria-hidden="true" />
        <div className="sky-orientation" aria-hidden="true"><span>E</span><b>mirant cap al sud</b><span>O</span></div>

        {showMyth && (
          <svg className="myth-overlay detailed" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M51 10 C47 13,46 18,50 21 C55 19,55 13,51 10 Z" />
            <path d="M50 21 C42 29,40 39,44 50 C47 60,44 71,38 91" />
            <path d="M52 21 C60 29,64 39,60 50 C59 61,65 73,75 89" />
            <path d="M43 32 C35 35,29 40,23 44" /><path d="M60 32 C69 26,75 20,80 15" />
            <path d="M43 47 C49 50,56 50,61 47" />
          </svg>
        )}

        {showLines && (
          <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {lines.map(([a, b]) => (
              <line key={`${a}-${b}`} x1={starById[a].x} y1={starById[a].y} x2={starById[b].x} y2={starById[b].y} />
            ))}
          </svg>
        )}

        {showStars && projectedStars.map((star) => {
          const d = starDiameter(star.magnitude);
          return (
            <div
              className={`map-star ${star.tone ?? ""}`}
              key={star.id}
              style={{ left: `${star.x}%`, top: `${star.y}%`, width: d, height: d }}
            >
              {showNames && <span className={`star-label label-${star.id}`}>{star.name}</span>}
            </div>
          );
        })}

        <div className="m42-marker" style={{ left: `${m42x}%`, top: `${m42y}%` }}>
          <span>✧</span>{showNames && <b>M42 · Nebulosa d’Orió</b>}
        </div>
      </div>
    </div>
  );
}
