package com.JUN_WE_170.PAF.service;

import org.springframework.stereotype.Service;

import com.JUN_WE_170.PAF.data.ShareData;
import com.JUN_WE_170.PAF.model.SharePostModel;

import java.util.List;

@Service
public interface SharePostService {
    List<SharePostModel> getSharePosts();


    SharePostModel createSharePost(ShareData shareDTO);
    void deleteSharedPost(String id);

    List<SharePostModel> getSharePostsByuser(String id);
}
