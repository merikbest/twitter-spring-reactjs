import {
    selectIsUserDetailLoaded,
    selectIsUserDetailLoading,
    selectUserDetailAbout,
    selectUserDetailAvatar,
    selectUserDetailFollowersSize,
    selectUserDetailFollowingSize,
    selectUserDetailFullName,
    selectUserDetailId,
    selectUserDetailIsFollower,
    selectUserDetailIsMyProfileBlocked,
    selectUserDetailIsPrivateProfile,
    selectUserDetailIsUserBlocked,
    selectUserDetailIsWaitingForApprove,
    selectUserDetailItem,
    selectUserDetailSameFollowers,
    selectUserDetailUsername
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockUserDetailResponse } from "../../../../util/test-utils/mock-test-data";

describe("userDetail selectors:", () => {

    describe("selectUserDetailItem", () => {
        it("should return UserDetailResponse", () => {
            expect(selectUserDetailItem(createMockRootState())).toBe(mockUserDetailResponse);
        });
    });

    describe("selectUserDetailId", () => {
        it("should return UserDetailId number", () => {
            expect(selectUserDetailId(createMockRootState())).toBe(1);
        });
    });

    describe("selectUserDetailUsername", () => {
        it("should return UserDetailUsername string", () => {
            expect(selectUserDetailUsername(createMockRootState())).toBe("Random");
        });
    });

    describe("selectUserDetailFullName", () => {
        it("should return UserDetailFullName string", () => {
            expect(selectUserDetailFullName(createMockRootState())).toBe("Random");
        });
    });

    describe("selectUserDetailAbout", () => {
        it("should return UserDetailAbout string", () => {
            expect(selectUserDetailAbout(createMockRootState())).toBe("About");
        });
    });

    describe("selectUserDetailFollowersSize", () => {
        it("should return UserDetailFollowersSize number", () => {
            expect(selectUserDetailFollowersSize(createMockRootState())).toBe(2);
        });
    });

    describe("selectUserDetailFollowingSize", () => {
        it("should return UserDetailFollowingSize number", () => {
            expect(selectUserDetailFollowingSize(createMockRootState())).toBe(4);
        });
    });

    describe("selectUserDetailAvatar", () => {
        it("should return UserDetailAvatar string", () => {
            expect(selectUserDetailAvatar(createMockRootState())).toBe(mockUserDetailResponse.avatar);
        });
    });

    describe("selectUserDetailIsMyProfileBlocked", () => {
        it("should return isMyProfileBlocked boolean", () => {
            expect(selectUserDetailIsMyProfileBlocked(createMockRootState())).toBe(false);
        });
    });

    describe("selectUserDetailIsFollower", () => {
        it("should return isFollower boolean", () => {
            expect(selectUserDetailIsFollower(createMockRootState())).toBe(true);
        });
    });

    describe("selectUserDetailIsUserBlocked", () => {
        it("should return isUserBlocked boolean", () => {
            expect(selectUserDetailIsUserBlocked(createMockRootState())).toBe(false);
        });
    });

    describe("selectUserDetailIsWaitingForApprove", () => {
        it("should return isWaitingForApprove boolean", () => {
            expect(selectUserDetailIsWaitingForApprove(createMockRootState())).toBe(false);
        });
    });

    describe("selectUserDetailIsPrivateProfile", () => {
        it("should return isPrivateProfile boolean", () => {
            expect(selectUserDetailIsPrivateProfile(createMockRootState())).toBe(false);
        });
    });

    describe("selectUserDetailSameFollowers", () => {
        it("should return sameFollowers array", () => {
            expect(selectUserDetailSameFollowers(createMockRootState())).toBe(mockUserDetailResponse.sameFollowers);
        });
    });

    describe("selectIsUserDetailLoading", () => {
        it("should return correct result", () => {
            expect(selectIsUserDetailLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectIsUserDetailLoaded", () => {
        it("should return correct result", () => {
            expect(selectIsUserDetailLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });
});
