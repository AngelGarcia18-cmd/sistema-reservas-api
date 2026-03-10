const express = require("express");
const router = express.Router();
const {
    registerUsuario,
    loginUsuario,
    obtenerUsuarioLogueado
} = require("../controllers/usuarioController");

const protegerRuta = require("../middleware/authMiddleware");

// Registrar usuario
router.post("/register", registerUsuario);

// Login
router.post("/login", loginUsuario);

// Obtener ususario logueado (protegido)
router.get("/me", protegerRuta, obtenerUsuarioLogueado);

module.exports = router;