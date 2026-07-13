"use client";

import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { BASKET_PRODUCTS, ROWS, SAVINGS } from "@/data/site";
import { ContainImg } from "@/components/ui/ContainImg";
import { LogoTile } from "@/components/ui/LogoTile";

export function CompareScreen({ compact = false }: { compact?: boolean }) {
  const [view, setView] = useState<"total" | "products">("total");
  return (
    <div className="flex min-h-[586px] flex-col px-4 pb-4 pt-3">
      <div className="mb-3 mt-1">
        <p className="text-[11px] font-semibold uppercase tracking-[.12em] text-brand-deep">Shporta javore · 7 produkte</p>
        <h3 className="mt-1 text-[25px] font-extrabold leading-[1.05] tracking-[-.04em]">Ku kushton më lirë?</h3>
      </div>
      <div className="mb-3 grid grid-cols-2 rounded-[12px] bg-[#DFE3DE] p-1" aria-label="Pamja e krahasimit">
        <button type="button" aria-pressed={view === "total"} onClick={() => setView("total")} className={`min-h-9 rounded-[9px] text-[12px] font-bold transition ${view === "total" ? "bg-white text-ink shadow-sm" : "text-[#737c75]"}`}>Totali</button>
        <button type="button" aria-pressed={view === "products"} onClick={() => setView("products")} className={`min-h-9 rounded-[9px] text-[12px] font-bold transition ${view === "products" ? "bg-white text-ink shadow-sm" : "text-[#737c75]"}`}>Për produkt</button>
      </div>
      {view === "total" ? (
        <div className="animate-[reward-pop_.45s_var(--ease-apple)]">
          <div className="mb-2 rounded-[18px] bg-brand px-4 py-3 text-white shadow-[0_18px_35px_-24px_rgba(8,122,73,.8)]">
            <div className="text-[11px] font-semibold text-white/75">Kursimi i shportës</div>
            <div className="flex items-end justify-between"><strong className="text-[32px] tracking-[-.04em]">€{SAVINGS}</strong><span className="mb-1 rounded-full bg-white/15 px-2 py-1 text-[10px] font-bold">Më e lira</span></div>
          </div>
          <div className="overflow-hidden rounded-[18px] border border-black/[.04] bg-white">
            {ROWS.map((row) => <div key={row.sm} className={`flex items-center gap-2.5 border-b border-[#EDF0EC] px-3 py-2.5 last:border-0 ${row.cheapest ? "bg-[#EFFAF4]" : ""}`}>
              <LogoTile src={row.logo} alt={row.sm} size={32} pad={3} radius={8} />
              <div className="min-w-0 flex-1"><p className="truncate text-[12px] font-bold">{row.sm}</p><p className={`text-[10px] ${row.cheapest ? "text-brand-deep" : "text-[#8A938D]"}`}>{row.cheapest ? "Shporta më e lirë" : row.miniAvail}</p></div>
              <strong className={`text-[15px] ${row.cheapest ? "text-brand-deep" : ""}`}>€{row.total}</strong>
              {row.cheapest ? <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-white"><Check size={12} strokeWidth={3} /></span> : <ChevronRight size={14} className="text-[#A2AAA4]" />}
            </div>)}
          </div>
        </div>
      ) : (
        <div className="animate-[reward-pop_.45s_var(--ease-apple)] overflow-hidden rounded-[18px] border border-black/[.04] bg-white">
          {BASKET_PRODUCTS.slice(0, compact ? 5 : 7).map((product) => <div key={product.name} className="flex items-center gap-2.5 border-b border-[#EDF0EC] px-3 py-2 last:border-0">
            <span className="relative h-8 w-8 overflow-hidden rounded-lg bg-[#F7F8F5]"><ContainImg src={product.img} alt="" pad={3} sizes="32px" /></span>
            <span className="flex-1 text-[11.5px] font-semibold">{product.name}</span><strong className="text-[12px]">€{product.price}</strong>
          </div>)}
          <div className="flex items-center justify-between bg-[#F7F8F5] px-3 py-3 text-[12px] font-bold"><span>Totali</span><span className="text-[17px] text-brand-deep">€22.45</span></div>
        </div>
      )}
      <button type="button" className="btn mt-auto min-h-11 rounded-[14px] bg-ink px-4 text-[13px] font-bold text-white">Shiko shportën</button>
    </div>
  );
}
