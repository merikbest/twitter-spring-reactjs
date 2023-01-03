package com.gmail.merikbest2015.commons.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationTweetResponse {
    private Long id;
    private String text;
    private NotificationCommonUserResponse user;
    private boolean notificationCondition;
}
