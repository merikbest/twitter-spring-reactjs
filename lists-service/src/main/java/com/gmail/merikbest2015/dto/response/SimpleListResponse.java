package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SimpleListResponse {
    private Long id;
    private String listName;
    private String altWallpaper;
    private String wallpaper;

    @JsonProperty("isMemberInList")
    private boolean isMemberInList;

    @JsonProperty("isPrivate")
    private boolean isPrivate;
}
