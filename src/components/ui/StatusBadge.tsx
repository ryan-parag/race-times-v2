'use client';

import * as React from 'react';

export type StatusBadgeVariant = 'completed' | 'upcoming' | 'next';

const variantStyles: Record<
  StatusBadgeVariant,
  { wrapper: string; icon: string; text: string }
> = {
  completed: {
    wrapper: 'text-green-700',
    icon: 'text-green-600',
    text: 'text-green-700',
  },
  upcoming: {
    wrapper: 'text-gray-500',
    icon: 'text-gray-400',
    text: 'text-gray-600',
  },
  next: {
    wrapper: 'text-[#E10600]',
    icon: 'text-[#E10600]',
    text: 'text-[#E10600] font-medium',
  },
};

const CompletedIcon = () => (
  <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ClockIcon = () => (
  <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DotIcon = () => (
  <span className="inline-block size-2 shrink-0 rounded-full bg-current" aria-hidden />
);

export interface StatusBadgeProps {
  status: StatusBadgeVariant;
  label: string;
  className?: string;
}

export function StatusBadge({ status, label, className = '' }: StatusBadgeProps) {
  const styles = variantStyles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm tabular-nums ${styles.wrapper} ${className}`}
      role="status"
    >
      {status === 'completed' && <CompletedIcon />}
      {status === 'upcoming' && <ClockIcon />}
      {status === 'next' && <DotIcon />}
      <span className={styles.text}>{label}</span>
    </span>
  );
}
