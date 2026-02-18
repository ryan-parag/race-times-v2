'use client';

import { hasFlag } from 'country-flag-icons';
import { countryCodeToAlpha2 } from '@/lib/country-codes';

const FLAG_CDN = 'https://purecatamphetamine.github.io/country-flag-icons/3x2';

type CountryFlagProps = {
  countryCode: string;
  className?: string;
  size?: number;
  title?: string;
};

export function CountryFlag({
  countryCode,
  className = '',
  size = 24,
  title,
}: CountryFlagProps) {
  const alpha2 = countryCodeToAlpha2(countryCode);
  if (!alpha2 || !hasFlag(alpha2)) return null;

  return (
    <img
      src={`${FLAG_CDN}/${alpha2}.svg`}
      alt=""
      width={size}
      height={Math.round((size * 2) / 3)}
      className={`inline-block shrink-0 overflow-hidden rounded object-cover ${className}`}
      title={title ?? undefined}
    />
  );
}
