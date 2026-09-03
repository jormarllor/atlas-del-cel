"use client";

import { useMemo, useState } from "react";

type RouteId = "main-chain" | "to-m31";

const points = {
  alpheratz: { name: "Alpheratz", raHours: 0 + 8 / 60 + 23.25988 / 3600, decDeg: 29 + 5 / 60 + 25.552 / 3600 },
  mirach: { name: "Mirach", raHours: 1 + 9 / 60 + 43.92388 / 3600, decDeg: 35 + 37 / 60 + 14.0075 / 3600 },
  almach: { name: "Almach", raHours: 2 + 3 / 60 + 53.95229 / 3600, decDeg: 42 + 19 / 60 + 47.0223 / 3600 },
  mu: { name: "μ Andromedae", raHours: 0 + 56 / 60 + 45.211 / 3600, decDeg: 38 + 29 / 60 + 57.641 / 3600 },
  nu: { name: "ν Andromedae", raHours: 0 + 49 / 60 + 48.84 / 3600, decDeg: 41 + 4 / 60 + 44.1 / 3600 },
  m31: { name: "M31", raHours: 0 + 42 / 60 + 44.33 / 3600, decDeg: 41 + 16 / 60 + 7.5 / 3600 },
};

const routes = {
  "main-chain": {
    title: "Alpheratz → Mirach → Almach",
    keys: ["alpheratz", "mirach", "almach"] as const,
    text: "Comença a Alpheratz, el vèrtex del Gran Quadrat que pertany oficialment a Andròmeda. Des d’allà, segueix la cadena fins a Mirach i continua en la mateixa direcció general fins a Almach. No busquis un polígon tancat: Andròmeda es reconeix com una successió llarga de llums.",
    visibility: "Ull nu",
  },
  "to-m31": {
    title: "Mirach → μ Andromedae → ν Andromedae → M31",
    keys: ["mirach", "mu", "nu", "m31"] as const,
    text: "Des de Mirach, puja per dues estrelles progressivament més febles: primer μ i després ν Andromedae. M31 queda molt a prop de ν. En un cel fosc pot aparèixer com una taca feble a ull nu; els prismàtics la fan molt més evident, però no hi esperis els braços espirals de les fotografies.",
    visibility: "Cel fosc · prismàtics",
  },
};

const CENTER_RA_DEG = 1.05 * 15;
const CENTER_DEC_DEG = 36;
const SPAN_X_DEG = 29;
const SPAN_Y_DEG = 18;

function project(point: { raHours: number; decDeg: number }) {
  const deltaRa = (point.raHours * 15 - CENTER_RA_DEG) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return { x: 50 - deltaRa / SPAN_X_DEG * 100, y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100 };
}

export default function AndromedaRouteExplorer() {
  const [active, setActive] = useState<RouteId>("main-chain");
  const route = routes[active];
  const projected = useMemo(() => Object.fromEntries(Object.entries(points).map(([id, point]) => [id, { ...point, ...project(point) }])), []);

  return (
    <div className="route-explorer">
      <div className="route-selector" role="tablist" aria-label="Rutes d’observació d’Andròmeda">
        <button role="tab" aria-selected={active === "main-chain"} className={active === "main-chain" ? "active" : ""} onClick={() => setActive("main-chain")}>Reconstrueix la cadena</button>
        <button role="tab" aria-selected={active === "to-m31"} className={active === "to-m31" ? "active" : ""} onClick={() => setActive("to-m31")}>Troba M31</button>
      </div>
      <div className="route-visual accurate-route andromeda-route-visual" role="img" aria-label={route.title}>
        <div className="route-grid" aria-hidden="true" />
        <div className="route-axis" aria-hidden="true"><span>E</span><b>mapa celeste · ICRS · època J2000.0</b><span>O</span></div>
        <svg className="route-line route-polyline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={route.keys.map(key => `${projected[key].x},${projected[key].y}`).join(" ")} />
        </svg>
        {route.keys.map((key, index) => (
          <div className={`route-point route-target-static route-andromeda-${key} ${key === "mirach" ? "warm" : key === "m31" ? "galaxy" : ""}`} key={key} style={{ left: `${projected[key].x}%`, top: `${projected[key].y}%` }}>
            <span />
            <b>{index + 1} · {projected[key].name}</b>
          </div>
        ))}
      </div>
      <div className="route-info-card">
        <div className="route-info-head">
          <div><p className="eyebrow">RUTA ACTIVA</p><h3>{route.title}</h3></div>
          <div className="route-pill-group"><span>{route.visibility}</span></div>
        </div>
        <p>{route.text}</p>
        <p className="route-coordinate-note">La geometria es projecta amb coordenades en el sistema ICRS, referides a l’època J2000.0. Alpheratz s’utilitza com a pont visual amb el Gran Quadrat, però és α Andromedae.</p>
      </div>
    </div>
  );
}
