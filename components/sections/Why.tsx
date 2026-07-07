import { Reveal } from "@/components/ui/Reveal";
import { BENEFITS } from "@/data/site";

export function Why() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-20">
      <Reveal className="mx-auto mb-10 max-w-[520px] text-center">
        <div className="mb-3 text-[13px] font-bold uppercase tracking-[.08em] text-brand">Pse Krahaso</div>
        <h2 className="font-display font-bold" style={{ fontSize: "clamp(30px,4vw,46px)" }}>
          Bli më zgjuar
        </h2>
      </Reveal>
      <Reveal className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((b) => (
          <div
            key={b}
            className="liftcard flex items-center gap-3 rounded-2xl border border-line bg-white p-[22px]"
          >
            <span className="grid h-8 w-8 flex-none place-items-center rounded-[9px] bg-brand-tint">
              <span className="h-3 w-3 rounded-[4px] bg-brand" />
            </span>
            <span className="text-[15.5px] font-semibold leading-[1.25]">{b}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
