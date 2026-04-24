const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
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
        codigoInvitacion: {
            type: String,
            required: true,
            default: () => Math.random().toString(36).substring(2, 8).toUpperCase()
        },
        administrador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario"
        },

        ponente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ponente"
        },

        actividades: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Actividad"
        }]
    },
    {
        timestamps: true,
    }
);

const Evento = mongoose.model("Evento", eventoSchema);

module.exports = Evento;