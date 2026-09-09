"use client";

import { useMemo, useState } from "react";

type RouteId = "from-cassiopeia" | "house" | "variables";

const points = {
  schedar: { name: "Schedar", raHours: 0 + 40 / 60 + 30.4430418 / 3600, decDeg: 56 + 32 / 60 + 14.385181 / 3600 },
  caph: { name: "Caph", raHours: 0 + 9 / 60 + 10.685168 / 3600, decDeg: 59 + 8 / 60 + 59.212 / 3600 },
  alderamin: { name: "Alderamin", raHours: 21 + 18 / 60 + 34.7723 / 3600, decDeg: 62 + 35 / 60 + 8.069 / 3600 },
  alfirk: { name: "Alfirk", raHours: 21 + 28 / 60 + 39.5968513 / 3600, decDeg: 70 + 33 / 60 + 38.574681 / 3600 },
  errai: { name: "Errai", raHours: 23 + 39 / 60 + 20.849 / 3600, decDeg: 77 + 37 / 60 + 56.193 / 3600 },
  iota: { name: "ι Cephei", raHours: 22 + 49 / 60 + 40.8166 / 3600, decDeg: 66 + 12 / 60 + 1.468 / 3600 },
  zeta: { name: "ζ Cephei", raHours: 22 + 10 / 60 + 51.2766 / 3600, decDeg: 58 + 12 / 60 + 4.55 / 3600 },
  delta: { name: "δ Cephei", raHours: 22 + 29 / 60 + 10.2653 / 3600, decDeg: 58 + 24 / 60 + 54.713 / 3600 },
  mu: { name: "μ Cephei", raHours: 21 + 43 / 60 + 30.4595559 / 3600, decDeg: 58 + 46 / 60 + 48.165937 / 3600 },
};

const routes = {
  "from-cassiopeia": {
    title: "Schedar → Caph → Alderamin → Alfirk",
    keys: ["schedar", "caph", "alderamin", "alfirk"] as const,
    text: "Recorre un extrem de la W de Cassiopea fins a Caph. Des d’allà, creua uns 20,5° cap a l’oest celeste, lleugerament cap al pol, fins a Alderamin; Alfirk queda uns 8° més al nord i confirma el primer costat de la casa.",
    visibility: "Ull nu",
  },
  house: {
    title: "Alderamin → Alfirk → Errai → ι → ζ Cephei",
    keys: ["alderamin", "alfirk", "errai", "iota", "zeta"] as const,
    text: "Uneix les cinc llums sense buscar simetria perfecta: Alderamin i ζ Cephei formen la base, Alfirk i ι Cephei els costats i Errai el vèrtex més septentrional. El resultat és una casa inclinada i una mica deformada.",
    visibility: "Ull nu · cel transparent",
  },
  variables: {
    title: "Alderamin → ζ Cephei → δ Cephei → μ Cephei",
    keys: ["alderamin", "zeta", "delta", "mu"] as const,
    text: "Des d’Alderamin recorre uns 7,8° fins a ζ Cephei. δ Cephei queda només 2,4° a l’est celeste; després recorre uns 6° cap a μ Cephei, una llum més feble però notablement vermellosa sota un cel net.",
    visibility: "Ull nu · prismàtics",
  },
};

const CENTER_RA_HOURS = 22.55;
const CENTER_DEC_DEG = 67;
const SPAN_X_DEG = 30;
const SPAN_Y_DEG = 30;

function wrappedDeltaHours(raHours: number) {
  let delta = raHours - CENTER_RA_HOURS;
  if (delta > 12) delta -= 24;
  if (delta < -12) delta += 24;
  return delta;
}

function project(point: { raHours: number; decDeg: number }) {
  const deltaRa = wrappedDeltaHours(point.raHours) * 15 * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return {
    x: 50 + deltaRa / SPAN_X_DEG * 100,
    y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100,
  };
}

export default function CepheusRouteExplorer() {
  const [active, setActive] = useState<RouteId>("from-cassiopeia");
  const route = routes[active];
  const projected = useMemo(() => Object.fromEntries(Object.entries(points).map(([id, point]) => [id, { ...point, ...project(point) }])), []);

  return (
    <div className="route-explorer">
      <div className="route-selector" role="tablist" aria-label="Rutes d’observació de Cefeu">
        <button role="tab" aria-selected={active === "from-cassiopeia"} className={active === "from-cassiopeia" ? "active" : ""} onClick={() => setActive("from-cassiopeia")}>Des de Cassiopea</button>
        <button role="tab" aria-selected={active === "house"} className={active === "house" ? "active" : ""} onClick={() => setActive("house")}>La casa</button>
        <button role="tab" aria-selected={active === "variables"} className={active === "variables" ? "active" : ""} onClick={() => setActive("variables")}>Dues variables</button>
      </div>
      <div className="route-visual accurate-route cepheus-route-visual" role="img" aria-label={route.title}>
        <div className="route-grid" aria-hidden="true" />
        <div className="route-axis" aria-hidden="true"><span>O</span><b>mirant cap al nord · ICRS · època J2000.0</b><span>E</span></div>
        <svg className="route-line route-polyline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={route.keys.map(key => `${projected[key].x},${projected[key].y}`).join(" ")} />
        </svg>
        {route.keys.map((key, index) => (
          <div className={`route-point route-target-static route-cepheus-${key} ${key === "alderamin" ? "warm" : ""}`} key={key} style={{ left: `${projected[key].x}%`, top: `${projected[key].y}%` }}>
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
        <p className="route-coordinate-note">La geometria es projecta amb coordenades en el sistema ICRS, referides a l’època J2000.0. Les distàncies angulars són aproximades; les direccions són celestes perquè l’orientació respecte de l’horitzó canvia mentre Cefeu gira al voltant del pol.</p>
      </div>
    </div>
  );
}
