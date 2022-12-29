package com.gmail.merikbest2015.dto.request;

import lombok.Data;

@Data
public class VoteRequest {
    private Long tweetId;
    private Long pollId;
    private Long pollChoiceId;
}
