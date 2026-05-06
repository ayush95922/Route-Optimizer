# Route-Optimizer
# Smart Route Optimization System

EcoRoute is a smart route optimization web application that helps users find the best route between two locations based on different preferences such as fastest, cheapest, shortest, and eco-friendly routes.

The system uses graph-based route optimization with Dijkstra’s Algorithm and supports multiple transportation modes including buses, cycling, and walking.

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

### Eco Leaderboard
The system tracks eco-friendly travel behavior and ranks users based on:
- Eco Score
- Carbon Emission Saved

---

### Interactive Frontend
- Modern responsive UI
- Dynamic route updates
- Smooth animations
- Route cards and metrics
- Leaderboard interface

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
