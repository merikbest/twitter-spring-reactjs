import { Action } from "redux";

import {
    FollowedTopicPayload,
    NotInterestedTopicPayload,
    SuggestedTopicsRequest,
    TopicActionPayload,
    TopicsCategoriesRequest,
    TopicsState
} from "./state";
import { LoadingStatus } from "../../../../types/common";

export enum TopicsActionsType {
    SET_TOPICS = "topics/SET_TOPICS",
    FETCH_TOPICS_BY_IDS = "topics/FETCH_TOPICS_BY_IDS",
    FETCH_TOPICS_BY_CATEGORIES = "topics/FETCH_TOPICS_BY_CATEGORIES",
    FETCH_FOLLOWED_TOPICS = "topics/FETCH_FOLLOWED_TOPICS",
    FETCH_FOLLOWED_TOPICS_BY_USER_ID = "topics/FETCH_FOLLOWED_TOPICS_BY_USER_ID",
    SET_FOLLOWED_TOPICS = "topics/SET_FOLLOWED_TOPICS",
    SET_TOPICS_BY_CATEGORIES = "topics/SET_TOPICS_BY_CATEGORIES",
    FETCH_NOT_INTERESTED_TOPICS = "topics/FETCH_NOT_INTERESTED_TOPICS",
    PROCESS_NOT_INTERESTED_TOPIC = "topics/PROCESS_NOT_INTERESTED_TOPIC",
    SET_NOT_INTERESTED_TOPIC = "topics/SET_NOT_INTERESTED_TOPIC",
    PROCESS_FOLLOW_TOPIC = "topics/PROCESS_FOLLOW_TOPIC",
    SET_FOLLOW_TOPIC = "topics/SET_FOLLOW_TOPIC",
    RESET_TOPICS_STATE = "topics/RESET_TOPICS_STATE",
    SET_TOPICS_LOADING_STATE = "topics/SET_TOPICS_LOADING_STATE",
    SET_TOPICS_BY_CATEGORIES_LOADING_STATE = "topics/SET_TOPICS_BY_CATEGORIES_LOADING_STATE",
    SET_FOLLOWED_TOPICS_LOADING_STATE = "topics/SET_FOLLOWED_TOPICS_LOADING_STATE",
}

export interface SetTopicsActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.SET_TOPICS;
    payload: TopicsState["topics"];
}

export interface FetchTopicsByIdsActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.FETCH_TOPICS_BY_IDS;
    payload: SuggestedTopicsRequest;
}

export interface FetchTopicsByCategoriesActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.FETCH_TOPICS_BY_CATEGORIES;
    payload: TopicsCategoriesRequest;
}

export interface FetchFollowedTopicsActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.FETCH_FOLLOWED_TOPICS;
}

export interface FetchFollowedTopicsByUserIdActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.FETCH_FOLLOWED_TOPICS_BY_USER_ID;
    payload: number;
}

export interface SetFollowedTopicsActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.SET_FOLLOWED_TOPICS;
    payload: TopicsState["followedTopics"];
}

export interface SetTopicsByCategoriesActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.SET_TOPICS_BY_CATEGORIES;
    payload: TopicsState["topicsByCategories"];
}

export interface FetchNotInterestedTopicsActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.FETCH_NOT_INTERESTED_TOPICS;
}

export interface ProcessNotInterestedTopicActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.PROCESS_NOT_INTERESTED_TOPIC;
    payload: number;
}

export interface SetNotInterestedTopicActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.SET_NOT_INTERESTED_TOPIC;
    payload: NotInterestedTopicPayload;
}

export interface ProcessFollowTopicActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.PROCESS_FOLLOW_TOPIC;
    payload: TopicActionPayload;
}

export interface SetFollowTopicActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.SET_FOLLOW_TOPIC;
    payload: FollowedTopicPayload;
}

export interface ResetTopicsStateActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.RESET_TOPICS_STATE;
}

export interface SetTopicsLoadingStateActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.SET_TOPICS_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetTopicsByCategoriesLoadingStateActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.SET_TOPICS_BY_CATEGORIES_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetFollowedTopicsLoadingStateActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.SET_FOLLOWED_TOPICS_LOADING_STATE;
    payload: LoadingStatus;
}

export type TopicsActions =
    | SetTopicsActionInterface
    | SetTopicsByCategoriesActionInterface
    | SetNotInterestedTopicActionInterface
    | SetFollowedTopicsActionInterface
    | SetFollowTopicActionInterface
    | ResetTopicsStateActionInterface
    | SetTopicsLoadingStateActionInterface
    | SetTopicsByCategoriesLoadingStateActionInterface
    | SetFollowedTopicsLoadingStateActionInterface;
