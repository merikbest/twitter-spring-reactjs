package com.gmail.merikbest2015.dto.request;

import com.gmail.merikbest2015.commons.dto.ImageResponse;
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
