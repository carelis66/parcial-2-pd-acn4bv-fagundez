const express = require("express");
const router = express.Router();

const {
  crearTurno,
  obtenerTurnosCliente,
  obtenerTodosLosTurnos,
  cancelarTurno,
  actualizarEstadoTurno
} = require("../controllers/turnosController");

// -----------------------------------------------------------
// Rutas de Turnos
// -----------------------------------------------------------

// Crear un turno (cliente)
router.post("/turnos", crearTurno);

// Obtener TODOS los turnos (para Recepción)
router.get("/turnos", obtenerTodosLosTurnos);

// Obtener turnos de un cliente por email
router.get("/turnos/cliente/:email", obtenerTurnosCliente);

// Actualizar estado del turno (pendiente / en proceso / listo / cancelado)
router.patch("/turnos/:id", actualizarEstadoTurno);

// Cancelar turno por ID
router.delete("/turnos/:id", cancelarTurno);

module.exports = router;

