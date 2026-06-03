# Bookstore Application

A full-stack, premium bookstore web application built using the MERN stack (MongoDB, Express, React, Node.js). The application offers a polished dark theme UI, comprehensive book inventory management, customized cart and order processing, and administrative dashboards.

---
## 🔗 Live Demo (Render Fallback)

Due to billing/trial limitations on the Vercel Team account, the application can be deployed for free on **Render**:

* **Live Frontend App (Render):** [https://bookstore-frontend-app.onrender.com](https://bookstore-frontend-app.onrender.com)
* **Live Backend API (Render):** [https://bookstore-backend-api.onrender.com](https://bookstore-backend-api.onrender.com)

---
## 🚀 Key Features

* **Vibrant Dark Theme UI**: Beautiful, interactive modern dark user interface.
* **Book Explorers**: Categorized search, detailed book specs, pricing, language tags, and dynamic favorite toggles.
* **Interactive Cart & Checkout**: Add, remove, and manage items in your cart with a fully-functional order checkout system.
* **OTP Password Reset**: Inline, secure 6-digit verification code workflow on the login page with a developer sandbox helper banner.
* **Contact & Inquiries**: Reliable MongoDB persistence for customer feedback with a secure administrative dashboard.
* **Admin Dashboard**: Secure management views for adding books, tracking all user orders, updating delivery statuses, and reviewing/filtering incoming messages.

---

## 🛠️ Tech Stack

* **Frontend**: React (Vite), Redux Toolkit (State Management), TailwindCSS (Styling), Axios (API Requests), React Router DOM (Routing), React Icons.
* **Backend**: Node.js, Express.js, MongoDB (Mongoose ODM), JWT (Authentication), Bcrypt (Password Hashing), Nodemailer (Emails/OTPs).

---

## 📁 Project Structure

```text
Bookstore/
├── backend/                  # Express REST API Server
│   ├── controllers/          # Request handlers & logic (users, admins)
│   ├── dbconnection/         # MongoDB database setup
│   ├── middlewares/          # JWT auth & role validation guards
│   ├── models/               # Mongoose collection schemas (books, orders, users, contacts)
│   ├── routes/               # API endpoints (userroutes, adminroutes)
│   ├── server.js             # Main server entrypoint
│   └── .env                  # Environment configurations
│
└── client/                   # Vite React Frontend App
    ├── src/
    │   ├── components/       # Reusable views (Navbar, Footer, Bookcards)
    │   ├── pages/            # Page controllers (Login, Contact, Admin Messages)
    │   ├── profile/          # Profile dashboard features (Favourites, Order History)
    │   ├── store/            # Redux auth slices
    │   ├── App.jsx           # Routing & global auth effects
    │   └── main.jsx          # React app mount
```

---

## ⚙️ Quick Start

Follow these steps to set up and run the Bookstore application locally.

### Prerequisites

* [Node.js](https://nodejs.org/) installed (v16+ recommended).
* A running [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster or local MongoDB instance.

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd Bookstore
   ```

2. **Configure the Backend**:
   Navigate to the `backend` folder, install the packages, and configure the `.env` file:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` root directory:
   ```env
   PORT=2000
   DB_URL=your_mongodb_connection_string
   ```

3. **Configure the Client**:
   Navigate to the `client` folder and install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

For a fully-functional setup, start both the backend server and frontend development server in separate terminals:

* **Start Backend Server**:
  ```bash
  cd backend
  npm start
  ```
  *(Server runs at `http://localhost:2000`)*

* **Start Client Development Server**:
  ```bash
  cd client
  npm run dev
  ```
  *(Client runs at `http://localhost:5173` or similar Vite local host)*

---

## 🔒 Security & Roles

The Bookstore uses JWT tokens for secure authentication. User privileges are checked against two primary roles:

| Role | Permissions |
| :--- | :--- |
| **User** | Browse catalog, toggle favorites, add to cart, check out, track order history, modify profile settings. |
| **Admin** | Add/Update/Delete books in catalog, monitor all users' orders, change order delivery status, review/delete contact inquiries. |
