'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Meeting, Session } from '@/types/f1';
import { fetchSessions, getSessionStatus, formatSessionLocalTime } from '@/lib/f1-api';

export function useF1Data(initialMeetings: Meeting[]) {
  const [activeMeetingKey, setActiveMeetingKey] = useState<number | null>(
    initialMeetings[0]?.meetingKey ?? null
  );
  const [sessionsCache, setSessionsCache] = useState<Record<number, Session[]>>({});
  const [sessionsLoading, setSessionsLoading] = useState<Record<number, boolean>>({});

  const loadSessions = useCallback(async (meetingKey: number) => {
    setSessionsLoading((prev) => ({ ...prev, [meetingKey]: true }));
    try {
      const sessions = await fetchSessions(meetingKey);
      setSessionsCache((prev) => ({ ...prev, [meetingKey]: sessions }));
      return sessions;
    } finally {
      setSessionsLoading((prev) => ({ ...prev, [meetingKey]: false }));
    }
  }, []);

  useEffect(() => {
    if (activeMeetingKey != null && !sessionsCache[activeMeetingKey]) {
      loadSessions(activeMeetingKey);
    }
  }, [activeMeetingKey, loadSessions, sessionsCache]);

  const selectMeeting = useCallback((meetingKey: number) => {
    setActiveMeetingKey(meetingKey);
  }, []);

  const activeMeeting = useMemo(
    () => initialMeetings.find((m) => m.meetingKey === activeMeetingKey) ?? null,
    [initialMeetings, activeMeetingKey]
  );

  const activeSessions = activeMeetingKey ? sessionsCache[activeMeetingKey] ?? [] : [];
  const sessionsLoadingForActive = activeMeetingKey ? sessionsLoading[activeMeetingKey] : false;

  const sessionsWithStatus = useMemo(() => {
    const now = Date.now();
    return activeSessions.map((s) => ({
      ...s,
      status: getSessionStatus(s, now),
      localTime: formatSessionLocalTime(s.dateStart, s.gmtOffset),
    }));
  }, [activeSessions]);

  const nextSession = useMemo(
    () => sessionsWithStatus.find((s) => s.status === 'next' || s.status === 'upcoming'),
    [sessionsWithStatus]
  );

  return {
    meetings: initialMeetings,
    activeMeetingKey,
    activeMeeting,
    selectMeeting,
    activeSessions: sessionsWithStatus,
    sessionsLoading: sessionsLoadingForActive,
    loadSessions,
    nextSession,
  };
}
