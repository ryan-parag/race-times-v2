'use client';

import type { Meeting } from '@/types/f1';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { Button } from '@base-ui/react/button';

type SessionWithStatus = {
  sessionKey: number;
  sessionName: string;
  status: 'completed' | 'upcoming' | 'next';
  localTime?: string;
};

function formatDetailDate(dateEnd: string): string {
  const d = new Date(dateEnd);
  const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = d.getDate();
  return `${month} ${day}`;
}

export function RaceDetail({
  meeting,
  sessions,
  nextSession,
  loading,
}: {
  meeting: Meeting | null;
  sessions: SessionWithStatus[];
  nextSession: SessionWithStatus | undefined;
  loading: boolean;
}) {
  if (!meeting) {
    return (
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-auto bg-gray-50 p-8 text-gray-500">
        <p className="text-lg">Select a race from the schedule.</p>
      </main>
    );
  }

  const displayDate = formatDetailDate(meeting.dateEnd);

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-auto bg-gray-50">
      {/* Subtle background image - circuit/track vibe */}
      {meeting.circuitImage && (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.06]"
          style={{ backgroundImage: `url(${meeting.circuitImage})` }}
          aria-hidden
        />
      )}
      <div className="relative flex flex-col p-6 md:p-8">
        <header className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500 tabular-nums">
            {displayDate}
          </p>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-gray-400">
            {meeting.officialName}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl text-gray-900 md:text-3xl">
              {meeting.name}
            </h1>
            <div className="inline-flex relative bg-white rounded-md over-flow-hidden border border-gray-300 shadow-xs">
              <CountryFlag countryCode={meeting.countryCode} size={40} />
              <span className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-b from-transparent to-white/50"/>
            </div>
          </div>
          {nextSession && (
            <p className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <span>Up next</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[#E10600]">
                <span className="inline-block size-2 rounded-full bg-[#E10600]" aria-hidden />
                {nextSession.sessionName}
              </span>
            </p>
          )}
        </header>

        <section>
          <h2 className="mb-4 text-lg text-gray-900">Sessions</h2>
          {loading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <span className="inline-block size-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#E10600]" />
              Loading sessions…
            </div>
          ) : (
            <ul className="flex flex-col gap-0 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
              {sessions.map((session) => (
                <li
                  key={session.sessionKey}
                  className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="flex items-center gap-3">
                    <StatusBadge
                      status={session.status}
                      label={session.sessionName}
                    />
                  </div>
                  <div className="flex items-center gap-4 tabular-nums">
                    {session.status === 'completed' && (
                      <Button
                        render={<a />}
                        nativeButton={false}
                        href={`https://www.formula1.com/en/results.html`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-10 px-3.5 m-0 outline-0 border border-gray-200 rounded-md bg-gray-50 font-inherit text-base font-medium leading-6 text-gray-900 select-none hover:data-[disabled]:bg-gray-50 hover:bg-gray-100 active:data-[disabled]:bg-gray-50 active:bg-gray-200 active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] active:border-t-gray-300 active:data-[disabled]:shadow-none active:data-[disabled]:border-t-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-800 focus-visible:-outline-offset-1 data-[disabled]:text-gray-500"
                      >
                        View results
                      </Button>
                    )}
                    {session.status === 'upcoming' && session.localTime && (
                      <span className="text-sm text-gray-600">{session.localTime}</span>
                    )}
                    {session.status === 'next' && session.localTime && (
                      <span className="text-sm font-medium text-[#E10600]">{session.localTime}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
