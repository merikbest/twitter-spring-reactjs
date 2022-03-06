package com.gmail.merikbest2015.twitterspringreactjs.dto.response.lists;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimpleListResponse {
    private Long id;
    private String name;
    private String altWallpaper;
    private ImageResponse wallpaper;

    @JsonProperty("isMemberInList")
    private boolean isMemberInList;

    @JsonProperty("isPrivate")
    private boolean isPrivate;
}
