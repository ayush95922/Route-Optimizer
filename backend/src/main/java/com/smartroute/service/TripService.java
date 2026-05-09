package com.smartroute.service;

import com.smartroute.model.Trip;
import com.smartroute.model.User;
import com.smartroute.repository.TripRepository;
import com.smartroute.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepo;
    private final UserRepository userRepo;

    // ── Save a trip and update user CO₂ stats ─────────────────────────────────
    public Trip saveTrip(Map<String, Object> body) {
        Trip trip = new Trip();
        trip.setUserId((String) body.get("userId"));
        trip.setFrom((String) body.get("from"));
        trip.setTo((String) body.get("to"));
        trip.setMode((String) body.get("mode"));

        double distance = body.containsKey("distance") ? ((Number) body.get("distance")).doubleValue() : 0;
        double cost     = body.containsKey("cost")     ? ((Number) body.get("cost")).doubleValue()     : 0;
        double co2Saved = body.containsKey("co2Saved") ? ((Number) body.get("co2Saved")).doubleValue() : 0;

        trip.setDistance(distance);
        trip.setCost(cost);
        trip.setCo2Saved(co2Saved);

        trip = tripRepo.save(trip);

        // Update user stats if userId is known
        if (trip.getUserId() != null && !trip.getUserId().isBlank()) {
            userRepo.findById(trip.getUserId()).ifPresent(user -> {
                user.setCo2Saved(Math.round((user.getCo2Saved() + co2Saved) * 100.0) / 100.0);
                if (co2Saved > 0) user.setEcoTrips(user.getEcoTrips() + 1);
                userRepo.save(user);
            });
        }

        return trip;
    }

    // ── Get trips for a user ──────────────────────────────────────────────────
    public List<Trip> getUserTrips(String userId) {
        return tripRepo.findByUserIdOrderByCreatedAtDesc(userId);
    }
}
