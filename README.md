# 🌴 Vacation Management App

A full-stack web application built with React, TypeScript, Node.js, and MySQL.
Users can explore and follow vacation packages, while administrators manage vacations and monitor analytics in real time.

## 🚀 Live Demo

🔗 [Live Website](https://vacations-three.vercel.app)

> 🕒 *Note:* The backend is hosted on Render's free tier, which may cause a delay of a few seconds on the first request after inactivity.

## 🔑 Admin Access

* **Username:** `ronaldo_nazario`
* **Password:** `Aa11!!Bb`

_Use these credentials to log in as an administrator and explore management features._

⚡ Note: The first login or data fetch may take a few seconds, due to free-tier hosting (Render & Aiven) which may introduce a short delay after periods of inactivity.

## 🧭 Features

### 👥 Users

* Easily browse all available vacations with rich details (images, prices, dates, and descriptions).
* Search vacations by destination or description.
* Sort vacations by date, price, or follower count.
* Follow or unfollow any vacation package to keep track of your favorites.
* View real-time follower counts for each vacation (auto-updated).
* Seamlessly navigate through vacations with fast, responsive pagination.
* Secure authentication (register, login, logout).
* Automatic session expiration handling.

### 🛠️ Administrators

* Add new vacations with image uploads to Cloudinary.
* Edit existing vacation details.
* Delete vacations.
* Broadcast real-time updates to all users via WebSockets.
* Access advanced tools for sorting, filtering, and pagination.
* View vacation analytics and follower charts. 


## 🛠️ Tech Stack

### Frontend

- React (with TypeScript)
- React Router
- Redux
- Axios
- React Hook Form
- Bootstrap
- react-bootstrap
- react-loading-skeleton
- Chart.js
- react-chartjs-2
- Socket.IO Client
- Notyf

### Backend

- Node.js (with TypeScript)
- Express
- MySQL2 (hosted on Aiven)
- Cloudinary
- express-fileupload
- multer
- multer-storage-cloudinary
- jsonwebtoken (JWT)
- joi
- joi-password
- joi-password-complexity
- cors
- dotenv
- socket.io
- uuid

### Infrastructure & DevOps

- Vercel (frontend hosting)
- Render (backend hosting)
- Aiven (managed MySQL database)
- Cloudinary (image CDN & uploads)
- GitHub (version control)
- Environment Variables



## 📸 Screenshot

![Vacation Demo](https://api.pikwy.com/web/6857deca0f4bd449d4043967.jpg)

## 📁 Project Structure

```
📦 backend
┣ 📂2-utils
┃ ┣ 📜config.ts → Environment-based configurations
┃ ┣ 📜dal.ts → Database access layer
┃ ┣ 📜cloudinary.ts → Cloudinary setup
┣ 📂4-models
┃ ┗ 📜vacation-model.ts → Vacation data models and validations
┣ 📂6-controllers
┃ ┗ 📜vacations-controller.ts → Express routes
┣ 📂5-logic
┃ ┗ 📜vacations-logic.ts → Core business logic

📦 frontend
┣ 📂Components
┃ ┣ 📂VacationArea
┃ ┃ ┗ 📜VacationCard.tsx → Vacation display component
┃ ┣ 📂HomeArea
┃ ┃ ┗ 📜Home.tsx → Main homepage for vacations
┃ ┗ 📂SharedArea
┃ ┗ 📜Pagination.tsx → Pagination component
┣ 📜App.tsx
┣ 📜index.tsx

<sub>*Note: Only main folders and files are shown for clarity.*</sub>
```

## 🚀 What This Project Demonstrates

This project showcases a robust full-stack application, including:

- **Clean separation of concerns:** Clear structure for models, logic, controllers, and services.
- **Authentication & role-based access control:** Secure login, registration, and admin panel.
- **File uploads & external integrations:** Vacation images are managed via Cloudinary.
- **Relational database management:** Uses MySQL with proper validations.
- **Real-time updates:** WebSockets ensure all users see changes instantly, without refreshing.
- **Modern, responsive UI:** Designed with accessibility and usability in mind.

All features work together to deliver a seamless experience from authentication to data updates and deployment.


---
