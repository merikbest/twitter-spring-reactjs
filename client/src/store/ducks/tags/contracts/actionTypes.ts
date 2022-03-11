import {Action} from "redux";
import {LoadingStatus} from "../../../types";
import {TagResponse} from "../../../types/tag";

export enum TagsActionsType {
    SET_TAGS = 'tags/SET_TAGS',
    FETCH_TAGS = 'tags/FETCH_TAGS',
    FETCH_TRENDS = 'tags/FETCH_TRENDS',
    RESET_TAGS_STATE = 'tags/RESET_TRENDS_STATE',
    SET_LOADING_STATE = 'tags/SET_LOADING_STATE',
}

export interface SetTagsActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.SET_TAGS;
    payload: TagResponse[];
}

export interface FetchTagsActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.FETCH_TAGS;
}

export interface FetchTrendsActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.FETCH_TRENDS;
}

export interface ResetTagsStateActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.RESET_TAGS_STATE;
}

export interface SetTagsLoadingStateActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type TagsActions =
    | SetTagsActionInterface
    | ResetTagsStateActionInterface
    | SetTagsLoadingStateActionInterface;
