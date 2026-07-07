import { ContainImg } from "@/components/ui/ContainImg";
import { Reveal } from "@/components/ui/Reveal";
import { IMG } from "@/data/site";

const BARS = [100, 60, 100, 78, 100, 50, 88];

export function Barcode() {
  return (
    <section className="overflow-hidden bg-brand-tint">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-11 px-6 py-[72px] md:grid-cols-2">
        <Reveal className="max-w-[400px]">
          <div className="mb-3 text-[13px] font-bold uppercase tracking-[.08em] text-brand-deep">
            Skanimi i barkodit
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(30px,4vw,46px)" }}>
            Skano. Krahaso menjëherë.
          </h2>
          <p className="mt-4 max-w-[32ch] text-[17px] text-[#3A5147]">
            Drejto kamerën te barkodi — çmimet shfaqen në çast.
          </p>
        </Reveal>

        <Reveal
          className="w-[280px] justify-self-center rounded-[40px] bg-black p-[9px]"
          style={{ boxShadow: "0 30px 70px -28px rgba(14,21,18,.45)" }}
        >
          <div className="flex h-[540px] flex-col overflow-hidden rounded-[32px] bg-[#0A0F0C]">
            <div className="relative grid flex-1 place-items-center">
              <div className="absolute inset-6 rounded-[20px] border-2 border-white/[.18]" />
              <div className="relative grid w-[170px] place-items-center">
                <div className="flex h-16 items-end gap-1">
                  {BARS.map((h, i) => (
                    <span key={i} className="bg-white" style={{ width: i % 2 ? 3 : 4.5, height: `${h}%` }} />
                  ))}
                </div>
                <div
                  className="absolute left-[-14px] right-[-14px] top-[6%] h-[2.5px] bg-[#22D37E]"
                  style={{ boxShadow: "0 0 16px #22D37E", animation: "v3scan 1.9s ease-in-out infinite alternate" }}
                />
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="mb-3 flex items-center gap-[11px]">
                <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-[11px] border border-[#EDF0EA] bg-white">
                  <ContainImg src={IMG.coffee} alt="" pad={3} sizes="44px" />
                </div>
                <div>
                  <div className="text-[15px] font-bold">Kafe 500g</div>
                  <div className="text-xs text-[#8A928A]">Bloko</div>
                </div>
                <div className="ml-auto font-display text-[20px] font-extrabold text-brand">€4.20</div>
              </div>
              <button
                type="button"
                className="btn w-full cursor-pointer rounded-[11px] bg-brand p-3 text-sm font-semibold text-white"
              >
                Shto në shportë
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
