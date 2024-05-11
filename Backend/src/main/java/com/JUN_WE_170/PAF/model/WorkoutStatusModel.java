package com.JUN_WE_170.PAF.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "workoutStatus")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class WorkoutStatusModel {

    @Id
    private String statusId;
    private String userId;
    private int distance;
    private int pushUps;
    private int weight;
    private String description;
    private String date;
    private String username;
    private String userProfile;

}
