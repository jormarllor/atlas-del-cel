"use client";

import { useEffect, useMemo, useState } from "react";
import {
  compassDirection,
  equatorialToHorizontal,
  formatDegrees,
  nextObservableTime,
} from "./astronomy";

const BARCELONA = { latitude: 41.3874, longitude: 2.1686, name: "Barcelona" };
const ALNILAM = { raHours: 5 + 36 / 60 + 12.81335 / 3600, decDeg: -(1 + 12 / 60 + 6.9089 / 3600) };

function toDatetimeLocal(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function defaultObservationTime() {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 6 && hour < 18) {
    const tonight = new Date(now);
    tonight.setHours(22, 0, 0, 0);
    return tonight;
  }
  return now;
}

function formatObservationDate(date: Date) {
  return new Intl.DateTimeFormat("ca-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function TonightSkyCard() {
  const [latitude, setLatitude] = useState(BARCELONA.latitude);
  const [longitude, setLongitude] = useState(BARCELONA.longitude);
  const [place, setPlace] = useState(BARCELONA.name);
  const [time, setTime] = useState<Date | null>(null);
  const [editing, setEditing] = useState(false);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    setTime(defaultObservationTime());
  }, []);

  const position = useMemo(
    () => time ? equatorialToHorizontal(ALNILAM, time, latitude, longitude) : null,
    [time, latitude, longitude],
  );
  const next = useMemo(
    () => time ? nextObservableTime(ALNILAM, time, latitude, longitude, 12) : null,
    [time, latitude, longitude],
  );

  useEffect(() => {
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      setLatitude(BARCELONA.latitude);
      setLongitude(BARCELONA.longitude);
    }
  }, [latitude, longitude]);

  if (!time || !position) {
    return <section className="tonight-card tonight-loading"><p className="section-kicker">AQUESTA NIT · CÀLCUL ASTRONÒMIC</p><p>Calculant la posició d’Orió…</p></section>;
  }

  const status = position.altitude >= 12
    ? { label: "Orió és observable", className: "visible", detail: `Busca’l cap a ${compassDirection(position.azimuth)}, a uns ${formatDegrees(position.altitude)} sobre l’horitzó.` }
    : position.altitude > 0
      ? { label: "Orió és molt baix", className: "low", detail: `És cap a ${compassDirection(position.azimuth)}, només a ${formatDegrees(position.altitude)} d’altura.` }
      : { label: "Orió és sota l’horitzó", className: "hidden", detail: next ? `Tornarà a superar uns 12° d’altura ${formatObservationDate(next)}.` : "No arriba a una altura còmoda durant les properes hores." };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (result) => {
        setLatitude(result.coords.latitude);
        setLongitude(result.coords.longitude);
        setPlace("La teva ubicació");
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  };

  return (
    <section className="tonight-card" aria-label="Posició d'Orió per data, hora i ubicació">
      <div className="tonight-main">
        <div>
          <p className="section-kicker">AQUESTA NIT · CÀLCUL ASTRONÒMIC</p>
          <h2>{status.label}</h2>
          <p className="tonight-place">{place} · {formatObservationDate(time)}</p>
        </div>
        <span className={`visibility-chip ${status.className}`}><i />{status.label}</span>
      </div>

      <div className="tonight-readout">
        <div><span>Direcció</span><strong>{compassDirection(position.azimuth)} · {formatDegrees(position.azimuth)}</strong></div>
        <div><span>Altura</span><strong>{formatDegrees(position.altitude)}</strong></div>
        <div className="tonight-guidance"><span>Què has de fer</span><strong>{status.detail}</strong></div>
      </div>

      <div className="tonight-actions">
        <button className="small-button" onClick={() => setEditing(!editing)}>{editing ? "Tanca" : "Canvia hora o ubicació"}</button>
        <button className="small-button ghost-small" onClick={useMyLocation}>{locating ? "Localitzant…" : "Utilitza la meva ubicació"}</button>
      </div>

      {editing && (
        <div className="tonight-editor">
          <label>
            <span>Data i hora</span>
            <input
              type="datetime-local"
              value={toDatetimeLocal(time)}
              onChange={(event) => event.target.value && setTime(new Date(event.target.value))}
            />
          </label>
          <label>
            <span>Latitud</span>
            <input type="number" step="0.0001" value={latitude} onChange={(event) => setLatitude(Number(event.target.value))} />
          </label>
          <label>
            <span>Longitud</span>
            <input type="number" step="0.0001" value={longitude} onChange={(event) => setLongitude(Number(event.target.value))} />
          </label>
          <button className="editor-reset" onClick={() => { setLatitude(BARCELONA.latitude); setLongitude(BARCELONA.longitude); setPlace(BARCELONA.name); }}>Barcelona</button>
        </div>
      )}

      <p className="calculation-note">La posició es calcula prenent Alnilam, al centre del cinturó, com a referència d’Orió.</p>
    </section>
  );
}
