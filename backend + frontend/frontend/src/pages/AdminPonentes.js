import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPonentes.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function AdminPonentes() {

    const [form, setForm] = useState({
        nombre: "",
        especialidad: "",
        biografia: "",
        evento: ""
    });

    const [eventos, setEventos] = useState([]);
    const [ponentes, setPonentes] = useState([]);
    const { eventoId } = useParams();
    const [editando, setEditando] = useState(null);

    useEffect(() => {
        const fetchPonentes = async () => {
            const res = await axios.get("http://localhost:3000/api/ponentes");
            setPonentes(res.data);
        };

        fetchPonentes();
    }, []);

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
        console.log("Evento actual:", eventoId);
    }, [eventoId]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editando) {
                await axios.put(
                    `http://localhost:3000/api/ponentes/${editando}`,
                    {
                        nombre: form.nombre,
                        especialidad: form.especialidad,
                        biografia: form.biografia,
                        evento: eventoId
                    }
                );

                console.log("DATA ENVIADA:", form);

                toast.success("Ponente actualizado correctamente");
            } else {
                await axios.post("http://localhost:3000/api/ponentes", {
                    nombre: form.nombre,
                    especialidad: form.especialidad,
                    biografia: form.biografia,
                    evento: eventoId
                });

                toast.success("Ponente creado correctamente");
            }

            const res = await axios.get("http://localhost:3000/api/ponentes");
            setPonentes(res.data);

            setForm({
                nombre: "",
                especialidad: "",
                biografia: "",
                evento: ""
            });

            setEditando(null);
        } catch (error) {
            console.error(error.response?.data);
            toast.error("Error al crear ponente");
        }
    };

    const handleEliminar = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Este ponente se eliminará",
            icon: "warning",
            showCancelButton: "true",
            confirmButtonText: "Sí, eliminar",
            CancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/ponentes/${id}`);

                setPonentes(ponentes.filter((p) => p._id !== id));

                Swal.fire("Eliminado", "El ponente fue eliminado", "success");
            } catch (error) {
                Swal.fire("Error", "No se pudo eliminar", "error");
            }
        }
    };

    const handleEditar = (ponente) => {
        setForm({
            nombre: ponente.nombre,
            especialidad: ponente.especialidad,
            biografia: ponente.biografia
        });

        setEditando(ponente._id);
    };

    return (
        <div className="admin-container">
            <div className="card-admin">

                <h2 className="titulo">Crear Ponente</h2>
                <p className="admin-subtitle">Añade un nuevo ponente al evento</p>

                <form onSubmit={handleSubmit} className="form-admin">

                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del ponente"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="especialidad"
                        placeholder="Especialidad"
                        value={form.especialidad}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="biografia"
                        placeholder="Biografía"
                        value={form.biografia}
                        onChange={handleChange}
                        required
                    />

                    <select
                        name="evento"
                        value={form.evento}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un evento</option>

                        {eventos.map((evento) => (
                            <option key={evento._id} value={evento._id}>
                                {evento.nombre}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="btn-crear">
                        {editando ? "Actualizar" : "Crear"}
                    </button>
                    
                        <a href="/eventos" style={{ color: "#3498db", textDecoration: "none" }}>  
                            ← Volver  
                        </a>

                </form>
            </div>
            <div className="contenedor-ponentes">
                <h2 className="titulo-ponente">Ponentes creados</h2>

                <div className="lista-ponentes-admin">
                    {ponentes.map((p) => {
                        console.log("eventoId:", eventoId);

                        return (
                        <div key={p._id} className="card-ponente-admin">

                            <h3>{p.nombre}</h3>

                            <p><strong>🎓 Especialidad:</strong> {p.especialidad}</p>

                            <p>{p.biografia}</p>

                            <p className="evento">
                                📌 Evento: {p.evento?.nombre || "Sin evento"}
                            </p>

                                <div className="acciones">
                                    <button onClick={() => handleEliminar(p._id)}>
                                        🗑️ Eliminar
                                    </button>

                                    <button onClick={() => handleEditar(p)}>
                                        ✏️ Editar
                                    </button>
                                </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default AdminPonentes;