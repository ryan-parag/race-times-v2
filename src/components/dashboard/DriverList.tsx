'use client';

import Image from 'next/image';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import { getTeamLogoUrl } from '@/lib/team-logos';
import type { Driver } from '@/types/f1';

export function DriverList({
  drivers,
  activeDriverNumber,
  onSelectDriver,
  year,
  onYearChange,
  YearSelectorComponent,
}: {
  drivers: Driver[];
  activeDriverNumber: number | null;
  onSelectDriver: (driverNumber: number) => void;
  year: number;
  onYearChange: (y: number) => void;
  YearSelectorComponent: React.ComponentType<{ year: number; onYearChange: (y: number) => void }>;
}) {
  return (
    <aside className="flex h-full min-h-0 w-80 shrink-0 flex-col border-r border-zinc-200 bg-white">
      <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-zinc-200 px-4 py-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <DriversIcon className="size-5 shrink-0 text-zinc-600" />
          <h2 className="text-lg text-zinc-900">Drivers</h2>
        </div>
        <YearSelectorComponent year={year} onYearChange={onYearChange} />
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-0 p-2" role="listbox" aria-label="Driver list">
          {drivers.map((driver) => {
            const isActive = driver.driverNumber === activeDriverNumber;
            return (
              <li key={driver.driverNumber}>
                <button
                  type="button"
                  onClick={() => onSelectDriver(driver.driverNumber)}
                  role="option"
                  aria-selected={isActive}
                  className={`cursor-pointer flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[#E10600] focus:ring-inset ${
                    isActive ? 'bg-zinc-100' : 'hover:bg-zinc-50'
                  }`}
                >
                  {/* Number badge */}
                  <div className="rounded-full inline-flex items-center justify-center border border-black/5 overflow-hidden w-8 h-8 bg-zinc-100">
                    {driver.headshotUrl ? (
                      <Image
                        src={driver.headshotUrl}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 shrink-0 object-contain"
                        unoptimized
                      />
                    )
                     : (<DriversIcon className="h-5 w-5 text-zinc-400" />)
                     }
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {driver.firstName}{' '}
                      <span className="font-semibold">{driver.lastName}</span>
                    </p>
                    <p className="truncate text-xs text-zinc-500">{driver.teamName}</p>
                  </div>

                  <DriverTeamBadge
                    driverNumber={driver.driverNumber}
                    teamName={driver.teamName}
                    teamColor={driver.teamColor}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

function DriverTeamBadge({
  driverNumber,
  teamName,
  teamColor,
}: {
  driverNumber: number;
  teamName: string;
  teamColor: string;
}) {
  const logoUrl = getTeamLogoUrl(teamName);
  if (logoUrl) {
    return (
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-100 overflow-hidden relative bg-zinc-200"
        style={{ backgroundColor: teamColor }}
        >
        <Image
          src={logoUrl}
          alt={teamName}
          width={24}
          height={24}
          className="h-5 w-5 object-contain relative z-10"
          unoptimized
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div
          className="h-full w-full absolute top-0 left-0 bottom-0 right-0 bg-black/20"
        />
        <div
          className="hidden h-full w-full items-center justify-center text-xs font-bold tabular-nums text-white"
          style={{ backgroundColor: teamColor }}
        >
          {driverNumber}
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-100">
      <GroupWorkIcon className="text-zinc-400" sx={{ fontSize: 16 }} />
    </div>
  );
}

function DriversIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
