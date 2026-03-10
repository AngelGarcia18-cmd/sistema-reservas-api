const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

//Generar JWT
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//Registrar usuario
exports.registerUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) return res.status(400).json({ msg: "Usuario ya existe" });

        const usuario = await Usuario.create({ nombre, email, password });
        res.status(201).json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarToken(usuario._id)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login usuario
exports.loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(401).json({ msg: "Credenciales inválidas" });

        const contraseñaValida = await usuario.matchPassword(password);
        if (!contraseñaValida) return res.status(401).json({ msg: "Credenciales inválidas" });

        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarToken(usuario._id)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener usuario logueado
exports.obtenerUsuarioLogueado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.user.id).select("-password");
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};