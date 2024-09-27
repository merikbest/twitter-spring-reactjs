package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.commons.constants.WebsocketConstants;
import com.gmail.merikbest2015.commons.dto.response.notification.NotificationListResponse;
import com.gmail.merikbest2015.commons.dto.response.notification.NotificationResponse;
import com.gmail.merikbest2015.commons.dto.response.notification.NotificationTweetResponse;
import com.gmail.merikbest2015.commons.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.commons.enums.NotificationType;
import com.gmail.merikbest2015.commons.event.*;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.model.Notification;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.service.AbstractServiceTest;
import com.gmail.merikbest2015.service.NotificationHandlerService;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

public class NotificationHandlerServiceImplTest extends AbstractServiceTest {

    @Autowired
    private NotificationHandlerService notificationHandlerService;

    @Test
    public void handleListsNotification() {
        ListsNotificationEvent event = ListsNotificationEvent.builder()
                .notifiedUser(mockNotifiedUserDto())
                .user(mockUserDto())
                .lists(ListsNotificationDto.builder()
                        .id(TestConstants.LIST_ID)
                        .listName(TestConstants.LIST_NAME)
                        .build())
                .notificationCondition(true)
                .build();
        Notification notification = mockNotification(NotificationType.LISTS, event.getNotifiedUser(), event.getUser());
        notification.setList(mockLists(event.getLists()));
        NotificationResponse response = mockNotificationListResponse();
        when(notificationRepository.isNotificationExists(
                event.getNotifiedUser().getId(), event.getUser().getId(), NotificationType.LISTS, event.getLists().getId()
        )).thenReturn(false);
        when(userRepository.findById(event.getNotifiedUser().getId())).thenReturn(Optional.of(notification.getNotifiedUser()));
        when(userRepository.findById(event.getUser().getId())).thenReturn(Optional.of(notification.getUser()));
        when(listsRepository.findById(event.getLists().getId())).thenReturn(Optional.of(notification.getList()));
        when(notificationHandlerMapper.convertToNotificationListResponse(notification, event.isNotificationCondition()))
                .thenReturn(response);
        notificationHandlerService.handleListsNotification(event);
        verify(notificationRepository, times(1)).save(notification);
        verify(userNotificationProducer, times(1)).increaseNotificationsCount(notification.getNotifiedUser().getId());
        verify(notificationHandlerMapper, times(1)).convertToNotificationListResponse(
                notification, event.isNotificationCondition());
        verify(webSocketClient, times(1)).send(WebsocketConstants.TOPIC_NOTIFICATIONS + response.getNotifiedUser().getId(), response);
    }

    @Test
    public void handleFollowUserNotification() {
        FollowUserNotificationEvent event = FollowUserNotificationEvent.builder()
                .notifiedUser(mockNotifiedUserDto())
                .user(mockUserDto())
                .userToFollow(mockUserDto())
                .notificationCondition(true)
                .build();
        Notification notification = mockNotification(NotificationType.FOLLOW, event.getNotifiedUser(), event.getUser());
        notification.setUserToFollow(mockUser(event.getUserToFollow()));
        NotificationResponse response = mockNotificationFollowerResponse();
        when(notificationRepository.isNotificationExists(
                event.getNotifiedUser().getId(), event.getUser().getId(), NotificationType.FOLLOW, event.getUserToFollow().getId()
        )).thenReturn(false);
        when(userRepository.findById(event.getNotifiedUser().getId())).thenReturn(Optional.of(notification.getNotifiedUser()));
        when(userRepository.findById(event.getUser().getId())).thenReturn(Optional.of(notification.getUser()));
        when(userRepository.findById(event.getUserToFollow().getId())).thenReturn(Optional.of(notification.getUserToFollow()));
        when(notificationHandlerMapper.convertToNotificationUserResponse(notification, event.isNotificationCondition()))
                .thenReturn(response);
        notificationHandlerService.handleFollowUserNotification(event);
        verify(notificationRepository, times(1)).save(notification);
        verify(userNotificationProducer, times(1)).increaseNotificationsCount(notification.getNotifiedUser().getId());
        verify(notificationHandlerMapper, times(1)).convertToNotificationUserResponse(
                notification, event.isNotificationCondition());
        verify(webSocketClient, times(1)).send(WebsocketConstants.TOPIC_NOTIFICATIONS + response.getNotifiedUser().getId(), response);
    }

