import {
    selectBlockedUsersItems,
    selectIsBlockedAndMutedUsersLoaded,
    selectIsBlockedAndMutedUsersLoading,
    selectMutedUsersItems
} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState, mockBlockedUserResponse, mockMutedUserResponse} from "../../../util/testHelper";

describe("blockedAndMutedUsers selectors:", () => {
    
    describe("selectMutedUsersItems", () => {
        it("should return MutedUserResponse array", () => {
            expect(selectMutedUsersItems(createMockRootState())).toBe(mockMutedUserResponse);
        });
    });

    describe("selectBlockedUsersItems", () => {
        it("should return BlockedUserResponse array", () => {
            expect(selectBlockedUsersItems(createMockRootState())).toBe(mockBlockedUserResponse);
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
