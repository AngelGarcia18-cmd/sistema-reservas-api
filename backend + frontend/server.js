const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");
const eventoRoutes = require("./routes/eventoRoutes");
const ponenteRoutes = require("./routes/ponenteRoutes");
const actividadesRoutes = require("./routes/actividadRoutes");
const inscripcionRoutes = require("./routes/inscripcionRoutes");

//Configurar variables de entorno
dotenv.config();

const app = express();

//ConectarDB
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

//Ruta
app.use("/api/eventos", eventoRoutes);
app.use("/api/ponentes", ponenteRoutes);
app.use("/api/actividades", actividadesRoutes);
app.use("/api/inscripciones", inscripcionRoutes);
app.use("/api/usuarios", require("./routes/usuarioRoutes"));

// Middleware global de errores
app.use(errorMiddleware);

//Puerto dinámico
const PORT = process.env.PORT || 3000;

//Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});