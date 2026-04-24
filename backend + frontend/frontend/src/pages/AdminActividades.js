import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AdminActividades.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function AdminActividades() {

    const { eventoId } = useParams();

    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        fecha: "",
        horaInicio: "",
        horaFin: "",
        evento: ""
    });

    const [eventos, setEventos] = useState([]);

    const [actividades, setActividades] = useState([]);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/eventos");
                setEventos(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEventos();
    }, []);

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/actividades");
                setActividades(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchActividades();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const [editandoId, setEditandoId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("FORM:", form);

        try {

            if (editandoId) {
                await axios.put (
                    `http://localhost:3000/api/actividades/${editandoId}`,
                    {
                        ...form,
                        evento: eventoId
                    }
                );

                toast.success("Actividad actualizada correctamente");
                setEditandoId(null);
            } else {
            await axios.post("http://localhost:3000/api/actividades", {
                ...form,
                evento: eventoId
            });

            toast.success("Actividad creada correctamente");
        }

            const res = await axios.get("http://localhost:3000/api/actividades");
            setActividades(res.data);

            setForm({
                titulo: "",
                descripcion: "",
                fecha: "",
                horaInicio: "",
                horaFin: ""
            });
        } catch (error) {
            console.error(error.response?.data);
            toast.error("Error al guardar actividad");
        }
    };

    const eliminarActividad = async (id) => {

        Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta actividad se eliminará",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/actividades/${id}`);
                setActividades(actividades.filter(a => a._id !== id));

                Swal.fire(
                    "Eliminada",
                    "La actividad fue eliminada correctamente",
                    "success"
                );
            }  catch (error) {
                Swal.fire(
                    "Error",
                    "No se pudo eliminar la actividad",
                    "error"
                );
            }
        }
    });
};

    const editarActividad = (actividad) => {
        setEditandoId(actividad._id);

        setForm({
            titulo: actividad.titulo,
            descripcion: actividad.descripcion,
            fecha: actividad.fecha?.split("T")[0],
            horaInicio: actividad.horaInicio,
            horaFin: actividad.horaFin,
            evento: actividad.evento?._id
        });
    };

    return (
        <div>
            <div className="admin-container">
                <div className="card-admin">
                    <h2 className="titulo">Crear Actividad</h2>

                    <form onSubmit={handleSubmit} className="form-admin">

                        <input
                            type="text"
                            name="titulo"
                            placeholder="Título"
                            value={form.titulo}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="descripcion"
                            placeholder="Descripción"
                            value={form.descripcion}
                            onChange={handleChange}
                            required
                        />

                        <div className="row">
                            <input
                                type="date"
                                name="fecha"
                                value={form.fecha}
                                onChange={handleChange}
                                required
                            />

                            <select
                                name="evento"
                                value={form.evento}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione un evento</option>

                                {eventos.map((ev) => (
                                    <option key={ev._id} value={ev._id}>
                                        {ev.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="row">
                            <input
                                type="text"
                                name="horaInicio"
                                placeholder="Hora Inicio (Ej: 10:00 AM)"
                                value={form.horaInicio}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="text"
                                name="horaFin"
                                placeholder="Hora fin (Ej: 11:00 AM)"
                                value={form.horaFin}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-crear">
                            {editandoId ? "Actualizar" : "Crear"}
                        </button>
                        <p style={{ textAlign: "center", marginTop: "15px" }}>  
                <a href="/eventos" style={{ color: "#3498db", textDecoration: "none" }}>  
                    ← Volver  
                </a>  
            </p>
                    </form>
                    </div>
                    <div className="contenedor-actividades">
                        <h2 className="titulo-lista">Actividades creadas</h2>

                        <div className="lista-actividades-admin">
                            {actividades.length > 0 ? (
                                actividades.map((act) => (
                                    <div key={act._id} className="card-actividad-admin">

                                        <h3>{act.titulo}</h3>

                                        <p>{act.descripcion}</p>

                                        <p>🗓️ {new Date(act.fecha).toLocaleDateString("es-CO")}</p>

                                        <p>⏰ {act.horaInicio} - {act.horaFin}</p>

                                        <p className="evento">
                                            📌 Evento: {act.evento?.nombre || "Sin evento"}
                                        </p>

                                        <div className="acciones">

                                            <button
                                                className="btn-eliminar"
                                                onClick={() => eliminarActividad(act._id)}
                                            > 🗑️ Eliminar </button>

                                            <button
                                                className="btn-editar"
                                                onClick={() => editarActividad(act)}
                                            > ✏️ Editar </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No hay actividades creadas</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

export default AdminActividades;