package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class BaseUserProjectionResponse {
    private Long id;
    private String fullName;
    private String username;
    private String about;
    private Map<String, Object> avatar;
    private boolean isPrivateProfile;
    private boolean isUserBlocked;
    private boolean isMyProfileBlocked;
    private boolean isWaitingForApprove;
    private boolean isFollower;
}
