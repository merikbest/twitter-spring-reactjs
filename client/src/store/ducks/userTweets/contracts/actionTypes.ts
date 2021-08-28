import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {Tweet} from "../../tweets/contracts/state";
import {PinnedTweet, UserTweetsState} from "./state";

export enum UserTweetsActionType {
    SET_TWEETS = "userTweets/SET_TWEETS",
    SET_ADDED_TWEET = "userTweets/SET_ADDED_TWEET",
    FETCH_TWEETS = "userTweets/FETCH_TWEETS",
    SET_LIKED_TWEET = 'userTweets/SET_LIKED_TWEET',
    FETCH_LIKED_TWEETS = "userTweets/FETCH_LIKED_TWEETS",
    FETCH_MEDIA_TWEETS = "userTweets/FETCH_MEDIA_TWEETS",
    FETCH_RETWEETS_AND_REPLIES = "userTweets/FETCH_RETWEETS_AND_REPLIES",
    PIN_TWEET = "userTweets/PIN_TWEET",
    UNPIN_TWEET = "userTweets/UNPIN_TWEET",
    DELETE_TWEET = "userTweets/DELETE_TWEET",
    SET_RETWEET = 'userTweets/SET_RETWEET',
    SET_LOADING_STATUS = "userTweets/SET_LOADING_STATUS",
}

export interface SetUserTweetsActionInterface extends Action<UserTweetsActionType> {
    type: UserTweetsActionType.SET_TWEETS;
    payload: UserTweetsState["items"];
}

export interface SetAddedUserTweetActionInterface extends Action<UserTweetsActionType> {
    type: UserTweetsActionType.SET_ADDED_TWEET;
    payload: Tweet;
}

export interface FetchUserTweetsActionInterface extends Action<UserTweetsActionType> {
    type: UserTweetsActionType.FETCH_TWEETS;
    payload: string;
}

export interface SetUserLikedTweetActionInterface extends Action<UserTweetsActionType> {
    type: UserTweetsActionType.SET_LIKED_TWEET;
    payload: Tweet;
}

export interface FetchUserLikedTweetsActionInterface extends Action<UserTweetsActionType> {
    type: UserTweetsActionType.FETCH_LIKED_TWEETS;
    payload: string;
}

export interface FetchUserMediaTweetsActionInterface extends Action<UserTweetsActionType> {
    type: UserTweetsActionType.FETCH_MEDIA_TWEETS;
    payload: string;
}

export interface FetchUserRetweetsAndRepliesActionInterface extends Action<UserTweetsActionType> {
    type: UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES;
    payload: string;
}

export interface PinTweetActionInterface extends Action<UserTweetsActionType> {
    type: UserTweetsActionType.PIN_TWEET;
    payload: PinnedTweet;
}

export interface UnpinTweetActionInterface extends Action<UserTweetsActionType> {
    type: UserTweetsActionType.UNPIN_TWEET;
    payload: PinnedTweet;
}

export interface DeleteTweetActionInterface extends Action<UserTweetsActionType> {
    type: UserTweetsActionType.DELETE_TWEET;
    payload: string;
}

export interface SetUserRetweetActionInterface extends Action<UserTweetsActionType> {
    type: UserTweetsActionType.SET_RETWEET;
    payload: Tweet;
}

export interface SetUserTweetsLoadingStatusInterface extends Action<UserTweetsActionType> {
    type: UserTweetsActionType.SET_LOADING_STATUS;
    payload: LoadingStatus;
}

export type UserTweetsActions =
    | SetUserTweetsActionInterface
    | SetAddedUserTweetActionInterface
    | SetUserLikedTweetActionInterface
    | SetUserRetweetActionInterface
    | SetUserTweetsLoadingStatusInterface
    | PinTweetActionInterface
    | DeleteTweetActionInterface;
