import {UserTweetsState} from "./contracts/state";
import {LoadingStatus} from "../../types";
import {
    DeleteUserTweetActionInterface,
    FetchUserLikedTweetsActionInterface,
    FetchUserMediaTweetsActionInterface,
    FetchUserRetweetsAndRepliesActionInterface,
    FetchUserTweetsActionInterface,
    SetAddedUserTweetActionInterface,
    SetUpdatedUserTweetActionInterface,
    SetUserTweetsActionInterface,
    SetUserTweetsLoadingStatusInterface,
    UserTweetsActionType
} from "./contracts/actionTypes";
import {Tweet} from "../tweets/contracts/state";

export const setUserTweets = (payload: UserTweetsState["items"]): SetUserTweetsActionInterface => ({
    type: UserTweetsActionType.SET_TWEETS,
    payload
});

export const setAddedUserTweet = (payload: Tweet): SetAddedUserTweetActionInterface => ({
    type: UserTweetsActionType.SET_ADDED_TWEET,
    payload
});

export const setUpdatedUserTweet = (payload: Tweet): SetUpdatedUserTweetActionInterface => ({
    type: UserTweetsActionType.SET_UPDATED_TWEET,
    payload
});

export const deleteUserTweet = (payload: Tweet): DeleteUserTweetActionInterface => ({
    type: UserTweetsActionType.DELETE_TWEET,
    payload
});

export const fetchUserTweets = (payload: string): FetchUserTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_TWEETS,
    payload
});

export const fetchUserLikedTweets = (payload: string): FetchUserLikedTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_LIKED_TWEETS,
    payload
});

export const fetchUserMediaTweets = (payload: string): FetchUserMediaTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_MEDIA_TWEETS,
    payload
});

export const fetchUserRetweetsAndReplies = (payload: string): FetchUserRetweetsAndRepliesActionInterface => ({
    type: UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES,
    payload
});

export const setUserTweetsLoadingStatus = (payload: LoadingStatus): SetUserTweetsLoadingStatusInterface => ({
    type: UserTweetsActionType.SET_LOADING_STATUS,
    payload
});
