import { NextResponse } from 'next/server';
import { fetchSessionResults } from '@/lib/f1-api';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ sessionKey: string }> }
) {
  const { sessionKey } = await params;
  const key = parseInt(sessionKey, 10);
  if (isNaN(key)) {
    return NextResponse.json({ error: 'Invalid session key' }, { status: 400 });
  }
  try {
    const results = await fetchSessionResults(key);
    return NextResponse.json(results, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (err) {
    console.error('[session-results]', err);
    return NextResponse.json([], { status: 200 });
  }
}
