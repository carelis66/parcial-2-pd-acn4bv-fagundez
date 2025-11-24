const express = require("express");
const router = express.Router();

const {
  crearTurno,
  obtenerTurnos,
  cancelarTurno
} = require("../controllers/turnosController");

// -----------------------------------------------------------
// Rutas de Turnos
// -----------------------------------------------------------

// Crear un turno (cliente)
router.post("/turnos", crearTurno);

// Obtener turnos de un cliente por email
router.get("/turnos/:email", obtenerTurnos);

// Cancelar turno por ID
router.delete("/turnos/:id", cancelarTurno);

module.exports = router;
