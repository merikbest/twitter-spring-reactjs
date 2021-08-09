import {UserTweetsState} from "./contracts/state";
import {LoadingStatus} from "../../types";
import {
    FetchUserLikedTweetsActionInterface,
    FetchUserMediaTweetsActionInterface,
    FetchUserTweetsActionInterface,
    SetAddedUserTweetActionInterface,
    SetUserLikedTweetActionInterface,
    SetUserRetweetActionInterface,
    SetUserTweetsActionInterface,
    SetUserTweetsLoadingStatusInterface,
    UserTweetsActionType
} from "./contracts/actionTypes";
import { Tweet } from "../tweets/contracts/state";

export const setUserTweets = (payload: UserTweetsState["items"]): SetUserTweetsActionInterface => ({
    type: UserTweetsActionType.SET_TWEETS,
    payload
});

export const setAddedUserTweet = (payload: Tweet): SetAddedUserTweetActionInterface => ({
    type: UserTweetsActionType.SET_ADDED_TWEET,
    payload
});

export const fetchUserTweets = (payload: string): FetchUserTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_TWEETS,
    payload
});

export const setUserLikedTweet = (payload: Tweet): SetUserLikedTweetActionInterface => ({
    type: UserTweetsActionType.SET_LIKED_TWEET,
    payload,
});

export const fetchUserLikedTweets = (payload: string): FetchUserLikedTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_LIKED_TWEETS,
    payload
});

export const fetchUserMediaTweets = (payload: string): FetchUserMediaTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_MEDIA_TWEETS,
    payload
});

export const setUserRetweet = (payload: Tweet): SetUserRetweetActionInterface => ({
    type: UserTweetsActionType.SET_RETWEET,
    payload,
});

export const setUserTweetsLoadingStatus = (payload: LoadingStatus): SetUserTweetsLoadingStatusInterface => ({
    type: UserTweetsActionType.SET_LOADING_STATUS,
    payload
});
