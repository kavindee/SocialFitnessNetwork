package com.JUN_WE_170.PAF.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.JUN_WE_170.PAF.data.ShareData;
import com.JUN_WE_170.PAF.model.SharePostModel;
import com.JUN_WE_170.PAF.service.SharePostService;

import java.util.List;
@RestController
@RequestMapping("/share")
public class PostShareCont {
    @Autowired
    private SharePostService sharePostService;

    @GetMapping
    public List<SharePostModel> getSharePosts() {
        return sharePostService.getSharePosts();
    }

    @PostMapping
    public ResponseEntity<SharePostModel> createSharePost(@RequestBody ShareData shareDTO) {
        SharePostModel savedPost = sharePostService.createSharePost(shareDTO);
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        sharePostService.deleteSharedPost(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    public List<SharePostModel> getSharePostsByUserId(@PathVariable String id) {
        return sharePostService.getSharePostsByuser(id);
    }

}
