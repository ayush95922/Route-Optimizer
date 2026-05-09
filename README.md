# SmartRoute — Indore Transit App

A full-stack smart transit comparison app for Indore. Compare **Bus, Walking, Cycling, Car** for any route — and see exactly how much CO₂ you save.

---

## Screenshots

| Home | Find Routes | Comparison | Champions |
|------|------------|------------|-----------|
| Hero + stats | Dropdowns + criteria | 4-mode cards + Leaflet map | Leaderboard |

---

## Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | HTML5 + CSS3 + Tailwind CDN + Vanilla JS |
| Map       | Leaflet.js + OpenStreetMap  |
| Backend   | Spring Boot 3.2 (Java 17)   |
| Database  | MongoDB 6.x                 |
| Auth      | JWT (JJWT 0.12)             |
| Security  | Spring Security + BCrypt    |

---

## Project Structure

```
smartroute/
├── frontend/
│   ├── index.html          # Home page
│   ├── login.html          # Sign in
│   ├── signup.html         # Register
│   ├── routes.html         # Find routes + results + map
│   ├── champions.html      # Leaderboard
│   ├── style.css           # Shared styles
│   ├── app.js              # Shared JS (nav user state)
│   ├── routes.js           # Route comparison + Leaflet map
│   └── champions.js        # Leaderboard render
│
└── backend/
    ├── pom.xml
    └── src/main/java/com/smartroute/
        ├── SmartRouteApplication.java
        ├── config/
        │   └── SecurityConfig.java
        ├── controller/
        │   ├── AuthController.java
        │   ├── RouteController.java
        │   ├── TripController.java
        │   └── ChampionController.java
        ├── model/
        │   ├── User.java
        │   ├── Trip.java
        │   └── RouteResult.java
        ├── repository/
        │   ├── UserRepository.java
        │   └── TripRepository.java
        └── service/
            ├── AuthService.java
            ├── RouteService.java
            ├── TripService.java
            └── ChampionService.java
```

---

## Prerequisites

- Java 17+
- Maven 3.8+
- MongoDB 6.x (running on localhost:27017)
- Any modern browser (Chrome, Firefox, Edge)

---

## Setup & Run

### 1) Start MongoDB
- Windows: `net start MongoDB`

### 2) Run Backend
```bash
cd smartroute/backend
mvn clean package -DskipTests
java -jar target/*.jar
```
Backend runs at: **http://localhost:8080**

### 3) Open Frontend
Open `smartroute/frontend/index.html` in your browser.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login, returns JWT |
| GET | /api/routes/locations | List all locations |
| GET | /api/routes/compare?from=X&to=Y | Compare 4 modes |
| POST | /api/trips | Save a trip |
| GET | /api/trips/{userId} | Get user trips |
| GET | /api/champions | Get leaderboard |

---

## Demo Accounts (auto-seeded)

| Email | Password |
|---|---|
| aarav@demo.in | Demo@1234 |
| priya@demo.in | Demo@1234 |
| kabir@demo.in | Demo@1234 |

---

## Features

- JWT authentication (register / login)
- Route comparison across **Bus, Walking, Cycling, Car**
- Optimization criteria: **Fastest, Cheapest, Eco-Friendly, Shortest**
- Leaflet.js interactive map
- Champions leaderboard
- MongoDB persistence for users and trips
