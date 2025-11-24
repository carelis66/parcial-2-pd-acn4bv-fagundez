// Tabs del panel del cliente: Perfil | Turno | Historial - Formulario para crear un nuevo turno

import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "../../styles/dashboardCliente.css";

export default function DashboardCliente() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [tab, setTab] = useState("perfil");

  // Campos del turno
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [servicio, setServicio] = useState("");

  // Campos del animal (OPCIÓN 3 PROFESIONAL)
  const [nombreAnimal, setNombreAnimal] = useState("");
  const [tipoAnimal, setTipoAnimal] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [alergias, setAlergias] = useState("");
  const [medicacion, setMedicacion] = useState("");
  const [notas, setNotas] = useState("");

  const [mensajeTurno, setMensajeTurno] = useState("");
  const [misTurnos, setMisTurnos] = useState([]);

  const horarios = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00"
  ];

  // Cargar turnos del cliente
  const cargarTurnos = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/turnos/${usuario.email}`);
      const data = await res.json();
      setMisTurnos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tab === "historial") cargarTurnos();
  }, [tab]);

  // Crear turno
  const crearTurno = async (e) => {
    e.preventDefault();

    if (!fecha || !hora || !servicio || !nombreAnimal || !tipoAnimal) {
      setMensajeTurno("Completá al menos los campos obligatorios (*).");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/turnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: usuario.email,
          fecha,
          hora,
          servicio,
          nombreAnimal,
          tipoAnimal,
          raza,
          edad,
          peso,
          alergias,
          medicacion,
          notas
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensajeTurno("Turno reservado correctamente ✔");

        // Vaciar formulario
        setFecha("");
        setHora("");
        setServicio("");
        setNombreAnimal("");
        setTipoAnimal("");
        setRaza("");
        setEdad("");
        setPeso("");
        setAlergias("");
        setMedicacion("");
        setNotas("");

        cargarTurnos();
      } else {
        setMensajeTurno(data.mensaje);
      }
    } catch (error) {
      setMensajeTurno("Error al conectar con el servidor.");
    }
  };

  // Cancelar turno
  const cancelarTurno = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/turnos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) cargarTurnos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="cliente-container">
        <h1 className="cliente-title">Mi Cuenta</h1>

        {/* Tabs */}
        <div className="cliente-tabs">
          <button className={tab === "perfil" ? "active" : ""} onClick={() => setTab("perfil")}>
            Perfil
          </button>

          <button className={tab === "turno" ? "active" : ""} onClick={() => setTab("turno")}>
            Pedir Turno
          </button>

          <button className={tab === "historial" ? "active" : ""} onClick={() => setTab("historial")}>
            Historial
          </button>
        </div>

        <div className="cliente-content">

          {/* PERFIL */}
          {tab === "perfil" && (
            <div className="card">
              <h2>Datos del Cliente</h2>
              <p><strong>Nombre:</strong> {usuario?.nombre}</p>
              <p><strong>Email:</strong> {usuario?.email}</p>
            </div>
          )}

          {/* PEDIR TURNO */}
          {tab === "turno" && (
            <div className="card">
              <h2>Pedir un Turno</h2>

              <form className="turno-form" onSubmit={crearTurno}>
                
                {/* Fecha y Hora */}
                <label>Fecha *</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />

                <label>Horario *</label>
                <select value={hora} onChange={(e) => setHora(e.target.value)}>
                  <option value="">Seleccionar horario</option>
                  {horarios.map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>

                <label>Servicio *</label>
                <select value={servicio} onChange={(e) => setServicio(e.target.value)}>
                  <option value="">Seleccionar servicio</option>
                  <option>Peluquería y spa</option>
                  <option>Corte de uñas</option>
                  <option>Higiene dental</option>
                </select>

                <hr style={{ border: "1px solid #333" }} />

                {/* Datos del Animal */}
                <h3 style={{ color: "gold" }}>Datos del Animal</h3>

                <label>Nombre del animal *</label>
                <input value={nombreAnimal} onChange={(e) => setNombreAnimal(e.target.value)} />

                <label>Tipo *</label>
                <select value={tipoAnimal} onChange={(e) => setTipoAnimal(e.target.value)}>
                  <option value="">Seleccionar</option>
                  <option>Perro</option>
                  <option>Gato</option>
                </select>

                <label>Raza</label>
                <input value={raza} onChange={(e) => setRaza(e.target.value)} />

                <label>Edad (años)</label>
                <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} />

                <label>Peso (kg)</label>
                <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} />

                <label>Alergias</label>
                <input value={alergias} onChange={(e) => setAlergias(e.target.value)} />

                <label>Medicación</label>
                <input value={medicacion} onChange={(e) => setMedicacion(e.target.value)} />

                <label>Notas del dueño</label>
                <textarea
                  style={{ background: "#1b1b1b", border: "1px solid #333", padding: "10px", color: "white", borderRadius: "8px" }}
                  rows="3"
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                />

                <button className="btn-gold">Confirmar turno</button>
              </form>

              {mensajeTurno && (
                <p style={{ color: "gold", marginTop: "15px", fontWeight: "600" }}>
                  {mensajeTurno}
                </p>
              )}
            </div>
          )}

          {/* HISTORIAL */}
          {tab === "historial" && (
            <div className="card">
              <h2>Historial de Turnos</h2>

              {misTurnos.length === 0 && <p>No tienes turnos registrados aún.</p>}

              {misTurnos.map(t => (
                <div key={t.id} className="turno-item" style={{
                  borderBottom: "1px solid #333",
                  marginBottom: "15px",
                  paddingBottom: "15px"
                }}>
                  <p><strong>Fecha:</strong> {t.fecha}</p>
                  <p><strong>Hora:</strong> {t.hora}</p>
                  <p><strong>Servicio:</strong> {t.servicio}</p>
                  <p><strong>Animal:</strong> {t.nombreAnimal} ({t.tipoAnimal})</p>
                  {t.raza && <p><strong>Raza:</strong> {t.raza}</p>}
                  {t.edad && <p><strong>Edad:</strong> {t.edad} años</p>}
                  {t.peso && <p><strong>Peso:</strong> {t.peso} kg</p>}
                  {t.alergias && <p><strong>Alergias:</strong> {t.alergias}</p>}
                  {t.medicacion && <p><strong>Medicación:</strong> {t.medicacion}</p>}
                  {t.notas && <p><strong>Notas:</strong> {t.notas}</p>}

                  <button className="btn-gold" style={{ marginTop: "10px" }}
                    onClick={() => cancelarTurno(t.id)}>
                    Cancelar turno
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="btn-logout"
          onClick={() => {
            localStorage.removeItem("usuario");
            window.location.href = "/login";
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <Footer />
    </>
  );
}
