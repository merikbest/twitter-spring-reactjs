package com.gmail.merikbest2015.dto.response;

import lombok.Data;

@Data
public class TweetImageResponse {
    private Long tweetId;
    private Long imageId;
    private String src;
}
