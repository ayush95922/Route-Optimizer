# Route-Optimizer

# Smart Route Optimization System

EcoRoute is a smart route optimization web application that helps users find the best route between two locations based on different preferences such as fastest, cheapest, shortest, and eco-friendly routes.

The system uses graph-based route optimization with Dijkstra’s Algorithm and supports multiple transportation modes including buses, cycling, and walking.

The project also promotes sustainable transportation by tracking eco-friendly travel choices and maintaining a leaderboard system based on carbon emission savings.

---

## Features

### Smart Route Optimization

Users can select:
- Fastest Route
- Cheapest Route
- Shortest Route
- Eco-Friendly Route

The system dynamically recommends the most suitable route accordingly.

---

### Multi-Transport Support

The application supports:
- Bus
- Cycle
- Walking

The system intelligently selects transport mode based on user preference.

Examples:
- Fastest → Bus
- Shortest → Cycle or Walking
- Eco-Friendly → Minimum carbon emission route

---

### Detailed Route Information

The system displays:
- Route path
- Total travel time
- Total distance
- Total cost
- Carbon emission
- Bus number
- Pickup point
- Drop point
- Intermediate stops

---

### User Authentication

- User Signup
- User Login
- Secure user management

---

# Eco Leaderboard System

One of the main features of EcoRoute is the Eco Leaderboard System.

The application tracks eco-friendly travel behavior of users and rewards users who choose low-emission transportation options.

Users gain eco points whenever they:
- Choose eco-friendly routes
- Use cycling or walking routes
- Reduce carbon emissions

The leaderboard displays:
- User ranking
- Eco score
- Total carbon emission saved

| Rank | User  | Eco Score | CO₂ Saved |
|------|------|-----------|-----------|
| 1 | Ayush | 120 | 2.5 kg |
| 2 | Rahul | 95 | 1.8 kg |
| 3 | Priya | 80 | 1.2 kg |

---

## Benefits of Leaderboard Feature

The leaderboard system provides several advantages:

### Encourages Sustainable Travel

Users are motivated to select eco-friendly transportation options such as cycling and walking.

### Increases User Engagement

The ranking system creates a competitive and interactive experience for users.

### Promotes Environmental Awareness

Users become more aware of carbon emissions and the environmental impact of transportation choices.

### Gamification

The system adds a gamification element to the application, making it more attractive and engaging.

### Real-World Impact

The feature promotes greener transportation habits which can help reduce pollution and traffic congestion.

---

# Interactive Frontend

- Modern responsive UI
- Dynamic route updates
- Smooth animations
- Route cards and metrics
- Leaderboard interface
- Dark mode support
- Interactive route selection

---

# Tech Stack

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- Java
- Spring Boot

## Database
- MongoDB

## Algorithm
- Dijkstra Algorithm

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
Optimized Route Result
        ↓
Frontend Display
```

---

# Route Preferences

| Preference | Optimization |
|------------|--------------|
| Fastest | Minimum Time |
| Cheapest | Minimum Cost |
| Shortest | Minimum Distance |
| Eco-Friendly | Minimum Carbon Emission |

---

# API Endpoints

## Authentication APIs

### Signup

```http
POST /api/auth/signup
```

### Login

```http
POST /api/auth/login
```

---

## Route APIs

### Get All Routes

```http
GET /api/routes
```

### Optimize Route

```http
POST /api/optimize
```

### Sample Request

```json
{
  "source": "Vijay Nagar",
  "destination": "Rajwada",
  "preference": "fastest"
}
```

### Sample Response

```json
{
  "selectedPreference": "fastest",
  "route": ["Vijay Nagar", "LIG", "Palasia", "Rajwada"],
  "transportType": "BUS",
  "busDetails": {
    "busNumber": "B12",
    "pickupPoint": "Vijay Nagar Square",
    "dropPoint": "Rajwada"
  },
  "totalTime": 25,
  "totalCost": 18,
  "totalDistance": 9.7,
  "totalEmission": 0.5
}
```

---

## Leaderboard API

### Get Leaderboard

```http
GET /api/leaderboard
```

---

# Database Collections

## routes Collection

```json
{
  "source": "Vijay Nagar",
  "destination": "LIG",
  "distance": 2.0,
  "time": 6,
  "cost": 5,
  "emission": 0.1,
  "transportType": "BUS",
  "busNumber": "B12",
  "pickupPoint": "Vijay Nagar Square",
  "dropPoint": "LIG Square",
  "stops": ["Vijay Nagar", "LIG"]
}
```

---

## users Collection

```json
{
  "name": "Ayush",
  "email": "user@example.com",
  "ecoScore": 120,
  "totalEmissionSaved": 2.5
}
```

---

# Installation & Setup

## Prerequisites

- Java 17
- Maven
- MongoDB
- VS Code or IntelliJ IDEA

---

# Backend Setup

## Navigate to backend folder

```bash
cd backend
```

## Install dependencies

```bash
mvn clean install
```

## Configure MongoDB

Update `application.properties`:

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/pathoptimizer
```

## Run Backend

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

# Frontend Setup

1. Open frontend folder
2. Open `index.html`
3. Use Live Server or browser

---

# Future Enhancements

- Real-time bus tracking
- GPS integration
- Live traffic analysis
- AI-based recommendations
- Mobile application
- Google Maps integration

---

# Project Highlights

- Graph-based route optimization
- Sustainable transportation focus
- Eco score and leaderboard system
- Multi-transport recommendation
- Full-stack architecture
- Real-world transportation use case

---

# Author

Ayush Shrivastava

---

# License

This project is developed for educational and academic purposes.
