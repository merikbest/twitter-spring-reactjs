import {selectUsers, selectUsersIsLoading, selectUsersLoadedSuccess} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState, mockUserResponse} from "../../../util/testHelper";

describe("users selectors:", () => {
    
    describe("selectUsers", () => {
        it("should return UserResponse array", () => {
            expect(selectUsers(createMockRootState())).toBe(mockUserResponse);
        });
    });

    describe("selectUsersIsLoading", () => {
        it("should return correct result", () => {
            expect(selectUsersIsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });

    describe("selectUsersLoadedSuccess", () => {
        it("should return correct result", () => {
            expect(selectUsersLoadedSuccess(createMockRootState(LoadingStatus.SUCCESS))).toBe(true);
        });
    });
});
