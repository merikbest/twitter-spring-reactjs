import {selectIsTagsLoaded, selectIsTagsLoading, selectTagsItems} from "../selectors";
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

    describe("selectIsTagsLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsTagsLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
