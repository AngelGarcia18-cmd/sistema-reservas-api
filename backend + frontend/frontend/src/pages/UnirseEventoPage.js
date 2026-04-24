import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UnirseEvento() {
    const navigate = useNavigate();
    const [codigo, setCodigo] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUnirse = async (e) => {
        e.preventDefault();

        if (!codigo) {
            return toast.error("Ingresa un código");
        }

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await api.post("/inscripciones/unirse",
                { codigo }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("RESPUESTA:", res.data);

            toast.success("Te uniste al evento");

            const eventoId = res?.data?.evento?._id;

            if (!eventoId) {
                return toast.error("No se pudo obtener el evento");
            }

            navigate(`/evento/${eventoId}`);

            setCodigo("")
        } catch (error) {
            console.log("ERROR:", error?.response?.data || error.message);
            toast.error(
                error?.response?.data?.msg || "Error al unirse"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Unirse a un evento</h1>
                <p style={styles.subtitle}>
                    Ingresa el código que te compartió el administrador
                </p>

                <form onSubmit={handleUnirse}>
                    <input
                        type="text"
                        placeholder="Ej: ABC123"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                        style={styles.input}
                    />

                    <button style={styles.button} disabled={loading}>
                        {loading ? "Uniendose..." : "Unirme"}
                    </button>
                </form>
            </div>
        </div>
    )
}

const styles = {
    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #2c3e50, #3498db)"
    },
    card: {
        background: "white",
        padding: "40px",
        borderRadius: "12px",
        width: "350px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
    },
    title: {
        marginBottom: "10px"
    },
    subtitle: {
        fontSize: "14px",
        color: "#666",
        marginBottom: "20px"
    },
    input: {
        width: "100%",
        padding: "12px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginBottom: "20px",
        textAlign: "center",
        letterSpacing: "2px",
        boxSizing: "border-box"
    },
    button: {
        width: "100%",
        padding: "12px",
        background: "#3498db",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer"
    }
};

export default UnirseEvento;