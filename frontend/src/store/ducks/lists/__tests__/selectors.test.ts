import {
    selectIsListsLoaded,
    selectIsListsLoading,
    selectIsLoaded,
    selectIsLoading,
    selectIsPinnedListsLoaded,
    selectIsPinnedListsLoading,
    selectIsSimpleListsLoaded,
    selectIsSimpleListsLoading,
    selectIsUserListsLoaded,
    selectIsUserListsLoading,
    selectListsItems,
    selectPinnedListsItems,
    selectSimpleListsItems,
    selectUserListsItems
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { mockLists, mockPinnedLists, mockSimpleList, mockUserLists } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("lists selectors:", () => {
    const mockState = createMockRootState();

    describe("selectListsItems", () => {
        it("should return ListResponse array", () => {
            expect(selectListsItems({
                ...mockState,
                lists: { ...mockState.lists, lists: mockLists }
            })).toBe(mockLists);
        });
    });

    describe("selectUserListsItems", () => {
        it("should return ListUserResponse array", () => {
            expect(selectUserListsItems({
                ...mockState,
                lists: { ...mockState.lists, userLists: mockUserLists }
            })).toBe(mockUserLists);
        });
    });

    describe("selectPinnedListsItems", () => {
        it("should return PinnedListResponse array", () => {
            expect(selectPinnedListsItems({
                ...mockState,
                lists: { ...mockState.lists, pinnedLists: mockPinnedLists }
            })).toBe(mockPinnedLists);
        });
    });

    describe("selectSimpleListsItems", () => {
        it("should return SimpleListResponse array", () => {
            expect(selectSimpleListsItems({
                ...mockState,
                lists: { ...mockState.lists, simpleLists: mockSimpleList }
            })).toBe(mockSimpleList);
        });
    });

    describe("selectIsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });

    describe("selectIsListsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsListsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsListsLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsListsLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });

    describe("selectIsUserListsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsUserListsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsUserListsLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsUserListsLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });

    describe("selectIsPinnedListsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsPinnedListsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsPinnedListsLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsPinnedListsLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });

    describe("selectIsSimpleListsLoading", () => {
        it("should return correct result", () => {
            expect(selectIsSimpleListsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsSimpleListsLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsSimpleListsLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
