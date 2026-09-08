"use client";

import { useMemo, useState } from "react";

type RouteId = "from-cassiopeia" | "inside-perseus";

const points = {
  gammaCas: { name: "γ Cassiopeiae", raHours: 0 + 56 / 60 + 42.5310945 / 3600, decDeg: 60 + 43 / 60 + 0.264089 / 3600 },
  ruchbah: { name: "Ruchbah", raHours: 1 + 25 / 60 + 48.9514709 / 3600, decDeg: 60 + 14 / 60 + 7.022507 / 3600 },
  doubleCluster: { name: "Doble Cúmul", raHours: 2 + 20 / 60 + 39 / 3600, decDeg: 57 + 8 / 60 + 29 / 3600 },
  mirfak: { name: "Mirfak", raHours: 3 + 24 / 60 + 19.3700924 / 3600, decDeg: 49 + 51 / 60 + 40.245455 / 3600 },
  algol: { name: "Algol", raHours: 3 + 8 / 60 + 10.1324535 / 3600, decDeg: 40 + 57 / 60 + 20.328013 / 3600 },
  m34: { name: "M34", raHours: 2 + 42 / 60 + 7.4 / 3600, decDeg: 42 + 43 / 60 + 19 / 3600 },
};

const routes = {
  "from-cassiopeia": {
    title: "γ Cassiopeiae → Ruchbah → Doble Cúmul → Mirfak",
    keys: ["gammaCas", "ruchbah", "doubleCluster", "mirfak"] as const,
    text: "Recorre el tram central de la W fins a Ruchbah i prolonga γ Cassiopeiae–Ruchbah uns 7,5° més enllà de Ruchbah: arribaràs a la boirina doble de NGC 869 i NGC 884. Continua uns 12° en la mateixa direcció general per trobar Mirfak, la llum principal de Perseu.",
    visibility: "Ull nu · prismàtics",
  },
  "inside-perseus": {
    title: "Mirfak → Algol → M34",
    keys: ["mirfak", "algol", "m34"] as const,
    text: "Des de Mirfak baixa uns 9° cap a Algol, l’estrella del cap de la Gorgona en la tradició figurativa. M34 queda uns 5° més enllà, lleugerament cap a l’oest celeste: amb prismàtics apareix com un grup obert i granular.",
    visibility: "Ull nu · prismàtics",
  },
};

const CENTER_RA_HOURS = 2.2;
const CENTER_DEC_DEG = 50.5;
const SPAN_X_DEG = 26;
const SPAN_Y_DEG = 25;

function project(point: { raHours: number; decDeg: number }) {
  const deltaRa = (point.raHours * 15 - CENTER_RA_HOURS * 15) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return {
    x: 50 + deltaRa / SPAN_X_DEG * 100,
    y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100,
  };
}

export default function PerseusRouteExplorer() {
  const [active, setActive] = useState<RouteId>("from-cassiopeia");
  const route = routes[active];
  const projected = useMemo(() => Object.fromEntries(Object.entries(points).map(([id, point]) => [id, { ...point, ...project(point) }])), []);

  return (
    <div className="route-explorer">
      <div className="route-selector" role="tablist" aria-label="Rutes d’observació de Perseu">
        <button role="tab" aria-selected={active === "from-cassiopeia"} className={active === "from-cassiopeia" ? "active" : ""} onClick={() => setActive("from-cassiopeia")}>Des de Cassiopea</button>
        <button role="tab" aria-selected={active === "inside-perseus"} className={active === "inside-perseus" ? "active" : ""} onClick={() => setActive("inside-perseus")}>Dins de Perseu</button>
      </div>
      <div className="route-visual accurate-route perseus-route-visual" role="img" aria-label={route.title}>
        <div className="route-grid" aria-hidden="true" />
        <div className="route-axis" aria-hidden="true"><span>O</span><b>mirant cap al nord-est · ICRS · època J2000.0</b><span>E</span></div>
        <svg className="route-line route-polyline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={route.keys.map(key => `${projected[key].x},${projected[key].y}`).join(" ")} />
        </svg>
        {route.keys.map((key, index) => (
          <div className={`route-point route-target-static route-perseus-${key} ${key === "mirfak" ? "warm" : key === "doubleCluster" || key === "m34" ? "cluster" : ""}`} key={key} style={{ left: `${projected[key].x}%`, top: `${projected[key].y}%` }}>
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
        <p className="route-coordinate-note">La geometria es projecta amb coordenades en el sistema ICRS, referides a l’època J2000.0. Les distàncies angulars són aproximades; la ruta evita dreta i esquerra perquè l’orientació respecte de l’horitzó canvia.</p>
      </div>
    </div>
  );
}
