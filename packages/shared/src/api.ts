export type AdvisoryDTO = {
  iso2: string;         // ALWAYS 2-letter uppercase
  country: string;
  level: 1|2|3|4;
  updatedAt: string;    // ISO datetime
  url: string;
  summary: string;
};

export type CountryRowDTO = {
  iso2: string;
  iso3: string;
  m49: number;
  name: string;
  region?: string;
  subregion?: string;
  aliases?: string[];
  advisory: AdvisoryDTO | null;
  facts?: Record<string, unknown>;
};