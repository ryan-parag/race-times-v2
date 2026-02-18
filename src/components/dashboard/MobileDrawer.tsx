'use client';

import * as React from 'react';

type MobileDrawerContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const MobileDrawerContext = React.createContext<MobileDrawerContextValue | null>(null);

export function useMobileDrawer() {
  const ctx = React.useContext(MobileDrawerContext);
  if (!ctx) return { open: false, setOpen: () => {} };
  return ctx;
}

export function MobileDrawerProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const value = React.useMemo(() => ({ open, setOpen }), [open]);
  return (
    <MobileDrawerContext.Provider value={value}>
      {children}
    </MobileDrawerContext.Provider>
  );
}

export function MobileDrawer({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { open, setOpen } = useMobileDrawer();

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div
        className="fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] transform bg-white shadow-xl transition-transform duration-200 ease-out md:hidden"
        style={{
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? 'Schedule'}
      >
        <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
          <span className="font-semibold text-gray-900">{title ?? 'Schedule'}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E10600]"
            aria-label="Close"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>
        <div className="h-[calc(100%-3.5rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
