import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import TagPeople from "../TagPeople";
import ImageAction from "../../ImageAction/ImageAction";
import { UserResponse } from "../../../../../types/user";

describe("TagPeople", () => {

    it("should render correctly", () => {
        createTagPeopleComponent("Tag people", []);
    });

    it("should render one user", () => {
        const selectedUsers = [{ id: 1, fullName: "test name 1" }] as UserResponse[];
        createTagPeopleComponent("test name 1", selectedUsers);
    });

    it("should render two users", () => {
        const selectedUsers = [{ id: 1, fullName: "test name 1" }, { id: 2, fullName: "test name 2" }] as UserResponse[];
        createTagPeopleComponent("test name 1 and test name 2", selectedUsers);
    });

    it("should render three users", () => {
        const selectedUsers = [
            { id: 1, fullName: "test name 1" },
            { id: 2, fullName: "test name 2" },
            { id: 3, fullName: "test name 3" }
        ] as UserResponse[];
        createTagPeopleComponent("test name 1 and 2 others", selectedUsers);
    });

    const createTagPeopleComponent = (subtitle: string, selectedUsers: UserResponse[]): void => {
        const mockStore = createMockRootState(LoadingStatus.LOADED);
        const mockRootState = {
            ...mockStore,
            addTweetForm: { ...mockStore.addTweetForm, selectedUsers: selectedUsers }
        };
        const wrapper = mountWithStore(<TagPeople />, mockRootState);
        expect(wrapper.find(ImageAction).prop("subtitle")).toBe(subtitle);
    };
});
