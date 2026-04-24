const mongoose = require ("mongoose");

const ponenteSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        especialidad: {
            type: String,
            required: true
        },
        biografia: {
            type: String,
            require: true
        },
        evento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Evento"
        }
    },
    {
        timestamps: true
    }
);

const Ponente = mongoose.model("Ponente", ponenteSchema);

module.exports = Ponente;