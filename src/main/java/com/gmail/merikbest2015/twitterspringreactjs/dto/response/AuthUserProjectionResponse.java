package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import com.gmail.merikbest2015.twitterspringreactjs.model.BackgroundColorType;
import com.gmail.merikbest2015.twitterspringreactjs.model.ColorSchemeType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthUserProjectionResponse {
    private Long id;
    private String email;
    private String fullName;
    private String username;
    private String location;
    private String about;
    private String website;
    private String countryCode;
    private Long phone;
    private String country;
    private String gender;
    private String language;
    private String birthday;
    private Long tweetCount;
    private Long mediaTweetCount;
    private Long likeCount;
    private Long notificationsCount;
    private boolean active;
    private boolean profileCustomized;
    private boolean profileStarted;
    private boolean mutedDirectMessages;
    private boolean privateProfile;
    private BackgroundColorType backgroundColor;
    private ColorSchemeType colorScheme;
    private ImageProjectionResponse avatar;
    private ImageProjectionResponse wallpaper;
    private Integer pinnedTweetId;
    private Integer followersSize;
    private Integer followingSize;
    private Integer followerRequestsSize;
}
