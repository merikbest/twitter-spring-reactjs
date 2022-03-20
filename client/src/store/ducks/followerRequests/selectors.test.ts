import {
    selectFollowerRequestsItems,
    selectIsFollowerRequestsLoaded,
    selectIsFollowerRequestsLoading
} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState, mockFollowerUserResponse} from "../../../util/testHelper";

describe("followerRequests selectors:", () => {

    describe("selectFollowerRequestsItems", () => {
        it("should return FollowerUserResponse array", () => {
            expect(selectFollowerRequestsItems(createMockRootState())).toBe(mockFollowerUserResponse);
        });
    });

    describe("selectIsFollowerRequestsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsFollowerRequestsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsFollowerRequestsLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsFollowerRequestsLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
