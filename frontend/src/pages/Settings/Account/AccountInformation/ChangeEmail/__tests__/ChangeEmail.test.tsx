import React from "react";

import ChangeEmail from "../ChangeEmail";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { ChangeInfoTextField } from "../../../../ChangeInfoTextField/ChangeInfoTextField";
import ChangeEmailModal from "../ChangeEmailModal/ChangeEmailModal";
import { UserActionsType } from "../../../../../../store/ducks/user/contracts/actionTypes";
import { LoadingStatus } from "../../../../../../types/common";

describe("ChangeEmail", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ChangeEmail />, mockStore);
        expect(wrapper.find(ChangeInfoTextField).prop("value")).toBe(mockStore.user.data?.email);
        expect(wrapper.text().includes("Update email address")).toBe(true);
    });

    it("should open and close ChangeEmailModal", () => {
        const wrapper = mountWithStore(<ChangeEmail />, mockStore);
        wrapper.find("#openChangeEmailModal").simulate("click");
        expect(wrapper.find(ChangeEmailModal).exists()).toBe(true);
        wrapper.find(ChangeEmailModal).find(".MuiBackdrop-root").simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: LoadingStatus.NEVER,
            type: UserActionsType.SET_USER_LOADING_STATE
        });
    });
});
