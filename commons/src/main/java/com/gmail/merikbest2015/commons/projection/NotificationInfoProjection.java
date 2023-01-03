package com.gmail.merikbest2015.commons.projection;

import com.gmail.merikbest2015.commons.enums.NotificationType;

import java.time.LocalDateTime;

public interface NotificationInfoProjection {
    Long getId();
    LocalDateTime getDate();
    NotificationType getNotificationType();
    UserProjection getUser();
    TweetProjection getTweet();
}
