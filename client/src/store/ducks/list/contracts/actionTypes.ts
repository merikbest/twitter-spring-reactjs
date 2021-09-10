import {Action} from "redux";

import {ListState} from "./state";
import {LoadingStatus} from "../../../types";

export enum ListActionType {
    SET_LIST = "list/SET_LISTS",
    FETCH_LIST_BY_ID = "list/FETCH_LIST_BY_ID",
    FOLLOW_LIST = "list/FOLLOW_LIST",
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

export interface FollowListActionInterface extends Action<ListActionType> {
    type: ListActionType.FOLLOW_LIST;
    payload: number;
}

export interface SetListLoadingStateInterface extends Action<ListActionType> {
    type: ListActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type ListActions =
    | SetListActionInterface
    | SetListLoadingStateInterface;
