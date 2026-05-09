package com.smartroute.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteResult {

    private String       mode;
    private String       icon;
    private String       label;
    private List<String> steps;
    private int          time;       // minutes
    private double       cost;       // INR
    private double       dist;       // km
    private double       co2;        // kg CO₂
    private List<String> tags;       // e.g. ["ECO-FRIENDLY"]
}
