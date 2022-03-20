import {
    selectImages,
    selectImagesIsLoading,
    selectImagesIsSuccessLoaded,
    selectUserProfile,
    selectUsersIsErrorLoaded,
    selectUsersIsLoading,
    selectUsersIsSuccessLoaded
} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState, mockTweetImageResponse, mockUserProfileResponse} from "../../../util/testHelper";

describe("userProfile selectors:", () => {

    describe("selectUserProfile", () => {
        it("should return UserProfileResponse", () => {
            expect(selectUserProfile(createMockRootState())).toBe(mockUserProfileResponse);
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
            expect(selectImages(createMockRootState())).toBe(mockTweetImageResponse);
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
