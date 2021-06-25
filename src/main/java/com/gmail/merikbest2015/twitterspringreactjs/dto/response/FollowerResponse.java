package com.gmail.merikbest2015.twitterspringreactjs.dto.response;

import lombok.Data;

@Data
public class FollowerResponse {
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
}
