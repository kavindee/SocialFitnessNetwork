package com.JUN_WE_170.PAF.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.JUN_WE_170.PAF.model.UserModel;

import java.util.Optional;
@Repository
public interface UserRepo extends MongoRepository<UserModel, String> {
    UserModel findByEmail(String email);

    Optional<UserModel> findById(String userId);

    boolean existsByEmail(String email);
}

