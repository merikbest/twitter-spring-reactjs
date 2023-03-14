import { Action } from "redux";

import { BaseListResponse } from "../../../../types/lists";
import { ListDetailsRequest } from "./state";
import { LoadingStatus } from "../../../../types/common";

export enum ListDetailActionsType {
    SET_LIST_DETAIL = "listDetail/SET_LIST_DETAIL",
    FETCH_LIST_DETAIL = "listDetail/FETCH_LIST_DETAIL",
    UPDATE_FOLLOW_LIST_DETAIL = "listDetail/UPDATE_FOLLOW_LIST_DETAIL",
    RESET_LIST_DETAIL_STATE = "listDetail/RESET_LIST_DETAIL_STATE",
    SET_LOADING_STATE = "listDetail/SET_LOADING_STATE",
}

export interface SetListDetailActionInterface extends Action<ListDetailActionsType> {
    type: ListDetailActionsType.SET_LIST_DETAIL;
    payload: BaseListResponse;
}

export interface FetchListDetailActionInterface extends Action<ListDetailActionsType> {
    type: ListDetailActionsType.FETCH_LIST_DETAIL;
    payload: ListDetailsRequest;
}

export interface UpdateFollowListDetailActionInterface extends Action<ListDetailActionsType> {
    type: ListDetailActionsType.UPDATE_FOLLOW_LIST_DETAIL;
    payload: boolean;
}

export interface ResetListDetailStateActionInterface extends Action<ListDetailActionsType> {
    type: ListDetailActionsType.RESET_LIST_DETAIL_STATE;
}

export interface SetListDetailLoadingStateActionInterface extends Action<ListDetailActionsType> {
    type: ListDetailActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type UserDetailActions =
    | SetListDetailActionInterface
    | UpdateFollowListDetailActionInterface
    | ResetListDetailStateActionInterface
    | SetListDetailLoadingStateActionInterface
