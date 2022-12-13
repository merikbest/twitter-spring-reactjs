import {Action} from "redux";

import {SuggestedTopicsRequest, TopicsCategoriesRequest, TopicsState} from "./state";
import {LoadingStatus} from "../../../types/common";

export enum TopicsActionsType {
    SET_TOPICS = "topics/SET_TOPICS",
    FETCH_TOPICS_BY_IDS = "topics/FETCH_TOPICS_BY_IDS",
    FETCH_TOPICS_BY_CATEGORIES = "topics/FETCH_TOPICS_BY_CATEGORIES",
    SET_TOPICS_BY_CATEGORIES = "topics/SET_TOPICS_BY_CATEGORIES",
    FETCH_NOT_INTERESTED_TOPICS = "topics/FETCH_NOT_INTERESTED_TOPICS",
    RESET_TOPICS_STATE = "topics/RESET_TOPICS_STATE",
    SET_TOPICS_LOADING_STATE = "topics/SET_TOPICS_LOADING_STATE",
    SET_TOPICS_BY_CATEGORIES_LOADING_STATE = "topics/SET_TOPICS_BY_CATEGORIES_LOADING_STATE",
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

export interface SetTopicsByCategoriesActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.SET_TOPICS_BY_CATEGORIES;
    payload: TopicsState["topicsByCategories"];
}

export interface FetchNotInterestedTopicsActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.FETCH_NOT_INTERESTED_TOPICS;
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

export type TopicsActions =
    | SetTopicsActionInterface
    | SetTopicsByCategoriesActionInterface
    | ResetTopicsStateActionInterface
    | SetTopicsLoadingStateActionInterface
    | SetTopicsByCategoriesLoadingStateActionInterface;
