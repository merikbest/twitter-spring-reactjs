import {
    FetchNotInterestedTopicsActionInterface,
    FetchTopicsActionInterface,
    ResetTopicsStateActionInterface,
    SetTopicsActionInterface,
    SetTopicsLoadingStateActionInterface,
    TopicsActionsType
} from "./contracts/actionTypes";
import {TopicsState} from "./contracts/state";
import {LoadingStatus} from "../../types/common";

export const setTopics = (payload: TopicsState["topics"]): SetTopicsActionInterface => ({
    type: TopicsActionsType.SET_TOPICS,
    payload,
});

export const fetchTopics = (): FetchTopicsActionInterface => ({
    type: TopicsActionsType.FETCH_TOPICS,
});

export const fetchNotInterestedTopics = (): FetchNotInterestedTopicsActionInterface => ({
    type: TopicsActionsType.FETCH_NOT_INTERESTED_TOPICS,
});

export const resetTopicsState = (): ResetTopicsStateActionInterface => ({
    type: TopicsActionsType.RESET_TOPICS_STATE,
});

export const setTopicsLoadingState = (payload: LoadingStatus): SetTopicsLoadingStateActionInterface => ({
    type: TopicsActionsType.SET_TOPICS_LOADING_STATE,
    payload,
});
