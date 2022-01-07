import {Action} from "redux";

import {ListState} from "./state";
import {LoadingStatus} from "../../../types";
import {EditLists} from "../../lists/contracts/state";

export enum ListActionType {
    SET_LIST = "list/SET_LISTS",
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

export interface FetchListByIdActionInterface extends Action<ListActionType> {
    type: ListActionType.FETCH_LIST_BY_ID;
    payload: string;
}

export interface EditListActionInterface extends Action<ListActionType> {
    type: ListActionType.EDIT_LIST;
    payload: EditLists;
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
    | ResetListStateActionInterface
    | SetListLoadingStateInterface;
