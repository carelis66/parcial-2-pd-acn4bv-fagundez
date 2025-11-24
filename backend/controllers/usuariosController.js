const fs = require("fs");
const path = require("path");

// Ruta al JSON
const usuariosPath = path.join(__dirname, "../data/usuarios.json");

// Leer
function leerUsuarios() {
  return JSON.parse(fs.readFileSync(usuariosPath, "utf8"));
}

// Guardar
function guardarUsuarios(usuarios) {
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
}

// =======================================================
//  GET /api/usuarios  - obtener todos
// =======================================================
exports.obtenerUsuarios = (req, res) => {
  const usuarios = leerUsuarios();
  return res.json(usuarios);
};

// =======================================================
//  POST /api/usuarios  - crear usuario
// =======================================================
exports.crearUsuario = (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios." });
  }

  const usuarios = leerUsuarios();

  // Email único
  if (usuarios.find((u) => u.email === email)) {
    return res.status(409).json({ mensaje: "El email ya está registrado." });
  }

  const nuevo = {
    id: Date.now(),
    nombre,
    email,
    password,
    rol: rol || "cliente",
  };

  usuarios.push(nuevo);
  guardarUsuarios(usuarios);

  return res.status(201).json({ mensaje: "Usuario creado correctamente", usuario: nuevo });
};

// =======================================================
//  PUT /api/usuarios/:id - editar usuario
// =======================================================
exports.editarUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, email, rol, loggedUserId } = req.body;

  let usuarios = leerUsuarios();
  const usuario = usuarios.find((u) => u.id == id);

  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado." });
  }

  // PROTECCIÓN: admin no puede cambiar su propio rol
  if (usuario.id == loggedUserId && rol !== usuario.rol) {
    return res.status(403).json({
      mensaje: "No podés cambiar tu propio rol (por seguridad).",
    });
  }

  // Validación email duplicado
  if (email && usuarios.some((u) => u.email === email && u.id != id)) {
    return res.status(409).json({ mensaje: "Ese email ya está en uso." });
  }

  usuario.nombre = nombre || usuario.nombre;
  usuario.email = email || usuario.email;
  usuario.rol = rol || usuario.rol;

  guardarUsuarios(usuarios);

  return res.json({ mensaje: "Usuario actualizado correctamente", usuario });
};

// =======================================================
//  DELETE /api/usuarios/:id - eliminar usuario
// =======================================================
exports.eliminarUsuario = (req, res) => {
  const { id } = req.params;
  const { loggedUserId } = req.body;

  let usuarios = leerUsuarios();
  const usuario = usuarios.find((u) => u.id == id);

  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado." });
  }

  // PROTECCIÓN: admin no puede eliminarse a sí mismo
  if (usuario.id == loggedUserId) {
    return res.status(403).json({
      mensaje: "No podés eliminar tu propia cuenta (por seguridad).",
    });
  }

  usuarios = usuarios.filter((u) => u.id != id);
  guardarUsuarios(usuarios);

  return res.json({ mensaje: "Usuario eliminado correctamente." });
};
