import {
    FetchIsTweetBookmarkedAdditionalInfoActionInterface,
    FetchTweetAdditionalInfoActionInterface,
    ResetTweetAdditionalInfoActionInterface,
    SetBlockedTweetAdditionalInfoActionInterface,
    SetFollowedTweetAdditionalInfoActionInterface,
    SetIsTweetBookmarkedAdditionalInfoActionInterface,
    SetMutedTweetAdditionalInfoActionInterface,
    SetTweetAdditionalInfoActionInterface,
    SetTweetAdditionalInfoLoadingStateActionInterface,
    TweetAdditionalInfoType
} from "./contracts/actionTypes";
import { TweetAdditionalInfoState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const setTweetAdditionalInfo = (payload: TweetAdditionalInfoState["tweetAdditionalInfo"]): SetTweetAdditionalInfoActionInterface => ({
    type: TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO,
    payload
});

export const fetchTweetAdditionalInfo = (payload: number): FetchTweetAdditionalInfoActionInterface => ({
    type: TweetAdditionalInfoType.FETCH_TWEET_ADDITIONAL_INFO,
    payload
});

export const setMutedTweetAdditionalInfo = (payload: boolean): SetMutedTweetAdditionalInfoActionInterface => ({
    type: TweetAdditionalInfoType.SET_MUTED_TWEET_ADDITIONAL_INFO,
    payload
});

export const setBlockedTweetAdditionalInfo = (payload: boolean): SetBlockedTweetAdditionalInfoActionInterface => ({
    type: TweetAdditionalInfoType.SET_BLOCKED_TWEET_ADDITIONAL_INFO,
    payload
});

export const setFollowedTweetAdditionalInfo = (payload: boolean): SetFollowedTweetAdditionalInfoActionInterface => ({
    type: TweetAdditionalInfoType.SET_FOLLOWED_TWEET_ADDITIONAL_INFO,
    payload
});

export const fetchIsTweetBookmarkedAdditionalInfo = (payload: number): FetchIsTweetBookmarkedAdditionalInfoActionInterface => ({
    type: TweetAdditionalInfoType.FETCH_IS_TWEET_BOOKMARKED_ADDITIONAL_INFO,
    payload
});

export const setIsTweetBookmarkedAdditionalInfo = (payload: boolean): SetIsTweetBookmarkedAdditionalInfoActionInterface => ({
    type: TweetAdditionalInfoType.SET_IS_TWEET_BOOKMARKED_ADDITIONAL_INFO,
    payload
});

export const resetTweetAdditionalInfo = (): ResetTweetAdditionalInfoActionInterface => ({
    type: TweetAdditionalInfoType.RESET_TWEET_ADDITIONAL_INFO_STATE
});

export const setTweetAdditionalInfoLoadingState = (payload: LoadingStatus): SetTweetAdditionalInfoLoadingStateActionInterface => ({
    type: TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO_LOADING_STATE,
    payload
});
