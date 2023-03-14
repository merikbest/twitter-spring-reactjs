import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import BlockUserModal from "../../../../components/BlockUserModal/BlockUserModal";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import { mockMyProfile, mockUserProfile } from "../../../../util/test-utils/mock-test-data";
import { ActionSnackbarTypes } from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";
import BlockUserButton from "../BlockUserButton";

describe("BlockUserButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should open/close BlockUserModal", () => {
        const wrapper = mountWithStore(<BlockUserButton />, mockRootState);
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(true);
        wrapper.find(BlockUserModal).find(Button).at(1).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
    });

    it("should click block user", () => {
        const wrapper = mountWithStore(<BlockUserButton />, mockRootState);
        wrapper.find(Button).simulate("click");
        wrapper.find(BlockUserModal).find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 2 },
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: `@${mockMyProfile.username} has been blocked.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click unblock user", () => {
        const wrapper = mountWithStore(<BlockUserButton />, {
            ...mockRootState,
            userProfile: {
                ...mockRootState.userProfile,
                user: { ...mockUserProfile, isUserBlocked: true }
            }
        });
        wrapper.find(Button).simulate("click");
        wrapper.find(BlockUserModal).find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 1 },
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: `@${mockUserProfile.username} has been unblocked.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should hover BlockUserButton", () => {
        const wrapper = mountWithStore(<BlockUserButton />, mockRootState);
        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unblock")).toBe(true);
        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Blocked")).toBe(true);
    });
});
