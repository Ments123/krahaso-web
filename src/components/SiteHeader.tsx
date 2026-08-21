import { BrandMark } from './BrandMark';

export function SiteHeader() {
  return (
    <nav
      className="site-nav absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-4 py-4 sm:px-7 sm:py-7 md:px-10"
      aria-label="Navigimi kryesor"
    >
      <a href="#fillimi" className="flex items-center gap-2.5 text-[#2d3a2a]" aria-label="Krahaso, në fillim">
        <BrandMark />
        <span className="text-lg font-semibold tracking-[-0.035em] sm:text-xl md:text-2xl">Krahaso</span>
      </a>
      <a
        href="#shkarko"
        className="rounded-full bg-[#1f2a1d] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2a3827]"
      >
        Shkarko
      </a>
    </nav>
  );
}
