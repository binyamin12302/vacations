
---

# 🌴 Vacation Management App

A full-stack web application enabling users to explore and follow vacation packages, while administrators can manage vacation data in real-time.

## 🚀 Live Demo

🔗 [Live Website](https://vacations-three.vercel.app)

> 🕒 *Note:* The backend is hosted on Render's free tier, which may cause a delay of a few seconds on the first request after inactivity.

## 🔑 Admin Access

* **Username:** `ronaldo_nazario`
* **Password:** `Aa11!!Bb`

## 🧭 Features

### 👥 Users

* Browse available vacations with details including images, prices, dates, and descriptions.
* Follow or unfollow vacations.
* View real-time follower counts.
* Navigate through vacations using pagination.([Medium][1], [Medium][2])

### 🛠️ Administrators

* Add new vacations with image uploads to Cloudinary.
* Edit existing vacation details.
* Delete vacations.
* Broadcast real-time updates to all users via WebSockets.([DEV Community][3], [Stack Overflow][4])

## 🛠️ Tech Stack

### Frontend

* React with TypeScript
* React Router
* Axios
* React Hook Form
* Bootstrap([Hacker News][5], [WIRED][6], [Medium][2])

### Backend

* Node.js with Express and TypeScript
* MySQL (hosted on Railway)
* Cloudinary for image storage
* express-fileupload
* WebSockets with Socket.IO([FreeCodeCamp][7])

## 📸 Screenshot

![Vacation Demo](https://user-images.githubusercontent.com/57687331/200180588-892d8640-4e83-41f8-8069-f1be4e62f491.png)

## 📁 Project Structure

```
📦 backend
 ┣ 📂2-utils
 ┃ ┣ 📜config.ts            → Environment-based configurations
 ┃ ┣ 📜dal.ts               → Database access layer
 ┃ ┣ 📜cloudinary.ts        → Cloudinary setup
 ┣ 📂4-models
 ┃ ┗ 📜vacation-model.ts    → Vacation data models and validations
 ┣ 📂6-controllers
 ┃ ┗ 📜vacations-controller.ts → Express routes
 ┣ 📂5-logic
 ┃ ┗ 📜vacations-logic.ts   → Core business logic

📦 frontend
 ┣ 📂Components
 ┃ ┗ 📂VacationArea
 ┃   ┗ 📜VacationCard.tsx    → Vacation display component
 ┣ 📜App.tsx
 ┣ 📜index.tsx
```

## 💾 Local Installation (Optional)

While the application is fully deployed and functional online, if you'd like to run it locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/binyamin12302/vacations
   ```

2. **Frontend Setup:**

   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Backend Setup:**

   * Create a `.env` file with your MySQL and Cloudinary credentials.
   * Then run:([Reddit][8])

     ```bash
     cd backend
     npm install
     npm run build
     npm start
     ```

The frontend will be available at `http://localhost:3000`, and the backend at `http://localhost:3001`.

## 🚀 What This Project Demonstrates

* This project demonstrates:

  * Clean separation of concerns.
  * Authentication and role-based access control.
  * File uploads and integration with external services (Cloudinary).
  * Relational database management with MySQL.
  * Real-time updates using WebSockets.
  * Responsive and user-friendly UI design.

* Real-time updates are implemented using WebSockets to reflect changes instantly without requiring page refreshes.

---
