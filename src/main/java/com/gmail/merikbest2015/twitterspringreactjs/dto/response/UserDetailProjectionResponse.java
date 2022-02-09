package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class UserDetailProjectionResponse {
    private Long id;
    private String fullName;
    private String username;
    private String about;
    private ImageProjectionResponse avatar;
    private boolean isPrivateProfile;
    private boolean isUserBlocked;
    private boolean isMyProfileBlocked;
    private boolean isWaitingForApprove;
    private boolean isFollower;
    private Integer followersSize;
    private Integer followingSize;
    private List<SameFollowerResponse> sameFollowers;

    @Getter
    @Setter
    static class SameFollowerResponse {
        private Long id;
        private String fullName;
        private Map<String, Object> avatar;
    }
}
