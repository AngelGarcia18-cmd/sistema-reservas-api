const Evento = require("../models/Evento");

// Crear un evento (solo admin)
const crearEvento = async (req, res) => {
    try {
        const evento = await Evento.create(req.body);
        res.status(201).json(evento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los eventos
const obtenerEventos = async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un evento por ID
const obtenerEventoPorId = async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);
        if (!evento) return res.status(404).json({ mensaje: "Evento no encontrado" });
        res.json(evento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un evento
const actualizarEvento = async (req, res) => {
    try {
        const evento = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!evento) return res.status(404).json({ mensaje: "Evento no encontrado" });
        res.json(evento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un evento
const eliminarEvento = async (req, res) => {
    try {
        const evento = await Evento.findByIdAndDelete(req.params.id);
        if (!evento) {
            return res.status(404).json({ mensaje: "Evento no encontrado" });
        }

        res.json({
            mensaje: "Evento eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearEvento,
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    eliminarEvento
};