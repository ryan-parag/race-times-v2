'use client';

import type { Meeting } from '@/types/f1';
import { StatusBadge } from '@/components/ui/StatusBadge';
import Image from 'next/image';

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
}: {
  meetings: Meeting[];
  activeMeetingKey: number | null;
  onSelectMeeting: (key: number) => void;
  year: number;
  onYearChange: (y: number) => void;
  YearSelectorComponent: React.ComponentType<{ year: number; onYearChange: (y: number) => void }>;
}) {
  return (
    <aside className="flex h-full w-80 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-2">
          <ScheduleIcon className="size-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Schedule</h2>
        </div>
        <YearSelectorComponent year={year} onYearChange={onYearChange} />
      </div>
      <div className="flex-1 overflow-y-auto">
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
                  className={`flex w-full items-start gap-3 rounded-lg p-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[#E10600] focus:ring-inset ${
                    isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  {(() => {
                    const { month, day } = formatRaceDate(meeting.dateEnd);
                    return (
                      <div className="flex shrink-0 flex-col tabular-nums">
                        <span className="text-xs font-medium uppercase leading-tight text-gray-500">
                          {month}
                        </span>
                        <span className="text-xl font-bold leading-tight text-gray-900">
                          {day}
                        </span>
                      </div>
                    );
                  })()}
                  <div className="min-w-0 flex-1">
                    <p className={`font-semibold text-gray-900 ${isActive ? 'font-bold' : ''}`}>
                      {meeting.name}
                    </p>
                    <div className="mt-1">
                      <StatusBadge
                        status={status}
                        label={status === 'completed' ? 'Completed' : 'Not yet started'}
                      />
                    </div>
                  </div>
                  {meeting.countryFlag && (
                    <div className="relative size-6 shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={meeting.countryFlag}
                        alt=""
                        width={24}
                        height={24}
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
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
