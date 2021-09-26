package com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification;

import com.gmail.merikbest2015.twitterspringreactjs.model.NotificationType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationResponse {
    private Long id;
    private LocalDateTime date;
    private NotificationType notificationType;
    private NotificationUserResponse user;
    private NotificationUserResponse userToFollow;
    private NotificationTweetResponse tweet;
}
