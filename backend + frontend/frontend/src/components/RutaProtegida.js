import React from "react";
import { Navigate } from "react-router-dom";

function RutaProtegida({ children, rolPermitido }) {

    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (!token || token === "null" || token === "undefined") {
        return <Navigate to="/" />;
    }

    if (rolPermitido && rol !== rolPermitido) {
        return <Navigate to="/" />;
    }

    if (rolPermitido && rol !== rolPermitido) {
        if (rol === "admin") {
            return <Navigate to="/dashboard" />;
        } else {
            return <Navigate to="/mis-eventos" />;
        }
    }

    return children;
}

export default RutaProtegida;