import {Action} from "redux";
import {LoadingStatus} from "../../../types";
import {ReplyTweet, TweetState} from "./state";

export enum TweetActionType {
    SET_TWEET_DATA = "tweet/SET_TWEET_DATA",
    FETCH_TWEET_DATA = "tweet/FETCH_TWEET_DATA",
    FETCH_REPLY_TWEET = "tweet/FETCH_REPLY_TWEET",
    DELETE_TWEET_REPLY = "tweet/DELETE_TWEET_REPLY",
    RESET_TWEET_STATE = "tweet/RESET_TWEET_STATE",
    SET_LOADING_STATE = "tweet/SET_LOADING_STATE",
}

export interface SetTweetDataActionInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_TWEET_DATA;
    payload: TweetState["data"];
}

export interface FetchTweetDataActionInterface extends Action<TweetActionType> {
    type: TweetActionType.FETCH_TWEET_DATA;
    payload: string;
}

export interface FetchReplyTweetActionInterface extends Action<TweetActionType> {
    type: TweetActionType.FETCH_REPLY_TWEET;
    payload: ReplyTweet;
}

export interface DeleteTweetReplyActionInterface extends Action<TweetActionType> {
    type: TweetActionType.DELETE_TWEET_REPLY;
    payload: string;
}

export interface ResetTweetStateActionInterface extends Action<TweetActionType> {
    type: TweetActionType.RESET_TWEET_STATE;
}

export interface SetTweetDataLoadingStateInterface extends Action<TweetActionType> {
    type: TweetActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type TweetActions =
    | SetTweetDataActionInterface
    | FetchTweetDataActionInterface
    | ResetTweetStateActionInterface
    | SetTweetDataLoadingStateInterface
