import React from "react";

import ChangePhone from "../ChangePhone";
import { createMockRootState, mockDispatch, mountWithStore } from "../../../../../../util/test-utils/test-helper";
import { UserActionsType } from "../../../../../../store/ducks/user/contracts/actionTypes";
import { ChangeInfoTextField } from "../../../../ChangeInfoTextField/ChangeInfoTextField";
import { getPhoneCode } from "../../../../../../util/country-code-helper";
import ChangePhoneModal from "../ChangePhoneModal/ChangePhoneModal";
import { LoadingStatus } from "../../../../../../types/common";

describe("ChangePhone", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<ChangePhone />, mockStore);

        expect(wrapper.text().includes("Update phone number")).toBe(true);
        expect(wrapper.text().includes("Delete phone number")).toBe(true);
        expect(wrapper.find(ChangeInfoTextField).prop("value")).toBe(`${getPhoneCode(mockStore.user.data?.countryCode)}${mockStore.user.data?.phone}`);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: LoadingStatus.NEVER,
            type: UserActionsType.SET_USER_LOADING_STATE
        });
    });

    it("should open and close ChangePhoneModal", () => {
        const wrapper = mountWithStore(<ChangePhone />, mockStore);

        wrapper.find("#openChangePhoneModal").simulate("click");
        expect(wrapper.find(ChangePhoneModal).exists()).toBe(true);

        wrapper.find(ChangePhoneModal).find(".MuiBackdrop-root").simulate("click");
    });
});
