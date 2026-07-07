import { Reveal } from "@/components/ui/Reveal";
import { PARTNER_BENEFITS } from "@/data/site";

export function Partners() {
  return (
    <section id="partneret" className="mx-auto max-w-[1180px] px-6 pb-20">
      <Reveal
        className="grid grid-cols-1 items-center gap-8 rounded-[26px] bg-dark text-white md:grid-cols-2"
        style={{ padding: "clamp(30px,5vw,56px)" }}
      >
        <div className="max-w-[400px]">
          <div className="mb-3 text-[13px] font-bold uppercase tracking-[.08em] text-brand-soft">
            Për partnerët
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(28px,3.6vw,42px)" }}>
            Bëhu pjesë e Krahaso.
          </h2>
          <p className="mb-[22px] mt-3.5 max-w-[34ch] text-[17px] text-[#B4BEB8]">
            Prezanto produktet dhe ofertat te blerësit gati për të blerë.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#kontakt"
              className="btn rounded-xl bg-brand px-6 py-3.5 font-semibold text-white hover:bg-[#17A96C]"
            >
              Bëhu partner
            </a>
            <a
              href="#kontakt"
              className="btn rounded-xl border border-white/25 px-6 py-3.5 font-semibold text-white hover:border-white"
            >
              Na kontakto
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {PARTNER_BENEFITS.map((pb) => (
            <div
              key={pb}
              className="rounded-[13px] border border-white/[.09] bg-white/[.05] p-[15px] text-sm font-medium text-[#E4EAE6]"
            >
              {pb}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
