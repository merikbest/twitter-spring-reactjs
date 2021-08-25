package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class NotificationTweetResponse {
    private Long id;
    private String text;
    private LocalDateTime dateTime;
    private String addressedUsername;
    private Long addressedId;
    private NotificationUserResponse user;
    private List<ImageResponse> images;
    private List<LikeTweetResponse> likedTweets;
    private List<RetweetResponse> retweets;
    private List<TweetReplyResponse> replies;
}
