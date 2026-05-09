package com.smartroute.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "trips")
public class Trip {

    @Id
    private String id;

    private String userId;
    private String from;
    private String to;
    private String mode;       // Bus, Walking, Cycling, Car

    private double distance;
    private double cost;
    private double co2Saved;   // kg saved vs car baseline

    private LocalDateTime createdAt = LocalDateTime.now();
}
