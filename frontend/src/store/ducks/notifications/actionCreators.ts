import {
    FetchMentionsActionInterface,
    FetchNotificationInfoActionInterface,
    FetchNotificationsActionInterface,
    FetchNotificationsFromTweetAuthorsActionInterface,
    FetchTweetAuthorsNotificationsActionInterface,
    NotificationsActionsType,
    ResetNotificationStateActionInterface,
    SetBlockedNotificationInfoActionInterface,
    SetFollowRequestToNotificationInfoActionInterface,
    SetFollowToNotificationInfoActionInterface,
    SetNotificationActionInterface,
    SetNotificationInfoActionInterface,
    SetNotificationsActionInterface,
    SetNotificationsLoadingStateActionInterface,
    SetTweetAuthorsLoadingStateActionInterface,
    SetTweetAuthorsNotificationsActionInterface,
    UpdateNotificationInfoTweetActionInterface
} from "./contracts/actionTypes";
import { NotificationInfoResponse, NotificationReplyResponse, NotificationResponse } from "../../../types/notification";
import { NotificationsState } from "./contracts/state";
import { LoadingStatus, PageableResponse } from "../../../types/common";

export const setNotifications = (payload: PageableResponse<NotificationsState["notificationsList"]>): SetNotificationsActionInterface => ({
    type: NotificationsActionsType.SET_NOTIFICATIONS,
    payload
});

export const setTweetAuthorsNotifications = (payload: NotificationsState["tweetAuthors"]): SetTweetAuthorsNotificationsActionInterface => ({
    type: NotificationsActionsType.SET_TWEET_AUTHORS_NOTIFICATIONS,
    payload
});

export const fetchNotifications = (payload: number): FetchNotificationsActionInterface => ({
    type: NotificationsActionsType.FETCH_NOTIFICATIONS,
    payload
});

export const fetchFetchTweetAuthorsNotifications = (): FetchTweetAuthorsNotificationsActionInterface => ({
    type: NotificationsActionsType.FETCH_TWEET_AUTHORS_NOTIFICATIONS
});

export const fetchNotificationsFromTweetAuthors = (payload: number): FetchNotificationsFromTweetAuthorsActionInterface => ({
    type: NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS,
    payload
});

export const fetchMentions = (payload: number): FetchMentionsActionInterface => ({
    type: NotificationsActionsType.FETCH_MENTIONS,
    payload
});

export const setNotification = (payload: NotificationResponse): SetNotificationActionInterface => ({
    type: NotificationsActionsType.SET_NOTIFICATION,
    payload
});

export const fetchNotificationInfo = (payload: number): FetchNotificationInfoActionInterface => ({
    type: NotificationsActionsType.FETCH_NOTIFICATION_INFO,
    payload
});

export const setNotificationInfo = (payload: NotificationInfoResponse): SetNotificationInfoActionInterface => ({
    type: NotificationsActionsType.SET_NOTIFICATION_INFO,
    payload
});

export const setFollowToNotificationInfo = (payload: boolean): SetFollowToNotificationInfoActionInterface => ({
    type: NotificationsActionsType.SET_FOLLOW_TO_NOTIFICATION_INFO,
    payload
});

export const setBlockedNotificationInfo = (payload: boolean): SetBlockedNotificationInfoActionInterface => ({
    type: NotificationsActionsType.SET_BLOCKED_NOTIFICATION_INFO,
    payload
});

export const setFollowRequestToNotificationInfo = (payload: boolean): SetFollowRequestToNotificationInfoActionInterface => ({
    type: NotificationsActionsType.SET_FOLLOW_REQUEST_TO_NOTIFICATION_INFO,
    payload
});

export const updateNotificationInfoTweet = (payload: NotificationResponse | NotificationReplyResponse): UpdateNotificationInfoTweetActionInterface => ({
    type: NotificationsActionsType.UPDATE_NOTIFICATION_INFO_TWEET,
    payload
});

export const resetNotificationState = (): ResetNotificationStateActionInterface => ({
    type: NotificationsActionsType.RESET_NOTIFICATION_STATE
});

export const setNotificationsLoadingState = (payload: LoadingStatus): SetNotificationsLoadingStateActionInterface => ({
    type: NotificationsActionsType.SET_LOADING_STATE,
    payload
});

export const setTweetAuthorsLoadingState = (payload: LoadingStatus): SetTweetAuthorsLoadingStateActionInterface => ({
    type: NotificationsActionsType.SET_TWEET_AUTHORS_LOADING_STATE,
    payload
});
