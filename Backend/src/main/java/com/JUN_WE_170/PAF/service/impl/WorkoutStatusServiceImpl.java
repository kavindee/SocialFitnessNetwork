package com.JUN_WE_170.PAF.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JUN_WE_170.PAF.model.UserModel;
import com.JUN_WE_170.PAF.model.WorkoutStatusModel;
import com.JUN_WE_170.PAF.repository.UserRepo;
import com.JUN_WE_170.PAF.repository.WorkoutStatusRepo;
import com.JUN_WE_170.PAF.service.WorkoutStatusService;

@Service
public class WorkoutStatusServiceImpl implements WorkoutStatusService {

    @Autowired
    private WorkoutStatusRepo workoutStatusRepository;

    @Autowired
    private UserRepo userRepository;


    @Override
    public List<WorkoutStatusModel> getAllWorkoutStatus() {
        return workoutStatusRepository.findAll();
    }

    @Override
    public Optional<WorkoutStatusModel> getWorkoutStatsusById(String statusId) {
        return workoutStatusRepository.findById(statusId);
    }

    @Override
    public WorkoutStatusModel createWorkoutStatus(WorkoutStatusModel workoutStatus) {
        Optional<UserModel> userOptional = userRepository.findById(workoutStatus.getUserId());
        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();
            workoutStatus.setUserId(user.getId());
            workoutStatus.setUsername(user.getName());
            workoutStatus.setUserProfile(user.getProfileImage());
            return workoutStatusRepository.save(workoutStatus);
        } else {
            return null;
        }
    }

    @Override
    public WorkoutStatusModel updateWorkoutStatus(String statusId, WorkoutStatusModel workoutStatus) {

        if (workoutStatusRepository.existsById(statusId)) {
            Optional<UserModel> userOptional = userRepository.findById(workoutStatus.getUserId());
            if (userOptional.isPresent()) {
                UserModel user = userOptional.get();
                workoutStatus.setUserId(user.getId());
                workoutStatus.setUsername(user.getName());
                workoutStatus.setUserProfile(user.getProfileImage());
                workoutStatus.setStatusId(statusId);
                workoutStatus.setDistance(workoutStatus.getDistance());
                workoutStatus.setPushUps(workoutStatus.getPushUps());
                workoutStatus.setWeight(workoutStatus.getWeight());
                workoutStatus.setDescription(workoutStatus.getDescription());
                workoutStatus.setDate(workoutStatus.getDate());
                return workoutStatusRepository.save(workoutStatus);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public void deleteWorkoutStatus(String statusId) {
        workoutStatusRepository.deleteById(statusId);
    }

}