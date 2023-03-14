import {
    selectIsListDetailLoaded,
    selectIsListDetailLoading,
    selectListDetailItem,
    selectListDetailItemDescription,
    selectListDetailItemFollowersSize,
    selectListDetailItemId,
    selectListDetailItemIsFollower,
    selectListDetailItemMembersSize,
    selectListDetailItemName,
    selectListDetailItemOwnerAvatar,
    selectListDetailItemOwnerFullName,
    selectListDetailItemOwnerId,
    selectListDetailItemOwnerUsername,
    selectListDetailItemWallpaper
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockFullList } from "../../../../util/test-utils/mock-test-data";

describe("listDetail selectors:", () => {
    const mockState = createMockRootState();
    const mockListDetailState = {
        ...mockState,
        listDetail: { ...mockState.listDetail, item: mockFullList }
    };

    describe("selectListDetailItem", () => {
        it("should return BaseListResponse", () => {
            expect(selectListDetailItem(mockListDetailState)).toBe(mockFullList);
        });
    });

    describe("selectListDetailItemId", () => {
        it("should return ListDetailItemId number", () => {
            expect(selectListDetailItemId(mockListDetailState)).toBe(3);
        });
    });

    describe("selectListDetailItemName", () => {
        it("should return ListDetailItemName string", () => {
            expect(selectListDetailItemName(mockListDetailState)).toBe("Hello World!");
        });
    });

    describe("selectListDetailItemDescription", () => {
        it("should return ListDetailItemDescription string", () => {
            expect(selectListDetailItemDescription(mockListDetailState)).toBe("Hello from my list");
        });
    });

    describe("selectListDetailItemFollowersSize", () => {
        it("should return ListDetailItemFollowersSize number", () => {
            expect(selectListDetailItemFollowersSize(mockListDetailState)).toBe(0);
        });
    });

    describe("selectListDetailItemMembersSize", () => {
        it("should return ListDetailItemMembersSize number", () => {
            expect(selectListDetailItemMembersSize(mockListDetailState)).toBe(2);
        });
    });

    describe("selectListDetailItemIsFollower", () => {
        it("should return ListDetailItemIsFollower boolean", () => {
            expect(selectListDetailItemIsFollower(mockListDetailState)).toBe(false);
        });
    });

    describe("selectListDetailItemWallpaper", () => {
        it("should return ListDetailItemWallpaper string", () => {
            expect(selectListDetailItemWallpaper(mockListDetailState)).toBe(mockFullList.altWallpaper);
        });
    });

    describe("selectListDetailItemOwnerId", () => {
        it("should return ListDetailItemOwnerId number", () => {
            expect(selectListDetailItemOwnerId(mockListDetailState)).toBe(2);
        });
    });

    describe("selectListDetailItemOwnerFullName", () => {
        it("should return ListDetailItemOwnerFullName number", () => {
            expect(selectListDetailItemOwnerFullName(mockListDetailState)).toBe(mockFullList.listOwner.fullName);
        });
    });

    describe("selectListDetailItemOwnerUsername", () => {
        it("should return ListDetailItemOwnerUsername number", () => {
            expect(selectListDetailItemOwnerUsername(mockListDetailState)).toBe(mockFullList.listOwner.username);
        });
    });

    describe("selectListDetailItemOwnerAvatar", () => {
        it("should return ListDetailItemOwnerAvatar number", () => {
            expect(selectListDetailItemOwnerAvatar(mockListDetailState)).toBe(mockFullList.listOwner.avatar);
        });
    });

    describe("selectIsListDetailLoading", () => {
        it("should return correct result", () => {
            expect(selectIsListDetailLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsListDetailLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsListDetailLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
