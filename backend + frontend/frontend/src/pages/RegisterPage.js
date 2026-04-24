import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./RegisterPage.css";

function RegisterPage() {

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post("/usuarios/register", form);

            // token guardado automáticamente (como login)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("rol", response.data.rol);

            toast.success("Registro exitoso");

            navigate("/unirse");
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al registrar");
        }
    };

    const validarPassword = (password) => {
        return {
            length: password.length >= 8,
            mayus: /[A-Z]/.test(password),
            minus: /[a-z]/.test(password),
            numero: /\d/.test(password),
            simbolo: /[@$!%*?&.#_-]/.test(password)
        };
    };

    const reglas = validarPassword(form.password);

    return (
        <div style={container}>

            <form onSubmit={handleRegister} style={card}>

                <h2 style={{ textAlign: "center" }}>Crear cuenta</h2>

                <input
                    name="nombre"
                    placeholder="Nombre completo"
                    value={form.nombre}
                    onChange={handleChange}
                    style={input}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChange={handleChange}
                    style={input}
                    required
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                    style={input}
                    required
                />

                <div className="password-rules">
                    <p className={reglas.length ? "ok" : ""}>✔ Mínimo 8 caracteres</p>
                    <p className={reglas.mayus ? "ok" : ""}>✔ Una mayúscula</p>
                    <p className={reglas.minus ? "ok" : ""}>✔ Una minúscula</p>
                    <p className={reglas.numero ? "ok" : ""}>✔ Un número</p>
                    <p className={reglas.simbolo ? "ok" : ""}>✔ Un símbolo</p>
                </div>

                <button type="submit" style={button}>
                    Crear cuenta
                </button>

                <p style={{ textAlign: "center" }}>
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login" style={link}>Inicia sesión</Link>
                </p>
            </form>
        </div>
    );
}

const container = {
    display:  "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #3498db, #2c3e50)"
};

const card = {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "320px"
};

const input = {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "0.95rem"
};

const button = {
    padding: "12px",
    background: "#e67e22",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem"
};

const link = {
    color: "#3498db",
    textDecoration: "none",
    fontWeight: "500"
};

export default RegisterPage;