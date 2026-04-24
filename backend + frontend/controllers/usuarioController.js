const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const Inscripcion = require("../models/Inscripcion");
const bcrypt = require("bcrypt");

//Generar JWT
const generarToken = (usuario) => {
    return jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const validarPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;
    return regex.test(password);
};

//Registrar usuario
exports.registerUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        if (!validarPassword(password)) {
            return res.status(400).json({
                msg: "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo."
            });
        }
        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) return res.status(400).json({ msg: "Usuario ya existe" });

        const usuario = await Usuario.create({ nombre, email, password, rol: "participante" });
        res.status(201).json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
            token: generarToken(usuario)
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
            rol: usuario.rol,
            token: generarToken(usuario)
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

exports.getMisEventos = async (req, res) => {
    try {
        const usuarioId = req.user.id;

        const inscripciones = await Inscripcion.find({ usuario: usuarioId })
        .populate("evento");

        const eventos = inscripciones.map((insc) => ({
            id: insc.evento._id,
            nombre: insc.evento.nombre,
            lugar: insc.evento.lugar,
            fechaInicio: insc.evento.fechaInicio,
            imagen: insc.evento.imagen,
            asistio: Boolean(insc.asistio),
            inscripcionId: insc._id
        }));

        res.json(eventos);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: "Error al obtener mis eventos" });
    }
};

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select("-password");
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cambiarRol = async (req, res) => {
    try {
        const { rol } = req.body;

        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });

        usuario.rol = rol;
        await usuario.save();

        res.json({ msg: "Rol actualizado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        await usuario.deleteOne();

        res.json({ msg: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarUsuario = async (req, res) => {
    try {
        const { nombre, email } = req.body;

        const usuario = await Usuario.findById(req.params.id);

        if(!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        usuario.nombre = nombre || usuario.nombre;
        usuario.email = email || usuario.email;

        await usuario.save();

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};