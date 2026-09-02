"use client";

import { useMemo, useState } from "react";

type RouteId = "principal" | "body";

const points = {
  orion: { name: "Cinturó d’Orió", raHours: 5 + 36 / 60 + 12.81 / 3600, decDeg: -(1 + 12 / 60 + 6.91 / 3600) },
  sirius: { name: "Sirius", raHours: 6 + 45 / 60 + 8.91728 / 3600, decDeg: -(16 + 42 / 60 + 58.0171 / 3600) },
  m41: { name: "M41", raHours: 6 + 45 / 60 + 59.8 / 3600, decDeg: -(20 + 42 / 60 + 58 / 3600) },
  wezen: { name: "Wezen", raHours: 7 + 8 / 60 + 23.4840514 / 3600, decDeg: -(26 + 23 / 60 + 35.518484 / 3600) },
  adhara: { name: "Adhara", raHours: 6 + 58 / 60 + 37.54876 / 3600, decDeg: -(28 + 58 / 60 + 19.5102 / 3600) },
  aludra: { name: "Aludra", raHours: 7 + 24 / 60 + 5.70228 / 3600, decDeg: -(29 + 18 / 60 + 11.1798 / 3600) },
};

const routes = {
  principal: {
    title: "Orió → Sirius → M41",
    keys: ["orion", "sirius", "m41"] as const,
    text: "Troba el cinturó d’Orió i prolonga’n la línia cap avall i cap a l’esquerra, mirant cap al sud. Sirius és la fita brillant. Amb prismàtics, baixa uns quatre graus més al sud fins a la taca estel·lar de M41.",
    visibility: "Ull nu · prismàtics",
  },
  body: {
    title: "Sirius → Wezen → Adhara → Aludra",
    keys: ["sirius", "wezen", "adhara", "aludra"] as const,
    text: "Un cop identificada Sirius, deixa que els ulls s’adaptin a la foscor i segueix les estrelles més discretes cap al cos del gos: Wezen obre el traç, Adhara en marca la part baixa i Aludra el tanca cap a la cua.",
    visibility: "Ull nu · cel fosc",
  },
};

const CENTER_RA_DEG = 6.5 * 15;
const CENTER_DEC_DEG = -15.5;
const SPAN_X_DEG = 35;
const SPAN_Y_DEG = 36;

function project(point: { raHours: number; decDeg: number }) {
  const deltaRa = (point.raHours * 15 - CENTER_RA_DEG) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return { x: 50 - deltaRa / SPAN_X_DEG * 100, y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100 };
}

export default function CanisMajorRouteExplorer() {
  const [active, setActive] = useState<RouteId>("principal");
  const route = routes[active];
  const projected = useMemo(() => Object.fromEntries(Object.entries(points).map(([id, point]) => [id, { ...point, ...project(point) }])), []);

  return (
    <div className="route-explorer">
      <div className="route-selector" role="tablist" aria-label="Rutes d’observació de Ca Major">
        <button role="tab" aria-selected={active === "principal"} className={active === "principal" ? "active" : ""} onClick={() => setActive("principal")}>Ruta principal · M41</button>
        <button role="tab" aria-selected={active === "body"} className={active === "body" ? "active" : ""} onClick={() => setActive("body")}>Llegeix el cos del gos</button>
      </div>
      <div className="route-visual accurate-route" role="img" aria-label={route.title}>
        <div className="route-grid" aria-hidden="true" />
        <div className="route-axis" aria-hidden="true"><span>E</span><b>mapa celeste · ICRS · època J2000.0</b><span>O</span></div>
        <svg className="route-line route-polyline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={route.keys.map(key => `${projected[key].x},${projected[key].y}`).join(" ")} />
        </svg>
        {route.keys.map((key, index) => (
          <div className={`route-point route-target-static ${key === "sirius" ? "sirius" : key === "m41" ? "cluster" : ""}`} key={key} style={{ left: `${projected[key].x}%`, top: `${projected[key].y}%` }}>
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
