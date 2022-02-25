import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {NotificationResponse, NotificationsResponse} from "../../../types/notification";

export enum NotificationsActionsType {
    SET_NOTIFICATIONS = 'notification/SET_NOTIFICATIONS', // +
    FETCH_NOTIFICATIONS = 'notification/FETCH_NOTIFICATIONS', // +
    FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS = 'notification/FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS', // +
    SET_NOTIFICATION = 'notification/SET_NOTIFICATION', // +
    RESET_NOTIFICATION_STATE = 'notification/RESET_NOTIFICATION_STATE', // +
    SET_LOADING_STATE = 'notification/SET_LOADING_STATE', // +
}

export interface SetNotificationsActionInterface extends Action<NotificationsActionsType> { // +
    type: NotificationsActionsType.SET_NOTIFICATIONS;
    payload: NotificationsResponse;
}

export interface FetchNotificationsActionInterface extends Action<NotificationsActionsType> { // +
    type: NotificationsActionsType.FETCH_NOTIFICATIONS;
}

export interface FetchNotificationsFromTweetAuthorsActionInterface extends Action<NotificationsActionsType> { // +
    type: NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS;
    payload: number;
}

export interface SetNotificationActionInterface extends Action<NotificationsActionsType> { // +
    type: NotificationsActionsType.SET_NOTIFICATION;
    payload: NotificationResponse;
}

export interface ResetNotificationStateActionInterface extends Action<NotificationsActionsType> { // +
    type: NotificationsActionsType.RESET_NOTIFICATION_STATE;
}

export interface SetNotificationsLoadingStateActionInterface extends Action<NotificationsActionsType> { // +
    type: NotificationsActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type NotificationsActions =
    | SetNotificationsActionInterface // +
    | SetNotificationActionInterface // +
    | ResetNotificationStateActionInterface // +
    | SetNotificationsLoadingStateActionInterface; // +
