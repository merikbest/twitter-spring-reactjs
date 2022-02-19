package com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.notification;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NotificationsProjectionResponse {
    private List<NotificationProjectionResponse> notifications;
    private List<NotificationUserProjectionResponse> tweetAuthors;

    @Getter
    @Setter
    static class NotificationTweetProjectionResponse {
        private Long id;
        private String text;
        NotificationUserProjectionResponse user;
    }
}
