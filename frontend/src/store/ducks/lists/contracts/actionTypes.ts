import { Action } from "redux";

import { ListsRequest, AddUserToListsRequest, ListsState, UpdateListsPayload } from "./state";
import { ListUserResponse, PinnedListResponse } from "../../../../types/lists";
import { LoadingStatus } from "../../../../types/common";

export enum ListsActionType {
    SET_LISTS = "lists/SET_LISTS",
    SET_USER_LISTS = "lists/SET_USER_LISTS",
    SET_PINNED_LISTS = "lists/SET_PINNED_LISTS",
    SET_SIMPLE_LISTS = "lists/SET_SIMPLE_LISTS",
    SET_LIST = "lists/SET_LIST",
    SET_UPDATED_LISTS = "lists/SET_UPDATED_LISTS",
    FOLLOW_LIST = "lists/FOLLOW_LIST",
    UNFOLLOW_LIST = "lists/UNFOLLOW_LIST",
    PROCESS_USER_TO_LISTS = "lists/PROCESS_USER_TO_LISTS",
    SET_FOLLOW_LIST = "lists/SET_FOLLOW_LIST",
    SET_UNFOLLOW_LIST = "lists/SET_UNFOLLOW_LIST",
    CREATE_LIST = "lists/CREATE_LIST",
    FETCH_LISTS = "lists/FETCH_LISTS",
    FETCH_USER_LISTS = "lists/FETCH_USER_LISTS",
    FETCH_USER_LISTS_BY_ID = "lists/FETCH_USER_LISTS_BY_ID",
    FETCH_TWEET_LISTS_WHICH_USER_IN = "lists/FETCH_TWEET_LISTS_WHICH_USER_IN",
    FETCH_PINNED_LISTS = "lists/FETCH_PINNED_LISTS",
    FETCH_SIMPLE_LISTS = "lists/FETCH_SIMPLE_LISTS",
    PIN_LIST = "lists/PIN_LIST",
    UNPIN_LIST = "lists/UNPIN_LIST",
    SET_PINED_LIST = "lists/SET_PINED_LIST",
    SET_UNPIN_LIST = "lists/SET_UNPIN_LIST",
    SET_PINED_LIST_TO_USER_LIST = "lists/SET_PINED_LIST_TO_USER_LIST",
    RESET_LISTS_STATE = "lists/RESET_LISTS_STATE",
    SET_LOADING_STATE = "lists/SET_LOADING_STATE",
    SET_LISTS_LOADING_STATE = "lists/SET_LISTS_LOADING_STATE",
    SET_USER_LISTS_LOADING_STATE = "lists/SET_USER_LISTS_LOADING_STATE",
    SET_PINNED_LISTS_LOADING_STATE = "lists/SET_PINNED_LISTS_LOADING_STATE",
    SET_SIMPLE_LISTS_LOADING_STATE = "lists/SET_SIMPLE_LISTS_LOADING_STATE",
}

export interface SetListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_LISTS;
    payload: ListsState["lists"];
}

export interface SetUserListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_USER_LISTS;
    payload: ListsState["userLists"];
}

export interface SetPinnedListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_PINNED_LISTS;
    payload: ListsState["pinnedLists"];
}

export interface SetSimpleListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_SIMPLE_LISTS;
    payload: ListsState["simpleLists"];
}

export interface SetListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_LIST;
    payload: ListUserResponse;
}

export interface SetUpdatedListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_UPDATED_LISTS;
    payload: UpdateListsPayload;
}

export interface FollowListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FOLLOW_LIST;
    payload: number;
}

export interface UnfollowListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.UNFOLLOW_LIST;
    payload: number;
}

export interface ProcessUserToListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.PROCESS_USER_TO_LISTS;
    payload: AddUserToListsRequest;
}

export interface SetFollowListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_FOLLOW_LIST;
    payload: ListUserResponse;
}

export interface SetUnfollowListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_UNFOLLOW_LIST;
    payload: ListUserResponse;
}

export interface CreateListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.CREATE_LIST;
    payload: ListsRequest;
}

export interface FetchListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FETCH_LISTS;
}

export interface FetchUserListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FETCH_USER_LISTS;
}

export interface FetchUserListsByIdActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FETCH_USER_LISTS_BY_ID;
    payload: number;
}

export interface FetchTweetListsWhichUserInActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FETCH_TWEET_LISTS_WHICH_USER_IN;
}

export interface FetchPinnedListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FETCH_PINNED_LISTS;
}

export interface FetchSimpleListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FETCH_SIMPLE_LISTS;
    payload: number;
}

export interface PinListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.PIN_LIST;
    payload: number;
}

export interface UnpinListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.UNPIN_LIST;
    payload: number;
}

export interface SetPinedListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_PINED_LIST;
    payload: PinnedListResponse;
}

export interface SetUnpinListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_UNPIN_LIST;
    payload: PinnedListResponse;
}

export interface SetPinedListToUserListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_PINED_LIST_TO_USER_LIST;
    payload: PinnedListResponse;
}

export interface ResetListsStateActionInterface extends Action<ListsActionType> {
    type: ListsActionType.RESET_LISTS_STATE;
}

export interface SetLoadingStateInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetListsLoadingStateInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_LISTS_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetUserListsLoadingStateInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_USER_LISTS_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetPinnedListsLoadingStateInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_PINNED_LISTS_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetSimpleListsLoadingStateInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_SIMPLE_LISTS_LOADING_STATE;
    payload: LoadingStatus;
}

export type ListsActions =
    | SetListsActionInterface
    | SetUserListsActionInterface
    | SetPinnedListsActionInterface
    | SetUpdatedListActionInterface
    | SetFollowListActionInterface
    | SetUnfollowListActionInterface
    | SetListActionInterface
    | SetPinedListActionInterface
    | SetSimpleListsActionInterface
    | SetUnpinListActionInterface
    | SetPinedListToUserListActionInterface
    | ResetListsStateActionInterface
    | SetLoadingStateInterface
    | SetListsLoadingStateInterface
    | SetUserListsLoadingStateInterface
    | SetPinnedListsLoadingStateInterface
    | SetSimpleListsLoadingStateInterface
