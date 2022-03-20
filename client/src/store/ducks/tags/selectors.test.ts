import {selectIsTagsLoaded, selectIsTagsLoading, selectTagsItems} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState, mockTagResponse} from "../../../util/testHelper";

describe("tags selectors:", () => {
    
    describe("selectTagsItems", () => {
        it("should return TagResponse array", () => {
            expect(selectTagsItems(createMockRootState())).toBe(mockTagResponse);
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
