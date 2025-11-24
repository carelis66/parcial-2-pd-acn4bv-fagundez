import "./../styles/cards.css";

export default function InfoCards() {
  return (
    <section className="cards-section">
  <div className="container-fluid px-5">
    <div className="row g-4 justify-content-center">

      <div className="col-md-4">
        <div className="spa-card">
          <h3 className="card-title">Cuidado de Uñas</h3>
          <p className="card-text">
            Corte profesional, limado suave y técnicas antiestrés para mantenerlas saludables.
          </p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="spa-card">
          <h3 className="card-title">Pelaje & Spa</h3>
          <p className="card-text">
            Baño premium, productos hipoalergénicos y tratamientos especiales para un pelaje radiante.
          </p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="spa-card">
          <h3 className="card-title">Higiene Dental</h3>
          <p className="card-text">
            Limpieza suave, control del sarro y protocolo de bienestar oral.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

  );
}
