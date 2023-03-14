import React from "react";
import { Button, Dialog } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import LogoutModal from "../LogoutModal";
import { LoadingStatus } from "../../../../types/common";
import { UserActionsType } from "../../../../store/ducks/user/contracts/actionTypes";
import { createMemoryHistory } from "history";
import { ACCOUNT_SIGNIN } from "../../../../constants/path-constants";
import { TOKEN } from "../../../../constants/common-constants";

describe("LogoutModal", () => {
    const mockRootState = createMockRootState(LoadingStatus.SUCCESS);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        localStorage.setItem(TOKEN, "test_token");
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<LogoutModal />, mockRootState);
        wrapper.find("#onOpenLogoutModal").at(0).simulate("click");
        expect(wrapper.text().includes("Log out of Twitter?")).toBe(true);
        expect(wrapper.text().includes("You can always log back in at any time.")).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Cancel")).toBe(true);
        expect(wrapper.find(Button).at(1).text().includes("Log out")).toBe(true);
    });

    it("should click Sign Out", () => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<LogoutModal />, mockRootState, history);
        wrapper.find("#onOpenLogoutModal").at(0).simulate("click");
        wrapper.find(Button).at(1).simulate("click");
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith(ACCOUNT_SIGNIN);
        expect(mockDispatchFn).nthCalledWith(1, { type: UserActionsType.SIGN_OUT });
    });

    it("should open/close LogoutModal", () => {
        const wrapper = mountWithStore(<LogoutModal />, mockRootState);
        expect(wrapper.find(Dialog).prop("open")).toBe(false);
        wrapper.find("#onOpenLogoutModal").at(0).simulate("click");
        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        wrapper.find(Button).at(0).simulate("click");
        expect(wrapper.find(Dialog).prop("open")).toBe(false);
    });
});
