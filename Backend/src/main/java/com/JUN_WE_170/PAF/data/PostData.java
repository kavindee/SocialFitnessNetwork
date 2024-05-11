package com.JUN_WE_170.PAF.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostData {
    private String id;
    private String title;
    private String date;
    private List<String> images;
    private String video;
    private String description;
}
