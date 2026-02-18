/** OpenF1 API response types and normalized app types */

export interface OpenF1Meeting {
  meeting_key: number;
  meeting_name: string;
  meeting_official_name: string;
  location: string;
  country_key: number;
  country_code: string;
  country_name: string;
  country_flag: string;
  circuit_key: number;
  circuit_short_name: string;
  circuit_type: string;
  circuit_image?: string;
  date_start: string;
  date_end: string;
  year: number;
  gmt_offset: string;
}

export interface OpenF1Session {
  session_key: number;
  session_type: string;
  session_name: string;
  date_start: string;
  date_end: string;
  meeting_key: number;
  circuit_short_name: string;
  gmt_offset: string;
}

export interface Meeting {
  meetingKey: number;
  round: number;
  name: string;
  officialName: string;
  location: string;
  countryCode: string;
  countryName: string;
  countryFlag: string;
  circuitShortName: string;
  circuitImage?: string;
  dateStart: string;
  dateEnd: string;
  year: number;
  gmtOffset: string;
}

export interface Session {
  sessionKey: number;
  sessionType: string;
  sessionName: string;
  dateStart: string;
  dateEnd: string;
  meetingKey: number;
  circuitShortName: string;
  gmtOffset: string;
}

export type SessionStatus = 'completed' | 'upcoming' | 'next';
