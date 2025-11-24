const express = require("express");
const router = express.Router();

const {
  crearTurno,
  obtenerTurnos,
  cancelarTurno
} = require("../controllers/turnosController");

// Crear turno
router.post("/turnos", crearTurno);

// Obtener turnos del cliente
router.get("/turnos/:email", obtenerTurnos);

// Cancelar turno
router.delete("/turnos/:id", cancelarTurno);

module.exports = router;
