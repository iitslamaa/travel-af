export type Country = {
  name: string;
  score: number | null;
  visa: number | null;
  advisory: { levelNumber: number | null; levelText: string | null };
  seasonality: { bestMonths: number[]; summary: string | null };
};