package com.JUN_WE_170.PAF.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.JUN_WE_170.PAF.model.PostModel;

import java.util.List;

@Repository
public interface PostRepo extends MongoRepository<PostModel, String> {
    PostModel findPostById(String id);

    List<PostModel> findByUserId(String userId);
}