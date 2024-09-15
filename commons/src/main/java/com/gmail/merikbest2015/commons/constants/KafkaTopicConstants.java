package com.gmail.merikbest2015.commons.constants;

public class KafkaTopicConstants {
    public static final String UPDATE_USER_TOPIC = "user-service.user.update";
    public static final String BLOCK_USER_TOPIC = "user-service.user.block";
    public static final String MUTE_USER_TOPIC = "user-service.user.mute";
    public static final String FOLLOW_USER_TOPIC = "user-service.user.follow";
    public static final String FOLLOW_REQUEST_USER_TOPIC = "user-service.user.follow-request";
    public static final String SEND_EMAIL_TOPIC = "user-service.user.send-email";
    public static final String UPDATE_TWEET_TOPIC = "tweet-service.tweet.update";
    public static final String UPDATE_LISTS_TOPIC = "lists-service.lists.update";
    public static final String SEND_LISTS_NOTIFICATION_TOPIC = "lists-service.notification.create";
    public static final String SEND_USER_NOTIFICATION_TOPIC = "user-service.notification.create";
    public static final String SEND_TWEET_NOTIFICATION_TOPIC = "tweet-service.notification.tweet.create";
    public static final String SEND_SUBSCRIBER_NOTIFICATION_TOPIC = "tweet-service.notification.subscriber.create";
    public static final String SEND_TWEET_SUBSCRIBER_NOTIFICATION_TOPIC = "user-service.notification.tweet.subscriber.create";
    public static final String SEND_TWEET_MENTION_NOTIFICATION_TOPIC = "tweet-service.notification.tweet.mention.create";
    public static final String UPDATE_USER_TWEETS_COUNT_TOPIC = "tweet-service.user.update-tweets-count";
    public static final String UPDATE_USER_LIKES_COUNT_TOPIC = "tweet-service.user.update-likes-count";
    public static final String UPDATE_USER_MEDIA_COUNT_TOPIC = "tweet-service.user.update-media-count";
    public static final String UPDATE_USER_NOTIFICATIONS_COUNT_TOPIC = "notification-service.user.update-notifications-count";
    public static final String UPDATE_USER_MENTIONS_COUNT_TOPIC = "notification-service.user.update-mentions-count";
    public static final String RESET_USER_NOTIFICATIONS_COUNT_TOPIC = "notification-service.user.reset-notifications-count";
    public static final String RESET_USER_MENTIONS_COUNT_TOPIC = "notification-service.user.reset-mentions-count";
    public static final String PARSE_TWEETS_HASHTAG_TOPIC = "tweet-service.tweet.parse.tag";
    public static final String DELETE_TWEETS_HASHTAG_TOPIC = "tweet-service.tweet.delete.tag";
}
