import React from "react";
import {Avatar, Button} from "@material-ui/core";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../util/testHelper";
import {LoadingStatus} from "../../../store/types";
import {mockUsers} from "../../../util/mockData/mockData";
import UsersItem, {UserItemSize} from "../UsersItem";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {UserResponse} from "../../../store/types/user";

describe("UsersItem", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUser = mockUsers[0];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<UsersItem item={mockUser} size={UserItemSize.MEDIUM} />, mockRootState);
        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(mockUser.avatar.src);
        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockUser.username}`)).toBe(true);
        expect(wrapper.text().includes(mockUser.about)).toBe(true);
        expect(wrapper.find(Button).text().includes("Follow")).toBe(true);
    });

    it("should render default profile image", () => {
        const mockUserItem = {...mockUser, avatar: {...mockUser.avatar, src: undefined}} as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem item={mockUserItem} size={UserItemSize.MEDIUM} />, mockRootState);
        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(DEFAULT_PROFILE_IMG);
    });

    it("should render private profile", () => {
        const mockUserItem = {...mockUser, isPrivateProfile: true} as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem item={mockUserItem} size={UserItemSize.MEDIUM} />, mockRootState);
        expect(wrapper.find("#lockIcon").exists()).toBeTruthy();
    });

    it("should my profile blocked", () => {
        const mockUserItem = {...mockUser, isMyProfileBlocked: true} as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem item={mockUserItem} size={UserItemSize.MEDIUM} />, mockRootState);
        expect(wrapper.text().includes(mockUser.about)).toBe(false);
        expect(wrapper.find(Button).exists()).toBeFalsy();
    });

    it("should render is my profile profile", () => {
        const mockUserItem = {...mockUser, id: 2} as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem item={mockUserItem} size={UserItemSize.MEDIUM} />, mockRootState);
        expect(wrapper.find(Button).exists()).toBeFalsy();
    });
});
