package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.notification;

import com.gmail.merikbest2015.twitterspringreactjs.model.NotificationType;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.tweet.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.UserProjection;

import java.time.LocalDateTime;

public interface NotificationInfoProjection {
    Long getId();
    LocalDateTime getDate();
    NotificationType getNotificationType();
    UserProjection getUser();
    TweetProjection getTweet();
}
