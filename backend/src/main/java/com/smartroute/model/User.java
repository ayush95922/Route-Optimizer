package com.smartroute.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String username;
    private String password;   // bcrypt hashed

    private double co2Saved   = 0.0;
    private int    ecoTrips   = 0;
    private int    rank       = 0;

    private LocalDateTime createdAt = LocalDateTime.now();
}
