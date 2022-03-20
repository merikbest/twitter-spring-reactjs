import {selectIsTweetsLoaded, selectIsTweetsLoading, selectPagesCount, selectTweetsItems} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState, mockTweetResponseArray} from "../../../util/testHelper";

describe("tweets selectors:", () => {
    
    describe("selectTweetsItems", () => {
        it("should return TweetResponse array", () => {
            expect(selectTweetsItems(createMockRootState())).toBe(mockTweetResponseArray);
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
