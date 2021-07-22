import {LoadingStatus} from "../../types";
import {
    FetchTweetDataActionInterface,
    SetTweetDataActionInterface,
    SetTweetDataLoadingStateInterface,
    FetchReplyTweetActionInterface,
    TweetActionType
} from "./contracts/actionTypes";
import {TweetState} from "./contracts/state";
import {Image} from "../tweets/contracts/state";

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

export const fetchReplyTweet = (
    payload: {
        id: string;
        text: string;
        addressedUsername: string;
        addressedId: number;
        images: Image[];
        likes: [];
        retweets: [];
    }): FetchReplyTweetActionInterface => ({
    type: TweetActionType.FETCH_REPLY_TWEET,
    payload
});


