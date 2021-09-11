import {
    CreateListActionInterface,
    FetchListsActionInterface,
    FetchUserListsActionInterface,
    SetListActionInterface,
    SetListsActionInterface,
    SetListsLoadingStateInterface,
    ListsActionType,
    SetUserListsActionInterface,
    SetFollowListActionInterface, AddTweetToListsActionInterface
} from "./contracts/actionTypes";
import {AddLists, AddTweetToLists, Lists, ListsState} from "./contracts/state";
import {LoadingStatus} from "../../types";

export const setLists = (payload: ListsState["lists"]): SetListsActionInterface => ({
    type: ListsActionType.SET_LISTS,
    payload
});

export const setUserLists = (payload: ListsState["userLists"]): SetUserListsActionInterface => ({
    type: ListsActionType.SET_USER_LISTS,
    payload
});

export const setList = (payload: Lists): SetListActionInterface => ({
    type: ListsActionType.SET_LIST,
    payload
});

export const setFollowList = (payload: Lists): SetFollowListActionInterface => ({
    type: ListsActionType.SET_FOLLOW_LIST,
    payload
});

export const addTweetToLists = (payload: AddTweetToLists): AddTweetToListsActionInterface => ({
    type: ListsActionType.ADD_TWEET_TO_LISTS,
    payload
});

export const createList = (payload: AddLists): CreateListActionInterface => ({
    type: ListsActionType.CREATE_LIST,
    payload
});

export const fetchLists = (): FetchListsActionInterface => ({
    type: ListsActionType.FETCH_LISTS
});

export const fetchUserLists = (): FetchUserListsActionInterface => ({
    type: ListsActionType.FETCH_USER_LISTS
});

export const setListsLoadingState = (payload: LoadingStatus): SetListsLoadingStateInterface => ({
    type: ListsActionType.SET_LOADING_STATE,
    payload
});
