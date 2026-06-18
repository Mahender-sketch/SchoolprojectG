# SchoolprojectG
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
<!--  -->
# Kumaun University Past Papers Hub

A web platform where students can upload, preview, download, and manage previous year question papers.

## Features

- Upload PDF question papers
- Preview papers before downloading
- Download papers
- Dynamic filters (Year, Course, Semester, Exam Type)
- Admin Login
- Admin-only paper deletion
- MongoDB database integration
- Responsive UI built with React and Tailwind CSS

---

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer

---

## Installation

### Clone Repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

### Frontend Setup

```bash
npm install
npm run dev
```

### Backend Setup

Navigate to backend folder:

```bash
cd backend
npm install
npm run dev
```

---

## Environment Variables

Create a file:

```text
backend/.env
```

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

ADMIN_PASSWORD=your_admin_password
```

---

## Folder Structure

```text
project/
│
├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── backend/
│   ├── uploads/
│   ├── .env
│   └── server.js
│
└── README.md
```

---

## Admin Features

Only administrators can:

- Log in
- Delete uploaded papers

Admin credentials are stored securely in:

```text
backend/.env
```

and are not included in GitHub.

---

## Future Improvements

- Cloud PDF Storage
- User Authentication
- Search Functionality
- Paper Approval System
- Dark Mode
- Likes stored in database
- User Profiles

---

## Author

Mahender Singh Gaira

### Project

Kumaun University Past Papers Hub

© 2026 All Rights Reserved