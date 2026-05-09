package com.smartroute.service;

import com.smartroute.model.User;
import com.smartroute.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ChampionService {

    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    // ── Leaderboard (top 20 by CO₂ saved) ────────────────────────────────────
    public List<Map<String, Object>> getLeaderboard() {
        List<User> users = userRepo.findAllByOrderByCo2SavedDesc();
        List<Map<String, Object>> board = new ArrayList<>();

        for (int i = 0; i < Math.min(users.size(), 20); i++) {
            User u = users.get(i);
            Map<String, Object> entry = new LinkedHashMap<>();
            entry.put("rank",     i + 1);
            entry.put("name",     u.getUsername() != null ? u.getUsername() : u.getEmail().split("@")[0]);
            entry.put("co2Saved", u.getCo2Saved());
            entry.put("ecoTrips", u.getEcoTrips());
            board.add(entry);
        }

        // If DB is empty, return demo data
        if (board.isEmpty()) {
            return getDemoLeaderboard();
        }
        return board;
    }

    // ── Seed demo users on startup (only if DB empty) ─────────────────────────
    @EventListener(ApplicationReadyEvent.class)
    public void seedDemoData() {
        if (userRepo.count() > 0) return;

        List<Object[]> demos = List.of(
            new Object[]{"Aarav Mehta",  "aarav@demo.in",  74.4, 248},
            new Object[]{"Priya Sharma", "priya@demo.in",  58.5, 195},
            new Object[]{"Rohan Patel",  "kabir@demo.in",  48.6, 162},
            new Object[]{"Anaya Verma",  "anaya@demo.in",  40.2, 134},
            new Object[]{"Kabir Joshi",  "kjoshi@demo.in", 36.3, 121},
            new Object[]{"Ishita Roy",   "ishita@demo.in", 29.4,  98}
        );

        String hash = passwordEncoder.encode("Demo@1234");
        for (Object[] d : demos) {
            User u = new User();
            u.setUsername((String) d[0]);
            u.setEmail((String) d[1]);
            u.setPassword(hash);
            u.setCo2Saved((Double) d[2]);
            u.setEcoTrips((Integer) d[3]);
            userRepo.save(u);
        }
    }

    // ── Static demo fallback ──────────────────────────────────────────────────
    private List<Map<String, Object>> getDemoLeaderboard() {
        List<Object[]> data = List.of(
            new Object[]{1, "Aarav Mehta",  74.4, 248},
            new Object[]{2, "Priya Sharma", 58.5, 195},
            new Object[]{3, "Rohan Patel",  48.6, 162},
            new Object[]{4, "Anaya Verma",  40.2, 134},
            new Object[]{5, "Kabir Joshi",  36.3, 121},
            new Object[]{6, "Ishita Roy",   29.4,  98}
        );
        List<Map<String, Object>> board = new ArrayList<>();
        for (Object[] row : data) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("rank",     row[0]);
            m.put("name",     row[1]);
            m.put("co2Saved", row[2]);
            m.put("ecoTrips", row[3]);
            board.add(m);
        }
        return board;
    }
}
