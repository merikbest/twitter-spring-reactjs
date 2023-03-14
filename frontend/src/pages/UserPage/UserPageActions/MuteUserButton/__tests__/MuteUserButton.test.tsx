import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../../types/common";
import { ActionSnackbarTypes } from "../../../../../store/ducks/actionSnackbar/contracts/actionTypes";
import { UserActionsType } from "../../../../../store/ducks/user/contracts/actionTypes";
import { mockMyProfile } from "../../../../../util/test-utils/mock-test-data";
import MuteUserButton from "../MuteUserButton";

describe("MuteUserButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click mute user", () => {
        const wrapper = mountWithStore(<MuteUserButton onCloseUserPageActions={jest.fn()} />, mockRootState);
        wrapper.find("#handleMuteUser").at(0).simulate("click");
        expect(wrapper.text().includes("Mute")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 2 },
            type: UserActionsType.PROCESS_USER_TO_MUTELIST
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: `@${mockMyProfile.username} has been muted.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click unmute user", () => {
        const wrapper = mountWithStore(<MuteUserButton onCloseUserPageActions={jest.fn()} />, {
            ...mockRootState,
            userProfile: {
                ...mockRootState.userProfile,
                user: { ...mockRootState.userProfile.user, isUserMuted: true }
            }
        });
        wrapper.find("#handleMuteUser").at(0).simulate("click");
        expect(wrapper.text().includes("Unmute")).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 2 },
            type: UserActionsType.PROCESS_USER_TO_MUTELIST
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: `@${mockMyProfile.username} has been unmuted.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });
});
