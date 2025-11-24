module.exports = (req, res, next) => {
  const { nombre, apellido, email, password } = req.body;

  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios." });
  }

  next();
};
