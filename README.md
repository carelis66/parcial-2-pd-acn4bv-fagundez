#  **README – Élite Animal Spa**

Aplicación web para gestión de turnos de un centro de estética canina y felina.
Incluye **3 roles con permisos diferentes**: Cliente, Recepción y Administrador.
El backend está desarrollado en **Node.js + Express**, con persistencia en **archivos JSON**.
El frontend está construido con **React + Vite**.

---

#  **1. Cómo ejecutar el proyecto**

##  **Requisitos previos**

* Node.js 18+
* NPM 8+
* Git (opcional)
* Navegador moderno

---

#  **2. Estructura del proyecto**

```
SPA/
│
├── backend/
│   ├── index.js
│   ├── controllers/
│   ├── routes/
│   ├── data/
│   │    ├── usuarios.json
│   │    ├── mascotas.json
│   │    └── turnos.json
│   └── node_modules/
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── styles/
    │   └── App.jsx
    └── node_modules/

---

#  **3. Cómo ejecutar el BACKEND**

Desde la carpeta `/backend`:

```bash
npm install
node index.js
```

Se ve:

```
Servidor corriendo en http://localhost:3001
```

---

#  **4. Cómo ejecutar el FRONTEND**

Desde la carpeta `/frontend`:

```bash
npm install
npm run dev
```

Verás algo como:

```
http://localhost:5173
```

Entrás ahí para usar la app.

---

#  **5. Usuarios de prueba**

El archivo `usuarios.json` ya incluye:
llobo@gmail.com -> 1234
clopez@gmail.com ->1234

###  **ADMIN**

```
email: admin@spa.com
password: admin123
rol: admin
```

###  **RECEPCIÓN**

```
email: recep@spa.com
password: recep123
rol: recepcion
```

###  **CLIENTE**

```
email: cliente@spa.com
password: cliente123
rol: cliente
```

---

#  **6. Roles y Permisos**

##  **CLIENTE**

* Registrar cuenta
* Agregar mascotas
* Pedir turnos
* Ver y eliminar turnos propios
* No puede editar turnos ni ver otros clientes

---

##  **RECEPCIÓN**

* Ver todos los turnos
* Filtrar turnos
* Cambiar estado (pendiente → en proceso → listo → cancelado)
* Ver datos completos de la mascota
* NO puede crear usuarios
* NO puede borrar turnos ajenos

---

##  **ADMIN**

* CRUD completo usuarios (cliente / recepción)
* Crear / editar / eliminar
* Ver lista de usuarios
* No puede eliminarse a sí mismo
* No puede cambiar su propio rol
  -Cuida la seguridad básica del sistema

---

#  **7. Cómo probar la aplicación paso a paso**

## **A) Flujo de Cliente**

1. Entrar a `/register`
2. Crear cuenta
3. Iniciar sesión → redirige a `/cliente`
4. Agregar mascota
5. Ir a “Pedir turno”
6. Elegir fecha, hora, servicio y mascota
7. Confirmar turno
8. Verlo en “Mis turnos”
9. Opcional: Cancelarlo

---

## **B) Flujo de Recepción**

1. Iniciar sesión como **recepcion**
2. Entrar en `/recepcion`
3. Ver turnos del día
4. Cambiar estado de un turno
5. Buscar turnos por nombre, email, mascota o servicio
6. Ver detalles de cada mascota

---

## **C) Flujo de Administrador**

1. Iniciar sesión como **admin**
2. Entrar en `/admin`
3. Ver la tabla de todos los usuarios
4. Crear un nuevo usuario
5. Editar (nombre, email, rol)
6. Eliminar usuarios (excepto su propia cuenta)
7. Ver validación al intentar:

   * cambiar muy rol
   * borrarse a sí mismo

---

#  **8. Endpoints principales (Backend)**

## Autenticación

`POST /api/login`
`POST /api/register`

## Turnos

`GET /api/turnos`
`POST /api/turnos`
`PATCH /api/turnos/:id`
`DELETE /api/turnos/:id`

##  Mascotas

`GET /mascotas/mascotas`
`POST /mascotas/mascotas`
`DELETE /mascotas/:id`

## Usuarios (solo admin)

`GET /api/usuarios`
`POST /api/usuarios`
`PUT /api/usuarios/:id`
`DELETE /api/usuarios/:id`

---

# **9. Seguridad implementada**

##  Backend

* Emails únicos para usuarios
* Validación de fecha futura
* Validación de turnos duplicados
* Rol admin protegido
* Admin no puede eliminarse a sí mismo
* Admin no puede cambiar su propio rol
* MascotaId siempre se verifica contra el archivo JSON

##  Frontend

* Rutas protegidas según rol
* Redirección automática:

  * Cliente → /cliente
  * Recepción → /recepcion
  * Admin → /admin
* Si alguien intenta `/admin` sin ser admin → va a /login

---

#  **10. Diseño**

* Colores negro + dorado
* Responsive
* Navbar con logo y categorías
* Tarjetas oscuras con bordes suaves
* Formularios claros y consistentes



