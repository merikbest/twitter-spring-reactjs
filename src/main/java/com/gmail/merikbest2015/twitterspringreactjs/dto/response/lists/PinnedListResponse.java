package com.gmail.merikbest2015.twitterspringreactjs.dto.response.lists;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PinnedListResponse {
    private Long id;
    private String name;
    private String altWallpaper;
    private ImageResponse wallpaper;
}
