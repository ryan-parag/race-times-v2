'use client';

import type { Meeting } from '@/types/f1';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { CountryFlag } from '@/components/ui/CountryFlag';

function getMeetingStatus(dateEnd: string): 'completed' | 'upcoming' {
  return new Date(dateEnd).getTime() < Date.now() ? 'completed' : 'upcoming';
}

function formatRaceDate(dateEnd: string): { month: string; day: string } {
  const end = new Date(dateEnd);
  const month = end.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = end.getDate().toString();
  return { month, day };
}

export function RaceList({
  meetings,
  activeMeetingKey,
  onSelectMeeting,
  year,
  onYearChange,
  YearSelectorComponent,
  onCollapse,
  collapseLabel = 'Collapse',
}: {
  meetings: Meeting[];
  activeMeetingKey: number | null;
  onSelectMeeting: (key: number) => void;
  year: number;
  onYearChange: (y: number) => void;
  YearSelectorComponent: React.ComponentType<{ year: number; onYearChange: (y: number) => void }>;
  onCollapse?: () => void;
  collapseLabel?: string;
}) {
  return (
    <aside className="flex h-full min-h-0 w-80 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-gray-200 px-4 py-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <ScheduleIcon className="size-5 shrink-0 text-gray-600" />
          <h2 className="text-lg text-gray-900">Schedule</h2>
        </div>
        <div className="flex items-center gap-2">
          <YearSelectorComponent year={year} onYearChange={onYearChange} />
          {onCollapse && (
            <button
              type="button"
              onClick={onCollapse}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E10600]"
              aria-label={collapseLabel}
              title={collapseLabel}
            >
              <ChevronLeftIcon className="size-5" />
            </button>
          )}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-0 p-2" role="listbox" aria-label="Race list">
          {meetings.map((meeting) => {
            const isActive = meeting.meetingKey === activeMeetingKey;
            const status = getMeetingStatus(meeting.dateEnd);
            return (
              <li key={meeting.meetingKey}>
                <button
                  type="button"
                  onClick={() => onSelectMeeting(meeting.meetingKey)}
                  role="option"
                  aria-selected={isActive}
                  className={`cursor-pointer flex w-full items-start gap-3 rounded-lg p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[#E10600] focus:ring-inset ${
                    isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  {(() => {
                    const { month, day } = formatRaceDate(meeting.dateEnd);
                    return (
                      <div className="flex shrink-0 flex-col tabular-nums w-14 h-14 overflow-hidden rounded-md border border-gray-200 shadow-xs bg-white">
                        <span className={`text-xs text-center py-0.5 font-medium uppercase leading-tight ${status === 'completed' ? 'text-gray-500 bg-gray-100' : 'text-red-500 bg-white'}`}>
                          {month}
                        </span>
                        <span className={`h-full flex flex-1 items-center justify-center text-xl leading-tight ${status === 'completed' ? 'text-gray-700' : 'text-gray-950'}`}>
                          {day}
                        </span>
                      </div>
                    );
                  })()}
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-900 truncate">
                      {meeting.name}
                    </p>
                    <div className="mt-1">
                      <StatusBadge
                        status={status}
                        label={status === 'completed' ? 'Completed' : 'Not yet started'}
                      />
                    </div>
                  </div>
                  <div className="inline-flex relative bg-white rounded-md over-flow-hidden border border-gray-300 shadow-xs">
                    <CountryFlag countryCode={meeting.countryCode} size={20} />
                    <span className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-b from-transparent to-white/50"/>
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

function ScheduleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}
