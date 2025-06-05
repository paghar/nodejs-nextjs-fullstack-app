## 🛒 Node.js + Next.js Tutorial Project
This is a friendly full-stack project to help me learn and practice building modern web applications using **Node.js**, **Express**, and **Next.js**. It features a product catalog, shopping cart functionality, user authentication, and an admin panel for managing products.

The **backend** follows the **MVC (Model-View-Controller)** architectural pattern and is built with **Node.js**, **Express**, and **TypeScript**.  
The **frontend** is a modern **React** application built with **Next.js**, **TypeScript**, **React Hook Form**, and **Tailwind CSS**.

### 📁 Project Structure
```bash
/project-root
├── /frontend   # Built with Next.js, React, TypeScript, Tailwind CSS, and React Hook Form
└── /backend    # Built with Node.js, Express, TypeScript, and PostgreSQL
```
### 🚀 Features
#### 🖥️ Frontend (Next.js)
-   📦 Product listing with responsive layout
-   🛒 Shopping cart modal and item management
-   👤 User panel with login/register functionality    
-   🔐 Admin dashboard with access control    
-   🔗 Connects to backend API using Axios    
-   💅 Styled using Tailwind CSS for a modern look

#### 🔧 Backend (Node.js + Express)
-   ✅ RESTful API endpoints for products, users, and cart actions    
-   🔐 User authentication using sessions and CSRF protection    
-   🧑‍💼 Admin-only access to create, update, and delete products    
-   📦 PostgreSQL database with Sequelize ORM    
-   🗃️ Organized MVC architecture for maintainability    
-   🛡️ Input validation and basic error handling

### 🛠️ Tech Stack
 **Frontend:**
       Next.js,React ,TypeScript ,Tailwind CSS ,React Hook Form  ,Axios
**Backend:**
      Node.js ,Express ,TypeScript ,Sequelize ,PostgreSQL ,Express-Validator ,Express-Session

### 📦 Getting Started
#### 1. Clone the repo:
```bash
https://github.com/paghar/nodejs-nextjs-fullstack-app.git
```
#### 2.Install dependencies:
```bash
cd backend
npm install

cd ../frontend
npm install
```

#### 3. Set up environment variables:
- Create `.env` files in both `backend/`  ....

#### 4. Set up environment variables:
- Start backend:
```bash
cd backend
npm run dev
```
- Start frontend:
```bash
cd frontend
npm run dev
```
#### 🎯 Goals of This Project
-   Learn full-stack development using modern tools    
-   Understand API integration with the frontend    
-   Practice building authentication and protected routes    
-   Explore best practices with TypeScript and folder structure