package com.gmail.merikbest2015.event;

import com.gmail.merikbest2015.enums.NotificationType;
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
    private UserNotificationEvent notifiedUser;
    private UserNotificationEvent user;
    private Tweet tweet;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Tweet {
        private Long id;
        private String text;
        private UserNotificationEvent author;
    }
}