    @Test
    public void handleTweetNotification() {
        TweetNotificationEvent event = TweetNotificationEvent.builder()
                .notifiedUser(mockNotifiedUserDto())
                .user(mockUserDto())
                .tweet(TweetNotificationDto.builder()
                        .id(TestConstants.TWEET_ID)
                        .text(TestConstants.TWEET_TEXT)
                        .author(mockUserDto())
                        .build())
                .notificationCondition(true)
                .build();
        Notification notification = mockNotification(NotificationType.TWEET, event.getNotifiedUser(), event.getUser());
        notification.setTweet(mockTweet(event.getTweet()));
        NotificationResponse response = mockNotificationTweetResponse();
        when(notificationRepository.isNotificationExists(
                notification.getNotifiedUser().getId(), notification.getUser().getId(), NotificationType.TWEET, notification.getTweet().getId()
        )).thenReturn(false);
        when(userRepository.findById(event.getNotifiedUser().getId())).thenReturn(Optional.of(notification.getNotifiedUser()));
        when(userRepository.findById(event.getUser().getId())).thenReturn(Optional.of(notification.getUser()));
        when(tweetRepository.findById(event.getTweet().getId())).thenReturn(Optional.of(notification.getTweet()));
        when(notificationHandlerMapper.convertToNotificationTweetResponse(notification, event.isNotificationCondition()))
                .thenReturn(response);
        notificationHandlerService.handleTweetNotification(event);
        verify(notificationRepository, times(1)).save(notification);
        verify(userNotificationProducer, times(1)).increaseNotificationsCount(notification.getNotifiedUser().getId());
        verify(notificationHandlerMapper, times(1)).convertToNotificationTweetResponse(
                notification, event.isNotificationCondition());
        verify(webSocketClient, times(1)).send(WebsocketConstants.TOPIC_FEED, response);
        verify(webSocketClient, times(1)).send(WebsocketConstants.TOPIC_USER_UPDATE_TWEET, response);
        verify(webSocketClient, times(1)).send(WebsocketConstants.TOPIC_TWEET + response.getTweet().getId(), response);
        verify(webSocketClient, times(1)).send(WebsocketConstants.TOPIC_NOTIFICATIONS + response.getNotifiedUser().getId(), response);
    }

    @Test
    public void handleTweetNotification_notifiedUserEqualsUser() {
        TweetNotificationEvent event = TweetNotificationEvent.builder()
                .notifiedUser(mockUserDto())
                .user(mockUserDto())
                .tweet(TweetNotificationDto.builder()
                        .id(TestConstants.TWEET_ID)
                        .text(TestConstants.TWEET_TEXT)
                        .author(mockUserDto())
                        .build())
                .notificationCondition(true)
                .build();
        NotificationResponse response = mockNotificationTweetResponse();
        when(notificationHandlerMapper.convertToNotificationTweetResponse(event)).thenReturn(response);
        notificationHandlerService.handleTweetNotification(event);
        verify(webSocketClient, times(1)).send(WebsocketConstants.TOPIC_FEED, response);
        verify(webSocketClient, times(1)).send(WebsocketConstants.TOPIC_USER_UPDATE_TWEET, response);
        verify(webSocketClient, times(1)).send(WebsocketConstants.TOPIC_TWEET + response.getTweet().getId(), response);
    }

    @Test
    public void handleTweetSubscriberNotification() {
        TweetNotificationDto tweetNotificationDto = mockTweetDto();
        UserNotificationDto userNotificationDto = mockNotifiedUserDto();
        Tweet tweet = mockTweet(tweetNotificationDto);
        User user = mockUser(userNotificationDto);
        UserNotificationDto subscriberDto1 = mockNotifiedUserDto();
        UserNotificationDto subscriberDto2 = mockUserDto();
        User subscriber1 = mockUser(mockNotifiedUserDto());
        User subscriber2 = mockUser(mockUserDto());
        TweetSubscriberNotificationEvent event = TweetSubscriberNotificationEvent.builder()
                .tweet(tweetNotificationDto)
                .user(userNotificationDto)
                .subscribers(List.of(subscriberDto1, subscriberDto2))
                .build();
        Notification notification1 = new Notification();
        notification1.setNotificationType(NotificationType.TWEET);
        notification1.setUser(user);
        notification1.setTweet(tweet);
        notification1.setNotifiedUser(subscriber1);
        Notification notification2 = new Notification();
        notification2.setNotificationType(NotificationType.TWEET);
        notification2.setUser(user);
        notification2.setTweet(tweet);
        notification2.setNotifiedUser(subscriber2);
        when(tweetRepository.findById(event.getTweet().getId())).thenReturn(Optional.of(tweet));
        when(userRepository.findById(event.getUser().getId())).thenReturn(Optional.of(user));
        when(userRepository.findById(event.getSubscribers().get(0).getId())).thenReturn(Optional.of(subscriber1));
        when(userRepository.findById(event.getSubscribers().get(1).getId())).thenReturn(Optional.of(subscriber2));
        notificationHandlerService.handleTweetSubscriberNotification(event);
        verify(notificationRepository, times(2)).save(any());
        verify(userNotificationProducer, times(2)).increaseNotificationsCount(any());
    }

