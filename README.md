# Sistema de Gestión de Eventos con Certificados

API desarrollada con Node.js, Express y MongoDB para la getión de eventos, ponentes, actividades e inscripciones.
El sistema permite registrar usuarios, crear eventos, inscribir participantes y generar certificados de asistencia en PDF con código de verificación y QR.

---

# Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- PDFKit
- QRCode
- Postman (para pruebas de Api)

---

# Instalación del proyecto

1. Clonar el repositorio

git clone https://github.com/AngelGarcia18-cmd/sistema-reservas-api.git

2. Entrar a la carpeta del proyecto

cd backend

3. Instalar dependencias

npm install

4. Crear archivo `.env`

MONGO_URI=mongodb://127.0.0.1:27017/reservas_db
JWT_SECRET=esta_clave_es_la_mas_segura_que_existe
PORT=3000

5. Ejecutar el servidor

npm run dev

---

# Estructura del proyecto

config/ controllers/ middleware/ models/ routes/ package.json/ server.js

---

# Endpoints principales

## Autenticación

POST /api/auth/login
Permite iniciar sesión y obtener el token JWT

---

# Usuarios

POST /api/usuarios
Crear usuario

GET /api/usuarios
listar usuarios

GET /api/usuarios/:id
Obtener usuario por ID

PUT /api/usuarios/:id
Actualizar usuario

DELETE /api/usuarios/:id
Eliminar usuario

---

# Eventos

POST /api/eventos
Crear evento

GET /api/eventos
Listar eventos

GET /api/eventos/:id
Obtener evento por ID

PUT /api/eventos/:id
Actualizar evento

DELETE /api/eventos/:id
Eliminar evento

---

# Ponentes

POST /api/ponentes
Crear ponente

GET /api/ponentes
Listar ponentes

GET /api/ponentes/:id
Obtener ponente

PUT /api/ponentes/:id
Actualizar ponente

DELETE /api/ponentes/:id
Eliminar ponente

---

# Actividades

POST /api/actividades
Crear actividad

GET /api/actividades
Listar actividades

GET /api/actividades/:id
Obtener actividad

PUT /api/actividades/:id
Actualizar actividad

DELETE /api/actividades/:id
Eliminar actividad

---

# Inscripciones

POST /api/inscripciones
Crear inscripción

GET /api/inscripciones
Listar inscripciones

GET /api/inscripciones/:id
Obtener inscripción

PUT /api/inscripciones/:id
Actualizar inscripción

DELETE /api/inscripciones/:id
Eliminar inscripción

---

# Certificados

GET /api/inscripciones/:id/certificado

Genera automáticamente un certificado PDF de asistencia si el usuario asistió al evento.

El certificado incluye

- Nombre del participante
- Nombre del evento
- Firma del organizador
- Código de verificación
- Código QR

---

# Verificación de certificado

GET /api/certificados/verificar/:codigo

Permite verificar si un certificado es válido usando su código.

# Pruebas

Las pruebs de todos los endpoints fueron realizadas con **Postman**,
En la documentación del proyecto se incluyen las capturas de cada endpoint probado.

---

# Autor

Proyecto desarrollado por.


Ángel David García Jiménez

