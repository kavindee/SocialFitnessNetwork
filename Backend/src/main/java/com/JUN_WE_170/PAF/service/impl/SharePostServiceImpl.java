package com.JUN_WE_170.PAF.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.JUN_WE_170.PAF.data.ShareData;
import com.JUN_WE_170.PAF.model.PostModel;
import com.JUN_WE_170.PAF.model.SharePostModel;
import com.JUN_WE_170.PAF.model.UserModel;
import com.JUN_WE_170.PAF.repository.PostRepo;
import com.JUN_WE_170.PAF.repository.SharePostRepo;
import com.JUN_WE_170.PAF.repository.UserRepo;
import com.JUN_WE_170.PAF.service.SharePostService;

import java.util.List;
@Service
public class SharePostServiceImpl implements SharePostService {

    @Autowired
    private SharePostRepo sharePostRepository;

    @Autowired
    private PostRepo postRepository;

    @Autowired
    private UserRepo userRepository;
    @Override
    public List<SharePostModel> getSharePosts() {
        return sharePostRepository.findAll();
    }

    @Override
    public SharePostModel createSharePost(ShareData shareDTO) {

        PostModel post = postRepository.findById(shareDTO.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        UserModel user = userRepository.findById(shareDTO.getUserid())
                .orElseThrow(() -> new RuntimeException("User not found"));

        try{
            SharePostModel sharePostModel = new SharePostModel();
            sharePostModel.setSharedBy(user);
            sharePostModel.setPost(post);
            sharePostModel.setDescription(shareDTO.getDescription());
            sharePostModel.setShared("shared");
            sharePostModel.setUserId(shareDTO.getUserid());
            return sharePostRepository.save(sharePostModel);
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public void deleteSharedPost(String id) {
        sharePostRepository.deleteById(id);
    }

    @Override
    public List<SharePostModel> getSharePostsByuser(String id) {
        UserModel user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return sharePostRepository.findByUserId(id);
    }


}
