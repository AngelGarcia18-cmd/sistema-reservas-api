# 📱 Aplicación Móvil de Gestión de Reservas

## 📝 Descripción

Esta aplicación móvil permite la gestión completa de eventos mediante una interfaz intuitiva y conectada a una API REST.
La app está construida con **React Native (Expo)** y consume un backend desarollado previamente, implementando autenticación mediante tokens JWT.

---

## 🎯 Objetivo

Permitir a los uusarios autenticados gestionar eventos desde dispositivos móviles, incluyendo la creación, edición, eliminarión y visualización de los mismos.

---

## ⚙️ Tecnologías utilizadas

- React Native
- Expo
- JavaScript
- AsyncStorage (manejo de sesión)
- API REST (Node.js + Express)
- MongoDB

---

## 🔐 Autenticación

La aplicación implementa un sistema de autenticación basado en tokens JWT:

- Inicio de sesión con email y contraseña
- Almacenamiento del token en el dispositivo
- Envío del token en cada petición protegida
- Control de acceso según roles (admin / participante)

---

## 📱 Funcionalidades principales

---

## 🔑 Login

Permite al usuario autenticarse para acceder a la aplicación.

---

## 📋 Listado de Eventos

- Visualización de eventos en formato de tarjetas
- Información básica: nombre, lugar y fecha
- Opción de expandir detalles adicionales
- Animaciones suaves para mejorar la experiencia del usuario

---

## ➕ Crear evento

- Registro de nuevos eventos
- Validación de campos obligatorios
- Envío de datos al backend mediante POST

---

## ✏️ Editar evento

- Modificación de eventos existentes
- Precarga de información en el formulario
- Actualización mediante PUT

---

## 🗑️ Eliminar evento

- Eliminación de eventos con confirmación previa
- Comunicación con la API mediante DELETE

---

## 🚪 Cerrar sesión

- Eliminación del token almacenado
- Redirección al login
- Protección de rutas

---

## 🔗 Conexión con API

La aplicación consume los siguientes endpoints:

- POST /auth/login
- GET /eventos
- POST /eventos
- PUT /eventos/:id
- DELETE /eventos/:id

Todas las rutas protegidas requieren el envío del token en el header:

Authorization: Bearer

---

## 🎨 Interfaz de usuario

La aplicación cuenta con:

- Diseño basado en tarjetas (cards)
- Formularios estilizados
- Navegación entre pantallas
- Animaciones para expanción del contenido
- Experiencia de usuario optimizada para dispositivos móviles

---

## 🚀 Ejecución del proyecto

1. Instalar dependencias:

`npm install`

2. Iniciar Expo:

`npx expo start`

3. Ejecutar en dispositivo físico o emulador mediante Expo Go

---

## 📦 Generación del APK

El APK fue generado utilizando Expo para su instalación en dispositivos Android.

---

## 📌 Notas adicionales

- La aplicación requiere que el bakend esté en ejecucuón
- Es necesario configurar correctamente la URL del servidor en el archivo de servicios
- Se recomienda usar la misma red local para pruebas en dispositivos físicos

---

## 👨‍💻 Autor

Proyecto desarrollado por: **Ángel David García Jiménez**