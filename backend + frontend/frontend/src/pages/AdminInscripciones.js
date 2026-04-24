import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminInscripciones.css";
import { toast } from "react-toastify";

function AdminInscripciones() {
    const [inscripciones, setInscripciones] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [eventoFiltro, setEventoFiltro] = useState("");

    const fetchInscripciones = async () => {
        try {
            console.log("TOKEN:", localStorage.getItem("token"));
            const token = localStorage.getItem("token");

            const res = await axios.get("http://localhost:3000/api/inscripciones/admin",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setInscripciones(res.data);

        } catch (error) {
            console.error ("ERROR:", error.esponse?.data || error);
        }
    }

    useEffect(() => {
        fetchInscripciones();
    }, []);

    const inscripcionesFiltradas = inscripciones.filter((i) => {
        const nombre = i.usuario?.nombre?.toLowerCase() || "";
        const email = i.usuario?.email?.toLowerCase() || "";
        const evento = i.evento?.nombre || "";

        return (
            nombre.includes(busqueda.toLowerCase()) ||
            email.includes(busqueda.toLowerCase())
        ) && (
            eventoFiltro === "" || evento === eventoFiltro
        );
    });

    const eventosUnicos = [...new Set(
        inscripciones.map(i => i.evento?.nombre).filter(Boolean)
    )];

    const total = inscripciones.length;
    const asistieron = inscripciones.filter(i => i.asistio).length;
    const noAsistieron = total - asistieron;

    const cambiarAsistencia = async (id, asistio) => {
        try {
            await axios.put(`http://localhost:3000/api/inscripciones/${id}/asistencia`, {
                asistio: !asistio
            });

            toast.success("Asistencia actualizada");

            fetchInscripciones();
        } catch (error) {
            console.error(error);
        }
    };
    console.log("EVENTOS UNICOS:", eventosUnicos);

    return (
        <div className="admin-container">
            <div className="admin-inscripciones">
                <h2>📋 Inscripciones</h2>

                <div className="top-bar">
                    <input
                        type="text"
                        placeholder="🔍 Buscar por nombre o email..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />

                    <select
                        value={eventoFiltro}
                        onChange={(e) => setEventoFiltro(e.target.value)}
                    >
                        <option value="">Todos los eventos</option>
                        {eventosUnicos.map((e, idx) => (
                            <option key={idx} value={e}>{e}</option>
                        ))}
                    </select>
                </div>

                <div className="stats">
                    <div className="card-stat total">
                        <h3>{total}</h3>
                        <p>Total</p>
                    </div>

                    <div className="card-stat okey">
                        <h3>{asistieron}</h3>
                        <p>Asistieron</p>
                    </div>

                    <div className="card-stat no">
                        <h3>{noAsistieron}</h3>
                        <p>No asistieron</p>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Eventos</th>
                            <th>Fecha</th>
                            <th>Asistió</th>
                        </tr>
                    </thead>

                    <tbody>
                        {inscripcionesFiltradas.map((i) => (
                            <tr key={i._id}>
                                <td>{i.usuario?.nombre}</td>
                                <td>{i.usuario?.email}</td>
                                <td>{i.evento?.nombre}</td>
                                <td>{new Date(i.FechaInscripcion).toLocaleDateString()}</td>
                                <td>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={i.asistio}
                                            onChange={() => cambiarAsistencia(i._id, i.asistio)}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminInscripciones;