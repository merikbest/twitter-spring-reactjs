import { testAction } from "../../../../util/test-utils/test-helper";
import { TweetAdditionalInfoType } from "../contracts/actionTypes";
import {
    fetchIsTweetBookmarkedAdditionalInfo,
    fetchTweetAdditionalInfo,
    resetTweetAdditionalInfo,
    setBlockedTweetAdditionalInfo,
    setFollowedTweetAdditionalInfo,
    setIsTweetBookmarkedAdditionalInfo,
    setMutedTweetAdditionalInfo,
    setTweetAdditionalInfo,
    setTweetAdditionalInfoLoadingState
} from "../actionCreators";
import { mockUserTweetAdditionalInfo } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("tweetAdditionalInfo actions", () => {
    testAction(setTweetAdditionalInfo, setTweetAdditionalInfo(mockUserTweetAdditionalInfo), {
        type: TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO,
        payload: mockUserTweetAdditionalInfo
    });

    testAction(fetchTweetAdditionalInfo, fetchTweetAdditionalInfo(1), {
        type: TweetAdditionalInfoType.FETCH_TWEET_ADDITIONAL_INFO,
        payload: 1
    });

    testAction(setMutedTweetAdditionalInfo, setMutedTweetAdditionalInfo(true), {
        type: TweetAdditionalInfoType.SET_MUTED_TWEET_ADDITIONAL_INFO,
        payload: true
    });

    testAction(setBlockedTweetAdditionalInfo, setBlockedTweetAdditionalInfo(true), {
        type: TweetAdditionalInfoType.SET_BLOCKED_TWEET_ADDITIONAL_INFO,
        payload: true
    });

    testAction(setFollowedTweetAdditionalInfo, setFollowedTweetAdditionalInfo(true), {
        type: TweetAdditionalInfoType.SET_FOLLOWED_TWEET_ADDITIONAL_INFO,
        payload: true
    });

    testAction(fetchIsTweetBookmarkedAdditionalInfo, fetchIsTweetBookmarkedAdditionalInfo(1), {
        type: TweetAdditionalInfoType.FETCH_IS_TWEET_BOOKMARKED_ADDITIONAL_INFO,
        payload: 1
    });

    testAction(setIsTweetBookmarkedAdditionalInfo, setIsTweetBookmarkedAdditionalInfo(true), {
        type: TweetAdditionalInfoType.SET_IS_TWEET_BOOKMARKED_ADDITIONAL_INFO,
        payload: true
    });

    testAction(resetTweetAdditionalInfo, resetTweetAdditionalInfo(), {
        type: TweetAdditionalInfoType.RESET_TWEET_ADDITIONAL_INFO_STATE
    });

    testAction(setTweetAdditionalInfoLoadingState, setTweetAdditionalInfoLoadingState(LoadingStatus.LOADED), {
        type: TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO_LOADING_STATE,
        payload: LoadingStatus.LOADED
    });
});
