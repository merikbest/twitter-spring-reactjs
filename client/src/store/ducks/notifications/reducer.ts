import produce, {Draft} from 'immer';

import {LoadingStatus} from '../../types';
import {NotificationsState} from "./contracts/state";
import {NotificationsActions, NotificationsActionsType} from "./contracts/actionTypes";

const initialTagsState: NotificationsState = {
    notificationsList: [],
    tweetAuthors: [],
    notificationInfo: undefined,
    notificationInfoLoadingState: LoadingStatus.LOADING,
    loadingState: LoadingStatus.LOADING,
};

export const notificationsReducer = produce((draft: Draft<NotificationsState>, action: NotificationsActions) => {
    switch (action.type) {
        case NotificationsActionsType.SET_NOTIFICATIONS: // +
            draft.notificationsList = action.payload.notifications ? action.payload.notifications : [];
            draft.tweetAuthors = action.payload.tweetAuthors ? action.payload.tweetAuthors : [];
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case NotificationsActionsType.SET_NOTIFICATION: // +
            draft.notificationsList = [action.payload, ...draft.notificationsList];
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case NotificationsActionsType.SET_NOTIFICATION_INFO: // +
            // draft.notificationsList = [action.payload, ...draft.notificationsList];
            draft.notificationInfoLoadingState = LoadingStatus.LOADED;
            break;

        case NotificationsActionsType.RESET_NOTIFICATION_STATE: // +
            draft.notificationsList = [];
            draft.tweetAuthors = [];
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case NotificationsActionsType.SET_LOADING_STATE: // +
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTagsState);
