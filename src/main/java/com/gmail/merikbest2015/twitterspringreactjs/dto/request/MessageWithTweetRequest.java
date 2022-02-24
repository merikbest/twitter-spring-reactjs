package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class MessageWithTweetRequest {
    private String text;
    private Long tweetId;
    private List<Long> usersIds;
}
