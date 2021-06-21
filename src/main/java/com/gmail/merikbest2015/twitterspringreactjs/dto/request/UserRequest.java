package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import com.fasterxml.jackson.annotation.JsonView;
import com.gmail.merikbest2015.twitterspringreactjs.dto.Views;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TweetResponse;
import lombok.Data;

import java.util.List;

@Data
public class UserRequest {

    @JsonView({Views.User.class, Views.Tweet.class})
    private String email;

    @JsonView({Views.User.class, Views.Tweet.class})
    private String fullName;

    @JsonView({Views.User.class, Views.Tweet.class})
    private String username;

    @JsonView({Views.User.class, Views.Tweet.class})
    private String location;

    @JsonView({Views.User.class, Views.Tweet.class})
    private String about;

    @JsonView({Views.User.class, Views.Tweet.class})
    private String website;

    @JsonView({Views.User.class, Views.Tweet.class})
    private ImageResponse avatar;

    @JsonView({Views.User.class, Views.Tweet.class})
    private ImageResponse wallpaper;

    @JsonView({Views.User.class, Views.Tweet.class})
    private boolean confirmed;

    @JsonView(Views.User.class)
    private List<TweetResponse> tweets;
}
