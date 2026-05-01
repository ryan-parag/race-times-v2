'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Team } from '@/types/f1';
import { TeamList } from './TeamList';
import { TeamDetail } from './TeamDetail';
import { YearSelector } from './YearSelector';
import { MobileDrawer, MobileDrawerProvider, useMobileDrawer } from './MobileDrawer';

function DashboardInner({
  teams,
  year,
  initialTeamName,
}: {
  teams: Team[];
  year: number;
  initialTeamName?: string | null;
}) {
  const router = useRouter();
  const { setOpen: setDrawerOpen } = useMobileDrawer();
  const [activeTeamName, setActiveTeamName] = useState<string | null>(
    initialTeamName ?? teams[0]?.name ?? null
  );

  const activeTeam = teams.find((t) => t.name === activeTeamName) ?? null;

  const handleYearChange = (newYear: number) => {
    router.push(`/teams?year=${newYear}`);
  };

  const handleSelectTeam = (teamName: string) => {
    setActiveTeamName(teamName);
    window.history.replaceState(null, '', `/teams?year=${year}&team=${encodeURIComponent(teamName)}`);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Mobile: header */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-zinc-200 bg-white px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#E10600]"
        >
          <TeamsIcon className="size-5 text-zinc-600" />
          Teams
        </button>
        <YearSelector year={year} onYearChange={handleYearChange} />
      </div>

      <MobileDrawer title="Teams">
        <TeamList
          teams={teams}
          activeTeamName={activeTeamName}
          onSelectTeam={handleSelectTeam}
          year={year}
          onYearChange={handleYearChange}
          YearSelectorComponent={YearSelector}
        />
      </MobileDrawer>

      <div className="flex min-h-0 flex-1 w-full">
        <div className="hidden h-full w-80 shrink-0 flex-col overflow-hidden md:flex">
          <TeamList
            teams={teams}
            activeTeamName={activeTeamName}
            onSelectTeam={handleSelectTeam}
            year={year}
            onYearChange={handleYearChange}
            YearSelectorComponent={YearSelector}
          />
        </div>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <TeamDetail team={activeTeam} />
        </div>
      </div>
    </>
  );
}

export function TeamsDashboard({
  teams,
  year,
  initialTeamName,
}: {
  teams: Team[];
  year: number;
  initialTeamName?: string | null;
}) {
  return (
    <MobileDrawerProvider>
      <DashboardInner teams={teams} year={year} initialTeamName={initialTeamName} />
    </MobileDrawerProvider>
  );
}

function TeamsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
