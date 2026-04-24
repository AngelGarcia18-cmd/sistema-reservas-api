// Middleqare global de manejo de errores
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); //Imprimer el error completo en la consola para debugging

    const statusCode = err.statusCode || 500; // Código HTTP, por defecto 500
    const message = err.message || "Error interno del servidor";

    res.status(statusCode).json({
        success: false,
        error: message
    });
};

module.exports = errorMiddleware;