"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { ContainImg } from "@/components/ui/ContainImg";
import { LogoTile } from "@/components/ui/LogoTile";
import { Reveal } from "@/components/ui/Reveal";
import { BASKET_ITEMS, ROWS, JOURNEY_STEPS, LOGOS } from "@/data/site";

export function ScrollJourney() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = stepsRef.current;
    if (!container) return;
    const steps = Array.from(container.querySelectorAll<HTMLElement>("[data-step]"));
    if (!steps.length) return;

    let cur = -1;
    let ticking = false;
    const update = () => {
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      steps.forEach((s, idx) => {
        const r = s.getBoundingClientRect();
        const d = Math.abs((r.top + r.bottom) / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = idx;
        }
      });
      if (best !== cur) {
        cur = best;
        setActive(best);
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const on = (i: number) => (active === i ? "1" : "0");

  return (
    <section id="udhetimi" className="mt-[30px] bg-dark text-white">
      <div className="mx-auto max-w-[1180px] px-6 pb-[30px] pt-16">
        <Reveal className="mx-auto max-w-[600px] text-center">
          <div className="mb-3 text-[13px] font-bold uppercase tracking-[.08em] text-brand-soft">
            Udhëtimi
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(32px,4.6vw,52px)" }}>
            Nga lista te shpërblimi
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-5 px-6 pb-[60px] md:grid-cols-[.9fr_1.1fr]">
        {/* sticky phone */}
        <div className="relative z-[1] mb-1.5 justify-self-center md:sticky md:top-20 md:mb-0">
          <div
            className="w-[300px] rounded-[44px] bg-black p-2.5"
            style={{ boxShadow: "0 44px 100px -30px rgba(0,0,0,.75)" }}
          >
            <div className="relative h-[600px] overflow-hidden rounded-[34px] bg-ground">
              {/* Screen 0 — shopping list */}
              <div className="v3screen" data-i="0" data-on={on(0)}>
                <div className="bg-white px-[18px] pb-3 pt-[18px]">
                  <div className="text-xs font-semibold text-[#8A928A]">Hapi 1</div>
                  <div className="font-display text-xl font-bold text-ink">Lista e blerjeve</div>
                </div>
                <div className="flex-1 overflow-hidden p-3.5">
                  {BASKET_ITEMS.map((it) => (
                    <div
                      key={it.name}
                      className="mb-[7px] flex items-center gap-3 rounded-[13px] border border-line bg-white p-[9px] text-ink"
                    >
                      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[9px] border border-[#EDF0EA] bg-white">
                        <ContainImg src={it.img} alt="" pad={3} sizes="36px" />
                      </span>
                      <span className="flex-1 text-sm font-semibold">{it.name}</span>
                      <span className="grid h-[22px] w-[22px] place-items-center rounded-full bg-brand text-white">
                        <Check size={13} strokeWidth={3} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Screen 1 — compare totals */}
              <div className="v3screen" data-i="1" data-on={on(1)}>
                <div className="bg-white px-[18px] pb-3 pt-[18px]">
                  <div className="text-xs font-semibold text-[#8A928A]">Hapi 2</div>
                  <div className="font-display text-xl font-bold text-ink">Krahaso totalet</div>
                </div>
                <div className="flex-1 p-3.5 text-ink">
                  {ROWS.map((r) => (
                    <div
                      key={r.sm}
                      className="mb-[9px] flex items-center gap-2.5 rounded-[13px] bg-white p-[11px]"
                      style={{ border: `1.5px solid ${r.cheapest ? "#159A63" : "#E4E8E1"}` }}
                    >
                      <LogoTile src={r.logo} alt={r.sm} size={40} pad={4} />
                      <div className="flex-1">
                        <div className="text-[13.5px] font-semibold">{r.sm}</div>
                        <div className="text-[10.5px] text-[#8A928A]">{r.miniAvail}</div>
                      </div>
                      <div
                        className="font-display text-[18px] font-extrabold"
                        style={{ color: r.cheapest ? "#0E7A4C" : "#141C17" }}
                      >
                        €{r.total}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Screen 2 — cheapest basket */}
              <div className="v3screen" data-i="2" data-on={on(2)}>
                <div className="bg-white px-[18px] pb-3 pt-[18px]">
                  <div className="text-xs font-semibold text-[#8A928A]">Hapi 3</div>
                  <div className="font-display text-xl font-bold text-ink">Shporta më e lirë</div>
                </div>
                <div className="flex flex-1 flex-col justify-center p-4">
                  <div
                    className="rounded-[20px] bg-brand p-[22px] text-center text-white"
                    style={{ animation: "v3pulse 2.4s ease-in-out infinite" }}
                  >
                    <LogoTile src={LOGOS.viva} alt="Viva Fresh" size={64} pad={8} bare className="mx-auto mb-3" />
                    <div className="font-display text-[44px] font-extrabold">€22.45</div>
                    <div className="mt-2.5 rounded-full bg-white/[.18] p-2 text-[13px] font-semibold">
                      Kurse €2.60
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen 3 — scan receipt */}
              <div className="v3screen" data-i="3" data-on={on(3)}>
                <div className="bg-white px-[18px] pb-3 pt-[18px]">
                  <div className="text-xs font-semibold text-[#8A928A]">Hapi 4</div>
                  <div className="font-display text-xl font-bold text-ink">Skano faturën</div>
                </div>
                <div className="grid flex-1 place-items-center bg-[#0A0F0C] p-5">
                  <div className="relative w-full max-w-[200px] overflow-hidden rounded-[10px] bg-white p-4">
                    <LogoTile src={LOGOS.viva} alt="Viva Fresh" size={34} pad={3} bare className="mx-auto mb-2 !w-24" />
                    <div className="flex flex-col gap-[5px] border-t-[1.5px] border-dashed border-[#C9C3B6] pt-2 text-[11px] text-[#5C6656]">
                      <span className="flex justify-between"><span>Qumësht 1L</span><span>€1.15</span></span>
                      <span className="flex justify-between"><span>Bukë</span><span>€0.55</span></span>
                      <span className="flex justify-between"><span>Vezë</span><span>€1.90</span></span>
                      <span className="flex justify-between border-t border-dashed border-[#C9C3B6] pt-[5px] font-extrabold">
                        TOTALI<span>€3.60</span>
                      </span>
                    </div>
                    <div
                      className="absolute left-0 right-0 top-0 h-[3px] bg-[#22D37E]"
                      style={{ boxShadow: "0 0 16px #22D37E", animation: "v3scan 2.2s ease-in-out infinite alternate" }}
                    />
                  </div>
                </div>
              </div>

              {/* Screen 4 — earn points */}
              <div className="v3screen" data-i="4" data-on={on(4)}>
                <div className="bg-white px-[18px] pb-3 pt-[18px]">
                  <div className="text-xs font-semibold text-[#8A928A]">Hapi 5</div>
                  <div className="font-display text-xl font-bold text-ink">Fito pikë</div>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center p-5 text-ink">
                  <div
                    className="mb-[18px] grid h-24 w-24 place-items-center rounded-full bg-brand-tint"
                    style={{ animation: "v3pulse 2.2s ease-in-out infinite" }}
                  >
                    <span className="font-display text-[28px] font-extrabold text-brand">✓</span>
                  </div>
                  <div className="font-display text-[40px] font-extrabold text-brand-deep">+85 pikë</div>
                  <div className="my-1.5 mb-4 text-[13px] text-[#5C6656]">Fatura u verifikua</div>
                  <div className="w-full rounded-[14px] border border-line bg-white p-3.5">
                    <div className="flex justify-between text-xs font-semibold text-[#8A928A]">
                      <span>Totali</span>
                      <span>1,240 pikë</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#F0F3EE]">
                      <div className="h-full bg-brand" style={{ width: "72%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen 5 — reward */}
              <div className="v3screen" data-i="5" data-on={on(5)}>
                <div className="bg-white px-[18px] pb-3 pt-[18px]">
                  <div className="text-xs font-semibold text-[#8A928A]">Hapi 6</div>
                  <div className="font-display text-xl font-bold text-ink">Shpërblimi yt</div>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-3 p-[18px]">
                  <div className="relative overflow-hidden rounded-[18px] bg-dark p-5 text-white">
                    <div className="text-xs font-semibold text-[#9DB0A6]">Kupon zbritjeje</div>
                    <div className="font-display text-[38px] font-extrabold text-brand-soft">-€5</div>
                    <div className="text-[13px] text-[#B4BEB8]">blerja tjetër · Viva Fresh</div>
                    <div className="absolute right-[-20px] top-[-20px] h-[90px] w-[90px] rounded-full bg-brand-soft/[.15]" />
                  </div>
                  <button
                    type="button"
                    className="btn cursor-pointer rounded-[14px] bg-brand p-3.5 text-[15px] font-bold text-white"
                  >
                    Aktivizo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* step text */}
        <div ref={stepsRef} className="flex flex-col">
          {JOURNEY_STEPS.map((s, i) => (
            <div
              key={s.n}
              data-step={i}
              className="v3step flex min-h-[60vh] flex-col justify-center py-4 max-md:min-h-min max-md:py-2.5"
              data-on={on(i)}
            >
              <div className="mb-2.5 font-display text-[15px] font-extrabold text-brand-soft">{s.n}</div>
              <h3
                className="mb-2 font-display font-bold"
                style={{ fontSize: "clamp(28px,3.2vw,40px)" }}
              >
                {s.title}
              </h3>
              <p className="max-w-[32ch] text-[17px] text-[#B4BEB8]">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
