import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockUsers } from "../../../../util/test-utils/mock-test-data";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import UnfollowModal from "../../../UnfollowModal/UnfollowModal";
import UnfollowButton from "../UnfollowButton";

describe("UnfollowButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUser = mockUsers[0];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click open/close UnfollowModal", () => {
        const wrapper = mountWithStore(<UnfollowButton user={mockUser} />, mockRootState);
        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(false);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(true);
        wrapper.find(UnfollowModal).find(Button).at(0).simulate("click");
        expect(wrapper.find(UnfollowModal).prop("visible")).toBe(false);
    });

    it("should click unfollow profile", () => {
        const wrapper = mountWithStore(<UnfollowButton user={mockUser} />, mockRootState);
        wrapper.find(Button).simulate("click");
        wrapper.find(UnfollowModal).find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { userId: 4 }, type: UserActionsType.UNFOLLOW_USER });
    });

    it("should click unfollow private profile", () => {
        const mockPrivateUser = { ...mockUser, isPrivateProfile: true };
        const wrapper = mountWithStore(<UnfollowButton user={mockPrivateUser} />, mockRootState);
        wrapper.find(Button).simulate("click");
        wrapper.find(UnfollowModal).find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 4, type: UserActionsType.PROCESS_FOLLOW_REQUEST });
    });

    it("should hover UnfollowButton", () => {
        const wrapper = mountWithStore(<UnfollowButton user={mockUser} />, mockRootState);
        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unfollow")).toBe(true);
        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Following")).toBe(true);
    });
});
