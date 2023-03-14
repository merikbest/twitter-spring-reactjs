import produce, { Draft } from "immer";

import { TagsActions, TagsActionsType } from "./contracts/actionTypes";
import { TagsState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const initialTagsState: TagsState = {
    tags: [],
    loadingTagsState: LoadingStatus.LOADING,
    trends: [],
    pagesCount: 0,
    loadingTrendsState: LoadingStatus.LOADING
};

export const tagsReducer = produce((draft: Draft<TagsState>, action: TagsActions) => {
    switch (action.type) {
        case TagsActionsType.SET_TAGS:
            draft.tags = action.payload;
            draft.loadingTagsState = LoadingStatus.LOADED;
            break;

        case TagsActionsType.SET_TRENDS:
            draft.trends = [...draft.trends, ...action.payload.items];
            draft.pagesCount = action.payload.pagesCount;
            draft.loadingTrendsState = LoadingStatus.LOADED;
            break;

        case TagsActionsType.RESET_TRENDS_STATE:
            draft.trends = [];
            draft.pagesCount = 0;
            draft.loadingTrendsState = LoadingStatus.LOADING;
            break;

        case TagsActionsType.SET_TAGS_LOADING_STATE:
            draft.loadingTagsState = action.payload;
            break;

        case TagsActionsType.SET_TRENDS_LOADING_STATE:
            draft.loadingTrendsState = action.payload;
            break;

        default:
            break;
    }
}, initialTagsState);
