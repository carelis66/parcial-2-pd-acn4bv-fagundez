const express = require("express");
const router = express.Router();

const {
  crearMascota,
  obtenerMascotas,
  obtenerTodasLasMascotas,
  eliminarMascota
} = require("../controllers/mascotasController");

// Registrar mascota
router.post("/mascotas", crearMascota);

// Obtener todas las mascotas (RECEPCIÓN)
router.get("/mascotas", obtenerTodasLasMascotas);

// Obtener mascotas por email del dueño
router.get("/mascotas/:email", obtenerMascotas);

// Eliminar mascota
router.delete("/mascotas/:id", eliminarMascota);

module.exports = router;

