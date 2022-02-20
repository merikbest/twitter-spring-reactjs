package com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationTweetProjectionResponse {
    private Long id;
    private String text;
    private NotificationCommonUserProjectionResponse user;
    private boolean notificationCondition;

    @Getter
    @Setter
    static class NotificationCommonUserProjectionResponse {
        private Long id;
    }
}
