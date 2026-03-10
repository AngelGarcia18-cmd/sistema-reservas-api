const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            tri: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
        fechaInicio: {
            type: Date,
            required: true,
        },
        fechaFin: {
            type: Date,
            required: true,
        },
        lugar: {
            type: String,
            required: true,
        },
        cuposDisponibles: {
            type: Number,
            required: true,
            min: 1,
        },
        estado: {
            type: String,
            enum: ["activo", "finalizado", "cancelado"],
            default: "activo",
        },
    },
    {
        timestamps: true,
    }
);

const Evento = mongoose.model("Evento", eventoSchema);

module.exports = Evento;