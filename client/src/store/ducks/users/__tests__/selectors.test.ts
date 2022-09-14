import {selectPagesCount, selectUsers, selectUsersIsLoading, selectUsersLoadedSuccess} from "../selectors";
import {LoadingStatus} from "../../../types";
import {createMockRootState} from "../../../../util/testHelper";
import {mockUsers} from "../../../../util/mockData/mockData";

describe("users selectors:", () => {
    
    describe("selectUsers", () => {
        it("should return UserResponse array", () => {
            expect(selectUsers(createMockRootState())).toBe(mockUsers);
        });
    });

    describe("selectPagesCount", () => {
        it("should return pagesCount number", () => {
            expect(selectPagesCount(createMockRootState())).toBe(1);
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
