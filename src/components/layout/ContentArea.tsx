'use client';

import { useSidebar } from '@/contexts/SidebarContext';

export function ContentArea({ children }: { children: React.ReactNode }) {
  const { navRailExpanded } = useSidebar();
  return (
    <div
      className="flex h-screen flex-col overflow-hidden transition-[padding] duration-200 ease-out"
      style={{ paddingLeft: navRailExpanded ? 200 : 64 }}
    >
      {children}
    </div>
  );
}
