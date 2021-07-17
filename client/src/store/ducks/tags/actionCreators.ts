import {LoadingStatus} from '../../types';
import {
    FetchTagsActionInterface, FetchTrendsActionInterface,
    SetTagsActionInterface,
    SetTagsLoadingStateActionInterface,
    TagsActionsType
} from './contracts/actionTypes';
import {Tag} from './contracts/state';

export const setTags = (payload: Tag[]): SetTagsActionInterface => ({
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
