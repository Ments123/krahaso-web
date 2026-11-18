const features = [
  {
    title: 'Historiku dhe njoftimet e çmimeve',
    text: 'Shiko si ka ndryshuar çmimi i një produkti. Ndiqe produktin për të marrë njoftim kur çmimi bie.',
  },
  {
    title: 'Shporta që mund ta ndash',
    text: 'Krahaso totalet sipas çmimeve në dispozicion dhe ndaje listën e blerjeve me familjen në Viber ose WhatsApp.',
  },
  {
    title: 'Oferta nga fletushkat',
    text: 'Shfleto ofertat javore që kemi nga marketet. Historiku i çmimeve të ndihmon të kuptosh sa ka ndryshuar një çmim.',
  },
  {
    title: 'Kërkim sipas qytetit',
    text: 'Zgjidh qytetin për të parë çmimet që kemi për zonën tënde. Kërko sipas produktit ose markës, ose skano barkodin.',
  },
];

export function AppUpdates() {
  return (
    <section className="app-updates section-shell" aria-labelledby="updates-title">
      <h2 id="updates-title">Çfarë mund të bësh me Krahaso?</h2>
      <p className="app-updates-intro">
        Aplikacioni krahason çmimet në Kosovë, Shqipëri, Maqedoninë e Veriut, Mal të Zi
        dhe Bosnjë e Hercegovinë. Mund ta përdorësh në shqip, anglisht, serbisht dhe maqedonisht.
      </p>
      <div className="app-updates-grid">
        {features.map(({ title, text }) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DataTeaser() {
  return (
    <section className="data-teaser section-shell" aria-labelledby="partner-data-title">
      <div>
        <h2 id="partner-data-title">Të dhëna për marka dhe supermarkete</h2>
        <p>
          Krahaso mbledh mbi 6 milionë vëzhgime çmimesh në ditë në 11 vende të Ballkanit.
          Shiko mbulimin, indeksin publik dhe mundësitë për licencim.
        </p>
      </div>
      <a className="acquisition-link acquisition-link-primary" href="/data/">Eksploro Krahaso Data</a>
    </section>
  );
}
