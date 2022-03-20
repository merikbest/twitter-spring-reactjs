import {
    selectIsUserTweetsLoaded,
    selectIsUserTweetsLoading,
    selectPagesCount,
    selectUserTweetsItems
} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState, mockTweetResponseArray} from "../../../util/testHelper";

describe("userTweets selectors:", () => {

    describe("selectUserTweetsItems", () => {
        it("should return TweetResponse array", () => {
            expect(selectUserTweetsItems(createMockRootState())).toBe(mockTweetResponseArray);
        });
    });

    describe("selectPagesCount", () => {
        it("should return correct result", () => {
            expect(selectPagesCount(createMockRootState())).toBe(1);
        });
    });

    describe("selectIsUserTweetsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsUserTweetsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsUserTweetsLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsUserTweetsLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
