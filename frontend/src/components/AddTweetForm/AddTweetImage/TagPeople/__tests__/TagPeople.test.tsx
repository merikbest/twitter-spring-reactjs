import React from "react";

import { createMockRootState, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import TagPeople from "../TagPeople";
import ImageAction from "../../ImageAction/ImageAction";
import { UserResponse } from "../../../../../types/user";

describe("TagPeople", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(
            <TagPeople
                selectedUsers={[]}
                handleDelete={jest.fn()}
                handleListItemClick={jest.fn()}
            />, mockRootState);
        expect(wrapper.find(ImageAction).prop("subtitle")).toBe("Tag people");
    });

    it("should render one user", () => {
        const wrapper = mountWithStore(
            <TagPeople
                selectedUsers={[{id: 1, fullName: "test name 1"}] as UserResponse[]}
                handleDelete={jest.fn()}
                handleListItemClick={jest.fn()}
            />, mockRootState);
        expect(wrapper.find(ImageAction).prop("subtitle")).toBe("test name 1");
    });

    it("should render two users", () => {
        const wrapper = mountWithStore(
            <TagPeople
                selectedUsers={[{id: 1, fullName: "test name 1"}, {id: 2, fullName: "test name 2"}] as UserResponse[]}
                handleDelete={jest.fn()}
                handleListItemClick={jest.fn()}
            />, mockRootState);
        expect(wrapper.find(ImageAction).prop("subtitle")).toBe("test name 1 and test name 2");
    });

    it("should render three users", () => {
        const wrapper = mountWithStore(
            <TagPeople
                selectedUsers={[
                    {id: 1, fullName: "test name 1"},
                    {id: 2, fullName: "test name 2"},
                    {id: 3, fullName: "test name 3"}
                ] as UserResponse[]}
                handleDelete={jest.fn()}
                handleListItemClick={jest.fn()}
            />, mockRootState);
        expect(wrapper.find(ImageAction).prop("subtitle")).toBe("test name 1 and 2 others");
    });
});
