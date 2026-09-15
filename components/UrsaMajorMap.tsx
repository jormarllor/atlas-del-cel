"use client";

import { useState } from "react";
import { BEAR_LINES, CARRO_LINES, URSA_MAJOR_GALAXIES, URSA_MAJOR_STARS, projectUrsaMajor } from "./ursaMajorData";

const WIDTH = 1000;
const HEIGHT = 900;
const place = (point: { raHours: number; decDeg: number }) => {
  const p = projectUrsaMajor(point);
  return { x: 500 + p.x * 14, y: 450 + p.y * 14 };
};
const stars = URSA_MAJOR_STARS.map(point => ({ ...point, ...place(point) }));
const byId = Object.fromEntries(stars.map(point => [point.id, point]));
const galaxies = URSA_MAJOR_GALAXIES.map(point => ({ ...point, ...place(point) }));

function BearFigure() {
  const h = byId.muscida, shoulder = byId.dubhe, hip = byId.phecda;
  const front = byId.talitha, middle = byId["tania-a"], rear = byId["alula-a"];
  const tail = byId.alkaid, tailBase = byId.megrez;
  // All contours are relative to the projected head, back, feet and tail anchors.
  const u = Math.hypot(shoulder.x - byId.merak.x, shoulder.y - byId.merak.y);
  return (
    <g className="ursa-bear-figure">
      <path d={`M ${h.x - .2 * u} ${h.y - .05 * u} q ${-.15 * u} ${-.4 * u} ${.12 * u} ${-.38 * u} q ${.25 * u} ${.03 * u} ${.22 * u} ${.36 * u} Q ${h.x + .7 * u} ${h.y - .1 * u} ${shoulder.x} ${shoulder.y} Q ${tailBase.x + .4 * u} ${tailBase.y - .2 * u} ${hip.x + .7 * u} ${hip.y + .7 * u}`} />
      <path d={`M ${h.x - .2 * u} ${h.y - .05 * u} q ${-.5 * u} ${.15 * u} ${-.65 * u} ${.55 * u} q ${.3 * u} ${.2 * u} ${.8 * u} ${.16 * u} Q ${h.x + .6 * u} ${h.y + 1.1 * u} ${front.x} ${front.y} q ${-.14 * u} ${.35 * u} ${.25 * u} ${.35 * u}`} />
      <path d={`M ${byId.merak.x} ${byId.merak.y + .2 * u} Q ${middle.x + .5 * u} ${middle.y - .4 * u} ${middle.x} ${middle.y} q ${-.2 * u} ${.22 * u} ${.2 * u} ${.25 * u} M ${hip.x + .7 * u} ${hip.y + .7 * u} Q ${rear.x + .6 * u} ${rear.y - .55 * u} ${rear.x} ${rear.y} q ${-.25 * u} ${.18 * u} ${.15 * u} ${.22 * u}`} />
      <path d={`M ${front.x + .6 * u} ${front.y - .1 * u} Q ${byId.merak.x} ${byId.merak.y + 1.2 * u} ${hip.x + .3 * u} ${hip.y + 1.1 * u} M ${tailBase.x} ${tailBase.y + .15 * u} Q ${byId.mizar.x} ${byId.mizar.y + .3 * u} ${tail.x} ${tail.y}`} />
    </g>
  );
}

export default function UrsaMajorMap() {
  const [showStars, setShowStars] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [showNames, setShowNames] = useState(true);
  const [showMyth, setShowMyth] = useState(false);
  return (
    <div className="map-shell">
      <div className="map-toolbar" aria-label="Controls del mapa de l’Óssa Major">
        <button className={showStars ? "active" : ""} aria-pressed={showStars} onClick={() => setShowStars(!showStars)}>Estrelles</button>
        <button className={showLines ? "active" : ""} aria-pressed={showLines} onClick={() => setShowLines(!showLines)}>Línies</button>
        <button className={showNames ? "active" : ""} aria-pressed={showNames} onClick={() => setShowNames(!showNames)}>Noms</button>
        <button className={showMyth ? "active" : ""} aria-pressed={showMyth} onClick={() => setShowMyth(!showMyth)}>Figura mitològica</button>
        <span className="map-coordinate-badge">ICRS · època J2000.0</span>
      </div>
      <div className="star-map accurate-map ursa-major-map" role="img" aria-label="El Carro de set estrelles, el traç secundari de l’Óssa Major i les galàxies M81, M82 i M101. Mizar i Alcor són massa pròximes per separar-les bé a aquesta escala.">
        <div className="star-dust" aria-hidden="true" />
        <svg className="ursa-map-geometry" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true">
          {showMyth && <BearFigure />}
          {showLines && <>
            <g className="ursa-secondary-lines">{BEAR_LINES.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}</g>
            <g className="ursa-carro-lines">{CARRO_LINES.map(([a, b]) => <line key={`${a}-${b}`} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y} />)}</g>
          </>}
          {showStars && stars.map(point => <circle className={`ursa-svg-star ${point.group} ${point.id}`} key={point.id} cx={point.x} cy={point.y} r={Math.max(2, 7.5 - point.magnitude * 1.3)} />)}
          {galaxies.map(object => <ellipse className={`ursa-galaxy ${object.id}`} key={object.id} cx={object.x} cy={object.y} rx={object.id === "m82" ? 2.7 : 6} ry={object.id === "m82" ? 7 : 4} />)}
        </svg>
        {showStars && showNames && stars.filter(point => point.group !== "companion").map(point => (
          <span key={point.id} className={`ursa-map-label label-ursa-${point.id} ${point.group}`} style={{ left: `${point.x / WIDTH * 100}%`, top: `${point.y / HEIGHT * 100}%` }}>{point.name}</span>
        ))}
        {showNames && galaxies.filter(object => object.id !== "m82").map(object => <span key={object.id} className={`ursa-map-label galaxy label-ursa-${object.id}`} style={{ left: `${object.x / WIDTH * 100}%`, top: `${object.y / HEIGHT * 100}%` }}>{object.id === "m81" ? "M81 · M82" : object.name}</span>)}
        <div className="sky-orientation" aria-hidden="true"><span>O</span><b>mirant cap al nord · Carro en daurat</b><span>E</span></div>
      </div>
    </div>
  );
}
