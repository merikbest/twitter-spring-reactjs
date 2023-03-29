package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.repository.projection.NotificationInfoProjection;
import com.gmail.merikbest2015.repository.projection.NotificationProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NotificationService {

    Page<NotificationProjection> getUserNotifications(Pageable pageable);

    Page<TweetResponse> getUserMentionsNotifications(Pageable pageable);

    List<NotificationUserResponse> getTweetAuthorsNotifications();

    NotificationInfoProjection getUserNotificationById(Long notificationId);

    Page<TweetResponse> getNotificationsFromTweetAuthors(Pageable pageable);
}
