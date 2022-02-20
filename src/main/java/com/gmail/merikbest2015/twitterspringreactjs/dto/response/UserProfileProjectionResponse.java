package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserProfileProjectionResponse {
    private Long id;
    private String fullName;
    private String username;
    private String location;
    private String about;
    private String website;
    private String country;
    private String birthday;
    private Long tweetCount;
    private Long mediaTweetCount;
    private Long likeCount;
    private Long notificationsCount;
    private boolean mutedDirectMessages;
    private boolean privateProfile;
    private ImageProjectionResponse avatar;
    private ImageProjectionResponse wallpaper;
    private Integer pinnedTweetId;
    private Integer followersSize;
    private Integer followingSize;
    private boolean isUserMuted;
    private boolean isUserBlocked;
    private boolean isMyProfileBlocked;
    private boolean isWaitingForApprove;
    private boolean isFollower;
    private List<SameFollowerResponse> sameFollowers;
}
