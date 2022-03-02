package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.twitterspringreactjs.model.BackgroundColorType;
import com.gmail.merikbest2015.twitterspringreactjs.model.ColorSchemeType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class AuthUserResponse {
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
    private LocalDateTime registrationDate;
    private Long tweetCount;
    private Long mediaTweetCount;
    private Long likeCount;
    private Long notificationsCount;
    private boolean active;
    private boolean profileCustomized;
    private boolean profileStarted;
    @JsonProperty("isMutedDirectMessages")
    private boolean mutedDirectMessages;
    @JsonProperty("isPrivateProfile")
    private boolean privateProfile;
    private BackgroundColorType backgroundColor;
    private ColorSchemeType colorScheme;
    private ImageResponse avatar;
    private ImageResponse wallpaper;
    private Integer pinnedTweetId;
    private Integer followersSize;
    private Integer followingSize;
    private Integer followerRequestsSize;
    private Integer unreadMessagesSize;
}
