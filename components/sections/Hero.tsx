"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { ContainImg } from "@/components/ui/ContainImg";
import { LogoTile } from "@/components/ui/LogoTile";
import { ROWS, BASKET_PRODUCTS, SAVINGS, LOGOS } from "@/data/site";

const IOS_FONT =
  "-apple-system,BlinkMacSystemFont,'SF Pro Display','SF Pro Text','Helvetica Neue',Helvetica,Arial,sans-serif";

export function Hero() {
  const [tab, setTab] = useState<"total" | "prod">("total");

  return (
    <section className="relative overflow-hidden">
      {/* drifting glow */}
      <div
        className="absolute right-[-80px] top-[-120px] z-0 h-[520px] w-[520px] rounded-full"
        style={{
          background: "radial-gradient(circle,#CFEEDD,transparent 68%)",
          animation: "v3glow 12s ease-in-out infinite",
        }}
      />
      <div className="relative z-[1] mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-11 px-6 pb-7 pt-[60px] md:grid-cols-[1.05fr_.95fr] md:pt-[76px]">
        {/* copy */}
        <div className="max-w-[500px]">
          <div className="mb-[22px] inline-flex items-center gap-2 rounded-full border border-[#D6E5DC] bg-white px-3.5 py-[7px] text-[13px] font-semibold text-brand-deep">
            <span
              className="h-[7px] w-[7px] rounded-full bg-brand"
              style={{ animation: "v3pulse 2s infinite" }}
            />
            Aplikacioni në veprim
          </div>
          <h1 className="font-display font-bold" style={{ fontSize: "clamp(42px,6.4vw,72px)" }}>
            Bli më lirë.
            <br />
            <span className="text-brand">Fito shpërblime.</span>
          </h1>
          <p
            className="mb-[30px] mt-5 max-w-[400px] text-[#4A554E]"
            style={{ fontSize: "clamp(17px,2vw,20px)" }}
          >
            Krahaso shportën në supermarketet e Kosovës.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#shkarko"
              className="btn rounded-xl bg-brand px-7 py-[15px] text-base font-semibold text-white hover:bg-brand-deep"
            >
              Shkarko aplikacionin
            </a>
            <a
              href="#udhetimi"
              className="btn rounded-xl border border-[#CDD5CC] px-[22px] py-3.5 text-base font-semibold text-ink hover:border-brand hover:text-brand"
            >
              Shiko si funksionon
            </a>
          </div>
          <p className="mt-[18px] text-[13px] font-medium text-[#8A928A]">
            Së shpejti në App Store dhe Google Play
          </p>
        </div>

        {/* phone */}
        <div className="relative justify-self-center">
          <div
            className="relative w-[300px] rounded-[44px] bg-dark p-[11px]"
            style={{
              boxShadow: "0 44px 90px -30px rgba(14,21,18,.5)",
              animation: "v3float 7s ease-in-out infinite",
            }}
          >
            <div
              className="flex h-[600px] flex-col overflow-hidden rounded-[34px] bg-[#F2F2F7]"
              style={{ fontFamily: IOS_FONT }}
            >
              {/* status bar */}
              <div className="flex items-center justify-between px-[22px] pb-0.5 pt-3.5 text-sm font-semibold text-[#1C1C1E]">
                <span>9:41</span>
                <span className="h-[11px] w-[22px] rounded-[3px] border-[1.5px] border-[#1C1C1E] opacity-90" />
              </div>
              {/* header + segmented control */}
              <div className="px-[18px] py-1.5">
                <div className="text-[13px] font-medium text-[#8A8A8E]">Shporta javore · 7 produkte</div>
                <div className="text-[26px] font-bold tracking-[-.02em] text-[#1C1C1E]">Ku kushton më lirë?</div>
                <div className="mt-3 flex rounded-[9px] bg-[#E3E3E8] p-0.5">
                  <button
                    type="button"
                    className={`seg ${tab === "total" ? "seg-on" : ""}`}
                    onClick={() => setTab("total")}
                  >
                    Totali
                  </button>
                  <button
                    type="button"
                    className={`seg ${tab === "prod" ? "seg-on" : ""}`}
                    onClick={() => setTab("prod")}
                  >
                    Për produkt
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-col overflow-hidden px-3.5 pb-3.5 pt-1">
                {tab === "total" ? (
                  <div className="flex flex-1 flex-col">
                    <div className="mb-2.5 rounded-2xl bg-white p-[13px] text-center">
                      <div className="text-[13px] font-medium text-[#8A8A8E]">
                        Kurse me shportën më të lirë
                      </div>
                      <div className="text-[36px] font-bold leading-[1.15] tracking-[-.02em] text-[#34C759]">
                        €{SAVINGS}
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-2xl bg-white">
                      {ROWS.map((r) => (
                        <div
                          key={r.sm}
                          className="flex items-center gap-2.5 pl-3"
                          style={{ background: r.cheapest ? "#F1FBF4" : "#fff" }}
                        >
                          <LogoTile src={r.logo} alt={r.sm} size={30} pad={3} bare radius={7} />
                          <div className="flex flex-1 items-center justify-between border-b-[.5px] border-[#ECECEE] py-[11px] pr-3">
                            <div className="min-w-0">
                              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-[#1C1C1E]">
                                {r.sm}
                              </div>
                              <div
                                className="text-[11.5px] font-medium"
                                style={{ color: r.cheapest ? "#34C759" : "#8A8A8E" }}
                              >
                                {r.cheapest ? "Më e lira · 7/7" : r.miniAvail}
                              </div>
                            </div>
                            <div className="flex flex-none items-center gap-[7px]">
                              <span
                                className="text-base font-bold"
                                style={{ color: r.cheapest ? "#34C759" : "#1C1C1E" }}
                              >
                                €{r.total}
                              </span>
                              {r.cheapest && (
                                <span className="grid h-[18px] w-[18px] flex-none place-items-center rounded-full bg-[#34C759] text-white">
                                  <Check size={11} strokeWidth={3} />
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-1 flex-col">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-[7px]">
                        <LogoTile src={LOGOS.viva} alt="Viva Fresh" size={24} pad={2} bare radius={6} />
                        <span className="text-[13px] font-semibold text-[#1C1C1E]">Viva Fresh</span>
                      </span>
                      <span className="text-xs text-[#8A8A8E]">7 produkte</span>
                    </div>
                    <div className="overflow-hidden rounded-2xl bg-white">
                      {BASKET_PRODUCTS.map((p) => (
                        <div
                          key={p.name}
                          className="flex items-center gap-2.5 border-b-[.5px] border-[#ECECEE] px-3 py-2"
                        >
                          <span className="relative grid h-7 w-7 flex-none place-items-center overflow-hidden rounded-[7px] border border-[#EDF0EA] bg-white">
                            <ContainImg src={p.img} alt="" pad={2} sizes="28px" />
                          </span>
                          <span className="flex-1 text-[13.5px] font-medium text-[#1C1C1E]">{p.name}</span>
                          <span className="text-sm font-semibold">€{p.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between px-1 pt-[11px]">
                      <span className="text-sm font-semibold text-[#1C1C1E]">Totali</span>
                      <span className="text-[19px] font-bold text-[#34C759]">€22.45</span>
                    </div>
                  </div>
                )}

                <a
                  href="#shkarko"
                  className="mt-2.5 rounded-[14px] bg-[#34C759] p-3.5 text-center text-[15px] font-semibold text-white"
                >
                  Zgjidh Viva Fresh
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
