import {
    selectIsUserTweetsLoaded,
    selectIsUserTweetsLoading,
    selectPagesCount,
    selectUserTweetsItems
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { mockTweets } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("userTweets selectors:", () => {
    const mockState = createMockRootState();

    describe("selectUserTweetsItems", () => {
        it("should return TweetResponse array", () => {
            expect(selectUserTweetsItems({
                ...mockState,
                userTweets: { ...mockState.userTweets, items: mockTweets }
            })).toBe(mockTweets);
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
