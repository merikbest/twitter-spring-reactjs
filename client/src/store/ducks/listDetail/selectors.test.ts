import {selectIsListDetailLoaded, selectIsListDetailLoading, selectListDetailItem} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState, mockBaseListResponse} from "../../../util/testHelper";

describe("listDetail selectors:", () => {
    
    describe("selectListDetailItem", () => {
        it("should return BaseListResponse", () => {
            expect(selectListDetailItem(createMockRootState())).toBe(mockBaseListResponse);
        });
    });

    describe("selectIsListDetailLoading", () => {
        it("should return correct result", () => {
            expect(selectIsListDetailLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsListDetailLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsListDetailLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
