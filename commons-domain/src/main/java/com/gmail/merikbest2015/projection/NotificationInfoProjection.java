package com.gmail.merikbest2015.projection;

import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.projection.TweetProjection;

import java.time.LocalDateTime;

public interface NotificationInfoProjection {
    Long getId();
    LocalDateTime getDate();
    NotificationType getNotificationType();
    UserProjection getUser();
    TweetProjection getTweet();
}
