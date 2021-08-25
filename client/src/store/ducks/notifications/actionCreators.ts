import {Notification} from "./contracts/state";
import {
    FetchNotificationsActionInterface,
    NotificationsActionsType,
    SetNotificationActionInterface,
    SetNotificationsActionInterface,
    SetNotificationsLoadingStateActionInterface
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";

export const setNotifications = (payload: Notification[]): SetNotificationsActionInterface => ({
    type: NotificationsActionsType.SET_NOTIFICATIONS,
    payload,
});

export const fetchNotifications = (): FetchNotificationsActionInterface => ({
    type: NotificationsActionsType.FETCH_NOTIFICATIONS,
});

export const setNotification = (payload: Notification): SetNotificationActionInterface => ({
    type: NotificationsActionsType.SET_NOTIFICATION,
    payload,
});

export const setNotificationsLoadingState = (payload: LoadingStatus): SetNotificationsLoadingStateActionInterface => ({
    type: NotificationsActionsType.SET_LOADING_STATE,
    payload,
});
