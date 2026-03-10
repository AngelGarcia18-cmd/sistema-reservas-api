const express = require("express");
const router = express.Router();
const { generarCertificado, verificarCertificado } = require("../controllers/inscripcionController");

const {
     crearInscripcion,
    obtenerInscripciones,
    obtenerInscripcion,
    marcarAsistencia,
    eliminarInscripcion
} = require("../controllers/inscripcionController");

router.get("/verificar/:codigo", verificarCertificado);

//Generar certificado
router.get("/:id/certificado", generarCertificado);

// Crear inscripción
router.post("/", crearInscripcion);

// Obtener todas las inscripciones
router.get("/", obtenerInscripciones);

//Obtener una inscripción por ID
router.get("/:id", obtenerInscripcion);

// Marcar asistencia
router.put("/:id/asistencia", marcarAsistencia);

// Eliminar inscripción
router.delete("/:id", eliminarInscripcion);

module.exports = router;