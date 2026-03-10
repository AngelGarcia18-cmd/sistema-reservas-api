const Actividad = require("../models/Actividad");

// Crear actividad
const crearActividad = async (req, res) => {
    try {
        const actividad = await Actividad.create(req.body);
        res.status(201).json(actividad);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las actividades
const obtenerActividades = async (req, res) => {
    try {
        const actividades = await Actividad.find()
        .populate("evento")
        .populate("ponente");

        res.json(actividades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una actividad por ID
const obtenerActividad = async (req, res) => {
    try {
        const actividad = await Actividad.findById(req.params.id)
        .populate("evento")
        .populate("ponente");

        if (!actividad) {
            return res.status(404).json({ mensaje: "Actividad no encontrada" });
        }

        res.json(actividad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar actividad
const actualizarActividad = async (req, res) => {
    try {
        const actividad = await Actividad.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!actividad) {
            return res.status(404).json({ mensaje: "Actividad no encontrada "});
        }

        res.json(actividad);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar actividad
const eliminarActividad = async (req, res) => {
    try {
        const actividad = await Actividad.findByIdAndDelete(req.params.id);

        if (!actividad) {
            return res. status(404).json({ mensaje: "Actividad no encontrada" });
        }

        res.json({ mensaje: "Actividad eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearActividad,
    obtenerActividades,
    obtenerActividad,
    actualizarActividad,
    eliminarActividad
};