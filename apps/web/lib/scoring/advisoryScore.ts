export function advisoryScore(level?: 1 | 2 | 3 | 4): number {
  // Level 1 = safest (100), Level 4 = worst (25)
  if (!level) return 50; // neutral default
  return ((5 - level) / 4) * 100;
}