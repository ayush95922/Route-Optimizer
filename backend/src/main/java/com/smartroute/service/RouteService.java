package com.smartroute.service;

import com.smartroute.model.RouteResult;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RouteService {

    // Indore key locations with coordinates
    private static final Map<String, double[]> LOCATIONS = new LinkedHashMap<>();
    static {
        LOCATIONS.put("Airport",        new double[]{22.7217, 75.8013});
        LOCATIONS.put("Bengali Square", new double[]{22.7557, 75.8769});
        LOCATIONS.put("Rajwada",        new double[]{22.7196, 75.8577});
        LOCATIONS.put("Vijay Nagar",    new double[]{22.7512, 75.8951});
        LOCATIONS.put("Palasia",        new double[]{22.7277, 75.8677});
        LOCATIONS.put("MG Road",        new double[]{22.7246, 75.8747});
        LOCATIONS.put("Bhawarkuan",     new double[]{22.7095, 75.8576});
        LOCATIONS.put("Pardesipura",    new double[]{22.7421, 75.8654});
        LOCATIONS.put("Super Corridor", new double[]{22.7826, 75.9015});
        LOCATIONS.put("Rau",            new double[]{22.6776, 75.8150});
        LOCATIONS.put("Geeta Bhawan",   new double[]{22.7334, 75.8847});
        LOCATIONS.put("Khajrana",       new double[]{22.7389, 75.9102});
    }

    // ── Get all location names ────────────────────────────────────────────────
    public List<String> getLocations() {
        return new ArrayList<>(LOCATIONS.keySet());
    }

    // ── Compare all 4 modes ───────────────────────────────────────────────────
    public List<RouteResult> compareRoutes(String from, String to, String criteria) {
        double[] orig = LOCATIONS.get(from);
        double[] dest = LOCATIONS.get(to);

        if (orig == null || dest == null) {
            throw new RuntimeException("Unknown location: " + from + " or " + to);
        }

        double dist = haversine(orig[0], orig[1], dest[0], dest[1]);
        dist = Math.round(dist * 100.0) / 100.0;

        List<RouteResult> results = new ArrayList<>();

        // ── Bus ───────────────────────────────────────────────────────────────
        RouteResult bus = new RouteResult();
        bus.setMode("Bus");
        bus.setIcon("🚌");
        bus.setLabel("Local Bus");
        bus.setSteps(List.of("Board: " + from + " Stop", "Drop: " + to + " Stop"));
        bus.setTime((int) Math.round(dist * 2.5 + 8));
        bus.setCost(Math.max(10, Math.round(dist * 1.8)));
        bus.setDist(dist);
        bus.setCo2(Math.round(dist * 0.059 * 100.0) / 100.0);
        bus.setTags(new ArrayList<>());
        results.add(bus);

        // ── Walking ───────────────────────────────────────────────────────────
        RouteResult walk = new RouteResult();
        walk.setMode("Walking");
        walk.setIcon("🚶");
        walk.setLabel("");
        walk.setSteps(List.of("Start at " + from, "Walk towards " + to, "Reach " + to));
        walk.setTime((int) Math.round(dist * 12));
        walk.setCost(0);
        walk.setDist(dist);
        walk.setCo2(0.0);
        walk.setTags(List.of("ECO-FRIENDLY"));
        results.add(walk);

        // ── Cycling ───────────────────────────────────────────────────────────
        RouteResult cycle = new RouteResult();
        cycle.setMode("Cycling");
        cycle.setIcon("🚴");
        cycle.setLabel("");
        cycle.setSteps(List.of("Start at " + from, "Take main road", "Reach " + to));
        cycle.setTime((int) Math.round(dist * 4));
        cycle.setCost(0);
        cycle.setDist(dist);
        cycle.setCo2(0.0);
        cycle.setTags(List.of("SHORTEST"));
        results.add(cycle);

        // ── Car ───────────────────────────────────────────────────────────────
        double carDist = Math.round(dist * 1.15 * 100.0) / 100.0;
        RouteResult car = new RouteResult();
        car.setMode("Car");
        car.setIcon("🚗");
        car.setLabel("");
        car.setSteps(List.of("Drive from " + from, "Take main arterial road", "Reach " + to));
        car.setTime((int) Math.round(dist * 1.5 + 5));
        car.setCost(Math.round(carDist * 6.1 * 100.0) / 100.0);
        car.setDist(carDist);
        car.setCo2(Math.round(carDist * 0.167 * 100.0) / 100.0);
        car.setTags(List.of("FASTEST"));
        results.add(car);

        return results;
    }

    // ── Haversine formula (km) ────────────────────────────────────────────────
    private double haversine(double lat1, double lon1, double lat2, double lon2) {
        final double R = 6371;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat/2) * Math.sin(dLat/2)
                 + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                 * Math.sin(dLon/2) * Math.sin(dLon/2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }
}
