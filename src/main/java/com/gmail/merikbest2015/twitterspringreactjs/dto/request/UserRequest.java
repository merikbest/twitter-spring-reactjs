package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import lombok.Data;

@Data
public class UserRequest {
    private String username;
    private String about;
    private String location;
    private String website;
    private ImageResponse avatar;
    private ImageResponse wallpaper;
}
