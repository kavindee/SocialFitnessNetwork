package com.JUN_WE_170.PAF.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.JUN_WE_170.PAF.model.RegisterModel;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRegData {

    private String id;

    private String name;

    private String email;

    private String profileImage;

    private RegisterModel source;

    private List<String> followedUsers;
}
