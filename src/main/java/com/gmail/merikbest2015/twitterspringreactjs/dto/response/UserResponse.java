package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserResponse {
    private Long id;
    private String email;
    private String fullName;
    private String username;
    private String location;
    private String about;
    private String website;
    private String birthday;
    private LocalDateTime registrationDate;
    private Long tweetCount;
    private PinnedTweetResponse pinnedTweet;
    private ImageResponse avatar;
    private ImageResponse wallpaper;
    private boolean profileCustomized;
    private boolean profileStarted;
    private List<FollowerResponse> followers;
    private List<FollowerResponse> following;
}
