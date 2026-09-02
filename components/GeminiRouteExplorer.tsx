"use client";

import { useMemo, useState } from "react";

type RouteId = "from-orion" | "inside";

const points = {
  rigel: { name: "Rigel", raHours: 5 + 14 / 60 + 32.2721 / 3600, decDeg: -(8 + 12 / 60 + 5.898 / 3600) },
  belt: { name: "Cinturó d’Orió", raHours: 5 + 36 / 60 + 12.81335 / 3600, decDeg: -(1 + 12 / 60 + 6.9089 / 3600) },
  betelgeuse: { name: "Betelgeuse", raHours: 5 + 55 / 60 + 10.30536 / 3600, decDeg: 7 + 24 / 60 + 25.4304 / 3600 },
  castor: { name: "Càstor", raHours: 7 + 34 / 60 + 35.87319 / 3600, decDeg: 31 + 53 / 60 + 17.816 / 3600 },
  pollux: { name: "Pòl·lux", raHours: 7 + 45 / 60 + 18.94987 / 3600, decDeg: 28 + 1 / 60 + 34.316 / 3600 },
  mebsuta: { name: "Mebsuta", raHours: 6 + 43 / 60 + 55.9271511904 / 3600, decDeg: 25 + 7 / 60 + 52.057892524 / 3600 },
  wasat: { name: "Wasat", raHours: 7 + 20 / 60 + 7.3745658105 / 3600, decDeg: 21 + 58 / 60 + 56.294578663 / 3600 },
  propus: { name: "Propus", raHours: 6 + 14 / 60 + 52.6452865329 / 3600, decDeg: 22 + 30 / 60 + 24.434377815 / 3600 },
  alhena: { name: "Alhena", raHours: 6 + 37 / 60 + 42.7105 / 3600, decDeg: 16 + 23 / 60 + 57.4095 / 3600 },
  m35: { name: "M35", raHours: 6 + 9 / 60 + 5.3 / 3600, decDeg: 24 + 20 / 60 + 10 / 3600 },
};

const routes = {
  "from-orion": {
    title: "Rigel → cinturó → Betelgeuse → Càstor i Pòl·lux",
    text: "Recorre Orió des de Rigel, travessa el cinturó i continua per Betelgeuse. La mateixa direcció general et porta cap a la parella brillant de Càstor i Pòl·lux. No depèn d’una dreta o esquerra fixa: segueix l’alineació que dibuixen aquests punts sobre el cel.",
    visibility: "Ull nu",
  },
  inside: {
    title: "Dos caps → dos cossos → M35",
    text: "Des dels dos caps, segueix dues cadenes diferents: Càstor baixa per Mebsuta cap a Tejat i Propus; Pòl·lux baixa per Wasat i Mekbuda fins a Alhena. Prop de Propus, els prismàtics revelen M35. La bifurcació és la clau: són dos traços, no una sola línia irregular.",
    visibility: "Ull nu · prismàtics",
  },
};

const CENTER_RA_DEG = 6.5 * 15;
const CENTER_DEC_DEG = 13;
const SPAN_X_DEG = 48;
const SPAN_Y_DEG = 48;

function project(point: { raHours: number; decDeg: number }) {
  const deltaRa = (point.raHours * 15 - CENTER_RA_DEG) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return { x: 50 - deltaRa / SPAN_X_DEG * 100, y: 50 - (point.decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG * 100 };
}

export default function GeminiRouteExplorer() {
  const [active, setActive] = useState<RouteId>("from-orion");
  const route = routes[active];
  const projected = useMemo(() => Object.fromEntries(Object.entries(points).map(([id, point]) => [id, { ...point, ...project(point) }])), []);
  const orionPath = ["rigel", "belt", "betelgeuse"] as const;
  const castorPath = ["castor", "mebsuta", "propus", "m35"] as const;
  const polluxPath = ["pollux", "wasat", "alhena"] as const;
  const activeKeys = active === "from-orion" ? ["rigel", "belt", "betelgeuse", "castor", "pollux"] : ["castor", "mebsuta", "propus", "pollux", "wasat", "alhena", "m35"];

  return (
    <div className="route-explorer">
      <div className="route-selector" role="tablist" aria-label="Rutes d’observació de Bessons">
        <button role="tab" aria-selected={active === "from-orion"} className={active === "from-orion" ? "active" : ""} onClick={() => setActive("from-orion")}>Des d’Orió</button>
        <button role="tab" aria-selected={active === "inside"} className={active === "inside" ? "active" : ""} onClick={() => setActive("inside")}>Dins dels Bessons · M35</button>
      </div>
      <div className="route-visual accurate-route gemini-route-visual" role="img" aria-label={route.title}>
        <div className="route-grid" aria-hidden="true" />
        <div className="route-axis" aria-hidden="true"><span>E</span><b>mapa celeste · ICRS · època J2000.0</b><span>O</span></div>
        <svg className="route-line route-polyline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {active === "from-orion" ? (
            <>
              <polyline points={orionPath.map(key => `${projected[key].x},${projected[key].y}`).join(" ")} />
              <line x1={projected.betelgeuse.x} y1={projected.betelgeuse.y} x2={(projected.castor.x + projected.pollux.x) / 2} y2={(projected.castor.y + projected.pollux.y) / 2} />
              <line x1={(projected.castor.x + projected.pollux.x) / 2} y1={(projected.castor.y + projected.pollux.y) / 2} x2={projected.castor.x} y2={projected.castor.y} />
              <line x1={(projected.castor.x + projected.pollux.x) / 2} y1={(projected.castor.y + projected.pollux.y) / 2} x2={projected.pollux.x} y2={projected.pollux.y} />
            </>
          ) : (
            <>
              <polyline points={castorPath.map(key => `${projected[key].x},${projected[key].y}`).join(" ")} />
              <polyline points={polluxPath.map(key => `${projected[key].x},${projected[key].y}`).join(" ")} />
            </>
          )}
        </svg>
        {activeKeys.map((key, index) => (
          <div className={`route-point route-target-static route-gemini-${key} ${key === "pollux" ? "warm" : key === "m35" ? "cluster" : ""}`} key={key} style={{ left: `${projected[key].x}%`, top: `${projected[key].y}%` }}>
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
        <p className="route-coordinate-note">La ruta es projecta amb coordenades celestes reals; el recorregut es bifurca quan ajuda a llegir els dos cossos.</p>
      </div>
    </div>
  );
}
