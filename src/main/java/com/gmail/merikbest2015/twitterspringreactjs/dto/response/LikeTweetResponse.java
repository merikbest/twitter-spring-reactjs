package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LikeTweetResponse {
    private Long id;
    private LocalDateTime likeTweetDate;
    private UserResponse user;
}
