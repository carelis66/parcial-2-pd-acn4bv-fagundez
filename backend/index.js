// Aqui levanto  en puerto 3001
// Tutas de autenticación y turnos

const express = require("express");
const cors = require("cors");

// Rutas
const authRoutes = require("./routes/authRoutes");
const turnosRoutes = require("./routes/turnosRoutes");

const app = express();

// Middlewares que son globales
app.use(cors());
app.use(express.json());

// ---------------------------
//      RUTAS PRINCIPALES
// ---------------------------

// Autenticación para (login, register, forgot password)
app.use("/api", authRoutes);

// Turnos (crear, obtener, cancelar)
app.use("/api", turnosRoutes);

// ---------------------------
//        SERVIDOR
// ---------------------------
app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});

