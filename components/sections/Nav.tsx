import { LogIn } from "lucide-react";
import { BrandMark } from "@/components/ui/BrandMark";

export function Nav() {
  return (
    <header className="sticky top-0 z-[60] border-b border-[#E4E8E1] bg-ground/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-[1180px] items-center gap-2 px-5 py-3.5 sm:gap-3 sm:px-6">
        <a href="#top" className="mr-auto flex items-center gap-2.5">
          <BrandMark size={34} />
          <span className="font-display text-xl font-bold">Krahaso</span>
        </a>

        <a
          href="https://admin.krahaso.app"
          className="btn inline-flex items-center gap-1.5 whitespace-nowrap rounded-[11px] border border-[#CDD5CC] px-3 py-2 text-[13px] font-semibold text-ink hover:border-brand hover:text-brand sm:px-4 sm:py-[10px] sm:text-sm"
        >
          <LogIn size={16} aria-hidden="true" />
          <span>Login</span>
        </a>

        <a
          href="#shkarko"
          className="btn whitespace-nowrap rounded-[11px] bg-brand px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-brand-deep sm:px-5 sm:py-[11px] sm:text-sm"
        >
          Shkarko
        </a>
      </nav>
    </header>
  );
}
