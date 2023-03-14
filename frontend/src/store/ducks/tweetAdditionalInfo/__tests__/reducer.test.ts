import { initialTweetAdditionalInfoState, tweetAdditionalInfoReducer } from "../reducer";
import { TweetAdditionalInfoActions, TweetAdditionalInfoType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockUserTweetAdditionalInfo } from "../../../../util/test-utils/mock-test-data";

describe("tweetAdditionalInfoReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(tweetAdditionalInfoReducer(undefined, {} as TweetAdditionalInfoActions)).toEqual(initialTweetAdditionalInfoState);
        });
    });

    describe("tweetAdditionalInfo handlers:", () => {
        testActionDispatch(
            TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO,
            tweetAdditionalInfoReducer(initialTweetAdditionalInfoState, {
                type: TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO,
                payload: mockUserTweetAdditionalInfo
            }),
            {
                ...initialTweetAdditionalInfoState,
                tweetAdditionalInfo: mockUserTweetAdditionalInfo,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            TweetAdditionalInfoType.SET_MUTED_TWEET_ADDITIONAL_INFO,
            tweetAdditionalInfoReducer({
                ...initialTweetAdditionalInfoState,
                tweetAdditionalInfo: mockUserTweetAdditionalInfo
            }, {
                type: TweetAdditionalInfoType.SET_MUTED_TWEET_ADDITIONAL_INFO,
                payload: true
            }),
            {
                ...initialTweetAdditionalInfoState,
                tweetAdditionalInfo: {
                    ...mockUserTweetAdditionalInfo,
                    user: {
                        ...mockUserTweetAdditionalInfo.user, isUserMuted: true
                    }
                }
            }
        );

        testActionDispatch(
            TweetAdditionalInfoType.SET_BLOCKED_TWEET_ADDITIONAL_INFO,
            tweetAdditionalInfoReducer({
                ...initialTweetAdditionalInfoState,
                tweetAdditionalInfo: mockUserTweetAdditionalInfo
            }, {
                type: TweetAdditionalInfoType.SET_BLOCKED_TWEET_ADDITIONAL_INFO,
                payload: true
            }),
            {
                ...initialTweetAdditionalInfoState,
                tweetAdditionalInfo: {
                    ...mockUserTweetAdditionalInfo,
                    user: {
                        ...mockUserTweetAdditionalInfo.user, isUserBlocked: true
                    }
                }
            }
        );

        testActionDispatch(
            TweetAdditionalInfoType.SET_FOLLOWED_TWEET_ADDITIONAL_INFO,
            tweetAdditionalInfoReducer({
                ...initialTweetAdditionalInfoState,
                tweetAdditionalInfo: mockUserTweetAdditionalInfo
            }, {
                type: TweetAdditionalInfoType.SET_FOLLOWED_TWEET_ADDITIONAL_INFO,
                payload: true
            }),
            {
                ...initialTweetAdditionalInfoState,
                tweetAdditionalInfo: {
                    ...mockUserTweetAdditionalInfo,
                    user: {
                        ...mockUserTweetAdditionalInfo.user, isFollower: true
                    }
                }
            }
        );

        testActionDispatch(
            TweetAdditionalInfoType.SET_IS_TWEET_BOOKMARKED_ADDITIONAL_INFO,
            tweetAdditionalInfoReducer(initialTweetAdditionalInfoState, {
                type: TweetAdditionalInfoType.SET_IS_TWEET_BOOKMARKED_ADDITIONAL_INFO,
                payload: true
            }),
            {
                ...initialTweetAdditionalInfoState,
                isTweetBookmarked: true,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            TweetAdditionalInfoType.RESET_TWEET_ADDITIONAL_INFO_STATE,
            tweetAdditionalInfoReducer({
                ...initialTweetAdditionalInfoState,
                tweetAdditionalInfo: mockUserTweetAdditionalInfo
            }, {
                type: TweetAdditionalInfoType.RESET_TWEET_ADDITIONAL_INFO_STATE
            }),
            {
                tweetAdditionalInfo: undefined,
                isTweetBookmarked: false,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO_LOADING_STATE,
            tweetAdditionalInfoReducer(initialTweetAdditionalInfoState, {
                type: TweetAdditionalInfoType.SET_TWEET_ADDITIONAL_INFO_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialTweetAdditionalInfoState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
