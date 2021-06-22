package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import com.gmail.merikbest2015.twitterspringreactjs.dto.Views;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TweetResponse {

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private Long id;

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private String text;

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private LocalDateTime dateTime;

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private List<ImageResponse> images;

    @JsonView({Views.Tweet.class})
    private List<UserResponse> likes;

    @JsonView(Views.Tweet.class)
    private UserResponse user;
}
