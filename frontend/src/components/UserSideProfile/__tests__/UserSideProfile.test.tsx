import React from "react";
import { createMemoryHistory } from "history";
import { Avatar, Button, Dialog, Popover } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import UserSideProfile from "../UserSideProfile";
import { mockUser } from "../../../util/test-utils/mock-test-data";
import LogoutModal from "../LogoutModal/LogoutModal";
import { UserActionsType } from "../../../store/ducks/user/contracts/actionTypes";
import { ACCOUNT_SIGNIN } from "../../../constants/path-constants";
import { LoadingStatus } from "../../../types/common";

describe("UserSideProfile", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should click handleOpenPopup and render correctly", () => {
        const wrapper = mountWithStore(<UserSideProfile />, mockRootState);
        wrapper.find("div").at(0).simulate("click");
        expect(wrapper.find(Avatar).at(0).prop("src")).toBe(mockUser.avatar);
        expect(wrapper.text().includes(mockUser.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockUser.username}`)).toBe(true);
        expect(wrapper.text().includes("Add an existing account")).toBe(true);
        expect(wrapper.text().includes(`Log out @${mockUser.username}`)).toBe(true);
    });

    it("should click handleClosePopup", () => {
        const wrapper = mountWithStore(<UserSideProfile />, mockRootState);
        wrapper.find("div").at(0).simulate("click");
        expect(wrapper.text().includes("Add an existing account")).toBe(true);
        expect(wrapper.text().includes(`Log out @${mockUser.username}`)).toBe(true);
        // @ts-ignore
        wrapper.find(Popover).prop("onClose")(jest.fn());
    });

    it("should click open and close LogoutModal", () => {
        const wrapper = mountWithStore(<UserSideProfile />, mockRootState);
        wrapper.find("div").at(0).simulate("click");
        wrapper.find(LogoutModal).find("#onOpenLogoutModal").at(0).simulate("click");
        expect(wrapper.find(LogoutModal).find(Dialog).prop("open")).toBe(true);
        wrapper.find(LogoutModal).find(Button).at(0).simulate("click");
        expect(wrapper.find(LogoutModal).find(Dialog).prop("open")).toBe(false);
    });

    it("should click handleSignOut", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<UserSideProfile />, mockRootState, history);
        wrapper.find("div").at(0).simulate("click");
        wrapper.find("#onOpenLogoutModal").at(0).simulate("click");
        wrapper.find(LogoutModal).find(Button).at(1).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { type: UserActionsType.SIGN_OUT });
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(ACCOUNT_SIGNIN);
    });

    it("should render empty UserSideProfile", () => {
        const mockState = { ...mockRootState, user: { ...mockRootState.user, data: undefined } };
        const wrapper = mountWithStore(<UserSideProfile />, mockState);
        expect(wrapper.find("div").exists()).toBeFalsy();
    });
});
