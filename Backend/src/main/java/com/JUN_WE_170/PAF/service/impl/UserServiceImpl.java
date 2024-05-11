package com.JUN_WE_170.PAF.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.JUN_WE_170.PAF.data.UserData;
import com.JUN_WE_170.PAF.data.UserRegData;
import com.JUN_WE_170.PAF.model.RegisterModel;
import com.JUN_WE_170.PAF.model.UserModel;
import com.JUN_WE_170.PAF.repository.UserRepo;
import com.JUN_WE_170.PAF.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public ResponseEntity<Object> createUser(UserModel user) {

        if(user.getSource() == null){
            if (userRepository.existsByEmail(user.getEmail())) {
                return new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setFollowedUsers(new ArrayList<>());
            user.setSource(RegisterModel.CREDENTIAL);
            UserModel savedUser = userRepository.save(user);
            UserData savedUserDTO = new UserData();
            BeanUtils.copyProperties(savedUser, savedUserDTO);
            return new ResponseEntity<>("Register Successfully", HttpStatus.OK);
        }

        if(Objects.equals(user.getSource(), RegisterModel.GOOGLE)){

            String email = user.getEmail();
            if (userRepository.existsByEmail(email)) {
                UserModel googleUser = userRepository.findByEmail(email);
                UserRegData userDto = new UserRegData();
                BeanUtils.copyProperties(googleUser, userDto);
                return  new ResponseEntity<>(userDto, HttpStatus.OK);
            }

            UserModel googleUser = new UserModel();
            googleUser.setName(user.getName());
            googleUser.setEmail(user.getEmail());
            googleUser.setProfileImage(user.getProfileImage());
            googleUser.setSource(RegisterModel.GOOGLE);
            try {
                userRepository.save(googleUser);
                UserRegData userDto = new UserRegData();
                BeanUtils.copyProperties(googleUser, userDto);
                return new ResponseEntity<>(userDto, HttpStatus.OK);
            } catch (DataIntegrityViolationException e) {
                return new ResponseEntity<>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return null;
    }

    @Override
    public UserData getUserById(String userId) {
        Optional<UserModel> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            UserData userDTO = new UserData();
            BeanUtils.copyProperties(optionalUser.get(), userDTO);
            return userDTO;
        }
        return null;
    }

    @Override
    public List<UserData> getAllUsers() {
        List<UserModel> users = userRepository.findAll();
        List<UserData> userDTOs = new ArrayList<>();
        for (UserModel user : users) {
            UserData userDTO = new UserData();
            BeanUtils.copyProperties(user, userDTO);
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }

    @Override
    public ResponseEntity<Object> followUser(String userId, String followedUserId) {
        try {
            UserModel user= userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

            UserModel followUser = userRepository.findById(followedUserId)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + followedUserId));

            if (user.getFollowedUsers() == null) {
                user.setFollowedUsers(new ArrayList<>());
            }

            if (followUser.getFollowingUsers() == null) {
                followUser.setFollowingUsers(new ArrayList<>());
            }


            if (user.getFollowedUsers().contains(followedUserId)) {
                user.getFollowedUsers().remove(followedUserId);
                followUser.getFollowingUsers().remove(userId);
                user.setFollowersCount(user.getFollowersCount() - 1);
                followUser.setFollowingCount(followUser.getFollowingCount() -1);
                userRepository.save(user);
                userRepository.save(followUser);
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                user.getFollowedUsers().add(followedUserId);
                followUser.getFollowingUsers().add(userId);
                user.setFollowersCount(user.getFollowersCount() + 1);
                followUser.setFollowingCount(followUser.getFollowingCount() + 1);
                userRepository.save(user);
                userRepository.save(followUser);
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ResponseEntity<Object> loginUser(String email, String password) {
        UserModel user = userRepository.findByEmail(email);

        if (user == null) {
            return new ResponseEntity<>("Invalid password or email", HttpStatus.UNAUTHORIZED);
        }
        if (passwordEncoder.matches(password, user.getPassword())) {
            UserRegData userDto = new UserRegData();
            BeanUtils.copyProperties(user, userDto);
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid password or email", HttpStatus.UNAUTHORIZED);
        }
    }
}
