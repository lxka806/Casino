# 🎰 Virtual Casino

A modern full-stack virtual casino web application featuring casino-style games, user accounts, betting simulations, game history, profiles, and a leaderboard.

> **Note:** This project is a virtual/demo casino application for educational and development purposes. It does not involve real-money gambling.

---

## 📸 Preview

### Home / Landing Page

<!-- Replace the path below with your screenshot -->
![Casino Homepage](./screenshots/home.png)

### Dashboard

<!-- Replace the path below with your screenshot -->
![Dashboard](./screenshots/dashboard.png)

### Blackjack

<!-- Replace the path below with your screenshot -->
![Blackjack](./screenshots/blackjack.png)

### Slots

<!-- Replace the path below with your screenshot -->
![Slots](./screenshots/slots.png)

### Leaderboard

<!-- Replace the path below with your screenshot -->
![Leaderboard](./screenshots/leaderboard.png)

### Profile

<!-- Replace the path below with your screenshot -->
![Profile](./screenshots/profile.png)

---

## ✨ Features

- 🔐 User registration and authentication
- 👤 User profiles
- 🎰 Virtual casino games
- 🃏 Blackjack
- 🎰 Slots
- 💰 Virtual balance and betting system
- 📊 Game history
- 🏆 Global leaderboard
- 👑 Winner rankings
- 🔒 Protected API routes
- 🍪 Authentication using HTTP-only cookies
- 📱 Responsive design
- ⚡ Fast React frontend
- 🌐 REST API backend

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- CSS / Tailwind CSS
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

### Tools

- Git
- GitHub
- Postman
- MongoDB Atlas
- Render
- Netlify

---

## 🏗️ Project Structure

```text
casino-app/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── screenshots/
│   ├── home.png
│   ├── dashboard.png
│   ├── blackjack.png
│   ├── slots.png
│   ├── leaderboard.png
│   └── profile.png
│
└── README.md
```

---

## 🎮 Games

### Blackjack

Players can place a virtual bet and play a simplified blackjack game against the dealer.

The game handles:

- Player cards
- Dealer cards
- Betting
- Hit
- Stand
- Win / lose results
- Balance updates

### Slots

A virtual slot machine where players can place bets and spin the reels.

The application calculates the result and updates the player's virtual balance.

---

## 🏆 Leaderboard

The leaderboard allows users to see the highest-ranked players based on their virtual casino performance.

Example information:

```text
🏆 Leaderboard

1. PlayerOne       12,500 coins
2. PlayerTwo        9,850 coins
3. PlayerThree      7,420 coins
```

---

## 👤 Authentication

The application includes a complete authentication system.

Users can:

- Register
- Login
- Logout
- Access their profile
- View their balance
- Access protected pages

Authentication is handled using JWT tokens stored in HTTP-only cookies.

---

## 📊 Game History

Every game can be recorded so users can review their previous activity.

Example:

```text
Game       Bet       Result       Date
------------------------------------------
Blackjack  100       +200         21/09/2026
Slots       50        -50         21/09/2026
Blackjack  200       -200         20/09/2026
```

---

## 🔌 API

The backend provides REST API endpoints for authentication, users, games, history, and leaderboard functionality.

Example structure:

```text
/api/auth
/api/users
/api/blackjack
/api/slots
/api/history
/api/leaderboard
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
NODE_ENV=development

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

For the frontend, create:

```env
VITE_API_URL=http://localhost:5000/api
```

**Never commit your `.env` files or database credentials to GitHub.**

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

### 4. Configure environment variables

Create the required `.env` files and add your MongoDB and JWT configuration.

### 5. Start the backend

```bash
npm run dev
```

### 6. Start the frontend

```bash
npm run dev
```

The application should now be available locally.

---

## 📱 Responsive Design

The application is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

<!-- Add mobile screenshot here -->
![Mobile View](./screenshots/mobile.png)

---

## 🔐 Security

The application implements several security-related practices:

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies
- Protected API routes
- Authentication middleware
- Environment variables for sensitive configuration
- Server-side validation

---

## 🧠 What I Learned

Building this project helped me improve my understanding of:

- Full-stack application architecture
- REST APIs
- Authentication and authorization
- JWT and HTTP-only cookies
- MongoDB and Mongoose
- React state management
- Protected routes
- Backend game logic
- API communication with Axios
- Deployment
- Git and GitHub

---

## 🌐 Deployment

### Frontend

**Live Demo:**  
https://casino-luka.netlify.app/

### Backend

**API:**  
https://casino-2rx9.onrender.com
---


## 👨‍💻 Author

**Luka**

Full-Stack Developer

- GitHub: `https://github.com/lxka806`

---

## 📄 License

This project is created for educational and portfolio purposes.
