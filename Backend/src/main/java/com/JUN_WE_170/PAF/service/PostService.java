package com.JUN_WE_170.PAF.service;

import org.springframework.http.ResponseEntity;

import com.JUN_WE_170.PAF.data.PostData;
import com.JUN_WE_170.PAF.model.PostModel;

import java.util.List;
import java.util.Optional;

public interface PostService {
    List<PostModel> getAllPosts();

    Optional<PostModel> getPostById(String id);

    PostModel createPost(PostModel post);

    ResponseEntity<PostModel> editPost( PostData postDTO);

    void deletePost(String id);

    ResponseEntity<Object> likePost(String postId, String userId);

    List<PostModel> getPostByIdUserId(String userId);

}
