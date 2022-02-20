package com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageProjectionResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationUserProjectionResponse {
    private Long id;
    private String username;
    private ImageProjectionResponse avatar;
    private boolean isFollower;
}
