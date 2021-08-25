import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {Notification} from "./state";

export enum NotificationsActionsType {
    SET_NOTIFICATIONS = 'notification/SET_NOTIFICATIONS',
    FETCH_NOTIFICATIONS = 'notification/FETCH_NOTIFICATIONS',
    SET_NOTIFICATION = 'notification/SET_NOTIFICATION',
    SET_LOADING_STATE = 'notification/SET_LOADING_STATE',
}

export interface SetNotificationsActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.SET_NOTIFICATIONS;
    payload: Notification[];
}

export interface FetchNotificationsActionInterface extends Action<NotificationsActionsType> {
    type: NotificationsActionsType.FETCH_NOTIFICATIONS;
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
