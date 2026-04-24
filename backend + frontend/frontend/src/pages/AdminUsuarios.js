import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Navigate } from "react-router-dom";
import "./AdminUsuarios.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function AdminUsuarios() {
    
    const [usuarios, setUsuarios] = useState([]);

    const [usuarioEditar, setUsuarioEditar] = useState(null);

    const rol = localStorage.getItem("rol");

    const cambiarRol = async (id, nuevoRol) => {
        try {
            const token = localStorage.getItem("token");

            await api.put(`/usuarios/${id}/rol`, { rol: nuevoRol }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            fetchUsuarios();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCambioRol = async (usuario) => {
        const nuevoRol = usuario.rol === "admin" ? "participante" : "admin";

        const confirmar = window.confirm(
            `¿Seguro que quieres cambiar el rol de ${usuario.nombre} a ${nuevoRol}?`
        );

        if (!confirmar) return;

        try {

            await cambiarRol(usuario._id, nuevoRol);

            toast.success(`Rol cambiado a ${nuevoRol}`);
        } catch (error) {
            toast.error("Error al  cambiar rol");
        }
    };

    const eliminarUsuario = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.delete(`/usuarios/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsuarios((prev) => 
            prev.filter((u) => u._id !== id)
        );

        Swal.fire("Eliminado", "El usuario fue eliminado", "success");
        } catch (error) {
            Swal.fire("Error", "No se pudo eliminar", "error");
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
                eliminarUsuario(id);
            }
        };

    const abrirModalEditar = (usuario) => {
        setUsuarioEditar(usuario);
    };

    const cerrarModal = () => {
        setUsuarioEditar(null);
    };

    const guardarCambios = async () => {
        try {
            const token = localStorage.getItem("token");

            await api.put(
                `/usuarios/${usuarioEditar._id}`,
                {
                    nombre: usuarioEditar.nombre,
                    email: usuarioEditar.email
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsuarios((prev) => 
                prev.map((u) => 
                    u._id === usuarioEditar._id ? usuarioEditar : u
                )
            );

            cerrarModal();
            toast.success("Usuario actualizado");
        } catch (error) {
            console.error(error);
            toast.error("Error al editar");
        }
    };

    const fetchUsuarios = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("/usuarios/admin", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setUsuarios(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    if (rol !== "admin") {
        return <Navigate to="/" />;
    }

    return (
        <div className="usuarios-container">
            <h2>Panel de Usuarios</h2>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u._id}>
                            <td>{u.nombre}</td>
                            <td>{u.email}</td>
                            <td>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={u.rol === "admin"}
                                        onChange={() => handleCambioRol(u)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </td>
                            <td>
                                <button
                                    className="btn-eliminar"
                                    onClick={() => confirmarEliminacion(u._id)}
                                >
                                    🗑️
                                </button>

                                <button
                                    className="btn-editar"
                                    onClick={() => abrirModalEditar(u)}
                                >
                                    ✏️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {usuarioEditar && (
                <div className="model-overlay" onClick={cerrarModal}>
                    <div 
                        className="model-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h3>Editar Usuario</h3>
                            <span className="close-btn" onClick={cerrarModal}>
                                ✖
                            </span>
                        </div>

                        <div className="modal-body">
                            <label>Nombre</label>
                            <input
                                type="text"
                                value={usuarioEditar.nombre}
                                onChange={(e) => 
                                    setUsuarioEditar({
                                        ...usuarioEditar,
                                        nombre: e.target.value
                                    })
                                }
                            />

                            <label>Email</label>
                            <input
                                type="email"
                                value={usuarioEditar.email}
                                onChange={(e) => 
                                    setUsuarioEditar({
                                        ...usuarioEditar,
                                        email: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="modal-footer">
                            <button className="btn-guardar" onClick={guardarCambios}>
                                Guardar
                            </button>

                            <button className="btn-cancelar" onClick={cerrarModal}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminUsuarios;