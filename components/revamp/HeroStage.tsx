"use client";

import { useRef, type PointerEvent } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { CompareScreen } from "@/components/revamp/CompareScreen";
import { PhoneShell } from "@/components/revamp/PhoneShell";
import { ContainImg } from "@/components/ui/ContainImg";
import { SoonButton } from "@/components/ui/SoonButton";
import { IMG } from "@/data/site";

const floatingProducts = [
  { src: IMG.milk, alt: "Qumësht", className: "left-[2%] top-[18%] h-24 w-20 -rotate-6 lg:h-32 lg:w-28" },
  { src: IMG.bread, alt: "Bukë", className: "right-[1%] top-[13%] h-24 w-28 rotate-6 lg:h-32 lg:w-36" },
  { src: IMG.banana, alt: "Banane", className: "bottom-[11%] left-[1%] h-24 w-28 rotate-6 lg:h-32 lg:w-36" },
  { src: IMG.coffee, alt: "Kafe", className: "bottom-[7%] right-[2%] h-24 w-20 -rotate-6 lg:h-32 lg:w-28" }
] as const;

export function HeroStage() {
  const stage = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!stage.current || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = stage.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.current.style.setProperty("--hero-x", `${x * 16}px`);
    stage.current.style.setProperty("--hero-y", `${y * 12}px`);
  };

  return (
    <section className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden pb-16 pt-12 sm:pt-16 lg:flex lg:items-center lg:py-20" aria-labelledby="hero-title">
      <div className="absolute inset-x-0 top-0 -z-20 h-[88%] bg-[radial-gradient(circle_at_76%_24%,rgba(123,226,176,.25),transparent_33%),radial-gradient(circle_at_15%_55%,rgba(255,255,255,.9),transparent_42%)]" />
      <div className="page-shell grid items-center gap-14 lg:grid-cols-[.96fr_1.04fr] lg:gap-8">
        <div className="relative z-10 max-w-[700px] lg:pb-8">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white/75 px-3.5 py-2 text-[12px] font-bold text-brand-deep shadow-[0_12px_35px_-24px_rgba(8,122,73,.7)] backdrop-blur-xl">
            <Sparkles size={14} aria-hidden="true" />
            Blerjet e përditshme, më të qarta.
          </div>
          <h1 id="hero-title" className="display-title max-w-[760px] text-balance">
            Çdo shportë.<br />Çdo çmim.<br /><span className="text-brand">Një zgjedhje</span> më e zgjuar.
          </h1>
          <p className="mt-7 max-w-[620px] text-[17px] leading-7 text-[#59635C] sm:text-[19px] sm:leading-8">
            Krahaso çmimet, skano blerjet dhe fito shpërblime — në një aplikacion të ndërtuar për Kosovën.
          </p>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-extrabold uppercase tracking-[.13em] text-ink/65" aria-label="Krahaso, Skano, Fito">
            <span>Krahaso</span><span className="text-compare">Skano</span><span className="text-reward">Fito</span>
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <SoonButton className="min-h-14 rounded-full bg-ink px-7 text-[15px] font-bold text-white shadow-[0_18px_35px_-20px_rgba(10,20,16,.75)]">
              <span className="inline-flex items-center gap-2">Shkarko aplikacionin <ArrowUpRight size={17} /></span>
            </SoonButton>
            <a href="#pervoja" className="btn inline-flex min-h-14 items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-6 text-[14px] font-bold text-ink backdrop-blur-xl">
              Shiko si funksionon <ArrowDown size={16} />
            </a>
          </div>
          <p className="mt-4 text-[12px] text-[#7A847D]">Aplikacioni mobil vjen së shpejti.</p>
        </div>

        <div ref={stage} onPointerMove={handlePointerMove} className="relative mx-auto h-[680px] w-full max-w-[660px] [--hero-x:0px] [--hero-y:0px] sm:h-[760px] lg:h-[720px]" aria-label="Pamje e aplikacionit Krahaso">
          <div className="absolute inset-[3%_5%_2%] rounded-[48%_52%_48%_52%/42%_44%_56%_58%] bg-forest shadow-[0_80px_140px_-70px_rgba(10,20,16,.85)]" />
          <div className="absolute inset-[10%_13%_8%] rounded-[50%] bg-[radial-gradient(circle_at_48%_34%,rgba(123,226,176,.32),transparent_42%)] blur-2xl" />
          <div className="absolute left-1/2 top-1/2 z-10 w-fit -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-[var(--ease-apple)] [transform:translate(calc(-50%_+_var(--hero-x)),calc(-50%_+_var(--hero-y)))]">
            <PhoneShell label="Krahasimi i shportës javore në aplikacionin Krahaso" className="origin-center scale-[.84] sm:scale-100">
              <CompareScreen compact />
            </PhoneShell>
          </div>
          {floatingProducts.map((product, index) => (
            <div key={product.alt} className={`absolute z-20 rounded-[26px] border border-white/15 bg-white/95 p-2 shadow-[0_24px_60px_-28px_rgba(0,0,0,.7)] ${product.className}`} style={{ animation: `soft-float ${5.2 + index * 0.55}s ease-in-out ${index * -0.7}s infinite` }}>
              <div className="relative h-full w-full"><ContainImg src={product.src} alt={product.alt} priority={index < 2} sizes="144px" pad="8%" /></div>
            </div>
          ))}
          <div className="glass absolute bottom-[5%] left-[16%] z-30 rounded-2xl px-4 py-3 shadow-xl sm:left-[12%]">
            <p className="text-[10px] font-bold uppercase tracking-[.12em] text-brand-deep">Shporta më e lirë</p>
            <p className="text-[20px] font-extrabold tracking-[-.04em]">€22.45</p>
          </div>
        </div>
      </div>
    </section>
  );
}
