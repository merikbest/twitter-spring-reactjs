import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { mockTweets } from "../../../../util/test-utils/mock-test-data";
import { selectIstUnsentTweetsLoading, selectUnsentTweets, selectUnsentTweetsPagesCount } from "../selectors";
import { LoadingStatus } from "../../../../types/common";

describe("unsentTweets selectors:", () => {
    const mockState = createMockRootState();

    describe("selectUnsentTweets", () => {
        it("should return TweetResponse array", () => {
            expect(selectUnsentTweets({
                ...mockState,
                unsentTweets: { ...mockState.unsentTweets, items: mockTweets }
            })).toBe(mockTweets);
        });
    });

    describe("selectUnsentTweetsPagesCount", () => {
        it("should return pagesCount number", () => {
            expect(selectUnsentTweetsPagesCount(mockState)).toBe(0);
        });
    });

    describe("selectIstUnsentTweetsLoading", () => {
        it("should return pagesCount number", () => {
            expect(selectIstUnsentTweetsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });
});
