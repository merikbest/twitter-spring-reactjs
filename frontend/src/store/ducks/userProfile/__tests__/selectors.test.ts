import {
    selectImages,
    selectImagesIsLoading,
    selectImagesIsSuccessLoaded,
    selectUserProfile,
    selectUserProfileAbout,
    selectUserProfileAvatar,
    selectUserProfileBirthday,
    selectUserProfileFollowersSize,
    selectUserProfileFollowingSize,
    selectUserProfileFullName,
    selectUserProfileId,
    selectUserProfileIsFollower,
    selectUserProfileIsMutedDirectMessages,
    selectUserProfileIsMyProfileBlocked,
    selectUserProfileIsPrivateProfile,
    selectUserProfileIsSubscriber,
    selectUserProfileIsUserBlocked,
    selectUserProfileIsUserMuted,
    selectUserProfileIsWaitingForApprove,
    selectUserProfileLikeCount,
    selectUserProfileLocation,
    selectUserProfileMediaTweetCount,
    selectUserProfilePinnedTweetId,
    selectUserProfileRegistrationDate,
    selectUserProfileSameFollowers,
    selectUserProfileTweetCount,
    selectUserProfileUsername,
    selectUserProfileWallpaper,
    selectUserProfileWebsite,
    selectUsersIsErrorLoaded,
    selectUsersIsLoading,
    selectUsersIsSuccessLoaded
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { mockMyProfile, mockProfileImages } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("userProfile selectors:", () => {
    const mockState = createMockRootState();
    const mockRootState = {
        ...mockState,
        userProfile: { ...mockState.userProfile, user: mockMyProfile }
    };

    describe("selectUserProfile", () => {
        it("should return UserProfileResponse", () => {
            expect(selectUserProfile(mockRootState)).toBe(mockMyProfile);
        });
    });

    describe("selectUserProfileId", () => {
        it("should return UserProfileId number", () => {
            expect(selectUserProfileId(mockRootState)).toBe(2);
        });
    });

    describe("selectUserProfileFullName", () => {
        it("should return UserProfileFullName string", () => {
            expect(selectUserProfileFullName(mockRootState)).toBe("MrCat");
        });
    });

    describe("selectUserProfileUsername", () => {
        it("should return UserProfileUsername string", () => {
            expect(selectUserProfileUsername(mockRootState)).toBe("Cat");
        });
    });

    describe("selectUserProfileAbout", () => {
        it("should return UserProfileAbout string", () => {
            expect(selectUserProfileAbout(mockRootState)).toBe("Hello twitter!");
        });
    });

    describe("selectUserProfileLocation", () => {
        it("should return UserProfileLocation string", () => {
            expect(selectUserProfileLocation(mockRootState)).toBe("New York");
        });
    });

    describe("selectUserProfileWebsite", () => {
        it("should return UserProfileWebsite string", () => {
            expect(selectUserProfileWebsite(mockRootState)).toBe("https://www.google.com");
        });
    });

    describe("selectUserProfileBirthday", () => {
        it("should return UserProfileBirthday string", () => {
            expect(selectUserProfileBirthday(mockRootState)).toBe(null);
        });
    });

    describe("selectUserProfileRegistrationDate", () => {
        it("should return UserProfileRegistrationDate string", () => {
            expect(selectUserProfileRegistrationDate(mockRootState)).toBe("2021-08-01T23:34:32");
        });
    });

    describe("selectUserProfileWallpaper", () => {
        it("should return UserProfileWallpaper", () => {
            expect(selectUserProfileWallpaper(mockRootState)).toBe(mockMyProfile.wallpaper);
        });
    });

    describe("selectUserProfileAvatar", () => {
        it("should return UserProfileAvatar", () => {
            expect(selectUserProfileAvatar(mockRootState)).toBe(mockMyProfile.avatar);
        });
    });

    describe("selectUserProfileFollowersSize", () => {
        it("should return UserProfileFollowersSize number", () => {
            expect(selectUserProfileFollowersSize(mockRootState)).toBe(1);
        });
    });

    describe("selectUserProfileFollowingSize", () => {
        it("should return UserProfileFollowingSize number", () => {
            expect(selectUserProfileFollowingSize(mockRootState)).toBe(1);
        });
    });

    describe("selectUserProfileSameFollowers", () => {
        it("should return UserProfileSameFollowers", () => {
            expect(selectUserProfileSameFollowers(mockRootState)).toBe(mockMyProfile.sameFollowers);
        });
    });

    describe("selectUserProfilePinnedTweetId", () => {
        it("should return UserProfilePinnedTweetId number", () => {
            expect(selectUserProfilePinnedTweetId(mockRootState)).toBe(0);
        });
    });

    describe("selectUserProfileIsFollower", () => {
        it("should return UserProfileIsFollower boolean", () => {
            expect(selectUserProfileIsFollower(mockRootState)).toBe(false);
        });
    });

    describe("selectUserProfileIsUserBlocked", () => {
        it("should return UserProfileIsUserBlocked boolean", () => {
            expect(selectUserProfileIsUserBlocked(mockRootState)).toBe(false);
        });
    });

    describe("selectUserProfileIsUserMuted", () => {
        it("should return UserProfileIsUserMuted boolean", () => {
            expect(selectUserProfileIsUserMuted(mockRootState)).toBe(false);
        });
    });

    describe("selectUserProfileIsPrivateProfile", () => {
        it("should return UserProfileIsPrivateProfile boolean", () => {
            expect(selectUserProfileIsPrivateProfile(mockRootState)).toBe(false);
        });
    });

    describe("selectUserProfileIsSubscriber", () => {
        it("should return UserProfileIsSubscriber boolean", () => {
            expect(selectUserProfileIsSubscriber(mockRootState)).toBe(false);
        });
    });

    describe("selectUserProfileIsMutedDirectMessages", () => {
        it("should return UserProfileIsMutedDirectMessages boolean", () => {
            expect(selectUserProfileIsMutedDirectMessages(mockRootState)).toBe(false);
        });
    });

    describe("selectUserProfileIsWaitingForApprove", () => {
        it("should return UserProfileIsWaitingForApprove boolean", () => {
            expect(selectUserProfileIsWaitingForApprove(mockRootState)).toBe(false);
        });
    });

    describe("selectUserProfileIsMyProfileBlocked", () => {
        it("should return UserProfileIsMyProfileBlocked boolean", () => {
            expect(selectUserProfileIsMyProfileBlocked(mockRootState)).toBe(false);
        });
    });

    describe("selectUserProfileMediaTweetCount", () => {
        it("should return UserProfileMediaTweetCount number", () => {
            expect(selectUserProfileMediaTweetCount(mockRootState)).toBe(25);
        });
    });

    describe("selectUserProfileLikeCount", () => {
        it("should return UserProfileLikeCount number", () => {
            expect(selectUserProfileLikeCount(mockRootState)).toBe(30);
        });
    });

    describe("selectUserProfileTweetCount", () => {
        it("should return UserProfileTweetCount number", () => {
            expect(selectUserProfileTweetCount(mockRootState)).toBe(4);
        });
    });

    describe("selectUsersIsLoading", () => {
        it("should return correct result", () => {
            expect(selectUsersIsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectUsersIsSuccessLoaded", () => {
        it("should return correct result", () => {
            expect(selectUsersIsSuccessLoaded(createMockRootState(LoadingStatus.SUCCESS))).toBe(true);
        });
    });

    describe("selectUsersIsErrorLoaded", () => {
        it("should return correct result", () => {
            expect(selectUsersIsErrorLoaded(createMockRootState(LoadingStatus.ERROR))).toBe(true);
        });
    });

    describe("selectImages", () => {
        it("should return TweetImageResponse array", () => {
            expect(selectImages(createMockRootState())).toBe(mockProfileImages);
        });
    });

    describe("selectImagesIsLoading", () => {
        it("should return correct result", () => {
            expect(selectImagesIsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectImagesIsSuccessLoaded", () => {
        it("should return correct result", () => {
            expect(selectImagesIsSuccessLoaded(createMockRootState(LoadingStatus.SUCCESS))).toBe(true);
        });
    });
});
