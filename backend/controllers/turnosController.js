const fs = require("fs");
const path = require("path");

// Ruta al archivo JSON
const turnosPath = path.join(__dirname, "../data/turnos.json");

// Leer archivo JSON
function leerTurnos() {
  const data = fs.readFileSync(turnosPath, "utf8");
  return JSON.parse(data);
}

// Guardar archivo JSON
function guardarTurnos(turnos) {
  fs.writeFileSync(turnosPath, JSON.stringify(turnos, null, 2));
}

// =======================================================
//  POST /api/turnos  (crear turno)
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
    notas
  } = req.body;

  // Validación mínima
  if (!email || !fecha || !hora || !nombreAnimal || !tipoAnimal) {
    return res.status(400).json({
      mensaje: "Faltan datos obligatorios del turno o del animal."
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
  const duplicado = turnos.find((t) => t.fecha === fecha && t.hora === hora);

  if (duplicado) {
    return res.status(409).json({
      mensaje: "Ya existe un turno reservado para ese horario."
    });
  }

  // Crear registro del turno con datos del animal
  const nuevoTurno = {
    id: Date.now(),
    email,
    fecha,
    hora,
    servicio: servicio || "No especificado",
    estado: "pendiente",

    // Datos del animal
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
//  GET /api/turnos/:email   (turnos del cliente)
// =======================================================
exports.obtenerTurnos = (req, res) => {
  const { email } = req.params;

  const turnos = leerTurnos();

  const delUsuario = turnos.filter((t) => t.email === email);

  return res.json(delUsuario);
};

// =======================================================
//  DELETE /api/turnos/:id   (cancelar turno)
// =======================================================
exports.cancelarTurno = (req, res) => {
  const { id } = req.params;

  let turnos = leerTurnos();

  const existe = turnos.find((t) => t.id == id);

  if (!existe) {
    return res.status(404).json({ mensaje: "Turno no encontrado." });
  }

  turnos = turnos.filter((t) => t.id != id);

  guardarTurnos(turnos);

  return res.json({ mensaje: "Turno cancelado correctamente." });
};
