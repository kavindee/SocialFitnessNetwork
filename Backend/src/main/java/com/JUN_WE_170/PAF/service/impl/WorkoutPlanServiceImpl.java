package com.JUN_WE_170.PAF.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JUN_WE_170.PAF.model.UserModel;
import com.JUN_WE_170.PAF.model.WorkoutPlanModel;
import com.JUN_WE_170.PAF.repository.UserRepo;
import com.JUN_WE_170.PAF.repository.WorkoutPlanRepo;
import com.JUN_WE_170.PAF.service.WorkoutPlanService;

@Service
public class WorkoutPlanServiceImpl implements WorkoutPlanService {

    @Autowired
    private WorkoutPlanRepo workoutPlanRepository;

    @Autowired
    private UserRepo userRepository;

    @Override
    public List<WorkoutPlanModel> getAllWorkoutPlans() {
        return workoutPlanRepository.findAll();
    }

    @Override
    public Optional<WorkoutPlanModel> getWorkoutPlanById(String id) {
        return workoutPlanRepository.findById(id);
    }

    @Override
    public WorkoutPlanModel createWorkoutPlan(WorkoutPlanModel workoutPlan) {
        Optional<UserModel> userOptional = userRepository.findById(workoutPlan.getUserId());
        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();
            workoutPlan.setUserId(user.getId());
            workoutPlan.setUsername(user.getName());
            workoutPlan.setUserProfile(user.getProfileImage());
            return workoutPlanRepository.save(workoutPlan);
        } else {
            return null;
        }
        
    }

    @Override
    public WorkoutPlanModel updateWorkoutPlan(String workoutPlanId, WorkoutPlanModel workoutPlan) {
        if (workoutPlanRepository.existsById(workoutPlanId)) {
            Optional<UserModel> userOptional = userRepository.findById(workoutPlan.getUserId());
            if (userOptional.isPresent()) {
                UserModel user = userOptional.get();
                workoutPlan.setUserId(user.getId());
                workoutPlan.setUsername(user.getName());
                workoutPlan.setUserProfile(user.getProfileImage());
                workoutPlan.setWorkoutPlanId(workoutPlanId);
                workoutPlan.setWorkoutPlanName(workoutPlan.getWorkoutPlanName());
                workoutPlan.setSets(workoutPlan.getSets());
                workoutPlan.setRoutine(workoutPlan.getRoutine());
                workoutPlan.setDate(workoutPlan.getDate());
                workoutPlan.setExercises(workoutPlan.getExercises());
                workoutPlan.setRepetitions(workoutPlan.getRepetitions());
                workoutPlan.setDescription(workoutPlan.getDescription());
                return workoutPlanRepository.save(workoutPlan);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public void deleteWorkoutPlan(String workoutPlanId) {
        workoutPlanRepository.deleteById(workoutPlanId);
    }

}
