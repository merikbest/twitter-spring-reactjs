import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import UnfollowUserButton from "../UnfollowUserButton";

describe("UnfollowUserButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click unfollow profile", () => {
        const wrapper = mountWithStore(<UnfollowUserButton />, mockRootState);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: { userId: 2 }, type: UserActionsType.UNFOLLOW_USER });
    });

    it("should click unfollow private profile", () => {
        const mockPrivateUser = {
            ...mockRootState,
            userProfile: {
                ...mockRootState.userProfile,
                user: { ...mockRootState.userProfile.user, isPrivateProfile: true }
            }
        };
        const wrapper = mountWithStore(<UnfollowUserButton />, mockPrivateUser);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { payload: 2, type: UserActionsType.PROCESS_FOLLOW_REQUEST });
    });

    it("should hover UnfollowUserButton", () => {
        const wrapper = mountWithStore(<UnfollowUserButton />, mockRootState);
        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unfollow")).toBe(true);
        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Following")).toBe(true);
    });
});

