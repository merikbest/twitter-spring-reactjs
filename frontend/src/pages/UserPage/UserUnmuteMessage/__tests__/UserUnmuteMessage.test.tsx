import React from "react";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import UserUnmuteMessage from "../UserUnmuteMessage";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import { mockMyProfile } from "../../../../util/test-utils/mock-test-data";
import { ActionSnackbarTypes } from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("UserUnmuteMessage", () => {
    const mockRootState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click unmute user", () => {
        const wrapper = mountWithStore(<UserUnmuteMessage />, {
            ...mockRootState,
            userProfile: {
                ...mockRootState.userProfile,
                user: { ...mockRootState.userProfile.user, isUserMuted: true }
            }
        });
        expect(wrapper.text().includes("You have muted Tweets from this account.")).toBe(true);
        wrapper.find("#unmuteUser").at(0).simulate("click");
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
