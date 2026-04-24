import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <div style={{ fontFamily: "Arial, sans-serif" }}>

            {/* NAVBAR */}
            <nav style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 40px",
                background: "#2c3e50",
                color: "white",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }}>
                <h2 style={{ margin: 0 }}>EventApp</h2>

                <div style={{ display: "flex", gap: "15px" }}>

                    <Link to="/register">
                        <button style={btnRegister}>
                            Registrarse
                        </button>
                    </Link>
                </div>
            </nav>

            {/* NAVBAR */}
            <section style={{
                height: "85vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #3498db, #2c3e50)",
                color: "white",
                textAlign: "center",
                padding: "20px"
            }}>
                <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>
                    Gestiona tus eventos fácilmente
                </h1>

                <p style={{ fontSize: "1.2rem", margin: "20px 0", maxWidth: "600px" }}>
                    Plataforma profesional para administrar eventos, inscripciones y actividades de forma rápida, segura y organizada.
                </p>

            <div style={{ display: "flex", gap: "15px" }}>
                <Link to="/Login">
                    <button style={btnPrimary}>
                        Iniciar Sesión
                    </button>
                </Link>

                <Link to="/register">
                    <button style={btnSecondary}>
                        Crear cuenta
                    </button>
                </Link>
            </div>
            </section>

            {/* FEATURES */}
            <section style={{
                padding: "60px 40px",
                textAlign: "center",
                background: "#f4f6f7"
            }}>
                <h2 style={{ marginBottom: "30px" }}>¿Qué puedes hacer?</h2>

                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    marginTop: "20px"
                }}>

                    <div style={cardStyle}>
                        <h3>🗓️ Eventos</h3>
                        <p>Crea y administra eventos fácilmente</p>
                    </div>

                    <div style={cardStyle}>
                        <h3>👥 Inscripciones</h3>
                        <p>Gestiona participantes en tiempo real</p>
                    </div>

                    <div style={cardStyle}>
                        <h3>📊 Control</h3>
                        <p>Lleva seguimiento completo del sistema</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

const btnPrimary = {
    padding: "12px 22px",
    fontSize: "1rem",
    background: "#e67e22",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600"
};

const btnSecondary = {
    padding: "12px 22px",
    fontSize: "1rem",
    background: "transparent",
    border: "2px solid white",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600"
};

const btnRegister = {
    padding: "8px 16px",
    background: "#e67e22",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600"
};

const cardStyle = {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    width: "250px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
};

export default HomePage;