import AsyncStorage from "@react-native-async-storage/async-storage";
const BASE_URL = "http://192.168.1.7:3000/api";

export const loginUsuario = async (email, password) => {
    try {
        const res = await fetch(`${BASE_URL}/usuarios/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        return await res.json();
    } catch (error) {
        console.error("Error en login:", error);
    }
};

export const getEventos = async () => {
    try {
        const res = await fetch(`${BASE_URL}/eventos`);
        return await res.json();
    } catch (error) {
        console.error("Error al obtener eventos:", error);
    }
};

export const crearEvento = async (evento) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/eventos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(evento)
        });

        return await res.json();
    } catch (error) {
        console.error("Error al crear evento:", error);
    }
};

export const editarEvento = async (id, evento) => {
    try {
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/eventos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(evento)
        });

        const data = await res.json();
        console.log("EDITAR RESPUESTA:", data);

        return data;
    } catch (error) {
        console.error("Error al editar:", error);
    }
};

export const eliminarEvento = async (id) => {
    try {
        const token = await AsyncStorage.getItem("token");

        const res = await fetch(`${BASE_URL}/eventos/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        console.log("ELIMINAR RESPUESTA:", data);

        return data;
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
};