import {
    selectIsListMembersLoading,
    selectIsListSuggestedError,
    selectListMembersItems,
    selectListSuggestedItems
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { mockListsOwnerMember } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("listMembers selectors:", () => {
    const mockState = createMockRootState();

    describe("selectListMembersItems", () => {
        it("should return ListsOwnerMemberResponse list", () => {
            expect(selectListMembersItems({
                ...mockState,
                listMembers: { ...mockState.listMembers, members: mockListsOwnerMember }
            })).toBe(mockListsOwnerMember);
        });
    });

    describe("selectIsListMembersLoading", () => {
        it("should return correct result", () => {
            expect(selectIsListMembersLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectListSuggestedItems", () => {
        it("should return ListsOwnerMemberResponse list", () => {
            expect(selectListSuggestedItems({
                ...mockState,
                listMembers: { ...mockState.listMembers, suggested: mockListsOwnerMember }
            })).toBe(mockListsOwnerMember);
        });
    });

    describe("selectIsListSuggestedError", () => {
        it("should return correct result", () => {
            expect(selectIsListSuggestedError(createMockRootState(LoadingStatus.ERROR))).toBe(true);
        });
    });
});
