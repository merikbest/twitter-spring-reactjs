package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MutedUserProjectionResponse {
    private Long id;
    private String fullName;
    private String username;
    private String about;
    private ImageProjectionResponse avatar;
    private boolean isPrivateProfile;
    private boolean isUserMuted;
}
