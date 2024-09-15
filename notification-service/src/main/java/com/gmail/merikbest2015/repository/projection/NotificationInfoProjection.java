package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.commons.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.commons.dto.response.user.UserResponse;
import com.gmail.merikbest2015.commons.enums.NotificationType;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface NotificationInfoProjection {
    Long getId();
    LocalDateTime getDate();
    NotificationType getNotificationType();

    @Value("#{target.user == null ? null : @notificationServiceHelper.getUserById(target.user.id)}")
    UserResponse getUser();

    @Value("#{target.tweet == null ? null : @notificationServiceHelper.getTweetById(target.tweet.id)}")
    TweetResponse getTweet();
}
