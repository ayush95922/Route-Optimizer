package com.smartroute.repository;

import com.smartroute.model.Trip;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TripRepository extends MongoRepository<Trip, String> {
    List<Trip> findByUserId(String userId);
    List<Trip> findByUserIdOrderByCreatedAtDesc(String userId);
}
