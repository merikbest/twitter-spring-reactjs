import produce, {Draft} from "immer";

import {LoadingStatus} from "../../types/common";
import {TopicsState} from "./contracts/state";
import {TopicsActions, TopicsActionsType} from "./contracts/actionTypes";

export const initialTopicsState: TopicsState = {
    topics: [],
    topicsLoadingState: LoadingStatus.LOADING,
    topicsByCategories: [],
    topicsByCategoriesLoadingState: LoadingStatus.LOADING,
};

export const topicsReducer = produce((draft: Draft<TopicsState>, action: TopicsActions) => {
    switch (action.type) {
        case TopicsActionsType.SET_TOPICS:
            draft.topics = action.payload;
            draft.topicsLoadingState = LoadingStatus.LOADED;
            break;

        case TopicsActionsType.SET_TOPICS_BY_CATEGORIES:
            draft.topicsByCategories = action.payload;
            draft.topicsByCategoriesLoadingState = LoadingStatus.LOADED;
            break;

        case TopicsActionsType.RESET_TOPICS_STATE:
            draft.topics = [];
            draft.topicsLoadingState = LoadingStatus.LOADING;
            draft.topicsByCategories = [];
            draft.topicsByCategoriesLoadingState = LoadingStatus.LOADING;
            break;

        case TopicsActionsType.SET_TOPICS_LOADING_STATE:
            draft.topicsLoadingState = action.payload;
            break;

        case TopicsActionsType.SET_TOPICS_BY_CATEGORIES_LOADING_STATE:
            draft.topicsByCategoriesLoadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTopicsState);
