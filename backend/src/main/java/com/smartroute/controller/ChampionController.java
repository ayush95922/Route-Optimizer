package com.smartroute.controller;

import com.smartroute.service.ChampionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/champions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChampionController {

    private final ChampionService championService;

    // GET /api/champions
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getLeaderboard() {
        return ResponseEntity.ok(championService.getLeaderboard());
    }
}
