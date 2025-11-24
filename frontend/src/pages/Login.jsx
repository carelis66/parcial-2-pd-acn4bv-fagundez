import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.mensaje || "Credenciales inválidas.");
        return;
      }

      // Guardar sesión
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      setMensaje("Inicio de sesión exitoso ✔");

      setTimeout(() => {
        // Por ahora, solo existe dashboard del cliente
        navigate("/cliente");
      }, 1200);
    } catch (error) {
      console.error(error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-container">
        <form className="login-card" onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Entrar
          </button>

          <Link to="/forgot-password" className="forgot-link">
            ¿Olvidaste tu contraseña?
          </Link>

          {mensaje && <p className="login-msg">{mensaje}</p>}
        </form>
      </div>

      <Footer />
    </>
  );
}
