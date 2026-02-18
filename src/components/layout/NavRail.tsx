'use client';

import Link from 'next/link';
import { useSidebar } from '@/contexts/SidebarContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GitHubIcon from '@mui/icons-material/GitHub';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Button } from '@base-ui/react/button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const navItems = [
  { href: '/', label: 'Schedule', icon: CalendarTodayIcon, active: true },
  { href: '/drivers', label: 'Drivers', icon: AccountCircleIcon },
  { href: '/teams', label: 'Teams', icon: WorkspacesIcon },
];

export function NavRail() {
  const { navRailExpanded, setNavRailExpanded } = useSidebar();

  return (
    <aside
      className="fixed left-0 top-0 z-30 flex h-full flex-col border-r border-gray-200 bg-white transition-[width] duration-200 ease-out"
      style={{ width: navRailExpanded ? 200 : 64 }}
      aria-label="Main navigation"
    >
      <div className="flex h-16 shrink-0 items-center justify-start gap-2 border-b border-gray-200 px-3">
        <Link
          href="/"
          className={`flex items-center gap-2 overflow-hidden ${!navRailExpanded ? 'justify-center' : 'justify-start'}`}
          title="Race Times"
        >
          <F1Logo className="size-9 shrink-0" />
          {navRailExpanded && (
            <span className="whitespace-nowrap text-base font-medium text-gray-900">Race Times</span>
          )}
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2 pt-4">
        {navItems.map(({ href, label, icon: Icon, active }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-2 py-3 text-sm font-medium transition-colors ${
              navRailExpanded ? 'flex-row' : 'flex-col justify-center'
            } ${
              active
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700'
            }`}
            aria-current={active ? 'page' : undefined}
            title={!navRailExpanded ? label : undefined}
          >
            <Icon className="size-4 shrink-0" />
            {navRailExpanded && <span className="whitespace-nowrap">{label}</span>}
          </Link>
        ))}
      </nav>
      <div className="border-t border-gray-200 p-2">
        <Button
          variant="ghost"
          onClick={() => setNavRailExpanded(!navRailExpanded)}
          className="transiton cursor-pointer absolute top-4 -right-4 rounded-full w-8 h-8 inline-flex items-center justify-center bg-white border-gray-100 shadow-sm z-10 hover:bg-gray-100 text-gray-500 hover:text-gray-800"
          aria-label={navRailExpanded ? 'Collapse navigation' : 'Expand navigation'}
        >
          <ExpandCircleDownIcon expanded={navRailExpanded} className={`transition ${navRailExpanded ? 'rotate-90' : '-rotate-90'}`} />
        </Button>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 rounded-lg px-2 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-800 ${
            navRailExpanded ? 'flex-row' : 'flex-col justify-center'
          }`}
          aria-label="GitHub"
        >
          <GitHubIcon className="size-6 shrink-0" />
          {navRailExpanded && (<><span className="w-full flex-1whitespace-nowrap">Github</span><div><OpenInNewIcon/></div></>)}
        </a>
      </div>
    </aside>
  );
}

function F1Logo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="#E4E4E7" />
      <g clipPath="url(#f1-logo-clip)">
        <path
          d="M24.9022 19.3913H25.0376V18.7372H25.0399L25.2651 19.3913H25.3822L25.6074 18.7372H25.6097V19.3913H25.7451V18.5437H25.5471L25.3287 19.2073H25.3264L25.1024 18.5437H24.9022V19.3913ZM24.1526 18.6719H24.4096V19.3913H24.5518V18.6719H24.8101V18.5437H24.1526V18.6719ZM22.5 19.3913L29 12.6086H25.0878L18.5879 19.3913H22.5ZM21.5681 15.5625H13.6994C11.3013 15.5625 10.8817 15.6952 9.85452 16.7669C8.89387 17.7694 7.33347 19.3913 7.33347 19.3913H10.742L11.5552 18.5427C12.0898 17.9848 12.3656 17.9271 13.4882 17.9271H19.3021L21.5681 15.5625ZM9.74957 16.2833C9.04012 16.9817 7.49651 18.5464 6.66451 19.3913H3C3 19.3913 5.93638 16.3361 7.56842 14.6598C9.24989 12.9896 10.0881 12.6086 13.1722 12.6086H24.3989L21.9681 15.1451H13.4003C11.2332 15.1451 10.7462 15.3018 9.74957 16.2833Z"
          fill="#FF1E00"
        />
      </g>
      <defs>
        <clipPath id="f1-logo-clip">
          <rect width="26" height="6.78261" fill="white" transform="translate(3 12.6086)" />
        </clipPath>
      </defs>
    </svg>
  );
}