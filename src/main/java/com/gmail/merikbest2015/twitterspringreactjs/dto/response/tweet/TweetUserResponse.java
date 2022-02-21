package com.gmail.merikbest2015.twitterspringreactjs.dto.response.tweet;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TweetUserResponse {
    private Long id;
    private String email;
    private String fullName;
    private String username;
    private ImageResponse avatar;
}
