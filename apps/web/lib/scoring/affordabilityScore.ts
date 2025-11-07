// apps/web/lib/scoring/affordabilityScore.ts

// Inputs this scorer cares about. Keep it lightweight and reusable.
export type AffordabilityInput = Partial<{
  affordability: number;           // precomputed 0..100 (if present, trust it)
  costOfLivingIndex: number;       // higher = more expensive
  foodCostIndex: number;           // higher = more expensive
  gdpPerCapitaUsd: number;         // higher = more expensive (proxy)
  fxLocalPerUSD: number;           // higher = cheaper locally (more local units per USD)
  localPerUSD: number;             // legacy alias
  usdToLocalRate: number;          // legacy alias
}> & Record<string, unknown>;

function clamp01(x: number) { return Math.max(0, Math.min(1, x)); }

function scaleTo100(value: number, min: number, max: number, invert = false) {
  if (!Number.isFinite(value)) return 50;
  if (min === max) return 50;
  const t = clamp01((value - min) / (max - min));
  const y = invert ? 1 - t : t;
  return Math.round(y * 100);
}

function toNum(x: unknown): number | undefined {
  const n = Number(x);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Compute an affordability score on 0..100.
 * If a precomputed `affordability` is present, we clamp+return it.
 * Otherwise derive from COL, food, GDP, and FX. Missing inputs default neutral (50).
 */
export function affordabilityScore(facts: AffordabilityInput): number {
  // Trust server if it already computed affordability
  const preset = toNum((facts as AffordabilityInput).affordability);
  if (typeof preset === 'number') return Math.max(0, Math.min(100, Math.round(preset)));

  const col  = toNum((facts as AffordabilityInput).costOfLivingIndex); // 30..120 typical
  const food = toNum((facts as AffordabilityInput).foodCostIndex);      // 20..200 typical
  const gdp  = toNum((facts as AffordabilityInput).gdpPerCapitaUsd);    // 2k..80k typical
  const fx   = toNum(
    (facts as AffordabilityInput).fxLocalPerUSD ??
    (facts as AffordabilityInput).localPerUSD ??
    (facts as AffordabilityInput).usdToLocalRate
  ); // 0.2..400 typical

  const parts: number[] = [];
  if (col  != null) parts.push(scaleTo100(col, 30, 120, true));  // lower COL → more affordable
  if (food != null) parts.push(scaleTo100(food, 20, 200, true)); // lower food → more affordable
  if (gdp  != null) parts.push(scaleTo100(gdp, 2000, 80000, true)); // lower GDP → cheaper
  if (fx   != null) parts.push(scaleTo100(fx, 0.2, 400, false)); // higher local/USD → cheaper

  if (parts.length === 0) return 50; // neutral baseline if no inputs
  return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);
}