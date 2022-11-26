import React from "react";
import {Avatar, Button} from "@material-ui/core";

import BlockedAccountItem from "../BlockedAccountItem";
import {createMockRootState, mockDispatch, mountWithStore, testClickOnLink} from "../../../../../../../util/testHelper";
import {mockBlockedUsers} from "../../../../../../../util/mockData/mockData";
import {UserActionsType} from "../../../../../../../store/ducks/user/contracts/actionTypes";
import {PROFILE} from "../../../../../../../util/pathConstants";
import {DEFAULT_PROFILE_IMG} from "../../../../../../../util/url";
import {BlockedUserResponse} from "../../../../../../../store/types/user";
import {LoadingStatus} from "../../../../../../../store/types/common";
import {ActionSnackbarTypes} from "../../../../../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("BlockedAccountItem", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockBlockedUser = mockBlockedUsers[0];
    const mockUnblockedUser = {
        ...mockBlockedUser,
        isUserBlocked: false,
        avatar: null
    } as unknown as BlockedUserResponse;
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<BlockedAccountItem blockedUser={mockBlockedUser}/>, mockStore);

        expect(wrapper.find(Avatar).prop("src")).toEqual(mockBlockedUser.avatar.src);
        expect(wrapper.text().includes(mockBlockedUser.fullName)).toBe(true);
        expect(wrapper.text().includes(mockBlockedUser.username)).toBe(true);
        expect(wrapper.text().includes(mockBlockedUser.about)).toBe(true);
        expect(wrapper.find(Button).text()).toEqual("Blocked");
    });

    it("should render unblocked user", () => {
        const wrapper = mountWithStore(<BlockedAccountItem blockedUser={mockUnblockedUser}/>, mockStore);

        expect(wrapper.find(Avatar).prop("src")).toEqual(DEFAULT_PROFILE_IMG);
        expect(wrapper.text().includes(mockBlockedUser.fullName)).toBe(true);
        expect(wrapper.text().includes(mockBlockedUser.username)).toBe(true);
        expect(wrapper.text().includes(mockBlockedUser.about)).toBe(true);
        expect(wrapper.find(Button).text()).toEqual("Block");
    });

    it("should click unblock user", () => {
        const wrapper = mountWithStore(<BlockedAccountItem blockedUser={mockBlockedUser}/>, mockStore);

        wrapper.find(Button).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: {userId: 1},
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: `@${mockBlockedUser.username} has been unblocked.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click block user", () => {
        const wrapper = mountWithStore(<BlockedAccountItem blockedUser={mockUnblockedUser}/>, mockStore);

        expect(wrapper.find(Button).text()).toEqual("Block");

        wrapper.find(Button).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: {userId: 1},
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: `@${mockBlockedUser.username} has been blocked.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should link to User profile", () => {
        testClickOnLink(<BlockedAccountItem blockedUser={mockBlockedUser}/>, `${PROFILE}/${mockBlockedUser.id}`, 0);
    });
});
