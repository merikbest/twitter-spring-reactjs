import {Action} from "redux";

import {EditListsRequest, ListState} from "./state";
import {LoadingStatus} from "../../../types";
import {TweetResponse} from "../../../types/tweet";

export enum ListActionType {
    SET_LIST = "list/SET_LISTS", // +
    SET_FOLLOW_TO_FULL_LIST = "list/SET_FOLLOW_TO_FULL_LIST", // +
    SET_UNFOLLOW_TO_FULL_LIST = "list/SET_UNFOLLOW_TO_FULL_LIST", // +
    SET_LIST_TWEETS = "list/SET_LIST_TWEETS", // +
    SET_MEMBERS_SIZE = "list/SET_MEMBERS_SIZE", // +
    FETCH_LIST_BY_ID = "list/FETCH_LIST_BY_ID", // +
    FETCH_TWEETS_BY_LIST_ID = "list/FETCH_TWEETS_BY_LIST_ID", // +
    EDIT_LIST = "list/EDIT_LIST", // +
    DELETE_LIST = "list/DELETE_LIST", // +
    RESET_LIST_STATE = "list/RESET_LIST_STATE", // +
    SET_LOADING_STATE = "list/SET_LOADING_STATE", // +
}

export interface SetListActionInterface extends Action<ListActionType> { // +
    type: ListActionType.SET_LIST;
    payload: ListState["list"];
}

export interface SetFollowToFullListActionInterface extends Action<ListActionType> { // +
    type: ListActionType.SET_FOLLOW_TO_FULL_LIST;
}

export interface SetUnfollowToFullListActionInterface extends Action<ListActionType> { // +
    type: ListActionType.SET_UNFOLLOW_TO_FULL_LIST;
}

export interface SetListsTweetsActionInterface extends Action<ListActionType> { // +
    type: ListActionType.SET_LIST_TWEETS;
    payload: TweetResponse[];
}

export interface SetMembersSizeActionInterface extends Action<ListActionType> { // +
    type: ListActionType.SET_MEMBERS_SIZE;
    payload: boolean;
}

export interface FetchListByIdActionInterface extends Action<ListActionType> { // +
    type: ListActionType.FETCH_LIST_BY_ID;
    payload: number;
}

export interface FetchTweetsByListIdActionInterface extends Action<ListActionType> { // +
    type: ListActionType.FETCH_TWEETS_BY_LIST_ID;
    payload: {listId: number, pageNumber: number};
}

export interface EditListActionInterface extends Action<ListActionType> { // +
    type: ListActionType.EDIT_LIST;
    payload: EditListsRequest;
}

export interface DeleteListActionInterface extends Action<ListActionType> { // +
    type: ListActionType.DELETE_LIST;
    payload: number;
}

export interface ResetListStateActionInterface extends Action<ListActionType> { // +
    type: ListActionType.RESET_LIST_STATE;
}

export interface SetListLoadingStateInterface extends Action<ListActionType> { // +
    type: ListActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type ListActions =
    | SetListActionInterface // +
    | SetFollowToFullListActionInterface // +
    | SetUnfollowToFullListActionInterface // +
    | SetListsTweetsActionInterface // +
    | SetMembersSizeActionInterface // +
    | ResetListStateActionInterface // +
    | SetListLoadingStateInterface; // +
