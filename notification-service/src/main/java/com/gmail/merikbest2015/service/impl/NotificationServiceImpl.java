package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.broker.producer.UserNotificationProducer;
import com.gmail.merikbest2015.commons.dto.request.IdsRequest;
import com.gmail.merikbest2015.commons.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.commons.dto.response.tweet.TweetResponse;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.client.TweetClient;
import com.gmail.merikbest2015.client.UserClient;
import com.gmail.merikbest2015.constants.NotificationErrorMessage;
import com.gmail.merikbest2015.repository.NotificationRepository;
import com.gmail.merikbest2015.repository.projection.NotificationInfoProjection;
import com.gmail.merikbest2015.repository.projection.NotificationProjection;
import com.gmail.merikbest2015.service.NotificationService;
import com.gmail.merikbest2015.commons.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserNotificationProducer userNotificationProducer;
    private final UserClient userClient;
    private final TweetClient tweetClient;

    @Override
    @Transactional
    public Page<NotificationProjection> getUserNotifications(Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        userNotificationProducer.resetNotificationCount(authUserId);
        return notificationRepository.getNotificationsByUserId(authUserId, pageable);
    }

    @Override
    @Transactional
    public Page<TweetResponse> getUserMentionsNotifications(Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        userNotificationProducer.resetMentionCount(authUserId);
        Page<Long> tweetIds = notificationRepository.getTweetNotificationMentionIds(authUserId, pageable);
        return getTweetResponses(tweetIds, pageable);
    }

    @Override
    @Transactional
    public List<NotificationUserResponse> getTweetAuthorsNotifications() {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        userNotificationProducer.resetNotificationCount(authUserId);
        return userClient.getUsersWhichUserSubscribed();
    }

    @Override
    public NotificationInfoProjection getUserNotificationById(Long notificationId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return notificationRepository.getUserNotificationById(authUserId, notificationId)
                .orElseThrow(() -> new ApiRequestException(NotificationErrorMessage.NOTIFICATION_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    public Page<TweetResponse> getNotificationsFromTweetAuthors(Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        List<Long> userIds = userClient.getUserIdsWhichUserSubscribed();
        Page<Long> tweetIds = notificationRepository.getTweetIdsByNotificationType(userIds, authUserId, pageable);
        return getTweetResponses(tweetIds, pageable);
    }

    private Page<TweetResponse> getTweetResponses(Page<Long> tweetIds, Pageable pageable) {
        List<TweetResponse> tweets = tweetClient.getTweetsByIds(new IdsRequest(tweetIds.getContent()));
        PagedListHolder<TweetResponse> page = new PagedListHolder<>(tweets);
        page.setPage(pageable.getPageNumber());
        page.setPageSize(pageable.getPageSize());
        return new PageImpl<>(page.getPageList(), pageable, tweets.size());
    }
}
