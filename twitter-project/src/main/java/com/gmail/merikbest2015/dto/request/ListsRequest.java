package com.gmail.merikbest2015.dto.request;

import lombok.Data;

@Data
public class ListsRequest {
    private Long id;
    private String name;
    private String description;
    private Boolean isPrivate;
    private UserResponse listOwner;
    private String altWallpaper;
    private ImageResponse wallpaper;
}
