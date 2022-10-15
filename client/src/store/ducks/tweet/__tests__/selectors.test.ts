import {
    selectErrorMessage,
    selectIsLikedUsersLoading,
    selectIsRepliesLoading,
    selectIsRetweetedUsersLoading,
    selectIsTweetError,
    selectIsTweetLoadedSuccess,
    selectIsTweetLoading,
    selectLikedUsers,
    selectReplies,
    selectRetweetedUsers,
    selectTweetData,
    selectUsersPagesCount
} from "../selectors";
import {LoadingStatus} from "../../../types";
import {createMockRootState} from "../../../../util/testHelper";
import {mockFullTweet, mockTweets, mockUsers} from "../../../../util/mockData/mockData";

describe("tweet selectors:", () => {
    const mockState = createMockRootState();

    describe("selectTweetData", () => {
        it("should return TweetResponse", () => {
            expect(selectTweetData({
                ...mockState,
                tweet: {...mockState.tweet, tweet: mockFullTweet}
            })).toBe(mockFullTweet);
        });
    });

    describe("selectUsersPagesCount", () => {
        it("should return Pages Count number", () => {
            expect(selectUsersPagesCount(mockState)).toBe(0);
        });
    });

    describe("selectIsTweetLoading", () => {
        it("should return correct result", () => {
            expect(selectIsTweetLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsTweetLoadedSuccess", () => {
        it("should return correct result", () => {
            expect(selectIsTweetLoadedSuccess(createMockRootState(LoadingStatus.SUCCESS))).toBe(true);
        });
    });

    describe("selectIsTweetError", () => {
        it("should return correct result", () => {
            expect(selectIsTweetError(createMockRootState(LoadingStatus.ERROR))).toBe(true);
        });
    });

    describe("selectErrorMessage", () => {
        it("should return correct result", () => {
            expect(selectErrorMessage({
                ...mockState,
                tweet: {...mockState.tweet, errorMessage: "Tweet not found"}
            })).toBe("Tweet not found");
        });
    });

    describe("selectLikedUsers", () => {
        it("should return UserResponse array", () => {
            expect(selectLikedUsers({
                ...mockState,
                tweet: {...mockState.tweet, likedUsers: mockUsers}
            })).toBe(mockUsers);
        });
    });

    describe("selectIsLikedUsersLoading", () => {
        it("should return correct result", () => {
            expect(selectIsLikedUsersLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectRetweetedUsers", () => {
        it("should return UserResponse array", () => {
            expect(selectRetweetedUsers({
                ...mockState,
                tweet: {...mockState.tweet, retweetedUsers: mockUsers}
            })).toBe(mockUsers);
        });
    });

    describe("selectIsRetweetedUsersLoading", () => {
        it("should return correct result", () => {
            expect(selectIsRetweetedUsersLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectReplies", () => {
        it("should return TweetResponse array", () => {
            expect(selectReplies({
                ...mockState,
                tweet: {...mockState.tweet, replies: mockTweets}
            })).toBe(mockTweets);
        });
    });

    describe("selectIsRepliesLoading", () => {
        it("should return correct result", () => {
            expect(selectIsRepliesLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });
});
