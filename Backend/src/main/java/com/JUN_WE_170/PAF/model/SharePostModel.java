package com.JUN_WE_170.PAF.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "shared_posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SharePostModel {
    @Id
    private String id;
    private UserModel sharedBy;
    private String userId;
    private PostModel post;
    private String description;
    private String shared;
}
