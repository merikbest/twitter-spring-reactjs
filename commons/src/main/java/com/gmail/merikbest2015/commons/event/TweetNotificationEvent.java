package com.gmail.merikbest2015.commons.event;

import com.gmail.merikbest2015.commons.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TweetNotificationEvent {
    private NotificationType notificationType;
    private boolean notificationCondition;
    private UserNotificationDto notifiedUser;
    private UserNotificationDto user;
    private TweetNotificationDto tweet;
}
