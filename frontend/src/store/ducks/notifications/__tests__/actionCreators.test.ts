import { testAction } from "../../../../util/test-utils/test-helper";
import {
    fetchFetchTweetAuthorsNotifications,
    fetchMentions,
    fetchNotificationInfo,
    fetchNotifications,
    fetchNotificationsFromTweetAuthors,
    resetNotificationState,
    setBlockedNotificationInfo,
    setFollowRequestToNotificationInfo,
    setFollowToNotificationInfo,
    setNotification,
    setNotificationInfo,
    setNotifications,
    setNotificationsLoadingState,
    setTweetAuthorsLoadingState,
    setTweetAuthorsNotifications,
    updateNotificationInfoTweet
} from "../actionCreators";
import { NotificationsActionsType } from "../contracts/actionTypes";
import {
    NotificationInfoResponse,
    NotificationResponse,
    NotificationUserResponse
} from "../../../../types/notification";
import { LoadingStatus } from "../../../../types/common";

describe("notifications actions", () => {
    const notification = { id: 1 } as NotificationResponse;

    testAction(setNotifications, setNotifications({ items: [{ id: 1 }] as NotificationResponse[], pagesCount: 1 }), {
        type: NotificationsActionsType.SET_NOTIFICATIONS,
        payload: { items: [{ id: 1 }] as NotificationResponse[], pagesCount: 1 }
    });

    testAction(setTweetAuthorsNotifications, setTweetAuthorsNotifications([{ id: 1 }] as NotificationUserResponse[]), {
        type: NotificationsActionsType.SET_TWEET_AUTHORS_NOTIFICATIONS,
        payload: [{ id: 1 }] as NotificationUserResponse[]
    });

    testAction(fetchNotifications, fetchNotifications(1), {
        type: NotificationsActionsType.FETCH_NOTIFICATIONS,
        payload: 1
    });

    testAction(fetchFetchTweetAuthorsNotifications, fetchFetchTweetAuthorsNotifications(), {
        type: NotificationsActionsType.FETCH_TWEET_AUTHORS_NOTIFICATIONS
    });

    testAction(fetchNotificationsFromTweetAuthors, fetchNotificationsFromTweetAuthors(1), {
        type: NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS,
        payload: 1
    });

    testAction(fetchMentions, fetchMentions(1), {
        type: NotificationsActionsType.FETCH_MENTIONS,
        payload: 1
    });

    testAction(setNotification, setNotification(notification), {
        type: NotificationsActionsType.SET_NOTIFICATION,
        payload: notification
    });

    testAction(fetchNotificationInfo, fetchNotificationInfo(1), {
        type: NotificationsActionsType.FETCH_NOTIFICATION_INFO,
        payload: 1
    });

    testAction(setNotificationInfo, setNotificationInfo({ id: 1 } as NotificationInfoResponse), {
        type: NotificationsActionsType.SET_NOTIFICATION_INFO,
        payload: { id: 1 } as NotificationInfoResponse
    });

    testAction(setFollowToNotificationInfo, setFollowToNotificationInfo(true), {
        type: NotificationsActionsType.SET_FOLLOW_TO_NOTIFICATION_INFO,
        payload: true
    });

    testAction(setBlockedNotificationInfo, setBlockedNotificationInfo(true), {
        type: NotificationsActionsType.SET_BLOCKED_NOTIFICATION_INFO,
        payload: true
    });

    testAction(setFollowRequestToNotificationInfo, setFollowRequestToNotificationInfo(true), {
        type: NotificationsActionsType.SET_FOLLOW_REQUEST_TO_NOTIFICATION_INFO,
        payload: true
    });

    testAction(updateNotificationInfoTweet, updateNotificationInfoTweet(notification), {
        type: NotificationsActionsType.UPDATE_NOTIFICATION_INFO_TWEET,
        payload: notification
    });

    testAction(resetNotificationState, resetNotificationState(), {
        type: NotificationsActionsType.RESET_NOTIFICATION_STATE
    });

    testAction(setNotificationsLoadingState, setNotificationsLoadingState(LoadingStatus.LOADING), {
        type: NotificationsActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(setTweetAuthorsLoadingState, setTweetAuthorsLoadingState(LoadingStatus.LOADING), {
        type: NotificationsActionsType.SET_TWEET_AUTHORS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
