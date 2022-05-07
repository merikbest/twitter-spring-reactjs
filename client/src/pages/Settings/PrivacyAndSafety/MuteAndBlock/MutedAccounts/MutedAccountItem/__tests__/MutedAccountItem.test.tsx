import React from "react";
import {Avatar, IconButton} from "@material-ui/core";

import MutedAccountItem from "../MutedAccountItem";
import {createMockRootState, mockDispatch, mountWithStore, testClickOnLink} from "../../../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../../../store/types";
import {mockMutedUsers} from "../../../../../../../util/mockData/mockData";
import {MutedUserResponse} from "../../../../../../../store/types/user";
import {DEFAULT_PROFILE_IMG} from "../../../../../../../util/url";
import ActionSnackbar from "../../../../../../../components/ActionSnackbar/ActionSnackbar";
import {UserActionsType} from "../../../../../../../store/ducks/user/contracts/actionTypes";
import {PROFILE} from "../../../../../../../util/pathConstants";
import HoverAction from "../../../../../../../components/HoverAction/HoverAction";

describe("MutedAccountItem", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockMutedUser = mockMutedUsers[0];
    const mockUnmutedUser = {
        ...mockMutedUser,
        isUserMuted: false,
        avatar: {src: null}
    } as unknown as MutedUserResponse;
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<MutedAccountItem mutedUser={mockMutedUser}/>, mockStore);

        expect(wrapper.find(Avatar).prop("src")).toEqual(mockMutedUser.avatar.src);
        expect(wrapper.text().includes(mockMutedUser.fullName)).toBe(true);
        expect(wrapper.text().includes(mockMutedUser.username)).toBe(true);
        expect(wrapper.text().includes(mockMutedUser.about)).toBe(true);
        expect(wrapper.find("svg").prop("id")).toEqual("unmuteIcon");
    });

    it("should render unmuted user", () => {
        const wrapper = mountWithStore(<MutedAccountItem mutedUser={mockUnmutedUser}/>, mockStore);

        expect(wrapper.find(Avatar).prop("src")).toEqual(DEFAULT_PROFILE_IMG);
        expect(wrapper.text().includes(mockMutedUser.fullName)).toBe(true);
        expect(wrapper.text().includes(mockMutedUser.username)).toBe(true);
        expect(wrapper.text().includes(mockMutedUser.about)).toBe(true);
        expect(wrapper.find("svg").prop("id")).toEqual("muteIcon");
    });

    it("should click unmuted user", () => {
        const wrapper = mountWithStore(<MutedAccountItem mutedUser={mockMutedUser}/>, mockStore);

        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(false);

        wrapper.find(IconButton).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: {userId: 1},
            type: UserActionsType.PROCESS_USER_TO_MUTELIST
        });
        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(true);
        expect(wrapper.find(ActionSnackbar).prop("snackBarMessage")).toBe(`@${mockMutedUser.username} has been unmuted.`);
    });

    it("should click mute user", () => {
        const wrapper = mountWithStore(<MutedAccountItem mutedUser={mockUnmutedUser}/>, mockStore);

        expect(wrapper.find("svg").prop("id")).toEqual("muteIcon");
        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(false);

        wrapper.find(IconButton).simulate("click");

        expect(mockDispatchFn).nthCalledWith(1, {
            payload: {userId: 1},
            type: UserActionsType.PROCESS_USER_TO_MUTELIST
        });
        expect(wrapper.find(ActionSnackbar).prop("openSnackBar")).toBe(true);
        expect(wrapper.find(ActionSnackbar).prop("snackBarMessage")).toBe(`@${mockUnmutedUser.username} has been muted.`);
    });

    it("should hover Mute icon and render Unmute Hover Action", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<MutedAccountItem mutedUser={mockMutedUser}/>, mockStore);
        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).prop("actionText")).toBe("Unmute");
    });

    it("should hover Mute icon and render Mute Hover Action", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<MutedAccountItem mutedUser={mockUnmutedUser}/>, mockStore);
        wrapper.find(IconButton).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();

        expect(wrapper.find(HoverAction).exists()).toBeTruthy();
        expect(wrapper.find(HoverAction).prop("actionText")).toBe("Mute");
    });

    it("should click on avatar and link to User profile", () => {
        testClickOnLink(<MutedAccountItem mutedUser={mockMutedUser}/>, `${PROFILE}/${mockMutedUser.id}`, 0);
    });

    it("should click on username and link to User profile", () => {
        testClickOnLink(<MutedAccountItem mutedUser={mockMutedUser}/>, `${PROFILE}/${mockMutedUser.id}`, 1);
    });
});
