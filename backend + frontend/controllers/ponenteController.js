const Ponente = require("../models/Ponente");
const Evento = require("../models/Evento");

// Crear ponente
const crearPonente = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const ponente = await Ponente.create(req.body);
        if (req.body.evento) {
            await Evento.findByIdAndUpdate(req.body.evento, {
                ponente: ponente._id
            });
        }

        res.status(201).json(ponente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los ponentes
const obtenerPonentes = async (req, res) => {
    try {
        const ponentes = await Ponente.find()
        .populate({
            path: "evento",
            select: "nombre"
        });
        res.json(ponentes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un ponente por ID
const obtenerPonente = async (req, res) => {
    try {
        const ponente = await Ponente.findById(req.params.id).populate("evento");

        if (!ponente) {
            return res.status(404).json({ mensaje: "Ponente no encontrado" });
        }

        res.json(ponente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar ponente
const actualizarPonente = async (req, res) => {
    try {
        const ponente = await Ponente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!ponente) {
            return res.status(404).json({ mensaje: "Ponente no encontrado" });
        }

        res.json(ponente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Eliminar ponente
const eliminarPonente = async (req, res) => {
    try {
        const ponente = await Ponente.findByIdAndDelete(req.params.id);

        if (!ponente) {
            return res.status(404).json({ mensaje: "Ponente no encontrado" });
        }

        res.json({ mensaje: "Ponente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearPonente,
    obtenerPonentes,
    obtenerPonente,
    actualizarPonente,
    eliminarPonente
};