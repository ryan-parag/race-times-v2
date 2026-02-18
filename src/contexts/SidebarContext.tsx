'use client';

import * as React from 'react';

type SidebarContextValue = {
  navRailExpanded: boolean;
  setNavRailExpanded: (v: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return ctx;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [navRailExpanded, setNavRailExpanded] = React.useState(false);
  const value = React.useMemo(
    () => ({ navRailExpanded, setNavRailExpanded }),
    [navRailExpanded]
  );
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}
