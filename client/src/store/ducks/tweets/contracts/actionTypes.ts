import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {AddFormState, Image, Tweet, TweetsState} from "./state";
import {User} from "../../user/contracts/state";

export enum TweetsActionType {
    SET_TWEETS = "tweets/SET_TWEETS",
    ADD_TWEET = "tweets/ADD_TWEET",
    REMOVE_TWEET = 'tweets/REMOVE_TWEET',
    LIKE_TWEET = 'tweets/LIKE_TWEET',
    RETWEET = 'tweets/RETWEET',
    FETCH_LIKE_TWEET = 'tweets/FETCH_LIKE_TWEET',
    FETCH_RETWEET = 'tweets/FETCH_RETWEET',
    FETCH_ADD_TWEET = "tweets/FETCH_ADD_TWEET",
    FETCH_TWEETS = "tweets/FETCH_TWEETS",
    FETCH_TWEETS_BY_USER = "tweets/FETCH_TWEETS_BY_USER",
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
        images: Image[];
        likes: [];
        retweets: [];
    };
}

export interface RemoveTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.REMOVE_TWEET;
    payload: string;
}

export interface FetchLikeTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_LIKE_TWEET;
    payload: string;
}

export interface FetchRetweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_RETWEET;
    payload: string;
}

export interface LikeTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.LIKE_TWEET;
    payload: Tweet;
}

export interface RetweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.RETWEET;
    payload: Tweet;
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

export interface FetchTweetsByUserActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS_BY_USER;
    payload: User;
}

export interface FetchUserTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS_BY_USER;
    payload: string
}

export type TweetsActions =
    | SetTweetsActionInterface
    | FetchTweetsActionInterface
    | SetTweetsLoadingStateInterface
    | AddTweetActionInterface
    | FetchAddTweetActionInterface
    | SetAddFormStateInterface
    | RemoveTweetActionInterface
    | LikeTweetActionInterface
    | RetweetActionInterface
    | FetchTweetsByUserActionInterface
    | FetchUserTweetsActionInterface;
