"use client";

import { useState } from "react";
import { CARRO_LINES, POLARIS, URSA_MAJOR_GALAXIES, URSA_MAJOR_STARS, projectUrsaMajor } from "./ursaMajorData";

type RouteId = "carro" | "north" | "galaxies";
const points = Object.fromEntries([...URSA_MAJOR_STARS, POLARIS, ...URSA_MAJOR_GALAXIES].map(point => [point.id, point]));
const routes = {
  carro: {
    title: "Dubhe → Merak → Phecda → Megrez → Alioth → Mizar → Alkaid",
    keys: ["dubhe", "merak", "phecda", "megrez", "alioth", "mizar", "alkaid"],
    text: "Reconstrueix primer el bol amb Dubhe, Merak, Phecda i Megrez, i torna a Dubhe per tancar-lo. Des de Megrez segueix la corba del mànec per Alioth i Mizar fins a Alkaid. Són set estrelles: aquest és el Carro, no tota l’Óssa Major.",
    visibility: "Ull nu",
    centerRa: 11.5, centerDec: 53, scale: 24, originX: 210, originY: 380,
  },
  north: {
    title: "Merak → Dubhe → Polaris",
    keys: ["merak", "dubhe", "polaris"],
    text: "Recorre els 5,4° de Merak a Dubhe i continua més enllà de Dubhe unes cinc vegades aquesta distància: Polaris queda a uns 28,7° de Dubhe. La prolongació passa a prop seu, no exactament damunt: busca-la en una zona d’uns 2° al voltant de la guia. Has saltat de l’Óssa Major a l’Óssa Menor.",
    visibility: "Ull nu · horitzó nord lliure",
    centerRa: 11, centerDec: 75, scale: 14, originX: 440, originY: 345,
  },
  galaxies: {
    title: "Phecda → Dubhe → M81 i M82",
    keys: ["phecda", "dubhe", "m81", "m82"],
    text: "La diagonal Phecda–Dubhe fa uns 10,4°. Continua més enllà de Dubhe una distància gairebé igual, cap al nord-oest celeste. M81 queda a uns 10,1° de Dubhe i a uns 1,5° de la prolongació: explora un camp d’uns 4° al voltant del punt d’arribada. M82 és només uns 0,6° més al nord. Confirma dues taques diferents amb prismàtics sota molt bon cel o, millor, amb telescopi petit a baixos augments.",
    visibility: "Cel fosc · telescopi petit",
    centerRa: 11, centerDec: 65, scale: 30, originX: 530, originY: 300,
  },
} as const;

const notes: Record<string, string> = {
  dubhe: "Dubhe és una cantonada del bol i el punt des del qual prolongues la línia indicadora cap al nord.",
  merak: "Merak i Dubhe formen el costat del bol que ajuda a trobar Polaris. Comença a Merak i passa per Dubhe, no a l’inrevés.",
  phecda: "Phecda és a la cantonada oposada a Dubhe: la diagonal entre totes dues serveix de guia inicial cap a M81 i M82.",
  megrez: "Megrez és més feble que les altres llums principals i és la frontissa entre el bol i el mànec.",
  alioth: "Alioth és una de les llums més brillants del Carro i la referència d’«Aquesta nit» per a l’Óssa Major.",
  mizar: "Fixa’t al costat de Mizar: Alcor queda a uns 12 minuts d’arc. A aquesta escala gairebé se superposen; al cel, una bona visió o uns prismàtics permeten distingir-les.",
  alkaid: "Alkaid tanca el mànec. És l’estrella del Carro que passa més arran de l’horitzó nord a Catalunya.",
  polaris: "Polaris pertany a l’Óssa Menor. És molt a prop del pol nord celeste, però no coincideix exactament amb el pol.",
  m81: "M81 és una galàxia espiral: visualment, busca sobretot un nucli difús amb una mica d’extensió al voltant, no els braços de les fotografies.",
  m82: "M82 presenta una forma més estreta i allargada que M81. Amb un camp prou ampli poden compartir l’ocular, però continuen sent dues galàxies diferents.",
};

export default function UrsaMajorRouteExplorer() {
  const [active, setActive] = useState<RouteId>("carro");
  const [selected, setSelected] = useState("dubhe");
  const route = routes[active];
  const projected = Object.fromEntries(route.keys.map(key => {
    const p = projectUrsaMajor(points[key], route.centerRa, route.centerDec);
    return [key, { ...points[key], x: route.originX + p.x * route.scale, y: route.originY + p.y * route.scale }];
  }));
  const edges: readonly (readonly [string, string])[] = active === "carro" ? CARRO_LINES : route.keys.slice(1).map((key, index) => [route.keys[index], key] as const);
  return (
    <div className="route-explorer ursa-route-explorer">
      <div className="route-selector" aria-label="Rutes d’observació de l’Óssa Major">
        {([ ["carro", "El Carro"], ["north", "Troba Polaris"], ["galaxies", "M81 i M82"] ] as const).map(([id, label]) => <button key={id} className={active === id ? "active" : ""} aria-pressed={active === id} onClick={() => { setActive(id); setSelected(routes[id].keys[0]); }}>{label}</button>)}
      </div>
      <div className={`route-visual accurate-route ursa-route-visual ursa-route-${active}`} role="group" aria-label={route.title}>
        <div className="route-grid" aria-hidden="true" />
        <svg className="ursa-route-geometry" viewBox="0 0 1000 700" aria-hidden="true">
          <g className="ursa-route-lines">{edges.map(([a, b]) => <line key={`${a}-${b}`} x1={projected[a].x} y1={projected[a].y} x2={projected[b].x} y2={projected[b].y} />)}</g>
          {route.keys.map(key => key.startsWith("m8") ? <ellipse key={key} className={`ursa-galaxy ${key}`} cx={projected[key].x} cy={projected[key].y} rx={key === "m82" ? 4 : 8} ry={key === "m82" ? 10 : 6} /> : <circle key={key} className={`ursa-svg-star carro ${key}`} cx={projected[key].x} cy={projected[key].y} r={key === "polaris" ? 6 : 5} />)}
        </svg>
        {route.keys.map((key, index) => <button key={key} aria-pressed={selected === key} aria-label={`${index + 1}. ${points[key].name}`} className={`ursa-route-target target-ursa-${key} ${selected === key ? "selected" : ""}`} style={{ left: `${projected[key].x / 10}%`, top: `${projected[key].y / 7}%` }} onClick={() => setSelected(key)}><span aria-hidden="true" /><b>{index + 1} · {points[key].name}</b></button>)}
        <div className="route-axis" aria-hidden="true"><span>O</span><b>nord amunt · est celeste a la dreta</b><span>E</span></div>
      </div>
      <div className="route-info-card" aria-live="polite">
        <div className="route-info-head"><div><p className="eyebrow">RUTA ACTIVA</p><h3>{route.title}</h3></div><div className="route-pill-group"><span>{route.visibility}</span></div></div>
        <p>{route.text}</p>
        <p className="ursa-selected-note"><strong>{points[selected].name}</strong> · {notes[selected]}</p>
        {active === "north" && <p className="route-coordinate-note">Polaris · Óssa Menor · properament. No hi ha encara una fitxa enllaçada.</p>}
        <p className="route-coordinate-note">Projecció de coordenades ICRS, referides a l’època J2000.0. Les separacions es calculen sobre l’esfera celeste. L’orientació respecte de l’horitzó canvia: les instruccions indiquen direccions celestes, no una dreta o esquerra fixes al cel.</p>
      </div>
    </div>
  );
}
