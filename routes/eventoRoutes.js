const express = require("express");
const router = express.Router();
const {
    crearEvento,
    obtenerEventos,
    obtenerEventoPorId,
    actualizarEvento,
    eliminarEvento
} = require("../controllers/eventoController");

const protegerRuta = require("../middleware/authMiddleware");

// CRUD de eventos
router.post("/", protegerRuta, crearEvento);
router.get("/", obtenerEventos);
router.get("/:id", obtenerEventoPorId);
router.put("/:id", protegerRuta, actualizarEvento);
router.delete("/:id", protegerRuta, eliminarEvento);

module.exports = router;