const benefits = [
  ['01', 'Kërko', 'Gjeje produktin që të duhet.'],
  ['02', 'Skano', 'Lexoje barkodin direkt nga telefoni.'],
  ['03', 'Krahaso', 'Shih çmimet dhe vendos ku të blesh.'],
] as const;

export function AppProof() {
  return (
    <section id="aplikacioni" className="app-proof relative overflow-hidden bg-white" aria-labelledby="app-title">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-16 lg:py-32">
        <div className="reveal">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#08A64A]">Aplikacioni që po prisje</p>
          <h2 id="app-title" className="mt-5 max-w-3xl text-[clamp(3.1rem,7vw,7.4rem)] font-normal leading-[0.86] tracking-[-0.06em] text-[#1f2a1d]">
            Fletushkat ishin dje.<br />
            <span className="editorial-accent text-[#08A64A]">Çmimet tani janë në xhepin tënd.</span>
          </h2>
          <div className="mt-10 divide-y divide-[#1f2a1d]/10 border-y border-[#1f2a1d]/10">
            {benefits.map(([number, title, description]) => (
              <div key={number} className="grid grid-cols-[2.25rem_1fr] gap-3 py-4 sm:grid-cols-[3rem_9rem_1fr] sm:items-center">
                <span className="text-xs font-semibold text-[#08A64A]">{number}</span>
                <strong className="text-base font-medium text-[#1f2a1d]">{title}</strong>
                <p className="col-start-2 text-sm leading-6 text-[#4b5b47] sm:col-start-auto">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="app-proof-device reveal relative mx-auto flex min-h-[610px] w-full max-w-[620px] items-center justify-center sm:min-h-[760px]">
          <span className="app-proof-word app-proof-word-one" aria-hidden="true">Krahaso</span>
          <span className="app-proof-word app-proof-word-two" aria-hidden="true">Skano</span>
          <div className="app-proof-halo" aria-hidden="true" />
          <div className="phone-stage relative z-10 h-[590px] w-[286px] overflow-hidden rounded-[50px] bg-[#121812] p-[9px] shadow-[0_70px_130px_-55px_rgba(31,42,29,.7)] sm:h-[700px] sm:w-[340px] sm:rounded-[54px] sm:p-[10px]">
            <img
              src="/app/krahaso-home.webp"
              alt="Pamje reale e ballinës së aplikacionit Krahaso"
              className="block h-full w-full rounded-[42px] object-cover object-top sm:rounded-[45px]"
              loading="lazy"
              decoding="async"
              width="716"
              height="1536"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
