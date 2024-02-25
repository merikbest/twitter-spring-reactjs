package com.gmail.merikbest2015.dto.request;

import lombok.Data;

@Data
public class ListsRequest {
    private Long id;
    private String listName;
    private String description;
    private Boolean isPrivate;
    private String altWallpaper;
    private String wallpaper;
}
