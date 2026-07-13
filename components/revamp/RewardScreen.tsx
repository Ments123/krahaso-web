"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Gift, Ticket, Sparkles } from "lucide-react";

export function RewardScreen() {
  const [points, setPoints] = useState(1155);
  useEffect(() => { const timer = setTimeout(() => setPoints(1240), 450); return () => clearTimeout(timer); }, []);
  return <div className="flex min-h-[586px] flex-col px-4 pb-4 pt-3 text-white">
    <div className="mb-4 mt-1 flex items-start justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[.12em] text-brand-soft">Fito</p><h3 className="mt-1 text-[25px] font-extrabold leading-none">Shpërblimet</h3></div><span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-brand-soft"><Sparkles size={20} /></span></div>
    <div className="relative overflow-hidden rounded-[24px] bg-brand p-5 shadow-[0_26px_50px_-30px_rgba(22,164,102,.8)]"><div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" /><p className="text-[11px] font-semibold text-white/70">Pikët e tua</p><div aria-live="polite" className="mt-1 text-[46px] font-extrabold tracking-[-.06em]">{points.toLocaleString("sq-AL")}</div><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20"><span className="block h-full w-[72%] rounded-full bg-white" /></div><div className="mt-2 flex justify-between text-[10px] font-semibold text-white/70"><span>+85 nga fatura</span><span>1,500 pikë</span></div></div>
    <p className="mb-2 mt-5 text-[11px] font-bold uppercase tracking-[.12em] text-white/45">Gati për ty</p>
    <div className="space-y-2.5">
      <button type="button" className="btn flex min-h-[72px] w-full items-center gap-3 rounded-[18px] bg-white p-3 text-left text-ink"><span className="grid h-11 w-11 place-items-center rounded-[13px] bg-reward/10 text-reward"><Ticket size={21} /></span><span className="flex-1"><span className="block text-[10px] font-bold text-[#7C857E]">Kupon zbritjeje</span><strong className="text-[14px]">€5 në blerjen tjetër</strong></span><ArrowUpRight size={17} /></button>
      <button type="button" className="btn flex min-h-[72px] w-full items-center gap-3 rounded-[18px] bg-white/8 p-3 text-left"><span className="grid h-11 w-11 place-items-center rounded-[13px] bg-white/10 text-brand-soft"><Gift size={21} /></span><span className="flex-1"><span className="block text-[10px] font-bold text-white/45">Produkt falas</span><strong className="text-[14px]">Zgjidhe shpërblimin</strong></span><ArrowUpRight size={17} /></button>
    </div>
    <p className="mt-auto text-center text-[10px] leading-relaxed text-white/45">Pa lojëra. Pa kripto. Vetëm shpërblime praktike.</p>
  </div>;
}
