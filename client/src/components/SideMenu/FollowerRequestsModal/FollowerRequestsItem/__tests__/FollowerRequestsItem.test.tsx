import React from "react";
import {Avatar, Button, Paper} from "@material-ui/core";
import {createMemoryHistory} from "history";

import {createMockRootState, mockDispatch, mountWithStore} from "../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../store/types";
import {mockFollowerUserResponse} from "../../../../../util/mockData/mockData";
import {FollowerRequestsActionsType} from "../../../../../store/ducks/followerRequests/contracts/actionTypes";
import {PROFILE} from "../../../../../util/pathConstants";
import PopperUserWindow from "../../../../PopperUserWindow/PopperUserWindow";
import FollowerRequestsItem from "../FollowerRequestsItem";

describe("FollowerRequestsItem", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUser = mockFollowerUserResponse[0];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<FollowerRequestsItem user={mockUser} onClose={jest.fn()}/>, mockRootState);

        expect(wrapper.find(Avatar).prop("src")).toBe(mockUser.avatar.src);
        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.text().includes(mockUser.username)).toBe(true);
        expect(wrapper.text().includes(mockUser.about)).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Decline")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Accept")).toBe(true);
    });

    it("should click decline Follower Request", () => {
        const wrapper = mountWithStore(<FollowerRequestsItem user={mockUser} onClose={jest.fn()}/>, mockRootState);

        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: mockUser.id,
            type: FollowerRequestsActionsType.DECLINE_FOLLOW_REQUEST
        });
    });

    it("should click accept Follower Request", () => {
        const wrapper = mountWithStore(<FollowerRequestsItem user={mockUser} onClose={jest.fn()}/>, mockRootState);

        wrapper.find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: mockUser.id,
            type: FollowerRequestsActionsType.ACCEPT_FOLLOW_REQUEST
        });
    });

    it("should click user", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const mockOnClose = jest.fn();
        const wrapper = mountWithStore(
            <FollowerRequestsItem
                user={mockUser}
                onClose={mockOnClose}
            />, mockRootState, history);

        wrapper.find(Paper).simulate("click");

        expect(mockOnClose).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(`${PROFILE}/${mockUser.id}`);
    });

    it("should hover and leave Member", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<FollowerRequestsItem user={mockUser} onClose={jest.fn()}/>, mockRootState);
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(false);
        wrapper.find("#handleHoverPopper").at(0).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(true);

        wrapper.find("#handleLeavePopper").at(0).simulate("mouseleave");
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(false);
    });
});
