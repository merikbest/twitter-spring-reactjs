package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import lombok.Data;

@Data
public class ListsRequest {
    private String name;
    private String description;
    private boolean isPrivate;
    private String altWallpaper;
    private ImageResponse wallpaper;
}
