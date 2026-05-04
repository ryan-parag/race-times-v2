'use client';

import Image from 'next/image';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import { getTeamLogoUrl } from '@/lib/team-logos';
import type { Team } from '@/types/f1';

export function TeamList({
  teams,
  activeTeamName,
  onSelectTeam,
  year,
  onYearChange,
  YearSelectorComponent,
}: {
  teams: Team[];
  activeTeamName: string | null;
  onSelectTeam: (teamName: string) => void;
  year: number;
  onYearChange: (y: number) => void;
  YearSelectorComponent: React.ComponentType<{ year: number; onYearChange: (y: number) => void }>;
}) {
  return (
    <aside className="flex h-full min-h-0 w-80 shrink-0 flex-col border-r border-zinc-200 bg-white">
      <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-zinc-200 px-4 py-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <TeamsIcon className="size-5 shrink-0 text-zinc-600" />
          <h2 className="text-lg text-zinc-900">Teams</h2>
        </div>
        <YearSelectorComponent year={year} onYearChange={onYearChange} />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-0 p-2" role="listbox" aria-label="Team list">
          {teams.map((team) => {
            const isActive = team.name === activeTeamName;
            const logoUrl = getTeamLogoUrl(team.name);
            console.log(team.name)
            return (
              <li key={team.name}>
                <button
                  type="button"
                  onClick={() => onSelectTeam(team.name)}
                  role="option"
                  aria-selected={isActive}
                  className={`cursor-pointer flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[#E10600] focus:ring-inset ${
                    isActive ? 'bg-zinc-100' : 'hover:bg-zinc-50'
                  }`}
                >
                  <TeamLogo name={team.name} color={team.color} logoUrl={logoUrl} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-900">{team.name}</p>
                    <p className="text-xs text-zinc-500">
                      {team.drivers.map((d) => d.lastName).join(' · ')}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

function TeamLogo({
  name,
  color,
  logoUrl,
}: {
  name: string;
  color: string;
  logoUrl: string | null;
}) {
  if (logoUrl) {
    return (
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-100 overflow-hidden relative`}
        style={{ backgroundColor: color }}
        >
        <Image
          src={logoUrl}
          alt={name}
          width={24}
          height={24}
          className="h-6 w-6 object-contain relative z-10"
          unoptimized
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = 'block';
          }}
        />
        <div
          className="h-full w-full absolute top-0 left-0 bottom-0 right-0 bg-black/20"
        />
      </div>
    );
  }
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100">
      <GroupWorkIcon className="h-5 w-5 text-zinc-400" fontSize="small" />
    </div>
  );
}

function TeamsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
