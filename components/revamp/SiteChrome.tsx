import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";
import { SoonButton } from "@/components/ui/SoonButton";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/[.055] bg-canvas/80 backdrop-blur-2xl" aria-label="Navigimi kryesor">
      <div className="page-shell flex h-[72px] items-center justify-between gap-6">
        <a href="#fillimi" className="flex items-center gap-2.5" aria-label="Krahaso, në fillim">
          <BrandMark size={34} />
          <span className="font-display text-[18px] font-extrabold tracking-[-.04em]">Krahaso</span>
        </a>
        <nav className="hidden items-center gap-7 text-[13px] font-semibold text-ink/65 md:flex" aria-label="Seksionet">
          <a className="transition-colors hover:text-ink" href="#pervoja">Si funksionon</a>
          <a className="transition-colors hover:text-ink" href="#besimi">Besimi</a>
          <a className="transition-colors hover:text-ink" href="#per-shitoret">Për shitoret</a>
          <a className="inline-flex items-center gap-1 transition-colors hover:text-ink" href="https://admin.krahaso.app" target="_blank" rel="noreferrer">Admin <ArrowUpRight size={13} /></a>
        </nav>
        <SoonButton ariaLabel="Shkarko aplikacionin Krahaso, së shpejti" className="min-h-10 rounded-full bg-ink px-5 text-[12px] font-bold text-white sm:text-[13px]">Shkarko</SoonButton>
      </div>
    </header>
  );
}
