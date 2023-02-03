package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MutedUserResponse {
    private Long id;
    private String fullName;
    private String username;
    private String about;
    private String avatar;

    @JsonProperty("isPrivateProfile")
    private boolean isPrivateProfile;

    @JsonProperty("isUserMuted")
    private boolean isUserMuted;
}
