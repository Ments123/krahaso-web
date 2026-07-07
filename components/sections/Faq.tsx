"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { FAQS } from "@/data/site";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="pyetje" className="mx-auto max-w-[820px] px-6 pb-20">
      <Reveal className="mb-9 text-center">
        <div className="mb-3 text-[13px] font-bold uppercase tracking-[.08em] text-brand">Pyetje</div>
        <h2 className="font-display font-bold" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
          Pyetjet e shpeshta
        </h2>
      </Reveal>

      <div className="flex flex-col gap-2.5">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-line bg-white">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center gap-4 px-[22px] py-[18px] text-left"
              >
                <span className="flex-1 text-base font-semibold">{f.q}</span>
                <span className="font-display text-[22px] font-bold leading-none text-brand">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="px-[22px] pb-5 text-[15px] text-[#4A554E]">{f.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
