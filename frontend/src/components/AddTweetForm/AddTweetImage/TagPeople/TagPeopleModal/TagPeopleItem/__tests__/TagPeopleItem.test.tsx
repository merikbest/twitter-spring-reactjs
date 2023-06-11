import React from "react";
import { Avatar, ListItem } from "@material-ui/core";

import TagPeopleItem from "../TagPeopleItem";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../../../types/common";
import { mockUsers } from "../../../../../../../util/test-utils/mock-test-data";
import { UserResponse } from "../../../../../../../types/user";
import LockIcon from "../../../../../../LockIcon/LockIcon";
import { DEFAULT_PROFILE_IMG } from "../../../../../../../constants/url-constants";
import { AddTweetFormTypes } from "../../../../../../../store/ducks/addTweetForm/constants/actionTypes";

describe("TagPeopleItem", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<TagPeopleItem user={mockUsers[0]} />, mockRootState);
        wrapper.find(ListItem).simulate("click");
        expect(wrapper.find(Avatar).at(0).prop("src")).toEqual(mockUsers[0].avatar);
        expect(wrapper.text().includes(mockUsers[0].fullName)).toBe(true);
        expect(wrapper.text().includes(mockUsers[0].username)).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: mockUsers[0],
            type: AddTweetFormTypes.SET_SELECTED_USER
        });
    });

    it("should render user can’t be tagged in photos", () => {
        const mockUser = { ...mockUsers[0], avatar: null, isPrivateProfile: true } as UserResponse;
        const wrapper = mountWithStore(<TagPeopleItem user={mockUser} />, mockRootState);
        expect(wrapper.find(Avatar).at(0).prop("src")).toEqual(DEFAULT_PROFILE_IMG);
        expect(wrapper.find(LockIcon).exists()).toBeTruthy();
        expect(wrapper.text().includes(`@${mockUsers[0].fullName} can’t be tagged in photos`)).toBe(true);
    });
});
