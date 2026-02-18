/**
 * OpenF1 API client and data normalization.
 * Use in Server Components for initial list; use useF1Data in Client Components for sessions + active state.
 */

import type { OpenF1Meeting, OpenF1Session, Meeting, Session } from '@/types/f1';

const OPENF1_BASE = 'https://api.openf1.org/v1';

export async function fetchMeetings(year: number): Promise<Meeting[]> {
  const res = await fetch(`${OPENF1_BASE}/meetings?year=${year}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch meetings');
  const raw: OpenF1Meeting[] = await res.json();
  // Filter out pre-season testing; assign round by calendar order
  const raceMeetings = raw.filter((m) => !m.meeting_name.toLowerCase().includes('pre-season'));
  return raceMeetings.map((m, i) => ({
    meetingKey: m.meeting_key,
    round: i + 1,
    name: m.meeting_name,
    officialName: m.meeting_official_name,
    location: m.location,
    countryCode: m.country_code,
    countryName: m.country_name,
    countryFlag: m.country_flag,
    circuitShortName: m.circuit_short_name,
    circuitImage: m.circuit_image,
    dateStart: m.date_start,
    dateEnd: m.date_end,
    year: m.year,
    gmtOffset: m.gmt_offset,
  }));
}

export async function fetchSessions(
  meetingKey: number,
  options?: { revalidate?: number }
): Promise<Session[]> {
  const res = await fetch(
    `${OPENF1_BASE}/sessions?meeting_key=${meetingKey}`,
    options?.revalidate != null
      ? { next: { revalidate: options.revalidate } }
      : {}
  );
  if (!res.ok) return [];
  const raw: OpenF1Session[] = await res.json();
  return raw
    .map((s) => ({
      sessionKey: s.session_key,
      sessionType: s.session_type,
      sessionName: s.session_name,
      dateStart: s.date_start,
      dateEnd: s.date_end,
      meetingKey: s.meeting_key,
      circuitShortName: s.circuit_short_name,
      gmtOffset: s.gmt_offset,
    }))
    .sort(
      (a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
    );
}

export function getSessionStatus(
  session: Session,
  now: number = Date.now()
): 'completed' | 'upcoming' | 'next' {
  const end = new Date(session.dateEnd).getTime();
  const start = new Date(session.dateStart).getTime();
  if (end < now) return 'completed';
  if (start > now) return 'upcoming';
  return 'next';
}

/** Format session start as local time (e.g. "Friday, June 13 - 7:30 AM ET") using gmt_offset. */
export function formatSessionLocalTime(
  dateStart: string,
  gmtOffset: string
): string {
  const date = new Date(dateStart);
  // gmt_offset is like "-04:00:00" or "02:00:00"
  const [h, m] = gmtOffset.split(':').map(Number);
  const offsetMinutes = (h >= 0 ? 1 : -1) * (Math.abs(h) * 60 + (m || 0));
  const local = new Date(date.getTime() + offsetMinutes * 60 * 1000);
  const tzLabel = formatTimezoneLabel(gmtOffset);
  const day = local.toLocaleDateString('en-US', { weekday: 'long' });
  const month = local.toLocaleDateString('en-US', { month: 'long' });
  const dayNum = local.getDate();
  const time = local.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${day}, ${month} ${dayNum} - ${time} ${tzLabel}`;
}

function formatTimezoneLabel(gmtOffset: string): string {
  const [h] = gmtOffset.split(':').map(Number);
  if (h === 0) return 'GMT';
  const sign = h > 0 ? '+' : '-';
  const abs = Math.abs(h);
  const abbr: Record<number, string> = {
    [-8]: 'PT',
    [-5]: 'ET',
    [-4]: 'ET',
    [-3]: 'BRT',
    0: 'GMT',
    1: 'BST',
    2: 'CEST',
    3: 'AST',
    4: 'GST',
    8: 'CST',
    9: 'JST',
    11: 'AEST',
  };
  return abbr[h] ?? `GMT${sign}${abs}`;
}
