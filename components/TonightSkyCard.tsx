"use client";

import { useEffect, useMemo, useState } from "react";
import {
  compassDirection,
  equatorialToHorizontal,
  formatDegrees,
  nextObservableTime,
  solarAltitude,
} from "./astronomy";

const BARCELONA = { latitude: 41.3874, longitude: 2.1686, name: "Barcelona" };
const SAVED_LOCATION_KEY = "atlas-del-cel-observation-location";
const DARK_SKY_SUN_ALTITUDE = -12;

type TonightSkyCardProps = {
  name: string;
  referenceName: string;
  coordinate: { raHours: number; decDeg: number };
  referenceDescription?: string;
  objectArticle?: "el" | "la";
};

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

export default function TonightSkyCard({ name, referenceName, coordinate, referenceDescription, objectArticle = "la" }: TonightSkyCardProps) {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [place, setPlace] = useState("");
  const [time, setTime] = useState<Date | null>(null);
  const [editing, setEditing] = useState(false);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    setTime(defaultObservationTime());
    try {
      const saved = window.localStorage.getItem(SAVED_LOCATION_KEY);
      if (saved) {
        const location = JSON.parse(saved) as { latitude: number; longitude: number; name: string };
        if (Number.isFinite(location.latitude) && Number.isFinite(location.longitude)) {
          setLatitude(location.latitude);
          setLongitude(location.longitude);
          setPlace(location.name || "Ubicació desada");
        }
      }
    } catch {
      // A missing or invalid saved location simply returns the card to its initial prompt.
    }
  }, []);

  const position = useMemo(
    () => time && latitude !== null && longitude !== null ? equatorialToHorizontal(coordinate, time, latitude, longitude) : null,
    [coordinate, time, latitude, longitude],
  );
  const next = useMemo(
    () => time && latitude !== null && longitude !== null
      ? nextObservableTime(coordinate, time, latitude, longitude, 12, DARK_SKY_SUN_ALTITUDE)
      : null,
    [coordinate, time, latitude, longitude],
  );

  if (!time) {
    return <section className="tonight-card tonight-loading"><p className="section-kicker">AQUESTA NIT · CÀLCUL ASTRONÒMIC</p><p>Calculant la posició de {name}…</p></section>;
  }

  const saveLocation = (newLatitude: number, newLongitude: number, name: string) => {
    setLatitude(newLatitude);
    setLongitude(newLongitude);
    setPlace(name);
    window.localStorage.setItem(SAVED_LOCATION_KEY, JSON.stringify({ latitude: newLatitude, longitude: newLongitude, name }));
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (result) => {
        saveLocation(result.coords.latitude, result.coords.longitude, "La teva ubicació");
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  };

  if (latitude === null || longitude === null || !position) {
    return (
      <section className="tonight-card" aria-label="Tria la ubicació d’observació">
        <p className="section-kicker">AQUESTA NIT · CÀLCUL ASTRONÒMIC</p>
        <h2>Des d’on observaràs?</h2>
        <p className="tonight-place">Necessitem la ubicació per calcular què veuràs i quan el cel serà prou fosc.</p>
        <div className="tonight-actions">
          <button className="small-button" onClick={useMyLocation}>{locating ? "Localitzant…" : "Utilitza la meva ubicació"}</button>
          <button className="small-button ghost-small" onClick={() => saveLocation(BARCELONA.latitude, BARCELONA.longitude, "Exemple: Barcelona")}>Exemple: Barcelona</button>
        </div>
      </section>
    );
  }

  const sunIsLowEnough = solarAltitude(time, latitude, longitude) <= DARK_SKY_SUN_ALTITUDE;
  const nextOpportunity = next ? `Propera bona oportunitat d’observació: ${formatObservationDate(next)}.` : "No hi ha cap bona oportunitat d’observació durant els propers mesos.";
  const searchPrompt = objectArticle === "el" ? "Busca’l" : "Busca-la";

  const status = position.altitude >= 12 && sunIsLowEnough
    ? { label: `${name} és observable`, className: "visible", detail: `${searchPrompt} cap a ${compassDirection(position.azimuth)}, a uns ${formatDegrees(position.altitude)} sobre l’horitzó.` }
    : !sunIsLowEnough
      ? { label: "El cel encara no és prou fosc", className: "low", detail: nextOpportunity }
    : position.altitude > 0
      ? { label: `${name} és molt baix`, className: "low", detail: nextOpportunity }
      : { label: `${name} és sota l’horitzó`, className: "hidden", detail: nextOpportunity };

  return (
    <section className="tonight-card" aria-label={`Posició de ${name} per data, hora i ubicació`}>
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
          <button className="editor-reset" onClick={() => saveLocation(BARCELONA.latitude, BARCELONA.longitude, "Exemple: Barcelona")}>Exemple: Barcelona</button>
        </div>
      )}

      <p className="calculation-note">{referenceDescription ?? `La posició es calcula prenent ${referenceName} com a referència de ${name}.`}</p>
    </section>
  );
}
