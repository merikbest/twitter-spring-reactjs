import produce, {Draft} from "immer";

import {LoadingStatus} from "../../types/common";
import {TopicsState} from "./contracts/state";
import {TopicsActions, TopicsActionsType} from "./contracts/actionTypes";

export const initialTopicsState: TopicsState = {
    topics: [],
    loadingState: LoadingStatus.LOADING,
};

export const topicsReducer = produce((draft: Draft<TopicsState>, action: TopicsActions) => {
    switch (action.type) {
        case TopicsActionsType.SET_TOPICS:
            draft.topics = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case TopicsActionsType.RESET_TOPICS_STATE:
            draft.topics = [];
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case TopicsActionsType.SET_TOPICS_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTopicsState);
