'use client';
import React from 'react';

export type VisaType = 'visa_free' | 'voa' | 'evisa' | 'visa_required' | 'ban';

function resolveVisaBadge(
  visaType?: VisaType,
  ease?: number,
  feeUsd?: number
): { label: string; emoji: string; tone: 'green' | 'yellow' | 'red' | 'black' } | null {
  const rounded = typeof ease === 'number' ? Math.round(ease) : undefined;
  const hasFee = typeof feeUsd === 'number' && feeUsd > 0;
  const isFree = feeUsd === 0;

  if (visaType === 'visa_free' || rounded === 100)
    return { label: 'Visa-free', emoji: '✅', tone: 'green' };
  if (visaType === 'voa') {
    if (isFree || (!hasFee && (rounded ?? 0) >= 90))
      return { label: 'Visa on arrival — free', emoji: '✅', tone: 'green' };
    if (hasFee)
      return { label: 'Visa on arrival — paid', emoji: '⚠️', tone: 'yellow' };
    return { label: 'Visa on arrival', emoji: '⚠️', tone: 'yellow' };
  }
  if (visaType === 'evisa') {
    if (isFree || (!hasFee && (rounded ?? 0) >= 60))
      return { label: 'Free eVisa/ETA', emoji: '✅', tone: 'green' };
    if (hasFee)
      return { label: 'eVisa/ETA — paid', emoji: '⚠️', tone: 'yellow' };
    return { label: 'eVisa/ETA', emoji: '⚠️', tone: 'yellow' };
  }
  if (visaType === 'visa_required')
    return { label: 'Visa required', emoji: '⛔️', tone: 'red' };
  if (visaType === 'ban' || rounded === 0)
    return { label: 'Not allowed', emoji: '☠️', tone: 'black' };
  return null;
}

export function VisaBadge({
  visaType,
  ease,
  feeUsd,
}: {
  visaType?: VisaType;
  ease?: number;
  feeUsd?: number;
}) {
  const badge = resolveVisaBadge(visaType, ease, feeUsd);
  if (!badge) return null;

  const toneClass =
    badge.tone === 'green'
      ? 'text-green-700'
      : badge.tone === 'yellow'
      ? 'text-yellow-700'
      : badge.tone === 'red'
      ? 'text-red-700'
      : 'text-zinc-800';

  return (
    <span className={`inline-flex items-center gap-2 text-sm ${toneClass}`}>
      <strong className="whitespace-nowrap font-semibold">{badge.label}</strong>
      <span className="ml-1" aria-hidden>
        {badge.emoji}
      </span>
    </span>
  );
}