import { fetchMeetings } from '@/lib/f1-api';
import { F1Dashboard } from '@/components/dashboard/F1Dashboard';
import { NavRail } from '@/components/layout/NavRail';

type PageProps = {
  searchParams: Promise<{ year?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const year = Math.min(2026, Math.max(2024, parseInt(params.year ?? '2025', 10) || 2025));
  const meetings = await fetchMeetings(year);

  return (
    <>
      <NavRail />
      <div className="pl-16">
        <F1Dashboard key={year} initialMeetings={meetings} year={year} />
      </div>
    </>
  );
}
