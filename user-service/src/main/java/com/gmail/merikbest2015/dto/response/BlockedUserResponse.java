package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.dto.ImageResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BlockedUserResponse {
    private Long id;
    private String fullName;
    private String username;
    private String about;
    private ImageResponse avatar;

    @JsonProperty("isPrivateProfile")
    private boolean isPrivateProfile;

    @JsonProperty("isUserBlocked")
    private boolean isUserBlocked;
}
