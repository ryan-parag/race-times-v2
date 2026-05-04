'use client';

import Image from 'next/image';
import type { Driver } from '@/types/f1';

export function DriverDetail({ driver }: { driver: Driver | null }) {
  if (!driver) {
    return (
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-auto bg-zinc-50 p-8 text-zinc-500">
        <p className="text-lg">Select a driver from the list.</p>
      </main>
    );
  }

  console.log(driver)

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-auto bg-zinc-50">
      <div className="relative flex flex-col p-6 md:p-8">
        <header className="mb-8">
          {/* Team color bar + driver number */}
          <div className="mb-4 flex items-center gap-3">
            <div
              className="h-8 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: driver.teamColor }}
              aria-hidden
            />
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
              {driver.teamName}
            </p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">
                {driver.firstName}
              </p>
              <h1 className="text-3xl font-semibold text-zinc-900 md:text-4xl">
                {driver.lastName}
              </h1>
            </div>
            <span
              className="text-7xl font-extrabold tabular-nums leading-none md:text-8xl"
              style={{ color: driver.teamColor, opacity: 0.2 }}
              aria-hidden
            >
              {driver.driverNumber}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-mono font-medium text-zinc-600 shadow-xs">
              {driver.acronym}
            </span>
            <span className="inline-flex items-center rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-600 shadow-xs">
              #{driver.driverNumber}
            </span>
          </div>
        </header>

        {driver.headshotUrl && (
          <section className="flex justify-center">
            <div className="relative">
              <div
                className="absolute -inset-8 rounded-full opacity-10 blur-2xl"
                style={{ backgroundColor: driver.teamColor }}
                aria-hidden
              />
              <Image
                src={driver.headshotUrl}
                alt={driver.fullName}
                width={240}
                height={240}
                className="relative z-10 h-48 w-48 object-contain drop-shadow-xl md:h-60 md:w-60"
                unoptimized
              />
            </div>
          </section>
        )}

        <section className="mt-8">
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs">
            <div className="h-1 w-full" style={{ backgroundColor: driver.teamColor }} aria-hidden />
            <dl className="divide-y divide-zinc-100">
              <Row label="Full name" value={driver.fullName} />
              <Row label="Number" value={`#${driver.driverNumber}`} />
              <Row label="Acronym" value={driver.acronym} mono />
              <Row label="Team" value={driver.teamName} />
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <dt className="text-sm text-zinc-500">{label}</dt>
      <dd className={`text-sm font-medium text-zinc-900 ${mono ? 'font-mono' : ''}`}>{value}</dd>
    </div>
  );
}
