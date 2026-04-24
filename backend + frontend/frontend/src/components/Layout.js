import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function Layout({ children }) {


    const navigate = useNavigate();
    const token = localStorage.getItem("token");


    let nombre = "";


    if (token) {
        const decoded = jwtDecode(token);
        nombre = decoded.nombre || decoded.email;
    }


    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };


    return (
        <div style={{ display: "flex", height: "100vh" }}>


            {/* Sidebar */}
            <div style={{
                width: "220px",
                background: "#1e272e",
                color: "white",
                display: "flex",
                flexDirection: "column",
                padding: "20px"
            }}>
                <h2 style={{ marginBottom: "30px" }}>EventApp</h2>


                <Link to="/dashboard" style={{linkStyle}}>Dashboard</Link>


                <Link to="/eventos" style={{linkStyle}}>Eventos</Link>

                <Link to="/admin/usuarios" style={{linkStyle}}>Gestionar Usuarios</Link>

                <Link to="/admin/inscripciones" style={{linkStyle}}>Ver inscripciones</Link>

                <div style={{ marginTop: "auto" }}>
                    <button onClick={logout} style={{logoutStyle}}>Cerrar sesión</button>                    
                </div>
            </div>


            {/* Contenido */}
        <div style={{ flex: 1, background: "#f5f6fa" }}>
           
            <div style={{
                height: "60px",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
            }}>
                <h3>Panel de control</h3>
                <span>👤 {nombre}</span>
            </div>


            <div style={{ padding: "20px" }}>
                {children}
            </div>
        </div>
        </div>
    );
}


const linkStyle = {
    color: "white",
    textDecoration: "none",
    marginBottom: "15px",
    display: "block"
};


const logoutStyle = {
    width: "100%",
    padding: "10px",
    background: "#e74c3c",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer"
};


export default Layout;