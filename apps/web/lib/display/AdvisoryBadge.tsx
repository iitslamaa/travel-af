'use client';
import React from 'react';

export function advisoryLabel(level?: 1|2|3|4) {
  if (!level) return 'No advisory';
  return {
    1: 'Level 1 · Normal precautions',
    2: 'Level 2 · Increased caution',
    3: 'Level 3 · Reconsider travel',
    4: 'Level 4 · Do not travel',
  }[level];
}

export function advisoryEmoji(level?: 1|2|3|4) {
  if (!level) return 'ℹ️';
  return { 1: '🟢', 2: '🟡', 3: '🟠', 4: '🔴' }[level];
}

export function advisoryTone(level?: 1|2|3|4) {
  if (!level) return 'text-zinc-700';
  return {
    1: 'text-green-700',
    2: 'text-yellow-700',
    3: 'text-orange-700',
    4: 'text-red-700',
  }[level];
}

export function AdvisoryBadge({ level }: { level?: 1|2|3|4 }) {
  const label = advisoryLabel(level);
  const emoji = advisoryEmoji(level);
  const tone = advisoryTone(level);
  return (
    <span className={`inline-flex items-center gap-2 text-sm ${tone}`}>
      <strong className="whitespace-nowrap font-semibold">{label}</strong>
      <span aria-hidden>{emoji}</span>
    </span>
  );
}