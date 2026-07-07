import { ContainImg } from "@/components/ui/ContainImg";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { IMG } from "@/data/site";

export function Rewards() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-11 px-6 py-20 md:grid-cols-2">
        <Reveal className="max-w-[400px]">
          <div className="mb-3 text-[13px] font-bold uppercase tracking-[.08em] text-brand">
            Shpërblimet
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(28px,3.6vw,42px)" }}>
            Pikët kthehen në kursime
          </h2>
          <p className="mt-4 max-w-[34ch] text-[17px] text-[#4A554E]">
            Pa lojëra, pa kripto — vetëm shpërblime që i përdor.
          </p>
        </Reveal>

        <Reveal
          className="w-[290px] justify-self-center rounded-[40px] bg-dark p-[9px]"
          style={{ boxShadow: "0 30px 70px -30px rgba(14,21,18,.4)" }}
        >
          <div className="overflow-hidden rounded-[32px] bg-ground">
            <div className="bg-brand px-5 py-[22px] text-white">
              <div className="text-xs font-semibold opacity-85">Pikët aktuale</div>
              <CountUp to={1240} className="font-display text-[44px] font-extrabold" />
              <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white/25">
                <div className="h-full bg-white" style={{ width: "72%" }} />
              </div>
              <div className="mt-[7px] text-xs opacity-90">+85 së fundmi</div>
            </div>
            <div className="flex flex-col gap-2.5 p-3.5">
              <div className="flex items-center justify-between rounded-[14px] border border-line bg-white p-3.5">
                <div>
                  <div className="text-xs font-semibold text-[#8A928A]">Kupon zbritjeje</div>
                  <div className="text-[15px] font-bold">-€5 blerja tjetër</div>
                </div>
                <span className="grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-brand-tint font-extrabold text-brand-deep">
                  %
                </span>
              </div>
              <div className="flex items-center justify-between rounded-[14px] border border-line bg-white p-3.5">
                <div>
                  <div className="text-xs font-semibold text-[#8A928A]">Produkt falas</div>
                  <div className="text-[15px] font-bold">Kafe 500g</div>
                </div>
                <span className="relative grid h-[34px] w-[34px] place-items-center overflow-hidden rounded-[9px] border border-[#EDF0EA] bg-white">
                  <ContainImg src={IMG.coffee} alt="" pad={2} sizes="34px" />
                </span>
              </div>
              <div className="flex items-center justify-between rounded-[14px] bg-dark p-3.5 text-white">
                <div>
                  <div className="text-xs font-semibold text-[#9DB0A6]">Ofertë partneri</div>
                  <div className="text-[15px] font-bold">-15% furra e lagjes</div>
                </div>
                <span className="rounded-full bg-brand px-2.5 py-1.5 text-[11px] font-bold">Aktivizo</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
