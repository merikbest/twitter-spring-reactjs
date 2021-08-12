package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TweetReplyResponse {
    private Long id;
    private String text;
    private String addressedUsername;
    private Long addressedId;
    private LocalDateTime dateTime;
    private List<ImageResponse> images;
    private List<UserResponse> retweets;
    private List<UserResponse> likedTweets;
    private UserResponse user;
}
