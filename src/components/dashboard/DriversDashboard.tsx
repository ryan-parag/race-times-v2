'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Driver } from '@/types/f1';
import { DriverList } from './DriverList';
import { DriverDetail } from './DriverDetail';
import { YearSelector } from './YearSelector';
import { MobileDrawer, MobileDrawerProvider, useMobileDrawer } from './MobileDrawer';

function DashboardInner({
  drivers,
  year,
  initialDriverNumber,
}: {
  drivers: Driver[];
  year: number;
  initialDriverNumber?: number | null;
}) {
  const router = useRouter();
  const { setOpen: setDrawerOpen } = useMobileDrawer();
  const [activeDriverNumber, setActiveDriverNumber] = useState<number | null>(
    initialDriverNumber ?? drivers[0]?.driverNumber ?? null
  );

  const activeDriver = drivers.find((d) => d.driverNumber === activeDriverNumber) ?? null;

  const handleYearChange = (newYear: number) => {
    router.push(`/drivers?year=${newYear}`);
  };

  const handleSelectDriver = (driverNumber: number) => {
    setActiveDriverNumber(driverNumber);
    window.history.replaceState(null, '', `/drivers?year=${year}&driver=${driverNumber}`);
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
          <DriversIcon className="size-5 text-zinc-600" />
          Drivers
        </button>
        <YearSelector year={year} onYearChange={handleYearChange} />
      </div>

      <MobileDrawer title="Drivers">
        <DriverList
          drivers={drivers}
          activeDriverNumber={activeDriverNumber}
          onSelectDriver={handleSelectDriver}
          year={year}
          onYearChange={handleYearChange}
          YearSelectorComponent={YearSelector}
        />
      </MobileDrawer>

      <div className="flex min-h-0 flex-1 w-full">
        <div className="hidden h-full w-80 shrink-0 flex-col overflow-hidden md:flex">
          <DriverList
            drivers={drivers}
            activeDriverNumber={activeDriverNumber}
            onSelectDriver={handleSelectDriver}
            year={year}
            onYearChange={handleYearChange}
            YearSelectorComponent={YearSelector}
          />
        </div>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <DriverDetail driver={activeDriver} />
        </div>
      </div>
    </>
  );
}

export function DriversDashboard({
  drivers,
  year,
  initialDriverNumber,
}: {
  drivers: Driver[];
  year: number;
  initialDriverNumber?: number | null;
}) {
  return (
    <MobileDrawerProvider>
      <DashboardInner drivers={drivers} year={year} initialDriverNumber={initialDriverNumber} />
    </MobileDrawerProvider>
  );
}

function DriversIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
