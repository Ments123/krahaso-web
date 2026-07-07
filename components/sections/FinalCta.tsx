import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SoonButton } from "@/components/ui/SoonButton";
import { IMG } from "@/data/site";

export function FinalCta() {
  return (
    <section id="shkarko" className="mx-auto max-w-[1180px] px-6 pb-[90px]">
      <Reveal
        className="relative grid grid-cols-1 items-center gap-9 overflow-hidden rounded-[28px] bg-dark text-white md:grid-cols-2"
        style={{ padding: "clamp(36px,5vw,64px)" }}
      >
        <div className="relative z-[1] max-w-[440px]">
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(32px,4.6vw,52px)" }}>
            Mos paguaj më shumë.
          </h2>
          <p className="mb-[26px] mt-4 max-w-[32ch] text-[18px] text-[#B4BEB8]">
            Krahaso, skano dhe fito shpërblime.
          </p>
          <SoonButton className="inline-block rounded-[14px] bg-brand px-8 py-4 text-[17px] font-bold text-white hover:bg-[#17A96C]">
            Shkarko Krahaso
          </SoonButton>
          <p className="mt-3.5 text-[13px] text-[#7E8C84]">Së shpejti në App Store dhe Google Play</p>
        </div>

        <div className="relative z-[1] justify-self-center">
          <div
            className="w-[220px] rounded-[38px] bg-black p-2"
            style={{ animation: "v3float 7s ease-in-out infinite" }}
          >
            <div className="h-[420px] overflow-hidden rounded-[30px] bg-ground">
              <div className="relative h-[140px] overflow-hidden">
                <Image
                  src={IMG.heroGroceries}
                  alt="Produkte ushqimore"
                  fill
                  unoptimized
                  sizes="204px"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="font-display text-[19px] font-extrabold text-ink">Shporta jote</div>
                <div className="mb-3 text-xs text-[#8A928A]">Më e lira · Viva Fresh</div>
                <div className="flex items-center justify-between rounded-xl bg-brand-tint p-3">
                  <span className="text-[13px] font-semibold text-brand-deep">Kurse sot</span>
                  <span className="font-display text-[20px] font-extrabold text-brand-deep">€2.60</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute right-[-50px] top-[-50px] h-[220px] w-[220px] rounded-full bg-brand/[.16]"
          style={{ animation: "v3glow 11s ease-in-out infinite" }}
        />
      </Reveal>
    </section>
  );
}
