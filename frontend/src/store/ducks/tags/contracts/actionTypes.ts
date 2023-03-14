import { Action } from "redux";

import { TagsState } from "./state";
import { LoadingStatus, PageableResponse } from "../../../../types/common";

export enum TagsActionsType {
    SET_TAGS = "tags/SET_TAGS",
    FETCH_TAGS = "tags/FETCH_TAGS",
    SET_TRENDS = "tags/SET_TRENDS",
    FETCH_TRENDS = "tags/FETCH_TRENDS",
    RESET_TRENDS_STATE = "tags/RESET_TRENDS_STATE",
    SET_TAGS_LOADING_STATE = "tags/SET_TAGS_LOADING_STATE",
    SET_TRENDS_LOADING_STATE = "tags/SET_TRENDS_LOADING_STATE",
}

export interface SetTagsActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.SET_TAGS;
    payload: TagsState["tags"];
}

export interface FetchTagsActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.FETCH_TAGS;
}

export interface SetTrendsActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.SET_TRENDS;
    payload: PageableResponse<TagsState["tags"]>;
}

export interface FetchTrendsActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.FETCH_TRENDS;
    payload: number;
}

export interface ResetTrendsStateActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.RESET_TRENDS_STATE;
}

export interface SetTagsLoadingStateActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.SET_TAGS_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetTrendsLoadingStateActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.SET_TRENDS_LOADING_STATE;
    payload: LoadingStatus;
}

export type TagsActions =
    | SetTagsActionInterface
    | SetTrendsActionInterface
    | ResetTrendsStateActionInterface
    | SetTagsLoadingStateActionInterface
    | SetTrendsLoadingStateActionInterface;
