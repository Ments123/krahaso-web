import { Reveal } from "@/components/ui/Reveal";

const ITEMS = [
  { title: "Krahaso", sub: "Shportën" },
  { title: "Skano", sub: "Barkodin & faturën" },
  { title: "Fito", sub: "Pikë & shpërblime" },
];

export function KsfBand() {
  return (
    <section id="si-funksionon" className="mx-auto max-w-[1180px] px-6 pb-[30px] pt-3">
      <Reveal className="grid grid-cols-3 gap-3">
        {ITEMS.map((it) => (
          <div
            key={it.title}
            className="liftcard rounded-2xl border border-line bg-white p-[18px] text-center"
          >
            <div className="mb-1 font-display text-[15px] font-extrabold text-brand">{it.title}</div>
            <div className="text-[13px] text-[#6B756D]">{it.sub}</div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
