import {Action} from "redux";

import {AddLists, AddUserToLists, Lists, ListsState, MemberToList} from "./state";
import {LoadingStatus} from "../../../types";

export enum ListsActionType {
    SET_LISTS = "lists/SET_LISTS",
    SET_USER_LISTS = "lists/SET_USER_LISTS",
    SET_PINNED_LISTS = "lists/SET_PINNED_LISTS",
    SET_LIST = "lists/SET_LIST",
    SET_UPDATED_LISTS = "lists/SET_UPDATED_LISTS",
    FOLLOW_LIST = "lists/FOLLOW_LIST",
    UNFOLLOW_LIST = "lists/UNFOLLOW_LIST",
    SET_FOLLOW_LIST = "lists/SET_FOLLOW_LIST",
    SET_UNFOLLOW_LIST = "lists/SET_UNFOLLOW_LIST",
    CREATE_LIST = "lists/CREATE_LIST",
    FETCH_LISTS = "lists/FETCH_LISTS",
    FETCH_USER_LISTS = "lists/FETCH_USER_LISTS",
    FETCH_PINNED_LISTS = "lists/FETCH_PINNED_LISTS",
    ADD_USER_TO_LISTS = "lists/ADD_USER_TO_LISTS",
    PROCESS_LIST_MEMBER = "lists/PROCESS_LIST_MEMBER",
    PIN_LIST = "lists/PIN_LIST",
    UNPIN_LIST = "lists/UNPIN_LIST",
    SET_PINED_LIST = "lists/SET_PINED_LIST",
    SET_UNPIN_LIST = "lists/SET_UNPIN_LIST",
    SET_PINED_LIST_TO_USER_LIST = "lists/SET_PINED_LIST_TO_USER_LIST",
    SET_LOADING_STATE = "lists/SET_LOADING_STATE",
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

export interface SetListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_LIST;
    payload: Lists;
}

export interface SetUpdatedListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_UPDATED_LISTS;
    payload: Lists;
}

export interface FollowListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FOLLOW_LIST;
    payload: number;
}

export interface UnfollowListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.UNFOLLOW_LIST;
    payload: number;
}

export interface SetFollowListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_FOLLOW_LIST;
    payload: Lists;
}

export interface SetUnfollowListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_UNFOLLOW_LIST;
    payload: Lists;
}

export interface CreateListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.CREATE_LIST;
    payload: AddLists;
}

export interface FetchListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FETCH_LISTS;
}

export interface FetchUserListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FETCH_USER_LISTS;
}

export interface FetchPinnedListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.FETCH_PINNED_LISTS;
}

export interface AddUserToListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.ADD_USER_TO_LISTS;
    payload: AddUserToLists;
}

export interface ProcessListMemberActionInterface extends Action<ListsActionType> {
    type: ListsActionType.PROCESS_LIST_MEMBER;
    payload: MemberToList;
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
    payload: Lists;
}

export interface SetUnpinListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_UNPIN_LIST;
    payload: Lists;
}

export interface SetPinedListToUserListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_PINED_LIST_TO_USER_LIST;
    payload: Lists;
}

export interface SetListsLoadingStateInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_LOADING_STATE;
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
    | SetUnpinListActionInterface
    | SetPinedListToUserListActionInterface
    | SetListsLoadingStateInterface;
