"use client";

import { useMemo, useState } from "react";

type RouteId = "principal" | "advanced";

const points = {
  orion: { name: "Cinturó d’Orió", raHours: 5 + 36 / 60 + 12.81 / 3600, decDeg: -(1 + 12 / 60 + 6.91 / 3600) },
  aldebaran: { name: "Aldebaran", raHours: 4 + 35 / 60 + 55.24 / 3600, decDeg: 16 + 30 / 60 + 33.5 / 3600 },
  hyades: { name: "Híades", raHours: 4 + 29 / 60 + 47.3 / 3600, decDeg: 16 + 56 / 60 + 53 / 3600 },
  pleiades: { name: "Plèiades", raHours: 3 + 47 / 60 + 24 / 3600, decDeg: 24 + 7 / 60 },
  zeta: { name: "Zeta Tauri", raHours: 5 + 37 / 60 + 38.68 / 3600, decDeg: 21 + 8 / 60 + 33 / 3600 },
  m1: { name: "M1", raHours: 5 + 34 / 60 + 31.8 / 3600, decDeg: 22 + 1 / 60 + 3 / 3600 },
};

const routes = {
  principal: {
    title: "Orió → Aldebaran → Híades → Plèiades",
    keys: ["orion", "aldebaran", "hyades", "pleiades"] as const,
    text: "Prolonga la línia del cinturó d’Orió en la direcció oposada a Sirius fins a l’estrella taronja Aldebaran. Al seu voltant reconeixeràs la V de les Híades; continua en la mateixa direcció general fins a la grapada compacta de les Plèiades.",
    visibility: "Ull nu · prismàtics",
  },
  advanced: {
    title: "Aldebaran → Zeta Tauri → M1",
    keys: ["aldebaran", "zeta", "m1"] as const,
    text: "Des d’Aldebaran travessa la figura del toro fins a Zeta Tauri, a l’extrem de la banya. M1 és molt a prop angularment de Zeta, però no és un objecte evident a ull nu: un telescopi petit i un cel fosc són molt més adequats.",
    visibility: "Telescopi recomanat",
  },
};

const CENTER_RA_DEG = 4.75 * 15;
const CENTER_DEC_DEG = 11;
const SPAN_X_DEG = 48;
const SPAN_Y_DEG = 36;

function project(point: { raHours: number; decDeg: number }) {
  const deltaRa = (point.raHours * 15 - CENTER_RA_DEG) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return { x: 50 - deltaRa / SPAN_X_DEG * 100, y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100 };
}

export default function TaurusRouteExplorer() {
  const [active, setActive] = useState<RouteId>("principal");
  const route = routes[active];
  const projected = useMemo(() => Object.fromEntries(Object.entries(points).map(([id, point]) => [id, { ...point, ...project(point) }])), []);

  return (
    <div className="route-explorer">
      <div className="route-selector" role="tablist" aria-label="Rutes d’observació de Taure">
        <button className={active === "principal" ? "active" : ""} onClick={() => setActive("principal")}>Ruta principal</button>
        <button className={active === "advanced" ? "active" : ""} onClick={() => setActive("advanced")}>Ruta avançada · M1</button>
      </div>
      <div className="route-visual accurate-route" role="img" aria-label={route.title}>
        <div className="route-grid" aria-hidden="true" />
        <div className="route-axis" aria-hidden="true"><span>E</span><b>mapa celeste · ICRS · època J2000.0</b><span>O</span></div>
        <svg className="route-line route-polyline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={route.keys.map(key => `${projected[key].x},${projected[key].y}`).join(" ")} />
        </svg>
        {route.keys.map((key, index) => (
          <div className={`route-point route-target-static ${key === "aldebaran" ? "warm" : key === "pleiades" || key === "hyades" ? "cluster" : ""}`} key={key} style={{ left: `${projected[key].x}%`, top: `${projected[key].y}%` }}>
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
        <p className="route-coordinate-note">La geometria de la ruta prové de coordenades celestes en el sistema ICRS, referides a l’època J2000.0.</p>
      </div>
    </div>
  );
}
