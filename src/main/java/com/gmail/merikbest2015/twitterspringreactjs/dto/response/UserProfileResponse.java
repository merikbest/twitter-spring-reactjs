package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
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
    private Long notificationsCount;
    private ImageResponse avatar;
    private ImageResponse wallpaper;
    private Integer pinnedTweetId;
    private Integer followersSize;
    private Integer followingSize;
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
