// apps/web/lib/display/SeasonalitySection.tsx
type FM = {
  best?: number[];
  todayLabel?: 'best' | 'good' | 'shoulder' | 'poor';
  hasDual?: boolean;
  areas?: { area?: string; months: number[] }[];
  source?: string;
};
type Props = { raw?: number; fm?: FM };

function monthName(n: number) {
  return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Math.max(1, Math.min(12, n)) - 1];
}
function listMonths(ms: number[]) {
  const uniq = Array.from(new Set(ms.filter(m => m>=1 && m<=12))).sort((a,b)=>a-b);
  return uniq.map(monthName).join(', ');
}

function fallbackSummary(raw?: number) {
  if (typeof raw !== 'number') return 'No seasonality data; treated as neutral timing.';
  if (raw >= 80) return 'Great timing to visit based on typical weather and crowd patterns.';
  if (raw >= 60) return 'Generally good timing to visit.';
  if (raw >= 40) return 'Okay timing; expect some weather/crowd tradeoffs.';
  return 'Less ideal timing; consider shoulder or peak months for better conditions.';
}

export function SeasonalitySection({ raw, fm }: Props) {
  const parts: string[] = [];

  if (fm?.best?.length) parts.push(`Best months: ${listMonths(fm.best)}.`);
  if (fm?.todayLabel) parts.push(`If you go now: ${fm.todayLabel}.`);
  if (fm?.hasDual) parts.push('There appear to be two distinct peak seasons.');
  if (fm?.areas?.length) {
    const top = fm.areas.slice(0, 3).map(a => a.area ? `${a.area} (${listMonths(a.months)})` : listMonths(a.months));
    parts.push(`Popular regions/windows: ${top.join('; ')}.`);
  }

  const text = parts.length ? parts.join(' ') : fallbackSummary(raw);

  return (
    <>
      {/* single headline under the section header */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm font-semibold">🌤️ Timing</span>
      </div>
      <p className="mt-2 text-sm leading-6">
        {text}
        {fm?.source ? (
          <> {' '}<a className="underline" href={fm.source} target="_blank" rel="noopener noreferrer">Source</a></>
        ) : null}
      </p>
    </>
  );
}