package com.JUN_WE_170.PAF.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.JUN_WE_170.PAF.model.WorkoutStatusModel;

@Repository
public interface WorkoutStatusRepo extends MongoRepository<WorkoutStatusModel, String> {

}