    @Test
    public void handleTweetMentionNotification() {
        UserNotificationDto notifiedUserDto = mockNotifiedUserDto();
        UserNotificationDto userDto = mockUserDto();
        TweetNotificationDto tweetDto = mockTweetDto();
        TweetMentionNotificationEvent event = TweetMentionNotificationEvent.builder()
                .notificationType(NotificationType.MENTION)
                .notifiedUser(notifiedUserDto)
                .user(userDto)
                .tweet(tweetDto)
                .build();
        User notifiedUser = mockUser(notifiedUserDto);
        User user = mockUser(userDto);
        Tweet tweet = mockTweet(tweetDto);
        when(userRepository.findById(event.getNotifiedUser().getId())).thenReturn(Optional.of(notifiedUser));
        when(userRepository.findById(event.getUser().getId())).thenReturn(Optional.of(user));
        when(tweetRepository.findById(event.getTweet().getId())).thenReturn(Optional.of(tweet));
        Notification notification = new Notification();
        notification.setNotificationType(NotificationType.MENTION);
        notification.setNotifiedUser(notifiedUser);
        notification.setUser(user);
        notification.setTweet(tweet);
        notificationHandlerService.handleTweetMentionNotification(event);
        verify(notificationRepository, times(1)).save(notification);
        verify(userNotificationProducer, times(1)).increaseMentionsCount(notifiedUser.getId());
    }

    private static Notification mockNotification(
            NotificationType notificationType,
            UserNotificationDto notifiedUser,
            UserNotificationDto user
    ) {
        Notification notification = new Notification();
        notification.setNotificationType(notificationType);
        notification.setNotifiedUser(mockUser(notifiedUser));
        notification.setUser(mockUser(user));
        return notification;
    }

    private static UserNotificationDto mockNotifiedUserDto() {
        return UserNotificationDto.builder()
                .id(3L)
                .username(TestConstants.USERNAME)
                .avatar(TestConstants.AVATAR_SRC_1)
                .build();
    }

    private static UserNotificationDto mockUserDto() {
        return UserNotificationDto.builder()
                .id(TestConstants.USER_ID)
                .username(TestConstants.USERNAME)
                .avatar(TestConstants.AVATAR_SRC_2)
                .build();
    }

    private static TweetNotificationDto mockTweetDto() {
        return TweetNotificationDto.builder()
                .id(TestConstants.TWEET_ID)
                .text(TestConstants.TWEET_TEXT)
                .author(mockUserDto())
                .build();
    }

    private static User mockUser(UserNotificationDto userNotificationDto) {
        User user = new User();
        user.setId(userNotificationDto.getId());
        user.setUsername(userNotificationDto.getUsername());
        user.setAvatar(userNotificationDto.getAvatar());
        return user;
    }

    private static Tweet mockTweet(TweetNotificationDto tweetNotificationDto) {
        Tweet tweet = new Tweet();
        tweet.setId(tweetNotificationDto.getId());
        tweet.setText(tweetNotificationDto.getText());
        return tweet;
    }

    private static Lists mockLists(ListsNotificationDto listsNotificationDto) {
        Lists lists = new Lists();
        lists.setId(listsNotificationDto.getId());
        lists.setListName(listsNotificationDto.getListName());
        return lists;
    }

    private static NotificationResponse mockNotificationListResponse() {
        NotificationResponse response = new NotificationResponse();
        response.setNotificationType(NotificationType.LISTS);
        response.setNotifiedUser(mockNotifiedUserResponse());
        response.setUser(mockUserResponse());
        response.setList(mockListResponse());
        return response;
    }

    private static NotificationResponse mockNotificationFollowerResponse() {
        NotificationResponse response = new NotificationResponse();
        response.setNotificationType(NotificationType.FOLLOW);
        response.setNotifiedUser(mockNotifiedUserResponse());
        response.setUser(mockUserResponse());
        response.setUserToFollow(mockUserResponse());
        return response;
    }

    private static NotificationResponse mockNotificationTweetResponse() {
        NotificationResponse response = new NotificationResponse();
        response.setNotificationType(NotificationType.TWEET);
        response.setNotifiedUser(mockNotifiedUserResponse());
        response.setUser(mockUserResponse());
        response.setTweet(mockTweetResponse());
        return response;
    }

    private static NotificationUserResponse mockNotifiedUserResponse() {
        NotificationUserResponse response = new NotificationUserResponse();
        response.setId(3L);
        response.setUsername(TestConstants.USERNAME);
        response.setAvatar(TestConstants.AVATAR_SRC_1);
        return response;
    }

    private static NotificationUserResponse mockUserResponse() {
        NotificationUserResponse response = new NotificationUserResponse();
        response.setId(TestConstants.USER_ID);
        response.setUsername(TestConstants.USERNAME);
        response.setAvatar(TestConstants.AVATAR_SRC_2);
        return response;
    }

    private static NotificationListResponse mockListResponse() {
        NotificationListResponse response = new NotificationListResponse();
        response.setId(TestConstants.LIST_ID);
        response.setListName(TestConstants.LIST_NAME);
        return response;
    }

    private static NotificationTweetResponse mockTweetResponse() {
        NotificationTweetResponse response = new NotificationTweetResponse();
        response.setId(TestConstants.TWEET_ID);
        response.setText(TestConstants.TWEET_TEXT);
        return response;
    }
}
