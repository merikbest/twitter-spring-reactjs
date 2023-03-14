import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import BlockUserButton from "../BlockUserButton";
import BlockUserModal from "../../../BlockUserModal/BlockUserModal";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import { ActionSnackbarTypes } from "../../../../store/ducks/actionSnackbar/contracts/actionTypes";

describe("BlockUserButton", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click open/close BlockUserModal", () => {
        const wrapper = mountWithStore(
            <BlockUserButton
                tweetId={1}
                userId={1}
                username={"test_username"}
                isUserBlocked
            />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
        wrapper.find("#onOpenBlockUserModal").at(0).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(true);
        wrapper.find(BlockUserModal).find(Button).at(1).simulate("click");
        expect(wrapper.find(BlockUserModal).prop("visible")).toBe(false);
    });

    it("should click unblock user", () => {
        testClickButton(true, "#unblockIcon", "Unblock", "unblocked");
    });

    it("should click block user", () => {
        testClickButton(false, "#blockIcon", "Block", "blocked");
    });

    const testClickButton = (isUserBlocked: boolean, iconId: string, blockMessage: string, snackbarMessage: string) => {
        const wrapper = mountWithStore(
            <BlockUserButton
                tweetId={1}
                userId={1}
                username={"test_username"}
                isUserBlocked={isUserBlocked}
            />, createMockRootState(LoadingStatus.SUCCESS));
        expect(wrapper.find(iconId).exists()).toBeTruthy();
        expect(wrapper.text().includes(`${blockMessage} @test_username`)).toBe(true);
        wrapper.find("#onOpenBlockUserModal").at(0).simulate("click");
        wrapper.find(BlockUserModal).find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { userId: 1, tweetId: 1 },
            type: UserActionsType.PROCESS_USER_TO_BLOCKLIST
        });
        expect(mockDispatchFn).nthCalledWith(2, {
            payload: `@test_username has been ${snackbarMessage}.`,
            type: ActionSnackbarTypes.SET_OPEN_SNACKBAR
        });
    };
});
