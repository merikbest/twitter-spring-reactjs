import {selectIsListDetailLoaded, selectIsListDetailLoading, selectListDetailItem} from "../selectors";
import {createMockRootState} from "../../../../util/testHelper";
import {LoadingStatus} from "../../../types/common";

describe("listDetail selectors:", () => {
    const mockState = createMockRootState();
    
    describe("selectListDetailItem", () => {
        it("should return BaseListResponse", () => {
            expect(selectListDetailItem({
                ...mockState,
                userDetail: {...mockState.userDetail, item: undefined} // TODO add UserDetailResponse
            })).toBe(undefined);
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
