// =====================================================
// REGISTRO DE USUARIO (hash bcrypt + validaciones)
// =====================================================

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const usuariosPath = path.join(__dirname, "../data/usuarios.json");

// REGISTER
exports.registerUser = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try {
    const data = fs.readFileSync(usuariosPath, "utf8");
    const usuarios = JSON.parse(data);

    if (usuarios.find((u) => u.email === email)) {
      return res.status(409).json({ mensaje: "El email ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      apellido,
      email,
      password: hashedPassword,
      rol: "cliente"
    };

    usuarios.push(nuevoUsuario);

    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

    return res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = fs.readFileSync(usuariosPath, "utf8");
    const usuarios = JSON.parse(data);

    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password);

    if (!passwordMatch) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta." });
    }

    return res.json({
      mensaje: "Login exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const data = fs.readFileSync(usuariosPath, "utf8");
    const usuarios = JSON.parse(data);

    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
      return res.status(404).json({ mensaje: "El email no existe." });
    }

    // Generar contraseña temporal
    const tempPassword = Math.random().toString(36).slice(-8); // algo como para resetaer no tengo para mandar email y eso

    const hashed = await bcrypt.hash(tempPassword, 10);

    usuario.password = hashed; // reemplazar contraseña

    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));

    return res.json({
      mensaje: "Contraseña temporal generada.",
      tempPassword
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};


