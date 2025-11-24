const fs = require("fs");
const path = require("path");

const mascotasPath = path.join(__dirname, "../data/mascotas.json");

// Leer archivo JSON
function leerMascotas() {
  const data = fs.readFileSync(mascotasPath, "utf8");
  return JSON.parse(data);
}

// Guardar archivo JSON
function guardarMascotas(mascotas) {
  fs.writeFileSync(mascotasPath, JSON.stringify(mascotas, null, 2));
}

// =======================================================
//  POST /mascotas  - Registrar mascota
// =======================================================
exports.crearMascota = (req, res) => {
  const {
    email,
    nombre,
    tipo,
    raza,
    edad,
    peso,
    alergias,
    medicacion,
    notas
  } = req.body;

  if (!email || !nombre || !tipo) {
    return res.status(400).json({
      mensaje: "Nombre, tipo y email son obligatorios."
    });
  }

  const mascotas = leerMascotas();

  const nueva = {
    id: Date.now(),
    email_dueño: email,
    nombre,
    tipo,
    raza: raza || "",
    edad: edad || "",
    peso: peso || "",
    alergias: alergias || "",
    medicacion: medicacion || "",
    notas: notas || ""
  };

  mascotas.push(nueva);
  guardarMascotas(mascotas);

  return res.status(201).json({
    mensaje: "Mascota registrada correctamente",
    mascota: nueva
  });
};

// =======================================================
//  GET /mascotas/:email - Obtener mascotas del dueño
// =======================================================
exports.obtenerMascotas = (req, res) => {
  const { email } = req.params;

  const mascotas = leerMascotas();
  const delDueño = mascotas.filter(m => m.email_dueño === email);

  return res.json(delDueño);
};

// =======================================================
//  DELETE /mascotas/:id - Eliminar mascota
// =======================================================
exports.eliminarMascota = (req, res) => {
  const { id } = req.params;
  let mascotas = leerMascotas();

  const existe = mascotas.find(m => m.id == id);

  if (!existe) {
    return res.status(404).json({ mensaje: "Mascota no encontrada." });
  }

  mascotas = mascotas.filter(m => m.id != id);

  guardarMascotas(mascotas);

  return res.json({ mensaje: "Mascota eliminada correctamente." });
};

