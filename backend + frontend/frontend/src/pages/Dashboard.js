import React from "react";
import Layout from "../components/Layout";
import { jwtDecode } from "jwt-decode";

function Dashboard() {

    const token = localStorage.getItem("token");

    let nombre = "";

    if (token) {
        const decoded = jwtDecode(token);
        nombre = decoded.nombre;
    }

    return (
        <Layout>
            <h1>Dashboard</h1>
            <p>Bienvenido, {nombre}</p>
            
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

                <div style={card}>
                    <h3>Eventos</h3>
                    <p>Administrar tus eventos</p>
                </div>

                <div style={card}>
                    <h3>Incripciones</h3>
                    <p>Gestiona participantes</p>
                </div>
            </div>
        </Layout>
    );
}

const card = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
    width: "220px"
};

export default Dashboard;