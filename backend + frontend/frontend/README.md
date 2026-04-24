# 🎨 Frontend - Sistema de Gestión de reservas

Este frontend fue desarrollado con React y permite la interacción de los usuarios con el sistema mediante 
diferentes pantallas conectadas a una API REST.

---

# 🧭 Pantallas del sistema

## 🏠 Home

Pantalla principal del sistema
Permite navegar entre las diferenetes secciones como iniciar sesión o registrarse.

---

## 🔐 Login

Permtie a los usuarios iniciar sesión en el sistema.

- Envía credenciales a la API
- Recibe un token JWT
- Guarda el token en `localStorage`
- Redirige según el rol del usuario

---

## 📝 Registro

Permite crear una nueva cuenta

- Envía datos del usuario a la API
- Valida la contraseña (seguridad)
- Guarda automáticamente el token al registrarse
- Redirige al usuario para continuar en el sistema

---

## 📆 Eventos

Muestra la lista de eventos disponibles.

- Consume la API para obtener eventos
- Permite ver detalles de cada evento
- Permite inscribirse mediante código

---

## 📌 Mis Eventos

Muestra los eventos en los que el usuario está inscrito.

- Consume la API con autenticación
- Filtra eventos según el usuario logueado

---

## 👑 Panel de Administración

Disponible solo para usuarios con rol de admin.

Incluye:

- Gestión de eventos, ponentes y actividades
- Visualización de inscripciones
- Acceso a gestión de usuarios

---

## 👥 Gestión de Usuarios

Permite al administrador:

- Ver todos los usuarios
- Cambiar roles (participante/admin)
- Editar usuarios (modal)
- Eliminar usuarios (confirmación)

---

# 🔗 Conexión con la API

El frontend se comunica con el backend mediante Axios.

---

## 📡 Configuración base

Se utiliza un archivo de servicio para centralizar las peticiones:

`import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api"
});

export default api;`

---

## 🔐 Envío del token

Para rutas protegidas, se envia el token en los headers:

`const token = localStorage.getItem("token");

const res = await api.get("/usuarios/admin", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});`

---

## 📥 Ejemplo de petición GET

`const fetchUsuarios = async () => {
    const res = await api.get("/usuarios/admin");
    setUsuarios(res.data);
};`

---

## 📥 Ejemplo de petición POST

`awwait api.post("/usuarios/register", form);`

---

## ✏️ Ejemplo de petición PUT

`await api.put(`/usuarios/${id}`, datos);`

---

## 🗑️ Ejemplo de petición DELETE

`await api.delete(`/usuarios/${id}`);`

---

## 🔐 Autenticación

- Se utiliza JWT para la autenticación
- El token se guarda en `localStorage`
- Se envía en cada petición protegida
- El backend valida el acceso según el rol

## 📂 Estructura del proyecto

`src/
 | --- components/
 | --- services/
 | --- pages/
 | --- App.js`

## 👨‍💻 Autor

Ángel David García Jiménez