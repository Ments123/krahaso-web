import { BrandMark } from "@/components/ui/BrandMark";
import { SoonButton } from "@/components/ui/SoonButton";

const NAV_LINKS = [
  { href: "#top", label: "Rreth Krahaso" },
  { href: "#si-funksionon", label: "Si funksionon" },
  { href: "#partneret", label: "Për partnerët" },
  { href: "#kontakt", label: "Na kontakto" },
];

const LEGAL = ["Politika e privatësisë", "Kushtet e përdorimit", "Politika e pikëve"];
const SOCIAL = ["IG", "FB", "In"];

export function Footer() {
  return (
    <footer id="kontakt" className="bg-dark text-white">
      <div className="mx-auto max-w-[1180px] px-6 pb-9 pt-[52px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1.6fr_1fr]">
          <div className="max-w-[280px]">
            <div className="mb-3 flex items-center gap-2.5">
              <BrandMark size={34} />
              <span className="font-display text-xl font-bold">Krahaso</span>
            </div>
            <p className="text-sm text-[#8DA097]">
              Krahaso, bli më lirë dhe fito shpërblime në Kosovë.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-[26px]">
            <div>
              <div className="mb-3.5 text-[13px] font-bold text-brand-soft">Krahaso</div>
              <div className="flex flex-col gap-2.5 text-sm text-[#B4BEB8]">
                {NAV_LINKS.map((l) => (
                  <a key={l.label} href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3.5 text-[13px] font-bold text-brand-soft">Ligjore</div>
              <div className="flex flex-col items-start gap-2.5 text-sm text-[#B4BEB8]">
                {LEGAL.map((l) => (
                  <SoonButton key={l} className="text-left hover:text-white">
                    {l}
                  </SoonButton>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3.5 text-[13px] font-bold text-brand-soft">Na ndiq</div>
            <div className="flex gap-2.5">
              {SOCIAL.map((s) => (
                <SoonButton
                  key={s}
                  ariaLabel={s}
                  className="grid h-10 w-10 place-items-center rounded-[11px] bg-white/[.06] text-[13px] font-semibold hover:bg-brand"
                >
                  {s}
                </SoonButton>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-[22px] text-[13px] text-[#6E837A]">
          <span>© 2026 Krahaso · krahaso.app · Logot janë vetëm ilustruese.</span>
          <span>Çmimet janë vetëm shembuj demonstrues.</span>
        </div>
      </div>
    </footer>
  );
}
