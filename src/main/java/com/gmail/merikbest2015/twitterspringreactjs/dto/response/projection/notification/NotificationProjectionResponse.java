package com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.notification;

import com.gmail.merikbest2015.twitterspringreactjs.model.NotificationType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class NotificationProjectionResponse {
    private Long id;
    private LocalDateTime date;
    private NotificationType notificationType;
    private NotificationUserProjectionResponse user;
    private NotificationUserProjectionResponse userToFollow;
    private NotificationsProjectionResponse.NotificationTweetProjectionResponse tweet;
}
