// ===============================================
// Servidor Backend - Puerto 3001
// Rutas: Autenticación, Turnos, Mascotas, Usuarios
// ===============================================

const express = require("express");
const cors = require("cors");

// Rutas
const authRoutes = require("./routes/authRoutes");
const turnosRoutes = require("./routes/turnosRoutes");
const mascotasRoutes = require("./routes/mascotasRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");   // ⭐ NUEVO

const app = express();

// -----------------------------------------------
//             MIDDLEWARE GLOBAL
// -----------------------------------------------
app.use(cors());
app.use(express.json());

// -----------------------------------------------
//                 RUTAS PRINCIPALES
// -----------------------------------------------

// Autenticación (login / register)
app.use("/api", authRoutes);

// Turnos (crear, listar, cancelar, actualizar)
app.use("/api", turnosRoutes);

// Usuarios (ADMIN → ABM de usuarios)
app.use("/api", usuariosRoutes);   // ⭐ NUEVO

// Mascotas (crear, obtener por dueño, eliminar)
app.use("/mascotas", mascotasRoutes);

// -----------------------------------------------
//                  SERVIDOR
// -----------------------------------------------
app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});

