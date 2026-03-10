const mongoose = require("mongoose");

const actividadSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true
        },

        descripcion: {
            type: String,
            required: true
        },

        fecha: {
        type: Date,
        required: true
    },

    horaInicio: {
        type: String,
        required: true
    },

    horaFin: {
        type: String,
        required: true
    },

    evento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Evento",
        required: true
    },

    ponente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ponente",
        required: true
    }
    },
    {
        timestamps: true
    }
);

const Actividad = mongoose.model("Actividad", actividadSchema, "actividades");

module.exports = Actividad;