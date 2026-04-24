import React, { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function EventosPage() {

    const [eventos, setEventos] = useState([]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [nuevoEvento, setNuevoEvento] = useState({
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        lugar: "",
        cuposDisponibles: "",
        estado: ""
    });

    const [eventoEditando, setEventoEditando] = useState(null);

    const obtenerEventos = async () => {
        try {
            const response = await api.get("/eventos")
            setEventos(response.data);
        } catch (error) {
            console.error("Error al obtener eventos");
        }
    };

    const handleChange = (e) => {
        setNuevoEvento({
            ...nuevoEvento,
            [e.target.name]: e.target.value
        });
    };

    const guardarEvento = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {

            if (eventoEditando) {
                await api.put(`/eventos/${eventoEditando}`, nuevoEvento, {
                    headers: {
                    Authorization: `Bearer ${token}`
                }
                });
                toast.success("Evento actualizado correctamente");
            } else {
            await api.post("/eventos", nuevoEvento, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Evento creado correctamente");
        }

            setMostrarFormulario(false);
            setEventoEditando(null);

            obtenerEventos();
        } catch (error) {
            console.error("Error al crear evento", error);
        }
    };

    const editarEvento = (evento) => {
        setNuevoEvento(evento);
        setEventoEditando(evento._id);
        setMostrarFormulario(true);
    };

    const eliminarEvento = async (id) => {

        const token = localStorage.getItem("token");

        try {

            await api.delete(`/eventos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.info("Evento eliminado");

            obtenerEventos();
        } catch (error) {

            console.error("Error al eliminar evento", error);
        }
    };

    const confirmarEliminacion = async (id) => {
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "No podrás revertir esta acción",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#e74c3c",
                cancelButtonColor: "#7f8c8d",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            });

            if (result.isConfirmed) {
                eliminarEvento(id);
            }
        };

    useEffect(() => {
        obtenerEventos();
    }, []);

    const navigate = useNavigate();

    return (
        <Layout>

            <h1 style={{ marginBottom:  "20px" }}>Eventos</h1>

            <button
                onClick={() => setMostrarFormulario(true)}
                style={{
                    marginRight: "10px",
                    padding: "10px 15px",
                    background: "#27ae60",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "20px"
                }}
            >
                + Crear Evento
            </button>

            {mostrarFormulario && (
                <form onSubmit={guardarEvento} style={formStyle}>

                    <h3 style={{ marginBottom: "15px" }}>
                        {eventoEditando ? "Editar Evento" : "Nuevo Evento"}
                    </h3>

                    <input name="nombre" placeholder="Nombre" onChange={handleChange} style={inputStyle} />
                    <input name="descripcion" placeholder="Descripción" onChange={handleChange} style={inputStyle} />
                    <input type="date" name="fechaInicio" onChange={handleChange} style={inputStyle} />
                    <input type="date" name="fechaFin" onChange={handleChange} style={inputStyle} />
                    <input name="lugar" placeholder="Lugar" onChange={handleChange} style={inputStyle} />
                    <input type="number" name="cuposDisponibles" placeholder="Cupos" onChange={handleChange} style={inputStyle} />
                    <input name="estado" placeholder="Estado" onChange={handleChange} style={inputStyle} />
                    <button type="submit" style={btnGuardar}>
                    {eventoEditando ? "Actualizar" : "Guardar"}
                    </button>
                </form>
            )}

            <table style={tableStyle}>

                <thead style={theadStyle}>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Lugar</th>
                        <th>cupos</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {eventos.map((evento) => (
                        <tr key={evento._id} style={{ textAlign: "center" }}>

                            <td>{evento.nombre}</td>
                            <td>{evento.descripcion}</td>
                            <td>{evento.fechaInicio}</td>
                            <td>{evento.fechaFin}</td>
                            <td>{evento.lugar}</td>
                            <td>{evento.cuposDisponibles}</td>
                            <td>{evento.estado}</td>
                            <td>
                                <button
                                    onClick={() => editarEvento(evento)}
                                    style={btnEditar}>
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => confirmarEliminacion(evento._id)}
                                        style={btnEliminar}>
                                            Eliminar
                                    </button>

                                    <button
                                        onClick={() => navigate(`/admin/ponentes/${evento._id}`)}
                                        style={{
                                            marginRight: "10px",
                                            padding: "5px 10px",
                                            background: "#3c3aa5",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                        >
                                            Ver ponentes
                                    </button>

                                    <button
                                        onClick={() => navigate(`/admin/actividades/${evento._id}`)}
                                        style={{
                                            padding: "5px 10px",
                                            background: "#bbb936",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                        >
                                            Ver actividades
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    );
}

const formStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
    display: "grid",
    gap: "10px"
};

const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
};

const btnGuardar = {
    padding: "10px",
    background: "#2980b9",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
};

const theadStyle = {
    background: "#2c3e50",
    color: "white"
};

const btnEditar = {
    marginRight: "10px",
    padding: "5px 10px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};

const btnEliminar = {
    marginRight: "10px",
    padding: "5px 10px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
};

export default EventosPage;
