package com.smartroute.controller;

import com.smartroute.model.Trip;
import com.smartroute.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TripController {

    private final TripService tripService;

    // POST /api/trips
    @PostMapping
    public ResponseEntity<?> saveTrip(@RequestBody Map<String, Object> body) {
        try {
            Trip saved = tripService.saveTrip(body);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // GET /api/trips/{userId}
    @GetMapping("/{userId}")
    public ResponseEntity<List<Trip>> getUserTrips(@PathVariable String userId) {
        return ResponseEntity.ok(tripService.getUserTrips(userId));
    }
}
