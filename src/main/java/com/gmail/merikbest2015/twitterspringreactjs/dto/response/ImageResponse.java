package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import com.fasterxml.jackson.annotation.JsonView;
import com.gmail.merikbest2015.twitterspringreactjs.dto.Views;
import lombok.Data;

@Data
public class ImageResponse {

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private Long id;

    @JsonView({Views.User.class, Views.Tweet.class, Views.UserInfo.class})
    private String src;
}
