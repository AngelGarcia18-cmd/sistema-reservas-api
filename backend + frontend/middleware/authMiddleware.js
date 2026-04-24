const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const protegerRuta = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Usuario.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ msg: "Token inválido" });
        }
    } 
    
    if (!token) {
        res.status(401).json({ msg: "No hay token, acceso denegado" });
    }
};

module.exports = protegerRuta;