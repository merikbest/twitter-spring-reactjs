import {createMockRootState} from "../../../../util/test-utils/test-helper";
import {mockUserTweetAdditionalInfo} from "../../../../util/test-utils/mock-test-data";
import {
    selectIsTweetAdditionalInfoLoading,
    selectIsTweetBookmarkedAdditionalInfo,
    selectTweetAdditionalInfo,
    selectTweetInfoAddressedTweetId,
    selectTweetInfoReplyType,
    selectTweetInfoText,
    selectTweetInfoUserFullName,
    selectTweetInfoUserId,
    selectTweetInfoUserIsFollower,
    selectTweetInfoUserIsMyProfileBlocked,
    selectTweetInfoUserIsUserBlocked,
    selectTweetInfoUserIsUserMuted,
    selectTweetInfoUserUsername
} from "../selectors";

describe("tweetAdditionalInfo selectors:", () => {
    const mockState = createMockRootState();
    const mockTweetState = {
        ...mockState,
        tweetAdditionalInfo: {
            ...mockState.tweetAdditionalInfo,
            tweetAdditionalInfo: mockUserTweetAdditionalInfo,
        }
    };

    describe("selectTweetAdditionalInfo", () => {
        it("should return TweetAdditionalInfoResponse", () => {
            expect(selectTweetAdditionalInfo(mockTweetState)).toBe(mockUserTweetAdditionalInfo);
        });
    });

    describe("selectIsTweetBookmarkedAdditionalInfo", () => {
        it("should return IsTweetBookmarked boolean", () => {
            expect(selectIsTweetBookmarkedAdditionalInfo(mockTweetState)).toBe(false);
        });
    });

    describe("selectTweetInfoText", () => {
        it("should return text string", () => {
            expect(selectTweetInfoText(mockTweetState)).toBe("Feels Good Man  :sunglasses:");
        });
    });

    describe("selectTweetInfoReplyType", () => {
        it("should return replyType", () => {
            expect(selectTweetInfoReplyType(mockTweetState)).toBe("MENTION");
        });
    });

    describe("selectTweetInfoAddressedTweetId", () => {
        it("should return AddressedTweetId number", () => {
            expect(selectTweetInfoAddressedTweetId(mockTweetState)).toBe(mockUserTweetAdditionalInfo.addressedTweetId);
        });
    });

    describe("selectTweetInfoUserId", () => {
        it("should return UserId number", () => {
            expect(selectTweetInfoUserId(mockTweetState)).toBe(1);
        });
    });

    describe("selectTweetInfoUserFullName", () => {
        it("should return UserFullName string", () => {
            expect(selectTweetInfoUserFullName(mockTweetState)).toBe("Random");
        });
    });

    describe("selectTweetInfoUserUsername", () => {
        it("should return Username string", () => {
            expect(selectTweetInfoUserUsername(mockTweetState)).toBe("Random");
        });
    });

    describe("selectTweetInfoUserIsFollower", () => {
        it("should return IsFollower boolean", () => {
            expect(selectTweetInfoUserIsFollower(mockTweetState)).toBe(false);
        });
    });

    describe("selectTweetInfoUserIsUserMuted", () => {
        it("should return IsUserMuted boolean", () => {
            expect(selectTweetInfoUserIsUserMuted(mockTweetState)).toBe(false);
        });
    });

    describe("selectTweetInfoUserIsUserBlocked", () => {
        it("should return IsUserBlocked boolean", () => {
            expect(selectTweetInfoUserIsUserBlocked(mockTweetState)).toBe(false);
        });
    });

    describe("selectTweetInfoUserIsMyProfileBlocked", () => {
        it("should return IsMyProfileBlocked boolean", () => {
            expect(selectTweetInfoUserIsMyProfileBlocked(mockTweetState)).toBe(false);
        });
    });

    describe("selectIsTweetAdditionalInfoLoading", () => {
        it("should return loadingState", () => {
            expect(selectIsTweetAdditionalInfoLoading(mockTweetState)).toBe(true);
        });
    });
});
