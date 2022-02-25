import {
    FetchNotificationsActionInterface,
    FetchNotificationsFromTweetAuthorsActionInterface,
    NotificationsActionsType,
    ResetNotificationStateActionInterface,
    SetNotificationActionInterface,
    SetNotificationsActionInterface,
    SetNotificationsLoadingStateActionInterface
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";
import {NotificationResponse, NotificationsResponse} from "../../types/notification";

export const setNotifications = (payload: NotificationsResponse): SetNotificationsActionInterface => ({ // +
    type: NotificationsActionsType.SET_NOTIFICATIONS,
    payload,
});

export const fetchNotifications = (): FetchNotificationsActionInterface => ({ // +
    type: NotificationsActionsType.FETCH_NOTIFICATIONS,
});

export const fetchNotificationsFromTweetAuthors = (payload: number): FetchNotificationsFromTweetAuthorsActionInterface => ({ // +
    type: NotificationsActionsType.FETCH_NOTIFICATIONS_FROM_TWEET_AUTHORS,
    payload,
});

export const setNotification = (payload: NotificationResponse): SetNotificationActionInterface => ({ // +
    type: NotificationsActionsType.SET_NOTIFICATION,
    payload,
});

export const resetNotificationState = (): ResetNotificationStateActionInterface => ({ // +
    type: NotificationsActionsType.RESET_NOTIFICATION_STATE
});

export const setNotificationsLoadingState = (payload: LoadingStatus): SetNotificationsLoadingStateActionInterface => ({ // +
    type: NotificationsActionsType.SET_LOADING_STATE,
    payload,
});
