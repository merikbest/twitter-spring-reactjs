import {
    selectFollowerRequestsItems,
    selectIsFollowerRequestsLoaded,
    selectIsFollowerRequestsLoading
} from "../selectors";
import {LoadingStatus} from "../../../types";
import {createMockRootState} from "../../../../util/testHelper";
import {FollowerUserResponse} from "../../../types/user";

describe("followerRequests selectors:", () => {
    const mockState = createMockRootState();
    const mockFollowerUserResponse = [{id: 1}, {id: 2}] as FollowerUserResponse[];

    describe("selectFollowerRequestsItems", () => {
        it("should return FollowerUserResponse array", () => {
            expect(selectFollowerRequestsItems({
                ...mockState,
                followerRequests: {...mockState.notifications, items: mockFollowerUserResponse}
            })).toBe(mockFollowerUserResponse);
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
