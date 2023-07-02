import React from "react";
import { Button, Dialog } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import EmailVerificationModal from "../EmailVerificationModal";
import { RegistrationInputField } from "../../RegistrationInput/RegistrationInputField";
import { LoadingStatus } from "../../../../types/common";
import { RegistrationStep } from "../../../../types/auth";
import { AuthenticationTypes } from "../../../../store/ducks/authentication/constants/actionTypes";

describe("EmailVerificationModal", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockEmail = "test@test.test";
    const mockRegistrationData = { username: "test_username", email: mockEmail, birthday: "Feb 31, 1901" };
    const mockRootStore = {
        ...mockStore,
        authentication: {
            ...mockStore.authentication,
            registrationStep: RegistrationStep.STEP_4,
            registrationInfo: mockRegistrationData
        }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => mockDispatchFn = mockDispatch());

    it("should click and render correctly", () => {
        const wrapper = mountWithStore(<EmailVerificationModal />, mockRootStore);
        expect(wrapper.find(Dialog).prop("open")).toBe(true);
        expect(wrapper.text().includes(`Enter it below to verify ${mockEmail}.`)).toBe(true);
        expect(wrapper.find(Button).text().includes("Next")).toBe(true);
        wrapper.find(RegistrationInputField).find("input").simulate("change", { target: { value: "test" } });
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: "test",
            type: AuthenticationTypes.FETCH_CHECK_REGISTRATION_CODE
        });
    });

    it("should click and render error", () => {
        const mockRootStore = {
            ...mockStore,
            authentication: {
                ...mockStore.authentication,
                registrationStep: RegistrationStep.STEP_4,
                registrationInfo: mockRegistrationData,
                errorMessage: "Test error"
            }
        };
        const wrapper = mountWithStore(<EmailVerificationModal />, mockRootStore);
        wrapper.find(RegistrationInputField).find("input").simulate("change", { target: { value: "test" } });
        wrapper.find(Button).simulate("click");
        expect(wrapper.find(RegistrationInputField).prop("helperText")).toBe("Test error");
        expect(wrapper.find(RegistrationInputField).prop("error")).toBe(true);
    });
});
