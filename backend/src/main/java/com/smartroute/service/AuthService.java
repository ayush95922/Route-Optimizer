package com.smartroute.service;

import com.smartroute.model.User;
import com.smartroute.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder;

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private long jwtExpiration;

    // ── Register ─────────────────────────────────────────────────────────────
    public Map<String, Object> register(String username, String email, String password) {
        if (userRepo.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user = userRepo.save(user);

        return buildResponse(user);
    }

    // ── Login ─────────────────────────────────────────────────────────────────
    public Map<String, Object> login(String email, String password) {
        User user = userRepo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return buildResponse(user);
    }

    // ── Build JWT response ────────────────────────────────────────────────────
    private Map<String, Object> buildResponse(User user) {
        String token = generateToken(user);
        Map<String, Object> resp = new HashMap<>();
        resp.put("id",       user.getId());
        resp.put("username", user.getUsername());
        resp.put("email",    user.getEmail());
        resp.put("co2Saved", user.getCo2Saved());
        resp.put("ecoTrips", user.getEcoTrips());
        resp.put("token",    token);
        return resp;
    }

    // ── Generate JWT ──────────────────────────────────────────────────────────
    private String generateToken(User user) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        return Jwts.builder()
            .subject(user.getId())
            .claim("email", user.getEmail())
            .claim("username", user.getUsername())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(key)
            .compact();
    }
}
