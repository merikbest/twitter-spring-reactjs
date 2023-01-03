package com.gmail.merikbest2015.commons.projection;

import com.gmail.merikbest2015.commons.enums.NotificationType;

import java.time.LocalDateTime;

public interface NotificationProjection {
    Long getId();
    LocalDateTime getDate();
    NotificationType getNotificationType();
    NotificationUserProjection getUser();
    NotificationUserProjection getUserToFollow();
    NotificationTweetProjection getTweet();
    NotificationListProjection getList();

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

    interface NotificationListProjection {
        Long getId();
        String getName();
    }
}
