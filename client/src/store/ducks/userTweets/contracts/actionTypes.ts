import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {Tweet, UserTweetsState} from "./state";

export enum UserTweetsActionType {
    SET_TWEETS = "userTweets/SET_TWEETS",
    FETCH_TWEETS = "userTweets/FETCH_TWEETS",
    SET_LIKED_TWEET = 'userTweets/SET_LIKED_TWEET',
    FETCH_LIKED_TWEETS = "userTweets/FETCH_LIKED_TWEETS",
    SET_RETWEET = 'userTweets/SET_RETWEET',
    SET_LOADING_STATUS = "userTweets/SET_LOADING_STATUS",
}

export interface SetUserTweetsActionInterface extends Action<UserTweetsActionType> {
    type: UserTweetsActionType.SET_TWEETS;
    payload: UserTweetsState["items"];
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
    | SetUserLikedTweetActionInterface
    | SetUserRetweetActionInterface
    | SetUserTweetsLoadingStatusInterface;
