package com.JUN_WE_170.PAF.service;

import java.util.List;
import java.util.Optional;

import com.JUN_WE_170.PAF.model.WorkoutStatusModel;

public interface WorkoutStatusService {

    List<WorkoutStatusModel> getAllWorkoutStatus();

    Optional<WorkoutStatusModel> getWorkoutStatsusById(String statusId);

    WorkoutStatusModel createWorkoutStatus(WorkoutStatusModel workoutStatus);

    WorkoutStatusModel updateWorkoutStatus(String statusId, WorkoutStatusModel workoutStatus);

    void deleteWorkoutStatus(String statusId);

}