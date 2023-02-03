package com.gmail.merikbest2015.dto.request;

import lombok.Data;

@Data
public class UserRequest {
    private String username;
    private String about;
    private String location;
    private String website;
    private String avatar;
    private String wallpaper;
}
