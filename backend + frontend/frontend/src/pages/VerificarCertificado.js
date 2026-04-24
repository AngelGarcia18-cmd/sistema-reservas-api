import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./VerificarCertificado.css";

function VerificarCertificado() {
    const { codigo } = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verificar = async () => {
            try {
                const res = await axios.get (
                    `http://localhost:3000/api/inscripciones/verificar/${codigo}`
                );
                setData(res.data);
            } catch (error) {
                setData({
                    valido: false,
                    mensaje: "Error al verificar"
                });
            } finally {
                setLoading(false);
            }
        };

        verificar();
    }, [codigo]);

    if (loading) return <h2>Verificando certificado...</h2>;

    if (!data) return <h2>No hay datos</h2>;

    return (
        <div className="verificar-container">
            <div className={`card ${data.valido ? "valido" : "invalido"}`}>

                <h1 className="estado">
                    {data.valido ? "Certificado válido" : "Certificado inválido"}
                </h1>

                {data.valido && (
                    <>
                        <h2 className="nombre">{data.participante}</h2>
                        <p className="texto">Participó en el evento</p>
                        <h3 className="evento">{data.evento}</h3>
                    </>
                )}

                {!data.valido && (
                    <p className="error-text">
                        No se encontró este certificado o no es válido
                    </p>
                )}
            </div>
        </div>
    );
}

export default VerificarCertificado;