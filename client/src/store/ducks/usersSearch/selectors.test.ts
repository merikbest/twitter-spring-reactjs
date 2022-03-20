import {selectFollowers, selectUsersSearch, selectUsersSearchIsLoading} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState, mockUserResponse} from "../../../util/testHelper";

describe("usersSearch selectors:", () => {
    
    describe("selectUsersSearch", () => {
        it("should return UserResponse array", () => {
            expect(selectUsersSearch(createMockRootState())).toBe(mockUserResponse);
        });
    });

    describe("selectFollowers", () => {
        it("should return UserResponse array", () => {
            expect(selectFollowers(createMockRootState())).toBe(mockUserResponse);
        });
    });


    describe("selectUsersSearchIsLoading", () => {
        it("should return correct result", () => {
            expect(selectUsersSearchIsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });
});
