package com.JUN_WE_170.PAF.service.impl;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.JUN_WE_170.PAF.data.PostData;
import com.JUN_WE_170.PAF.model.PostModel;
import com.JUN_WE_170.PAF.model.UserModel;
import com.JUN_WE_170.PAF.repository.PostRepo;
import com.JUN_WE_170.PAF.repository.UserRepo;
import com.JUN_WE_170.PAF.service.CommentService;
import com.JUN_WE_170.PAF.service.PostService;

import java.util.*;


@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepo postRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private CommentService commentService;

    @Override
    public List<PostModel> getAllPosts() {
        List<PostModel> posts = postRepository.findAll();
        for (PostModel post : posts) {
            post.setComments(commentService.getCommentsForPost(post.getId()));
        }

        posts.sort(Comparator.comparing(PostModel::getDate).reversed());
        return posts;
    }

    @Override
    public Optional<PostModel> getPostById(String id) {
        return postRepository.findById(id);
    }

    @Override
    public PostModel createPost(PostModel post) {
        post.setDate(String.valueOf(new Date()));
        return postRepository.save(post);
    }

    @Override
    public ResponseEntity<PostModel> editPost(PostData postDTO) {
        PostModel post = postRepository.findById(postDTO.getId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        try {
            post.setTitle(postDTO.getTitle());
            List<String> images = postDTO.getImages();
            if (images != null && !images.isEmpty()) {
                post.setImages(images);
            } else {
                post.setImages(Collections.emptyList());
            }
            post.setDescription(postDTO.getDescription());
            post.setDate(String.valueOf(new Date()));
            post.setVideo(postDTO.getVideo());
            postRepository.save(post);

            return new ResponseEntity<>(post, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public void deletePost(String id) {
        postRepository.deleteById(id);
    }

    @Override
    public ResponseEntity<Object> likePost(String postId, String userId) {
        try {
            PostModel post = postRepository.findById(postId)
                    .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

            UserModel user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

            if (post.getLikedBy() == null) {
                post.setLikedBy(new ArrayList<>());
            }

            if (post.getLikedBy().contains(userId)) {
                post.getLikedBy().remove(userId);
                post.setLikeCount(post.getLikeCount() - 1);
                postRepository.save(post);
                return new ResponseEntity<>(post, HttpStatus.OK);
            } else {
                post.getLikedBy().add(userId);
                post.setLikeCount(post.getLikeCount() + 1);
                postRepository.save(post);
                return new ResponseEntity<>(post, HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public List<PostModel> getPostByIdUserId(String userId) {
        List<PostModel> posts = postRepository.findByUserId(userId);
        for (PostModel post : posts) {
            post.setComments(commentService.getCommentsForPost(post.getId()));
        }
        return posts;
    }


}

