import { AppAcquisitionCta } from './AppAcquisitionCta';

export function FinalDownload() {
  return (
    <section id="shkarko" className="final-download" aria-labelledby="download-title">
      <div className="final-download-inner section-shell">
        <div>
          <p className="eyebrow">Zgjedhja fillon me informacion</p>
          <h2 id="download-title">Mos paguaj më shumë pa e ditur.</h2>
          <p>Krahaso para se të blesh.</p>
        </div>
        <div className="final-download-actions">
          <AppAcquisitionCta placement="download" inverse />
        </div>
      </div>
      <div className="final-grid" aria-hidden="true" />
    </section>
  );
}
