import {testAction} from "../../../util/testHelper";
import {
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
    updateNotificationInfoTweet
} from "./actionCreators";
import {NotificationsActionsType} from "./contracts/actionTypes";
import {NotificationInfoResponse, NotificationResponse, NotificationsResponse} from "../../types/notification";
import {LoadingStatus} from "../../types";

describe("tags actions", () => {
    const notification = {id: 1};
    const notifications = {
        notifications: [notification],
        tweetAuthors: [{id: 1}]
    };
    
    testAction(setNotifications, setNotifications(notifications as NotificationsResponse), {
        type: NotificationsActionsType.SET_NOTIFICATIONS,
        payload: notifications as NotificationsResponse
    });

    testAction(fetchNotifications, fetchNotifications(), {
        type: NotificationsActionsType.FETCH_NOTIFICATIONS,
    });

    testAction(fetchNotificationsFromTweetAuthors, fetchNotificationsFromTweetAuthors(1), {
        type: NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS,
        payload: 1
    });

    testAction(setNotification, setNotification(notification as NotificationResponse), {
        type: NotificationsActionsType.SET_NOTIFICATION,
        payload: notification as NotificationResponse
    });

    testAction(fetchNotificationInfo, fetchNotificationInfo(1), {
        type: NotificationsActionsType.FETCH_NOTIFICATION_INFO,
        payload: 1
    });

    testAction(setNotificationInfo, setNotificationInfo(notification as NotificationInfoResponse), {
        type: NotificationsActionsType.SET_NOTIFICATION_INFO,
        payload: notification as NotificationInfoResponse
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

    testAction(updateNotificationInfoTweet, updateNotificationInfoTweet(notification as NotificationResponse), {
        type: NotificationsActionsType.UPDATE_NOTIFICATION_INFO_TWEET,
        payload: notification as NotificationResponse
    });

    testAction(resetNotificationState, resetNotificationState(), {
        type: NotificationsActionsType.RESET_NOTIFICATION_STATE,
    });

    testAction(setNotificationsLoadingState, setNotificationsLoadingState(LoadingStatus.LOADING), {
        type: NotificationsActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
