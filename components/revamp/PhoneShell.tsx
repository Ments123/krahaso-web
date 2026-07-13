import type { ReactNode } from "react";

export function PhoneShell({ children, label, tone = "light", className = "" }: { children: ReactNode; label: string; tone?: "light" | "dark"; className?: string }) {
  return (
    <div role="img" aria-label={label} className={`phone-shadow relative mx-auto w-[min(82vw,328px)] rounded-[48px] border border-white/15 bg-[#090d0b] p-[9px] ${className}`}>
      <div className={`relative min-h-[618px] overflow-hidden rounded-[39px] ${tone === "dark" ? "bg-[#101914] text-white" : "bg-[#F2F4F1] text-ink"}`}>
        <div className="relative z-30 flex h-8 items-center justify-between px-6 pt-1 text-[11px] font-bold">
          <span>9:41</span>
          <div className="flex items-center gap-1.5" aria-hidden="true"><span className="h-2.5 w-3 rounded-sm border border-current opacity-70" /><span className="h-2.5 w-5 rounded-[3px] border border-current"><span className="block h-full w-3.5 rounded-[2px] bg-current" /></span></div>
        </div>
        <div aria-hidden="true" className="absolute left-1/2 top-2 z-40 h-[20px] w-[76px] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}
