import type { ReactNode } from "react";

function StatusIcons() {
  return (
    <span className="flex items-center gap-[3px]" aria-hidden>
      <svg viewBox="0 0 18 12" className="h-[9px] w-[13px]" fill="currentColor">
        <rect x="0" y="8" width="3" height="4" rx="0.8" />
        <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
        <rect x="10" y="3" width="3" height="9" rx="0.8" />
        <rect x="15" y="0" width="3" height="12" rx="0.8" />
      </svg>
      <svg viewBox="0 0 16 12" className="h-[9px] w-[12px]" fill="currentColor">
        <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4C5.2.4 2.7 1.5.8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4z" />
        <path d="M8 5.6c1.4 0 2.6.5 3.6 1.4l1.2-1.3A7 7 0 0 0 8 3.8a7 7 0 0 0-4.8 1.9L4.4 7c1-.9 2.2-1.4 3.6-1.4z" />
        <path d="M8 9c.6 0 1.1.2 1.5.6L8 11.2 6.5 9.6c.4-.4.9-.6 1.5-.6z" />
      </svg>
      <svg viewBox="0 0 27 13" className="h-[10px] w-[21px]">
        <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity="0.4" />
        <rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor" />
        <path d="M25 4.5v4a2 2 0 0 0 0-4z" fill="currentColor" opacity="0.4" />
      </svg>
    </span>
  );
}

/**
 * A slim, modern phone: thin dark bezel, Dynamic Island, iOS status bar and home indicator.
 * Purely decorative chrome around the WhatsApp screen.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full">
      {/* Side buttons */}
      <span aria-hidden className="absolute top-[22%] -left-[3px] h-8 w-[3px] rounded-l-sm bg-[#2a2a2c]" />
      <span aria-hidden className="absolute top-[31%] -left-[3px] h-12 w-[3px] rounded-l-sm bg-[#2a2a2c]" />
      <span aria-hidden className="absolute top-[42%] -left-[3px] h-12 w-[3px] rounded-l-sm bg-[#2a2a2c]" />
      <span aria-hidden className="absolute top-[30%] -right-[3px] h-16 w-[3px] rounded-r-sm bg-[#2a2a2c]" />

      <div className="whatsapp-mockup-shadow rounded-[2.75rem] bg-[#1c1c1e] p-[7px] ring-1 ring-black/40">
        <div className="relative flex aspect-[9/17.2] w-full lg:aspect-[9/18.6] flex-col overflow-hidden rounded-[2.3rem] bg-[#f6f6f6]">
          <div className="relative flex h-8 shrink-0 items-center justify-between px-6 pt-1 text-[13px] font-semibold text-black">
            <span className="tabular-nums">9:41</span>
            <span aria-hidden className="absolute top-2 left-1/2 h-[1.4rem] w-[4.6rem] -translate-x-1/2 rounded-full bg-black" />
            <StatusIcons />
          </div>

          {children}

          <div aria-hidden className="flex h-6 shrink-0 items-center justify-center bg-[#f6f6f6]">
            <span className="h-[5px] w-[7.5rem] rounded-full bg-black/85" />
          </div>
        </div>
      </div>
    </div>
  );
}
