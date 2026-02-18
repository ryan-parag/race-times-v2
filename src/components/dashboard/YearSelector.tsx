'use client';

import { Popover } from '@base-ui/react/popover';
import { useRef, useState } from 'react';

const YEARS = [2026, 2025, 2024];

export function YearSelector({
  year,
  onYearChange,
}: {
  year: number;
  onYearChange: (y: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (y: number) => {
    onYearChange(y);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        ref={triggerRef}
        className="cursor-pointer flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E10600] focus:ring-offset-2"
      >
        {year}
        <ChevronDownIcon className="size-4 text-gray-500" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner className="z-50">
          <Popover.Popup
            className="min-w-[120px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Escape') (e.target as HTMLElement).blur();
            }}
          >
            {YEARS.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => handleSelect(y)}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  y === year ? 'bg-gray-100 font-medium text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {y}
              </button>
            ))}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
