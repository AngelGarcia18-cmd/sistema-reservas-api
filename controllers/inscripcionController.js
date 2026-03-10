const Inscripcion = require("../models/Inscripcion");
const Evento = require("../models/Evento");
const Usuario = require("../models/Usuario");
const PDFDocument = require("pdfkit");
const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");

// Crear inscripción
const crearInscripcion = async (req, res) => {
    try {
        const inscripcion = await Inscripcion.create(req.body);
        res.status(201).json(inscripcion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las inscripciones
const obtenerInscripciones = async (req, res) => {
    try {
        const inscripciones = await Inscripcion.find()
            .populate("usuario")
            .populate("evento");

        res.json(inscripciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una inscripción por ID
const obtenerInscripcion = async (req, res) => {
    try {
        const inscripcion = await Inscripcion.findById(req.params.id)
            .populate("usuario")
            .populate("evento");

        if (!inscripcion) {
            return res.status(404).json({ mensaje: "Inscripción no encontrada" });
        }

        res.json(inscripcion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Marcar asistencia
const marcarAsistencia = async (req, res) => {
    try {
        const inscripcion = await Inscripcion.findByIdAndUpdate(
            req.params.id,
            { asistio: true },
            { new: true }
        );

        if (!inscripcion) {
            return res.status(404).json({ mensaje: "Inscripción no encontrada" });
        }

        res.json(inscripcion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar inscripción
const eliminarInscripcion = async (req, res) => {
    try {
        const inscripcion = await Inscripcion.findByIdAndDelete(req.params.id);

        if (!inscripcion) {
            return res.status(404).json({ mensaje: "Inscripción no encontrada" });
        }

        res.json({ mensaje: "Inscripción eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Generar certificado
const generarCertificado = async (req, res) => {
    try {
        const inscripcion = await Inscripcion.findById(req.params.id)
        .populate("usuario")
        .populate("evento");

        if (!inscripcion) {
            return res.status(404).json({ mensaje: "Inscripción no encontrada" });
        }

        if (!inscripcion.asistio) {
            return res.status(400).json({ mensaje: "El usuario no asistió al evento" });
        }

        if (!inscripcion.codigoCertificado) {
            inscripcion.codigoCertificado = "EVT-" + uuidv4().slice(0,8).toUpperCase();
            await inscripcion.save();
        }

        const urlVerificacion =
        `http://localhost:3000/api/inscripciones/verificar/${inscripcion.codigoCertificado}`;

        const qrImage = await QRCode.toDataURL(urlVerificacion);

        const doc = new PDFDocument({ size: "A4", layout: "landscape" });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=certificado.pdf`
        );

        doc.pipe(res);

        doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60).stroke();

        doc.fontSize(40).text("CERTIFICADO DE ASISTENCIA", 0, 100, {
            align: "center",
            width: doc.page.width
        });

        doc.moveDown(2);

        doc.fontSize(20).text("Se otorga el presente certificado a:", {
            align:"center",
            width: doc.page.width
        });

        doc.moveDown(1);

        doc.fontSize(35).text(inscripcion.usuario.nombre || "Participante", {
            align: "center",
            width: doc.page.width
        });

        doc.moveDown(1);

        doc.fontSize(18).text(
            `Por su participación en el evento "${inscripcion.evento.nombre}"`, {
                align: "center",
                width: doc.page.width
             }
        );

        doc.moveDown(1);

        doc.fontSize(16).text(`Fecha del evento: ${new Date(inscripcion.evento.fechaInicio).toLocaleDateString()}`, 
        {
            align: "center",
            width: doc.page.width
        });

        doc.moveDown(1);

        doc.fontSize(12).text(
            `Código de verificación: ${inscripcion.codigoCertificado}`,
            {
                align: "center",
                width: doc.page.width
            }
        );

        const firmaY = doc.page.height - 120;

        doc.fontSize(18).text("____________________", 0, firmaY, {
            align: "center",
            width: doc.page.width
        });

        doc.fontSize(16).text("Firma del organizador", {
            align: "center",
            width: doc.page.width
        });

        doc.image(qrImage, doc.page.width - 200, doc.page.height - 200, {
            width: 120
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const verificarCertificado = async (req, res) => {
    try {
        const inscripcion = await Inscripcion.findOne({
            codigoCertificado: req.params.codigo
        })
        .populate("usuario")
        .populate("evento");

        if (!inscripcion) {
            return res.status(404).json({
                valido: false,
                mensaje: "Certificado no válido"
            });
        }

        res.json({
            valido: true,
            particiante: inscripcion.usuario.nombre,
            evento: inscripcion.evento.nombre
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    crearInscripcion,
    obtenerInscripciones,
    obtenerInscripcion,
    marcarAsistencia,
    eliminarInscripcion,
    generarCertificado,
    verificarCertificado
};