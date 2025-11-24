import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/forgot.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tempPass, setTempPass] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(data.mensaje);
        setTempPass(data.tempPassword);
      } else {
        setMensaje(data.mensaje);
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="forgot-container">
        <form className="forgot-box" onSubmit={handleForgot}>
          <h2 className="forgot-title">Restablecer contraseña</h2>

          <input
            type="email"
            placeholder="Ingresa tu correo registrado"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="forgot-btn">
            Generar contraseña temporal
          </button>

          {mensaje && <p className="forgot-msg">{mensaje}</p>}

          {tempPass && (
            <div className="temp-box">
              <p>Tu contraseña temporal es:</p>
              <strong className="temp-pass">{tempPass}</strong>
            </div>
          )}
        </form>
      </div>

      <Footer />
    </>
  );
}

