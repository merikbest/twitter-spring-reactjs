import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {Notification, Notifications} from "./state";

export enum NotificationsActionsType {
    SET_NOTIFICATIONS = 'notification/SET_NOTIFICATIONS',
    FETCH_NOTIFICATIONS = 'notification/FETCH_NOTIFICATIONS',
    FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS = 'notification/FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS',
    SET_NOTIFICATION = 'notification/SET_NOTIFICATION',
    SET_LOADING_STATE = 'notification/SET_LOADING_STATE',
}

export interface SetNotificationsActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.SET_NOTIFICATIONS;
    payload: Notifications;
}

export interface FetchNotificationsActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.FETCH_NOTIFICATIONS;
}

export interface FetchNotificationsFromTweetAuthorsActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS;
    payload: number;
}

export interface SetNotificationActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.SET_NOTIFICATION;
    payload: Notification;
}

export interface SetNotificationsLoadingStateActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type NotificationsActions =
    | SetNotificationsActionInterface
    | SetNotificationActionInterface
    | SetNotificationsLoadingStateActionInterface;
