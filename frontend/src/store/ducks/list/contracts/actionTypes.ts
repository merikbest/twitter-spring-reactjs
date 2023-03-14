import { Action } from "redux";

import { EditListsRequest, ListState } from "./state";
import { LoadingStatus } from "../../../../types/common";

export enum ListActionType {
    SET_LIST = "list/SET_LISTS",
    UPDATE_FOLLOW_TO_FULL_LIST = "list/UPDATE_FOLLOW_TO_FULL_LIST",
    SET_MEMBERS_SIZE = "list/SET_MEMBERS_SIZE",
    FETCH_LIST_BY_ID = "list/FETCH_LIST_BY_ID",
    EDIT_LIST = "list/EDIT_LIST",
    DELETE_LIST = "list/DELETE_LIST",
    RESET_LIST_STATE = "list/RESET_LIST_STATE",
    SET_LOADING_STATE = "list/SET_LOADING_STATE",
}

export interface SetListActionInterface extends Action<ListActionType> {
    type: ListActionType.SET_LIST;
    payload: ListState["list"];
}

export interface UpdateFollowToFullListActionInterface extends Action<ListActionType> {
    type: ListActionType.UPDATE_FOLLOW_TO_FULL_LIST;
    payload: boolean;
}

export interface SetMembersSizeActionInterface extends Action<ListActionType> {
    type: ListActionType.SET_MEMBERS_SIZE;
    payload: boolean;
}

export interface FetchListByIdActionInterface extends Action<ListActionType> {
    type: ListActionType.FETCH_LIST_BY_ID;
    payload: number;
}

export interface EditListActionInterface extends Action<ListActionType> {
    type: ListActionType.EDIT_LIST;
    payload: EditListsRequest;
}

export interface DeleteListActionInterface extends Action<ListActionType> {
    type: ListActionType.DELETE_LIST;
    payload: number;
}

export interface ResetListStateActionInterface extends Action<ListActionType> {
    type: ListActionType.RESET_LIST_STATE;
}

export interface SetListLoadingStateInterface extends Action<ListActionType> {
    type: ListActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type ListActions =
    | SetListActionInterface
    | UpdateFollowToFullListActionInterface
    | SetMembersSizeActionInterface
    | ResetListStateActionInterface
    | SetListLoadingStateInterface;
