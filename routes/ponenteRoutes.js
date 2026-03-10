const express = require("express");
const router = express.Router();

const {
    crearPonente,
    obtenerPonentes,
    obtenerPonente,
    actualizarPonente,
    eliminarPonente
} = require("../controllers/ponenteController");

// Crear ponente
router.post("/", crearPonente);

// Obtener todos los ponentes
router.get("/", obtenerPonentes);

// Obtener un ponente por ID
router.get("/:id", obtenerPonente);

// Actualizar ponente
router.put("/:id", actualizarPonente);

// Eliminar ponente
router.delete("/:id", eliminarPonente);

module.exports = router;