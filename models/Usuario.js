const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minlength: [3, "Debe tener al menos 3 caracteres"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Email inválido"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [6, "Debe tener al menos 6 caracteres"]
    },
    rol: {
        type: String,
        enum: ["admin", "participante"],
        default: "participante",
    },
}, {
    timestamps: true
});

//Antes de guardar, hasheamos la contraseña
usuarioSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    const salt =  await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseña
usuarioSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Usuario", usuarioSchema);