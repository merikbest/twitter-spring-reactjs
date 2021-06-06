package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TweetResponse {
    private Long id;
    private String text;
    private LocalDateTime dateTime;
}
