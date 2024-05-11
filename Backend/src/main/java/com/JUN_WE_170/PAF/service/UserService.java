package com.JUN_WE_170.PAF.service;

import org.springframework.http.ResponseEntity;

import com.JUN_WE_170.PAF.data.UserData;
import com.JUN_WE_170.PAF.model.UserModel;

import java.util.List;

public interface UserService {
    ResponseEntity<Object> createUser(UserModel user);
    UserData getUserById(String userId);
    List<UserData> getAllUsers();
    ResponseEntity<Object> followUser(String userId, String followedUserId);

    ResponseEntity<Object> loginUser(String email, String password);
}
