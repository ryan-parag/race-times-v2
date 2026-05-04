'use client';

import Image from 'next/image';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import { getTeamLogoUrl } from '@/lib/team-logos';
import type { Team } from '@/types/f1';

export function TeamDetail({ team }: { team: Team | null }) {
  if (!team) {
    return (
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-auto bg-zinc-50 p-8 text-zinc-500">
        <p className="text-lg">Select a team from the list.</p>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-auto bg-zinc-50">
      <div className="relative flex flex-col p-6 md:p-8">
        <header className="mb-8">
          <div className="flex items-center gap-3">
            {(() => {
              const logoUrl = getTeamLogoUrl(team.name);
              return logoUrl ? (
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-zinc-200 overflow-hidden`}
                  style={{ backgroundColor: team.color }}
                >
                  <Image
                    src={logoUrl}
                    alt={team.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                  <GroupWorkIcon className="text-zinc-400" />
                </div>
              );
            })()}
            <h1 className="text-2xl text-zinc-900 md:text-3xl">{team.name}</h1>
          </div>
          <p className="mt-2 text-sm text-zinc-500">
            {team.drivers.length} driver{team.drivers.length !== 1 ? 's' : ''} · {new Date().getFullYear()} season
          </p>
        </header>

        <section>
          <h2 className="mb-4 text-lg text-zinc-900">Drivers</h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            {team.drivers.map((driver) => (
              <div
                key={driver.driverNumber}
                className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs"
                style={{ minWidth: 220 }}
              >
                <div className="h-1 w-full" style={{ backgroundColor: team.color }} aria-hidden />
                <div className="flex flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                        {driver.firstName}
                      </p>
                      <h3 className="text-xl font-semibold text-zinc-900">{driver.lastName}</h3>
                    </div>
                    <span
                      className="text-3xl font-extrabold tabular-nums leading-none"
                      style={{ color: team.color }}
                    >
                      {driver.driverNumber}
                    </span>
                  </div>

                  {driver.headshotUrl && (
                    <div className="mt-4 flex justify-center">
                      <Image
                        src={driver.headshotUrl}
                        alt={driver.fullName}
                        width={120}
                        height={120}
                        className="h-28 w-28 object-contain drop-shadow"
                        unoptimized
                      />
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-mono font-medium text-zinc-600">
                      {driver.acronym}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
