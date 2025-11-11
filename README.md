# TaskVault – RBAC Task & User Management API

## Overview:

A secure, scalable backend system built with Node.js, Express, and MongoDB featuring authentication, role-based access control (RBAC), and CRUD operations for tasks and users.
This project was built as part of a backend assignment to demonstrate API design, authentication, RBAC, and scalability practices.

## 📌 Features

🔐 Authentication & Authorization

- User registration & login with JWT (JSON Web Tokens)

- Password hashing using bcrypt

- Role-Based Access Control (RBAC):

  - User → manage their own tasks

  - Admin → full access to all users & all tasks

## 📁 Task Management

- CRUD operations for tasks

- Ownership enforcement (users can only manage their own tasks)

- Admins can:

  - View all tasks

  - Create, update, delete tasks for any user

## 👤 User Management (Admin Only)

- Admin can:

  - Get all users

  - Get individual user

  - Delete user

## Setup Instructions:

### 1️. Clone the repository

```bash
git clone https://github.com/Venkata-sampath/taskvault-app.git
cd taskvault-backend
```

### 2️. Install dependencies

```bash
npm install
```

### 3️. Add environment variables

Create a .env file in the root folder and include:

```env
PORT = your_port_number
MONGO_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret_key
```

### 4️. Run the server

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
npm start
```

## 📝 API Documentation

Postman Documentation URL:
[Visit API Documentation](https://documenter.getpostman.com/view/49886355/2sB3WsQLF2 "API DOcumentation")

Postman Collection JSON is available inside `/docs`.

## Tech Stack:

Node.js

Express.js

MongoDB + Mongoose

JWT for Authentication

dotenv for configuration

## Notes:

1. Authentication uses JWT tokens sent in headers.

2. All protected routes require a valid token.

3. Frontend development is in progress and will be added soon.
