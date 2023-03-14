import { selectPagesCount, selectUsers, selectUsersIsLoading } from "../selectors";
import { createMockRootState } from "../../../../util/test-utils/test-helper";
import { mockUsers } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";

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
});
