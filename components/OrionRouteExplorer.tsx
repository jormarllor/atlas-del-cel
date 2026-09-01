"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Waypoint = {
  id: string;
  name: string;
  type: string;
  raHours: number;
  decDeg: number;
  description: string;
  route: string;
  visibility: string;
  tone: "white" | "warm" | "cluster";
};

const belt = {
  name: "Cinturó d’Orió",
  raHours: 5 + 36 / 60 + 12.81335 / 3600,
  decDeg: -(1 + 12 / 60 + 6.9089 / 3600),
};

const waypoints: Waypoint[] = [
  {
    id: "sirius",
    name: "Sirius",
    type: "Estrella · Ca Major",
    raHours: 6 + 45 / 60 + 8.91728 / 3600,
    decDeg: -(16 + 42 / 60 + 58.0171 / 3600),
    route: "Prolonga la direcció del cinturó cap al sud-est del mapa, en el sentit Alnitak → Alnilam → Mintaka invertit visualment segons l’orientació del cel. La referència final és inconfusible: Sirius brilla molt més que les estrelles del voltant.",
    description: "Sirius és l’estrella més brillant del cel nocturn i pertany a la constel·lació del Ca Major.",
    visibility: "Ull nu",
    tone: "white",
  },
  {
    id: "aldebaran",
    name: "Aldebaran",
    type: "Estrella · Taure",
    raHours: 4 + 35 / 60 + 55.23907 / 3600,
    decDeg: 16 + 30 / 60 + 33.4885 / 3600,
    route: "Segueix el cinturó cap al costat oposat de Sirius. Trobaràs una estrella clarament ataronjada: Aldebaran, que marca l’ull del Taure.",
    description: "Aldebaran és una gegant taronja i una de les millors fites per continuar el recorregut cap a les Plèiades.",
    visibility: "Ull nu",
    tone: "warm",
  },
  {
    id: "pleiades",
    name: "Plèiades",
    type: "Cúmul obert · M45",
    raHours: 3 + 46 / 60 + 24.2 / 3600,
    decDeg: 24 + 6 / 60 + 50 / 3600,
    route: "Des d’Aldebaran continua en la mateixa direcció general. Aviat apareix una grapada compacta d’estrelles: les Plèiades.",
    description: "Les Plèiades són un cúmul obert, no una constel·lació. A ull nu ja formen un grup compacte; amb prismàtics són espectaculars.",
    visibility: "Ull nu · prismàtics",
    tone: "cluster",
  },
];

const CENTER_RA_DEG = 5.25 * 15;
const CENTER_DEC_DEG = 4;
const SPAN_X_DEG = 52;
const SPAN_Y_DEG = 44;

function project(raHours: number, decDeg: number) {
  const raDeg = raHours * 15;
  const deltaRa = (raDeg - CENTER_RA_DEG) * Math.cos(CENTER_DEC_DEG * Math.PI / 180);
  return {
    x: 50 - (deltaRa / SPAN_X_DEG) * 100,
    y: 50 - ((decDeg - CENTER_DEC_DEG) / SPAN_Y_DEG) * 100,
  };
}

export default function OrionRouteExplorer() {
  const [active, setActive] = useState<Waypoint>(waypoints[0]);
  const beltPoint = useMemo(() => project(belt.raHours, belt.decDeg), []);
  const projected = useMemo(() => waypoints.map((point) => ({ ...point, ...project(point.raHours, point.decDeg) })), []);
  const activeProjected = projected.find((point) => point.id === active.id)!;

  return (
    <div className="route-explorer">
      <div className="route-selector" role="tablist" aria-label="Destins des del cinturó d’Orió">
        {waypoints.map((point) => (
          <button key={point.id} className={active.id === point.id ? "active" : ""} onClick={() => setActive(point)} role="tab" aria-selected={active.id === point.id}>
            {point.name}
          </button>
        ))}
      </div>

      <div className="route-visual accurate-route" role="img" aria-label={`Mapa de la ruta real des del cinturó d’Orió fins a ${active.name}`}>
        <div className="route-grid" aria-hidden="true" />
        <div className="route-axis" aria-hidden="true"><span>E</span><b>mapa celeste · ICRS/J2000</b><span>O</span></div>

        <div className="route-point route-belt" style={{ left: `${beltPoint.x}%`, top: `${beltPoint.y}%` }}>
          <span /><b>Cinturó d’Orió</b>
        </div>

        <svg className="route-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1={beltPoint.x} y1={beltPoint.y} x2={activeProjected.x} y2={activeProjected.y} />
        </svg>

        {projected.map((point) => (
          <button
            key={point.id}
            className={`route-point route-target ${point.tone} ${active.id === point.id ? "current" : ""}`}
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            onClick={() => setActive(point)}
            aria-label={`Mostra informació sobre ${point.name}`}
          >
            <span />
            <b>{point.name}</b>
          </button>
        ))}
      </div>

      <div className="route-info-card">
        <div className="route-info-head">
          <div><p className="eyebrow">RUTA ACTIVA</p><h3>{active.name}</h3></div>
          <div className="route-pill-group"><span>{active.type}</span><span>{active.visibility}</span></div>
        </div>
        <p><strong>Com anar-hi:</strong> {active.route}</p>
        <p><strong>Què és:</strong> {active.description}</p>
        {(active.id === "aldebaran" || active.id === "pleiades") && (
          <Link className="text-link route-continuation" href="/constellacions/taure">Continua explorant Taure →</Link>
        )}
        <p className="route-coordinate-note">La posició dels quatre punts del mapa prové de coordenades celestes, no d’una composició gràfica manual.</p>
      </div>
    </div>
  );
}
