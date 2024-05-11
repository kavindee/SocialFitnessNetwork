package com.JUN_WE_170.PAF.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.JUN_WE_170.PAF.model.SharePostModel;

import java.util.List;


@Repository
public interface SharePostRepo extends MongoRepository<SharePostModel, String> {
    List<SharePostModel> findByUserId(String userId);
}
