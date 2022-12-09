import {Action} from "redux";

import {TopicsState} from "./state";
import {LoadingStatus} from "../../../types/common";

export enum TopicsActionsType {
    SET_TOPICS = "topics/SET_TOPICS",
    FETCH_TOPICS = "topics/FETCH_TOPICS",
    FETCH_NOT_INTERESTED_TOPICS = "topics/FETCH_NOT_INTERESTED_TOPICS",
    RESET_TOPICS_STATE = "topics/RESET_TOPICS_STATE",
    SET_TOPICS_LOADING_STATE = "topics/SET_TOPICS_LOADING_STATE",
}

export interface SetTopicsActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.SET_TOPICS;
    payload: TopicsState["topics"];
}

export interface FetchTopicsActionInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.FETCH_TOPICS;
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

export type TopicsActions =
    | SetTopicsActionInterface
    | ResetTopicsStateActionInterface
    | SetTopicsLoadingStateActionInterface;
