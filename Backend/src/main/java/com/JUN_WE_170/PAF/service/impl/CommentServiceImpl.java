package com.JUN_WE_170.PAF.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JUN_WE_170.PAF.model.CommentModel;
import com.JUN_WE_170.PAF.model.PostModel;
import com.JUN_WE_170.PAF.repository.CommentRepo;
import com.JUN_WE_170.PAF.repository.PostRepo;
import com.JUN_WE_170.PAF.service.CommentService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepo commentRepository;

    @Autowired
    private PostRepo postRepository;
    @Override
    public List<CommentModel> getCommentsForPost(String postId) {
        return commentRepository.findByPostId(postId);
    }

    @Override
    public CommentModel addCommentToPost(String postId, String content, String commentBy, String commentById ,String commentByProfile) {
        CommentModel comment = new CommentModel();
        comment.setContent(content);
        comment.setCommentBy(commentBy);
        comment.setCommentById(commentById);
        comment.setCommentByProfile(commentByProfile);
        comment.setCreatedAt(String.valueOf(new Date()));

        PostModel post = postRepository.findById(postId).orElse(null);
        if (post != null) {
            comment.setPostId(post.getId());
            return commentRepository.save(comment);
        } else {
            return null;
        }
    }

    @Override
    public void deleteComment(String postId, String commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    public CommentModel editComment(String commentId, String content) {
        Optional<CommentModel> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isPresent()) {
            CommentModel comment = optionalComment.get();
            comment.setContent(content);
            return commentRepository.save(comment);
        } else {

            return null;
        }
    }
}

