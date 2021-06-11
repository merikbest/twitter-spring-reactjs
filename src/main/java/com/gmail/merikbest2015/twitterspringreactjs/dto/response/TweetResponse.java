package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import com.gmail.merikbest2015.twitterspringreactjs.dto.Views;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TweetResponse {

    @JsonView({Views.User.class, Views.Tweet.class})
    private Long id;

    @JsonView({Views.User.class, Views.Tweet.class})
    private String text;

    @JsonView({Views.User.class, Views.Tweet.class})
    private LocalDateTime dateTime;

    @JsonView(Views.Tweet.class)
    private UserResponse user;
}
