export type UrsaMajorPoint = {
  id: string;
  name: string;
  raHours: number;
  decDeg: number;
  magnitude: number;
  group: "carro" | "bear" | "companion" | "external";
};

// SIMBAD/CDS, consulted 2026-09-15: ICRS positions at epoch J2000.0.
// V magnitudes are display weights, not a promise of constant photometry.
// Mizar's display magnitude follows the named component in the IAU catalogue.
export const URSA_MAJOR_STARS: UrsaMajorPoint[] = [
  { id: "dubhe", name: "Dubhe", raHours: 11 + 3 / 60 + 43.67152 / 3600, decDeg: 61 + 45 / 60 + 3.7249 / 3600, magnitude: 1.79, group: "carro" },
  { id: "merak", name: "Merak", raHours: 11 + 1 / 60 + 50.4797515135 / 3600, decDeg: 56 + 22 / 60 + 56.761138187 / 3600, magnitude: 2.37, group: "carro" },
  { id: "phecda", name: "Phecda", raHours: 11 + 53 / 60 + 49.8473166 / 3600, decDeg: 53 + 41 / 60 + 41.135025 / 3600, magnitude: 2.44, group: "carro" },
  { id: "megrez", name: "Megrez", raHours: 12 + 15 / 60 + 25.5598467041 / 3600, decDeg: 57 + 1 / 60 + 57.421119850 / 3600, magnitude: 3.32, group: "carro" },
  { id: "alioth", name: "Alioth", raHours: 12 + 54 / 60 + 1.7495922 / 3600, decDeg: 55 + 57 / 60 + 35.362645 / 3600, magnitude: 1.77, group: "carro" },
  { id: "mizar", name: "Mizar · Alcor", raHours: 13 + 23 / 60 + 55.54048 / 3600, decDeg: 54 + 55 / 60 + 31.2671 / 3600, magnitude: 2.23, group: "carro" },
  { id: "alkaid", name: "Alkaid", raHours: 13 + 47 / 60 + 32.43776 / 3600, decDeg: 49 + 18 / 60 + 47.7602 / 3600, magnitude: 1.86, group: "carro" },
  { id: "alcor", name: "Alcor", raHours: 13 + 25 / 60 + 13.5378333 / 3600, decDeg: 54 + 59 / 60 + 16.654781 / 3600, magnitude: 4.01, group: "companion" },
  { id: "muscida", name: "Muscida", raHours: 8 + 30 / 60 + 15.8701566400 / 3600, decDeg: 60 + 43 / 60 + 5.405606188 / 3600, magnitude: 3.42, group: "bear" },
  { id: "talitha", name: "Talitha", raHours: 8 + 59 / 60 + 12.45362 / 3600, decDeg: 48 + 2 / 60 + 30.5741 / 3600, magnitude: 3.14, group: "bear" },
  { id: "tania-b", name: "Tania Borealis", raHours: 10 + 17 / 60 + 5.7792565752 / 3600, decDeg: 42 + 54 / 60 + 51.889698684 / 3600, magnitude: 3.45, group: "bear" },
  { id: "tania-a", name: "Tania Australis", raHours: 10 + 22 / 60 + 19.7276765267 / 3600, decDeg: 41 + 29 / 60 + 58.337745272 / 3600, magnitude: 3.05, group: "bear" },
  { id: "alula-b", name: "Alula Borealis", raHours: 11 + 18 / 60 + 28.7372062295 / 3600, decDeg: 33 + 5 / 60 + 39.501852796 / 3600, magnitude: 3.49, group: "bear" },
  { id: "alula-a", name: "Alula Australis", raHours: 11 + 18 / 60 + 10.931880 / 3600, decDeg: 31 + 31 / 60 + 45.44004 / 3600, magnitude: 3.79, group: "bear" },
];

export const CARRO_LINES = [
  ["dubhe", "merak"], ["merak", "phecda"], ["phecda", "megrez"], ["megrez", "dubhe"],
  ["megrez", "alioth"], ["alioth", "mizar"], ["mizar", "alkaid"],
] as const;

// Secondary recognition strokes: pedagogical, not official IAU stick figures.
export const BEAR_LINES = [
  ["dubhe", "muscida"], ["muscida", "talitha"],
  ["merak", "tania-b"], ["tania-b", "tania-a"],
  ["phecda", "alula-b"], ["alula-b", "alula-a"],
] as const;

export const URSA_MAJOR_GALAXIES = [
  { id: "m81", name: "M81", raHours: 9 + 55 / 60 + 33.1726556496 / 3600, decDeg: 69 + 3 / 60 + 55.062505368 / 3600 },
  { id: "m82", name: "M82", raHours: 9 + 55 / 60 + 52.430 / 3600, decDeg: 69 + 40 / 60 + 46.93 / 3600 },
  { id: "m101", name: "M101", raHours: 14 + 3 / 60 + 12.583 / 3600, decDeg: 54 + 20 / 60 + 55.50 / 3600 },
] as const;

export const POLARIS: UrsaMajorPoint = {
  id: "polaris", name: "Polaris · Óssa Menor",
  raHours: 2 + 31 / 60 + 49.09456 / 3600,
  decDeg: 89 + 15 / 60 + 50.7923 / 3600,
  magnitude: 2.02, group: "external",
};

export const ALIOTH = URSA_MAJOR_STARS.find(point => point.id === "alioth")!;

// A tangent-plane (gnomonic) projection, with north up and celestial east right.
// The same scale is used for both axes: no arbitrary per-star or axial distortion.
export function projectUrsaMajor(point: { raHours: number; decDeg: number }, centerRa = 11.5, centerDec = 53) {
  const rad = Math.PI / 180;
  const deltaRa = (point.raHours - centerRa) * 15 * rad;
  const dec = point.decDeg * rad;
  const dec0 = centerDec * rad;
  const denominator = Math.sin(dec0) * Math.sin(dec) + Math.cos(dec0) * Math.cos(dec) * Math.cos(deltaRa);
  return {
    x: Math.cos(dec) * Math.sin(deltaRa) / denominator / rad,
    y: -(Math.cos(dec0) * Math.sin(dec) - Math.sin(dec0) * Math.cos(dec) * Math.cos(deltaRa)) / denominator / rad,
  };
}

export function angularSeparation(a: { raHours: number; decDeg: number }, b: { raHours: number; decDeg: number }) {
  const rad = Math.PI / 180;
  const cosine = Math.sin(a.decDeg * rad) * Math.sin(b.decDeg * rad) + Math.cos(a.decDeg * rad) * Math.cos(b.decDeg * rad) * Math.cos((a.raHours - b.raHours) * 15 * rad);
  return Math.acos(Math.max(-1, Math.min(1, cosine))) / rad;
}
