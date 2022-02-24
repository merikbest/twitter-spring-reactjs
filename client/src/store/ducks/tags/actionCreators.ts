import {LoadingStatus} from '../../types';
import {
    FetchTagsActionInterface,
    FetchTrendsActionInterface,
    ResetTagsStateActionInterface,
    SetTagsActionInterface,
    SetTagsLoadingStateActionInterface,
    TagsActionsType
} from './contracts/actionTypes';
import {TagResponse} from "../../types/tag";

export const setTags = (payload: TagResponse[]): SetTagsActionInterface => ({
    type: TagsActionsType.SET_TAGS,
    payload,
});

export const setTagsLoadingState = (payload: LoadingStatus): SetTagsLoadingStateActionInterface => ({
    type: TagsActionsType.SET_LOADING_STATE,
    payload,
});

export const fetchTags = (): FetchTagsActionInterface => ({
    type: TagsActionsType.FETCH_TAGS,
});

export const fetchTrends = (): FetchTrendsActionInterface => ({
    type: TagsActionsType.FETCH_TRENDS,
});

export const resetTagsState = (): ResetTagsStateActionInterface => ({
    type: TagsActionsType.RESET_TAGS_STATE,
});
