import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


function LoginPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [mostrarPassword, setMostrarPassword] = useState(false);
const [error, setError] = useState("");
const navigate = useNavigate();


const handleLogin = async (e) => {  
    e.preventDefault();  

    setError("");  

    try {  
        const response = await api.post("/usuarios/login", {  
            email,  
            password  
        });  

        localStorage.setItem("token", response.data.token);  
        localStorage.setItem("rol", response.data.rol);

        if (response.data.rol === "admin") {
            navigate("/dashboard");
        } else {
            navigate("/mis-eventos")
        }
  
    } catch (error) {  
        alert("Correo o contraseña incorrectos");  
    }  
};  

return (  
    <div style={{  
        height: "100vh",  
        display: "flex",  
        justifyContent: "center",  
        alignItems: "center",  
        background: "linear-gradient(135deg, #2c3e50, #3498db)"  
    }}>  

        <form onSubmit={handleLogin} style={{  
            background: "white",  
            padding: "40px",  
            borderRadius: "10px",  
            width: "320px",  
            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)"  
        }}>  

            <h2 style={{  
                textAlign: "center",  
                marginBottom: "20px"  
            }}>  
                Iniciar Sesión  
            </h2>  

            {error && (  
                <div style={{  
                    background: "#e74c3c",  
                    color: "white",  
                    padding: "10px",  
                    borderRadius: "5px",  
                    marginBottom: "15px",  
                    textAlign: "center"  
                }}>  
                    {error}  
                </div>  
            )}  
             
            <input  
                type="email"  
                placeholder="Correo electrónico"  
                value={email}  
                onChange={(e) => setEmail(e.target.value)}  
                required  
                style={{  
                    width: "100%",  
                    padding: "10px",  
                    marginBottom: "15px",  
                    borderRadius: "5px",  
                    border: "1px solid #ccc"  
                }}  
            />  

            <div style={{ position: "relative" }}>  
                <input  
                    type={mostrarPassword ? "text" : "password"}  
                    placeholder="Contraseña"  
                    value={password}  
                    onChange={(e) => setPassword(e.target.value)}  
                    required  
                    style={{  
                        width: "100%",  
                        padding: "10px",  
                        marginBottom: "20px",  
                        borderRadius: "5px",  
                        border: "1px solid #ccc"  
                    }}  
                />  

                <div  
                    onClick={() => setMostrarPassword(!mostrarPassword)}  
                    style={{  
                        position: "absolute",  
                        right: "10px",  
                        top: "10px",  
                        cursor: "pointer",  
                        transition: "transform 0.2s ease",  
                    }}  
                >  
                    {mostrarPassword ? (<EyeOff size={20} /> ) : (<Eye size={20} />)}  
                </div>  
            </div>  

            <button type="submit" style={{  
                width: "100%",  
                padding: "10px",  
                background: "#e67e22",  
                color: "white",  
                border: "none",  
                borderRadius: "5px",  
                cursor: "pointer",  
                fontSize: "1rem"  
            }}>  
                Entrar  
            </button>  
            <p style={{ textAlign: "center", marginTop: "15px" }}>  
                <a href="/" style={{ color: "#3498db", textDecoration: "none" }}>  
                    ← Volver al inicio  
                </a>  
            </p>  
        </form>  
    </div>  
);

}

export default LoginPage;