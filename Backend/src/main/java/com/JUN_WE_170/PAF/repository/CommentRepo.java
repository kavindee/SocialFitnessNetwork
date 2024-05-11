package com.JUN_WE_170.PAF.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.JUN_WE_170.PAF.model.CommentModel;

import java.util.List;

public interface CommentRepo extends MongoRepository<CommentModel, String> {
    List<CommentModel> findByPostId(String postId);
}
