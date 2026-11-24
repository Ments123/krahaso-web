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
      <div className="app-updates-heading">
        <p className="eyebrow">Për blerjet e përditshme</p>
        <h2 id="updates-title">Jo vetëm çmimi i sotëm.</h2>
        <p className="app-updates-intro">
          Ndiq çmimet dhe planifiko blerjet me familjen. Krahaso mund ta përdorësh
          në shqip, anglisht, serbisht dhe maqedonisht.
        </p>
      </div>
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
        <p className="eyebrow">Krahaso për biznese</p>
        <h2 id="partner-data-title">Të dhëna për marka dhe supermarkete</h2>
        <p>
          Me Krahaso Data mund të ndjekësh tregun në 11 vende të Ballkanit.
          Shiko mbulimin rajonal, indeksin e çmimeve dhe mundësitë për licencim.
        </p>
      </div>
      <a className="acquisition-link acquisition-link-primary" href="/en/data/" hrefLang="en">Eksploro Krahaso Data</a>
    </section>
  );
}
