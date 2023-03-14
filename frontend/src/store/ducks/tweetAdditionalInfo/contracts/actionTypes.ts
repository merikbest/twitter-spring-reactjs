import { Action } from "redux";

import { TweetAdditionalInfoState } from "./state";
import { LoadingStatus } from "../../../../types/common";

export enum TweetAdditionalInfoType {
    SET_TWEET_ADDITIONAL_INFO = "tweetAdditionalInfo/SET_TWEET_ADDITIONAL_INFO",
    FETCH_TWEET_ADDITIONAL_INFO = "tweetAdditionalInfo/FETCH_TWEET_ADDITIONAL_INFO",
    SET_MUTED_TWEET_ADDITIONAL_INFO = "tweetAdditionalInfo/SET_MUTED_TWEET_ADDITIONAL_INFO",
    SET_BLOCKED_TWEET_ADDITIONAL_INFO = "tweetAdditionalInfo/SET_BLOCKED_TWEET_ADDITIONAL_INFO",
    SET_FOLLOWED_TWEET_ADDITIONAL_INFO = "tweetAdditionalInfo/SET_FOLLOWED_TWEET_ADDITIONAL_INFO",
    FETCH_IS_TWEET_BOOKMARKED_ADDITIONAL_INFO = "tweetAdditionalInfo/FETCH_IS_TWEET_BOOKMARKED_ADDITIONAL_INFO",
    SET_IS_TWEET_BOOKMARKED_ADDITIONAL_INFO = "tweetAdditionalInfo/SET_IS_TWEET_BOOKMARKED_ADDITIONAL_INFO",
    RESET_TWEET_ADDITIONAL_INFO_STATE = "tweetAdditionalInfo/RESET_TWEET_ADDITIONAL_INFO_STATE",
    SET_TWEET_ADDITIONAL_INFO_LOADING_STATE = "tweetAdditionalInfo/SET_TWEET_ADDITIONAL_INFO_LOADING_STATE",
}

export interface SetTweetAdditionalInfoActionInterface extends Action<TweetAdditionalInfoType> {
    type: TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO;
    payload: TweetAdditionalInfoState["tweetAdditionalInfo"];
}

export interface FetchTweetAdditionalInfoActionInterface extends Action<TweetAdditionalInfoType> {
    type: TweetAdditionalInfoType.FETCH_TWEET_ADDITIONAL_INFO;
    payload: number;
}

export interface SetMutedTweetAdditionalInfoActionInterface extends Action<TweetAdditionalInfoType> {
    type: TweetAdditionalInfoType.SET_MUTED_TWEET_ADDITIONAL_INFO;
    payload: boolean;
}

export interface SetBlockedTweetAdditionalInfoActionInterface extends Action<TweetAdditionalInfoType> {
    type: TweetAdditionalInfoType.SET_BLOCKED_TWEET_ADDITIONAL_INFO;
    payload: boolean;
}

export interface SetFollowedTweetAdditionalInfoActionInterface extends Action<TweetAdditionalInfoType> {
    type: TweetAdditionalInfoType.SET_FOLLOWED_TWEET_ADDITIONAL_INFO;
    payload: boolean;
}

export interface FetchIsTweetBookmarkedAdditionalInfoActionInterface extends Action<TweetAdditionalInfoType> {
    type: TweetAdditionalInfoType.FETCH_IS_TWEET_BOOKMARKED_ADDITIONAL_INFO;
    payload: number;
}

export interface SetIsTweetBookmarkedAdditionalInfoActionInterface extends Action<TweetAdditionalInfoType> {
    type: TweetAdditionalInfoType.SET_IS_TWEET_BOOKMARKED_ADDITIONAL_INFO;
    payload: boolean;
}

export interface ResetTweetAdditionalInfoActionInterface extends Action<TweetAdditionalInfoType> {
    type: TweetAdditionalInfoType.RESET_TWEET_ADDITIONAL_INFO_STATE;
}

export interface SetTweetAdditionalInfoLoadingStateActionInterface extends Action<TweetAdditionalInfoType> {
    type: TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO_LOADING_STATE;
    payload: LoadingStatus;
}

export type TweetAdditionalInfoActions =
    SetTweetAdditionalInfoActionInterface |
    ResetTweetAdditionalInfoActionInterface |
    SetTweetAdditionalInfoLoadingStateActionInterface |
    SetMutedTweetAdditionalInfoActionInterface |
    SetBlockedTweetAdditionalInfoActionInterface |
    SetFollowedTweetAdditionalInfoActionInterface |
    SetIsTweetBookmarkedAdditionalInfoActionInterface;
