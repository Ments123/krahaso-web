import { AppAcquisitionCta } from './AppAcquisitionCta';

export function FinalDownload() {
  return (
    <section id="shkarko" className="final-download" aria-labelledby="download-title">
      <div className="final-download-inner section-shell">
        <div>
          <p className="eyebrow">Falas për Android dhe iPhone</p>
          <h2 id="download-title">Merre Krahaso me vete.</h2>
          <p>Herën tjetër që je para raftit, skano barkodin dhe krahaso çmimet në qytetin tënd.</p>
        </div>
        <div className="final-download-actions">
          <AppAcquisitionCta placement="download" inverse />
        </div>
      </div>
      <div className="final-grid" aria-hidden="true" />
    </section>
  );
}
