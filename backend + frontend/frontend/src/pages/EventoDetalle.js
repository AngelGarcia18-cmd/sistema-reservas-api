import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import "./EventoDetalle.css";
import { useNavigate } from "react-router-dom";

function EventoDetalle() {
    const { id } = useParams();

    const [evento, setEvento] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showPonente, setShowPonente] = useState(false);

    useEffect(() => {
        const obtenerEvento = async () => {
        try {
            const res = await api.get(`/eventos/${id}`);
            setEvento(res.data,);
            console.log(res.data);
        } catch (error) {
            console.log(error);
            toast.error("Error al cargar el evento");
        } finally {
            setLoading(false);
        }
    };

        obtenerEvento();
    }, [id]);

    if (loading) {
        return <p>Cargando evento...</p>;
    }

    if (!evento) {
        return <p>No se encontró el evento</p>;
    }

    console.log("ACTIVIDADES:", evento?.actividades);
    console.log("TIPO:", typeof evento.actividades);
    console.log("ES ARRAY:", Array.isArray(evento.actividades));
    console.log("EVENTO DEL RENDER", evento);

    if (!evento) return <p>Cargando evento...</p>;
    return (
        <div className="detalle-wrapper">
            <div className="detalle-grid">
                <div className="imagen-container">
                    <img
                        src={evento.imagen || "https://images.unsplash.com/photo-1557683316-973673baf926"}
                        alt={evento.nombre}/>
                </div>

                <div className="info-container">
                    <h1>{evento.nombre}</h1>

                    <p className="descripcion">{evento.descripcion}</p>

                    <div className="datos">
                        <p><strong>📍 Lugar:</strong> {evento.lugar}</p>

                        <p>
                            <strong>🗓️ Inicio:</strong>{" "}
                            {new Date(evento.fechaInicio).toLocaleDateString("es-CO")}
                        </p>

                        <p>
                            <strong>🗓️ Fin:</strong>{" "}
                            {new Date(evento.fechaFin).toLocaleDateString()}
                        </p>

                        <p>
                            <strong>🎟️ Cupos:</strong>{" "}
                            {evento.cuposDisponibles}
                        </p>

                        <p>
                            <strong>📌 Estado:</strong>{" "}
                            <span className={`estado ${evento.estado}`}>
                                {evento.estado}
                            </span>
                        </p>

                        <p>
                            <strong>🎤 Ponente:</strong>{" "}
                            {evento.ponente ? (
                                <span
                                    onClick={() => setShowPonente(true)}
                                    style={{
                                        color: "#3498db",
                                        cursor: "pointer",
                                        textDecoration: "underline"
                                    }}
                                >
                                    {evento.ponente.nombre}
                                </span>
                            ) : (
                                "Por confirmar"
                            )}
                        </p>

                        {showPonente && evento?.ponente && (
                            <div style={overlay} onClick={() => setShowPonente(false)}>
                                <div style={modal} onClick={(e) => e.stopPropagation()}>

                                    <h2>{evento.ponente.nombre}</h2>

                                    <p>
                                        <strong>Especialidad:</strong>{" "}
                                        {evento.ponente.especialidad}
                                    </p>

                                    <p>
                                        <strong>Biografía:</strong>{" "}
                                        {evento.ponente.biografia}</p>

                                    <button
                                        onClick={() => setShowPonente(false)}
                                        style={btnCerrar}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="accion-container">
                        <p className="ya-inscrito">
                            ✅ Ya estás inscrito en este evento
                        </p>

                        <button
                            className="btn-mis-eventos"
                            onClick={() => navigate("/mis-eventos")}>Ver mis eventos</button>

                        <p className="nota">
                            Si no puedes asistir, tu cupo no se liberará automáticamente.
                        </p>
                    </div>

                    <h2 className="titulo-actividades">Agenda del evento</h2>

                    {Array.isArray(evento?.actividades) && evento.actividades.length > 0 ? (
                        <div className="lista-actividades">
                            {evento.actividades.map((act) => (
                                <div key={act._id} className="card-actividad">

                                    <h3>{act.titulo}</h3>

                                    <p>{act.descripcion}</p>

                                    <span>
                                        🗓️ {new Date(act.fecha).toLocaleDateString()}
                                    </span>

                                    <span>
                                        ⏰ {act.horaInicio} - {act.horaFin}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>
                            {evento?.actividades ? "No hay actividades" : "Cargando actividades..."}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

const overlay = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const modal = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center"
};

const btnCerrar = {
    marginTop: "15px",
    padding: "8px 15px",
    border: "none",
    backgroundColor: "#e74c3c",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer"
};

export default EventoDetalle;