import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "../../styles/dashboardCliente.css";

export default function DashboardCliente() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [tab, setTab] = useState("perfil");

  // TURNOS
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [servicio, setServicio] = useState("");
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState("");

  const [mensajeTurno, setMensajeTurno] = useState("");
  const [misTurnos, setMisTurnos] = useState([]);

  // MASCOTAS
  const [misMascotas, setMisMascotas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [raza, setRaza] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [alergias, setAlergias] = useState("");
  const [medicacion, setMedicacion] = useState("");
  const [notas, setNotas] = useState("");
  const [mensajeMascota, setMensajeMascota] = useState("");

  const horarios = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00"
  ];

  // ==========================
  //    MASCOTAS
  // ==========================
  const cargarMascotas = async () => {
    try {
      const res = await fetch(`http://localhost:3001/mascotas/mascotas/${usuario.email}`);
      const data = await res.json();
      setMisMascotas(data);
    } catch (err) {
      console.error(err);
    }
  };

  const registrarMascota = async (e) => {
    e.preventDefault();

    if (!nombre || !tipo) {
      setMensajeMascota("Los campos * obligatorios deben completarse.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/mascotas/mascotas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: usuario.email,
          nombre,
          tipo,
          raza,
          edad,
          peso,
          alergias,
          medicacion,
          notas
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMensajeMascota("Mascota registrada correctamente ✔");
        setNombre("");
        setTipo("");
        setRaza("");
        setEdad("");
        setPeso("");
        setAlergias("");
        setMedicacion("");
        setNotas("");

        cargarMascotas();
      } else {
        setMensajeMascota(data.mensaje);
      }

    } catch (error) {
      setMensajeMascota("Error al registrar la mascota.");
    }
  };

  const eliminarMascota = async (id) => {
    try {
      await fetch(`http://localhost:3001/mascotas/mascotas/${id}`, {
        method: "DELETE"
      });

      cargarMascotas();
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  //    TURNOS
  // ==========================
  const cargarTurnos = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/turnos/${usuario.email}`);
      const data = await res.json();
      setMisTurnos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const crearTurno = async (e) => {
    e.preventDefault();

    if (!fecha || !hora || !servicio || !mascotaSeleccionada) {
      setMensajeTurno("Completá todos los campos obligatorios.");
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

          // AHORA SOLO SE ENVÍA mascotaId
          mascotaId: mascotaSeleccionada
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMensajeTurno("Turno reservado correctamente ✔");
        setFecha("");
        setHora("");
        setServicio("");
        setMascotaSeleccionada("");

        cargarTurnos();
      } else {
        setMensajeTurno(data.mensaje);
      }

    } catch (error) {
      setMensajeTurno("Error al reservar turno.");
    }
  };

  const cancelarTurno = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/turnos/${id}`, {
        method: "DELETE",
      });

      cargarTurnos();
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================
  //   EFECTOS
  // ==========================
  useEffect(() => {
    cargarMascotas();
  }, []);

  useEffect(() => {
    if (tab === "historial") cargarTurnos();
  }, [tab]);

  // ======================================================
  //                    RENDER
  // ======================================================
  return (
    <>
      <Navbar />

      <div className="cliente-container">
        <h1 className="cliente-title">Mi Cuenta</h1>

        {/* TABS */}
        <div className="cliente-tabs">
          <button className={tab === "perfil" ? "active" : ""} onClick={() => setTab("perfil")}>
            Perfil
          </button>

          <button className={tab === "mascotas" ? "active" : ""} onClick={() => setTab("mascotas")}>
            Mis Mascotas
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

          {/* MIS MASCOTAS */}
          {tab === "mascotas" && (
            <div className="card">
              <h2>Registrar Mascota</h2>

              <form className="turno-form" onSubmit={registrarMascota}>
                <label>Nombre *</label>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

                <label>Tipo *</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
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

                <label>Notas</label>
                <textarea
                  rows="2"
                  style={{ background: "#1b1b1b", color: "white", padding: "10px" }}
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                />

                <button className="btn-gold">Guardar Mascota</button>
              </form>

              {mensajeMascota && <p style={{ color: "gold" }}>{mensajeMascota}</p>}

              <h3 style={{ marginTop: "30px" }}>Mis Mascotas Registradas</h3>

              {misMascotas.length === 0 && (
                <p>No tenés mascotas registradas.</p>
              )}

              {misMascotas.map((m) => (
                <div key={m.id} className="turno-item">
                  <p><strong>{m.nombre}</strong> ({m.tipo})</p>
                  {m.raza && <p>Raza: {m.raza}</p>}
                  <button
                    style={{ marginTop: "5px" }}
                    className="btn-gold"
                    onClick={() => eliminarMascota(m.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* PEDIR TURNO */}
          {tab === "turno" && (
            <div className="card">
              <h2>Pedir un Turno</h2>

              <form className="turno-form" onSubmit={crearTurno}>
                <label>Fecha *</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />

                <label>Horario *</label>
                <select value={hora} onChange={(e) => setHora(e.target.value)}>
                  <option value="">Seleccionar horario</option>
                  {horarios.map(h => <option key={h}>{h}</option>)}
                </select>

                <label>Servicio *</label>
                <select value={servicio} onChange={(e) => setServicio(e.target.value)}>
                  <option value="">Seleccionar servicio</option>
                  <option>Peluquería y spa</option>
                  <option>Corte de uñas</option>
                  <option>Higiene dental</option>
                </select>

                <hr />

                <label>Mascota *</label>
                <select
                  value={mascotaSeleccionada}
                  onChange={(e) => setMascotaSeleccionada(e.target.value)}
                >
                  <option value="">Seleccionar mascota</option>
                  {misMascotas.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.nombre} ({m.tipo})
                    </option>
                  ))}
                </select>

                <button className="btn-gold">Confirmar Turno</button>
              </form>

              {mensajeTurno && <p style={{ color: "gold" }}>{mensajeTurno}</p>}
            </div>
          )}

          {/* HISTORIAL */}
          {tab === "historial" && (
            <div className="card">
              <h2>Historial de Turnos</h2>

              {misTurnos.length === 0 && <p>No hay turnos aún.</p>}

              {misTurnos.map((t) => (
                <div key={t.id} className="turno-item">
                  <p><strong>Fecha:</strong> {t.fecha}</p>
                  <p><strong>Hora:</strong> {t.hora}</p>
                  <p><strong>Servicio:</strong> {t.servicio}</p>
                  <p><strong>Mascota:</strong> {t.nombreAnimal} ({t.tipoAnimal})</p>

                  <button className="btn-gold" onClick={() => cancelarTurno(t.id)}>
                    Cancelar
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

