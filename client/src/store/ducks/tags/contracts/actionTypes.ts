import {Action} from "redux";
import {Tag} from "./state";
import {LoadingStatus} from "../../../types";

export enum TagsActionsType {
    SET_TAGS = 'tags/SET_TAGS',
    FETCH_TAGS = 'tags/FETCH_TAGS',
    FETCH_TRENDS = 'tags/FETCH_TRENDS',
    SET_LOADING_STATE = 'tags/SET_LOADING_STATE',
}

export interface SetTagsActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.SET_TAGS;
    payload: Tag[];
}

export interface FetchTagsActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.FETCH_TAGS;
}

export interface FetchTrendsActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.FETCH_TRENDS;
}

export interface SetTagsLoadingStateActionInterface extends Action<TagsActionsType> {
    type: TagsActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type TagsActions =
    | SetTagsActionInterface
    | SetTagsLoadingStateActionInterface;
