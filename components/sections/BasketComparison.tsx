import { LogoTile } from "@/components/ui/LogoTile";
import { Reveal } from "@/components/ui/Reveal";
import { ROWS } from "@/data/site";

const MAX_N = 26; // bar scale reference

export function BasketComparison() {
  return (
    <section id="krahaso" className="mx-auto max-w-[1000px] px-6 py-20">
      <Reveal className="mx-auto mb-10 max-w-[620px] text-center">
        <div className="mb-3 text-[13px] font-bold uppercase tracking-[.08em] text-brand">
          Krahasimi i shportës
        </div>
        <h2 className="font-display font-bold" style={{ fontSize: "clamp(30px,4.2vw,48px)" }}>
          E njëjta shportë, çmime të ndryshme
        </h2>
      </Reveal>

      <Reveal
        className="rounded-[22px] border border-line bg-white"
        style={{ padding: "clamp(20px,3vw,32px)" }}
      >
        {ROWS.map((r) => (
          <div
            key={r.sm}
            className="flex items-center gap-4 border-b border-[#F0F3EE] py-3.5 last:border-b-0"
          >
            <LogoTile src={r.logo} alt={r.sm} size={52} pad={6} className="flex-none" />
            <div className="min-w-0 flex-1">
              <div className="mb-[7px] flex items-center gap-2">
                <span className="text-[15px] font-bold">{r.sm}</span>
                {r.cheapest && (
                  <span className="rounded-full bg-brand px-2 py-[3px] text-[10px] font-bold text-white">
                    MË E LIRA
                  </span>
                )}
              </div>
              <div
                className="h-3 overflow-hidden rounded-full bg-[#F0F3EE]"
                style={{ width: `${Math.round((r.num / MAX_N) * 100)}%` }}
              >
                <div
                  className="barfill h-full w-full rounded-full"
                  style={{ background: r.cheapest ? "#159A63" : "#CBD3CB" }}
                />
              </div>
            </div>
            <div
              className="min-w-[92px] text-right font-display font-extrabold"
              style={{
                fontSize: "clamp(22px,3vw,30px)",
                color: r.cheapest ? "#0E7A4C" : "#141C17",
              }}
            >
              €{r.total}
            </div>
          </div>
        ))}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2.5">
          <span className="text-base font-semibold text-brand-deep">
            Kurse €2.60 me shportën më të lirë.
          </span>
          <span className="text-[11.5px] text-[#A6ABA2]">Shembuj demonstrues</span>
        </div>
      </Reveal>
    </section>
  );
}
