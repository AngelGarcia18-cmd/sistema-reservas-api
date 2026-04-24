import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./MisEventos.css";
import axios from "axios";

const MisEventos = () => {
    const [eventos, setEventos] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await api.get("/usuarios/mis-eventos", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEventos(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEventos();
    }, []);

    return (
        <div className="mis-eventos-container">

            <div className="mis-eventos-header">
                <div>
                    <h1>Mis eventos</h1>
                    <p>Gestiona y revisa tus eventos inscritos</p>
                </div>
                    <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
                    <button onClick={() => navigate("/unirse")}
                        style={btnUnirse}
                    >
                        Unirse a un evento
                    </button>
            </div>

            <div className="grid-eventos">
                {eventos.length === 0 ? (
                    <div className="empty">
                        <p>No tienes eventos aún</p>
                    </div>
                ) : (
                    eventos.map((evento) => {
                        const esProximo = new Date(evento.fechaInicio) >= new Date();

                        console.log("EVENTO FRONT:", evento);

                        const descargarCertificado = async (inscripcionId) => {
                            try {
                                const token = localStorage.getItem("token");

                                const res = await axios.get(`http://localhost:3000/api/inscripciones/${inscripcionId}/certificado`,
                                    {
                                        responseType: "blob",
                                        headers: {
                                            Authorization: `Bearer ${token}`
                                        }
                                    }
                                );

                                const url = window.URL.createObjectURL(new Blob([res.data]));
                                const link = document.createElement("a");
                                link.href = url;
                                link.setAttribute("download", "certificado.pdf");
                                document.body.appendChild(link);
                                link.click();
                            } catch (error) {
                                console.error("ERROR COMPLETO:", error.response?.data || error);
                                alert("Error al descargar el certificado");
                            }
                        };

                    return (
                        <div
                            key={evento.id}
                            className="card-evento"
                            onClick={() => navigate(`/evento/${evento.id}`)}
                        >
                            <div
                                className="img-wrapper">
                            <img
                                src={
                                    evento.imagen ||
                                    "https://images.unsplash.com/photo-1557683316-973673baf926"
                                }
                                alt={evento.nombre}
                            />

                            <div
                                className="overlay"></div>

                            <span
                                className={`badge ${ esProximo ? "proximo" : "pasado" }`}>
                                    {esProximo ? "Próximo" : "Finalizado"}
                                </span>
                            </div>

                            <div className="info">
                                <h3>{evento.nombre}</h3>
                                <p>{evento.lugar}</p>
                                <span className="fecha">
                                    {new Date(evento.fechaInicio).toLocaleDateString("es-CO")}
                                </span>
                                    {String(evento.asistio) === "true" && (
                                        <button
                                            onClick={() => descargarCertificado(evento.inscripcionId)}
                                            className="btn-certificado"
                                        >
                                            📄 Descargar certificado
                                        </button>
                                    )}
                            </div>
                        </div>
                    );
                })
            )}
            </div>
        </div>
    );
};

const btnUnirse = {
    marginBottom: "20px",
    padding: "10px 15px",
    border: "none",
    background: "#3498db",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer"
};

export default MisEventos;