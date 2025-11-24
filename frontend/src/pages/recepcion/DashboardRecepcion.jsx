import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "../../styles/dashboardCliente.css";

export default function DashboardRecepcion() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [tab, setTab] = useState("dia");

  const [turnos, setTurnos] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtrados, setFiltrados] = useState([]);

  const hoy = new Date().toISOString().split("T")[0];

  // ================================
  // Cargar MASCOTAS
  // ================================
  const cargarMascotas = async () => {
    try {
      const res = await fetch("http://localhost:3001/mascotas/mascotas");
      const data = await res.json();
      setMascotas(data);
    } catch (error) {
      console.error("Error cargando mascotas:", error);
    }
  };

  // ================================
  // Cargar TURNOS
  // ================================
  const cargarTurnos = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/turnos");
      const data = await res.json();
      setTurnos(data);
      setFiltrados(data);
    } catch (error) {
      console.error("Error cargando turnos:", error);
    }
  };

  useEffect(() => {
    cargarMascotas();
    cargarTurnos();
  }, []);

  // ================================
  // Cambiar estado del turno
  // ================================
  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      const res = await fetch(`http://localhost:3001/api/turnos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (res.ok) cargarTurnos();
    } catch (error) {
      console.error(error);
    }
  };

  // ================================
  // Obtener MASCOTA completa por ID
  // ================================
  const buscarMascota = (mascotaId) =>
    mascotas.find((m) => m.id == mascotaId);

  // ================================
  // Búsqueda general
  // ================================
  const buscarTurnos = (texto) => {
    setBusqueda(texto);

    const textoMin = texto.toLowerCase();

    const filtrado = turnos.filter((t) => {
      const mascota = buscarMascota(t.mascotaId);

      return (
        t.email.toLowerCase().includes(textoMin) ||
        t.servicio.toLowerCase().includes(textoMin) ||
        mascota?.nombre.toLowerCase().includes(textoMin) ||
        mascota?.tipo.toLowerCase().includes(textoMin)
      );
    });

    setFiltrados(filtrado);
  };

  const turnosHoy = turnos.filter((t) => t.fecha === hoy);

  // ================================
  // Render de mascota
  // ================================
  const renderMascota = (t) => {
    const m = buscarMascota(t.mascotaId);

    if (!m) return <p style={{ color: "red" }}>Mascota no encontrada</p>;

    return (
      <>
        <p><strong>Mascota:</strong> {m.nombre} ({m.tipo})</p>
        {m.raza && <p><strong>Raza:</strong> {m.raza}</p>}
        {m.edad && <p><strong>Edad:</strong> {m.edad} años</p>}
        {m.peso && <p><strong>Peso:</strong> {m.peso} kg</p>}
        {m.alergias && <p><strong>Alergias:</strong> {m.alergias}</p>}
        {m.medicacion && <p><strong>Medicación:</strong> {m.medicacion}</p>}
        {m.notas && <p><strong>Notas del dueño:</strong> {m.notas}</p>}
      </>
    );
  };

  return (
    <>
      <Navbar />

      <div className="cliente-container">
        <h1 className="cliente-title">Panel de Recepción</h1>

        {/* Tabs */}
        <div className="cliente-tabs">
          <button className={tab === "dia" ? "active" : ""} onClick={() => setTab("dia")}>
            Turnos del día
          </button>

          <button className={tab === "todos" ? "active" : ""} onClick={() => setTab("todos")}>
            Todos los turnos
          </button>

          <button className={tab === "buscar" ? "active" : ""} onClick={() => setTab("buscar")}>
            Buscar
          </button>

          <button className={tab === "perfil" ? "active" : ""} onClick={() => setTab("perfil")}>
            Mi perfil
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="cliente-content">

          {/* --- Turnos del día --- */}
          {tab === "dia" && (
            <div className="card">
              <h2>Turnos del día</h2>

              {turnosHoy.length === 0 ? (
                <p>No hay turnos para hoy.</p>
              ) : (
                turnosHoy.map((t) => (
                  <div key={t.id} className="turno-item">
                    <p><strong>Hora:</strong> {t.hora}</p>
                    <p><strong>Cliente:</strong> {t.email}</p>
                    <p><strong>Servicio:</strong> {t.servicio}</p>

                    {renderMascota(t)}

                    <select
                      value={t.estado}
                      onChange={(e) => actualizarEstado(t.id, e.target.value)}
                      className="turno-select"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en proceso">En proceso</option>
                      <option value="listo">Listo</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                ))
              )}
            </div>
          )}

          {/* --- Todos los turnos --- */}
          {tab === "todos" && (
            <div className="card">
              <h2>Todos los turnos</h2>

              {turnos.length === 0 ? (
                <p>No hay turnos registrados.</p>
              ) : (
                turnos.map((t) => (
                  <div key={t.id} className="turno-item">
                    <p><strong>Fecha:</strong> {t.fecha}</p>
                    <p><strong>Hora:</strong> {t.hora}</p>
                    <p><strong>Cliente:</strong> {t.email}</p>
                    <p><strong>Servicio:</strong> {t.servicio}</p>

                    {renderMascota(t)}

                    <select
                      value={t.estado}
                      onChange={(e) => actualizarEstado(t.id, e.target.value)}
                      className="turno-select"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en proceso">En proceso</option>
                      <option value="listo">Listo</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                ))
              )}
            </div>
          )}

          {/* --- Buscar turnos --- */}
          {tab === "buscar" && (
            <div className="card">
              <h2>Buscar turno</h2>

              <input
                type="text"
                value={busqueda}
                onChange={(e) => buscarTurnos(e.target.value)}
                placeholder="Buscar por email, mascota o servicio..."
                className="input-dark"
              />

              {filtrados.map((t) => (
                <div key={t.id} className="turno-item">
                  <p><strong>Fecha:</strong> {t.fecha}</p>
                  <p><strong>Hora:</strong> {t.hora}</p>
                  <p><strong>Cliente:</strong> {t.email}</p>

                  {renderMascota(t)}
                </div>
              ))}

              {filtrados.length === 0 && busqueda && (
                <p>No se encontraron resultados.</p>
              )}
            </div>
          )}

          {/* --- Perfil --- */}
          {tab === "perfil" && (
            <div className="card">
              <h2>Mi perfil (Recepción)</h2>
              <p><strong>Nombre:</strong> {usuario?.nombre}</p>
              <p><strong>Email:</strong> {usuario?.email}</p>
              <p><strong>Rol:</strong> {usuario?.rol}</p>
            </div>
          )}
        </div>

        {/* LOGOUT */}
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



