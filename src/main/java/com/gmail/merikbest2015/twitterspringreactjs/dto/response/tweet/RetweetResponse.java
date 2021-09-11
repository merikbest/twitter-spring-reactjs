package com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RetweetResponse {
    private Long id;
    private LocalDateTime retweetDate;
    private UserResponse user;
}
