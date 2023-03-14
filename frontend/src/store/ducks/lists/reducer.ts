import produce, { Draft } from "immer";

import { ListsState } from "./contracts/state";
import { ListsActions, ListsActionType } from "./contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";

export const initialListsState: ListsState = {
    lists: [],
    listsLoadingState: LoadingStatus.LOADING,
    userLists: [],
    userListsLoadingState: LoadingStatus.LOADING,
    pinnedLists: [],
    pinnedListsLoadingState: LoadingStatus.LOADING,
    simpleLists: [],
    simpleListsLoadingState: LoadingStatus.LOADING,
    loadingState: LoadingStatus.LOADING
};

export const listsReducer = produce((draft: Draft<ListsState>, action: ListsActions) => {

    switch (action.type) {
        case ListsActionType.SET_LISTS:
            draft.lists = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            draft.listsLoadingState = LoadingStatus.LOADED;
            break;

        case ListsActionType.SET_USER_LISTS:
            draft.userLists = action.payload;
            draft.userListsLoadingState = LoadingStatus.LOADED;
            break;

        case ListsActionType.SET_PINNED_LISTS:
            draft.pinnedLists = action.payload;
            draft.pinnedListsLoadingState = LoadingStatus.LOADED;
            break;

        case ListsActionType.SET_SIMPLE_LISTS:
            draft.simpleLists = action.payload;
            draft.simpleListsLoadingState = LoadingStatus.LOADED;
            break;

        case ListsActionType.SET_UPDATED_LISTS:
            const updatedListIndex = draft.lists.findIndex((list) => list.id === action.payload.listId);
            if (updatedListIndex !== -1) {
                // draft.lists[updatedListIndex].members = action.payload.members;
                // draft.userLists[updatedListIndex].members = action.payload.members;
                // draft.pinnedLists[updatedListIndex].members = action.payload.members;
            }
            break;

        case ListsActionType.SET_FOLLOW_LIST:
            const followListIndex = draft.lists.findIndex((list) => list.id === action.payload.id);
            if (followListIndex !== -1) draft.lists[followListIndex].isFollower = true;
            draft.userLists = [...draft.userLists, action.payload];
            break;

        case ListsActionType.SET_UNFOLLOW_LIST:
            const unfollowListIndex = draft.lists.findIndex((list) => list.id === action.payload.id);
            if (unfollowListIndex !== -1) draft.lists[unfollowListIndex].isFollower = false;
            draft.userLists = draft.userLists.filter((list) => list.id !== action.payload.id);
            draft.pinnedLists = draft.pinnedLists.filter((list) => list.id !== action.payload.id);
            break;

        case ListsActionType.SET_LIST:
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
            if (pinToUserListIndex !== -1) draft.userLists[pinToUserListIndex].isListPinned = action.payload.isListPinned;
            break;

        case ListsActionType.RESET_LISTS_STATE:
            draft.lists = [];
            draft.userLists = [];
            draft.pinnedLists = [];
            draft.simpleLists = [];
            draft.listsLoadingState = LoadingStatus.LOADING;
            draft.userListsLoadingState = LoadingStatus.LOADING;
            draft.pinnedListsLoadingState = LoadingStatus.LOADING;
            draft.simpleListsLoadingState = LoadingStatus.LOADING;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case ListsActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        case ListsActionType.SET_LISTS_LOADING_STATE:
            draft.listsLoadingState = action.payload;
            break;

        case ListsActionType.SET_USER_LISTS_LOADING_STATE:
            draft.userListsLoadingState = action.payload;
            break;

        case ListsActionType.SET_PINNED_LISTS_LOADING_STATE:
            draft.pinnedListsLoadingState = action.payload;
            break;

        case ListsActionType.SET_SIMPLE_LISTS_LOADING_STATE:
            draft.simpleListsLoadingState = action.payload;
            break;

        default:
            break;
    }
}, initialListsState);



