package com.gmail.merikbest2015.commons.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TweetTagEvent {
    private Long tweetId;
    private String tweetText;
}
