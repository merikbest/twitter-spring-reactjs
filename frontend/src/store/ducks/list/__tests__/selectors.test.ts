import {
    selectIsListLoaded,
    selectIsListLoading,
    selectListItem,
    selectListItemDescription,
    selectListItemFollowersSize,
    selectListItemId,
    selectListItemIsFollower,
    selectListItemIsPrivate,
    selectListItemMembersSize,
    selectListItemName,
    selectListItemOwnerAvatar,
    selectListItemOwnerFullName,
    selectListItemOwnerId,
    selectListItemOwnerUsername,
    selectListItemOwnerWallpaper
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockFullList } from "../../../../util/test-utils/mock-test-data";

describe("list selectors:", () => {
    const mockState = createMockRootState();
    const mockListState = {
        ...mockState,
        list: { ...mockState.list, list: mockFullList }
    };

    describe("selectListItem", () => {
        it("should return BaseListResponse", () => {
            expect(selectListItem(mockListState)).toBe(mockFullList);
        });
    });

    describe("selectListItemId", () => {
        it("should return id number", () => {
            expect(selectListItemId(mockListState)).toBe(3);
        });
    });

    describe("selectListItemName", () => {
        it("should return name string", () => {
            expect(selectListItemName(mockListState)).toBe("Hello World!");
        });
    });

    describe("selectListItemDescription", () => {
        it("should return description string", () => {
            expect(selectListItemDescription(mockListState)).toBe("Hello from my list");
        });
    });

    describe("selectListItemIsPrivate", () => {
        it("should return isPrivate boolean", () => {
            expect(selectListItemIsPrivate(mockListState)).toBe(false);
        });
    });

    describe("selectListItemIsFollower", () => {
        it("should return isFollower boolean", () => {
            expect(selectListItemIsFollower(mockListState)).toBe(false);
        });
    });

    describe("selectListItemMembersSize", () => {
        it("should return membersSize number", () => {
            expect(selectListItemMembersSize(mockListState)).toBe(2);
        });
    });

    describe("selectListItemFollowersSize", () => {
        it("should return followersSize number", () => {
            expect(selectListItemFollowersSize(mockListState)).toBe(0);
        });
    });

    describe("selectListItemOwnerId", () => {
        it("should return OwnerId number", () => {
            expect(selectListItemOwnerId(mockListState)).toBe(2);
        });
    });

    describe("selectListItemOwnerAvatar", () => {
        it("should return OwnerAvatar string", () => {
            expect(selectListItemOwnerAvatar(mockListState)).toBe(mockFullList.listOwner.avatar);
        });
    });

    describe("selectListItemOwnerWallpaper", () => {
        it("should return OwnerWallpaper string", () => {
            expect(selectListItemOwnerWallpaper(mockListState)).toBe(mockFullList.altWallpaper);
        });
    });

    describe("selectListItemOwnerUsername", () => {
        it("should return OwnerUsername string", () => {
            expect(selectListItemOwnerUsername(mockListState)).toBe(mockFullList.listOwner.username);
        });
    });

    describe("selectListItemOwnerFullName", () => {
        it("should return OwnerFullName string", () => {
            expect(selectListItemOwnerFullName(mockListState)).toBe(mockFullList.listOwner.fullName);
        });
    });

    describe("selectIsListLoading", () => {
        it("should return correct result", () => {
            expect(selectIsListLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsListLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsListLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
