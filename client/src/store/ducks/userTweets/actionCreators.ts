import {UserTweetsState} from "./contracts/state";
import {LoadingStatus} from "../../types";
import {
    DeleteUserTweetActionInterface,
    FetchUserLikedTweetsActionInterface,
    FetchUserMediaTweetsActionInterface,
    FetchUserRetweetsAndRepliesActionInterface,
    FetchUserTweetsActionInterface,
    ResetUserTweetsActionInterface,
    SetAddedUserTweetActionInterface,
    SetUpdatedUserTweetActionInterface,
    SetUserTweetsActionInterface,
    SetUserTweetsLoadingStatusInterface,
    UserTweetsActionType
} from "./contracts/actionTypes";
import {Tweet} from "../tweets/contracts/state";

export const setUserTweets = (payload: { items: UserTweetsState["items"], pagesCount: UserTweetsState["pagesCount"] }): SetUserTweetsActionInterface => ({
    type: UserTweetsActionType.SET_TWEETS,
    payload
});

export const resetUserTweets = (): ResetUserTweetsActionInterface => ({
    type: UserTweetsActionType.RESET_TWEETS,
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

export const fetchUserTweets = (payload: { userId: string, page: number }): FetchUserTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_TWEETS,
    payload
});

export const fetchUserLikedTweets = (payload: { userId: string, page: number }): FetchUserLikedTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_LIKED_TWEETS,
    payload
});

export const fetchUserMediaTweets = (payload: { userId: string, page: number }): FetchUserMediaTweetsActionInterface => ({
    type: UserTweetsActionType.FETCH_MEDIA_TWEETS,
    payload
});

export const fetchUserRetweetsAndReplies = (payload: { userId: string, page: number }): FetchUserRetweetsAndRepliesActionInterface => ({
    type: UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES,
    payload
});

export const setUserTweetsLoadingStatus = (payload: LoadingStatus): SetUserTweetsLoadingStatusInterface => ({
    type: UserTweetsActionType.SET_LOADING_STATUS,
    payload
});
