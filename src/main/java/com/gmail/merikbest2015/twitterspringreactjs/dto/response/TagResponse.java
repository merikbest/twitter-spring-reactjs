package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class TagResponse {
    private Long id;
    private String tagName;
    private Long tweetsCount;
    private List<TweetResponse> tweets;
}
