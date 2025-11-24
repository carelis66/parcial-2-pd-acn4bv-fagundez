import "./../styles/hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">Bienestar exquisito para tu mejor amigo</h1>
        <p className="hero-subtitle">
          Citas limitadas por día. Atención personalizada, productos hipoalergénicos y protocolos de calma.
        </p>

        <button className="btn btn-gold hero-btn">
          Solicitar turno
        </button>
      </div>
    </section>
  );
}

