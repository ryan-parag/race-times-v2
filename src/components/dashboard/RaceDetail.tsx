'use client';

import type { Meeting } from '@/types/f1';
import { Tabs } from '@base-ui/react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { CountryFlag } from '@/components/ui/CountryFlag';
import { SessionResults } from './SessionResults';

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
  const defaultSession =
    nextSession?.sessionKey ??
    [...sessions].reverse().find((s) => s.status === 'completed')?.sessionKey ??
    sessions[0]?.sessionKey ??
    null;

  if (!meeting) {
    return (
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-auto bg-zinc-50 p-8 text-zinc-500">
        <p className="text-lg">Select a race from the schedule.</p>
      </main>
    );
  }

  const displayDate = formatDetailDate(meeting.dateEnd);

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-auto bg-zinc-50">
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
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 tabular-nums">
            {displayDate}
          </p>
          
          <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-zinc-400">
            {meeting.officialName}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl text-zinc-900 md:text-3xl">
              {meeting.name}
            </h1>
            <div className="inline-flex relative bg-white rounded-md over-flow-hidden border border-zinc-300 shadow-xs">
              <CountryFlag countryCode={meeting.countryCode} size={40} />
              <span className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-b from-transparent to-white/50"/>
            </div>
          </div>
          {nextSession && (
            <p className="mt-4 flex items-center gap-2 text-sm text-zinc-600">
              <span>Up next</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[#E10600]">
                <span className="inline-block size-2 rounded-full ring-1 ring-offset-1 ring-[#E10600] animate animate-pulse bg-[#E10600]" aria-hidden />
                {nextSession.sessionName}
              </span>
            </p>
          )}
        </header>

        <section className="-mx-6 md:-mx-8">
          {loading ? (
            <div className="flex items-center gap-2 px-6 md:px-8 text-zinc-500">
              <span className="inline-block size-4 animate-spin rounded-full border-2 border-zinc-300 border-t-[#E10600]" />
              Loading sessions…
            </div>
          ) : (
            <Tabs.Root key={meeting.meetingKey} defaultValue={defaultSession}>
              <Tabs.List className="relative flex overflow-x-auto border-b border-zinc-200 px-6 md:px-8">
                {sessions.map((session) => (
                  <Tabs.Tab
                    key={session.sessionKey}
                    value={session.sessionKey}
                    className="transition cursor-pointer flex shrink-0 items-center gap-2 border-b-2 border-transparent px-2 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-700 focus:outline-none data-active:border-[#E10600] backdrop-blur-md data-active:text-zinc-900 data-active:bg-black/5 rounded-t-md"
                  >
                    <StatusBadge status={session.status} />
                    {session.sessionName}
                  </Tabs.Tab>
                ))}
              </Tabs.List>
              {sessions.map((session) => (
                <Tabs.Panel key={session.sessionKey} value={session.sessionKey} className="px-6 md:px-8 pt-6">
                  {session.status === 'completed' ? (
                    <SessionResults sessionKey={session.sessionKey} />
                  ) : (
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-zinc-500">
                        {session.status === 'next' ? 'Starting soon' : 'Scheduled'}
                      </p>
                      {session.localTime && (
                        <p className={`text-sm font-medium ${session.status === 'next' ? 'text-[#E10600]' : 'text-zinc-700'}`}>
                          {session.localTime}
                        </p>
                      )}
                    </div>
                  )}
                </Tabs.Panel>
              ))}
            </Tabs.Root>
          )}
        </section>
      </div>
    </main>
  );
}
