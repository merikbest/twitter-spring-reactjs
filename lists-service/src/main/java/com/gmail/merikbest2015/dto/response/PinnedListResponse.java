package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.dto.ImageResponse;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PinnedListResponse {
    private Long id;
    private String name;
    private LocalDateTime pinnedDate;
    private String altWallpaper;
    private ImageResponse wallpaper;

    @JsonProperty("isPrivate")
    private boolean isPrivate;
}
