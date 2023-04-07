package com.gmail.merikbest2015.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserProfileResponse {
    private Long id;
    private String fullName;
    private String username;
    private String location;
    private String about;
    private String website;
    private String country;
    private String birthday;
    private LocalDateTime registrationDate;
    private Long tweetCount;
    private Long mediaTweetCount;
    private Long likeCount;
    private String avatar;
    private String wallpaper;
    private Long pinnedTweetId;
    private Long followersSize;
    private Long followingSize;
    private List<SameFollowerResponse> sameFollowers;

    @JsonProperty("isMutedDirectMessages")
    private boolean mutedDirectMessages;

    @JsonProperty("isPrivateProfile")
    private boolean privateProfile;

    @JsonProperty("isUserMuted")
    private boolean isUserMuted;

    @JsonProperty("isUserBlocked")
    private boolean isUserBlocked;

    @JsonProperty("isMyProfileBlocked")
    private boolean isMyProfileBlocked;

    @JsonProperty("isWaitingForApprove")
    private boolean isWaitingForApprove;

    @JsonProperty("isFollower")
    private boolean isFollower;

    @JsonProperty("isSubscriber")
    private boolean isSubscriber;
}
