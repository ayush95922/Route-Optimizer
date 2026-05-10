# SmartRoute — Indore Transit App

A full-stack smart transit comparison app for Indore. Compare **Bus, Walking, Cycling, and Car** routes intelligently and analyze travel time, cost, distance, and carbon emissions in real time.

SmartRoute promotes sustainable transportation by encouraging users to choose eco-friendly travel options and rewarding them through a leaderboard system.

The application also includes a modern responsive UI with Dark Mode support, interactive maps, authentication, and route optimization features.

---

# Screenshots

| Home | Find Routes | Comparison | Champions |
|------|-------------|-------------|------------|
| Hero section + stats | Route search with preferences | Multi-mode comparison cards + map | Eco leaderboard |

---

# Features

## Smart Route Optimization

Users can compare routes based on:
- Fastest Route
- Cheapest Route
- Eco-Friendly Route
- Shortest Route

The system dynamically recommends the best route according to the selected preference.

---

## Multi-Transport Comparison

The application supports:
- Bus
- Walking
- Cycling
- Car

Users can compare all transport modes side-by-side.

---

## Detailed Route Analysis

Each route displays:
- Total travel time
- Estimated cost
- Distance
- Carbon emission
- Pickup point
- Drop point
- Bus details (if applicable)

---

## Interactive Map Integration

- Leaflet.js map integration
- OpenStreetMap support
- Route visualization
- Dynamic markers and paths

---

## User Authentication

- User Signup
- User Login
- JWT-based authentication
- Secure password encryption using BCrypt

---

# Eco Leaderboard System

One of the main features of SmartRoute is the Eco Leaderboard System.

The application tracks eco-friendly travel behavior and rewards users who choose low-emission transportation methods.

Users gain eco points whenever they:
- Select eco-friendly routes
- Use walking or cycling routes
- Reduce carbon emissions

The leaderboard displays:
- User ranking
- Eco score
- Carbon emission saved

| Rank | User | Eco Score | CO₂ Saved |
|------|------|-----------|-----------|
| 1 | Aarav | 120 | 2.5 kg |
| 2 | Priya | 95 | 1.8 kg |
| 3 | Kabir | 80 | 1.2 kg |

---

# Benefits of Leaderboard Feature

## Encourages Sustainable Transportation

Users are motivated to choose environmentally friendly transportation methods.

---

## Increases User Engagement

The ranking system creates an interactive and competitive experience.

---

## Promotes Environmental Awareness

Users can better understand the impact of transportation on carbon emissions.

---

## Gamification

The eco score and ranking system make the application more engaging and rewarding.

---

## Real-World Impact

The system encourages greener mobility choices which can help reduce pollution and traffic congestion.

---

# Dark Mode Support

SmartRoute includes a modern Dark Mode feature for improved accessibility and user experience.

Benefits:
- Better visibility in low-light environments
- Reduced eye strain
- Modern UI experience
- Smooth theme switching

The application supports both Light Mode and Dark Mode with responsive styling.

---

# Interactive Frontend

- Modern responsive UI
- Tailwind CSS styling
- Smooth animations and transitions
- Dynamic route comparison cards
- Interactive maps
- Leaderboard interface
- Dark mode toggle
- Responsive mobile-friendly layout

---

# Tech Stack

| Layer | Technology |
|------|-------------|
| Frontend | HTML5 + CSS3 + Tailwind CDN + Vanilla JS |
| Map | Leaflet.js + OpenStreetMap |
| Backend | Spring Boot 3.2 (Java 17) |
| Database | MongoDB 6.x |
| Auth | JWT (JJWT 0.12) |
| Security | Spring Security + BCrypt |

---

# System Workflow

```text
User Input
(Source + Destination + Preference)
        ↓
Frontend UI
        ↓
Spring Boot Backend
        ↓
MongoDB Route Data
        ↓
Dijkstra Algorithm
        ↓
Optimized Route Comparison
        ↓
Frontend Display + Map Visualization
```

---

# Project Structure

```text
smartroute/
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── routes.html
│   ├── champions.html
│   ├── style.css
│   ├── app.js
│   ├── routes.js
│   └── champions.js
│
└── backend/
    ├── pom.xml
    └── src/main/java/com/smartroute/
        ├── SmartRouteApplication.java
        ├── config/
        ├── controller/
        ├── model/
        ├── repository/
        └── service/
```

---

# Route Preferences

| Preference | Optimization |
|------------|--------------|
| Fastest | Minimum Time |
| Cheapest | Minimum Cost |
| Eco-Friendly | Minimum Carbon Emission |
| Shortest | Minimum Distance |

---

# API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and return JWT |
| GET | /api/routes/locations | Get all locations |
| GET | /api/routes/compare?from=X&to=Y | Compare all transport modes |
| POST | /api/trips | Save trip history |
| GET | /api/trips/{userId} | Fetch user trips |
| GET | /api/champions | Fetch leaderboard |

---

# Demo Accounts

| Email | Password |
|------|-----------|
| aarav@demo.in | Demo@1234 |
| priya@demo.in | Demo@1234 |
| kabir@demo.in | Demo@1234 |

---

# Database

## MongoDB Collections

### users
Stores:
- User profile
- Authentication details
- Eco score
- Emission savings

### trips
Stores:
- Travel history
- Route selections
- Transport type
- Emission data

---

# Prerequisites

- Java 17+
- Maven 3.8+
- MongoDB 6.x
- Modern Browser (Chrome, Firefox, Edge)

---

# Setup & Run

## 1. Start MongoDB

Windows:
```bash
net start MongoDB
```

---

## 2. Run Backend

```bash
cd smartroute/backend
mvn clean package -DskipTests
java -jar target/*.jar
```

Backend runs on:
```text
http://localhost:8080
```

---

## 3. Open Frontend

Open:
```text
smartroute/frontend/index.html
```

Use Live Server or browser.

---

# Security Features

- JWT Authentication
- BCrypt Password Encryption
- Protected APIs
- Secure login system

---

# Future Enhancements

- Real-time bus tracking
- Live traffic integration
- AI-based route recommendation
- Google Maps API integration
- Mobile application support
- Real-time public transport data

---

# Project Highlights

- Full-stack architecture
- Smart route comparison system
- Dijkstra Algorithm implementation
- Interactive map visualization
- Sustainable transportation focus
- Eco leaderboard and gamification
- Dark mode support
- Responsive UI/UX

---

# Author

Ayush Shrivastava

---

# License

This project is developed for educational and academic purposes.
