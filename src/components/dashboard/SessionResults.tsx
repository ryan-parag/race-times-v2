'use client';

import { useEffect, useState } from 'react';
import type { SessionResult } from '@/types/f1';

export function SessionResults({ sessionKey }: { sessionKey: number }) {
  const [results, setResults] = useState<SessionResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetch(`/api/session-results/${sessionKey}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<SessionResult[]>;
      })
      .then((data) => {
        if (!cancelled) {
          setResults(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('[SessionResults]', err);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [sessionKey]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 text-sm text-zinc-500">
        <span className="inline-block size-3.5 animate-spin rounded-full border-2 border-zinc-300 border-t-[#E10600]" />
        Loading results…
      </div>
    );
  }

  if (error || results.length === 0) {
    return (
      <p className="px-4 py-3 text-sm text-zinc-500">Results not available.</p>
    );
  }

  return (
    <ol className="divide-y divide-zinc-100">
      {results.map((r) => (
        <li key={r.driverNumber} className="flex items-center gap-3 px-4 py-2">
          <span className="w-6 text-right text-sm tabular-nums text-zinc-400">
            {r.position}
          </span>
          <span
            className="h-4 w-1 shrink-0 rounded-full"
            style={{ backgroundColor: r.teamColor }}
            aria-hidden
          />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium text-zinc-900 truncate">
              {r.driverName}
            </span>
            <span className="block text-xs text-zinc-500 truncate">{r.teamName}</span>
          </span>
          <span className="text-xs font-mono text-zinc-400">{r.acronym}</span>
        </li>
      ))}
    </ol>
  );
}
