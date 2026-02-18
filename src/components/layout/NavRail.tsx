'use client';

import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Schedule', icon: ScheduleIcon, active: true },
  { href: '/drivers', label: 'Drivers', icon: DriversIcon },
  { href: '/teams', label: 'Teams', icon: TeamsIcon },
];

export function NavRail() {
  return (
    <aside
      className="fixed left-0 top-0 z-30 flex h-full w-16 flex-col border-r border-gray-200 bg-white"
      aria-label="Main navigation"
    >
      <div className="flex h-16 shrink-0 items-center justify-center border-b border-gray-200 px-2">
        <Link href="/" className="flex flex-col items-center gap-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#E10600]">
            Race
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-900">
            Times
          </span>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2 pt-4">
        {navItems.map(({ href, label, icon: Icon, active }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 rounded-lg px-2 py-3 text-center text-xs font-medium transition-colors ${
              active
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
            aria-current={active ? 'page' : undefined}
          >
            <Icon className="size-6 shrink-0" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="border-t border-gray-200 p-2">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 rounded-lg px-2 py-3 text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          aria-label="GitHub"
        >
          <GithubIcon className="size-6" />
          <span>Github</span>
        </a>
      </div>
    </aside>
  );
}

function ScheduleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function DriversIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function TeamsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}
