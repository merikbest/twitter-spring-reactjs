package com.gmail.merikbest2015.dto.response.tweet;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.dto.response.user.CommonUserResponse;
import lombok.Data;

@Data
public class TweetListResponse {
    private Long id;
    private String name;
    private String altWallpaper;
    private String wallpaper;
    private CommonUserResponse listOwner;
    private Long membersSize;
    @JsonProperty("isPrivate")
    private boolean isPrivate;
}
