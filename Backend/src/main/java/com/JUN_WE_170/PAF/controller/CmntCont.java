package com.JUN_WE_170.PAF.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.JUN_WE_170.PAF.data.CommentData;
import com.JUN_WE_170.PAF.model.CommentModel;
import com.JUN_WE_170.PAF.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/posts/{postId}/comments")
public class CmntCont {

    @Autowired
    private CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentModel>> getCommentsForPost(@PathVariable String postId) {
        List<CommentModel> comments = commentService.getCommentsForPost(postId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CommentModel> addCommentToPost(@PathVariable String postId, @RequestBody CommentData request) {
        CommentModel comment = commentService.addCommentToPost(postId, request.getContent(), request.getCommentBy(), request.getCommentById() ,request.getCommentByProfile());
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable String postId, @PathVariable String commentId) {
        commentService.deleteComment(postId, commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentModel> editComment(@PathVariable String commentId, @RequestBody CommentData request) {
        CommentModel editedComment = commentService.editComment(commentId, request.getContent());
        if (editedComment != null) {
            return new ResponseEntity<>(editedComment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}