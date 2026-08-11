# User Management API — Assignment 3

> A complete RESTful CRUD API built with **Express.js** and **[Velociradix](https://github.com/Moaaz-i/velociradix)** — the ultra-fast C++-powered Node.js web engine. Data is persisted using the native `fs` module with a JSON file — no databases or arrays.

---

## ✨ Features

- ✅ 7 fully implemented CRUD endpoints
- 💾 Persistent storage via `data/users.json` using `fs/promises`
- 🔒 Unique email validation on create & update
- ⚡ Dual server support: **Express** and **Velociradix**
- 📄 Auto-generated interactive Postman documentation UI
- 📦 Downloadable Postman Collection JSON
- 🏗️ Clean MVC architecture (controllers / routes / services / docs)

---

## 📁 Project Structure

```
User-Management-API/
├── data/
│   └── users.json                  # Persistent JSON storage
├── src/
│   ├── controllers/
│   │   └── userController.js       # Business logic for all 7 endpoints
│   ├── routes/
│   │   ├── expressRoutes.js        # Express route definitions
│   │   └── velociradixRoutes.js    # Velociradix route definitions
│   ├── services/
│   │   └── userService.js          # readUsers & writeUsers (fs/promises)
│   └── docs/
│       └── apiDocs.js              # Postman metadata & response examples
├── index.js                        # Express entry point
├── velociradix.js                  # Velociradix entry point
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+

### Installation

```bash
git clone https://github.com/Moaaz-i/User-Management-API.git
cd User-Management-API
npm install
```

### Run the server

```bash
# Express
npm start           # Production
npm run dev         # Watch mode (auto-restart)

# Velociradix
npm run start:velociradix   # Production
npm run dev:velociradix     # Watch mode (auto-restart)
```

Both servers run on **`http://localhost:3000`**.

---

## 📋 API Endpoints

All responses follow this unified structure:

```json
{
  "status": "success" | "error",
  "message": "...",
  "data": { ... }
}
```

### 1. Add a New User
```http
POST /user
```
**Body:**
```json
{
  "id": 1,
  "name": "Alice",
  "age": 25,
  "email": "alice@example.com"
}
```
| Status | Description |
|--------|-------------|
| `201 Created` | User added successfully |
| `400 Bad Request` | Email already exists or missing required fields |

---

### 2. Update a User by ID
```http
PATCH /user/:id
```
**Body** *(any combination of fields)*:
```json
{
  "name": "Alice Updated",
  "age": 26,
  "email": "new@example.com"
}
```
| Status | Description |
|--------|-------------|
| `200 OK` | User updated successfully |
| `400 Bad Request` | New email already exists |
| `404 Not Found` | User ID not found |

---

### 3. Delete a User
```http
DELETE /user/:id
DELETE /user
```
ID can be passed as a **URL param** or in the **request body**:
```json
{ "id": 1 }
```
| Status | Description |
|--------|-------------|
| `200 OK` | User deleted successfully |
| `400 Bad Request` | Missing user ID |
| `404 Not Found` | User not found |

---

### 4. Get User by Name
```http
GET /user/getByName?name=Alice
```
| Status | Description |
|--------|-------------|
| `200 OK` | Returns matching user(s) |
| `400 Bad Request` | Missing `name` query parameter |
| `404 Not Found` | No user found with that name |

---

### 5. Get All Users
```http
GET /user
```
| Status | Description |
|--------|-------------|
| `200 OK` | Returns array of all users |

---

### 6. Filter Users by Minimum Age
```http
GET /user/filter?minAge=20
```
| Status | Description |
|--------|-------------|
| `200 OK` | Returns users with age ≥ minAge |
| `400 Bad Request` | Invalid or missing `minAge` parameter |

---

### 7. Get User by ID
```http
GET /user/:id
```
| Status | Description |
|--------|-------------|
| `200 OK` | Returns the user |
| `404 Not Found` | User not found |

---

## 📄 Auto-Generated Postman Documentation

When running the **Velociradix** server, the following endpoints are available:

| URL | Description |
|-----|-------------|
| `http://localhost:3000/postman-docs` | Interactive documentation UI |
| `http://localhost:3000/postman.json` | Downloadable Postman Collection JSON |

Import `postman.json` directly into Postman Desktop or Postman Web to get all endpoints pre-configured with example request bodies and response examples.

---

## 🏗️ Architecture

This project follows a clean **MVC** pattern:

- **`src/services/userService.js`** — Low-level `readUsers()` / `writeUsers()` I/O using `fs/promises`
- **`src/controllers/userController.js`** — Pure business logic functions, framework-agnostic
- **`src/routes/`** — Thin routing layer that wires controllers to HTTP verbs
- **`src/docs/apiDocs.js`** — Centralized Postman metadata (descriptions, body examples, response examples)

This separation allows the same controller logic to run on both **Express** and **Velociradix** without duplication.

---

## ⚡ Powered by Velociradix

[Velociradix](https://github.com/Moaaz-i/velociradix) is a native C++ HTTP engine for Node.js that provides sub-millisecond request handling with a familiar Express-like API — plus built-in automatic Postman documentation generation.

---

## 📜 License

ISC
