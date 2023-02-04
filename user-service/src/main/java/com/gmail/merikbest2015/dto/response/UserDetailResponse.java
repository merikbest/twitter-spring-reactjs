package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class UserDetailResponse {
    private Long id;
    private String fullName;
    private String username;
    private String about;
    private String avatar;
    private Long followersSize;
    private Long followingSize;
    private List<SameFollowerResponse> sameFollowers;

    @JsonProperty("isPrivateProfile")
    private boolean isPrivateProfile;

    @JsonProperty("isUserBlocked")
    private boolean isUserBlocked;

    @JsonProperty("isMyProfileBlocked")
    private boolean isMyProfileBlocked;

    @JsonProperty("isWaitingForApprove")
    private boolean isWaitingForApprove;

    @JsonProperty("isFollower")
    private boolean isFollower;
}
