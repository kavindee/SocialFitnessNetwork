package com.JUN_WE_170.PAF.controller;



import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.JUN_WE_170.PAF.model.RegisterModel;
import com.JUN_WE_170.PAF.model.UserModel;
import com.JUN_WE_170.PAF.service.UserService;

@Controller
public class AuthCont {
    @Autowired
    private UserService userService;
    @GetMapping("/")
    public String home(@AuthenticationPrincipal OAuth2User principal) {
        System.out.println("/looooo" + principal);
        return "redirect:http://localhost:3000";
    }

    @GetMapping("/api/user")
    @ResponseBody
    public ResponseEntity<Object> getUsername(@AuthenticationPrincipal OAuth2User principal) {
        if (principal != null) {
            String name = principal.getAttribute("name");
            String email = principal.getAttribute("email");
            String picture = principal.getAttribute("picture");
            UserModel user = new UserModel();
            user.setEmail(email);
            user.setName(name);
            user.setProfileImage(picture);
            user.setSource(RegisterModel.GOOGLE);

            return userService.createUser(user);
        } else {
            return ResponseEntity.status(Response.SC_UNAUTHORIZED).build();
        }
    }
}