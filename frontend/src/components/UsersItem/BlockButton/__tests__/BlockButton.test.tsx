import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { mockUsers } from "../../../../util/test-utils/mock-test-data";
import BlockUserModal from "../../../BlockUserModal/BlockUserModal";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import { ActionSnackbarTypes } from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";
import BlockButton from "../BlockButton";

describe("BlockButton", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    const mockUser = mockUsers[0];
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click/open BlockUserModal", () => {
        const wrapper = mountWithStore(<BlockButton user={mockUser} />, mockRootState);
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(true);
        wrapper.find(BlockUserModal).find(Button).at(1).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
    });

    it("should click block user", () => {
        const wrapper = mountWithStore(<BlockButton user={mockUser} />, mockRootState);
        wrapper.find(Button).simulate("click");
        wrapper.find(BlockUserModal).find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 4 },
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: `@${mockUser.username} has been blocked.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should click unblock user", () => {
        const mockBlockedUser = { ...mockUser, isUserBlocked: true };
        const wrapper = mountWithStore(<BlockButton user={mockBlockedUser} />, mockRootState);
        wrapper.find(Button).simulate("click");
        wrapper.find(BlockUserModal).find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 4 },
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: `@${mockBlockedUser.username} has been unblocked.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    });

    it("should hover BlockButton", () => {
        const wrapper = mountWithStore(<BlockButton user={mockUser} />, mockRootState);
        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unblock")).toBe(true);
        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Blocked")).toBe(true);
    });
});
