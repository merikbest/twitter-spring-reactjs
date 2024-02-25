package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.dto.response.user.CommonUserResponse;
import lombok.Data;

@Data
public class ListUserResponse {
    private Long id;
    private String listName;
    private String description;
    private String altWallpaper;
    private String wallpaper;
    private CommonUserResponse listOwner;

    @JsonProperty("isPrivate")
    private boolean isPrivate;

    @JsonProperty("isListPinned")
    private boolean isListPinned;
}
