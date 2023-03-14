import {
    selectBlockedUsersItems,
    selectIsBlockedAndMutedUsersLoaded,
    selectIsBlockedAndMutedUsersLoading,
    selectMutedUsersItems,
    selectUsersPagesCount
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { mockBlockedUsers, mockMutedUsers } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("blockedAndMutedUsers selectors:", () => {
    const mockState = createMockRootState();

    describe("selectMutedUsersItems", () => {
        it("should return MutedUserResponse array", () => {
            expect(selectMutedUsersItems({
                ...mockState,
                blockedAndMutedUsers: { ...mockState.blockedAndMutedUsers, mutedUsers: mockMutedUsers }
            })).toBe(mockMutedUsers);
        });
    });

    describe("selectBlockedUsersItems", () => {
        it("should return BlockedUserResponse array", () => {
            expect(selectBlockedUsersItems({
                ...mockState,
                blockedAndMutedUsers: { ...mockState.blockedAndMutedUsers, blockedUsers: mockBlockedUsers }
            })).toBe(mockBlockedUsers);
        });
    });

    describe("selectUsersPagesCount", () => {
        it("should return pages count number", () => {
            expect(selectUsersPagesCount(createMockRootState())).toBe(0);
        });
    });

    describe("selectIsBlockedAndMutedUsersLoading", () => {
        it("should return correct result", () => {
            expect(selectIsBlockedAndMutedUsersLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsBlockedAndMutedUsersLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsBlockedAndMutedUsersLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
