package com.smartroute.controller;

import com.smartroute.model.RouteResult;
import com.smartroute.service.RouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RouteController {

    private final RouteService routeService;

    // GET /api/routes/locations
    @GetMapping("/locations")
    public ResponseEntity<List<String>> getLocations() {
        return ResponseEntity.ok(routeService.getLocations());
    }

    // GET /api/routes/compare?from=Airport&to=Bengali Square&criteria=fastest
    @GetMapping("/compare")
    public ResponseEntity<?> compareRoutes(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam(defaultValue = "fastest") String criteria) {
        try {
            List<RouteResult> results = routeService.compareRoutes(from, to, criteria);
            return ResponseEntity.ok(results);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
