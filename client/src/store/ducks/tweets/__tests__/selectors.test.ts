import {
    selectIsTweetsLoaded,
    selectIsTweetsLoading,
    selectPagesCount,
    selectTweetsItems,
    selectTweetsItemsSize
} from "../selectors";
import {createMockRootState} from "../../../../util/testHelper";
import {mockTweets} from "../../../../util/mockData/mockData";
import {LoadingStatus} from "../../../types/common";

describe("tweets selectors:", () => {
    
    describe("selectTweetsItems", () => {
        it("should return TweetResponse array", () => {
            expect(selectTweetsItems(createMockRootState())).toBe(mockTweets);
        });
    });

    describe("selectTweetsItemsSize", () => {
        it("should return TweetResponse length number", () => {
            expect(selectTweetsItemsSize(createMockRootState())).toBe(mockTweets.length);
        });
    });

    describe("selectPagesCount", () => {
        it("should return correct result", () => {
            expect(selectPagesCount(createMockRootState())).toBe(1);
        });
    });

    describe("selectIsTweetsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsTweetsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsTweetsLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsTweetsLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
