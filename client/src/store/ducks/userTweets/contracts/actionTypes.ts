import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {UserTweetsState} from "./state";
import {TweetResponse} from "../../../types/tweet";

export enum UserTweetsActionType {
    SET_TWEETS = "userTweets/SET_TWEETS", // +
    SET_FOLLOW_TO_USERS_TWEETS_STATE = "userTweets/SET_FOLLOW_TO_USERS_TWEETS_STATE", // +
    RESET_TWEETS = "userTweets/RESET_TWEETS", // +
    SET_ADDED_TWEET = "userTweets/SET_ADDED_TWEET",
    SET_UPDATED_TWEET = "userTweets/SET_UPDATED_TWEET", // +
    DELETE_TWEET = "userTweets/DELETE_TWEET", // +
    FETCH_TWEETS = "userTweets/FETCH_TWEETS", // +
    FETCH_LIKED_TWEETS = "userTweets/FETCH_LIKED_TWEETS", // +
    FETCH_MEDIA_TWEETS = "userTweets/FETCH_MEDIA_TWEETS", // +
    FETCH_RETWEETS_AND_REPLIES = "userTweets/FETCH_RETWEETS_AND_REPLIES", // +
    SET_LOADING_STATUS = "userTweets/SET_LOADING_STATUS", // +
}

export interface SetUserTweetsActionInterface extends Action<UserTweetsActionType> { // +
    type: UserTweetsActionType.SET_TWEETS;
    payload: { items: UserTweetsState["items"], pagesCount: UserTweetsState["pagesCount"] };
}

export interface SetFollowToUsersTweetStateActionInterface extends Action<UserTweetsActionType> { // +
    type: UserTweetsActionType.SET_FOLLOW_TO_USERS_TWEETS_STATE;
    payload: { userId: number; tweetId: number; isFollower: boolean; };
}

export interface ResetUserTweetsActionInterface extends Action<UserTweetsActionType> { // +
    type: UserTweetsActionType.RESET_TWEETS;
}

export interface SetAddedUserTweetActionInterface extends Action<UserTweetsActionType> { // +
    type: UserTweetsActionType.SET_ADDED_TWEET;
    payload: TweetResponse;
}

export interface SetUpdatedUserTweetActionInterface extends Action<UserTweetsActionType> { // +
    type: UserTweetsActionType.SET_UPDATED_TWEET;
    payload: TweetResponse;
}

export interface DeleteUserTweetActionInterface extends Action<UserTweetsActionType> { // +
    type: UserTweetsActionType.DELETE_TWEET;
    payload: TweetResponse;
}

export interface FetchUserTweetsActionInterface extends Action<UserTweetsActionType> { // +
    type: UserTweetsActionType.FETCH_TWEETS;
    payload: { userId: string; page: number };
}

export interface FetchUserLikedTweetsActionInterface extends Action<UserTweetsActionType> { // +
    type: UserTweetsActionType.FETCH_LIKED_TWEETS;
    payload: { userId: string; page: number };
}

export interface FetchUserMediaTweetsActionInterface extends Action<UserTweetsActionType> { // +
    type: UserTweetsActionType.FETCH_MEDIA_TWEETS;
    payload: { userId: string; page: number };
}

export interface FetchUserRetweetsAndRepliesActionInterface extends Action<UserTweetsActionType> { // +
    type: UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES;
    payload: { userId: string; page: number };
}

export interface SetUserTweetsLoadingStatusInterface extends Action<UserTweetsActionType> { // +
    type: UserTweetsActionType.SET_LOADING_STATUS;
    payload: LoadingStatus;
}

export type UserTweetsActions =
    | SetUserTweetsActionInterface // +
    | SetFollowToUsersTweetStateActionInterface // +
    | ResetUserTweetsActionInterface // +
    | SetAddedUserTweetActionInterface // +
    | SetUpdatedUserTweetActionInterface // +
    | DeleteUserTweetActionInterface // +
    | SetUserTweetsLoadingStatusInterface; // +
