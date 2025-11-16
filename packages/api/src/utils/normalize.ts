import type { Advisory, Seasonality } from "../types/country";

export function normalizeAdvisory(input: any): Advisory {
  const n = input?.level ?? input?.advisory_level ?? input?.advisoryLevel ?? input?.levelNumber ?? null;
  const levelNumber =
    typeof n === "number" ? n :
    typeof n === "string" ? (parseInt(n, 10) || null) :
    null;
  return { levelNumber, levelText: levelNumber ? `Level ${levelNumber}` : null };
}

export function normalizeSeasonality(input: any): Seasonality {
  const monthsFromNames = (names: string[]) => {
    const map: Record<string, number> = {jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,oct:10,nov:11,dec:12};
    return names.map(m => map[String(m).slice(0,3).toLowerCase()]).filter(Boolean);
  };

  let best: number[] = [];
  if (Array.isArray(input?.best)) {
    best = input.best.map((m: any) => Number(m)).filter((n: number) => n >= 1 && n <= 12);
  } else if (Array.isArray(input?.months)) {
    const arr = input.months;
    best = typeof arr[0] === "string" ? monthsFromNames(arr)
         : arr.map((m: any) => Number(m)).filter((n: number) => n >= 1 && n <= 12);
  }

  const summary = typeof input?.summary === "string" ? input.summary : null;
  return { bestMonths: [...new Set(best)].sort((a,b)=>a-b), summary };
}