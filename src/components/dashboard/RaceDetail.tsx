'use client';

import type { Meeting } from '@/types/f1';
import { StatusBadge } from '@/components/ui/StatusBadge';
import Image from 'next/image';

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
      <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-gray-50 p-8 text-gray-500">
        <p className="text-lg">Select a race from the schedule.</p>
      </main>
    );
  }

  const displayDate = formatDetailDate(meeting.dateEnd);

  return (
    <main className="relative flex flex-1 flex-col overflow-auto bg-gray-50">
      {/* Subtle background image - circuit/track vibe */}
      {meeting.circuitImage && (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.06]"
          style={{ backgroundImage: `url(${meeting.circuitImage})` }}
          aria-hidden
        />
      )}
      <div className="relative flex flex-1 flex-col p-6 md:p-8">
        <header className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500 tabular-nums">
            {displayDate}
          </p>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-gray-400">
            {meeting.officialName}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {meeting.name}
            </h1>
            {meeting.countryFlag && (
              <span className="relative inline-block size-8 overflow-hidden rounded">
                <Image
                  src={meeting.countryFlag}
                  alt=""
                  width={32}
                  height={32}
                  className="object-cover"
                  unoptimized
                />
              </span>
            )}
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
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Sessions</h2>
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
                      <a
                        href={`https://www.formula1.com/en/results.html`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-[#E10600] hover:underline"
                      >
                        View results
                      </a>
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
