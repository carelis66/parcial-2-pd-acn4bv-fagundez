const express = require("express");
const router = express.Router();

const {
  crearMascota,
  obtenerMascotas,
  eliminarMascota
} = require("../controllers/mascotasController");

// Registrar mascota
router.post("/mascotas", crearMascota);

// Obtener mascotas por email del dueño
router.get("/mascotas/:email", obtenerMascotas);

// Eliminar mascota
router.delete("/mascotas/:id", eliminarMascota);

module.exports = router;
