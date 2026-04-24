const express = require("express");
const router = express.Router();
const {
    registerUsuario,
    loginUsuario,
    obtenerUsuarioLogueado,
    getMisEventos,
    obtenerUsuarios,
    cambiarRol,
    eliminarUsuario,
    actualizarUsuario
} = require("../controllers/usuarioController");

const protegerRuta = require("../middleware/authMiddleware");
const autorizarRol = require("../middleware/autorizarRol");
// Registrar usuario
router.post("/register", registerUsuario);

// Login
router.post("/login", loginUsuario);

// Obtener ususario logueado (protegido)
router.get("/me", protegerRuta, obtenerUsuarioLogueado);

router.get("/mis-eventos", protegerRuta, getMisEventos);

router.get("/admin", protegerRuta, autorizarRol("admin"), obtenerUsuarios);

router.put("/:id/rol", protegerRuta, autorizarRol("admin"), cambiarRol);

router.delete("/:id", protegerRuta, autorizarRol("admin"), eliminarUsuario);

router.put("/:id", protegerRuta, autorizarRol("admin"), actualizarUsuario);

module.exports = router;