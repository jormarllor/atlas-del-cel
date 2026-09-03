"use client";

import { useMemo, useState } from "react";

type RouteId = "great-square" | "to-m15";

const points = {
  alpheratz: { name: "Alpheratz · Andròmeda", raHours: 0 + 8 / 60 + 23.25988 / 3600, decDeg: 29 + 5 / 60 + 25.552 / 3600 },
  scheat: { name: "Scheat", raHours: 23 + 3 / 60 + 46.45746 / 3600, decDeg: 28 + 4 / 60 + 58.0336 / 3600 },
  markab: { name: "Markab", raHours: 23 + 4 / 60 + 45.65345 / 3600, decDeg: 15 + 12 / 60 + 18.9617 / 3600 },
  algenib: { name: "Algenib", raHours: 0 + 13 / 60 + 14.152349 / 3600, decDeg: 15 + 11 / 60 + 0.95435 / 3600 },
  homam: { name: "Homam", raHours: 22 + 41 / 60 + 27.720718 / 3600, decDeg: 10 + 49 / 60 + 52.9079 / 3600 },
  biham: { name: "Biham", raHours: 22 + 10 / 60 + 11.988612 / 3600, decDeg: 6 + 11 / 60 + 52.5177 / 3600 },
  enif: { name: "Enif", raHours: 21 + 44 / 60 + 11.156139 / 3600, decDeg: 9 + 52 / 60 + 30.0312 / 3600 },
  m15: { name: "M15", raHours: 21 + 29 / 60 + 58.33 / 3600, decDeg: 12 + 10 / 60 + 1.2 / 3600 },
};

const routes = {
  "great-square": {
    title: "Alpheratz → Scheat → Markab → Algenib → Alpheratz",
    keys: ["alpheratz", "scheat", "markab", "algenib", "alpheratz"] as const,
    text: "Comença per Alpheratz, que ja coneixes d’Andròmeda, i recorre el perímetre fins a Scheat, Markab i Algenib. Tanca de nou el Quadrat a Alpheratz. És un patró visual: només tres dels quatre vèrtexs són oficialment de Pegàs.",
    visibility: "Ull nu",
  },
  "to-m15": {
    title: "Markab → Homam → Biham → Enif → M15",
    keys: ["markab", "homam", "biham", "enif", "m15"] as const,
    text: "Des de Markab, segueix la branca corba per Homam i Biham fins a Enif, el punt brillant del musell. Des d’Enif, desplaça els prismàtics poc més de 4° cap al nord-oest celeste: M15 apareix com una boirina compacta. Un telescopi petit en concentra millor el nucli.",
    visibility: "Prismàtics · telescopi petit",
  },
};

const CENTER_RA_HOURS = 22.9;
const CENTER_DEC_DEG = 17;
const SPAN_X_DEG = 45;
const SPAN_Y_DEG = 28;

function project(point: { raHours: number; decDeg: number }) {
  const raHours = point.raHours < 12 ? point.raHours + 24 : point.raHours;
  const deltaRa = (raHours * 15 - CENTER_RA_HOURS * 15) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return { x: 50 - deltaRa / SPAN_X_DEG * 100, y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100 };
}

export default function PegasusRouteExplorer() {
  const [active, setActive] = useState<RouteId>("great-square");
  const route = routes[active];
  const projected = useMemo(() => Object.fromEntries(Object.entries(points).map(([id, point]) => [id, { ...point, ...project(point) }])), []);

  return (
    <div className="route-explorer">
      <div className="route-selector" role="tablist" aria-label="Rutes d’observació de Pegàs">
        <button role="tab" aria-selected={active === "great-square"} className={active === "great-square" ? "active" : ""} onClick={() => setActive("great-square")}>Reconstrueix el Quadrat</button>
        <button role="tab" aria-selected={active === "to-m15"} className={active === "to-m15" ? "active" : ""} onClick={() => setActive("to-m15")}>Del Quadrat a M15</button>
      </div>
      <div className="route-visual accurate-route pegasus-route-visual" role="img" aria-label={route.title}>
        <div className="route-grid" aria-hidden="true" />
        <div className="route-axis" aria-hidden="true"><span>E</span><b>mapa celeste · ICRS · època J2000.0</b><span>O</span></div>
        <svg className="route-line route-polyline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={route.keys.map(key => `${projected[key].x},${projected[key].y}`).join(" ")} />
        </svg>
        {Array.from(new Set(route.keys)).map((key, index) => (
          <div className={`route-point route-target-static route-pegasus-${key} ${key === "m15" ? "cluster" : key === "enif" ? "warm" : ""}`} key={key} style={{ left: `${projected[key].x}%`, top: `${projected[key].y}%` }}>
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
        <p className="route-coordinate-note">La geometria es projecta amb coordenades en el sistema ICRS, referides a l’època J2000.0. Alpheratz completa el Quadrat visual, però és α Andromedae.</p>
      </div>
    </div>
  );
}
