import { LogoTile } from "@/components/ui/LogoTile";
import { Reveal } from "@/components/ui/Reveal";
import { LOGOS } from "@/data/site";

const LINES = [
  ["Qumësht 1L", "€1.15"],
  ["Bukë", "€0.55"],
  ["Vezë, 10 copë", "€1.90"],
  ["Banane 1kg", "€1.30"],
];

export function Receipt() {
  return (
    <section
      id="fito"
      className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-11 px-6 py-20 md:grid-cols-2"
    >
      <Reveal className="relative w-[280px] justify-self-center">
        <div
          className="relative overflow-hidden rounded-[12px] border border-line bg-white px-5 py-[22px]"
          style={{ boxShadow: "0 30px 60px -30px rgba(14,21,18,.3)" }}
        >
          <LogoTile src={LOGOS.viva} alt="Viva Fresh" size={40} pad={4} bare className="mx-auto mb-3 !w-[120px]" />
          <div className="mb-3 border-b-[1.5px] border-dashed border-[#C9C3B6] pb-2.5 text-center text-[11px] text-[#9AA097]">
            Prishtinë · 06.07.2026 · 18:24
          </div>
          <div className="flex flex-col gap-[7px] text-[12.5px] text-[#3C4A42]">
            {LINES.map(([name, price]) => (
              <div key={name} className="flex justify-between">
                <span>{name}</span>
                <span>{price}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t-[1.5px] border-dashed border-[#C9C3B6] pt-2.5 font-display font-extrabold">
            <span>TOTALI</span>
            <span>€4.90</span>
          </div>
          <div
            className="absolute left-0 right-0 top-0 h-[3px] bg-[#22D37E]"
            style={{ boxShadow: "0 0 18px #22D37E", animation: "v3scan 2.6s ease-in-out infinite alternate" }}
          />
        </div>
        <div
          className="absolute bottom-[-14px] right-[-14px] rounded-[16px] bg-brand px-4 py-3 text-white"
          style={{ boxShadow: "0 12px 30px -8px rgba(21,154,99,.5)", animation: "v3pulse 2.4s ease-in-out infinite" }}
        >
          <div className="text-[11px] font-semibold opacity-85">Verifikuar</div>
          <div className="font-display text-[20px] font-extrabold">+85 pikë</div>
        </div>
      </Reveal>

      <Reveal className="max-w-[400px]">
        <div className="mb-3 text-[13px] font-bold uppercase tracking-[.08em] text-brand">
          Skanimi i faturës
        </div>
        <h2 className="font-display font-bold" style={{ fontSize: "clamp(30px,4vw,46px)" }}>
          Skano faturën, fito pikë.
        </h2>
        <p className="mt-4 max-w-[34ch] text-[17px] text-[#4A554E]">
          Krahaso e njeh supermarketin, verifikon blerjen dhe të jep pikë.
        </p>
      </Reveal>
    </section>
  );
}
