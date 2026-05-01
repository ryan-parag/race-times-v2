import { fetchMeetings, fetchDrivers, groupDriversByTeam } from '@/lib/f1-api';
import { TeamsDashboard } from '@/components/dashboard/TeamsDashboard';
import { NavRail } from '@/components/layout/NavRail';
import { ContentArea } from '@/components/layout/ContentArea';

export const metadata = {
  title: 'F1 Race Times | Teams',
};

type PageProps = {
  searchParams: Promise<{ year?: string; team?: string }>;
};

export default async function TeamsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const year = Math.min(2026, Math.max(2024, parseInt(params.year ?? '2025', 10) || 2025));
  const initialTeamName = params.team ? decodeURIComponent(params.team) : null;

  const meetings = await fetchMeetings(year);
  const lastMeeting = meetings[meetings.length - 1];
  const drivers = lastMeeting ? await fetchDrivers(lastMeeting.meetingKey) : [];
  const teams = groupDriversByTeam(drivers);

  return (
    <>
      <NavRail />
      <ContentArea>
        <TeamsDashboard key={year} teams={teams} year={year} initialTeamName={initialTeamName} />
      </ContentArea>
    </>
  );
}
