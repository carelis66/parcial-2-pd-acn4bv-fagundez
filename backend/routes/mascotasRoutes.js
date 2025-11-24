const express = require("express");
const router = express.Router();
const { getMascotaPorUsuario } = require("../controllers/mascotasController");

router.get("/:usuarioId", getMascotaPorUsuario);

module.exports = router;
