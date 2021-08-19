import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {AddTweet, Tweet, TweetsState} from "./state";

export enum TweetsActionType {
    SET_TWEETS = "tweets/SET_TWEETS",
    SET_TWEET = "tweets/SET_TWEET",
    LIKE_TWEET = 'tweets/LIKE_TWEET',
    RETWEET = 'tweets/RETWEET',
    REPLY = 'tweets/REPLY',
    FETCH_LIKE_TWEET = 'tweets/FETCH_LIKE_TWEET',
    FETCH_RETWEET = 'tweets/FETCH_RETWEET',
    FETCH_ADD_TWEET = "tweets/FETCH_ADD_TWEET",
    FETCH_TWEETS = "tweets/FETCH_TWEETS",
    FETCH_MEDIA_TWEETS = "tweets/FETCH_MEDIA_TWEETS",
    FETCH_TWEETS_BY_TAG = "tweets/FETCH_TWEETS_BY_TAG",
    FETCH_TWEETS_BY_TEXT = "tweets/FETCH_TWEETS_BY_TEXT",
    FETCH_LIKED_TWEETS = "tweets/FETCH_LIKED_TWEETS",
    FETCH_BOOKMARKS = "tweets/FETCH_BOOKMARKS",
    REMOVE_TWEET_FROM_BOOKMARKS = "tweets/REMOVE_TWEET_FROM_BOOKMARKS",
    SET_LOADING_STATE = "tweets/SET_LOADING_STATE",
}

export interface SetTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_TWEETS;
    payload: TweetsState["items"];
}

export interface SetTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_TWEET;
    payload: Tweet;
}

export interface FetchAddTweetActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_ADD_TWEET;
    payload: AddTweet;
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

export interface ReplyActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.REPLY;
    payload: Tweet;
}

export interface SetTweetsLoadingStateInterface extends Action<TweetsActionType> {
    type: TweetsActionType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export interface FetchTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS;
}

export interface FetchMediaTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_MEDIA_TWEETS;
}

export interface FetchTweetsByTagActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS_BY_TAG;
    payload: string;
}

export interface FetchTweetsByTextActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_TWEETS_BY_TEXT;
    payload: string;
}

export interface FetchLikedTweetsActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_LIKED_TWEETS;
    payload: string;
}

export interface FetchBookmarksActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.FETCH_BOOKMARKS;
}

export interface RemoveTweetFromBookmarksActionInterface extends Action<TweetsActionType> {
    type: TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS;
    payload: string;
}

export type TweetsActions =
    | SetTweetsActionInterface
    | SetTweetsLoadingStateInterface
    | FetchAddTweetActionInterface
    | SetTweetActionInterface
    | LikeTweetActionInterface
    | RetweetActionInterface
    | ReplyActionInterface
    | RemoveTweetFromBookmarksActionInterface;
