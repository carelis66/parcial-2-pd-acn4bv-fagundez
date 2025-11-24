const fs = require("fs");
const path = require("path");
const mascotasPath = path.join(__dirname, "../data/mascotas.json");

function leerMascotas() {
  return JSON.parse(fs.readFileSync(mascotasPath, "utf8"));
}

exports.getMascotaPorUsuario = (req, res) => {
  const usuarioId = parseInt(req.params.usuarioId);
  const mascotas = leerMascotas();
  const mascota = mascotas.find(m => m.usuarioId === usuarioId);

  if (!mascota) {
    return res.status(404).json({ mensaje: "No hay mascota registrada" });
  }

  res.json(mascota);
};
