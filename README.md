# 🚀 Tello – MERN Stack Real-Time Chat Application

Tello is a **Full-stack MERN chat application** designed for real-time communication with **secure authentication**, **real-time reactions**, and a **scalable backend architecture**.  
The project demonstrates modern best practices in **frontend and backend development, state management, and deployment**.

---

## 🧩 Tech Stack

### Frontend

- **React (Vite)** – Fast and modern frontend framework
- **Tailwind CSS** – Utility-first UI styling
- **Zustand** – Lightweight state management
- **Axios** – HTTP client for API requests
- **React Router** – Client-side routing
- **Framer Motion** – Smooth UI animations

### Backend

- **Node.js + Express.js** – RESTful API & server
- **MongoDB + Mongoose** – Database & ODM
- **JWT Authentication** (HttpOnly Cookies) – Secure login & session
- **Socket.IO** – Real-time messaging and reactions
- **Cloudinary** – Image upload & storage
- **Resend** – Email service for verification/onboarding
- **Arcjet** – Security & rate limiting middleware

### Database

- **MongoDB Atlas** – Cloud database

---

## ✨ Features

- 🔐 Secure authentication with JWT & HttpOnly Cookies
- 👤 User registration and login
- 💬 Real-time chat using Socket.IO
- 🎭 Real-time reactions on messages
- 🖼 Profile image upload with Cloudinary
- 📧 Email notifications (verification / onboarding)
- 🛡 Rate limiting and enhanced security with Arcjet
- 📱 Fully responsive UI (mobile & desktop)
- ⚡ Optimized API and state management

---

## 📂 Project Structure

```
Tello/
├── Backend/              # Backend (Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── server.js
│
├── Frontend/             # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

```

---

## 🛠 Installation & Setup (Local Development)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/tello.git
cd tello
```

### 2️⃣ Backend setup

```bash
cd Backend
npm install
npm run dev

```

### 3️⃣ Frontend setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

### Deployment

Frontend: Vercel
Backend: Railway (supports real-time Socket.IO communication)
Database: MongoDB Atlas

```bash
cd Frontend && npm run build
```

5. Output Directory:

```
Frontend/dist
```

6. Deploy 🎉

---

## 📸 Screenshots

> ![Authentication 1](./Frontend/public/Auth1.png) > ![Authentication 2](./Frontend/public/Auth2.png)

---

## 🧠 What I Learned

- Building scalable MERN applications
- Implementing real-time chat and reactions using Socket.IO
- Secure authentication using JWT & cookies
- Deploying full-stack apps: Railway backend + Vercel frontend
- Structuring real‑world projects
- Handling production‑ready environment variables

---

## ⭐ Support

If you like this project, please give it a **star ⭐** on GitHub — it really helps!
