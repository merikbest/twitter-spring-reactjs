import {Action} from "redux";
import {LoadingStatus} from "../../../types";
import {ReplyTweet, TweetState} from "./state";

export enum TweetActionType {
    SET_FOLLOW_TO_TWEET_STATE = 'tweet/SET_FOLLOW_TO_TWEET_STATE', // +
    SET_BLOCKED_TO_TWEET_STATE = 'tweet/SET_BLOCKED_TO_TWEET_STATE', // +
    SET_MUTED_TO_TWEET_STATE = 'tweet/SET_MUTED_TO_TWEET_STATE', // +
    SET_TWEET_DATA = "tweet/SET_TWEET_DATA", // +
    FETCH_TWEET_DATA = "tweet/FETCH_TWEET_DATA", // +
    RESET_TWEET_STATE = "tweet/RESET_TWEET_STATE", // +
    SET_LOADING_STATE = "tweet/SET_LOADING_STATE", // +
    ADD_TWEET_TO_BOOKMARKS = 'tweet/ADD_TWEET_TO_BOOKMARKS', // +
    SET_BOOKMARKED_TWEET = 'tweet/SET_BOOKMARKED_TWEET', // +
    FETCH_REPLY_TWEET = "tweet/FETCH_REPLY_TWEET", // +
    DELETE_TWEET_REPLY = "tweet/DELETE_TWEET_REPLY", // +
}

export interface SetFollowToTweetStateActionInterface extends Action<TweetActionType> { //+
    type: TweetActionType.SET_FOLLOW_TO_TWEET_STATE;
    payload: boolean;
}

export interface SetBlockedToTweetStateActionInterface extends Action<TweetActionType> { //+
    type: TweetActionType.SET_BLOCKED_TO_TWEET_STATE;
    payload: boolean;
}

export interface SetMutedToTweetStateActionInterface extends Action<TweetActionType> { //+
    type: TweetActionType.SET_MUTED_TO_TWEET_STATE;
    payload: boolean;
}

export interface SetTweetDataActionInterface extends Action<TweetActionType> { // +
    type: TweetActionType.SET_TWEET_DATA;
    payload: TweetState["data"];
}

export interface FetchTweetDataActionInterface extends Action<TweetActionType> { // +
    type: TweetActionType.FETCH_TWEET_DATA;
    payload: number;
}

export interface ResetTweetStateActionInterface extends Action<TweetActionType> { // +
    type: TweetActionType.RESET_TWEET_STATE;
}

export interface SetTweetDataLoadingStateInterface extends Action<TweetActionType> { // +
    type: TweetActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface AddTweetToBookmarksActionInterface extends Action<TweetActionType> { // +
    type: TweetActionType.ADD_TWEET_TO_BOOKMARKS;
    payload: string;
}

export interface SetBookmarkedTweetActionInterface extends Action<TweetActionType> { // +
    type: TweetActionType.SET_BOOKMARKED_TWEET;
    payload: boolean;
}

export interface FetchReplyTweetActionInterface extends Action<TweetActionType> { // +
    type: TweetActionType.FETCH_REPLY_TWEET;
    payload: ReplyTweet;
}

export interface DeleteTweetReplyActionInterface extends Action<TweetActionType> { // +
    type: TweetActionType.DELETE_TWEET_REPLY;
    payload: number;
}

export type TweetActions =
    | SetTweetDataActionInterface // +
    | ResetTweetStateActionInterface // +
    | SetTweetDataLoadingStateInterface // +
    | SetBookmarkedTweetActionInterface // +
    | SetFollowToTweetStateActionInterface // +
    | SetBlockedToTweetStateActionInterface // +
    | SetMutedToTweetStateActionInterface // +
