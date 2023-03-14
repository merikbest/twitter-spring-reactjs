import {
    selectIsTagsLoading,
    selectIsTrendsLoading,
    selectTagsItems,
    selectTrendsItems,
    selectTrendsPagesCount
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { mockTags } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("tags selectors:", () => {
    const mockState = createMockRootState();

    describe("selectTagsItems", () => {
        it("should return TagResponse array", () => {
            expect(selectTagsItems({
                ...mockState,
                tags: { ...mockState.tags, tags: mockTags }
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
                tags: { ...mockState.tags, trends: mockTags }
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
