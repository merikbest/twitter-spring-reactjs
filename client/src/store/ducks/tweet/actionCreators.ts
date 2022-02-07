import {LoadingStatus} from "../../types";
import {
    DeleteTweetReplyActionInterface,
    FetchReplyTweetActionInterface,
    FetchTweetDataActionInterface,
    FetchTweetProjectionDataActionInterface,
    ResetTweetStateActionInterface,
    SetTweetDataActionInterface,
    SetTweetDataLoadingStateInterface,
    SetTweetProjectionDataActionInterface,
    TweetActionType
} from "./contracts/actionTypes";
import {ReplyTweet, TweetState} from "./contracts/state";

export const setTweetData = (payload: TweetState["data"]): SetTweetDataActionInterface => ({
    type: TweetActionType.SET_TWEET_DATA,
    payload
});

export const fetchTweetData = (payload: string): FetchTweetDataActionInterface => ({
    type: TweetActionType.FETCH_TWEET_DATA,
    payload
});

export const fetchReplyTweet = (payload: ReplyTweet): FetchReplyTweetActionInterface => ({
    type: TweetActionType.FETCH_REPLY_TWEET,
    payload
});

export const deleteTweetReply = (payload: string): DeleteTweetReplyActionInterface => ({
    type: TweetActionType.DELETE_TWEET_REPLY,
    payload
});

export const resetTweetState = (): ResetTweetStateActionInterface => ({
    type: TweetActionType.RESET_TWEET_STATE
});

export const setTweetLoadingState = (payload: LoadingStatus): SetTweetDataLoadingStateInterface => ({
    type: TweetActionType.SET_LOADING_STATE,
    payload
});

// Projection
export const setTweetProjectionData = (payload: TweetState["dataProjection"]): SetTweetProjectionDataActionInterface => ({
    type: TweetActionType.SET_TWEET_PROJECTION_DATA,
    payload
});

export const fetchTweetProjectionData = (payload: string): FetchTweetProjectionDataActionInterface => ({
    type: TweetActionType.FETCH_TWEET_PROJECTION_DATA,
    payload
});
