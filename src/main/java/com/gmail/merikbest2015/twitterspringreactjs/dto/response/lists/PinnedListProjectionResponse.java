package com.gmail.merikbest2015.twitterspringreactjs.dto.response.lists;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageProjectionResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PinnedListProjectionResponse {
    private Long id;
    private String name;
    private String altWallpaper;
    private ImageProjectionResponse wallpaper;
}
