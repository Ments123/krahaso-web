import { Bell, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const NOTES = [
  { delay: "0s", start: 1, time: "tani", text: "Pelenat në ulje", pct: "−20%", tail: " te Viva Fresh — 1.2 km larg." },
  { delay: "1.4s", start: 0, time: "2 min", text: "Kafe 500g", pct: "−15%", tail: " te Interex, pranë teje." },
];

export function Personalisation() {
  return (
    <section id="personalizim" className="relative overflow-hidden bg-dark text-white">
      <div
        className="absolute bottom-[-120px] left-[-80px] z-0 h-[420px] w-[420px] rounded-full"
        style={{
          background: "radial-gradient(circle,rgba(21,154,99,.28),transparent 68%)",
          animation: "v3glow 13s ease-in-out infinite",
        }}
      />
      <div className="relative z-[1] mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-11 px-6 py-[84px] md:grid-cols-2">
        <Reveal className="max-w-[430px]">
          <div className="mb-3 text-[13px] font-bold uppercase tracking-[.08em] text-brand-soft">
            Personalizimi
          </div>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(30px,4vw,46px)" }}>
            Bërë për ty dhe për lagjen tënde
          </h2>
          <p className="mb-[26px] mt-4 max-w-[36ch] text-[17px] text-[#B4BEB8]">
            Krahaso mëson çka të duhet dhe ku je — që të mos humbësh asnjë ulje.
          </p>
          <div className="flex flex-col gap-3.5">
            <div className="flex items-start gap-3.5">
              <span className="relative grid h-11 w-11 flex-none place-items-center rounded-xl bg-brand/[.18]">
                <Bell
                  size={18}
                  className="text-brand-soft"
                  style={{ animation: "v3ring 4s ease-in-out infinite", transformOrigin: "center top" }}
                />
                <span className="absolute right-[9px] top-[9px] h-2 w-2 rounded-full bg-[#FF5A4D]" />
              </span>
              <div>
                <div className="text-[17px] font-bold">Njoftime për ulje çmimesh</div>
                <div className="max-w-[34ch] text-[14.5px] text-[#9DB0A6]">
                  Zgjidh produktet që të interesojnë — si pelenat — dhe të lajmërojmë sapo bien në çmim.
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-brand/[.18]">
                <MapPin size={18} className="text-brand-soft" />
              </span>
              <div>
                <div className="text-[17px] font-bold">Vetëm dyqanet pranë teje</div>
                <div className="max-w-[34ch] text-[14.5px] text-[#9DB0A6]">
                  Krahaso përdor vendndodhjen tënde për të treguar çmime e oferta të dyqaneve lokale.
                </div>
              </div>
            </div>
          </div>
          <p className="mt-[18px] text-xs text-[#6E837A]">
            Vendndodhja përdoret vetëm për të gjetur dyqanet pranë teje.
          </p>
        </Reveal>

        {/* lock-screen phone */}
        <Reveal
          className="w-[290px] justify-self-center rounded-[42px] bg-black p-[9px]"
          style={{ boxShadow: "0 40px 90px -30px rgba(0,0,0,.7)", animation: "v3float 7s ease-in-out infinite" }}
        >
          <div
            className="flex h-[560px] flex-col overflow-hidden rounded-[34px] px-3.5 py-[22px] text-white"
            style={{ background: "linear-gradient(200deg,#123524,#0A0F0C 60%)" }}
          >
            <div className="my-2.5 mb-5 text-center">
              <div className="text-sm font-medium text-white/70">e diel, 6 korrik</div>
              <div className="font-display text-[64px] font-bold leading-none">09:41</div>
            </div>
            <div className="mb-4 flex items-center justify-center gap-[7px]">
              <span className="h-[7px] w-[7px] rounded-full bg-brand-soft" />
              <span className="text-xs font-semibold text-white/75">Prishtinë · dyqanet pranë teje</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {NOTES.map((n) => (
                <div
                  key={n.text}
                  className="flex items-start gap-[11px] rounded-2xl p-[13px] backdrop-blur-lg"
                  style={{
                    background: n.start ? "rgba(255,255,255,.14)" : "rgba(255,255,255,.1)",
                    animation: "v3note 6s ease-in-out infinite",
                    animationDelay: n.delay,
                    opacity: n.start ? undefined : 0,
                  }}
                >
                  <span className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[9px] bg-brand font-display font-extrabold text-white">
                    K
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex justify-between text-[11px] text-white/70">
                      <span className="font-bold">Krahaso</span>
                      <span>{n.time}</span>
                    </div>
                    <div className="text-[13px] font-semibold leading-[1.3]">
                      {n.text} <span className="text-brand-soft">{n.pct}</span>
                      {n.tail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto text-center text-[11px] text-white/45">
              Rrëshqit për të hapur Krahaso
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
