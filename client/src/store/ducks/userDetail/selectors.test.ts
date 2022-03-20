import {selectIsUserDetailLoaded, selectIsUserDetailLoading, selectUserDetailItem} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState, mockUserDetailResponse} from "../../../util/testHelper";

describe("userDetail selectors:", () => {
    
    describe("selectUserDetailItem", () => {
        it("should return UserDetailResponse", () => {
            expect(selectUserDetailItem(createMockRootState())).toBe(mockUserDetailResponse);
        });
    });

    describe("selectIsUserDetailLoading", () => {
        it("should return correct result", () => {
            expect(selectIsUserDetailLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsUserDetailLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsUserDetailLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
