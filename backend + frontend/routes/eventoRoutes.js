const express = require("express");
const router = express.Router();
const {
    crearEvento,
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    eliminarEvento
} = require("../controllers/eventoController");

const autorizarRol = require("../middleware/autorizarRol");

const protegerRuta = require("../middleware/authMiddleware");

// CRUD de eventos
router.post("/", protegerRuta, autorizarRol("admin"), crearEvento);
router.get("/", obtenerEventos);
router.get("/:id", obtenerEventoPorId);
router.put("/:id", protegerRuta, autorizarRol("admin"), actualizarEvento);
router.delete("/:id", protegerRuta, autorizarRol("admin"), eliminarEvento);

module.exports = router;