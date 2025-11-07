import { ScorePill } from './ScorePill';

/** Verbose explanation we can also reuse elsewhere */
export function explainTravelSafe(val?: number) {
  if (typeof val !== 'number') {
    return '🛈 No TravelSafe Abroad data; treated as neutral.';
  }
  if (val >= 85) {
    return '🛡️ Very strong safety indicators for visitors. Normal city smarts apply; violent crime is rare in tourist areas.';
  }
  if (val >= 70) {
    return '🙂 Generally positive safety picture. Petty theft in busy zones is the main risk—keep valuables zipped and visible.';
  }
  if (val >= 50) {
    return '⚠️ Mixed indicators. Know the neighborhoods, use trusted transport at night, and keep copies of documents.';
  }
  return '🚨 Elevated risk profile. Stick to well‑reviewed areas, avoid late‑night transits, and follow local guidance closely.';
}

/**
 * Compact header row to mirror the VISA section style:
 *   [ScorePill]  🛡️ {first sentence of explanation, no leading emoji}
 *   ...right-aligned: Raw · Weight
 *
 * NOTE: This component already includes the right‑hand "Raw · Weight".
 * Make sure the calling page does NOT render its own header/label above it,
 * or you will see duplicated headers.
 */
export function TravelSafeSection({
  raw,
  weightPct = 15,
}: { raw?: number; weightPct?: number }) {
  const value = typeof raw === 'number' ? Math.round(raw) : undefined;

  // First sentence from the long explanation
  const firstSentence = explainTravelSafe(value).split(/\.(\s|$)/)[0] || '';

  // Strip any leading emoji/symbols from the sentence so we can force a shield icon.
  // Removes non-letter/digit characters at the start (emoji, punctuation, spaces).
  const stripped = firstSentence.replace(/^[^\p{L}\p{N}]+/u, '');

  return (
    <header className="flex items-baseline justify-between">
      <div className="mt-1 flex items-center gap-2">
        <ScorePill value={value} />
        <span className="text-sm font-semibold">🛡️ {stripped}</span>
      </div>
      <div className="text-sm text-zinc-500">
        Raw: {value ?? '—'} · Weight: {weightPct}%
      </div>
    </header>
  );
}