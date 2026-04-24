console.log("RUTA INSCRIPCIONES CARGADA");
const express = require("express");
const router = express.Router();
const protegerRuta = require("../middleware/authMiddleware");
const { unirsePorCodigo } = require("../controllers/inscripcionController");
const { generarCertificado, verificarCertificado } = require("../controllers/inscripcionController");

const {
    crearInscripcion,
    obtenerInscripciones,
    obtenerTodasInscripciones,
    obtenerInscripcion,
    marcarAsistencia,
    eliminarInscripcion
} = require("../controllers/inscripcionController");

router.get("/verificar/:codigo", verificarCertificado);

//Generar certificado
router.get("/:id/certificado", generarCertificado);

// Unirse por código
router.post("/unirse", protegerRuta, unirsePorCodigo);

// Crear inscripción
router.post("/", crearInscripcion);

// Obtener todas las inscripciones
router.get("/", obtenerInscripciones);

router.get("/admin", protegerRuta, obtenerTodasInscripciones);

//Obtener una inscripción por ID
router.get("/:id", obtenerInscripcion);

// Marcar asistencia
router.put("/:id/asistencia", marcarAsistencia);

// Eliminar inscripción
router.delete("/:id", eliminarInscripcion);

module.exports = router;