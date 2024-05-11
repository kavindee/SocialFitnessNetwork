package com.JUN_WE_170.PAF.service;

import java.util.List;

import com.JUN_WE_170.PAF.model.CommentModel;

public interface CommentService {
    List<CommentModel> getCommentsForPost(String postId);
    CommentModel addCommentToPost(String postId, String content, String commentBy, String commentById ,String commentByProfile);
    void deleteComment(String postId, String commentId);

    CommentModel editComment(String commentId, String content);
}
