package com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.lists;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.ImageProjectionResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ListProjectionResponse {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime pinnedDate;
    private String altWallpaper;
    private ImageProjectionResponse wallpaper;
    private ListOwnerProjectionResponse listOwner;
    private boolean follower;
}
