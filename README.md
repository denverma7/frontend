# MERN To-Do App

A simple and modern To-Do application built with the MERN stack (MongoDB, Express, React, Node.js). This app allows users to register, log in, and manage their personal tasks with status and priority features.

## Features

- User registration and authentication (JWT)
- Add, update, and delete tasks
- Mark tasks as completed or pending
- Set task priority (low, medium, high)
- Filter tasks by status and priority
- Responsive UI with Tailwind CSS

## Folder Structure

```
todo_app/
  backend/    # Node.js + Express + MongoDB API
  frontend/   # React client
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

---

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/todo_app.git
cd todo_app
```

---

### 2. Setup the Backend

```sh
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```
MONGO_URI=mongodb://localhost:27017/tododb
PORT=8080
```

Start the backend server:

```sh
npm start
```

---

### 3. Setup the Frontend

```sh
cd ../frontend
npm install
```

Start the frontend development server:

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## API Endpoints

- `POST /register` — Register a new user
- `POST /login` — Login and receive JWT token
- `GET /tasks` — Get all tasks for the logged-in user
- `POST /tasks` — Add a new task
- `PATCH /tasks/:id/status` — Update task status
- `PATCH /tasks/:id/priority` — Update task priority
- `DELETE /tasks/:id` — Delete a task

All `/tasks` endpoints require an `Authorization: Bearer <token>` header.

---

## Environment Variables

Backend `.env` example:

```
MONGO_URI=mongodb://localhost:27017/tododb
PORT=8080
```

---

## Technologies Used

- **Frontend:** React, React Router, Tailwind CSS, Vite
- **Backend:** Node.js, Express, Mongoose, JWT, bcryptjs
- **Database:** MongoDB

---

## Troubleshooting

- **MongoDB connection errors:**  
  Ensure your `MONGO_URI` is correct and MongoDB is running.

- **CORS issues:**  
  The backend is configured to allow all origins for development.

- **Vite HMR/WebSocket errors:**  
  Restart the frontend dev server. Check firewall and port 5173.

---

## License

MIT

---

## Author

- Denver Anthony ((https://github.com/Denverma7)
