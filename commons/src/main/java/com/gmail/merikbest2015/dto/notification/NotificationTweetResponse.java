package com.gmail.merikbest2015.dto.notification;

import lombok.Data;

@Data
public class NotificationTweetResponse {
    private Long id;
    private String text;
    private Long authorId;
    private boolean notificationCondition;
}
