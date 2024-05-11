package com.JUN_WE_170.PAF.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.JUN_WE_170.PAF.data.UserData;
import com.JUN_WE_170.PAF.model.UserModel;
import com.JUN_WE_170.PAF.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserCont {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Object> createUser(@RequestBody UserModel user) {
        return userService.createUser(user);
    }

    @GetMapping("/{userId}")
    public UserData getUserById(@PathVariable String userId) {
        return userService.getUserById(userId);
    }

    @GetMapping
    public List<UserData> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/follow")
    public ResponseEntity<Object> followUser(@RequestParam String userId, @RequestParam String FollowedUserId) {
        return userService.followUser(userId,FollowedUserId);
    }
    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody UserModel user) {

        return userService.loginUser(user.getEmail(), user.getPassword());

    }
}

