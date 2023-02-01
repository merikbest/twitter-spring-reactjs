package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.dto.TweetResponse;
import com.gmail.merikbest2015.dto.UserResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface NotificationInfoProjection {
    Long getId();
    LocalDateTime getDate();
    NotificationType getNotificationType();
    Long getUserId();
    Long getTweetId();

    @Value("#{target.userId == null ? null : @notificationServiceImpl.getUserById(target.userId)}")
    UserResponse getUser();

    @Value("#{target.tweetId == null ? null : @notificationServiceImpl.getTweetById(target.tweetId)}")
    TweetResponse getTweet();
}
