import React from "react";
import { Avatar, IconButton } from "@material-ui/core";

import MutedAccountItem from "../MutedAccountItem";
import {
    createMockRootState,
    mockDispatch,
    mountWithStore,
    testClickOnLink
} from "../../../../../../../util/test-utils/test-helper";
import { mockMutedUsers } from "../../../../../../../util/test-utils/mock-test-data";
import { MutedUserResponse } from "../../../../../../../types/user";
import { DEFAULT_PROFILE_IMG } from "../../../../../../../constants/url-constants";
import { UserActionsType } from "../../../../../../../store/ducks/user/contracts/actionTypes";
import { PROFILE } from "../../../../../../../constants/path-constants";
import HoverAction from "../../../../../../../components/HoverAction/HoverAction";
import { LoadingStatus } from "../../../../../../../types/common";
import { ActionSnackbarTypes } from "../../../../../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("MutedAccountItem", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockMutedUser = mockMutedUsers[0];
    const mockUnmutedUser = {
        ...mockMutedUser,
        isUserMuted: false,
        avatar: null
    } as unknown as MutedUserResponse;
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<MutedAccountItem mutedUser={mockMutedUser} />, mockStore);

        expect(wrapper.find(Avatar).prop("src")).toEqual(mockMutedUser.avatar);
        expect(wrapper.text().includes(mockMutedUser.fullName)).toBe(true);
        expect(wrapper.text().includes(mockMutedUser.username)).toBe(true);
        expect(wrapper.text().includes(mockMutedUser.about)).toBe(true);
        expect(wrapper.find("svg").prop("id")).toEqual("muteIcon");
    });

    it("should render unmuted user", () => {
        const wrapper = mountWithStore(<MutedAccountItem mutedUser={mockUnmutedUser} />, mockStore);

        expect(wrapper.find(Avatar).prop("src")).toEqual(DEFAULT_PROFILE_IMG);
        expect(wrapper.text().includes(mockMutedUser.fullName)).toBe(true);
        expect(wrapper.text().includes(mockMutedUser.username)).toBe(true);
        expect(wrapper.text().includes(mockMutedUser.about)).toBe(true);
        expect(wrapper.find("svg").prop("id")).toEqual("unmuteIcon");
    });

    it("should click unmuted user", () => {
        const wrapper = mountWithStore(<MutedAccountItem mutedUser={mockMutedUser} />, mockStore);

        wrapper.find(IconButton).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 1 },
            type: UserActionsType.PROCESS_USER_TO_MUTELIST
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: `@${mockMutedUser.username} has been unmuted.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click mute user", () => {
        const wrapper = mountWithStore(<MutedAccountItem mutedUser={mockUnmutedUser} />, mockStore);

        expect(wrapper.find("svg").prop("id")).toEqual("unmuteIcon");

        wrapper.find(IconButton).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 1 },
            type: UserActionsType.PROCESS_USER_TO_MUTELIST
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: `@${mockMutedUser.username} has been muted.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should hover Mute icon and render Unmute Hover Action", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<MutedAccountItem mutedUser={mockMutedUser} />, mockStore);
        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).prop("actionText")).toBe("Unmute");
    });

    it("should hover Mute icon and render Mute Hover Action", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<MutedAccountItem mutedUser={mockUnmutedUser} />, mockStore);
        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).prop("actionText")).toBe("Mute");
    });

    it("should click on avatar and link to User profile", () => {
        testClickOnLink(<MutedAccountItem mutedUser={mockMutedUser} />, `${PROFILE}/${mockMutedUser.id}`, 0);
    });

    it("should click on username and link to User profile", () => {
        testClickOnLink(<MutedAccountItem mutedUser={mockMutedUser} />, `${PROFILE}/${mockMutedUser.id}`, 1);
    });
});
