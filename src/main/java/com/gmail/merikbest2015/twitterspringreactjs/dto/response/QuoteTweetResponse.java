package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class QuoteTweetResponse {
    private Long id;
    private String text;
    private UserResponse user;
    private LocalDateTime dateTime;
}
