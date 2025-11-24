const express = require("express");
const router = express.Router();

// Importamos el controlador
const {
  obtenerUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario
} = require("../controllers/usuariosController");

// =======================================
//             RUTAS ADMIN
// =======================================

// Obtener todos los usuarios
router.get("/usuarios", obtenerUsuarios);

// Crear usuario
router.post("/usuarios", crearUsuario);

// Editar usuario
router.put("/usuarios/:id", editarUsuario);

// Eliminar usuario
router.delete("/usuarios/:id", eliminarUsuario);

module.exports = router;

