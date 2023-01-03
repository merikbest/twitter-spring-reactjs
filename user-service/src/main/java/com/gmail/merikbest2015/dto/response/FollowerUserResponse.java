package com.gmail.merikbest2015.dto.response;

import com.gmail.merikbest2015.commons.dto.ImageResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FollowerUserResponse {
    private Long id;
    private String fullName;
    private String username;
    private String about;
    private ImageResponse avatar;
}
