import { ArrowDownRight, Check, ShoppingBasket } from "lucide-react";
import { LogoTile } from "@/components/ui/LogoTile";
import { ROWS, SAVINGS } from "@/data/site";

export function PriceProblem() {
  const max = Math.max(...ROWS.map((row) => row.num));

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40" aria-labelledby="price-problem-title">
      <div className="page-shell">
        <div className="grid gap-14 lg:grid-cols-[.84fr_1.16fr] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow">Çmimi ndryshon. Shporta jo.</p>
            <h2 id="price-problem-title" className="section-title mt-5 max-w-[660px]">E njëjta shportë.<br /><span className="text-[#8A948C]">Katër totale.</span></h2>
            <p className="mt-7 max-w-[540px] text-[17px] leading-7 text-[#657068] sm:text-[19px] sm:leading-8">
              Kur çdo produkt kushton pak ndryshe, dallimi shihet te totali. Krahaso e bën të dukshëm para se të nisesh.
            </p>
            <div className="mt-9 inline-flex items-center gap-4 rounded-[24px] bg-brand-tint px-5 py-4 text-brand-deep">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white"><ArrowDownRight size={20} /></span>
              <span><span className="block text-[12px] font-bold uppercase tracking-[.1em]">Dallimi në këtë shportë</span><strong className="text-[28px] tracking-[-.04em]">€{SAVINGS}</strong></span>
            </div>
          </div>

          <div className="rounded-[34px] border border-[#E6EAE5] bg-canvas p-4 shadow-[0_34px_90px_-54px_rgba(10,20,16,.45)] sm:p-7">
            <div className="mb-5 flex items-center justify-between px-2">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-white"><ShoppingBasket size={18} /></span><div><p className="text-[13px] font-extrabold">Shporta javore</p><p className="text-[11px] text-[#7D8780]">7 produkte · demonstrim</p></div></div>
              <span className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-[10px] font-bold text-[#657068]">Kosovë</span>
            </div>
            <div className="space-y-2.5">
              {ROWS.map((row) => (
                <div key={row.sm} className={`relative overflow-hidden rounded-[20px] border px-4 py-4 sm:px-5 ${row.cheapest ? "border-brand/25 bg-white shadow-[0_16px_40px_-32px_rgba(8,122,73,.65)]" : "border-transparent bg-white/60"}`}>
                  <span aria-hidden="true" className={`barfill absolute inset-y-0 left-0 ${row.cheapest ? "bg-brand/[.08]" : "bg-ink/[.035]"}`} style={{ width: `${(row.num / max) * 100}%` }} />
                  <div className="relative flex items-center gap-3">
                    <LogoTile src={row.logo} alt={row.sm} size={42} radius={12} pad={4} />
                    <div className="min-w-0 flex-1"><p className="truncate text-[13px] font-extrabold sm:text-[14px]">{row.sm}</p><p className={`text-[11px] ${row.cheapest ? "font-bold text-brand-deep" : "text-[#7D8780]"}`}>{row.cheapest ? "Më e lira" : row.availText}</p></div>
                    <strong className={`text-[20px] tracking-[-.04em] sm:text-[24px] ${row.cheapest ? "text-brand-deep" : "text-ink"}`}>€{row.total}</strong>
                    {row.cheapest && <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-white"><Check size={13} strokeWidth={3} /></span>}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 px-2 text-[10px] leading-4 text-[#858E88]">Çmimet janë vetëm shembuj demonstrues dhe mund të ndryshojnë sipas degës.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
