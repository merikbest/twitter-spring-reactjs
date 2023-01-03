package com.gmail.merikbest2015.commons.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationUserResponse {
    private Long id;
    private String username;
    private String fullName;
    private ImageResponse avatar;

    @JsonProperty("isFollower")
    private boolean isFollower;
}
