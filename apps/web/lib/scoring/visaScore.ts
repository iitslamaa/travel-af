// apps/web/lib/scoring/visaScore.ts
export function visaScore(ease?: number): number {
  // trust the provider’s computed visaEase, just clamp to 0–100
  if (typeof ease !== 'number' || !Number.isFinite(ease)) return 50;
  return Math.max(0, Math.min(100, Math.round(ease)));
}