package com.gmail.merikbest2015.twitterspringreactjs.dto.response.notification;

import lombok.Data;

import java.util.List;

@Data
public class NotificationsResponse {
    private List<NotificationResponse> notifications;
    private List<NotificationUserResponse> tweetAuthors;
}
