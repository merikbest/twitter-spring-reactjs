package com.gmail.merikbest2015.repository.projection.notification;

import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.repository.projection.tweet.TweetProjection;
import com.gmail.merikbest2015.repository.projection.user.UserProjection;

import java.time.LocalDateTime;

public interface NotificationInfoProjection {
    Long getId();
    LocalDateTime getDate();
    NotificationType getNotificationType();
    UserProjection getUser();
    TweetProjection getTweet();
}
