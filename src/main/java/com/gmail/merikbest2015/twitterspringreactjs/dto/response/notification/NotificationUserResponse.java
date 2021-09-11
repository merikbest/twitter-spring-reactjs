package com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.FollowerResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import lombok.Data;

import java.util.List;

@Data
public class NotificationUserResponse {
    private Long id;
    private String email;
    private String fullName;
    private String username;
    private String about;
    private ImageResponse avatar;
    private List<FollowerResponse> followers;
    private List<FollowerResponse> following;
}
