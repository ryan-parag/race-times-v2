const TEAM_LOGO_MAP: Record<string, string> = {
  'Red Bull Racing': '/teams/red-bull.png',
  'Ferrari': '/teams/ferrari.png',
  'Mercedes': '/teams/mercedes.png',
  'McLaren': '/teams/mclaren.png',
  'Aston Martin': '/teams/aston-martin.png',
  'Alpine': '/teams/alpine.png',
  'Williams': '/teams/williams.png',
  'RB': '/teams/racing-bulls.png',
  'Visa Cash App RB': '/teams/racing-bulls.png',
  'Racing Bulls': '/teams/racing-bulls.png',
  'Haas F1 Team': '/teams/haas.png',
  'Haas': '/teams/haas.png',
  'Audi': '/teams/audi.png',
  'Cadillac': '/teams/cadillac.png',
};

export function getTeamLogoUrl(teamName: string): string | null {
  return TEAM_LOGO_MAP[teamName] ?? null;
}
