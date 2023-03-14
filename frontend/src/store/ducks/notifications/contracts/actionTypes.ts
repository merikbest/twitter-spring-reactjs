import { Action } from "redux";

import {
    NotificationInfoResponse,
    NotificationReplyResponse,
    NotificationResponse
} from "../../../../types/notification";
import { NotificationsState } from "./state";
import { LoadingStatus, PageableResponse } from "../../../../types/common";

export enum NotificationsActionsType {
    SET_NOTIFICATIONS = "notification/SET_NOTIFICATIONS",
    SET_TWEET_AUTHORS_NOTIFICATIONS = "notification/SET_TWEET_AUTHORS_NOTIFICATIONS",
    FETCH_NOTIFICATIONS = "notification/FETCH_NOTIFICATIONS",
    FETCH_TWEET_AUTHORS_NOTIFICATIONS = "notification/FETCH_TWEET_AUTHORS_NOTIFICATIONS",
    FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS = "notification/FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS",
    FETCH_MENTIONS = "notification/FETCH_MENTIONS",
    SET_NOTIFICATION = "notification/SET_NOTIFICATION",
    FETCH_NOTIFICATION_INFO = "notification/FETCH_NOTIFICATION_INFO",
    SET_NOTIFICATION_INFO = "notification/SET_NOTIFICATION_INFO",
    SET_FOLLOW_TO_NOTIFICATION_INFO = "notification/SET_FOLLOW_TO_NOTIFICATION_INFO",
    SET_BLOCKED_NOTIFICATION_INFO = "notification/SET_BLOCKED_NOTIFICATION_INFO",
    SET_FOLLOW_REQUEST_TO_NOTIFICATION_INFO = "notification/SET_FOLLOW_REQUEST_TO_NOTIFICATION_INFO",
    UPDATE_NOTIFICATION_INFO_TWEET = "notification/UPDATE_NOTIFICATION_INFO_TWEET",
    RESET_NOTIFICATION_STATE = "notification/RESET_NOTIFICATION_STATE",
    SET_TWEET_AUTHORS_LOADING_STATE = "notification/SET_TWEET_AUTHORS_LOADING_STATE",
    SET_LOADING_STATE = "notification/SET_LOADING_STATE",
}

export interface SetNotificationsActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.SET_NOTIFICATIONS;
    payload: PageableResponse<NotificationsState["notificationsList"]>;
}

export interface SetTweetAuthorsNotificationsActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.SET_TWEET_AUTHORS_NOTIFICATIONS;
    payload: NotificationsState["tweetAuthors"];
}

export interface FetchNotificationsActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.FETCH_NOTIFICATIONS;
    payload: number;
}

export interface FetchTweetAuthorsNotificationsActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.FETCH_TWEET_AUTHORS_NOTIFICATIONS;
}

export interface FetchNotificationsFromTweetAuthorsActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS;
    payload: number;
}

export interface FetchMentionsActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.FETCH_MENTIONS;
    payload: number;
}

export interface SetNotificationActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.SET_NOTIFICATION;
    payload: NotificationResponse;
}

export interface FetchNotificationInfoActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.FETCH_NOTIFICATION_INFO;
    payload: number;
}

export interface SetNotificationInfoActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.SET_NOTIFICATION_INFO;
    payload: NotificationInfoResponse;
}

export interface SetFollowToNotificationInfoActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.SET_FOLLOW_TO_NOTIFICATION_INFO;
    payload: boolean;
}

export interface SetBlockedNotificationInfoActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.SET_BLOCKED_NOTIFICATION_INFO;
    payload: boolean;
}

export interface SetFollowRequestToNotificationInfoActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.SET_FOLLOW_REQUEST_TO_NOTIFICATION_INFO;
    payload: boolean;
}

export interface UpdateNotificationInfoTweetActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.UPDATE_NOTIFICATION_INFO_TWEET;
    payload: NotificationResponse | NotificationReplyResponse;
}

export interface ResetNotificationStateActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.RESET_NOTIFICATION_STATE;
}

export interface SetNotificationsLoadingStateActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetTweetAuthorsLoadingStateActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.SET_TWEET_AUTHORS_LOADING_STATE;
    payload: LoadingStatus;
}

export type NotificationsActions =
    | SetNotificationsActionInterface
    | SetTweetAuthorsNotificationsActionInterface
    | SetNotificationActionInterface
    | SetNotificationInfoActionInterface
    | SetFollowToNotificationInfoActionInterface
    | SetBlockedNotificationInfoActionInterface
    | SetFollowRequestToNotificationInfoActionInterface
    | UpdateNotificationInfoTweetActionInterface
    | ResetNotificationStateActionInterface
    | SetNotificationsLoadingStateActionInterface
    | SetTweetAuthorsLoadingStateActionInterface;
