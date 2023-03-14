import {
    FetchFollowedTopicsActionInterface,
    FetchFollowedTopicsByUserIdActionInterface,
    FetchNotInterestedTopicsActionInterface,
    FetchTopicsByCategoriesActionInterface,
    FetchTopicsByIdsActionInterface,
    ProcessFollowTopicActionInterface,
    ProcessNotInterestedTopicActionInterface,
    ResetTopicsStateActionInterface,
    SetFollowedTopicsActionInterface,
    SetFollowedTopicsLoadingStateActionInterface,
    SetFollowTopicActionInterface,
    SetNotInterestedTopicActionInterface,
    SetTopicsActionInterface,
    SetTopicsByCategoriesActionInterface,
    SetTopicsByCategoriesLoadingStateActionInterface,
    SetTopicsLoadingStateActionInterface,
    TopicsActionsType
} from "./contracts/actionTypes";
import {
    FollowedTopicPayload,
    NotInterestedTopicPayload,
    SuggestedTopicsRequest,
    TopicActionPayload,
    TopicsCategoriesRequest,
    TopicsState
} from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const setTopics = (payload: TopicsState["topics"]): SetTopicsActionInterface => ({
    type: TopicsActionsType.SET_TOPICS,
    payload
});

export const fetchTopicsByIds = (payload: SuggestedTopicsRequest): FetchTopicsByIdsActionInterface => ({
    type: TopicsActionsType.FETCH_TOPICS_BY_IDS,
    payload
});

export const setTopicsByCategories = (payload: TopicsState["topicsByCategories"]): SetTopicsByCategoriesActionInterface => ({
    type: TopicsActionsType.SET_TOPICS_BY_CATEGORIES,
    payload
});

export const fetchTopicsByCategories = (payload: TopicsCategoriesRequest): FetchTopicsByCategoriesActionInterface => ({
    type: TopicsActionsType.FETCH_TOPICS_BY_CATEGORIES,
    payload
});

export const fetchNotInterestedTopics = (): FetchNotInterestedTopicsActionInterface => ({
    type: TopicsActionsType.FETCH_NOT_INTERESTED_TOPICS
});

export const fetchFollowedTopics = (): FetchFollowedTopicsActionInterface => ({
    type: TopicsActionsType.FETCH_FOLLOWED_TOPICS
});

export const fetchFollowedTopicsByUserId = (payload: number): FetchFollowedTopicsByUserIdActionInterface => ({
    type: TopicsActionsType.FETCH_FOLLOWED_TOPICS_BY_USER_ID,
    payload
});

export const setFollowedTopics = (payload: TopicsState["followedTopics"]): SetFollowedTopicsActionInterface => ({
    type: TopicsActionsType.SET_FOLLOWED_TOPICS,
    payload
});

export const processNotInterestedTopic = (payload: number): ProcessNotInterestedTopicActionInterface => ({
    type: TopicsActionsType.PROCESS_NOT_INTERESTED_TOPIC,
    payload
});

export const setNotInterestedTopic = (payload: NotInterestedTopicPayload): SetNotInterestedTopicActionInterface => ({
    type: TopicsActionsType.SET_NOT_INTERESTED_TOPIC,
    payload
});

export const processFollowTopic = (payload: TopicActionPayload): ProcessFollowTopicActionInterface => ({
    type: TopicsActionsType.PROCESS_FOLLOW_TOPIC,
    payload
});

export const setFollowTopic = (payload: FollowedTopicPayload): SetFollowTopicActionInterface => ({
    type: TopicsActionsType.SET_FOLLOW_TOPIC,
    payload
});

export const resetTopicsState = (): ResetTopicsStateActionInterface => ({
    type: TopicsActionsType.RESET_TOPICS_STATE
});

export const setTopicsLoadingState = (payload: LoadingStatus): SetTopicsLoadingStateActionInterface => ({
    type: TopicsActionsType.SET_TOPICS_LOADING_STATE,
    payload
});

export const setTopicsByCategoriesLoadingState = (payload: LoadingStatus): SetTopicsByCategoriesLoadingStateActionInterface => ({
    type: TopicsActionsType.SET_TOPICS_BY_CATEGORIES_LOADING_STATE,
    payload
});

export const setFollowedTopicsLoadingState = (payload: LoadingStatus): SetFollowedTopicsLoadingStateActionInterface => ({
    type: TopicsActionsType.SET_FOLLOWED_TOPICS_LOADING_STATE,
    payload
});
