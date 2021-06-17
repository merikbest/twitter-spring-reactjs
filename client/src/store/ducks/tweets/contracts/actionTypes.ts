import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {AddFormState, Tweet, TweetsState} from "./state";

export enum TweetsActionType {
    SET_TWEETS = "tweets/SET_TWEETS",
    ADD_TWEET = "tweets/ADD_TWEET",
    REMOVE_TWEET = 'tweets/REMOVE_TWEET',
    FETCH_ADD_TWEET = "tweets/FETCH_ADD_TWEET",
    FETCH_TWEETS = "tweets/FETCH_TWEETS",
    SET_LOADING_STATE = "tweets/SET_LOADING_STATE",
    SET_ADD_FORM_STATE = "tweets/SET_ADD_FORM_STATE"
}

export interface SetTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_TWEETS;
    payload: TweetsState["items"];
}

export interface AddTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.ADD_TWEET;
    payload: Tweet[];
}

export interface FetchAddTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_ADD_TWEET;
    payload: {
        text: string;
        images: string[];
    };
}

export interface RemoveTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.REMOVE_TWEET;
    payload: string;
}

export interface SetTweetsLoadingStateInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetAddFormStateInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_ADD_FORM_STATE;
    payload: AddFormState;
}

export interface FetchTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS;
}

export type TweetsActions =
    | SetTweetsActionInterface
    | FetchTweetsActionInterface
    | SetTweetsLoadingStateInterface
    | AddTweetActionInterface
    | FetchAddTweetActionInterface
    | SetAddFormStateInterface
    | RemoveTweetActionInterface;
