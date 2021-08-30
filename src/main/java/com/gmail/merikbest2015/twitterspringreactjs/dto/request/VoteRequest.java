package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import lombok.Data;

@Data
public class VoteRequest {
    private Long tweetId;
    private Long pollChoiceId;
}
