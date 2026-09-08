"use client";

import { useMemo, useState } from "react";

type RouteId = "main-w" | "to-m52" | "to-ngc457";

const points = {
  caph: { name: "Caph", raHours: 0 + 9 / 60 + 10.68518 / 3600, decDeg: 59 + 8 / 60 + 59.212 / 3600 },
  schedar: { name: "Schedar", raHours: 0 + 40 / 60 + 30.4430418459 / 3600, decDeg: 56 + 32 / 60 + 14.385181354 / 3600 },
  gamma: { name: "γ Cassiopeiae", raHours: 0 + 56 / 60 + 42.5310945 / 3600, decDeg: 60 + 43 / 60 + 0.264089 / 3600 },
  ruchbah: { name: "Ruchbah", raHours: 1 + 25 / 60 + 48.9514709 / 3600, decDeg: 60 + 14 / 60 + 7.022507 / 3600 },
  segin: { name: "Segin", raHours: 1 + 54 / 60 + 23.734086168 / 3600, decDeg: 63 + 40 / 60 + 12.360239 / 3600 },
  m52: { name: "M52", raHours: 23 + 24 / 60 + 46.8 / 3600, decDeg: 61 + 35 / 60 + 24 / 3600 },
  ngc457: { name: "NGC 457", raHours: 1 + 19 / 60 + 32.9 / 3600, decDeg: 58 + 16 / 60 + 41 / 3600 },
};

const routes = {
  "main-w": {
    title: "Caph → Schedar → γ Cassiopeiae → Ruchbah → Segin",
    keys: ["caph", "schedar", "gamma", "ruchbah", "segin"] as const,
    text: "Recorre les cinc llums en ordre i memoritza els quatre canvis de direcció. La mateixa cadena pot semblar una W, una M o quedar gairebé de costat: és la seva orientació respecte de l’horitzó la que canvia, no el patró.",
    visibility: "Ull nu",
  },
  "to-m52": {
    title: "Schedar → Caph → M52",
    keys: ["schedar", "caph", "m52"] as const,
    text: "Segueix la branca Schedar–Caph i prolonga-la més enllà de Caph. Després d’uns 6°, M52 apareix com una boirina granulosa amb prismàtics sota un cel fosc. Un telescopi petit comença a separar-ne les estrelles.",
    visibility: "Prismàtics · telescopi petit",
  },
  "to-ngc457": {
    title: "γ Cassiopeiae → Ruchbah → NGC 457",
    keys: ["gamma", "ruchbah", "ngc457"] as const,
    text: "Avança des del centre de la W fins a Ruchbah. NGC 457 queda uns 2,1° al sud celeste d’aquesta estrella: entra còmodament en una cerca amb prismàtics i mostra millor la seva forma amb un telescopi petit.",
    visibility: "Prismàtics · telescopi petit",
  },
};

const CENTER_RA_HOURS = 24.75;
const CENTER_DEC_DEG = 60;
const SPAN_X_DEG = 24;
const SPAN_Y_DEG = 13;

function project(point: { raHours: number; decDeg: number }) {
  const raHours = point.raHours < 12 ? point.raHours + 24 : point.raHours;
  const deltaRa = (raHours * 15 - CENTER_RA_HOURS * 15) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return { x: 50 + deltaRa / SPAN_X_DEG * 100, y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100 };
}

export default function CassiopeiaRouteExplorer() {
  const [active, setActive] = useState<RouteId>("main-w");
  const route = routes[active];
  const projected = useMemo(() => Object.fromEntries(Object.entries(points).map(([id, point]) => [id, { ...point, ...project(point) }])), []);

  return (
    <div className="route-explorer">
      <div className="route-selector" role="tablist" aria-label="Rutes d’observació de Cassiopea">
        <button role="tab" aria-selected={active === "main-w"} className={active === "main-w" ? "active" : ""} onClick={() => setActive("main-w")}>Reconstrueix la W</button>
        <button role="tab" aria-selected={active === "to-m52"} className={active === "to-m52" ? "active" : ""} onClick={() => setActive("to-m52")}>Troba M52</button>
        <button role="tab" aria-selected={active === "to-ngc457"} className={active === "to-ngc457" ? "active" : ""} onClick={() => setActive("to-ngc457")}>Troba NGC 457</button>
      </div>
      <div className="route-visual accurate-route cassiopeia-route-visual" role="img" aria-label={route.title}>
        <div className="route-grid" aria-hidden="true" />
        <div className="route-axis" aria-hidden="true"><span>O</span><b>mirant cap al nord · ICRS · època J2000.0</b><span>E</span></div>
        <svg className="route-line route-polyline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={route.keys.map(key => `${projected[key].x},${projected[key].y}`).join(" ")} />
        </svg>
        {route.keys.map((key, index) => (
          <div className={`route-point route-target-static route-cassiopeia-${key} ${key === "schedar" ? "warm" : key === "m52" || key === "ngc457" ? "cluster" : ""}`} key={key} style={{ left: `${projected[key].x}%`, top: `${projected[key].y}%` }}>
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
        <p className="route-coordinate-note">La geometria es projecta amb coordenades en el sistema ICRS, referides a l’època J2000.0. Les separacions angulars són aproximades i no depenen de l’orientació momentània de la W respecte de l’horitzó.</p>
      </div>
    </div>
  );
}
