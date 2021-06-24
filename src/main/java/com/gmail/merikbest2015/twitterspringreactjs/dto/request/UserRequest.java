package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TweetResponse;
import lombok.Data;

import java.util.List;

@Data
public class UserRequest {
    private Long id;
    private String email;
    private String fullName;
    private String username;
    private String location;
    private String about;
    private String website;
    private ImageResponse avatar;
    private ImageResponse wallpaper;
    private boolean confirmed;
    private List<TweetResponse> tweets;
    private List<UserRequest> followers;
    private List<UserRequest> following;
}
