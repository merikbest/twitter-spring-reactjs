import React from "react";
import { Avatar } from "@material-ui/core";

import TagPeopleItem from "../TagPeopleItem";
import { createMockRootState, mountWithStore } from "../../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../../types/common";
import { mockUsers } from "../../../../../../../util/test-utils/mock-test-data";
import { UserResponse } from "../../../../../../../types/user";
import LockIcon from "../../../../../../LockIcon/LockIcon";
import { DEFAULT_PROFILE_IMG } from "../../../../../../../constants/url-constants";

describe("TagPeopleItem", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<TagPeopleItem user={mockUsers[0]} handleListItemClick={jest.fn()} />, mockRootState);
        expect(wrapper.find(Avatar).at(0).prop("src")).toEqual(mockUsers[0].avatar);
        expect(wrapper.text().includes(mockUsers[0].fullName)).toBe(true);
        expect(wrapper.text().includes(mockUsers[0].username)).toBe(true);
    });

    it("should render user can’t be tagged in photos", () => {
        const mockUser = { ...mockUsers[0], avatar: null, isPrivateProfile: true } as UserResponse;
        const wrapper = mountWithStore(<TagPeopleItem user={mockUser} handleListItemClick={jest.fn()} />, mockRootState);
        expect(wrapper.find(Avatar).at(0).prop("src")).toEqual(DEFAULT_PROFILE_IMG);
        expect(wrapper.find(LockIcon).exists()).toBeTruthy();
        expect(wrapper.text().includes(`@${mockUsers[0].fullName} can’t be tagged in photos`)).toBe(true);
    });
});
