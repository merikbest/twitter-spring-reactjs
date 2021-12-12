import {Notification, Notifications} from "./contracts/state";
import {
    FetchNotificationsActionInterface,
    FetchNotificationsFromTweetAuthorsActionInterface,
    NotificationsActionsType,
    SetNotificationActionInterface,
    SetNotificationsActionInterface,
    SetNotificationsLoadingStateActionInterface
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";

export const setNotifications = (payload: Notifications): SetNotificationsActionInterface => ({
    type: NotificationsActionsType.SET_NOTIFICATIONS,
    payload,
});

export const fetchNotifications = (): FetchNotificationsActionInterface => ({
    type: NotificationsActionsType.FETCH_NOTIFICATIONS,
});

export const fetchNotificationsFromTweetAuthors = (payload: number): FetchNotificationsFromTweetAuthorsActionInterface => ({
    type: NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS,
    payload,
});

export const setNotification = (payload: Notification): SetNotificationActionInterface => ({
    type: NotificationsActionsType.SET_NOTIFICATION,
    payload,
});

export const setNotificationsLoadingState = (payload: LoadingStatus): SetNotificationsLoadingStateActionInterface => ({
    type: NotificationsActionsType.SET_LOADING_STATE,
    payload,
});
