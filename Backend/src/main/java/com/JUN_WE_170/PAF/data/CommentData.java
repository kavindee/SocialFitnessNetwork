package com.JUN_WE_170.PAF.data;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentData {
    private String content;
    private String commentBy;
    private String commentById;
    private String commentByProfile;
}
