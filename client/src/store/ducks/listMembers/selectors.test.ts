import {
    selectIsListMembersLoaded,
    selectIsListMembersLoading,
    selectIsListSuggestedError,
    selectIsListSuggestedLoaded,
    selectIsListSuggestedLoading,
    selectListMembersItems,
    selectListSuggestedItems
} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState} from "../../../util/testHelper";
import {mockListsOwnerMember} from "../../../util/mockData/mockData";

describe("listMembers selectors:", () => {
    const mockState = createMockRootState();

    describe("selectListMembersItems", () => {
        it("should return ListsOwnerMemberResponse list", () => {
            expect(selectListMembersItems({
                ...mockState,
                listMembers: {...mockState.listMembers, members: mockListsOwnerMember}
            })).toBe(mockListsOwnerMember);
        });
    });

    describe("selectIsListMembersLoading", () => {
        it("should return correct result", () => {
            expect(selectIsListMembersLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsListMembersLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsListMembersLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });

    describe("selectListSuggestedItems", () => {
        it("should return ListsOwnerMemberResponse list", () => {
            expect(selectListSuggestedItems({
                ...mockState,
                listMembers: {...mockState.listMembers, suggested: mockListsOwnerMember}
            })).toBe(mockListsOwnerMember);
        });
    });

    describe("selectIsListSuggestedLoading", () => {
        it("should return correct result", () => {
            expect(selectIsListSuggestedLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsListSuggestedLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsListSuggestedLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });

    describe("selectIsListSuggestedError", () => {
        it("should return correct result", () => {
            expect(selectIsListSuggestedError(createMockRootState(LoadingStatus.ERROR))).toBe(true);
        });
    });
});
