package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import com.gmail.merikbest2015.twitterspringreactjs.dto.Views;
import lombok.Data;

import java.util.List;

@Data
public class UserResponse {

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private Long id;

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private String email;

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private String fullName;

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private String username;

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private String location;

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private String about;

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private String website;

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private ImageResponse avatar;

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private ImageResponse wallpaper;

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private boolean confirmed;

    @JsonView({Views.User.class, Views.UserInfo.class})
    private List<TweetResponse> tweets;
}
