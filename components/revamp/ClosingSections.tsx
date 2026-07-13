import { ArrowRight, ArrowUpRight, Building2, Check, Clock3, MapPin, ReceiptText, ShieldCheck, Sparkles, Store, Tags } from "lucide-react";
import { ContainImg } from "@/components/ui/ContainImg";
import { LogoTile } from "@/components/ui/LogoTile";
import { Reveal } from "@/components/ui/Reveal";
import { SoonButton } from "@/components/ui/SoonButton";
import { IMG, LOGOS, MARQUEE_LOGOS, PARTNER_BENEFITS } from "@/data/site";

const trustCards = [
  { icon: Clock3, title: "Koha ka rëndësi", copy: "Çdo çmim duhet të tregojë kur është parë ose përditësuar — jo vetëm një numër pa kontekst." },
  { icon: MapPin, title: "Dega ka rëndësi", copy: "Çmimet mund të ndryshojnë sipas lokacionit. Krahasimi duhet ta bëjë këtë dallim të qartë." },
  { icon: ShieldCheck, title: "Ti e ke fjalën e fundit", copy: "Krahaso të ndihmon të vendosësh; çmimi në raft dhe në arkë mbetet verifikimi përfundimtar." }
] as const;

export function TrustSection() {
  const logos = [...MARQUEE_LOGOS, ...MARQUEE_LOGOS];
  return (
    <section id="besimi" className="overflow-hidden bg-canvas py-24 sm:py-32 lg:py-40" aria-labelledby="trust-title">
      <div className="page-shell">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_.75fr] lg:items-end">
          <div>
            <p className="eyebrow">Besimi ndërtohet në detaje</p>
            <h2 id="trust-title" className="section-title mt-5 max-w-[840px]">Çmime të qarta.<br /><span className="text-[#89928B]">Vendime të tuat.</span></h2>
          </div>
          <p className="max-w-[520px] text-[17px] leading-8 text-[#657068] lg:justify-self-end">Një krahasim i mirë nuk fsheh pasigurinë. Ai tregon çfarë dihet, kur është përditësuar dhe ku mund të ketë dallime.</p>
        </Reveal>

        <div className="mt-14 grid gap-3 md:grid-cols-3">
          {trustCards.map(({ icon: Icon, title, copy }, index) => (
            <Reveal key={title} className="min-h-[280px] rounded-[30px] border border-ink/[.06] bg-white p-7 shadow-[0_28px_70px_-54px_rgba(10,20,16,.45)] sm:p-8" >
              <div className={`grid h-12 w-12 place-items-center rounded-2xl ${index === 0 ? "bg-brand-tint text-brand-deep" : index === 1 ? "bg-compare/10 text-compare" : "bg-reward/10 text-reward"}`}><Icon size={22} /></div>
              <h3 className="mt-16 text-[24px] font-extrabold tracking-[-.04em]">{title}</h3>
              <p className="mt-3 text-[14px] leading-6 text-[#6B756E]">{copy}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-20 border-y border-ink/[.06] bg-white py-7">
        <div className="mb-5 text-center text-[10px] font-bold uppercase tracking-[.16em] text-[#8B948E]">Supermarkete të përdorura në demonstrim</div>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-[marquee_30s_linear_infinite] items-center gap-3 pr-3">
            {logos.map((logo, index) => <div key={`${logo.alt}-${index}`} className="flex h-[72px] w-[158px] shrink-0 items-center justify-center rounded-2xl border border-ink/[.055] bg-canvas px-5"><div className="relative h-[44px] w-full"><ContainImg src={logo.src} alt={index < MARQUEE_LOGOS.length ? logo.alt : ""} sizes="158px" pad="5%" /></div></div>)}
          </div>
        </div>
        <p className="mt-5 text-center text-[10px] text-[#8B948E]">Logot janë vetëm ilustruese dhe nuk nënkuptojnë partneritet.</p>
      </Reveal>
    </section>
  );
}

export function RetailerSection() {
  return (
    <section id="per-shitoret" className="bg-white py-24 sm:py-32 lg:py-40" aria-labelledby="retailer-title">
      <div className="page-shell grid items-center gap-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">Për shitoret</p>
          <h2 id="retailer-title" className="section-title mt-5">Çmimi yt,<br /><span className="text-brand">në momentin e duhur.</span></h2>
          <p className="mt-7 max-w-[560px] text-[17px] leading-8 text-[#657068]">Një hapësirë e thjeshtë për të publikuar çmime dhe oferta, përmirësuar saktësinë dhe qenë i dukshëm kur blerësi po zgjedh.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {PARTNER_BENEFITS.map((benefit) => <div key={benefit} className="flex items-center gap-3 text-[13px] font-bold"><span className="grid h-7 w-7 place-items-center rounded-full bg-brand-tint text-brand-deep"><Check size={13} strokeWidth={3} /></span>{benefit}</div>)}
          </div>
          <a href="https://admin.krahaso.app" target="_blank" rel="noreferrer" className="btn mt-10 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[13px] font-bold text-white">Hyr në admin <ArrowUpRight size={16} /></a>
        </Reveal>

        <Reveal className="relative rounded-[36px] bg-forest p-4 shadow-[0_55px_110px_-60px_rgba(10,20,16,.8)] sm:p-7">
          <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[26px] bg-[#F3F5F1] p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-ink/[.07] pb-5">
              <div className="flex items-center gap-3"><LogoTile src={LOGOS.viva} alt="Shembull i panelit të shitoreve" size={44} radius={13} /><div><p className="text-[13px] font-extrabold">Paneli i shitoreve</p><p className="text-[10px] text-[#7B857E]">Pamje demonstrative</p></div></div>
              <span className="rounded-full bg-brand-tint px-3 py-1.5 text-[10px] font-bold text-brand-deep">Aktiv</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-[18px] bg-white p-4"><Tags size={18} className="text-brand" /><p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-[#8B948E]">Çmime</p><strong className="text-[24px] tracking-[-.04em]">Të qarta</strong></div>
              <div className="rounded-[18px] bg-white p-4"><Store size={18} className="text-compare" /><p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-[#8B948E]">Degët</p><strong className="text-[24px] tracking-[-.04em]">Lokale</strong></div>
            </div>
            <div className="mt-3 overflow-hidden rounded-[20px] bg-white">
              {[{ name: "Qumësht 1L", price: "€1.15", img: IMG.milk }, { name: "Kafe 500g", price: "€4.20", img: IMG.coffee }, { name: "Vaj 1L", price: "€3.49", img: IMG.oil }].map((item, index) => <div key={item.name} className="flex items-center gap-3 border-b border-ink/[.055] p-3.5 last:border-0"><span className="relative h-10 w-10 overflow-hidden rounded-xl bg-canvas"><ContainImg src={item.img} alt="" sizes="40px" pad={5} /></span><span className="flex-1 text-[12px] font-bold">{item.name}</span><span className="text-[13px] font-extrabold">{item.price}</span><span className={`h-2 w-2 rounded-full ${index === 1 ? "bg-compare" : "bg-brand"}`} /></div>)}
            </div>
            <p className="mt-4 text-center text-[9px] text-[#8B948E]">Çmimet janë vetëm shembuj demonstrues.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function DownloadFinale() {
  return (
    <section className="relative isolate overflow-hidden bg-forest py-24 text-white sm:py-32 lg:min-h-[860px] lg:py-40" aria-labelledby="download-title">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_100%,rgba(22,164,102,.32),transparent_42%),radial-gradient(circle_at_82%_12%,rgba(66,133,244,.12),transparent_25%)]" />
      <div className="absolute -left-12 bottom-[8%] -z-10 h-48 w-40 -rotate-12 opacity-70 sm:h-64 sm:w-52"><ContainImg src={IMG.milk} alt="" sizes="220px" pad="6%" /></div>
      <div className="absolute -right-12 top-[11%] -z-10 h-48 w-56 rotate-12 opacity-70 sm:h-64 sm:w-72"><ContainImg src={IMG.bread} alt="" sizes="280px" pad="6%" /></div>
      <Reveal className="page-shell text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.06] px-4 py-2 text-[11px] font-bold text-brand-soft backdrop-blur-xl"><Sparkles size={14} /> Vjen së shpejti</div>
        <h2 id="download-title" className="mx-auto mt-8 max-w-[1080px] text-balance text-[clamp(3.2rem,8.3vw,8.4rem)] font-bold leading-[.9] tracking-[-.065em]">Shporta jote e ardhshme fillon me <span className="text-brand-soft">një krahasim.</span></h2>
        <p className="mx-auto mt-8 max-w-[620px] text-[17px] leading-8 text-white/55 sm:text-[19px]">Krahaso çmimet. Skano blerjen. Fito vlerë praktike prej saj.</p>
        <SoonButton className="mt-10 min-h-16 rounded-full bg-white px-8 text-[15px] font-extrabold text-forest shadow-[0_24px_55px_-28px_rgba(255,255,255,.55)]">
          <span className="inline-flex items-center gap-2">Shkarko aplikacionin <ArrowRight size={18} /></span>
        </SoonButton>
        <div className="mx-auto mt-20 grid max-w-[720px] grid-cols-3 gap-2 sm:gap-4">
          {[{ icon: Tags, label: "Krahaso", tone: "text-brand-soft" }, { icon: ReceiptText, label: "Skano", tone: "text-compare" }, { icon: Building2, label: "Fito", tone: "text-reward" }].map(({ icon: Icon, label, tone }) => <div key={label} className="rounded-[22px] border border-white/10 bg-white/[.045] px-2 py-5 backdrop-blur-xl sm:px-5"><Icon className={`mx-auto ${tone}`} size={20} /><p className="mt-3 text-[12px] font-bold sm:text-[14px]">{label}</p></div>)}
        </div>
      </Reveal>
    </section>
  );
}
