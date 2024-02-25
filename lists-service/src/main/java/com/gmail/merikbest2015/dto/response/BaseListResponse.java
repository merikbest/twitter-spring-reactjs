package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.dto.response.user.CommonUserResponse;
import lombok.Data;

@Data
public class BaseListResponse {
    private Long id;
    private String listName;
    private String description;
    private String altWallpaper;
    private String wallpaper;
    private CommonUserResponse listOwner;
    private Long membersSize;
    private Long followersSize;

    @JsonProperty("isPrivate")
    private boolean isPrivate;

    @JsonProperty("isFollower")
    private boolean isFollower;
}
