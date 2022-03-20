import {
    selectIsLikedUsersLoadedSuccess,
    selectIsLikedUsersLoading,
    selectIsRepliesLoadedSuccess,
    selectIsRepliesLoading,
    selectIsRetweetedUsersLoadedSuccess,
    selectIsRetweetedUsersLoading,
    selectIsTweetError,
    selectIsTweetLoadedSuccess,
    selectIsTweetLoading,
    selectLikedUsers,
    selectReplies,
    selectRetweetedUsers,
    selectTweetData
} from "./selectors";
import {LoadingStatus} from "../../types";
import {
    createMockRootState,
    mockTweetResponse,
    mockTweetResponseArray,
    mockUserResponse
} from "../../../util/testHelper";

describe("tweet selectors:", () => {

    describe("selectTweetData", () => {
        it("should return TweetResponse", () => {
            expect(selectTweetData(createMockRootState())).toBe(mockTweetResponse);
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

    describe("selectLikedUsers", () => {
        it("should return UserResponse array", () => {
            expect(selectLikedUsers(createMockRootState())).toBe(mockUserResponse);
        });
    });

    describe("selectIsLikedUsersLoading", () => {
        it("should return correct result", () => {
            expect(selectIsLikedUsersLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsLikedUsersLoadedSuccess", () => {
        it("should return correct result", () => {
            expect(selectIsLikedUsersLoadedSuccess(createMockRootState(LoadingStatus.SUCCESS))).toBe(true);
        });
    });

    describe("selectRetweetedUsers", () => {
        it("should return UserResponse array", () => {
            expect(selectRetweetedUsers(createMockRootState())).toBe(mockUserResponse);
        });
    });

    describe("selectIsRetweetedUsersLoading", () => {
        it("should return correct result", () => {
            expect(selectIsRetweetedUsersLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsRetweetedUsersLoadedSuccess", () => {
        it("should return correct result", () => {
            expect(selectIsRetweetedUsersLoadedSuccess(createMockRootState(LoadingStatus.SUCCESS))).toBe(true);
        });
    });
    
    describe("selectReplies", () => {
        it("should return TweetResponse array", () => {
            expect(selectReplies(createMockRootState())).toBe(mockTweetResponseArray);
        });
    });

    describe("selectIsRepliesLoading", () => {
        it("should return correct result", () => {
            expect(selectIsRepliesLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsRepliesLoadedSuccess", () => {
        it("should return correct result", () => {
            expect(selectIsRepliesLoadedSuccess(createMockRootState(LoadingStatus.SUCCESS))).toBe(true);
        });
    });
});
