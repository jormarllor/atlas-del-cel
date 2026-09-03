"use client";

import { useMemo, useState } from "react";

type RouteId = "from-taurus" | "deep-sky";

const points = {
  aldebaran: { name: "Aldebaran", raHours: 4 + 35 / 60 + 55.24 / 3600, decDeg: 16 + 30 / 60 + 33.5 / 3600 },
  elnath: { name: "Elnath · Taure", raHours: 5 + 26 / 60 + 17.51312 / 3600, decDeg: 28 + 36 / 60 + 26.8262 / 3600 },
  hassaleh: { name: "Hassaleh", raHours: 4 + 56 / 60 + 59.6200224533 / 3600, decDeg: 33 + 9 / 60 + 57.937579478 / 3600 },
  capella: { name: "Capella", raHours: 5 + 16 / 60 + 41.35871 / 3600, decDeg: 45 + 59 / 60 + 52.7693 / 3600 },
  m38: { name: "M38", raHours: 5 + 28 / 60 + 40.1 / 3600, decDeg: 35 + 49 / 60 + 26 / 3600 },
  m36: { name: "M36", raHours: 5 + 36 / 60 + 20.2 / 3600, decDeg: 34 + 8 / 60 + 6 / 3600 },
  m37: { name: "M37", raHours: 5 + 52 / 60 + 17.8 / 3600, decDeg: 32 + 32 / 60 + 42 / 3600 },
};

const routes = {
  "from-taurus": {
    title: "Taure → Elnath → polígon d’Auriga → Capella",
    keys: ["aldebaran", "elnath", "hassaleh", "capella"] as const,
    text: "Des d’Aldebaran, recorre el cap i la banya de Taure fins a Elnath. Aquesta estrella pertany oficialment a Taure, però funciona com el vèrtex inferior del pentàgon aparent que ajuda a reconèixer Auriga. Des d’allà, segueix Hassaleh i tanca el polígon fins a Capella, molt més brillant.",
    visibility: "Ull nu",
  },
  "deep-sky": {
    title: "Capella → M38 → M36 → M37",
    keys: ["capella", "m38", "m36", "m37"] as const,
    text: "Pren Capella i el polígon com a referència i baixa cap a la franja interior d’Auriga. Amb prismàtics, M38 és la primera aturada natural; continua cap a M36 i acaba a M37, el més ric dels tres. Un cel fosc i un telescopi petit permeten comparar-ne millor l’estructura.",
    visibility: "Prismàtics · telescopi petit",
  },
};

const CENTER_RA_DEG = 5.25 * 15;
const CENTER_DEC_DEG = 31;
const SPAN_X_DEG = 33;
const SPAN_Y_DEG = 36;

function project(point: { raHours: number; decDeg: number }) {
  const deltaRa = (point.raHours * 15 - CENTER_RA_DEG) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return { x: 50 - deltaRa / SPAN_X_DEG * 100, y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100 };
}

export default function AurigaRouteExplorer() {
  const [active, setActive] = useState<RouteId>("from-taurus");
  const route = routes[active];
  const projected = useMemo(() => Object.fromEntries(Object.entries(points).map(([id, point]) => [id, { ...point, ...project(point) }])), []);

  return (
    <div className="route-explorer">
      <div className="route-selector" role="tablist" aria-label="Rutes d’observació d’Auriga">
        <button role="tab" aria-selected={active === "from-taurus"} className={active === "from-taurus" ? "active" : ""} onClick={() => setActive("from-taurus")}>Des de Taure</button>
        <button role="tab" aria-selected={active === "deep-sky"} className={active === "deep-sky" ? "active" : ""} onClick={() => setActive("deep-sky")}>Cel profund · M38, M36 i M37</button>
      </div>
      <div className="route-visual accurate-route auriga-route-visual" role="img" aria-label={route.title}>
        <div className="route-grid" aria-hidden="true" />
        <div className="route-axis" aria-hidden="true"><span>E</span><b>mapa celeste · ICRS · època J2000.0</b><span>O</span></div>
        <svg className="route-line route-polyline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={route.keys.map(key => `${projected[key].x},${projected[key].y}`).join(" ")} />
        </svg>
        {route.keys.map((key, index) => (
          <div className={`route-point route-target-static route-auriga-${key} ${key === "capella" ? "warm" : key.startsWith("m") ? "cluster" : key === "elnath" ? "neighbor" : ""}`} key={key} style={{ left: `${projected[key].x}%`, top: `${projected[key].y}%` }}>
            <span /><b>{index + 1} · {projected[key].name}</b>
          </div>
        ))}
      </div>
      <div className="route-info-card">
        <div className="route-info-head">
          <div><p className="eyebrow">RUTA ACTIVA</p><h3>{route.title}</h3></div>
          <div className="route-pill-group"><span>{route.visibility}</span></div>
        </div>
        <p>{route.text}</p>
        <p className="route-coordinate-note">La geometria es projecta amb coordenades en el sistema ICRS, referides a l’època J2000.0. Elnath s’utilitza com a pont visual, no com una estrella d’Auriga.</p>
      </div>
    </div>
  );
}
