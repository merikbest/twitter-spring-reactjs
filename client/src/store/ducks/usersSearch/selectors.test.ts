import {selectFollowers, selectUsersSearch, selectUsersSearchIsLoading} from "./selectors";
import {LoadingStatus} from "../../types";
import {createMockRootState} from "../../../util/testHelper";
import {mockUsers} from "../../../util/mockData/mockData";

describe("usersSearch selectors:", () => {
    
    describe("selectUsersSearch", () => {
        it("should return UserResponse array", () => {
            expect(selectUsersSearch(createMockRootState())).toBe(mockUsers);
        });
    });

    describe("selectFollowers", () => {
        it("should return UserResponse array", () => {
            expect(selectFollowers(createMockRootState())).toBe(mockUsers);
        });
    });

    describe("selectUsersSearchIsLoading", () => {
        it("should return correct result", () => {
            expect(selectUsersSearchIsLoading(createMockRootState(LoadingStatus.LOADING))).toBe(true);
        });
    });
});
