'use client';

import { useRouter } from 'next/navigation';
import type { Meeting } from '@/types/f1';
import { useF1Data } from '@/hooks/useF1Data';
import { RaceList } from './RaceList';
import { RaceDetail } from './RaceDetail';
import { YearSelector } from './YearSelector';
import { MobileDrawer, MobileDrawerProvider, useMobileDrawer } from './MobileDrawer';

function DashboardInner({
  initialMeetings,
  year,
}: {
  initialMeetings: Meeting[];
  year: number;
}) {
  const router = useRouter();
  const { setOpen: setDrawerOpen } = useMobileDrawer();
  const {
    meetings,
    activeMeetingKey,
    activeMeeting,
    selectMeeting,
    activeSessions,
    sessionsLoading,
    nextSession,
  } = useF1Data(initialMeetings);

  const handleYearChange = (newYear: number) => {
    router.push(`/?year=${newYear}`);
  };

  const handleSelectMeeting = (key: number) => {
    selectMeeting(key);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Mobile: header with Schedule button */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#E10600]"
        >
          <ScheduleIcon className="size-5 text-gray-600" />
          Schedule
        </button>
        <YearSelector year={year} onYearChange={handleYearChange} />
      </div>

      <MobileDrawer title="Schedule">
        <RaceList
          meetings={meetings}
          activeMeetingKey={activeMeetingKey}
          onSelectMeeting={handleSelectMeeting}
          year={year}
          onYearChange={handleYearChange}
          YearSelectorComponent={YearSelector}
        />
      </MobileDrawer>

      <div className="flex min-h-0 flex-1 w-full">
        {/* Desktop: race list sidebar (always visible, scrolls independently) */}
        <div className="hidden h-full w-80 shrink-0 flex-col overflow-hidden md:flex">
          <RaceList
            meetings={meetings}
            activeMeetingKey={activeMeetingKey}
            onSelectMeeting={selectMeeting}
            year={year}
            onYearChange={handleYearChange}
            YearSelectorComponent={YearSelector}
          />
        </div>
        {/* Content section (scrolls independently) */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <RaceDetail
            meeting={activeMeeting}
            sessions={activeSessions}
            nextSession={nextSession}
            loading={sessionsLoading}
          />
        </div>
      </div>
    </>
  );
}

export function F1Dashboard({
  initialMeetings,
  year,
}: {
  initialMeetings: Meeting[];
  year: number;
}) {
  return (
    <MobileDrawerProvider>
      <DashboardInner initialMeetings={initialMeetings} year={year} />
    </MobileDrawerProvider>
  );
}

function ScheduleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
