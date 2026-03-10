const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI.trim();
        console.log("MONGO_URI:", JSON.stringify(uri));
        await mongoose.connect(uri);
        console.log("MongoDB conectado");
    } catch (error) {
        console.error("Error de conexión:", error);
        process.exit(1);
    }
};

module.exports = connectDB;