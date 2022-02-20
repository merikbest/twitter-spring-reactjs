package com.gmail.merikbest2015.twitterspringreactjs.dto.response.lists;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageProjectionResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ListUserProjectionResponse {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime pinnedDate;
    private String altWallpaper;
    private ImageProjectionResponse wallpaper;
    private ListOwnerProjectionResponse listOwner;
//    private boolean private;
}
