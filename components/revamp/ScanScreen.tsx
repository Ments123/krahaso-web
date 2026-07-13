import { Check, ScanBarcode, Sparkles } from "lucide-react";
import { ContainImg } from "@/components/ui/ContainImg";
import { LogoTile } from "@/components/ui/LogoTile";
import { IMG, LOGOS } from "@/data/site";

export function ScanScreen({ mode }: { mode: "barcode" | "receipt" }) {
  const barcode = mode === "barcode";
  return <div className="flex min-h-[586px] flex-col px-4 pb-4 pt-3">
    <div className="mb-4 mt-1 flex items-start justify-between"><div><p className="text-[11px] font-bold uppercase tracking-[.12em] text-compare">Skano</p><h3 className="mt-1 text-[25px] font-extrabold leading-none">{barcode ? "Barkodi" : "Fatura"}</h3></div><span className="grid h-10 w-10 place-items-center rounded-full bg-compare/10 text-compare"><ScanBarcode size={20} /></span></div>
    {barcode ? <>
      <div className="relative h-[280px] overflow-hidden rounded-[24px] bg-[#111915] text-white">
        <div className="absolute inset-7 rounded-[18px] border border-white/20"><span className="absolute left-[-1px] top-[-1px] h-8 w-8 rounded-tl-[18px] border-l-2 border-t-2 border-compare" /><span className="absolute bottom-[-1px] right-[-1px] h-8 w-8 rounded-br-[18px] border-b-2 border-r-2 border-compare" /></div>
        <div className="absolute left-7 right-7 top-8 h-[2px] animate-[scan-line_2s_ease-in-out_infinite_alternate] bg-compare shadow-[0_0_16px_#FF8A3D]" />
        <div className="absolute inset-x-0 bottom-6 text-center text-[11px] font-semibold text-white/65">Mbaje barkodin brenda kornizës</div>
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-[18px] bg-white p-3 shadow-sm"><span className="relative h-12 w-12 overflow-hidden rounded-xl bg-[#F5F7F3]"><ContainImg src={IMG.coffee} alt="Kafe 500g" pad={4} sizes="48px" /></span><div className="flex-1"><p className="text-[10px] font-bold uppercase tracking-wider text-brand-deep">U gjet</p><p className="text-[13px] font-bold">Kafe 500g</p></div><strong className="text-[18px] text-brand-deep">€4.20</strong></div>
    </> : <>
      <div className="relative rounded-[22px] bg-white px-5 py-5 shadow-[0_22px_45px_-32px_rgba(10,20,16,.5)]">
        <LogoTile src={LOGOS.viva} alt="Viva Fresh" size={46} pad={4} bare className="mx-auto" />
        <p className="mt-2 text-center text-[10px] text-[#8A938D]">Prishtinë · 13.07.2026 · 18:24</p>
        <div className="my-4 border-t border-dashed border-[#CDD3CD]" />
        {["Qumësht 1L", "Bukë", "Vezë, 10 copë", "Kafe 500g"].map((item, index) => <div key={item} className="mb-2 flex justify-between text-[11px]"><span>{item}</span><span>€{["1.15","0.55","1.90","4.20"][index]}</span></div>)}
        <div className="mt-3 flex justify-between border-t border-dashed border-[#CDD3CD] pt-3 text-[13px] font-extrabold"><span>TOTALI</span><span>€7.80</span></div>
        <div className="absolute left-0 right-0 top-0 h-[2px] animate-[scan-line_2.4s_ease-in-out_infinite_alternate] bg-brand shadow-[0_0_14px_#16A466]" />
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-[18px] bg-brand p-3.5 text-white"><span className="grid h-9 w-9 place-items-center rounded-full bg-white/15"><Check size={18} strokeWidth={3} /></span><div className="flex-1"><p className="text-[11px] font-semibold text-white/70">Blerja u verifikua</p><p className="text-[14px] font-extrabold">+85 pikë</p></div><Sparkles size={18} /></div>
    </>}
    <div className="mt-auto grid grid-cols-2 gap-2 rounded-[14px] bg-[#E4E8E3] p-1 text-[11px] font-bold"><span className={`rounded-[10px] px-3 py-2 text-center ${barcode ? "bg-white shadow-sm" : "text-[#778079]"}`}>Barkodi</span><span className={`rounded-[10px] px-3 py-2 text-center ${!barcode ? "bg-white shadow-sm" : "text-[#778079]"}`}>Fatura</span></div>
  </div>;
}
