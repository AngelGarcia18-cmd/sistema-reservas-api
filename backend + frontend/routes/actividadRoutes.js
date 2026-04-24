const express = require("express")
const router = express.Router();

const {
    crearActividad,
    obtenerActividades,
    obtenerActividad,
    actualizarActividad,
    eliminarActividad
} = require("../controllers/actividadController");

// Crear actividad
router.post("/", crearActividad);

// Obtener todas las actividades
router.get("/", obtenerActividades);

// Obtener una actividad por ID
router.get("/:id", obtenerActividad);

// Actualizar actividad
router.put("/:id", actualizarActividad);

// Eliminar actividad
router.delete("/:id", eliminarActividad);

module.exports = router;