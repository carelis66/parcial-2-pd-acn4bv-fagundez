import { Link } from "react-router-dom";
import "./../styles/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-3">
      <div className="container">

        {/* LOGO + TITULO */}
        <Link className="navbar-brand d-flex align-items-center gap-3" to="/">
          <img
            src="/logo-spa.png"
            alt="logo"
            className="spa-logo"
          />
          <div>
            <div className="spa-title">Élite Animal Spa</div>
            <div className="spa-subtitle">Perros & Gatos • Lujo y Bienestar</div>
          </div>
        </Link>

        {/* MENU HAMBURGUESA */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ITEMS DERECHA */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-4">

            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/nosotros">
                Nosotros
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/services">
                Servicios
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-link-custom" to="/register">
                Registro
              </Link>
            </li>

            <li className="nav-item">
              <Link className="btn btn-gold px-4 py-2" to="/login">
                Iniciar Sesión
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

