# F1 Race Times — Schedule Dashboard

A high-performance, typography-focused F1 schedule dashboard built with **Next.js 14+ (App Router)**, **Base UI**, and **Tailwind CSS**. Data is sourced from the [OpenF1 API](https://openf1.org).

## Features

- **3-column master-detail layout**: 64px nav rail, 320px race list sidebar, main detail view
- **Race list**: Round, country flag, GP name, date (e.g. MAR 16), and status (Completed / Not yet started)
- **Detail view**: Circuit header, “Up next” session, chronological sessions list with local times or “View results”
- **Year selector**: Base UI Popover for 2024–2026
- **Responsive**: Single-column on mobile with a slide-out drawer for the race list

## Tech Stack

- **Next.js 16** (App Router), TypeScript, Tailwind CSS v4
- **Base UI** (`@base-ui/react`) for unstyled Popover (year selector)
- **OpenF1 API**: `meetings?year=` and `sessions?meeting_key=`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The default year is 2025; change it via the year dropdown. Select a race in the sidebar to load sessions and see “Up next” and session times.

## Project Structure

- `src/app/` — App Router layout and page (server-rendered list fetch)
- `src/components/dashboard/` — F1Dashboard, RaceList, RaceDetail, YearSelector, MobileDrawer
- `src/components/ui/` — Card, StatusBadge (Tailwind-styled)
- `src/lib/f1-api.ts` — OpenF1 fetch and normalization
- `src/hooks/useF1Data.ts` — Client state and session loading

## Design

- **Aesthetic**: International typographic style; white/light gray background; F1 red (`#E10600`) as accent
- **Typography**: Inter, bold for GP titles, tabular numbers for dates/times
- **Spacing**: 8px grid; generous padding (e.g. p-4, p-6) in cards and detail
