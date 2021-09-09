import {Action} from "redux";

import {AddLists, Lists, ListsState} from "./state";
import {LoadingStatus} from "../../../types";

export enum ListsActionType {
    SET_LISTS = "tweetLists/SET_LISTS",
    SET_USER_LISTS = "tweetLists/SET_USER_LISTS",
    SET_LIST = "tweetLists/SET_LIST",
    CREATE_LIST = "tweetLists/CREATE_LIST",
    FETCH_LISTS = "tweetLists/FETCH_LISTS",
    FETCH_USER_LISTS = "tweetLists/FETCH_USER_LISTS",
    SET_LOADING_STATE = "tweetLists/SET_LOADING_STATE",
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

export interface SetListsLoadingStateInterface extends Action<ListsActionType> {
    type: ListsActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type ListsActions =
    | SetListsActionInterface
    | SetUserListsActionInterface
    | SetListActionInterface
    | SetListsLoadingStateInterface;
