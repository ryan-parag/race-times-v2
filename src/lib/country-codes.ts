/**
 * ISO 3166-1 alpha-3 to alpha-2 mapping for country-flag-icons (which uses alpha-2).
 * Covers F1 host countries and common codes returned by OpenF1 API.
 */
export const ALPHA3_TO_ALPHA2: Record<string, string> = {
  ARE: 'AE', // UAE
  ARG: 'AR',
  AUS: 'AU',
  AUT: 'AT',
  AZE: 'AZ',
  BHR: 'BH', // Bahrain - API uses BRN
  BEL: 'BE',
  BRA: 'BR',
  BRN: 'BH', // Bahrain (alternate code)
  CAN: 'CA',
  CHE: 'CH',
  CHN: 'CN',
  COL: 'CO',
  CZE: 'CZ',
  DEU: 'DE',
  ESP: 'ES',
  FRA: 'FR',
  GBR: 'GB',
  HUN: 'HU',
  IND: 'IN',
  ITA: 'IT',
  JPN: 'JP',
  KOR: 'KR',
  KSA: 'SA', // Saudi Arabia
  MEX: 'MX',
  MCO: 'MC', // Monaco
  MON: 'MC', // Monaco (alternate)
  MYS: 'MY',
  NED: 'NL', // Netherlands
  QAT: 'QA',
  RUS: 'RU',
  SGP: 'SG', // Singapore
  TUR: 'TR',
  USA: 'US',
  ZAF: 'ZA',
};

export function countryCodeToAlpha2(alpha3: string): string | null {
  const a3 = alpha3?.toUpperCase();
  if (!a3 || a3.length !== 3) return null;
  return ALPHA3_TO_ALPHA2[a3] ?? null;
}
