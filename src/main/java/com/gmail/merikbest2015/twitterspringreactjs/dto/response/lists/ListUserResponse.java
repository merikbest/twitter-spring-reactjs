package com.gmail.merikbest2015.twitterspringreactjs.dto.response.lists;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ListUserResponse {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime pinnedDate;
    private String altWallpaper;
    private ImageResponse wallpaper;
    private ListOwnerResponse listOwner;

    @JsonProperty("isPrivate")
    private boolean isPrivate;
}
