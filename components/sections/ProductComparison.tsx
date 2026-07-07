import { ContainImg } from "@/components/ui/ContainImg";
import { LogoTile } from "@/components/ui/LogoTile";
import { Reveal } from "@/components/ui/Reveal";
import { PRODUCT_ROWS, IMG } from "@/data/site";

const POINTS = [
  "Çmimi & çmimi promocional",
  "Çmimi për litër / kilogram",
  "Dispozicion në supermarkete",
];

export function ProductComparison() {
  return (
    <section id="skano" className="mx-auto max-w-[1180px] px-6 pb-20 pt-5">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        {/* product card phone */}
        <Reveal
          className="w-[280px] justify-self-center rounded-[40px] bg-dark p-[9px]"
          style={{ boxShadow: "0 30px 70px -30px rgba(14,21,18,.4)" }}
        >
          <div className="overflow-hidden rounded-[32px] bg-white">
            <div className="relative grid h-[150px] place-items-center overflow-hidden bg-white">
              <ContainImg src={IMG.milk} alt="Qumësht 1L" pad={14} sizes="252px" />
            </div>
            <div className="p-4">
              <div className="font-display text-[19px] font-bold">Qumësht 1L</div>
              <div className="mb-3 text-[12.5px] text-[#8A928A]">Vita · 1 litër</div>
              {PRODUCT_ROWS.map((p) => (
                <div
                  key={p.sm}
                  className="flex items-center gap-[9px] border-b border-[#F0F3EE] py-2"
                >
                  <LogoTile src={p.logo} alt={p.sm} size={30} pad={3} />
                  <span className="flex-1 text-[12.5px] font-semibold">{p.sm}</span>
                  {p.promo && (
                    <span className="text-[11px] text-[#B0463C] line-through">€{p.was}</span>
                  )}
                  <span
                    className="font-display text-[15px] font-extrabold"
                    style={{ color: p.lowest ? "#0E7A4C" : "#141C17" }}
                  >
                    €{p.price}
                  </span>
                </div>
              ))}
              <button
                type="button"
                className="btn mt-3 w-full cursor-pointer rounded-[11px] bg-brand p-[11px] text-[13.5px] font-semibold text-white"
              >
                Shto në shportë · €1.15
              </button>
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <Reveal className="max-w-[400px]">
          <div className="mb-3 text-[13px] font-bold uppercase tracking-[.08em] text-brand">
            Krahasimi i produktit
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(28px,3.6vw,40px)" }}>
            Çmimi më i mirë për çdo produkt
          </h2>
          <div className="mt-5 flex flex-col gap-2.5">
            {POINTS.map((p) => (
              <div key={p} className="flex items-center gap-2.5 text-[15px]">
                <span className="h-2 w-2 flex-none rounded-full bg-brand" />
                {p}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
