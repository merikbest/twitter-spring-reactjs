import produce, {Draft} from 'immer';

import {LoadingStatus} from '../../types';
import {NotificationsState} from "./contracts/state";
import {NotificationsActions, NotificationsActionsType} from "./contracts/actionTypes";

const initialTagsState: NotificationsState = {
    items: [],
    loadingState: LoadingStatus.NEVER,
};

export const notificationsReducer = produce((draft: Draft<NotificationsState>, action: NotificationsActions) => {
    switch (action.type) {
        case NotificationsActionsType.SET_NOTIFICATIONS:
            draft.items = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case NotificationsActionsType.SET_NOTIFICATION:
            draft.items = [action.payload, ...draft.items];
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case NotificationsActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTagsState);
