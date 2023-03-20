import React from "react";
import { Avatar, Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import { mockUsers } from "../../../util/test-utils/mock-test-data";
import UsersItem, { UserItemSize } from "../UsersItem";
import { DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";
import { UserResponse } from "../../../types/user";
import { UserActionsType } from "../../../store/ducks/user/contracts/actionTypes";
import UnfollowModal from "../../UnfollowModal/UnfollowModal";
import BlockUserModal from "../../BlockUserModal/BlockUserModal";
import PopperUserWindow from "../../PopperUserWindow/PopperUserWindow";
import { LoadingStatus } from "../../../types/common";
import { ActionSnackbarTypes } from "../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("UsersItem", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUser = mockUsers[0];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<UsersItem user={mockUser} size={UserItemSize.MEDIUM} />, mockRootState);
        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(mockUser.avatar);
        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockUser.username}`)).toBe(true);
        expect(wrapper.text().includes(mockUser.about)).toBe(true);
        expect(wrapper.find(Button).text().includes("Follow")).toBe(true);
    });

    it("should render default profile image", () => {
        const mockUserItem = { ...mockUser, avatar: undefined } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.MEDIUM} />, mockRootState);
        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(DEFAULT_PROFILE_IMG);
    });

    it("should render private profile", () => {
        const mockUserItem = { ...mockUser, isPrivateProfile: true } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.MEDIUM} />, mockRootState);
        expect(wrapper.find("#lockIcon").exists()).toBeTruthy();
    });

    it("should my profile blocked", () => {
        const mockUserItem = { ...mockUser, isMyProfileBlocked: true } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.MEDIUM} />, mockRootState);
        expect(wrapper.text().includes(mockUser.about)).toBe(false);
        expect(wrapper.find(Button).exists()).toBeFalsy();
    });

    it("should render is my profile profile", () => {
        const mockUserItem = { ...mockUser, id: 2 } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.MEDIUM} />, mockRootState);
        expect(wrapper.find(Button).exists()).toBeFalsy();
    });

    it("should click handle follow", () => {
        const wrapper = mountWithStore(<UsersItem user={mockUser} size={UserItemSize.SMALL} />, mockRootState);
        expect(wrapper.find(Button).text().includes("Follow")).toBe(true);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { userId: 4 }, type: UserActionsType.FOLLOW_USER });
    });

    it("should click handle follow to private profile", () => {
        const mockUserItem = { ...mockUser, isPrivateProfile: true } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.LARGE} />, mockRootState);
        expect(wrapper.find(Button).text().includes("Follow")).toBe(true);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 4, type: UserActionsType.PROCESS_FOLLOW_REQUEST });
    });

    it("should click open UnfollowModal and click unfollow", () => {
        const mockUserItem = { ...mockUser, isFollower: true } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.LARGE} />, mockRootState);
        expect(wrapper.find(UnfollowModal).at(0).prop("visible")).toBe(false);
        expect(wrapper.find(Button).text().includes("Following")).toBe(true);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(UnfollowModal).at(0).prop("visible")).toBe(true);
        wrapper.find(UnfollowModal).at(0).find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { userId: 4 }, type: UserActionsType.UNFOLLOW_USER });
    });

    it("should click open UnfollowModal and click unfollow private profile", () => {
        const mockUserItem = { ...mockUser, isFollower: true, isPrivateProfile: true } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.LARGE} />, mockRootState);
        expect(wrapper.find(UnfollowModal).at(0).prop("visible")).toBe(false);
        expect(wrapper.find(Button).text().includes("Following")).toBe(true);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(UnfollowModal).at(0).prop("visible")).toBe(true);
        wrapper.find(UnfollowModal).at(0).find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 4 },
            type: UserActionsType.UNFOLLOW_USER
        });
    });

    it("should click open and close UnfollowModal", () => {
        const mockUserItem = { ...mockUser, isFollower: true } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.LARGE} />, mockRootState);
        expect(wrapper.find(UnfollowModal).at(0).prop("visible")).toBe(false);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(UnfollowModal).at(0).prop("visible")).toBe(true);
        wrapper.find(UnfollowModal).at(0).find(Button).at(0).simulate("click");
        expect(wrapper.find(UnfollowModal).at(0).prop("visible")).toBe(false);
    });

    it("should click open BlockUserModal and click onBlockUser", () => {
        const mockUserItem = { ...mockUser, isUserBlocked: true } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.LARGE} />, mockRootState);
        expect(wrapper.find(BlockUserModal).at(0).prop("visible")).toBe(false);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(BlockUserModal).at(0).prop("visible")).toBe(true);
        wrapper.find(BlockUserModal).at(0).find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 4 },
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: `@${mockUserItem.username} has been unblocked.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click open and close BlockUserModal", () => {
        const mockUserItem = { ...mockUser, isUserBlocked: true } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.LARGE} />, mockRootState);
        expect(wrapper.find(BlockUserModal).at(0).prop("visible")).toBe(false);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(BlockUserModal).at(0).prop("visible")).toBe(true);
        wrapper.find(BlockUserModal).at(0).find(Button).at(1).simulate("click");
        expect(wrapper.find(BlockUserModal).at(0).prop("visible")).toBe(false);
    });

    it("should click cancel follow", () => {
        const mockUserItem = { ...mockUser, isWaitingForApprove: true } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.LARGE} />, mockRootState);
        expect(wrapper.find(Button).text().includes("Pending")).toBe(true);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 4, type: UserActionsType.PROCESS_FOLLOW_REQUEST });
    });

    it("should hover user link and click", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<UsersItem user={mockUser} size={UserItemSize.LARGE} />, mockRootState);
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(false);
        wrapper.find("#userInfo").simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(true);
        wrapper.find("#userInfo").simulate("mouseleave");
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(false);
    });

    it("should mouse over and leave Following button", () => {
        const mockUserItem = { ...mockUser, isFollower: true } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.LARGE} />, mockRootState);
        testSimulateHoverButton(wrapper, "Following", "Unfollow");
    });

    it("should mouse over and leave Pending button", () => {
        const mockUserItem = { ...mockUser, isWaitingForApprove: true } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.LARGE} />, mockRootState);
        testSimulateHoverButton(wrapper, "Pending", "Cancel");
    });

    it("should mouse over and leave Blocked button", () => {
        const mockUserItem = { ...mockUser, isUserBlocked: true } as unknown as UserResponse;
        const wrapper = mountWithStore(<UsersItem user={mockUserItem} size={UserItemSize.LARGE} />, mockRootState);
        testSimulateHoverButton(wrapper, "Blocked", "Unblock");
    });

    const testSimulateHoverButton = (wrapper: any, mouseleaveText: string, mouseOverText: string): void => {
        expect(wrapper.find(Button).text().includes(mouseleaveText)).toBe(true);
        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes(mouseOverText)).toBe(true);
        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes(mouseleaveText)).toBe(true);
    };
});
