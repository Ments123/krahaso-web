"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Check } from "lucide-react";
import { CompareScreen } from "@/components/revamp/CompareScreen";
import { PhoneShell } from "@/components/revamp/PhoneShell";
import { RewardScreen } from "@/components/revamp/RewardScreen";
import { ScanScreen } from "@/components/revamp/ScanScreen";
import { JOURNEY_CHAPTERS } from "@/data/site";

type ChapterIndex = 0 | 1 | 2;

function ProductScreen({ chapter }: { chapter: ChapterIndex }) {
  if (chapter === 0) return <CompareScreen />;
  if (chapter === 1) return <ScanScreen mode="receipt" />;
  return <RewardScreen />;
}

const tones = ["text-brand", "text-compare", "text-reward"] as const;
const dots = ["bg-brand", "bg-compare", "bg-reward"] as const;

export function ProductJourney() {
  const [active, setActive] = useState<ChapterIndex>(0);
  const sections = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.chapter) as ChapterIndex;
        setActive(index);
      },
      { rootMargin: "-22% 0px -34%", threshold: [0.2, 0.45, 0.7] }
    );
    sections.current.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: ChapterIndex) => {
    setActive(index);
    sections.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="pervoja" className="relative overflow-clip bg-forest text-white" aria-labelledby="journey-title">
      <div className="page-shell pb-12 pt-24 sm:pt-32 lg:pt-36">
        <p className="eyebrow !text-brand-soft">Një rrjedhë. Tri momente.</p>
        <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 id="journey-title" className="section-title max-w-[850px]">Nga çmimi te shpërblimi,<br /><span className="text-white/35">pa humbur ritmin.</span></h2>
          <p className="max-w-[410px] text-[15px] leading-7 text-white/55 sm:text-[17px]">Aplikacioni e mban vendimin të thjeshtë: shiko dallimin, verifiko blerjen, merr vlerë prej saj.</p>
        </div>
      </div>

      <div className="journey-desktop page-shell relative grid grid-cols-[.86fr_1.14fr] gap-16 pb-32">
        <div className="relative">
          {JOURNEY_CHAPTERS.map((chapter, index) => (
            <article
              key={chapter.id}
              ref={(node) => { sections.current[index] = node; }}
              data-chapter={index}
              className="flex min-h-[78vh] max-w-[520px] flex-col justify-center py-24"
            >
              <div className={`mb-6 flex items-center gap-3 text-[12px] font-extrabold uppercase tracking-[.16em] ${tones[index]}`}>
                <span className={`grid h-7 w-7 place-items-center rounded-full text-[10px] text-forest ${index === 0 ? "bg-brand-soft" : index === 1 ? "bg-compare" : "bg-reward"}`}>0{index + 1}</span>
                {chapter.eyebrow}
              </div>
              <h3 className="text-balance text-[clamp(2.6rem,4.8vw,5.3rem)] font-bold leading-[.98] tracking-[-.055em]">{chapter.title}</h3>
              <p className="mt-7 max-w-[480px] text-[18px] leading-8 text-white/55">{chapter.copy}</p>
              <ul className="mt-8 space-y-3 text-[13px] font-semibold text-white/72">
                {(index === 0 ? ["Totali i shportës", "Çmimet për produkt"] : index === 1 ? ["Barkodi i produktit", "Verifikimi i faturës"] : ["Pikë të qarta", "Shpërblime praktike"]).map((item) => <li key={item} className="flex items-center gap-2.5"><span className={`grid h-5 w-5 place-items-center rounded-full ${dots[index]} text-white`}><Check size={11} strokeWidth={3} /></span>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="sticky top-[104px] flex h-[calc(100vh-104px)] min-h-[700px] items-center justify-center self-start">
          <div className="absolute left-1/2 top-1/2 h-[70%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[90px]" />
          <div className="relative z-10 animate-[reward-pop_.55s_var(--ease-apple)]" key={active}>
            <PhoneShell label={`${JOURNEY_CHAPTERS[active].eyebrow}: ${JOURNEY_CHAPTERS[active].title}`} tone={active === 2 ? "dark" : "light"}>
              <ProductScreen chapter={active} />
            </PhoneShell>
          </div>
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[.06] p-1.5 backdrop-blur-xl" aria-label="Zgjidh kapitullin">
            {JOURNEY_CHAPTERS.map((chapter, index) => (
              <button key={chapter.id} type="button" aria-label={`Shfaq ${chapter.eyebrow}`} aria-pressed={active === index} onClick={() => goTo(index as ChapterIndex)} className={`btn h-2.5 rounded-full ${active === index ? `w-9 ${dots[index]}` : "w-2.5 bg-white/25 hover:bg-white/45"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="journey-mobile page-shell pb-24">
        {JOURNEY_CHAPTERS.map((chapter, index) => (
          <article key={chapter.id} className="border-t border-white/10 py-16 first:border-0">
            <div className={`mb-4 text-[12px] font-extrabold uppercase tracking-[.16em] ${tones[index]}`}>0{index + 1} · {chapter.eyebrow}</div>
            <h3 className="text-[clamp(2.35rem,11vw,3.8rem)] font-bold leading-[1] tracking-[-.05em]">{chapter.title}</h3>
            <p className="mb-10 mt-5 text-[16px] leading-7 text-white/55">{chapter.copy}</p>
            <div className="relative py-6">
              <div className="absolute inset-[12%] rounded-full bg-brand/10 blur-[60px]" />
              <PhoneShell label={`${chapter.eyebrow}: ${chapter.title}`} tone={index === 2 ? "dark" : "light"} className="relative z-10">
                <ProductScreen chapter={index as ChapterIndex} />
              </PhoneShell>
            </div>
          </article>
        ))}
        <a href="#besimi" className="mx-auto mt-4 flex w-fit items-center gap-2 text-[12px] font-bold uppercase tracking-[.14em] text-white/55">Vazhdo <ArrowDown size={15} /></a>
      </div>
    </section>
  );
}
