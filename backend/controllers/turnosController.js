// =======================================================
//  TURNOS CONTROLLER – Turno asociado a mascota
// =======================================================

const fs = require("fs");
const path = require("path");

// Paths a los JSON
const turnosPath = path.join(__dirname, "../data/turnos.json");
const mascotasPath = path.join(__dirname, "../data/mascotas.json");

// Leer archivos
function leerTurnos() {
  return JSON.parse(fs.readFileSync(turnosPath, "utf8"));
}

function guardarTurnos(turnos) {
  fs.writeFileSync(turnosPath, JSON.stringify(turnos, null, 2));
}

function leerMascotas() {
  return JSON.parse(fs.readFileSync(mascotasPath, "utf8"));
}

// =======================================================
//  POST /api/turnos  - crear turno -
// =======================================================
exports.crearTurno = (req, res) => {
  const {
    email,
    fecha,
    hora,
    servicio,
    nombreAnimal,
    tipoAnimal,
    raza,
    edad,
    peso,
    alergias,
    medicacion,
    notas,
    mascotaId   // *** NUEVO ***
  } = req.body;

  // Validación mínima
  if (!email || !fecha || !hora || !nombreAnimal || !tipoAnimal) {
    return res.status(400).json({
      mensaje: "Faltan datos obligatorios del turno o del animal."
    });
  }

  // Validar mascotaId
  if (!mascotaId) {
    return res.status(400).json({
      mensaje: "Debe seleccionar o registrar una mascota antes de pedir el turno."
    });
  }

  const mascotas = leerMascotas();
  const mascotaExiste = mascotas.find(m => m.id == mascotaId);

  if (!mascotaExiste) {
    return res.status(404).json({
      mensaje: "La mascota seleccionada no existe."
    });
  }

  const turnos = leerTurnos();

  // Validar fecha futura
  const hoy = new Date();
  const fechaTurno = new Date(fecha);

  if (fechaTurno < hoy.setHours(0, 0, 0, 0)) {
    return res.status(400).json({ mensaje: "La fecha debe ser futura." });
  }

  // Validar duplicado día/hora
  const duplicado = turnos.find(t => t.fecha === fecha && t.hora === hora);

  if (duplicado) {
    return res.status(409).json({
      mensaje: "Ya existe un turno reservado para ese horario."
    });
  }

  // Crear turno
  const nuevoTurno = {
    id: Date.now(),
    email,
    fecha,
    hora,
    servicio: servicio || "No especificado",
    estado: "pendiente",

    mascotaId,        // *** Turno vinculado a mascota ***
    nombreAnimal,
    tipoAnimal,
    raza: raza || "",
    edad: edad || "",
    peso: peso || "",
    alergias: alergias || "",
    medicacion: medicacion || "",
    notas: notas || ""
  };

  turnos.push(nuevoTurno);
  guardarTurnos(turnos);

  return res.status(201).json({
    mensaje: "Turno reservado correctamente",
    turno: nuevoTurno
  });
};

// =======================================================
//  GET /api/turnos/cliente/:email   - turnos del cliente -
// =======================================================
exports.obtenerTurnosCliente = (req, res) => {
  const { email } = req.params;
  const turnos = leerTurnos();

  const delUsuario = turnos.filter(t => t.email === email);

  return res.json(delUsuario);
};

// =======================================================
//  GET /api/turnos   - todos los turnos (recepción)
// =======================================================
exports.obtenerTodosLosTurnos = (req, res) => {
  const turnos = leerTurnos();
  return res.json(turnos);
};

// =======================================================
//  PATCH /api/turnos/:id   - actualizar estado
// =======================================================
exports.actualizarEstadoTurno = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  let turnos = leerTurnos();
  const turno = turnos.find(t => t.id == id);

  if (!turno) {
    return res.status(404).json({ mensaje: "Turno no encontrado." });
  }

  turno.estado = estado;

  guardarTurnos(turnos);

  return res.json({
    mensaje: "Estado actualizado correctamente",
    turno
  });
};

// =======================================================
//  DELETE /api/turnos/:id   - cancelar turno
// =======================================================
exports.cancelarTurno = (req, res) => {
  const { id } = req.params;

  let turnos = leerTurnos();
  const existe = turnos.find(t => t.id == id);

  if (!existe) {
    return res.status(404).json({ mensaje: "Turno no encontrado." });
  }

  turnos = turnos.filter(t => t.id != id);
  guardarTurnos(turnos);

  return res.json({ mensaje: "Turno cancelado correctamente." });
};


