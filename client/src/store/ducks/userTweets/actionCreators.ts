import {PinnedTweet, UserTweetsState} from "./contracts/state";
import {LoadingStatus} from "../../types";
import {
    DeleteTweetActionInterface,
    FetchUserLikedTweetsActionInterface,
    FetchUserMediaTweetsActionInterface,
    FetchUserRetweetsAndRepliesActionInterface,
    FetchUserTweetsActionInterface,
    PinTweetActionInterface,
    SetAddedUserTweetActionInterface,
    SetUserLikedTweetActionInterface,
    SetUserRetweetActionInterface,
    SetUserTweetsActionInterface,
    SetUserTweetsLoadingStatusInterface,
    UnpinTweetActionInterface,
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

export const fetchUserRetweetsAndReplies = (payload: string): FetchUserRetweetsAndRepliesActionInterface => ({
    type: UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES,
    payload
});

export const pinTweet = (payload: PinnedTweet): PinTweetActionInterface => ({
    type: UserTweetsActionType.PIN_TWEET,
    payload
});

export const unpinTweet = (payload: PinnedTweet): UnpinTweetActionInterface => ({
    type: UserTweetsActionType.UNPIN_TWEET,
    payload
});

export const deleteTweet = (payload: string): DeleteTweetActionInterface => ({
    type: UserTweetsActionType.DELETE_TWEET,
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
