import {LoadingStatus} from "../../types";
import {
    FetchTweetDataActionInterface,
    SetTweetDataActionInterface,
    SetTweetDataLoadingStateInterface,
    FetchReplyTweetActionInterface,
    TweetActionType,
    DeleteTweetReplyActionInterface
} from "./contracts/actionTypes";
import {ReplyTweet, TweetState} from "./contracts/state";

export const setTweetData = (payload: TweetState["data"]): SetTweetDataActionInterface => ({
    type: TweetActionType.SET_TWEET_DATA,
    payload
});

export const setTweetLoadingState = (payload: LoadingStatus): SetTweetDataLoadingStateInterface => ({
    type: TweetActionType.SET_LOADING_STATE,
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
