import {
    selectIsAuth,
    selectUserData,
    selectUserIsError,
    selectUserIsLoaded,
    selectUserIsLoading,
    selectUserIsSuccess,
    selectUserStatus
} from "../selectors";
import {createMockRootState} from "../../../../util/testHelper";
import {mockUser} from "../../../../util/mockData/mockData";
import {LoadingStatus} from "../../../types/common";

describe("user selectors:", () => {

    describe("selectUserData", () => {
        it("should return AuthUserResponse", () => {
            expect(selectUserData(createMockRootState())).toBe(mockUser);
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
