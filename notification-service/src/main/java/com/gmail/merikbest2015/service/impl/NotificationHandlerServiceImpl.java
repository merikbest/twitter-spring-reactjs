package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.broker.producer.UserNotificationProducer;
import com.gmail.merikbest2015.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.event.FollowUserNotificationEvent;
import com.gmail.merikbest2015.event.ListsNotificationEvent;
import com.gmail.merikbest2015.event.TweetNotificationEvent;
import com.gmail.merikbest2015.event.TweetSubscriberNotificationEvent;
import com.gmail.merikbest2015.feign.WebSocketClient;
import com.gmail.merikbest2015.mapper.NotificationHandlerMapper;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.model.Notification;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.NotificationRepository;
import com.gmail.merikbest2015.service.ListsHandlerService;
import com.gmail.merikbest2015.service.NotificationHandlerService;
import com.gmail.merikbest2015.service.TweetHandlerService;
import com.gmail.merikbest2015.service.UserHandlerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.gmail.merikbest2015.constants.WebsocketConstants.*;

@Service
@RequiredArgsConstructor
public class NotificationHandlerServiceImpl implements NotificationHandlerService {

    private final NotificationRepository notificationRepository;
    private final UserNotificationProducer userNotificationProducer;
    private final UserHandlerService userHandlerService;
    private final ListsHandlerService listsHandlerService;
    private final TweetHandlerService tweetHandlerService;
    private final WebSocketClient webSocketClient;
    private final NotificationHandlerMapper notificationHandlerMapper;

    @Override
    @Transactional
    public void handleListsNotification(ListsNotificationEvent notificationEvent, String authId) {
        Long authUserId = Long.parseLong(authId);
        Optional<Notification> tweetNotification = notificationRepository.getListNotification(
                notificationEvent.getNotifiedUser().getId(),
                notificationEvent.getLists().getId(),
                authUserId,
                NotificationType.LISTS
        );
        if (!notificationEvent.getNotifiedUser().getId().equals(authUserId)) {
            if (tweetNotification.isEmpty()) {
                User notifiedUser = userHandlerService.getOrCreateUser(notificationEvent.getNotifiedUser());
                User user = userHandlerService.getOrCreateUser(notificationEvent.getUser());
                Lists list = listsHandlerService.getOrCreateList(notificationEvent.getLists());
                Notification newNotification = new Notification();
                newNotification.setNotificationType(NotificationType.LISTS);
                newNotification.setNotifiedUser(notifiedUser);
                newNotification.setUser(user);
                newNotification.setList(list);
                notificationRepository.save(newNotification);
                userNotificationProducer.increaseNotificationsCount(newNotification.getNotifiedUser().getId());
                NotificationResponse response = sendNotification(newNotification, notificationEvent.isNotificationCondition());
                webSocketClient.send(TOPIC_NOTIFICATIONS + notifiedUser.getId(), response);
                return;
            }
        }
        tweetNotification.ifPresent(notification ->
                sendNotification(notification, notificationEvent.isNotificationCondition()));
    }

    @Override
    @Transactional
    public void handleFollowUserNotification(FollowUserNotificationEvent notificationEvent, String authId) {
        Long authUserId = Long.parseLong(authId);
        Optional<Notification> tweetNotification = notificationRepository.getUserNotification(
                notificationEvent.getNotifiedUser().getId(),
                notificationEvent.getUserToFollow().getId(),
                authUserId,
                NotificationType.FOLLOW
        );
        if (!notificationEvent.getNotifiedUser().getId().equals(authUserId)) {
            if (tweetNotification.isEmpty()) {
                User notifiedUser = userHandlerService.getOrCreateUser(notificationEvent.getNotifiedUser());
                User user = userHandlerService.getOrCreateUser(notificationEvent.getUser());
                User follower = userHandlerService.getOrCreateUser(notificationEvent.getUserToFollow());
                Notification notification = new Notification();
                notification.setNotificationType(NotificationType.FOLLOW);
                notification.setNotifiedUser(notifiedUser);
                notification.setUser(user);
                notification.setUserToFollow(follower);
                notificationRepository.save(notification);
                userNotificationProducer.increaseNotificationsCount(notification.getNotifiedUser().getId());
                NotificationResponse notificationResponse = notificationHandlerMapper.convertToNotificationUserResponse(
                        notification, notificationEvent.isNotificationCondition());
                webSocketClient.send(TOPIC_NOTIFICATIONS + notificationResponse.getNotifiedUser().getId(), notificationResponse);
                return;
            }
        }
        tweetNotification.ifPresent(notification ->
                sendNotification(notification, notificationEvent.isNotificationCondition()));
    }

    @Override
    @Transactional
    public void handleTweetNotification(TweetNotificationEvent notificationEvent, String authId) {
        Long authUserId = Long.parseLong(authId);
        Optional<Notification> tweetNotification = notificationRepository.getTweetNotification(
                notificationEvent.getNotifiedUser().getId(),
                notificationEvent.getTweet().getId(),
                authUserId,
                notificationEvent.getNotificationType()
        );
        if (!notificationEvent.getNotifiedUser().getId().equals(authUserId)) {
            if (tweetNotification.isEmpty()) {
                User notifiedUser = userHandlerService.getOrCreateUser(notificationEvent.getNotifiedUser());
                User user = userHandlerService.getOrCreateUser(notificationEvent.getUser());
                Tweet tweet = tweetHandlerService.getOrCreateTweet(notificationEvent.getTweet());
                Notification newNotification = new Notification();
                newNotification.setNotificationType(notificationEvent.getNotificationType());
                newNotification.setNotifiedUser(notifiedUser);
                newNotification.setUser(user);
                newNotification.setTweet(tweet);
                notificationRepository.save(newNotification);
                userNotificationProducer.increaseNotificationsCount(newNotification.getNotifiedUser().getId());
                NotificationResponse response = sendNotification(newNotification, notificationEvent.isNotificationCondition());
                webSocketClient.send(TOPIC_NOTIFICATIONS + notifiedUser.getId(), response);
                return;
            }
        }
        tweetNotification.ifPresent(notification ->
                sendNotification(notification, notificationEvent.isNotificationCondition()));
    }

    @Override
    @Transactional
    public void tweetSubscriberNotification(TweetSubscriberNotificationEvent event) {
        Tweet tweet = tweetHandlerService.getOrCreateTweet(event.getTweet());
        User user = userHandlerService.getOrCreateUser(event.getUser());
        event.getSubscribers().stream()
                .map(userHandlerService::getOrCreateUser)
                .toList()
                .forEach(subscriber -> {
                    Notification notification = new Notification();
                    notification.setNotificationType(NotificationType.TWEET);
                    notification.setUser(user);
                    notification.setTweet(tweet);
                    notification.setNotifiedUser(subscriber);
                    notificationRepository.save(notification);
                    userNotificationProducer.increaseNotificationsCount(notification.getNotifiedUser().getId());
                });
    }

    private NotificationResponse sendNotification(Notification notification, boolean isTweetLiked) {
        NotificationResponse response = notificationHandlerMapper.convertToNotificationTweetResponse(notification, isTweetLiked);
        webSocketClient.send(TOPIC_FEED, response);
        webSocketClient.send(TOPIC_USER_UPDATE_TWEET, response);
        webSocketClient.send(TOPIC_TWEET + notification.getTweet().getId(), response);
        return response;
    }
}
