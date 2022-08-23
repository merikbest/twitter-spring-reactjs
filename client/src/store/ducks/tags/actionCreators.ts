import {LoadingStatus} from '../../types';
import {
    FetchTagsActionInterface,
    FetchTrendsActionInterface,
    ResetTrendsStateActionInterface,
    SetTagsActionInterface,
    SetTagsLoadingStateActionInterface,
    SetTrendsActionInterface,
    SetTrendsLoadingStateActionInterface,
    TagsActionsType
} from './contracts/actionTypes';
import {TagsState} from "./contracts/state";

export const setTags = (payload: TagsState["tags"]): SetTagsActionInterface => ({
    type: TagsActionsType.SET_TAGS,
    payload,
});

export const fetchTags = (): FetchTagsActionInterface => ({
    type: TagsActionsType.FETCH_TAGS,
});

export const setTagsLoadingState = (payload: LoadingStatus): SetTagsLoadingStateActionInterface => ({
    type: TagsActionsType.SET_TAGS_LOADING_STATE,
    payload,
});

export const setTrends = (payload: { items: TagsState["tags"], pagesCount: TagsState["pagesCount"] }): SetTrendsActionInterface => ({
    type: TagsActionsType.SET_TRENDS,
    payload,
});

export const fetchTrends = (payload: number): FetchTrendsActionInterface => ({
    type: TagsActionsType.FETCH_TRENDS,
    payload
});

export const setTrendsLoadingState = (payload: LoadingStatus): SetTrendsLoadingStateActionInterface => ({
    type: TagsActionsType.SET_TRENDS_LOADING_STATE,
    payload,
});

export const resetTrendsState = (): ResetTrendsStateActionInterface => ({
    type: TagsActionsType.RESET_TRENDS_STATE,
});
