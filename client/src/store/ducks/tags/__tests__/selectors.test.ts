import {
    selectIsTagsLoading,
    selectIsTrendsLoading,
    selectTagsItems,
    selectTrendsItems,
    selectTrendsPagesCount
} from "../selectors";
import {LoadingStatus} from "../../../types";
import {createMockRootState} from "../../../../util/testHelper";
import {mockTags} from "../../../../util/mockData/mockData";

describe("tags selectors:", () => {
    const mockState = createMockRootState();

    describe("selectTagsItems", () => {
        it("should return TagResponse array", () => {
            expect(selectTagsItems({
                ...mockState,
                tags: {...mockState.tags, tags: mockTags}
            })).toBe(mockTags);
        });
    });

    describe("selectIsTagsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsTagsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectTrendsItems", () => {
        it("should return TagResponse array", () => {
            expect(selectTrendsItems({
                ...mockState,
                tags: {...mockState.tags, trends: mockTags}
            })).toBe(mockTags);
        });
    });

    describe("selectTrendsPagesCount", () => {
        it("should return pages count number", () => {
            expect(selectTrendsPagesCount(mockState)).toBe(0);
        });
    });

    describe("selectIsTrendsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsTrendsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });
});
