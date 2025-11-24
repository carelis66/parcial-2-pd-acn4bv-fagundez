import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/register.css";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !email || !password) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,     // <-- separado
          apellido,   // <-- separado
          email,
          password,
          rol: "cliente"
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("Usuario registrado exitosamente ✔");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setMensaje(data.mensaje || "Error al registrar el usuario.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="register-container">
        <form className="register-box" onSubmit={handleRegister}>
          <h2 className="register-title">Crear cuenta</h2>

          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />

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

          <button type="submit" className="register-btn">
            Registrarme
          </button>

          {mensaje && <p className="register-msg">{mensaje}</p>}
        </form>
      </div>

      <Footer />
    </>
  );
}





