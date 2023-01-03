package com.gmail.merikbest2015.dto.request;

import com.gmail.merikbest2015.commons.dto.ImageResponse;
import com.gmail.merikbest2015.commons.dto.UserResponse;
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
