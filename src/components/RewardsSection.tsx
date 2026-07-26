type Props = {
  rewardsEnabled: boolean;
};

export function RewardsSection({ rewardsEnabled }: Props) {
  if (!rewardsEnabled) return null;

  return (
    <section className="rewards-secondary" aria-labelledby="rewards-title">
      <div className="rewards-secondary-copy">
        <p className="section-label">Shpërblimet</p>
        <h2 id="rewards-title">Skano faturën.<br /><span className="editorial-accent">Fito shpërblime.</span></h2>
        <p>Pas blerjes, ngarko faturën për pikë. Krahasimi i çmimeve vazhdon të nisë nga barkodi i produktit.</p>
      </div>
      <div className="receipt-confirmation" aria-label="Fatura u ngarkua për shpërblime">
        <span aria-hidden="true">K</span>
        <div>
          <small>Fatura</small>
          <strong>U ngarkua me sukses</strong>
          <p>Shpërblimet janë aktive.</p>
        </div>
      </div>
    </section>
  );
}
