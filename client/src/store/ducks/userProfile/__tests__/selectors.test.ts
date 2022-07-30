import {
    selectImages,
    selectImagesIsLoading,
    selectImagesIsSuccessLoaded,
    selectUserProfile,
    selectUsersIsErrorLoaded,
    selectUsersIsLoading,
    selectUsersIsSuccessLoaded
} from "../selectors";
import {LoadingStatus} from "../../../types";
import {createMockRootState} from "../../../../util/testHelper";
import {mockMyProfile, mockProfileImages} from "../../../../util/mockData/mockData";

describe("userProfile selectors:", () => {
    const mockState = createMockRootState();

    describe("selectUserProfile", () => {
        it("should return UserProfileResponse", () => {
            expect(selectUserProfile({
                ...mockState,
                userProfile: {...mockState.userProfile, user: mockMyProfile}
            })).toBe(mockMyProfile);
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
