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
import {createMockRootState, mockListsOwnerMemberResponse} from "../../../util/testHelper";

describe("listMembers selectors:", () => {
    
    describe("selectListMembersItems", () => {
        it("should return ListsOwnerMemberResponse list", () => {
            expect(selectListMembersItems(createMockRootState())).toBe(mockListsOwnerMemberResponse);
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
            expect(selectListSuggestedItems(createMockRootState())).toBe(mockListsOwnerMemberResponse);
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
