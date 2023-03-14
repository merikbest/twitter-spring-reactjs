import {
    selectIsAuth,
    selectUserData,
    selectUserDataFollowerRequestsSize,
    selectUserDataId,
    selectUserDataIsMutedDirectMessages,
    selectUserDataIsPrivateProfile,
    selectUserDataIsProfileStarted,
    selectUserDataNotificationsCount,
    selectUserDataUnreadMessagesCount,
    selectUserFollowersSize,
    selectUserFollowingSize,
    selectUserIsError,
    selectUserIsLoaded,
    selectUserIsLoading,
    selectUserIsSuccess,
    selectUserPinnedTweetId,
    selectUserProfileAvatar,
    selectUserProfileCountry,
    selectUserProfileCountryCode,
    selectUserProfileCustomized,
    selectUserProfileEmail,
    selectUserProfileFullName,
    selectUserProfileGender,
    selectUserProfileLanguage,
    selectUserProfileLocation,
    selectUserProfilePhone,
    selectUserProfileRegistrationDate,
    selectUserProfileUsername,
    selectUserProfileWebsite,
    selectUserStatus
} from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { mockUser } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

describe("user selectors:", () => {

    describe("selectUserData", () => {
        it("should return AuthUserResponse", () => {
            expect(selectUserData(createMockRootState())).toBe(mockUser);
        });
    });

    describe("selectUserDataId", () => {
        it("should return UserDataId number", () => {
            expect(selectUserDataId(createMockRootState())).toBe(2);
        });
    });

    describe("selectUserDataNotificationsCount", () => {
        it("should return notificationsCount number", () => {
            expect(selectUserDataNotificationsCount(createMockRootState())).toBe(0);
        });
    });

    describe("selectUserDataUnreadMessagesSize", () => {
        it("should return unreadMessagesCount number", () => {
            expect(selectUserDataUnreadMessagesCount(createMockRootState())).toBe(0);
        });
    });

    describe("selectUserDataFollowerRequestsSize", () => {
        it("should return followerRequestsSize number", () => {
            expect(selectUserDataFollowerRequestsSize(createMockRootState())).toBe(null);
        });
    });

    describe("selectUserDataIsPrivateProfile", () => {
        it("should return isPrivateProfile boolean", () => {
            expect(selectUserDataIsPrivateProfile(createMockRootState())).toBe(false);
        });
    });

    describe("selectUserDataIsProfileStarted", () => {
        it("should return profileStarted boolean", () => {
            expect(selectUserDataIsProfileStarted(createMockRootState())).toBe(true);
        });
    });

    describe("selectUserDataIsMutedDirectMessages", () => {
        it("should return mutedDirectMessages boolean", () => {
            expect(selectUserDataIsMutedDirectMessages(createMockRootState())).toBe(false);
        });
    });

    describe("selectUserProfileAvatar", () => {
        it("should return UserProfileAvatar", () => {
            expect(selectUserProfileAvatar(createMockRootState())).toBe(mockUser.avatar);
        });
    });

    describe("selectUserProfileFullName", () => {
        it("should return fullName string", () => {
            expect(selectUserProfileFullName(createMockRootState())).toBe("MrCat");
        });
    });

    describe("selectUserProfileUsername", () => {
        it("should return username string", () => {
            expect(selectUserProfileUsername(createMockRootState())).toBe("Cat");
        });
    });

    describe("selectUserProfileCountryCode", () => {
        it("should return countryCode string", () => {
            expect(selectUserProfileCountryCode(createMockRootState())).toBe("UA");
        });
    });

    describe("selectUserProfilePhone", () => {
        it("should return phone number", () => {
            expect(selectUserProfilePhone(createMockRootState())).toBe(666966623);
        });
    });

    describe("selectUserProfileLanguage", () => {
        it("should return language string", () => {
            expect(selectUserProfileLanguage(createMockRootState())).toBe("Ukrainian - українська");
        });
    });

    describe("selectUserProfileCountry", () => {
        it("should return country string", () => {
            expect(selectUserProfileCountry(createMockRootState())).toBe("UA");
        });
    });

    describe("selectUserProfileGender", () => {
        it("should return gender string", () => {
            expect(selectUserProfileGender(createMockRootState())).toBe("Cat");
        });
    });

    describe("selectUserProfileLocation", () => {
        it("should return location string", () => {
            expect(selectUserProfileLocation(createMockRootState())).toBe("New York");
        });
    });

    describe("selectUserProfileEmail", () => {
        it("should return email string", () => {
            expect(selectUserProfileEmail(createMockRootState())).toBe("user2016@gmail.com");
        });
    });

    describe("selectUserProfileWebsite", () => {
        it("should return website string", () => {
            expect(selectUserProfileWebsite(createMockRootState())).toBe("https://www.google.com");
        });
    });

    describe("selectUserProfileRegistrationDate", () => {
        it("should return registrationDate string", () => {
            expect(selectUserProfileRegistrationDate(createMockRootState())).toBe("2021-08-01T23:34:32");
        });
    });

    describe("selectUserPinnedTweetId", () => {
        it("should return pinnedTweetId number", () => {
            expect(selectUserPinnedTweetId(createMockRootState())).toBe(102);
        });
    });

    describe("selectUserFollowingSize", () => {
        it("should return followingSize number", () => {
            expect(selectUserFollowingSize(createMockRootState())).toBe(1);
        });
    });

    describe("selectUserFollowersSize", () => {
        it("should return followersSize number", () => {
            expect(selectUserFollowersSize(createMockRootState())).toBe(1);
        });
    });

    describe("selectUserProfileCustomized", () => {
        it("should return profileCustomized boolean", () => {
            expect(selectUserProfileCustomized(createMockRootState())).toBe(false);
        });
    });

    describe("selectIsAuth", () => {
        it("should return correct result", () => {
            expect(selectIsAuth(createMockRootState())).toBe(true);
        });
    });

    describe("selectUserStatus", () => {
        it("should return correct result", () => {
            expect(selectUserStatus(createMockRootState())).toBe(LoadingStatus.LOADING);
        });
    });

    describe("selectUserIsSuccess", () => {
        it("should return correct result", () => {
            expect(selectUserIsSuccess(createMockRootState(LoadingStatus.SUCCESS))).toBe(true);
        });
    });

    describe("selectUserIsLoading", () => {
        it("should return correct result", () => {
            expect(selectUserIsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectUserIsLoaded", () => {
        it("should return correct result", () => {
            expect(selectUserIsLoaded(createMockRootState(LoadingStatus.LOADED))).toBe(true);
        });
    });

    describe("selectUserIsError", () => {
        it("should return correct result", () => {
            expect(selectUserIsError(createMockRootState(LoadingStatus.ERROR))).toBe(true);
        });
    });
});
