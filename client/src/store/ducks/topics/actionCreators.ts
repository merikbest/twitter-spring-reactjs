import {
    FetchNotInterestedTopicsActionInterface,
    FetchTopicsActionInterface,
    FetchTopicsByCategoriesActionInterface,
    FetchTopicsByIdsActionInterface,
    ResetTopicsStateActionInterface,
    SetTopicsActionInterface,
    SetTopicsByCategoriesActionInterface,
    SetTopicsByCategoriesLoadingStateActionInterface,
    SetTopicsLoadingStateActionInterface,
    TopicsActionsType
} from "./contracts/actionTypes";
import {SuggestedTopicsRequest, TopicsCategoriesRequest, TopicsState} from "./contracts/state";
import {LoadingStatus} from "../../types/common";

export const setTopics = (payload: TopicsState["topics"]): SetTopicsActionInterface => ({
    type: TopicsActionsType.SET_TOPICS,
    payload,
});

export const fetchTopics = (): FetchTopicsActionInterface => ({
    type: TopicsActionsType.FETCH_TOPICS,
});

export const fetchTopicsByIds = (payload: SuggestedTopicsRequest): FetchTopicsByIdsActionInterface => ({
    type: TopicsActionsType.FETCH_TOPICS_BY_IDS,
    payload,
});

export const setTopicsByCategories = (payload: TopicsState["topicsByCategories"]): SetTopicsByCategoriesActionInterface => ({
    type: TopicsActionsType.SET_TOPICS_BY_CATEGORIES,
    payload,
});

export const fetchTopicsByCategories = (payload: TopicsCategoriesRequest): FetchTopicsByCategoriesActionInterface => ({
    type: TopicsActionsType.FETCH_TOPICS_BY_CATEGORIES,
    payload,
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

export const setTopicsByCategoriesLoadingState = (payload: LoadingStatus): SetTopicsByCategoriesLoadingStateActionInterface => ({
    type: TopicsActionsType.SET_TOPICS_BY_CATEGORIES_LOADING_STATE,
    payload,
});
