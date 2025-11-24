import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "../../styles/dashboardCliente.css";

export default function DashboardAdmin() {

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // 🔒 PROTECCIÓN DE RUTA: SOLO ADMIN
  if (!usuario || usuario.rol !== "admin") {
    window.location.href = "/login";
    return null;
  }

  const [usuarios, setUsuarios] = useState([]);
  const [modo, setModo] = useState("lista"); // lista | crear | editar
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    email: "",
    password: "",
    rol: "cliente",
  });
  const [mensaje, setMensaje] = useState("");

  // ================================
  // Cargar usuarios del backend
  // ================================
  const cargarUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/usuarios");
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // ================================
  // Crear usuario
  // ================================
  const crearUsuario = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.password) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.mensaje);
        return;
      }

      setMensaje("Usuario creado correctamente ✔");
      setModo("lista");
      cargarUsuarios();
      
    } catch (error) {
      setMensaje("Error al crear usuario.");
    }
  };

  // ================================
  // Editar usuario
  // ================================
  const editarUsuario = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/api/usuarios/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          rol: form.rol,
          loggedUserId: usuario.id, // PROTECCION ✔
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.mensaje);
        return;
      }

      setMensaje("Usuario actualizado ✔");
      setModo("lista");
      cargarUsuarios();

    } catch (error) {
      setMensaje("Error al editar usuario.");
    }
  };

  // ================================
  // Eliminar usuario
  // ================================
  const eliminarUsuario = async (id) => {
    if (!confirm("¿Seguro querés eliminar este usuario?")) return;

    try {
      const res = await fetch(`http://localhost:3001/api/usuarios/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loggedUserId: usuario.id }), // PROTECCION ✔
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.mensaje);
        return;
      }

      cargarUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  // ================================
  // Render form (crear / editar)
  // ================================
  const renderForm = () => (
    <form className="turno-form" onSubmit={modo === "crear" ? crearUsuario : editarUsuario}>
      <label>Nombre</label>
      <input
        value={form.nombre}
        onChange={(e) => setForm({ ...form, nombre: e.target.value })}
      />

      <label>Email</label>
      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      {/* Solo mostrar password al crear */}
      {modo === "crear" && (
        <>
          <label>Contraseña</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </>
      )}

      <label>Rol</label>
      <select
        value={form.rol}
        onChange={(e) => setForm({ ...form, rol: e.target.value })}
      >
        <option value="cliente">Cliente</option>
        <option value="recepcion">Recepción</option>
        <option value="admin">Admin</option>
      </select>

      <button className="btn-gold">{modo === "crear" ? "Crear" : "Guardar cambios"}</button>

      {mensaje && <p style={{ color: "gold" }}>{mensaje}</p>}
    </form>
  );

  // ================================
  // RENDER PRINCIPAL
  // ================================
  return (
    <>
      <Navbar />

      <div className="cliente-container">
        <h1 className="cliente-title">Panel Administrador</h1>

        <div className="cliente-tabs">
          <button className={modo === "lista" ? "active" : ""} onClick={() => setModo("lista")}>
            Lista de usuarios
          </button>

          <button className={modo === "crear" ? "active" : ""} onClick={() => {
            setModo("crear");
            setForm({ id: "", nombre: "", email: "", password: "", rol: "cliente" });
          }}>
            Crear usuario
          </button>
        </div>

        <div className="cliente-content">

          {/* LISTA DE USUARIOS */}
          {modo === "lista" && (
            <div className="card">
              <h2>Usuarios del sistema</h2>

              {usuarios.map((u) => (
                <div key={u.id} className="turno-item">
                  <p><strong>Nombre:</strong> {u.nombre}</p>
                  <p><strong>Email:</strong> {u.email}</p>
                  <p><strong>Rol:</strong> {u.rol}</p>

                  <button
                    className="btn-gold"
                    onClick={() => {
                      setModo("editar");
                      setForm(u);
                      setMensaje("");
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-gold"
                    style={{ background: "red" }}
                    onClick={() => eliminarUsuario(u.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* CREAR / EDITAR */}
          {(modo === "crear" || modo === "editar") && (
            <div className="card">
              <h2>{modo === "crear" ? "Crear usuario" : "Editar usuario"}</h2>
              {renderForm()}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
}

