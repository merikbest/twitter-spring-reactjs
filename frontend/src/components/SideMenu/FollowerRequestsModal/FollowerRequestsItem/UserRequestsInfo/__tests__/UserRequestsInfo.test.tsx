import React from "react";

import {createMockRootState, mountWithStore} from "../../../../../../util/testHelper";
import {LoadingStatus} from "../../../../../../store/types/common";
import {mockFollowerUserResponse} from "../../../../../../util/mockData/mockData";
import PopperUserWindow from "../../../../../PopperUserWindow/PopperUserWindow";
import UserRequestsInfo from "../UserRequestsInfo";

describe("UserRequestsInfo", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUser = mockFollowerUserResponse[0];

    it("should render user info", () => {
        const wrapper = mountWithStore(<UserRequestsInfo user={mockUser}/>, mockRootState);
        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.text().includes(mockUser.username)).toBe(true);
        expect(wrapper.text().includes(mockUser.about)).toBe(true);
    });

    it("should render PopperUserWindow", () => {
        jest.useFakeTimers();
        const wrapper = mountWithStore(<UserRequestsInfo user={mockUser}/>, mockRootState);
        wrapper.find("#handleHoverPopper").at(0).simulate("mouseenter");
        jest.runAllTimers();
        wrapper.update();
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(true);
        wrapper.find("#handleLeavePopper").at(0).simulate("mouseleave");
        expect(wrapper.find(PopperUserWindow).prop("visible")).toBe(false);
    });
});
