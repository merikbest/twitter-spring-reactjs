package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.notification;

import com.gmail.merikbest2015.twitterspringreactjs.model.NotificationType;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.ImageProjection;

import java.time.LocalDateTime;

public interface NotificationProjection {
    Notification getNotification();

    interface Notification {
        Long getId();
        LocalDateTime getDate();
        NotificationType getNotificationType();
        NotificationUserProjection getUser();
        NotificationUserProjection getUserToFollow();
        NotificationTweetProjection getTweet();
    }

    interface NotificationUserProjection {
        Long getId();
        String getUsername();
        ImageProjection getAvatar();
    }

    interface NotificationTweetProjection {
        Long getId();
        String getText();
        NotificationUserProjection getUser();
    }
}
