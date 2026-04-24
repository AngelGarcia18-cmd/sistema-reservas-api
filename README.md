# 🌐 Sistema de Gestión de Reservas

## 📝 Descripción general

El sistema de Gestión de Reservas es una solución tecnológica desarrollada para administrar eventos, actividades, ponentes y usuarios a través de múltiples plataformas: web y móvil.
El sistema permite a los usuarios autenticarse, gestionar eventos y visualizar información relevante, integrado a un backend robusto con clientes frontend y móvil.

## 🎯 Objetivo

Desarrollar un sistema completo que permita la gestión eficiente de eentos mediante  una arquitectura cliente-servior, garantizando seguridad, usabilidad y escalabilidad.

## 🏗️ Arquitectura del sistema

El sistema está basado en una arquitectura de tres capas:

- **Backend (API REST)**

Encargado de la lógica de negocio y acceso a datos.

- Desarrollado con Node.js y Express
- Conexión a base de datos MongoDB
- Implementación de autenticación con JWT
- Exposición de endpoint REST

- **Fronrend Web**

Interfaz web para la gestión del sistema.

- Desarrollado con React
- Consumo de API REST
- Manejo de rutas y autenticación
- Panel de administración

- **Aplicación Móvil**

Cliente móvil para la gestión de eventos.

- Desarrollado con React Native (Expo)
- Consumo de API RESTmediante fetch
- Manejo de sesión con AsyncStorage
- Interfaz optimizada para dispositivos móviles

## ⚙️ Tecnologías utilizadas

- **Backend**

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

- **Frontend Web**

- React
- React Router
- Axios
- CSS

- **App Móvil**

- React Native
- Expo
- AsyncStorage

## 🔐 Autenticación y seguridad

El sistema implementa autenticación basada en token JWT:

- Inicio de sesión con credenciales
- Generación de token en el backend
- Almacenamiento del token en cliente
- Envío del token en rutas protegidas
- Control de acceso según roles (admin / participante)

## 📊 Funcionalidades principales

- **Gestión de usuarios**

- Registro e inicio de sesión
- Asignación de roles
- Administración de usuarios (solo admin)

- **Gestión de eventos**

- Crear eventos
- Visualizar eventos
- Editar eventos
- Eliminar eventos

- **Gestión de actividades**

- Creación de actividades dentro de eventos
- Organización de contenidos del eventos

- **Experiencia de usuario**

- Interfaz intuitiva
- Navegación entre pantallas
- Diseño basado en componentes
- Animaciones en la app móvil

## 🔗 Endpoints principales

- POST /auth/login
- GET /eventos
- POST /eventos
- PUT /eventos/:id
- DELETE /eventos/:id

## 🚀 Instalación y ejecución

- **Backend**

`cd backend + frontend
npm install
npm run dev`

- **Frontend Web**

`cd frontend
npm install
npm start`

- **App Móvil**

`cd apk-movil
npm install
npx expo start`

## 📦 Control de versiones

El proyecto utiliza Git como sistema de control de versiones, permitiendo la gestión de cambios y colaboración en el desarrollo.

## 🧪 Pruebas

Se realizaron pruebas funcionales para verificar:

- Autenticación de usuarios
- Consumo de APIs
- Operaciones CRUD
- Navegación entre módulos

## 📌 Consideraciones

- El backend debe estar en ejecución para el funcionamiento del sistema
- Se recomienda el uso de la misma red local para pruebas móviles
- Configurar correctamente las variables de entorno

## 👨‍💻 Autor

**Ángel David García Jiménez**