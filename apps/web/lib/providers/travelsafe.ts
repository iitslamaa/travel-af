export type TravelSafeEntry = {
  overall?: number;
  url?: string;
  summary?: string;
};

export async function buildTravelSafeIndex(): Promise<Map<string, TravelSafeEntry>> {
  // Stub: no data yet
  return new Map<string, TravelSafeEntry>();
}