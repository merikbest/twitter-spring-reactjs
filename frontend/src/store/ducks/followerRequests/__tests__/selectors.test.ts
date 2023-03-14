import {
    selectFollowerRequestsItems,
    selectFollowerRequestsPagesCount,
    selectIsFollowerRequestsLoading
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { FollowerUserResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";

describe("followerRequests selectors:", () => {
    const mockState = createMockRootState();
    const mockFollowerUserResponse = [{ id: 1 }, { id: 2 }] as FollowerUserResponse[];

    describe("selectFollowerRequestsItems", () => {
        it("should return FollowerUserResponse array", () => {
            expect(selectFollowerRequestsItems({
                ...mockState,
                followerRequests: { ...mockState.notifications, items: mockFollowerUserResponse }
            })).toBe(mockFollowerUserResponse);
        });
    });

    describe("selectFollowerRequestsPagesCount", () => {
        it("should return pages count number", () => {
            expect(selectFollowerRequestsPagesCount(mockState)).toBe(0);
        });
    });

    describe("selectIsFollowerRequestsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsFollowerRequestsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });
});
