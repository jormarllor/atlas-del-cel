export type EquatorialCoordinate = {
  raHours: number;
  decDeg: number;
};

export type HorizontalCoordinate = {
  altitude: number;
  azimuth: number;
};

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

export function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360;
}

export function julianDate(date: Date) {
  return date.getTime() / 86400000 + 2440587.5;
}

// Mean sidereal time is sufficient for an observing guide at this scale.
export function greenwichMeanSiderealTime(date: Date) {
  const jd = julianDate(date);
  const t = (jd - 2451545.0) / 36525;
  return normalizeDegrees(
    280.46061837 +
      360.98564736629 * (jd - 2451545.0) +
      0.000387933 * t * t -
      (t * t * t) / 38710000,
  );
}

export function equatorialToHorizontal(
  coordinate: EquatorialCoordinate,
  date: Date,
  latitudeDeg: number,
  longitudeDeg: number,
): HorizontalCoordinate {
  const raDeg = coordinate.raHours * 15;
  const lstDeg = normalizeDegrees(greenwichMeanSiderealTime(date) + longitudeDeg);
  const hourAngleDeg = normalizeDegrees(lstDeg - raDeg);
  const hourAngle = hourAngleDeg * RAD;
  const dec = coordinate.decDeg * RAD;
  const lat = latitudeDeg * RAD;

  const sinAltitude =
    Math.cos(hourAngle) * Math.cos(dec) * Math.cos(lat) +
    Math.sin(dec) * Math.sin(lat);
  const altitude = Math.asin(Math.max(-1, Math.min(1, sinAltitude)));

  const azimuth = Math.atan2(
    -Math.sin(hourAngle),
    Math.tan(dec) * Math.cos(lat) - Math.sin(lat) * Math.cos(hourAngle),
  );

  return {
    altitude: altitude * DEG,
    azimuth: normalizeDegrees(azimuth * DEG),
  };
}

export function compassDirection(azimuth: number) {
  const labels = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  return labels[Math.round(normalizeDegrees(azimuth) / 45) % 8];
}

export function formatDegrees(value: number) {
  return `${Math.round(value)}°`;
}

// Low-precision solar coordinates are ample for deciding whether twilight has ended.
export function solarEquatorialCoordinate(date: Date): EquatorialCoordinate {
  const daysSinceJ2000 = julianDate(date) - 2451545.0;
  const meanLongitude = normalizeDegrees(280.46 + 0.9856474 * daysSinceJ2000);
  const meanAnomaly = normalizeDegrees(357.528 + 0.9856003 * daysSinceJ2000) * RAD;
  const eclipticLongitude = normalizeDegrees(
    meanLongitude + 1.915 * Math.sin(meanAnomaly) + 0.02 * Math.sin(2 * meanAnomaly),
  ) * RAD;
  const obliquity = (23.439 - 0.0000004 * daysSinceJ2000) * RAD;
  const rightAscension = Math.atan2(
    Math.cos(obliquity) * Math.sin(eclipticLongitude),
    Math.cos(eclipticLongitude),
  );
  const declination = Math.asin(Math.sin(obliquity) * Math.sin(eclipticLongitude));

  return {
    raHours: normalizeDegrees(rightAscension * DEG) / 15,
    decDeg: declination * DEG,
  };
}

export function solarAltitude(date: Date, latitudeDeg: number, longitudeDeg: number) {
  return equatorialToHorizontal(
    solarEquatorialCoordinate(date),
    date,
    latitudeDeg,
    longitudeDeg,
  ).altitude;
}

export function nextObservableTime(
  coordinate: EquatorialCoordinate,
  from: Date,
  latitudeDeg: number,
  longitudeDeg: number,
  minimumAltitude = 12,
  maximumSolarAltitude = -12,
) {
  // Thirty-minute samples across half a year are precise enough for a guide
  // while keeping the calculation to only 8,640 lightweight iterations.
  const stepMs = 30 * 60 * 1000;
  const horizon = 180 * 24 * 60 * 60 * 1000;
  for (let delta = stepMs; delta <= horizon; delta += stepMs) {
    const candidate = new Date(from.getTime() + delta);
    const position = equatorialToHorizontal(coordinate, candidate, latitudeDeg, longitudeDeg);
    if (
      position.altitude >= minimumAltitude &&
      solarAltitude(candidate, latitudeDeg, longitudeDeg) <= maximumSolarAltitude
    ) return candidate;
  }
  return null;
}
