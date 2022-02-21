package com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationUserResponse {
    private Long id;
    private String username;
    private ImageResponse avatar;
    private boolean isFollower;
}
