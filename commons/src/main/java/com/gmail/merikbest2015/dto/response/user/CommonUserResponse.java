package com.gmail.merikbest2015.dto.response.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CommonUserResponse {
    private Long id;
    private String fullName;
    private String username;
    private String avatar;

    @JsonProperty("isPrivateProfile")
    private boolean privateProfile;
}
