package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PinnedListResponse {
    private Long id;
    private String listName;
    private String altWallpaper;
    private String wallpaper;

    @JsonProperty("isPrivate")
    private boolean isPrivate;

    @JsonProperty("isListPinned")
    private boolean isListPinned;
}
