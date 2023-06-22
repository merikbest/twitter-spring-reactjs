import React from "react";
import { Button, Dialog } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import CustomizeModal from "../CustomizeModal";
import { LoadingStatus } from "../../../../types/common";
import { RegistrationStep } from "../../../../types/auth";
import { AuthenticationTypes } from "../../../../store/ducks/authentication/constants/actionTypes";

describe("CustomizeModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockRootStore = {
        ...mockStore,
        authentication: { ...mockStore.authentication, registrationStep: RegistrationStep.STEP_2 }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => mockDispatchFn = mockDispatch());

    it("should render correctly CustomizeModal and click", () => {
        const wrapper = mountWithStore(<CustomizeModal />, mockRootStore);
        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.text().includes("Customize your experience")).toBe(true);
        expect(wrapper.text().includes("Track where you see Twitter content across the web")).toBe(true);
        expect(wrapper.find(Button).text().includes("Next")).toBe(true);
        wrapper.find(Button).at(0).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: RegistrationStep.STEP_3,
            type: AuthenticationTypes.SET_REGISTRATION_STEP
        });
    });
});
