package com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NotificationsResponse {
    private List<NotificationResponse> notifications;
    private List<NotificationUserResponse> tweetAuthors;
}
