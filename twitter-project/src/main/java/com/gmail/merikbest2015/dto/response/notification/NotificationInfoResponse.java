package com.gmail.merikbest2015.dto.response.notification;

import com.gmail.merikbest2015.dto.response.UserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NotificationInfoResponse {
    private Long id;
    private LocalDateTime date;
    private NotificationType notificationType;
    private UserResponse user;
    private TweetResponse tweet;
}
