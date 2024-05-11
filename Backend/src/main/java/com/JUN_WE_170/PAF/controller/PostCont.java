package com.JUN_WE_170.PAF.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.JUN_WE_170.PAF.data.PostData;
import com.JUN_WE_170.PAF.model.PostModel;
import com.JUN_WE_170.PAF.service.PostService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostCont {

    @Autowired
    private PostService postService;

    @GetMapping
    public List<PostModel> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostModel> getPostById(@PathVariable String id) {
        Optional<PostModel> post = postService.getPostById(id);
        return post.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<PostModel> createPost(@RequestBody PostModel post) {
        PostModel savedPost = postService.createPost(post);
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<PostModel> updatePost(@RequestBody PostData postDTO) {
        return postService.editPost(postDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        postService.deletePost(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/like")
    public ResponseEntity<Object> likePost(@RequestParam String postId, @RequestParam String userId) {
        return postService.likePost(postId,userId);
    }

    @GetMapping("user/{userId}")
    public List<PostModel> getPostByIdUserId(@PathVariable String userId) {
       return postService.getPostByIdUserId(userId);
    }
}