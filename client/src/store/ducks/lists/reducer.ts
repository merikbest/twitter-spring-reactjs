import produce, {Draft} from 'immer';

import {ListsState} from "./contracts/state";
import {ListsActions, ListsActionType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

const initialTweetState: ListsState = {
    lists: [],
    userLists: [],
    loadingState: LoadingStatus.NEVER
};

export const listsReducer = produce((draft: Draft<ListsState>, action: ListsActions) => {

    switch (action.type) {
        case ListsActionType.SET_LISTS:
            draft.lists = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ListsActionType.SET_USER_LISTS:
            draft.userLists = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ListsActionType.SET_FOLLOW_LIST:
            const index = draft.lists.findIndex((list) => list.id === action.payload.id);
            if (index !== -1) draft.lists[index] = action.payload;
            break;

        case ListsActionType.SET_LIST:
            draft.lists = [action.payload, ...draft.lists];
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ListsActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTweetState);



