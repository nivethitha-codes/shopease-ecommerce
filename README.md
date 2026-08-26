# 🛒 ShopEase — Full-Stack E-Commerce Application

A full-stack e-commerce platform with product management, shopping cart, checkout, order processing, and an admin dashboard — built on the MERN stack with JWT authentication and Redux Toolkit state management.

🔗 **Live Demo:** https://shopease-app-4l4e.onrender.com
🔗 **API:** https://shopease-3r77.onrender.com
📦 **Repository:** https://github.com/nivethitha-codes/shopease-ecommerce

---

## ✨ Features

- **Product catalog** — browse, filter, and view product details
- **Shopping cart** — add/remove items, persistent per-account cart state
- **Secure authentication** — JWT-based auth with bcrypt password hashing
- **Checkout & order processing** — full order lifecycle from cart to confirmation
- **Admin dashboard** — manage products and view/manage orders
- **Role-based access control** — distinct admin vs. customer permissions
- **REST API** — CRUD operations for products and orders

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Redux Toolkit |
| Backend | Node.js, Express.js |
| Database | MongoDB (Atlas) |
| Auth | JWT, bcrypt |
| Deployment | Render (separate frontend + backend services) |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB Atlas connection string

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
PORT=5000
MONGO_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<your-secret-key>
NODE_ENV=development


Run the backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📁 Project Structure
```text
shopease-ecommerce/
├── client/ # React frontend (Vite)
│ └── src/
│ ├── pages/
│ ├── components/
│ └── redux/
└── server/ # Node/Express backend
├── models/
├── routes/
└── utils/
```

## 🌐 Deployment

- **Backend** deployed as a Render Web Service, connected to MongoDB Atlas
- **Frontend** deployed as a Render Static Site, built with Vite and pointed at the backend API

## 👤 Author

**P. Nivethitha**
[LinkedIn](https://linkedin.com/in/nivethitha-tech) · [GitHub](https://github.com/nivethitha-codes) · 
