import produce, {Draft} from 'immer';

import {ListsState} from "./contracts/state";
import {ListsActions, ListsActionType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

const initialTweetState: ListsState = {
    lists: [],
    userLists: [],
    pinnedLists: [],
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

        case ListsActionType.SET_PINNED_LISTS:
            draft.pinnedLists = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ListsActionType.SET_UPDATED_LISTS:
            const updatedListIndex = draft.lists.findIndex((list) => list.id === action.payload.id);
            if (updatedListIndex !== -1) {
                draft.lists[updatedListIndex].members = action.payload.members;
                draft.userLists[updatedListIndex].members = action.payload.members;
                draft.pinnedLists[updatedListIndex].members = action.payload.members;
            }
            break;

        case ListsActionType.SET_FOLLOW_LIST:
            const followListIndex = draft.lists.findIndex((list) => list.id === action.payload.id);
            if (followListIndex !== -1) draft.lists[followListIndex] = action.payload;
            draft.userLists = [...draft.userLists, action.payload];
            break;

        case ListsActionType.SET_UNFOLLOW_LIST:
            const unfollowListIndex = draft.lists.findIndex((list) => list.id === action.payload.id);
            if (unfollowListIndex !== -1) draft.lists[unfollowListIndex] = action.payload;
            draft.userLists = draft.userLists.filter((list) => list.id !== action.payload.id);
            draft.pinnedLists = draft.pinnedLists.filter((list) => list.id !== action.payload.id);
            break;

        case ListsActionType.SET_LIST:
            draft.lists = [action.payload, ...draft.lists];
            draft.userLists = [action.payload, ...draft.userLists];
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ListsActionType.SET_PINED_LIST:
            draft.pinnedLists = [...draft.pinnedLists, action.payload];
            break;

        case ListsActionType.SET_UNPIN_LIST:
            draft.pinnedLists = draft.pinnedLists.filter((list) => list.id !== action.payload.id);
            break;

        case ListsActionType.SET_PINED_LIST_TO_USER_LIST:
            const pinToUserListIndex = draft.userLists.findIndex((list) => list.id === action.payload.id);
            if (pinToUserListIndex !== -1) draft.userLists[pinToUserListIndex] = action.payload;
            break;

        case ListsActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTweetState);



