package com.gmail.merikbest2015.dto.notification;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationTweetResponse {
    private Long id;
    private String text;
    private Long authorId;
    private boolean notificationCondition;
}
