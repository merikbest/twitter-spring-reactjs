import {Action} from "redux";

import {AddLists, AddTweetToLists, AddUserToLists, Lists, ListsState} from "./state";
import {LoadingStatus} from "../../../types";

export enum ListsActionType {
    SET_LISTS = "lists/SET_LISTS",
    SET_USER_LISTS = "lists/SET_USER_LISTS",
    SET_LIST = "lists/SET_LIST",
    SET_FOLLOW_LIST = "lists/SET_FOLLOW_LIST",
    CREATE_LIST = "lists/CREATE_LIST",
    FETCH_LISTS = "lists/FETCH_LISTS",
    FETCH_USER_LISTS = "lists/FETCH_USER_LISTS",
    ADD_TWEET_TO_LISTS = "lists/ADD_TWEET_TO_LISTS",
    ADD_USER_TO_LISTS = "lists/ADD_USER_TO_LISTS",
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

export interface SetListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_LIST;
    payload: Lists;
}

export interface SetFollowListActionInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_FOLLOW_LIST;
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

export interface AddTweetToListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.ADD_TWEET_TO_LISTS;
    payload: AddTweetToLists;
}

export interface AddUserToListsActionInterface extends Action<ListsActionType> {
    type: ListsActionType.ADD_USER_TO_LISTS;
    payload: AddUserToLists;
}

export interface SetListsLoadingStateInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type ListsActions =
    | SetListsActionInterface
    | SetUserListsActionInterface
    | SetFollowListActionInterface
    | SetListActionInterface
    | SetListsLoadingStateInterface;
