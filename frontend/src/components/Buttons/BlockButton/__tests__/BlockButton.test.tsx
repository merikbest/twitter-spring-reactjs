import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import { ActionSnackbarTypes } from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";
import BlockUserModal from "../../../BlockUserModal/BlockUserModal";
import BlockButton from "../BlockButton";

describe("BlockButton", () => {
    const mockState = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click unblock user", () => {
        testClickButton(true, "unblocked");
    });

    it("should click block user", () => {
        testClickButton(false, "blocked");
    });

    it("should click and open/close BlockUserModal", () => {
        const wrapper = mountWithStore(
            <BlockButton
                userId={11}
                username={"test_name"}
                size={"medium"}
                isOpenBlockModal
                isUserBlocked
            />, mockState);
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(true);
        wrapper.find(BlockUserModal).find(Button).at(1).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
    });

    it("should hover BlockButton", () => {
        const wrapper = mountWithStore(
            <BlockButton
                userId={11}
                username={"test_name"}
                size={"medium"}
                isOpenBlockModal
                isUserBlocked
            />, mockState);
        wrapper.find(Button).simulate("mouseover");
        expect(wrapper.find(Button).text().includes("Unblock")).toBe(true);
        wrapper.find(Button).simulate("mouseleave");
        expect(wrapper.find(Button).text().includes("Blocked")).toBe(true);
    });

    const testClickButton = (isUserBlocked: boolean, message: string): void => {
        const wrapper = mountWithStore(
            <BlockButton
                userId={11}
                username={"test_name"}
                size={"medium"}
                isOpenBlockModal={false}
                isUserBlocked={isUserBlocked}
            />, mockState);
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(Button).text().includes("Blocked")).toBe(true);
        expect(mockDispatchFn).toHaveBeenNthCalledWith(1, {
            payload: { userId: 11 },
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
        expect(mockDispatchFn).toHaveBeenNthCalledWith(2, {
            payload: `@test_name has been ${message}.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    };
});
