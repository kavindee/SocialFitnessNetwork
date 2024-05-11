package com.JUN_WE_170.PAF.service;

import java.util.List;
import java.util.Optional;

import com.JUN_WE_170.PAF.model.WorkoutPlanModel;

public interface WorkoutPlanService {

    List<WorkoutPlanModel> getAllWorkoutPlans();

    Optional<WorkoutPlanModel> getWorkoutPlanById(String id);

    WorkoutPlanModel createWorkoutPlan(WorkoutPlanModel workoutPlan);

    WorkoutPlanModel updateWorkoutPlan(String workoutPlanId, WorkoutPlanModel workoutPlan);

    void deleteWorkoutPlan(String workoutPlanId);

}
