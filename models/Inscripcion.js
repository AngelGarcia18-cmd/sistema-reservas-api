const mongoose = require("mongoose");

const inscripcionSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        },

        evento:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Evento",
            required: true
        },

        FechaInscripcion: {
            type: Date,
            default: Date.now
        },

        asistio: {
            type: Boolean,
            default: false
        },

        codigoCertificado: {
            type: String,
            unique: true,
            sparse: true
        }
    
    },
    {
        timestamps: true
    }
);

const Inscripcion = mongoose.model("Inscripcion", inscripcionSchema, "inscripciones");

module.exports = Inscripcion;