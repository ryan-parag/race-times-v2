import { fetchMeetings, fetchDrivers } from '@/lib/f1-api';
import { DriversDashboard } from '@/components/dashboard/DriversDashboard';
import { NavRail } from '@/components/layout/NavRail';
import { ContentArea } from '@/components/layout/ContentArea';

export const metadata = {
  title: 'F1 Race Times | Drivers',
};

type PageProps = {
  searchParams: Promise<{ year?: string; driver?: string }>;
};

export default async function DriversPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const year = Math.min(2026, Math.max(2024, parseInt(params.year ?? '2025', 10) || 2025));
  const initialDriverNumber = params.driver ? parseInt(params.driver, 10) || null : null;

  const meetings = await fetchMeetings(year);
  const lastMeeting = meetings[meetings.length - 1];
  const drivers = lastMeeting ? await fetchDrivers(lastMeeting.meetingKey) : [];

  return (
    <>
      <NavRail />
      <ContentArea>
        <DriversDashboard key={year} drivers={drivers} year={year} initialDriverNumber={initialDriverNumber} />
      </ContentArea>
    </>
  );
}
