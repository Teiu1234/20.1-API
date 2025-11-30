# Mini API de Tareas con Login (NodeJS + Express + MariaDB)

## 🚀 Descripción
Este proyecto es una API simple que permite:
- Registrar usuarios
- Iniciar sesión
- Generar un token JWT
- Crear, listar y eliminar tareas
- Proteger endpoints mediante autenticación
- Guardar usuarios y tareas en MariaDB

Ideal para aprender NodeJS, Express, JWT y bases de datos SQL.

---

## 📦 Instalación

### 1️⃣ Instalar dependencias
```
npm install
```

### 2️⃣ Configurar la base de datos (MariaDB)
Ejecutar en tu consola SQL:

```sql
CREATE DATABASE tareas_db;
USE tareas_db;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(200)
);

CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  title VARCHAR(200),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## ▶️ Ejecutar el servidor
```
npm run dev
```

Servidor en:
```
http://localhost:3000
```

---

## 🔐 Endpoints

### Registrar usuario
POST `/auth/register`
```json
{
  "email": "test@test.com",
  "password": "1234"
}
```

### Login
POST `/auth/login`

Devuelve:
```json
{
  "message": "Login exitoso",
  "token": "xxxxxx"
}
```

### Obtener tareas (requiere token)
GET `/tasks`
Header:
```
access-token: TU_TOKEN
```

### Crear tarea
POST `/tasks`
```json
{ "title": "Nueva tarea" }
```

### Eliminar tarea
DELETE `/tasks/:id`

---

## 📚 Tecnologías usadas
- NodeJS
- Express
- MariaDB/MySQL
- JWT
- Bcryptjs

---

## ✨ Autor
Proyecto generado automáticamente para Denise :)
