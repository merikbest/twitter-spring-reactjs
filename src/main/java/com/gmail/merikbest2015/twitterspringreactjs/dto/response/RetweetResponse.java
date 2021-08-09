package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RetweetResponse {
    private Long id;
    private LocalDateTime retweetDate;
    private UserResponse user;
}
