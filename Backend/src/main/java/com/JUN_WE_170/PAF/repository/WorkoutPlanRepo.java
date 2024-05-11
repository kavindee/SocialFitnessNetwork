package com.JUN_WE_170.PAF.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.JUN_WE_170.PAF.model.WorkoutPlanModel;

@Repository
public interface WorkoutPlanRepo extends MongoRepository<WorkoutPlanModel, String> {

}